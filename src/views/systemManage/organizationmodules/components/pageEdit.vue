<template>
	<el-dialog :title="formConfig.title" :visible.sync="formConfig.visible" :width="formConfig.width"
		:close-on-click-modal="false" :close-on-press-escape="false" @close="handleClose" top="20vh">
		<div slot="title" class="dialog-title">
			<div class="sectionstly"></div>
			<span class="title-text">{{formConfig.title}}</span>
			<div class="button-right">
				<span class="title-close" @click="handleClose"></span>
			</div>
		</div>
		<el-form :model="formData" :rules="formRules" v-loading="formConfig.loading" ref="refForm" label-width="130px"
			class="form_row">
			<div class="el-dialog-div" style="height: 30vh">
				<el-row>
					<el-col :span="24">
						<el-form-item label="上级接口:" prop="ParentId">
							<el-cascader style="width: 100%" :options="tenantData" :props="propslist"
								v-model="formData.ParentId" :show-all-levels="false" clearable></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="接口名称:" prop="ModuleName">
							<el-input v-model="formData.ModuleName" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="链接地址:" prop="LinkUrl">
							<el-input v-model="formData.LinkUrl" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="区域:" prop="Area">
							<el-input v-model="formData.Area" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="排序:" prop="OrderSort">
							<el-input v-model="formData.OrderSort" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="描述:" prop="Description">
							<el-input v-model="formData.Description" />
						</el-form-item>
					</el-col>
					<el-col :span="2">
						<el-form-item label="状态:" prop="Enabled">
							<el-checkbox v-model="formData.Enabled"></el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button class="cancelbtn" @click="handleClose">取 消</el-button>
			<el-button  class="savebtn"  type="primary" @click="submit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		getList,
		Editorganizationmodules,
		organizationmodulesDetail,
		addOrganizationmodules
	} from "@/api/systemManage/OrganizationModule";
	export default {
		data() {
			return {
				// 表单配置
				formConfig: {
					title: "",
					visible: false,
					width: "70%",
					opt: "",
					loading: false,
					rederView: true
				},
				tenantData: [], //机构数组
				propslist: {
					value: "ModuleId",
					label: "ModuleName",
					children: "Children",
					checkStrictly: true,
					emitPath: false,
					lazy: true,
					lazyLoad: this.lazyLoad
				},
				// 表单数据
				formData: {
					Status: true,
					RoleIds: []
				},
				formDataCopy: {},
				// 验证规则
				formRules: {},

			};
		},
		created() {
			this.setformRules()
		},
		methods: {

			//获取接口列表
			async getModuleData() {
				const res = await getList({
					PageNumber: 1,
					PageSize: 9999,
					ParentId: null
				});
				this.tenantData = res.Response.items;
			},
			async lazyLoad(node, resolve) {
				let {
					level
				} = node;
				let params = node.value
				getList({
					ParentId: params,
					PageNumber: 1,
					PageSize: 9999,
				}).then(res => { //接口
					if (res && res.StatusCode == 200) {
						let data = [res.Response]
						if (level > 0) {
							data = res.Response.items
						}
						if (level == 3) {
							data.forEach(item => {
								item.leaf = level >= 3
							});
						}
						resolve(data);
					} else {
						this.$message.error('获取接口数据失败')
					}
				})
			},
			setformRules() {
				let arr = [{
						trigger: 'blur',
						message: "接口名称",
						key: "ModuleName"
					},
					{
						trigger: 'blur',
						message: "链接地址",
						key: "LinkUrl"
					},
					{
						trigger: 'blur',
						message: "排序",
						key: "OrderSort"
					}
				]
				for (let item of arr) {
					let obj = {
						trigger: item.trigger,
						required: true,
					}
					if (item.trigger == 'blur') obj.message = item.message + '不能为空';
					if (item.trigger == 'change') obj.message = '请选择' + item.message;
					this.formRules[item.key] = obj
				}
			},
			//关闭弹框
			handleClose() {
				this.$nextTick(() => {
					this.$refs['refForm'].resetFields();
				})
				this.formConfig.visible = false;
			},
			// 提交
			submit() {
				let that = this;
				this.$refs.refForm.validate(async (valid) => {
					if (valid) {
						if (that.formConfig.opt == 'add') {
							await addOrganizationmodules(that.formData);
							this.$message.success("新增成功");
							that.$emit("submit")
							that.handleClose()
						}
						if (that.formConfig.opt == 'edit') {
							let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy)
							await Editorganizationmodules({
								ParentId: that.formData.ParentId,
								data: arr
							})
							this.$message.success("编辑成功");
							that.$emit("submit")
							that.handleClose()
						}
					}
				});
			},
			// 初始化弹框，获取详情
			async getDetail(param) {
				if (param.opt == "" || param.opt == null) {
					return this.$message.error("未知操作");
				}
				this.$nextTick(() => {
					this.formData = {
						...{
							Enabled: true
						}
					}
				})
				this.formConfig = Object.assign(this.formConfig, param);
				// 编辑之前先去查询详情
				if (param.opt === "edit") {
					let res = await organizationmodulesDetail(param.ParentId);
					this.$nextTick(() => {
						this.formData = {
							...res.Response
						}
					})
					this.formDataCopy = res.Response
				}
			},
		},
	};
</script>
