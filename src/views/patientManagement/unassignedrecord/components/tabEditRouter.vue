<template>
	<!-- <div class="box"> -->
	<div class="room">
		<div class="content">
			<!-- 用户基本信息 -->
			<el-row :gutter="2">
				<el-col :span="2">
					<span class="spn">{{form.Name}}</span>
				</el-col>
				<el-col :span="1">
					<span class="spn">{{form.SexName}}</span>
				</el-col>
				<el-col :span="1">
					<span class="spn">{{form.Age}}</span>
				</el-col>
				<el-col :span="4">
					<span class="spn">{{form.CardNo}}</span>
				</el-col>
				<el-col :span="3">
					<span>今日服药状态:</span> <span
						:class="form.IsTakeMedicine?'fontyistyle':'fontstyle'">{{form.IsTakeMedicine?
          '已服':'未服'}}</span>
				</el-col>

				<el-col :span="3">
					<div class="backgroudsty"><span style="color: #fff;">结核病类型:</span> <span
							style="color: #fff;">{{form.DiagnosisTypeName}}</span></div>
				</el-col>

				<el-col :span="3">
					<span>医生:</span> <span class="spn">{{form.ResponsibilityName}}</span>
				</el-col>

				<el-col :span="5">
					<span>治疗方案:</span> <span class="spn">{{form.TreatmentPlanName}}</span>
				</el-col>
			</el-row>
			<!-- tab栏 -->
			<template>
				<el-tabs v-model="activeName">
					<el-tab-pane label="基本信息" name="first" :lazy="true">
						<div class="tabbox">
							<Basictab1 :inputData='form'></Basictab1>
						</div>
					</el-tab-pane>
					<el-tab-pane label="服药监督" name="second" :lazy="true">
						<div class="tabbox">
							<Medicinetab2 :inputData='form'></Medicinetab2>
						</div>
					</el-tab-pane>

					<el-tab-pane label="不良反应" name="third" :lazy="true">
						<div class="tabbox">
							<AdverseReactionstab3 :inputData='form'></AdverseReactionstab3>
						</div>
					</el-tab-pane>
					<el-tab-pane label="中断服药" name="fourth" :lazy="true">
						<div class="tabbox">
							<Interrupttab4 :inputData='form'></Interrupttab4>
						</div>
					</el-tab-pane>
					<el-tab-pane label="痰菌检查" name="fourth1" :lazy="true">
						<div class="tabbox">
							<Checktab5 :inputData='form'></Checktab5>
						</div>
					</el-tab-pane>
					<el-tab-pane label="分子生物学检测" name="fourth2" :lazy="true">
						<div class="tabbox">
							<MolecularBiologytab6 :inputData='form'></MolecularBiologytab6>
						</div>
					</el-tab-pane>
					<el-tab-pane label="耐药" name="fourth3" :lazy="true">
						<div class="tabbox">
							<Resistancetab7 :inputData='form'></Resistancetab7>
						</div>
					</el-tab-pane>
					<el-tab-pane label="胸片" name="fourth4" :lazy="true">
						<div class="tabbox">
							<Chesttab8 :inputData='form'></Chesttab8>
						</div>
					</el-tab-pane>
					<el-tab-pane label="肝功能" name="fourth5" :lazy="true">
						<div class="tabbox">
							<Liverttab9 :inputData='form'></Liverttab9>
						</div>
					</el-tab-pane>
					<el-tab-pane label="随访记录" name="fourth6" :lazy="true">
						<div class="tabbox">
							<Followuptab10 :inputData='form'></Followuptab10>
						</div>
					</el-tab-pane>
					<el-tab-pane label="治疗方案" name="fourth7" :lazy="true">
						<div class="tabbox">
							<TreatmentOptions11 :inputData='form'></TreatmentOptions11>
						</div>
					</el-tab-pane>
					<el-tab-pane label="结案登记" name="fourth8" :lazy="true">
						<div class="tabbox">
							<caseregistrationtab12 :inputData='form'></caseregistrationtab12>
						</div>
					</el-tab-pane>
					<el-tab-pane label="转移记录" name="fourth9" :lazy="true">
						<div class="tabbox">
							<TransferRecords :inputData='form'></TransferRecords>
						</div>
					</el-tab-pane>
				</el-tabs>
			</template>
		</div>
	</div>
	<!-- </div> -->
</template>

