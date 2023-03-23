<template>
	<div class="room2">
		<!-- 表格 -->
		<div class="tablebox">
			<vxe-table auto-resize border height="500" align="center" show-header-overflow show-overflow
				:row-config="{isHover: true}" :data="tableData">
				<vxe-column field="TransferTime" title="转移时间"></vxe-column>
				<vxe-column field="OldXianAdminOrganizationName" title="原管理单位"></vxe-column>
				<vxe-column field="OldMedicineAdminOrganizationName" title="原服药单位"></vxe-column>
				<vxe-column field="OldAdminOrganizationName" title="原督导机构"></vxe-column>
				<vxe-column field="OldResponsibilityName" title="原责任医生"></vxe-column>
				<vxe-column field="NowXianAdminOrganizationName" title="现管理单位"></vxe-column>
				<vxe-column field="NowMedicineAdminOrganizationName" title="现服药单位"></vxe-column>
				<vxe-column field="NowAdminOrganizationName" title="现督导机构"></vxe-column>
				<vxe-column field="NowResponsibilityName" title="现责任医生"></vxe-column>
				<!-- <vxe-column field="StopTime" title="结案时间"></vxe-column> -->
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
		transferrecordlist
	} from "@/api/TuberculosisDiagnosis.js";
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
				const res = await transferrecordlist(id)
				this.tableData = res.Response;
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
