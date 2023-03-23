<template>
	<el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" top="50px" width="65%"
		@close="close" append-to-body>
		<div slot="title" class="dialog-title">
			<div class="sectionstly"></div>
			<span class="title-text">{{title}}</span>
			<div class="button-right">
				<span class="title-close" @click="close"></span>
			</div>
		</div>
		<el-form class="form_row" ref="form" :model="form" label-width="120px">
			<div class="detailstitlo">
				<p class="xqtitolstyle">结案信息</p>
			</div>
			<el-row :gutter="20">

				<el-col :span="8">
					<el-form-item label="档案编号">
						<span>{{ form.FileNumber }}</span>
					</el-form-item>
				</el-col>


				<el-col :span="8">
					<el-form-item label="姓名">
						<span>{{ form.Name }}</span>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="证件号">
						<span>{{ form.CardNo }}</span>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="结案人员">
						<span>{{ form.EvaluationDoctor }}</span>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="停止治疗时间">
						<span>{{ form.EvaluationDate| parseTime("{y}-{m}-{d}")   }}</span>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="停止治疗原因">
						<span>{{ form.StopResultName }}</span>
					</el-form-item>
				</el-col>


				<el-col :span="8">
					<el-form-item label="应访视次数">
						<span>{{ form.VisitNumber }}</span>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="实际访视次数">
						<span>{{ form.ActualVisitNumber }}</span>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="应服药次数">
						<span>{{ form.TakeMedicineNumber }}</span>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="实际服药次数">
						<span>{{ form.ActualTakeMedicineNumber }}</span>
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="服药率">
						<span>{{ form.MedicationRate+'%' }}</span>
					</el-form-item>
				</el-col>


				<!-- <el-col :span="8">
          <el-form-item label="是否电话随访">
            <span v-if="form.IsPhone">{{ form.IsPhone==true?'是':'否'}}</span>
          </el-form-item>
        </el-col> -->

				<!-- <el-col :span="8">
          <el-form-item label="是否就诊">
            <span v-if="form.IsDiagnosis">{{ form.IsDiagnosis==true?'是':'否'}}</span>
          </el-form-item>
        </el-col> -->

				<!-- <el-col :span="8">
          <el-form-item label="是否确认结果">
            <span  v-if="form.IsResult">{{ form.IsResult==true?'是':'否'}}</span>
          </el-form-item>
        </el-col> -->



				<el-col :span="8">
					<el-form-item label="治疗方案">
						<span>{{ form.TreatmentPlanName }}</span>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="是否规范">
						<span>{{ form.IsStandard?'是':'否' }}</span>
					</el-form-item>
				</el-col>


				<el-col :span="8">
					<el-form-item label="备注">
						<span>{{ form.Remarks }}</span>
					</el-form-item>
				</el-col>




			</el-row>
			-
		</el-form>
		<div slot="footer">
			<el-button class="cancelbtn" @click="close">取 消</el-button>
		</div>
	</el-dialog>
</template>
<script>
	import {
		plysettlementList,
	} from '@/api/PulmonaryClose.js'
	export default {
		name: "Edit",

		data() {
			return {
				title: "",
				closeId: '',
				innerVisible: false,
				flag: "",
				form: {},


			};
		},
		created() {


		},


		methods: {
			// 确认新增？修改
			async show(flag, id) {
				this.innerVisible = true;
				this.title = "详情";
				this.flag = flag;
				if (flag == 'details') {
					const res = await plysettlementList({
						closeId: id
					})
					let {
						StatusCode,
						Message
					} = res
					if (StatusCode !== 200) {
						return this.$baseMessage(Message || '数据获取失败', 'error')
					}
					this.form = {
						...res.Response
					}
				} else if (flag == 'details2') {

					const res = await plysettlementList({
						diagnosisId: id
					})
					let {
						StatusCode,
						Message
					} = res
					if (StatusCode !== 200) {
						return this.$baseMessage(Message || '数据获取失败', 'error')
					}
					this.form = {
						...res.Response
					}
				}
			},

			//取消
			close() {
				this.innerVisible = false;
				// 重置数据(封装的方法)
				this.form = this.$options.data().form;
				this.$refs["form"].resetFields();
			},
		},
	};
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
