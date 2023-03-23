<template>
  <el-dialog
    :title="formConfig.title"
    :visible.sync="formConfig.visible"
    :width="formConfig.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="20vh"
  >
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ formConfig.title }}</span>
      <div class="button-right">
        <span class="title-close" @click="handleClose"></span>
      </div>
    </div>
    <el-form :model="formData" :rules="formRules" v-loading="formConfig.loading" ref="refForm" label-width="130px" class="form_row">
      <div class="el-dialog-div" style="height: 50vh">
        <el-row>
          <el-col :span="12">
            <el-form-item label="治疗方案名称:" prop="TreatmentPlanName">
              <el-input v-model="formData.TreatmentPlanName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="强化期:" prop="StrengtheningPeriodMonth">
              <el-input v-model="formData.StrengtheningPeriodMonth" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="强化期服药频率:" prop="StrengtheningPeriodDMT">
              <el-input v-model="formData.StrengtheningPeriodDMT" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="巩固期:" prop="ConsolidationPeriodMonth">
              <el-input v-model="formData.ConsolidationPeriodMonth" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="巩固期服药频率:" prop="ConsolidationPeriodDMT">
              <el-input v-model="formData.ConsolidationPeriodDMT" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancelbtn" @click="handleClose">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treatmentplantemModify, treatmentplantemplatesDetails, treatmentplanrecordEdit } from "@/api/TreatmentPlanTemplate";
export default {
  data () {
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
      // 表单数据
      formData: {},
      formDataCopy: {},
      // 验证规则
      formRules: {},
    };
  },
  created () {
    this.setformRules()
  },
  methods: {
    setformRules () {
      let arr = [
        { trigger: 'blur', message: "治疗方案名称", key: "TreatmentPlanName" },
        { trigger: 'blur', message: "强化期", key: "StrengtheningPeriodMonth" },
        { trigger: 'blur', message: "强化期服药频率", key: "StrengtheningPeriodDMT" },
        { trigger: 'blur', message: "巩固期", key: "ConsolidationPeriodMonth" },
        { trigger: 'blur', message: "巩固期服药频率", key: "ConsolidationPeriodDMT" },
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
    handleClose () {
      this.$nextTick(() => {
        this.$refs['refForm'].resetFields();
      })
      this.formConfig.visible = false;
    },
    // 提交
    submit () {
      let that = this;
      this.$refs.refForm.validate(async (valid) => {
        if (valid) {
          if (that.formConfig.opt == 'add') {
            await treatmentplantemModify(that.formData);
            this.$message.success("新增成功");
            that.$emit("submit")
            that.handleClose()
          }
          if (that.formConfig.opt == 'edit') {
            let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy)
            await treatmentplanrecordEdit({
              TreatmentPlanId: that.formData.TreatmentPlanId,
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
    async getDetail (param) {
      let that = this;
      if (param.opt == "" || param.opt == null) {
        return this.$message.error("未知操作");
      }
      this.$nextTick(() => {
        that.formData = { ...{} }
      })
      this.formConfig = Object.assign(this.formConfig, param);
      // 编辑之前先去查询详情
      if (param.opt === "edit") {
        let res = await treatmentplantemplatesDetails(param.TreatmentPlanId);
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
