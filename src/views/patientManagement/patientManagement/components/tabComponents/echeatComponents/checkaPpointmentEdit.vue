<template>
	<el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="50%" @close="close"
		append-to-body>
		<div slot="title" class="dialog-title">
			<div class="sectionstly"></div>
			<span class="title-text">{{ title }}</span>
			<div class="button-right">
				<span class="title-close" @click="close"></span>
			</div>
		</div>
		<el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="120px">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="患者">
						<el-input v-model="form.Name" disabled placeholder="请输入"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="结核病类型">
						<el-select v-model="form.DiagnosisType" disabled>
							<el-option v-for="item in A0013" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="申请日期">
						<el-date-picker v-model="form.ApplicationTime" disabled align="center" type="date" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="预约检查日期" prop="ApplicationInspectTime">
						<el-date-picker v-model="form.ApplicationInspectTime" align="center" type="date"
							placeholder="选择日期"  :picker-options="pickerOptions0"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="检查项目类别">
						<el-select v-model="form.ApplicationItemCategory" @change="zbldopt" disabled>
							<el-option v-for="item in A0018" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="检查项目名称" prop="ApplicationItemName">
						<el-input v-model="form.ApplicationItemName" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label="申请检查类型" prop="ApplicationType">
						<el-select v-model="form.ApplicationType" placeholder="请输入内容">
							<el-option v-for="item in A0019" :key="item.DetailsCode" :label="item.DetailsName"
								:value="item.DetailsCode"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer">
			<el-button class="cancelbtn" @click="close">取 消</el-button>
			<el-button class="savebtn" type="primary" @click="handlerSave">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
	import {
		usedictionarydetails
	} from '@/api/dict.js'
	export default {
		name: "Edit",
		props: ['activeName'],
		data() {
			return {
				title: "",
				textarea: '',
				innerVisible: false,
				flag: "",
				hasinfo: [],
				dictarr: [],
				A0013: [],
				A0018: [],
				A0019: [],
				// 保存修改信息
				copyform: {},
				arrhasinfo: [],
				pickerOptions0: {
				  disabledDate (time) {
				    return time.getTime() < Date.now() - 8.64e7
				  }
				},
				form: {
					Name: '',
					DiagnosisType: ''
				},
				arr: [],
				//  表单验证
				rules: {
					ApplicationTime: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					ApplicationInspectTime: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					ApplicationItemCategory: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
					ApplicationItemName: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					ApplicationType: [{
						required: true,
						message: "请选择",
						trigger: "change"
					}, ],
				},
			};
		},
		methods: {
			// 表单下拉触发获取label事件
			zbldopt(val) {
				if (val) {
					let obj = {}
					obj = this.A0018.find(item => {
						return item.DetailsCode === val
					})
					this.form.ApplicationItemName = obj.DetailsName
				}
			},
			// 字典
			async funusedictionarydetails() {
				const res = await usedictionarydetails({
					CategoryCode: ['A0013', 'A0018', 'A0019'],
					PageNumber: 1,
					PageSize: 40
				})
				this.dictarr = res.Response.items
			},
			//字典数据处理
			fundictlist() {
				this.dictarr.forEach(item => {
					if (item.CategoryCode == 'A0013') {
						this.A0013.push(item)
					} else if (item.CategoryCode == 'A0018') {
						this.A0018.push(item)
					} else if (item.CategoryCode == 'A0019') {
						this.A0019.push(item)
						console.log(this.A0018)
					}
				})
			},
			pickerBeginOption(){
				if(this.form.ApplicationInspectTime.getTime()<Date.now() - 1 * 24 * 60 * 60 * 1000){
					 this.$message.error('预约检查日期不可大于当前日期')
					 this.form.ApplicationInspectTime = '';
				}
			},
			// 确认新增？修改
			show(flag, data, inputData) {
				this.innerVisible = true;
				this.flag = flag;
				if (flag == "Phlegm") {
					this.title = "痰菌检查预约";
					this.form.Name = data.Name
					this.form.DiagnosisType = data.DiagnosisType
					this.form.ApplicationItemCategory = '2' //默认检查项目
					this.form.ApplicationItemName = '痰菌检查';
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
					this.form.ApplicationTime = year + "-" + month + "-" + date; //给申请时间默认当前
				} else if (flag == 'Modify') {
					this.title = '预约信息修改'
					this.form = {
						...data
					};
					this.copyform = {
						...data
					}
					this.form.Name = inputData.Name
					this.form.DiagnosisType = inputData.DiagnosisType
				} else if (flag == 'biology') {
					this.title = "分子生物学检查预约";
					this.form.Name = data.Name
					this.form.DiagnosisType = data.DiagnosisType
					this.form.ApplicationItemCategory = '1' //默认检查项目
					this.form.ApplicationItemName = '分子生物学检查';
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
					this.form.ApplicationTime = year + "-" + month + "-" + date; //给申请时间默认当前
				} else if (flag == 'resistance') {
					this.title = "耐药检查预约";
					this.form.Name = data.Name
					this.form.DiagnosisType = data.DiagnosisType
					this.form.ApplicationItemCategory = '4' //默认检查项目
					this.form.ApplicationItemName = '耐药检查';
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
					this.form.ApplicationTime = year + "-" + month + "-" + date; //给申请时间默认当前
				} else if (flag == 'chest') {
					this.title = "胸片检查预约";
					this.form.ApplicationItemCategory = '3' //默认检查项目
					this.form.ApplicationItemName = '胸片检查';
					this.form.Name = data.Name
					this.form.DiagnosisType = data.DiagnosisType
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
					this.form.ApplicationTime = year + "-" + month + "-" + date; //给申请时间默认当前
				} else if (flag == 'Liver') {
					this.title = "肝功能检查预约";
					this.form.Name = data.Name
					this.form.DiagnosisType = data.DiagnosisType
					this.form.ApplicationItemCategory = '5' //默认检查项目
					this.form.ApplicationItemName = '肝功能检查';
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
					this.form.ApplicationTime = year + "-" + month + "-" + date; //给申请时间默认当前
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
					this.hasinfo.forEach(item => {
						if (item.path == 'Name' || item.path == 'DiagnosisType') {
							this.arrhasinfo.push(item)
						} else {
							this.arr.push(item)
						}
					})
					this.$baseConfirm(`确认要${this.title}此项目吗？`, null, () => {
						this.$emit("checkaPpointmentEdit", this.flag, this.form, this.arr);
						this.close();
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
