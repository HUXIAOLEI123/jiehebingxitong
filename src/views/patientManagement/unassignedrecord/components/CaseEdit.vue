<template>
	<el-dialog :title="title" :visible.sync="dialogVisible" top="0vh" :close-on-click-modal="false" width="50%"
		@close="close">
		<div slot="title" class="dialog-title">
			<div class="sectionstly"></div>
			<span class="title-text">{{ title }}</span>
			<div class="button-right">
				<span class="title-close" @click="close"></span>
			</div>
		</div>
		<!-- <div class="heaer"></div> -->
		<div class="contentbox">
			<el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="120px">
				<div class="detailstitlo">
					<p class="xqtitolstyle">档案信息</p>
				</div>
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="Personform.Name" disabled placeholder=""></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="证件号">
							<el-input v-model="Personform.CardNo" disabled placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="机构名称">
							<el-input v-model="Personform.DiagnosisOrganizationName" disabled placeholder=""></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="登记日期">
							<el-input v-model="Personform.RegisterTime" disabled placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="detailstitlo">
					<p class="xqtitolstyle">结案信息</p>
				</div>
				<!-- + -->
				<el-row>
					<el-col :span="12">
						<el-form-item label="结案人员">
							<el-input v-model="form.EvaluationDoctorName" disabled placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="建档日期">
							<el-date-picker v-model="form.EvaluationDate" align="center" type="date"
								placeholder="选择日期时间"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- + -->
				<el-row>
					<el-col :span="12">
						<el-form-item label="停止治疗时间">
							<el-date-picker v-model="form.StopTime" align="center" type="datetime" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<!--  -->
					<el-col :span="12">
						<el-form-item label="停止治疗原因" prop="StopResult">
							<el-select v-model="form.StopResult" placeholder="请输入内容">
								<el-option v-for="item in A0030" :key="item.DetailsCode" :label="item.DetailsName"
									:value="item.DetailsCode"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<!-- + -->
				<el-row>
					<el-col :span="12">
						<el-form-item label="应访视次数">
							<el-input v-model="Personform.VisitNumber" disabled></el-input>
						</el-form-item>
					</el-col>
					<!--  -->
					<el-col :span="12">
						<el-form-item label="实际访视次数">
							<el-input v-model="Personform.ActualVisitNumber" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- + -->
				<el-row>
					<el-col :span="12">
						<el-form-item label="应服药次数">
							<el-input v-model="Personform.TakeMedicineNumber" disabled></el-input>
						</el-form-item>
					</el-col>
					<!--  -->
					<el-col :span="12">
						<el-form-item label="实际服药次数">
							<el-input v-model="Personform.ActualTakeMedicineNumber" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- + -->
				<el-row>
					<el-col :span="12">
						<el-form-item label="服药率">
							<el-input v-model="Personform.MedicationRate + '%'" placeholder="请输入内容" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否规范">
							<el-input v-model="form.IsStandard?'是':'否'" placeholder="请输入内容" disabled></el-input>
						</el-form-item>
					</el-col>
					<!--  -->
					<!-- <el-col :span="12">
						<el-form-item label="是否电话随访">
							<el-select v-model="form.IsPhone" placeholder="请选择">
								<el-option label="是" :value='true'></el-option>
								<el-option label="否" :value='false'></el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
				</el-row>

				<!-- + -->
				<el-row>
					<!-- <el-col :span="12">
						<el-form-item label="是否就诊">
							<el-select v-model="form.IsDiagnosis" placeholder="请选择">
								<el-option label="是" :value='true'></el-option>
								<el-option label="否" :value='false'></el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
					<!--  -->

					<!-- <el-col :span="12">
						<el-form-item label="是否确认结果">
							<el-select v-model="form.IsResult" placeholder="请选择活动区域">
								<el-option label="是" :value='true'></el-option>
								<el-option label="否" :value='false'></el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
				</el-row>
				<el-row v-if="Isfufa">
					<el-col :span="12">
						<el-form-item label="治疗方案" prop="TreatmentPlanId">
							<el-select v-model="form.TreatmentPlanId" placeholder="请输入内容">
								<el-option v-for="item in TreatmentPlanId" :key="item.TreatmentPlanId"
									:label="item.TreatmentPlanName" :value="item.TreatmentPlanId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-button style="margin-left: 30px" type="primary" round @click="handlerEdit">新增治疗方案
						</el-button>
					</el-col>
				</el-row>
				<el-row v-if="Isfufa">
					<el-col :span="4" class="el-colname">
						<label>强化期(月):</label>
						<span>{{ StrengtheningPeriodMonth }}</span>
					</el-col>
					<el-col :span="6">
						<label>强化期服药频率(次/天):</label>
						<span>{{ StrengtheningPeriodDMT }}</span>
					</el-col>
					<el-col :span="6">
						<label>巩固期(月):</label>
						<span>{{ ConsolidationPeriodMonth }}</span>
					</el-col>
					<el-col :span="6">
						<label>巩固期服药频率(次/天):</label>
						<span>{{ ConsolidationPeriodDMT }}</span>
					</el-col>
				</el-row>

				<!-- + -->
				<el-row>
				   
					<el-col :span="24"> 
						<el-form-item label="备注">
							<el-input v-model="form.Remarks" type="textarea" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
                     
					<!-- <el-col :span="10">
		          <el-form-item label="治疗方案" >
		            <el-select v-model="form.TreatmentPlanId" placeholder="请输入内容">
		              <el-option v-for="item in TreatmentPlanId" :key="item.TreatmentPlanName" :label="item.TreatmentPlanName"
		                :value="item.TreatmentPlanName">
		              </el-option>
		            </el-select>
		          </el-form-item>
		        </el-col> -->
				</el-row>
			</el-form>
		</div>
		<OptionsEdit ref="optionsedit" @sumiteprogramme="funtreatmentplantemplates"></OptionsEdit>
		<div slot="footer">
			<el-button class="cancelbtn" @click="close">取 消</el-button>
			<el-button class="savebtn" type="primary" @click="handlerSave">提 交</el-button>
		</div>
	</el-dialog>
