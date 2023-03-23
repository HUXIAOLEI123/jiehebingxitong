<template>
	<div class="room">
		<!-- 图表 -->
		<div class="heardechart">
			<p>不良反应处置率</p>
			<MedicinerateEchart_1 :EchartList="Echartdata"></MedicinerateEchart_1>
		</div>
		<div class="heardechart1">
			<div class="radiobut">
				<!-- <el-radio-group v-model="radio1" size="mini">
					<el-radio-button label="全部"></el-radio-button>
					<el-radio-button label="近1个月"></el-radio-button>
					<el-radio-button label="近3个月"></el-radio-button>
				</el-radio-group> -->
			</div>

			<DisposalColumnarEchart :EchartList="Echartdata"></DisposalColumnarEchart>
		</div>

		<!-- 表格 -->
		<div class="tablebox">
			<vxe-table auto-resize border height="300" align="center" show-header-overflow show-overflow
				:row-config="{ isHover: true }" :data="tableData">
				<vxe-column field="RegisterTime" title="确诊时间"></vxe-column>
				<vxe-column field="ResponsibilityName" title="责任医生"></vxe-column>
				<vxe-column field="AdminOrganizationName" title="管理机构"></vxe-column>
				<!-- 未处理显示 -->
				<vxe-column field="AdverseReactionName" title="不良反应"></vxe-column>
				<vxe-column field="IsManagement" title="处置状态">
					<template #default="{ row }">
						<el-tag :type="row.IsManagement ?' primary' :'danger'">{{ row.IsManagement ? '已处置' : '未处置' }}
						</el-tag>
					</template>
				</vxe-column>
				<vxe-column field="AdverseReactiondurationName" title="反应时长"></vxe-column>
				<vxe-column  field="ManagementTime" title="处置时间"></vxe-column>
				<vxe-column field="ManagementMethod" title="不良反应处置">
					<template #default="{ row }">
						<el-link :disabled="inputData.IsClosed ? true : false" type="danger" v-if="row.IsManagement == false" @click="handlerEdit(row)">去处置</el-link>
						<el-link v-else @click="handlerDetail(row)">查看详情</el-link>
					</template>
				</vxe-column>
			</vxe-table>
			<!-- 弹窗 -->
			<AdverseTab3Edit ref="adverseTab3Edit" @sumite="sumite"></AdverseTab3Edit>
            <adverseTab3Detail ref="adverseTab3Detail"></adverseTab3Detail>
		</div>
	</div>
</template>

<script>
	import MedicinerateEchart_1 from './echeatComponents/medicinerateEchart_1.vue'
	import DisposalColumnarEchart from './echeatComponents/disposalColumnarEchart.vue'
	import {
		pulmonarybadreactionslist,
		pulmonarybadreactionecharts
	} from '@/api/PulmonaryBadReaction.js'
	import AdverseTab3Edit from "./EditComponents/adverseTab3Edit.vue";
	import adverseTab3Detail from "./EditComponents/adverseTab3Detail.vue";
	export default {

		components: {
			MedicinerateEchart_1,
			DisposalColumnarEchart,
			AdverseTab3Edit,
			adverseTab3Detail
		},
		props: ['inputData'],
		data() {
			return {
				radio1: '全部',
				form: {},
				tableData: [],
				// 选中的列表传输过来的值
				copydata: [{}],
				Echartdata: {}
			}
		},

		async created() {
			this.copydata[0] = this.inputData
			await this.funpulmonarybadreactionslist()
			await this.funpulmonarybadreactionecharts()
		},

		methods: {
			//列表
			async funpulmonarybadreactionslist() {
				const res = await pulmonarybadreactionslist(this.inputData.DiagnosisId)
				let {
					StatusCode,
					Message,
					Response
				} = res;
				if (!Response || StatusCode != 200) {
					return this.$baseMessage(
						Message || '数据获取失败', 'error'
					)
				}
				this.tableData = res.Response.items
			},
			// 图表（数据直接链接接口）
			async funpulmonarybadreactionecharts() {
				let diagnosisId = this.inputData.DiagnosisId
				const res = await pulmonarybadreactionecharts(diagnosisId)

				this.Echartdata = res.Response


			},
			//处置成功
            sumite(){
				this.funpulmonarybadreactionslist()
				this.funpulmonarybadreactionecharts()
			},

			handlerEdit(data) {
				this.$refs.adverseTab3Edit.show(data, this.inputData)
			},
			handlerDetail(data) {
				this.$refs.adverseTab3Detail.show(data, this.inputData)
			}
		},
		watch: {
			inputData: function(val) {
				this.funpulmonarybadreactionslist()
				this.funpulmonarybadreactionecharts()
			}
		}


	}
</script>

<style lang="scss" scoped>
	.room2 {
		width: 100%;
		height: 500px;
		// overflow: hidden;
		background: pink;
	}

	.heardechart {
		width: 50%;
		height: 300px;
		float: left;
	}

	.heardechart1 {
		width: 50%;
		height: 350px;
		float: left;
	}

	.heardechart>p {
		color: black;
		font-size: 25PX;
		font-weight: 600;
		margin: 15px 0 0 20px;
	}

	.radiobut {
		margin: 30px 0 0 0;
		padding-left: 56%;

	}

	.tablebox {
		width: 100%;
		height: 100%;
		float: left;
		margin-top: 50px;
		// overflow-y: auto;
	}
</style>
