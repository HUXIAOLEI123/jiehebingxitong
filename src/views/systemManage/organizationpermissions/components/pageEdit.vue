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
			<div class="el-dialog-div" style="height: 50vh">
				<el-row>
					<el-col :span="24">
						<el-form-item label="上级菜单:" prop="ParentId">
							<el-cascader style="width: 100%" :options="OrganizationPermissionList" :props="propslist"
								v-model="formData.ParentId" :show-all-levels="false" clearable></el-cascader>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="菜单名称" prop="PermissionName">
							<el-input v-model="formData.PermissionName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="菜单路径:" prop="Code">
							<el-input v-model="formData.Code"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="图标:" prop="Icon">
							<el-input v-model="formData.Icon"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="排序:" prop="OrderSort">
							<el-input v-model="formData.OrderSort"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="是否隐藏菜单:" prop="IsHide">
							<el-checkbox v-model="formData.IsHide"></el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否按钮:" prop="IsButton">
							<el-checkbox v-model="formData.IsButton"></el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="按钮事件:" prop="Func">
							<el-input v-model="formData.Func"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<el-form-item label="是否保持状态:" prop="IsKeepAlive">
							<el-checkbox v-model="formData.IsKeepAlive"></el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="是否激活:" prop="Enabled">
							<el-checkbox v-model="formData.Enabled"></el-checkbox>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="描述:" prop="Description">
							<el-input v-model="formData.Description" type="textarea"></el-input>
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
		organizationpermissionsDetail,
		addOrganizationpermissions,
		Editorganizationpermissions
	} from "@/api/systemManage/OrganizationPermission";
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
				OrganizationPermissionList: [], //机构数组
				propslist: {
					value: "PermissionId",
					label: "PermissionName",
					children: "children",
					checkStrictly: true,
					emitPath: false,
				},
				// 表单数据
				formData: {
					Sort: "0",
					IsButton: false,
					Enabled: true
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
			// 获取机构信息列表
			async query() {
				let res = await getList({
					PageNumber: 1,
					PageSize: 9999
				})
				this.OrganizationPermissionList = this.convert(null, res.Response.items);
			},
			//递归
			convert(pid, arr) {
				let resultarr = arr.filter(p => p.ParentId == pid);
				if (resultarr.length > 0) {
					resultarr.forEach((item) => {
						item.children = [];
						item.children = this.convert(item.PermissionId, arr)
						if (item.children.length == 0) delete item.children
					});
				}
				return resultarr;
			},
			setformRules() {
				let arr = [{
						trigger: 'blur',
						message: "菜单名称",
						key: "PermissionName"
					},
					{
						trigger: 'blur',
						message: "菜单路由",
						key: "Code"
					},
					{
						trigger: 'blur',
						message: "是否按钮",
						key: "IsButton"
					},
					{
						trigger: 'blur',
						message: "是否激活",
						key: "Enabled"
					},
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
				this.$refs.refForm.resetFields();
				this.formConfig.visible = false;
			},
			// 提交
			submit() {
				let that = this;
				this.$refs.refForm.validate(async (valid) => {
					if (valid) {
						that.formConfig.loading = true;
						if (that.formConfig.opt == 'add') {
							await addOrganizationpermissions(that.formData);
							this.$message.success("新增成功");
							that.$emit("submit")
							that.handleClose()
						}
						if (that.formConfig.opt == 'edit') {
							let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy)
							await Editorganizationpermissions({
								PermissionId: that.formData.PermissionId,
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
				this.query();
				this.$nextTick(() => {
					this.formData = {
						...{
							Sort: "0",
							IsButton: false,
							Enabled: true,
							ParentId: param.ParentId
						}
					}
				})
				this.formConfig = Object.assign(this.formConfig, param);
				this.$set(this.formData, 'ParentId', param.ParentId)
				// 编辑之前先去查询详情
				if (param.opt === "edit") {
					let res = await organizationpermissionsDetail(param.PermissionId);
					this.$nextTick(() => {
						this.formData = {
							...res.Response
						}
					})
					this.formDataCopy = res.Response
				}
				this.formConfig.loading = false;
			},
		},
	};
</script>
