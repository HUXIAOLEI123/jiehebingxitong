<template>
	<div class="room2">

		<el-button type="primary" round @click.native="handlerEdit('case')">结案 </el-button>

		<!-- 表格 -->
		<div class="tablebox">
			<vxe-table auto-resize border height="500" align="center" show-header-overflow show-overflow
				:row-config="{isHover: true}" :data="tableData">
				<vxe-column field="Name" title="姓名"></vxe-column>
				<vxe-column field="ResponsibilityName" title="责任医生"></vxe-column>
				<vxe-column field="OperatorOrganizationFirstName" title="结案机构"></vxe-column>
				<vxe-column field="StopResultName" title="结案原因"></vxe-column>
				<vxe-column field="StopTime" title="停止治疗时间"></vxe-column>
				<!-- <vxe-column field="StopTime" title="结案时间"></vxe-column> -->
				<vxe-column title="操作" width="200">
					<template #default="{ row }">
						<div class="flex_center ">
							<el-link type="primary" @click="handlerEdit('details2', row)">查看详情</el-link>
							<div class="Divider"></div>
							<el-link type="primary" @click="handlerEdit('edit', row)">编辑</el-link>
							<div class="Divider"></div>
							<el-link type="primary" @click="handlerEdit('recurrence', row)">复发</el-link>
							<div class="Divider"></div>
							<el-link type="danger" @click="handlerEdit('delete', row)">删除</el-link>
							
						</div>
					</template>
				</vxe-column>
			</vxe-table>

			<RecurrenceEdit ref="recurrenceEdit" @recurrenceEdit="recurrenceEdit"></RecurrenceEdit>
			<Edit ref="edit"></Edit>
			<CaseEdit ref="caseEdit" @sumite="funplysettlementList"></CaseEdit>
			<NewEdit ref="newedit" @sumite="funplysettlementList"></NewEdit>
		</div>

	</div>
</template>
<script>
	import RecurrenceEdit from '../../../closurePatientManagement/components/recurrenceEdit.vue'
	import Edit from '../../../closurePatientManagement/components/Edit.vue'
	import CaseEdit from '../../../patientManagement/components/CaseEdit.vue'
	import NewEdit from '../../../patientManagement/components/newEdit.vue'
	// 结案
	import {
		addapplysettlement,
		plysettlementList,
		pulmonaryclosesrecordlist,
		deletetuberculosisdiagnosiss
	} from "@/api/PulmonaryClose.js";
	export default {
		components: {
			RecurrenceEdit,
			Edit,
			CaseEdit,
			NewEdit
		},
		props: ['inputData'],
		data() {
			return {
				form: {},
				tableData: [],

				copyData: [{}],

			}

		},
		created() {
			this.copyData[0] = this.inputData
			this.funplysettlementList()
		},
		methods: {
			// 获取详情(数据获取无法在表格中渲染)
			async funplysettlementList() {
				let id = this.inputData.DiagnosisId
				const res = await pulmonaryclosesrecordlist(id)
				this.tableData = res.Response;
			},
			handlerEdit(flag, data) {
				let id = this.inputData.DiagnosisId
				if (flag == 'case') {
					this.$refs.caseEdit.show(flag,id)
				} else if (flag == 'details2') {
					//详情
					let id = this.inputData.DiagnosisId
					this.$refs.edit.show(flag, id)
				} else if (flag == 'edit') {
					this.$refs.caseEdit.show(flag, data)
				} else if (flag == 'delete') {
					// 删除
					this.$baseConfirm("确定要删除所选项吗？", '删除', async () => {
						// id
						let CloseId = data.CloseId
						const res = await deletetuberculosisdiagnosiss(CloseId)
						let {
							StatusCode,
							Message,
							Response
						} = res;
						this.$baseMessage('删除成功', "success")
						this.funplysettlementList()
					},null,"error",)
					this.funplysettlementList()
				} else if (flag == 'recurrence') {
					 this.$refs.newedit.show(flag, data)
				}
			},
			//创建结案
			async caseEdit(flag, ids, data) {

				const res = await addapplysettlement({
					...ids,
					...data
				})
				let {
					StatusCode,
					Message,
					Response,
				} = res;
				if (!Response || StatusCode !== 200) {
					return this.$baseMessage(Message || '添加失败', 'errror')
				}
				this.$baseMessage(Message, "success");

			},
			// 复发
			recurrenceEdit() {},


		},
        watch: {
        	inputData: function(val) {
        		this.funplysettlementList()
        	}
        },


	}
</script>
<style lang="scss" scoped>
	.room2 {
		width: 100%;
		height: 100%;
	}

	.heard {
		width: 100%;
		height: 350px;
		display: flex;
	}

	.tablebox {
		width: 100%;
		height: 75%;
		float: left;
		margin-top: 10px;
	}

	.el-button--medium.is-round {
		margin-top: 30px;
		margin-left: 90%;
	}

	.flex_center {
		display: flex;
		margin: 0 auto;
	}
</style>