</template>
<script>
	import {
		usedictionarydetails
	} from '@/api/dict.js'
	import {
		treatmentplantemplates
	} from '@/api/TreatmentPlanTemplate.js'
	import {
		pulmonaryclosesvisitandmedicine,
		addapplysettlement,
		pulmonarycloseslist,
		updatatuberculosisModify
	} from '@/api/PulmonaryClose.js'
	import {
		tuberculosisdiagnosissmsg
	} from '@/api/TuberculosisDiagnosis.js'
	import {
		tuberculosisdiagnosiss,
		addtuberculosisdiagnosiss,
		edittuberculosisdiagnosiss,
		deletetuberculosisdiagnosiss,
		tuberculosisdiagnosissexcel
	} from '@/api/TuberculosisDiagnosis.js'
	import OptionsEdit from '../components/tabComponents/echeatComponents/optionsEdit.vue' //./echeatComponents/optionsEdit.vue
	export default {
		name: "Edit",
		components: {
			OptionsEdit
		},
		data() {
			return {
				title: "",
				// 弹窗的开关
				dialogVisible: false,
				flag: "",
				Isfufa: false,
				StrengtheningPeriodMonth: '',
				StrengtheningPeriodDMT: '',
				ConsolidationPeriodMonth: '',
				ConsolidationPeriodDMT: '',
				form: {
					StopTime: '',
					StopResult: '',
					IsPhone: null,
					IsDiagnosis: null,
					IsResult: null,
					Remarks: '',
					IsStandard: null,
				},
				TreatmentPlanId: [],
				IDS: {},
				copyform: {},
				Personform: {}, //次数
				pubform: {},
				//  表单验证
				rules: {


					FileNumber: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					Name: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					CardNo: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					Phone: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					EvaluationDate: [{
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],

					EvaluationDoctor: [{
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],

					StopTime: [{
						type: 'string',
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],

					StopResult: [{
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],

					VisitNumber: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					ActualVisitNumber: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					TakeMedicineNumber: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					ActualTakeMedicineNumber: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					MedicationRate: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					IsPhone: [{
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],
					IsDiagnosis: [{
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],
					IsResult: [{
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],

					Remarks: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

				},


				dictarr: [],
				A0001: [],
				A0030: [],
			};
		},

		async created() {
			await this.funtreatmentplantemplates()
			await this.funusedictionarydetails()
			await this.fundictlist()

		},
		methods: {
			async funusedictionarydetails(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0001', 'A0030'],
					PageNumber: 1,
					PageSize: 90
				})
				let {
					StatusCode,
					Message
				} = res
				if (!res || StatusCode !== 200) {
					return this.$baseMessage(Message || '数据获取失败', 'error')
				}

				this.dictarr = res.Response.items

			},
			//获取患者信息
			async tuberculosisdiagnosissmsglist() {
				const res = await tuberculosisdiagnosissmsg(this.IDS.DiagnosisId)
				res.Response.RegisterTime = res.Response.RegisterTime.slice(0, 10);
				// this.pubform = res.Response;
				this.Personform = Object.assign(this.Personform, res.Response);

			},
			//根据主键获取全部信息
			async pulmonarycloseslistmsg() {
				const res = await pulmonarycloseslist(this.IDS.DiagnosisId, this.IDS.closeId)
				this.form = {
					...res.Response
				}
				this.copyform = {
					...res.Response
				}
			},
			//获取次数
			async pulmonaryclosesvisitandmedicinelist() {
				const res = await pulmonaryclosesvisitandmedicine(this.IDS.DiagnosisId)
				let MedicationRate = Number(res.Response.ActualTakeMedicineNumber) / Number(res.Response
					.TakeMedicineNumber)
				this.Personform = res.Response;
				// this.Personform.MedicationRate = MedicationRate.toFixed(2) * 100;
				if (MedicationRate.toFixed(2) < 1) {
					this.form.IsStandard = false;
				} else {
					this.form.IsStandard = true;
				}
			},
			//新增治疗方案
			handlerEdit(flag, data) {
				data = this.TreatmentPlanId;
				this.$refs.optionsedit.show(flag, data)
			},
			// 字典数据处理
			fundictlist() {
				this.dictarr.forEach(item => {
					if (item.CategoryCode == 'A0001') {
						this.A0001.push(item)

					} else if (item.CategoryCode == 'A0030') {
						this.A0030.push(item)
					}
				})

			},
			// 治疗方案
			async funtreatmentplantemplates(params) {
				const res = await treatmentplantemplates(params)
				this.TreatmentPlanId = res.Response.items
			},

			// 确认新增
			async show(flag, data) {
				this.dialogVisible = true;
				this.flag = flag;
				if (this.flag == 'case') {
					this.title = "添加结案信息";
					this.Isfufa = false;
					this.IDS.DiagnosisId = data
					this.form.EvaluationDoctorName = this.$utilsFun.getUserInfo().real_Name; //给结案人员默认当前人
					this.form.EvaluationDoctor = this.$utilsFun.getUserInfo().identifier;
					this.form.AdminOrganizationName = this.$utilsFun.getUserInfo().authOrgName;
					this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId
					var datetime = new Date();
					var year = datetime.getFullYear(); //获取完整的年份(4位,如:1970)
					var month = datetime.getMonth() + 1; //获取月份(返回0-11,0代表1月,用的时候记得加上1)
					var date = datetime.getDate(); //获取日(返回1-31)
					//判断小于等于9月的时候在月份前加一个"0"
					if (month <= 9) {
						month = "0" + month;
					}
					//判断小于等于9号的时候在天数前加一个"0"
					if (date <= 9) {
						date = "0" + date;
					}
					this.form.EvaluationDate = year + "-" + month + "-" + date; //给建档时间默认当前
					this.form.StopTime = new Date();
					// this.IDS.TreatmentPlanId = data.TreatmentPlanId
					await this.pulmonaryclosesvisitandmedicinelist();
					await this.tuberculosisdiagnosissmsglist();

				} else if (this.flag == 'edit') {
					this.title = "编辑结案信息";
					this.Isfufa = false;
					this.IDS.DiagnosisId = data.DiagnosisId
					this.IDS.closeId = data.CloseId
					await this.pulmonaryclosesvisitandmedicinelist();
					await this.tuberculosisdiagnosissmsglist();
					await this.pulmonarycloseslistmsg();
				} else if (this.flag == 'recurrence') {
					this.title = "复发结案信息";
					this.IDS.DiagnosisId = data.DiagnosisId
					this.IDS.closeId = data.CloseId
					await this.pulmonaryclosesvisitandmedicinelist();
					await this.tuberculosisdiagnosissmsglist();
					await this.pulmonarycloseslistmsg();
					this.form.Remarks = '';
					this.Isfufa = true; //复发选择治疗方案
				}
			},
			// 确定
			handlerSave() {
				this.$refs["form"].validate((valid) => {
					if (!valid) return;
					this.hasinfo = [];
					for (let key in this.form) {
						let obj = {};
						if (this.form[key] !== this.copyform[key]) {
							obj.op = 'replace',
								obj.value = this.form[key];
							obj.path = key;
							this.hasinfo.push(obj)
						}
					}
					this.$baseConfirm(`确认要${this.title}此项目吗？`, null, async () => {
						// let subData = Object.assign({}, this.form)
						if (this.flag == 'case') {
							const res = await addapplysettlement({
								...this.Personform,
								...this.form,
							})
							// this.$emit("caseEdit", this.flag, this.IDS, this.form);
							this.$baseMessage('添加成功', "success")
							this.$emit('sumite');
							this.close();
						} else if (this.flag == 'edit') {
							const res = await updatatuberculosisModify(this.IDS.closeId, this.hasinfo)
							let {
								StatusCode,
								Message
							} = res;
							if (StatusCode != 200) {
								return this.$baseMessage(
									Message || '修改失败', 'error'
								)
							} else {
								this.$baseMessage('修改成功', "success")
								this.$emit("sumite")
								this.close();
							}
						} else if (this.flag == 'recurrence') {
							// const res = await addapplysettlement({
							// 	...this.Personform,
							// 	...this.form,
							// })
							const res = await addtuberculosisdiagnosiss({
								...this.Personform,
								...this.form,
							})
							this.$emit('sumite');
							this.$baseMessage('复发操作成功', "success")
							this.close();

							this.$router.push({
								name: 'PatientManagement',
							})
						}
					});
				});

			},


			//取消
			close() {
				this.dialogVisible = false;
				this.form = this.$options.data().form;
				this.$refs["form"].resetFields();
			},


		},
		watch: {
			'form.TreatmentPlanId': function(val) {
				for (let i in this.TreatmentPlanId) {
					if (this.TreatmentPlanId[i].TreatmentPlanId == this.form.TreatmentPlanId) {
						this.StrengtheningPeriodDMT = this.TreatmentPlanId[i].StrengtheningPeriodDMT;
						this.ConsolidationPeriodMonth = this.TreatmentPlanId[i].ConsolidationPeriodMonth;
						this.ConsolidationPeriodDMT = this.TreatmentPlanId[i].ConsolidationPeriodDMT;
						this.StrengtheningPeriodMonth = this.TreatmentPlanId[i].StrengtheningPeriodMonth;
					}
				}
			}
		}
	};
</script>

<style lang=scss scoped>
	.contentbox {
		height: 620px;
	}

	.el-colname {
		margin-left: 60px;
		margin-bottom: 20px;
	}
</style>
