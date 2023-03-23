<template>
	<el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%" top="5px"
		@close="close">
		<div slot="title" class="dialog-title">
			<div class="sectionstly"></div>
			<span class="title-text">{{title}}</span>
			<div class="button-right">
				<span class="title-close" @click="close"></span>
			</div>
		</div>
		<el-form class="form_row" ref="form" :model="form" label-width="100px">
			<div class="detailstitlo">
				<p class="xqtitolstyle">档案信息</p>
			</div>

			<el-row :gutter="20">
				<!-- <el-col :span="10">
          <el-form-item label="档案编号" >
        <span>{{ form.FileNumber }}</span>
          </el-form-item>
        </el-col> -->

				<el-col :span="10">
					<el-form-item label="姓名">
						<span>{{ form.Name }}</span>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="性别">
						<span>{{ form.SexName }}</span>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row :gutter="20">
				<el-col :span="10">
					<el-form-item label="证件号">
						<span>{{ form.IdcardNo }}</span>
					</el-form-item>
				</el-col>

				<el-col :span="10">
					<el-form-item label="转出机构">
						<span>{{ form.FormerOrganizationName }}</span>
					</el-form-item>
				</el-col>


			</el-row>

			<el-row :gutter="20">
				<el-col :span="10">
					<el-form-item label="联系电话">
						<span>{{ form.Phone }}</span>
					</el-form-item>
				</el-col>


				<el-col :span="10">
					<el-form-item label="居住地址">
						<span>{{ form.Address }}</span>
					</el-form-item>
				</el-col>
			</el-row>

			<div class="detailstitlo">
				<p class="xqtitolstyle">转出申请</p>
			</div>
			<el-row :gutter="20">
				<el-col :span="10">
					<el-form-item label="申请机构">
						<span>{{ form.MoveOrganizationName }}</span>
					</el-form-item>
				</el-col>
				<!--  -->

				<el-col :span="10">
					<el-form-item label="申请日期">
						<span>{{ form.OperateTimeFirst | parseTime("{y}-{m}-{d}")  }}</span>
					</el-form-item>
				</el-col>
			</el-row>


			<el-row :gutter="20">
				<el-col :span="10">
					<el-form-item label="申请人员">
						<span>{{ form.FormerResponsibility }}</span>
					</el-form-item>
				</el-col>


				<el-col :span="10">
					<el-form-item label="申请原因">
						<span>{{ form.Reason }}</span>
					</el-form-item>
				</el-col>
			</el-row>


			<div class="detailstitlo">
				<p class="xqtitolstyle">转出审核</p>
			</div>
			<el-row :gutter="20">
				<el-col :span="10">
					<el-form-item label="审核结果">
						<span>{{ form.AuditStatus=='1'?'合格':'不合格'}}</span>
					</el-form-item>
				</el-col>

			</el-row>
			<el-row :gutter="20">
				<el-col :span="13">
					<el-form-item label="审核备注">
						<span>{{ form.AuditReason }}</span>
					</el-form-item>
				</el-col>
			</el-row>


		</el-form>
		<div slot="footer">
			<el-button class="cancelbtn" @click="close">取 消</el-button>
			<!--  <el-button type="primary" @click="handlerSave">确 定</el-button> -->
		</div>
	</el-dialog>
</template>
<script>
	/* api */
	export default {
		name: "Edit",
		data() {
			return {
				title: "",
				// 弹窗的开关
				dialogVisible: false,
				value1: '',
				flag: "",
				form: {
					faultType2: ''
				},
			};
		},
		methods: {
			// 确认新增？修改
			show(flag, data) {
				this.dialogVisible = true;
				this.title = "档案转移审核";
				this.form = {
					...data
				};
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
	::v-deep .el-form-item__label {
		font-size: 16px;
		color: #999999 100%;

	}

	span {
		font-size: 16px;
		color: #252D57;

	}
</style>
