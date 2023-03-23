<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="75%" @close="close" top="20px"
    append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">后续随访详情</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>

    <el-form class="form_row" ref="form" :model="form" label-width="170px" :hide-required-asterisk="title == '查看详情'">

      <div class="detailstitlo">
        <p class="xqtitolstyle">基本信息</p>
      </div>

      <el-row>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="治疗卡编号">
            <span>{{ form.DiagnosisId }}</span>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="随访日期">
            <span>{{ form.VisitDate| parseTime("{y}-{m}-{d}")   }}</span>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="督导人员">
            <span>{{ form.SupervisorName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="随访方式">
            <!-- <span v-if="form.VisitType==1"> 门诊 </span>
            <span v-else-if="form.VisitType==2">家庭</span>
            <span v-else>电话</span> -->
			<span> {{form.VisitTypeName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建议日吸烟量">
            <span> {{form.ProposalAlcohol}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建议日喝酒量">
            <span> {{form.ProposalAlcohol}}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="症状及体征">
            <span>{{ form.SymptomName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- 列表单选 -->
        <el-col :span="24">
          <!-- <span class="headingstyles">健康教育教育情况</span> -->
          <div class="detailstitlo">
            <p class="xqtitolstyle">用药情况</p>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="治疗方案">
            <span>{{ form.TreatmentPlan }}</span>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="用法">
            <!-- <span>{{ form.DrugUsage?'每日':'间歇' }}</span> -->
			<span>{{ form.DrugUsageName }}</span>
          </el-form-item>
        </el-col>
        <!--  -->

        <el-col :span="8">
          <el-form-item label="药品剂型">
            <span>{{ form.DrugsTypeName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="漏服药次数">
            <span>{{ form.MissedMedicationTimes }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无药物不良反应">
            <!-- <span>{{ form.ADR ?'无':'有'}}</span> -->
			<span>{{ form.ADRName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有无并发症或合并症">
            <!-- <span>{{ form.ADR?'无':'有' }}</span> -->
			<span>{{ form.ComplicationName }}</span>
          </el-form-item>
        </el-col> 
      </el-row>

      <el-row>
        <!-- 列表单选 -->
        <el-col :span="24">
          <!-- <span class="headingstyles">健康教育教育情况</span> -->
          <div class="detailstitlo">
            <p class="xqtitolstyle">转诊情况</p>
          </div>
        </el-col>
      </el-row>

      <el-row >
        <!--  -->
        <el-col :span="8">
          <el-form-item label="是否转诊">
            <span v-if="form.IsReferral!=null">{{form.IsReferral?'转诊':'未转诊'}}</span>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="转诊原因 ">
            <span>{{ form.ReferralReason }}</span>
          </el-form-item>
        </el-col>

        <!--  -->
        <el-col :span="8">
          <el-form-item label="两周内随访结果">
            <span>{{ form.FollowUpResults }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row >
        <!-- -->
        <el-col :span="8">
          <el-form-item label="处置意见">
            <span>{{ form.HandlingOpinions }}</span>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="下次随访日期">
            <span>{{ form.NextVisitDate| parseTime("{y}-{m}-{d}")   }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="停止治疗时间">
            <span>{{ form.StopTreatmentTime| parseTime("{y}-{m}-{d}")   }}</span>
          </el-form-item>
        </el-col>
        <!-- NextVisitDate -->
      </el-row>

      <el-row >
        <!-- 多选 -->
        <el-col :span="8">
          <el-form-item label="停止治疗原因">
            <!-- <span v-if="form.StopTreatmentReason==1"> 死亡 </span>
            <span v-else-if="form.StopTreatmentReason==2">丢失</span>
            <span v-else-if="form.StopTreatmentReason==3">转入耐多药治疗</span>
            <span v-else>完成治疗</span> -->
            <span>{{ form.StopTreatmentReasonName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="应访患者次数">
            <span>{{ form.RequiredVisitsTimes }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际应访次数">
            <span>{{ form.ActualVisitsTimes }}</span>
          </el-form-item>
        </el-col>
      </el-row>

<el-row>
  <el-col :span="8">
          <el-form-item label="应访服药次数">
            <span>{{ form.RequiredMedicineTimes }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际服药次数">
            <span>{{ form.ActualMedicineTimes }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="服药率">
            <span>{{ form.MedicationRate }}</span>
          </el-form-item>
        </el-col>
</el-row>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>

    </div>
  </el-dialog>
</template>
<script>



export default {

  name: "Edit",
  data() {
    return {
      title: "",
      innerVisible: false,
      flag: "",
      form: {
      },
    };
  },


  methods: {


    show(flag, data, formdata) {
      this.innerVisible = true;
      this.flag = flag;
      this.title = "后续随访详情";
      this.form = { ...data,...formdata }
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
  // margin-left: 10px;

}
</style>