<script>
	import Basictab1 from "./tabComponents/basictab1.vue";
	import Medicinetab2 from "./tabComponents/medicinetab2.vue";
	import AdverseReactionstab3 from "./tabComponents/adverseReactionstab3.vue";
	import Interrupttab4 from "./tabComponents/interrupttab4.vue";
	import Checktab5 from "./tabComponents/checktab5.vue";
	import MolecularBiologytab6 from "./tabComponents/molecularBiologytab6.vue";
	import Resistancetab7 from "./tabComponents/resistancetab7.vue";
	import Chesttab8 from "./tabComponents/chesttab8.vue";
	import Liverttab9 from "./tabComponents/liverttab9.vue";
	import Followuptab10 from "./tabComponents/follow-uptab10.vue";
	import TreatmentOptions11 from "./tabComponents/treatmentOptions11.vue";
	import caseregistrationtab12 from "./tabComponents/caseregistrationtab12.vue";
	import TransferRecords from "./tabComponents/TransferRecords.vue";
	import {
		tuberculosisdiagnoecharts,
		tuberculosisdiagnosissmsg
	} from '@/api/TuberculosisDiagnosis.js'
	export default {

		components: {
			Basictab1,
			Medicinetab2,
			AdverseReactionstab3,
			Interrupttab4,
			Checktab5,
			MolecularBiologytab6,
			Resistancetab7,
			Chesttab8,
			Liverttab9,
			Followuptab10,
			TreatmentOptions11,
			caseregistrationtab12,
			TransferRecords
		},
		name: 'PatientManagementdetaltab',
		data() {
			return {
				value1: '',
				form: {},
				activeName: 'first'
			}
		},
		async created() {

		},
		async mounted() {
			if (this.$route.query.diagnosisId?.DiagnosisId) {
				this.activeName = "first"
				this.form = this.$route.query.diagnosisId;
				await this.tuberculosisdiagnosissmsglist()
			} else {
				const patientsdetails = JSON.parse(localStorage.getItem('Patientsdetails'))
				const tablist = JSON.parse(localStorage.getItem('tablist'))
				switch (tablist) {
				    case 1:
				        this.activeName = "first"
				        break
				    case 2:
				        this.activeName = "second"
				        break
				    case 3:
				        this.activeName = "third"
				        break
				    case 4:
				        this.activeName = "fourth"
				        break
					case 9:
					    this.activeName = "fourth6"
					    break
					default:
					  this.activeName = "first"
				}
				if (patientsdetails.ApplicationItemCategory == 1) {
					this.activeName = "fourth2"
				} else if (patientsdetails.ApplicationItemCategory == 2) {
					this.activeName = "fourth1"
				} else if (patientsdetails.ApplicationItemCategory == 3) {
					this.activeName = "fourth4"
				} else if (patientsdetails.ApplicationItemCategory == 4) {
					this.activeName = "fourth3"
				} else if (patientsdetails.ApplicationItemCategory == 5) {
					this.activeName = "fourth5"
				}
				this.form = patientsdetails;
				await this.tuberculosisdiagnosissmsglist()
			}
		},
		methods: {
			async tuberculosisdiagnosissmsglist() {
				const res = await tuberculosisdiagnosissmsg(this.form.DiagnosisId)
				this.form = {
					...this.form,
					...res.Response,
				};
			},
		},
		watch: {
			$route: function(val) {
				const patientsdetails = JSON.parse(localStorage.getItem('Patientsdetails'))
				this.form = patientsdetails;
				this.tuberculosisdiagnosissmsglist()
			}
		}
	}
</script>

<style lang="scss" scoped>
	h2 {
		color: #000;
	}

	.el-row {
		margin: 30px 0;
	}

	span {
		font-size: 16px;
		font-family: Microsoft YaHei-Regular, Microsoft YaHei;
		font-weight: 400;
		color: #999999;
	}

	.spn {
		color: #252D57;
	}

	.fontyistyle {
		color: #0069EB;
	}

	.fontstyle {
		color: #FF0084;
	}

	.backgroudsty {
		color: #ffffff;
		background: #0069EB;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		width: 80%;
		padding: 2px 0;
	}

	.content {
		width: 100%;
		margin-right: 100px;
		// height: 600px
		background: white;
		box-shadow: 0px 10px 20px 1px rgba(0, 0, 0, 0.0500);
		border-radius: 10px 10px 10px 10px;
		opacity: 1;
		border: 1px solid #D8D8D8;
		padding-left: 20px;
		// 溢出滚动
		overflow: auto;
		padding: 0 20px 20px 20px;
	}


	.tabbox {
		width: 100%;


	}
	// ::-webkit-scrollbar {
	// width: 0 !important;
	// }
	// .room::-webkit-scrollbar { height: 0 !important;width:0px !important; }
	// .room:::-webkit-scrollbar { width: 0 !important }
	::-webkit-scrollbar { width: 0 !important }
	::-webkit-scrollbar {
	        display: none;
	    }
	.room{
		
		  height: 100vh;
		  overflow-y: scroll;
		  &::-webkit-scrollbar {
		    display: none;
		  }
	}
</style>
