<template>
		<el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="80%" top="20px"
			@close="close">
			<div slot="title" class="dialog-title">
				<div class="sectionstly"></div>
				<span class="title-text">{{ title }}</span>
				<div class="button-right">
					<span class="title-close" @click="close"></span>
				</div>
			</div>
			<el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="120px">
				<!-- RegionCode -->
				<!-- <el-row :gutter="20">
		    <el-col :span="7">
		      <el-form-item label="行政区划" prop="RegionCode">
		        <MyCascader v-model="form.RegionCode" :props="props" clearable></MyCascader>
		      </el-form-item>
		    </el-col>
		  </el-row> -->
				<el-row>
					<el-col :span="8">
						<el-form-item label="姓名" prop="Name">
							<el-input v-model="form.Name" placeholder="请输入内容" :disabled="title == '详情'"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="证件类型" prop="CardType">
							<el-select v-model="form.CardType">
								<el-option v-for="item in A0004" :key="item.DetailsCode" :label="item.DetailsName"
									:value="item.DetailsCode"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="证件号" prop="CardNo">
							<el-input v-model="form.CardNo" @input.native="idCardNoChange" placeholder="请输入内容"
								:disabled="title == '详情'"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="性别">
							<el-select v-model="form.Sex">
								<el-option v-for="item in A0003" :key="item.DetailsCode" :label="item.DetailsName"
									:value="item.DetailsCode"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="年龄">
							<el-input v-model="form.Age" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="出生日期">
							<el-date-picker v-model="form.BirthDay" align="center" type="date" :disabled="IsCardTypefalg">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="民族" prop="Nation">
							<el-select filterable v-model="form.Nation">
								<el-option v-for="item in A0005" :key="item.DetailsCode" :label="item.DetailsName"
									:value="item.DetailsCode"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="国籍" prop="Nationality">
							<el-select filterable v-model="form.Nationality">
								<el-option v-for="item in A0038" :key="item.DetailsCode" :label="item.DetailsName"
									:value="item.DetailsCode"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系方式" prop="Phone">
							<el-input v-model="form.Phone" placeholder="请输入内容" :disabled="title == '详情'"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<!-- <el-col :span="8">
						<el-form-item label="档案编号">
							<el-input v-model="form.FileNumber" placeholder="请输入内容" disabled>
							</el-input>
						</el-form-item>
					</el-col> -->
					<el-col :span="8">
						<el-form-item label="建档日期" prop="FileDate">
							<el-date-picker v-model="form.FileDate" type="date" align="center" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<!-- <el-form-item label="管理机构" prop="AdminOrganization">
							<el-input v-model="form.AdminOrganization" placeholder="请输入内容" :disabled="title == '详情'">
							</el-input>
						</el-form-item> -->
						<el-form-item label="管理机构">
							<!-- <el-cascader
						    clearable
						    
						    :props="{checkStrictly:true,emitPath:false,label:'OrganizationName',value:'OrganizationId'}"
						    v-model="form.AdminOrganization"
							 :show-all-levels="false"
						    :options="tenantData"/> -->
							<!-- <el-cascader @change="changeOrg" style="width:100%" :options="tenantData" :props="propslist"
								v-model="form.AdminOrganization" clearable></el-cascader> -->
							<el-cascader style="width: 100%"  disabled :options="tenantData" @change="changeOrg"
								:props="propslist" v-model="form.AdminOrganization" :show-all-levels="false" clearable>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="责任医师">
							<el-input v-model="form.ResponsibilityName" disabled placeholder="请选择责任医师"></el-input>
							<!-- <el-select v-model="form.Responsibility">
								<el-option v-for="item in options" :key="item.index" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select> -->
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
		
					<el-col :span="8">
						<el-form-item label="居住行政区划:" prop="RegionCode">
							<MyCascader v-model="form.RegionCode" :options="regionsData" :show-all-levels="true"
								:props="propsData" clearable @callbacklable="Regionlable"></MyCascader>
							<!-- <el-cascader  style="width:100%" :options="regionsData"  :props="propsData" 
						    v-model="form.RegionCode"  clearable></el-cascader> -->
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="居住地址" prop="Address">
							<el-input v-model="form.Address" placeholder="请输入内容" :disabled="title == '详情'"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="户籍行政区划:" prop="ResidenceRegionCode">
							<MyCascader v-model="form.ResidenceRegionCode" :options="regionsData" :show-all-levels="true"
								:props="propsData" clearable @callbacklable="ResidenceRegionlable"></MyCascader>
							<!-- <el-cascader  style="width:100%" :options="regionsData"  :props="propsData" 
						    v-model="form.RegionCode"  clearable></el-cascader> -->
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="户籍地址" prop="ResidenceAddress">
							<el-input v-model="form.ResidenceAddress" placeholder="请输入内容" :disabled="title == '详情'">
							</el-input>
						</el-form-item>
					</el-col>
					<!-- <el-col :span="8">
						<el-form-item label="职业">
							<el-select v-model="form.Occupation">
								<el-option v-for="item in A0007" :key="item.DetailsCode" :label="item.DetailsName"
									:value="item.DetailsCode">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col> -->
					
				</el-row>
				<el-row>
					<el-col :span="8" v-if="IsUserAcc">
						<el-form-item label="建档人">
							<el-input v-model="form.UserAccName" placeholder="请输入内容" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工作地址" prop="WorkUnit">
							<el-input v-model="form.WorkUnit" placeholder="请输入内容" :disabled="title == '详情'"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="人群分类" prop="CrowClass">
							<el-select v-model="form.CrowClass">
								<el-option v-for="item in A0037" :key="item.DetailsCode" :label="item.DetailsName"
									:value="item.DetailsCode"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="20">
						<el-form-item label="人群属性" prop="ContractStaffs">
							<el-checkbox-group v-model="form.ContractStaffs" :disabled="title == '详情'">
								<el-checkbox v-for="item in ContractStaffs" :key="item.DetailsName"
									:label="Number(item.DetailsCode)">
									{{ item.DetailsName }}
								</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer">
				<el-button class="cancelbtn" @click="close">取 消</el-button>
				<el-button class="savebtn" type="primary" @click="handlerSave" :disabled="title == '详情'">确 定</el-button>
			</div>
			<ResponsSelect ref="selectRespons"></ResponsSelect>
			<!-- <inEdit ref="inedit" :closepage='close'></inEdit> -->
		</el-dialog>
