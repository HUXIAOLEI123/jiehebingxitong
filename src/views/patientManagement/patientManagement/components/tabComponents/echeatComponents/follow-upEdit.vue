<template>
	<el-dialog :title="title" :visible.sync="innerVisible" top="20px" :close-on-click-modal="false" width="80%"
		@close="close" append-to-body>
		<div slot="title" class="dialog-title">
			<div class="sectionstly"></div>
			<span class="title-text">{{ title }}</span>
			<div class="button-right">
				<span class="title-close" @click="close"></span>
			</div>
		</div>
		<el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="190px"
			:hide-required-asterisk="title == '查看详情'">
			<div class="detailstitlo">
				<p class="xqtitolstyle">基本信息</p>
			</div>

			<el-row>
				<el-col :span="8">
					<el-form-item label="随访方式" prop="FirstVisitType">
						<el-select v-model="form.FirstVisitType" placeholder="请输入内容">
							<el-option v-for="item in A0022" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="随访日期" prop="FirstVisitDate">
						<el-date-picker v-model="form.FirstVisitDate" value-format="yyyy-MM-dd" type="date"
							placeholder="选择日期"></el-date-picker>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="患者类型" prop="PatientType">
						<el-select v-model="form.PatientType" placeholder="请输入内容">
							<el-option v-for="item in A0014" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="治疗方案">
						<el-input v-model="form.TreatmentPlan" disabled></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="耐药情况" prop="Endurance">
						<el-select v-model="form.Endurance" placeholder="请输入内容">
							<el-option v-for="item in A0024" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="痰菌情况" prop="Sputum">
						<el-select v-model="form.Sputum" placeholder="请输入内容">
							<el-option v-for="item in A0015" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="药品剂型" prop="DrugsType">
						<el-select v-model="form.DrugsType" multiple placeholder="请输入内容">
							<el-option v-for="item in A0025" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="督导人员" prop="Supervisor">
						<el-select v-model="form.Supervisor" placeholder="请输入内容">
							<el-option v-for="item in A0026" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="用法 " prop="DrugUsage">
						<el-select v-model="form.DrugUsage" placeholder="请输入内容">
							<el-option v-for="item in A0027" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="日吸烟量">
						<el-input v-model="form.Smoking" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="建议日吸烟量">
						<el-input v-model="form.ProposalSmoking" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="取药时间" prop="DrugTime">
						<el-date-picker v-model="form.DrugTime" value-format="yyyy-MM-dd" type="date"
							placeholder="选择日期"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="取药地点" prop="DrugPlace">
						<el-input v-model="form.DrugPlace" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="随访医生" prop="FollowDoctor">
						<el-input v-model="form.FollowDoctorName" disabled></el-input>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="下次随访日期" prop="NextVisitDate">
						<el-date-picker v-model="form.NextVisitDate" type="date" value-format="yyyy-MM-dd"
							placeholder="选择日期"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<!-- 单选 -->
				<el-col :span="9">
					<el-form-item label="通风情况" prop="Aeration">
						<el-radio-group v-model="form.Aeration">
							<el-radio v-for="item in A0028" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<!-- 单选 -->
				<el-col :span="8">
					<el-form-item label="单独居室" prop="AloneHonce">
						<el-radio-group v-model="form.AloneHonce">
							<el-radio v-for="item in A0002" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row :gutter="20">
				<!-- 多选  prop="Symptom"-->
				<el-col :span="22">
					<el-form-item label="症状及体征" prop="Symptom">
						<el-checkbox-group v-model="form.Symptom" prop="Symptom">
							<el-checkbox v-for="item in A0023" :key="item.DetailsCode" @change="warrantNameChange"
								:label="item.DetailsCode">
								{{ item.DetailsName }}
							</el-checkbox>
							<el-input size="mini" v-if="reveal" v-model="form.SymptomOther"
								style="width: 320px; margin: 10px"></el-input>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<!-- 列表单选 -->
				<el-col :span="24">
					<!-- <span class="headingstyles">健康教育教育情况</span> -->
					<div class="detailstitlo">
						<p class="xqtitolstyle">健康教育教育情况</p>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item label="服药记录卡的填写" prop="RecordCard">
						<el-radio-group v-model="form.RecordCard">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="服药方法及药品存放" prop="Method">
						<el-radio-group v-model="form.Method">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="肺结核治疗疗程" prop="Process">
						<el-radio-group v-model="form.Process">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="不规律服药危害" prop="Harm">
						<el-radio-group v-model="form.Harm">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="服药后不良反应及处理" prop="AdverseReaction">
						<el-radio-group v-model="form.AdverseReaction">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="治疗期间复诊查痰" prop="SputumExamination">
						<el-radio-group v-model="form.SputumExamination">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="8">
					<el-form-item label="外出期间如何坚持服药" prop="GoOutMedication">
						<el-radio-group v-model="form.GoOutMedication">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="生活习惯及注意事项" prop="Lifehabit">
						<el-radio-group v-model="form.Lifehabit">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="密切接触者检查" prop="CloseContact">
						<el-radio-group v-model="form.CloseContact">
							<el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">
								{{ item.DetailsName }}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>

				<!-- TreatmentPlanTemplate -->
			</el-row>
		</el-form>
		<div slot="footer">
			<el-button @click="close" class="cancelbtn">取 消</el-button>
			<el-button type="primary" class="savebtn" @click="handlerSave">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
	// 
	import {
		usedictionarydetails
	} from '@/api/dict.js'
	import {
		firstPulmonaryVisit,
		followPulmonaryVisit,
		editPulmonaryVisit,
	} from '@/api/supervisoryWorkManagement/follow-upManagement'
	// 获取详情


	export default {

		name: "Edit",
		data() {
			return {
				title: "",
				checkbox: '',
				innerVisible: false,
				flag: "",
				form: {
					Symptom: [],
					FollowDoctorName: JSON.parse(localStorage.getItem('userInfo')).roleName,
					TreatmentPlan: JSON.parse(localStorage.getItem('Patientsdetails')).TreatmentPlanName,
					// FirstVisitId: JSON.parse(localStorage.getItem('Patientsdetails')).DiagnosisId
				},
				hasinfo: [],
				dictarr: [],
				copyform: {},
				A0002: [],
				A0014: [],
				A0015: [],
				A0022: [],
				A0023: [],
				A0024: [],
				A0025: [],
				A0026: [],
				A0027: [],
				A0028: [],
				A0029: [],
				firstVisitId: '',
				reveal: false,
				//  表单验证
				rules: {
					FileNumber: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					FirstVisitDate: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					FirstVisitType: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					TreatmentPlan: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Endurance: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					Sputum: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					DrugsType: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					PatientType: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Supervisor: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					DrugUsage: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					DrugTime: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					DrugPlace: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					ResponsibilityName: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					NextVisitDate: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Aeration: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					AloneHonce: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Symptom: [{
						required: true,
						message: "请选择",
						trigger: "blur"
					}, ],
					RecordCard: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Method: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Process: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Harm: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					AdverseReaction: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					SputumExamination: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					GoOutMedication: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					Lifehabit: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					CloseContact: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					// FollowDoctor: [
					//   { required: true, message: "请输入", trigger: "blur" },
					// ],
				},
			};
		},

		mounted() {
			this.getNowTime()
		},
		methods: {
			getNowTime() {
				var now = new Date()
				var year = now.getFullYear() // 得到年份
				var month = now.getMonth() // 得到月份
				var date = now.getDate() // 得到日期
				month = month + 1
				var nextMonth = month + 1
				if (nextMonth == 13) {
					nextMonth = 1
				}
				month = month.toString().padStart(2, '0')
				date = date.toString().padStart(2, '0')
				var defaultDate = `${year}-${month}-${date}`
				var nextdefaultDate = `${year}-${nextMonth}-${date}`
				this.$set(this.form, 'FirstVisitDate', defaultDate)
				this.$set(this.form, 'NextVisitDate', nextdefaultDate)
			},
			// 字典
			async funusedictionarydetails() {
				const res = await usedictionarydetails({
					CategoryCode: ['A0002', 'A0014', 'A0015', 'A0022', 'A0023', 'A0024', 'A0025', 'A0026',
						'A0027', 'A0028', 'A0029',
					],
					PageNumber: 1,
					PageSize: 400
				})

				this.dictarr = res.Response.items
			},
			//判断多选框数组中是否有那个能发生改变的值
			warrantNameChange() {
				const _this = this;
				if (_this.form.Symptom.indexOf("10") !== (-1)) {
					_this.reveal = true;
				} else {
					_this.reveal = false;
				}
			},
			//字典数据处理
			fundictlist() {
				this.dictarr.forEach(item => {
					if (item.CategoryCode == 'A0002') {
						this.A0002.push(item)
					} else if (item.CategoryCode == 'A0014') {
						this.A0014.push(item)
					} else if (item.CategoryCode == 'A0015') {
						this.A0015.push(item)
					} else if (item.CategoryCode == 'A0022') {
						this.A0022.push(item)
					} else if (item.CategoryCode == 'A0023') {
						this.A0023.push(item)
					} else if (item.CategoryCode == 'A0024') {
						this.A0024.push(item)
					} else if (item.CategoryCode == 'A0025') {
						this.A0025.push(item)
					} else if (item.CategoryCode == 'A0026') {
						this.A0026.push(item)
					} else if (item.CategoryCode == 'A0027') {
						this.A0027.push(item)
					} else if (item.CategoryCode == 'A0028') {
						this.A0028.push(item)
					} else if (item.CategoryCode == 'A0029') {
						this.A0029.push(item)
					}
				})


			},

			// 确认新增？修改
			show(flag, data, formdata) {
				this.innerVisible = true;
				this.flag = flag;
				this.getNowTime()
				if (flag == 'addfollow') {
					this.title = "新增随访";
                    this.form.PersonId = data.PersonId;
                    this.form.DiagnosisId = data.DiagnosisId;
				} else if (flag == 'details') {
					this.title = "查看详情";
					this.firstVisitId = data.VisitId
					this.form = {
						...formdata
					};

				} else if (flag == 'Modify') {
					this.title = "修改随访";
					this.firstVisitId = data.VisitId
					this.form = {
						...formdata
					};
					this.copyform = {
						...formdata
					}

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
					for(let j in this.hasinfo){
						if(this.hasinfo[j].path=='Symptom'||this.hasinfo[j].path=='DrugsType'){
							this.hasinfo[j].value = this.hasinfo[j].value.join(',')
						}
					}
					this.$baseConfirm(`确认要${this.title}吗？`, null, async() => {
						// let copform = this.form
						// // 数组转化成字符串
						// copform.Symptom = copform.Symptom.toString()
						// copform.DrugsType = copform.DrugsType.toString()
						// this.$emit("followupEdit", this.flag, this.firstVisitId, copform, this.hasinfo);
						// this.close();
						if (this.flag == 'addfollow') {
							this.form.Symptom = this.form.Symptom.join(',')
							this.form.DrugsType = this.form.DrugsType.join(',')
							let res = await firstPulmonaryVisit(this.form)
							this.$baseMessage('添加成功', "success")
							this.$emit("submit")
							this.Symptom = []
			 			    this.close();
						}else if(this.flag == 'Modify'){
							const FirstVisitId  = this.form.FirstVisitId 
							const res = await editPulmonaryVisit(FirstVisitId, this.hasinfo)
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
							  this.$emit("submit")
							  this.close();
							}
						}

					});
				});

			},


			//取消
			close() {
				this.innerVisible = false;
				// 重置数据(封装的方法)
				this.form = this.$options.data().form;
				this.$refs["form"].resetFields();
			},




		},
		async created() {
			// 字典
			await this.funusedictionarydetails()
			this.fundictlist()


		},
	};
</script>

<style lang=scss scoped>
</style>
