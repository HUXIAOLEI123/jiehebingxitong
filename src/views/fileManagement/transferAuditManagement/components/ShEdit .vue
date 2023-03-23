<template>
	<el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" top="5px"
		@close="close">
		<div slot="title" class="dialog-title">
			<div class="sectionstly"></div>
			<span class="title-text">{{title}}</span>
			<div class="button-right">
				<span class="title-close" @click="close"></span>
			</div>
		</div>
		<div class="contentbox">
			<el-form class="form_row" ref="form" :model="form" label-width="100px" :rules="rules">
                <div class="detailstitlo">
                  <p class="xqtitolstyle">档案信息</p>
                </div>
				<el-row :gutter="20">
					<!-- <el-col :span="12">
			          <el-form-item label="档案编号">
			            <el-input v-model="form.FileNumber" disabled  ></el-input>
			          </el-form-item>
			        </el-col> -->

					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input v-model="form.Name" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别">
							<el-input v-model="form.SexName" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>


				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="证件号">
							<el-input v-model="form.IdcardNo" disabled></el-input>
						</el-form-item>
					</el-col>


					<el-col :span="12">
						<el-form-item label="转移机构">
							<el-input v-model="form.FormerOrganizationName" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系电话">
							<el-input v-model="form.Phone" disabled></el-input>
						</el-form-item>
					</el-col>


					<el-col :span="12">
						<el-form-item label="居住地址">
							<el-input v-model="form.Address" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
 
                <div class="detailstitlo">
                  <p class="xqtitolstyle">转移申请</p>
                </div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="申请机构">
							<el-input v-model="form.MoveOrganizationName" disabled></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="申请日期">
							<el-input v-model="form.OperateTimeFirst" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="申请人员">
							<el-input v-model="form.FormerResponsibility" disabled></el-input>
						</el-form-item>
					</el-col>


					<el-col :span="12">
			  	<el-form-item label="申请原因">
							<el-input v-model="form.Reason" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>

				<!-- 必传参数 -->
				<div class="detailstitlo">
				  <p class="xqtitolstyle">转移审核</p>
				</div>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="审核结果" prop="AuditStatus">
							<el-select v-model="form.AuditStatus" placeholder="请选择活动区域">
								<el-option label="通过" value="1"></el-option>
								<el-option label="未通过" value="2"></el-option>
							</el-select>

							<!-- <el-input v-model="form.AuditStatus"  ></el-input> -->
						</el-form-item>
					</el-col>


					<!-- <el-col :span="12">
			          <el-form-item label="唯一标识" prop="FileTransferId">
			            <el-input v-model="form.FileTransferId"  ></el-input>
			          </el-form-item>
			        </el-col> -->
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="审核备注" prop="Response">
							<el-input v-model="form.Response" type="textarea"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div slot="footer">
			<el-button class="cancelbtn" @click="close">取 消</el-button>
			<el-button class="savebtn" @click="handlerSave" type="primary">提 交</el-button>

		</div>
	</el-dialog>
</template>
<script>
	/* api */
	import {
		auditlicationtransfertist,
		createauditinformation
	} from '@/api/FileTransfer.js'
	export default {
		name: "Edit",
		data() {
			return {
				title: "",
				// 弹窗的开关
				dialogVisible: false,

				flag: "",
				form: {},
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

					IdcardNo: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					FormerOrganizationName: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					Phone: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					Address: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					MoveOrganizationName: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					OperateTimeFirst: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					FormerResponsibility: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],


					Reason: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					AuditStatus: [{
						required: true,
						message: "请输入",
						trigger: "change"
					}, ],

					FileTransferId: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

					Response: [{
						required: true,
						message: "请输入",
						trigger: "blur"
					}, ],

				},



			};
		},
		methods: {
			// 确认新增？修改
			show(flag, data) {
				this.dialogVisible = true;
				this.title = "档案转移审核";
				// data.OperateTimeFirst.slice(0,10)
				this.form = {
					...data
				};
				if (data.AuditStatus == '0') { //如果未审核默认给通过
					this.form.AuditStatus = '1';
				}

			},



			// 保存
			handlerSave() {
				this.$refs["form"].validate((valid) => {
					if (!valid) return;
					this.$baseConfirm(`确认要审核此项目吗？`, null, async () => {
						const res = await createauditinformation(this.form.FileTransferId, this.form
							.AuditStatus, "'" + this.form.Response + "'")
						this.$emit("submit");
						this.$baseMessage('审核成功', "success");
						this.close();
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


	}
</script>

<style lang=scss scoped>
	.contentbox {
		height: 600px;
	}
</style>