</template>
<script>
	/* api */
	import {
		usedictionarydetails
	} from '@/api/dict.js'
	import MyCascader from "@/components/MyCascader"
	import ResponsSelect from "../components/ResponsSelect.vue"
	import inEdit from "../components/inEdit.vue"
	import {
		addmanagementist,
		updatemanagementist,
		generatefilenumber,
		ardNoemanagementist,
		detailmanagementist
	} from '@/api/Person.js'
	import {
		getOrganizationList,
		getorgcascader,
		getuserDrop
	} from '@/api/organizationManagement.js'
	import {
		regions,
		getRegions
	} from "@/api/inputselect.js";
	export default {
		name: "Edit",
		components: {
			MyCascader,
			ResponsSelect,
			inEdit
		},
		data() {
			return {
				props: {
					emitPath: false,
					label: "RegionName",
					children: "Children",
					value: "RegionCode",
					multiple: false,
					checkStrictly: true,
					lazy: true,
					A0003: [],
					dictarr: [],
					A0007: [],

				},
				A0037: [],
				A0005: [],
				A0038: [],
				A0004: [],
				A0003: [],
				A0007: [],
				IsUserAcc: false,
				ContractStaffs: [],
				propslist: {
					value: "OrganizationId",
					label: "OrganizationName",
					children: "Children",
					checkStrictly: true,
					emitPath: false,
					lazy: true,
					lazyLoad: this.lazyLoad
				},
				propsData: {
					emitPath: false,
					label: "RegionName",
					children: "Children",
					value: "RegionCode",
					multiple: false,
					checkStrictly: true,
					lazy: true,
				},
				title: "",
				IsCardTypefalg: true, //出生日期是否禁用
				// 弹窗的开关
				dialogVisible: false,
				flag: "",
				ContractStaffList: [],
				// 保存修改信息
				copyform: {},
				form: {
					ContractStaffs: [],
					RegionCode: '',
					AdminOrganization: '',
					CardType: '01',
					Nation: '1',
					Nationality: '156',
					Address:'',
					ResidenceAddress:'',
				},
				RegionCode: '',
				hasinfo: [],
				dictarr: [],
				tenantData: [], //机构列表
				options: [], //下拉列表
				regionsData: [],
				//  表单验证
				rules: {
					Name: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					Sex: [{
						required: true,
						message: "请选择",
						trigger: "blur"
					}, ],
					CardType: [{
						required: true,
						message: "请选择证件类型",
						trigger: "blur"
					}, ],
					Age: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					FileDate: [{
						required: true,
						message: "请选择建档日期",
						trigger: "blur"
					}, ],
					Nationality: [{
						required: true,
						message: "请选择",
						trigger: "blur"
					}, ],
					Phone: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					Nation: [{
						required: true,
						message: "请选择",
						trigger: "blur"
					}, ],
					CardNo: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
                    ResidenceRegionCode: [{
						required: true,
						message: "请选择",
						trigger: "chance"
					}, ],
                    RegionCode: [{
						required: true,
						message: "请选择",
						trigger: "chance"
					}, ],
					Occupation: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					CrowClass: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					WorkUnit: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					Address: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					ResidenceAddress: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					BirthDay: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					Responsibility: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],
					ContractStaffs: [{
						required: true,
						message: "请至少选择一项",
						trigger: "change"
					}, ],


				},
			};
		},
		async created() {
			await this.usedictionarydetails()
			await this.funusedictionarydetails()
			await this.funusedictionarydetails2()
			await this.funusedictionarydetails3()
			await this.funusedictionarydetails4()
			await this.funusedictionarydetails5()
			await this.funusedictionarydetails6()
			this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
			this.form.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
			await this.getorganizationlist() //获取机构列表
			// await this.getarchivesnum() //获取档案编号
			// await this.getorganizationlist() //获取机构列表
			// await this.getuserDropList() //根据机构获取用户下拉列表

		},
		methods: {
			//人群属性
			async usedictionarydetails(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0021'],
					PageNumber: 1,
					PageSize: 90
				})
				this.ContractStaffs = res.Response.items
			},
			//行政区域列表
			async regionsList() {
				const res = await regions(this.form.RegionCode);
				this.regionsData = res.Response;

			},
			async detailmanagementistlist(data) {
				const res = await detailmanagementist(data.PersonId)
				this.form = {
					...res.Response,
					// ...this.form
				};
				this.copyform = {
					...res.Response,
					// ...this.form
				}
			},
			//获取档案编号
			async getarchivesnum() {
				const res = await generatefilenumber();
				this.form.FileNumber = res;
			},
			async lazyLoad(node, resolve) {
				let {
					level
				} = node;
				let params = node.value
				getOrganizationList({
					Org_OrganizationId: params,
					PageSize: 9999,
				}).then(res => { //接口
					if (res && res.StatusCode == 200) {
						let data = [res.Response]
						if (level > 0) {
							data = res.Response.items
						}
						resolve(data);
					} else {
						this.$message.error('获取地区数据失败')
					}
				})
			},
			//医师下拉
			async getuserDropList() {
				var organizationId = this.form.AdminOrganization;
				var selectOnly = true;
				const res = await getuserDrop(organizationId, selectOnly);
				this.options = []; //下拉列表
				if (res.Response.length !== 0) {
					if (res.Response.length == 1) {
						this.form.Responsibility = res.Response[0].Id;

					}
					for (let item of res.Response) {
						this.options.push({
							label: item.Name,
							value: item.Id,
						});
					}
				}
			},
			//获取机构列表
			async getorganizationlist() {
				const res = await getorgcascader(this.form.AdminOrganization);
				// for(let i in res.Response){
				// 	res.Response[i]['label']=res.Response[i].OrganizationName
				// 	res.Response[i]['value']=res.Response[i].OrganizationId
				// }
				this.tenantData = res.Response;
			},
			async funusedictionarydetails(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0003'],
					PageNumber: 1,
					PageSize: 90
				})
				this.A0003 = res.Response.items
			},
			async funusedictionarydetails2(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0007'],
					PageNumber: 1,
					PageSize: 90
				})
				this.A0007 = res.Response.items
			},
			async funusedictionarydetails3(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0037'],
					PageNumber: 1,
					PageSize: 90
				})
				this.A0037 = res.Response.items
			},
			async funusedictionarydetails4(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0005'],
					PageNumber: 1,
					PageSize: 90
				})
				this.A0005 = res.Response.items
			},
			async funusedictionarydetails5(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0038'],
					PageNumber: 1,
					PageSize: 90
				})
				this.A0038 = res.Response.items
			},
			async funusedictionarydetails6(params) {
				const res = await usedictionarydetails({
					CategoryCode: ['A0004'],
					PageNumber: 1,
					PageSize: 90
				})
				this.A0004 = res.Response.items
			},
			Regionlable(value) { //选择行政区域给居住地址，户籍地址赋值
				let newvalue = '';
				let newarr = value.reverse();
				for (let i in newarr) {
					newvalue = value[i] + '/' + newvalue
				}
				// this.form.ResidenceAddress = newvalue;
				this.form.Address = newvalue;
				this.$forceUpdate();
			},
			ResidenceRegionlable(value) { //选择行政区域给居住地址，户籍地址赋值
				let newvalue = '';
				let newarr = value.reverse();
				for (let i in newarr) {
					newvalue = value[i] + '/' + newvalue
				}
				this.form.ResidenceAddress = newvalue;
				this.$forceUpdate();
				// this.form.Address = newvalue;
			},
			// //获取选择到的医师信息
			// getSelectRespons(data){
			//      this.$refs.patientInfoRefFrom.resetFields();
			//      this.patientInfo = data[0]
			//      this.formData.patientName = data[0].patientName;
			//      this.formData.patientNo = data[0].patientID;
			//      this.formData.medicalRecordNo = data[0].medicaL_RECORD_NO;//病历号
			// },
			//    //选择医师
			// selectRespons(){
			//      var param = {
			//        title:'选择医师',
			//        visible:true,
			//        OrganizationId:this.form.AdminOrganization,
			//        num:1
			//      }
			//      this.$refs.selectRespons.getDetail(param)
			// },
			//选择行政区域
			changeOrg(value) {
				this.form.AdminOrganization = value;
				this.options = [];
				this.form.Responsibility = '';
				// this.getuserDropList()
			},

			// 证件号change触发事件
			async idCardNoChange() {
				const IdNmber = this.form.CardNo
				if (IdNmber.length !== 18) return
				let res = await ardNoemanagementist(IdNmber);
				let self = this;
				if (res.Response !== undefined && res.Response != null && res.Response.length > 0) {
					if (res.Response.length !== 0) {
						// this.form.CardNo = '';
						// this.form.Age = '';
						// this.form.Sex = '';
						// this.form.BirthDay = '';
						// return this.$message.error("本系统已存在该证件号,请重新输入");
						let AdminOrganizationRegionName = res.Response[0].AdminOrganizationRegionName;
						let AdminOrganizationName = res.Response[0].AdminOrganizationName;
						let OperateTimeFirst = res.Response[0].OperateTimeFirst.slice(0, 10);
						// 	self.close()
						//`当前人员已于${OperateTimeFirst}在${AdminOrganizationRegionName}${AdminOrganizationName}机构建档,是否提交转入申请`,'提示'
						// self.$baseConfirm(`当前人员已于${OperateTimeFirst}在${AdminOrganizationRegionName}${AdminOrganizationName}机构建档,是否提交转入申请`, null,() => {
						// 	self.$refs.inedit.show(flag, res.Response[0])
						// 	self.close()
						// })
						this.$confirm(
							`当前输入的证件号已存在,请确认`,
							'提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
							self.form.CardNo = '';
							// self.$refs.inedit.show(res.Response[0])
						})
					}
				} else {
					const sex = IdNmber.slice(16, 17)
					const myDate = new Date();
					const month = myDate.getMonth() + 1;
					const day = myDate.getDate();
					//出生日期
					this.form.BirthDay = IdNmber.slice(6, 10) + '-' + IdNmber.slice(10, 12) + '-' + IdNmber.slice(
						12, 14)
					// 年龄
					if (IdNmber.slice(6, 14).length == 8) {
						this.form.Age = myDate.getFullYear() - IdNmber.slice(6, 10) - 1
						if (IdNmber.slice(10, 12) < month || IdNmber.slice(10, 12) == month && IdNmber.slice(12,
								14) <= day) {
							this.form.Age++
						}
						// 性别
						if (IdNmber.length == 17 || IdNmber.length == 18) {
							if (sex % 2 == 0) {
								this.form.Sex = '2'
							} else if (sex % 2 == 1) {
								this.form.Sex = '1'
							}
						}
					}
				};
				this.$forceUpdate(); //刷新一下form
			},

			// 确认新增？修改
			async show(flag, data) {
				this.dialogVisible = true;
				this.flag = flag;
				if (flag == "add") {
					this.title = "建档";

					this.form.UserAccName = this.$utilsFun.getUserInfo().real_Name; //给建档人默认当前人
					this.form.UserAcc = this.$utilsFun.getUserInfo().identifier; //给建档人默认当前人
					this.form.ResponsibilityName = this.$utilsFun.getUserInfo().real_Name; //给建档人默认当前人
					this.form.Responsibility = this.$utilsFun.getUserInfo().identifier; //给建档人默认当前人

					this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
					this.form.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
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
					this.form.FileDate = year + "-" + month + "-" + date; //给建档时间默认当前
					this.IsUserAcc = true;
					// this.form.RegionCode = data
					// await this.getarchivesnum() //获取档案编号
					// await this.getorganizationlist() //获取机构列表
					// await this.getuserDropList() //根据机构获取用户下拉列表
					await this.regionsList() //行政区域列表
				} else if (flag == "details") {
					this.title = "详情";
					this.form = {
						...data
					};
				} else if (flag == "edit") {
					this.title = "编辑";
					this.IsUserAcc = false;
					await this.detailmanagementistlist(data)
					// this.form = {
					// 	...data
					// };
					// this.copyform = {
					// 	...data
					// }
					await this.getorganizationlist() //获取机构列表
					// await this.getuserDropList() //根据机构获取用户下拉列表
					await this.regionsList() //行政区域列表
					// this.form.UserAccName = this.$utilsFun.getUserInfo().real_Name; //给建档人默认当前人
					// this.form.UserAcc = this.$utilsFun.getUserInfo().identifier; //给建档人默认当前人

				}
				// this.ContractStaffsdata = this.form.ContractStaffs;


			},
			// 保存
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

					this.$baseConfirm(`确认要${this.title}此患者吗？`, null, async () => {
						let subData = Object.assign({}, this.form)
						//  subData=subData.ContractStaffs.toString()
						if (this.flag == 'add') {

							const res = await addmanagementist(subData)

							let {
								StatusCode,
								Message,
								Response
							} = res;
							if (!Response || StatusCode != 200) {
								return this.$baseMessage(
									Message || '数据获取失败', 'error'
								)
							} else {
								this.$baseMessage('添加成功', "success")
								this.$emit("submit")
								this.close();
							}
							// this.managementist()
						} else if (this.flag == 'edit') {
							const personId = subData.PersonId
							const res = await updatemanagementist({
								personId
							}, this.hasinfo)
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

							// this.managementist()
						}


					});
				});
			},
			close() {
				this.dialogVisible = false;
				// 重置数据(封装的方法)
				this.form = this.$options.data().form;
				this.$refs["form"].resetFields();
			},

		},
		watch: {
			'form.CardType': function() {
				if (this.form.CardType !== '01') {
					this.IsCardTypefalg = false;
				} else {
					this.IsCardTypefalg = true;
				}
			}
		}
	};
</script>

<style lang=scss scoped>
	.el-row {
		margin: 5px 0;
	}

	.row {
		margin-left: 60px;
	}
</style>
