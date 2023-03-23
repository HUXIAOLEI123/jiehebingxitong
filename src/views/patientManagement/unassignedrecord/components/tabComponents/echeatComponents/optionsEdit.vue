<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="30%" @close="close" append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="180px">
      <el-row>
        <el-col :span="20">
          <el-form-item label="治疗方案名称" prop="TreatmentPlanName">
            <el-input v-model="form.TreatmentPlanName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="强化期(月)" prop="StrengtheningPeriodMonth">
            <el-input v-model="form.StrengtheningPeriodMonth" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="强化期服药频率(次/天)" prop="StrengtheningPeriodDMT">
            <!-- <el-input
          v-model="form.StrengtheningPeriodDMT"
          placeholder="请输入内容"
        ></el-input> -->
            <el-select v-model="form.StrengtheningPeriodDMT" placeholder="请选择强化期服药频率">
              <el-option label="1" value="1"></el-option>
              <el-option label="3" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="巩固期(月)" prop="ConsolidationPeriodMonth">
            <el-input v-model="form.ConsolidationPeriodMonth" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="巩固期服药频率(次/天)" prop="ConsolidationPeriodDMT">
            <!-- <el-input
          v-model="form.ConsolidationPeriodDMT"
          placeholder="请输入内容"
        ></el-input> -->
            <el-select v-model="form.ConsolidationPeriodDMT" placeholder="请选择巩固期服药频率">
              <el-option label="1" value="1"></el-option>
              <el-option label="3" value="3"></el-option>
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
/* api */
import {
  treatmentplantemplates,
  treatmentplantemModify
} from '@/api/TreatmentPlanTemplate.js'
export default {
  name: "Edit",
  data () {
    return {
      title: "",
      textarea: '',
      innerVisible: false,
      flag: "",

      form: {
        StrengtheningPeriodMonth: 1
      },
      copyform: {},
      hasinfo: [],
      //  表单验证
      rules: {
        TreatmentPlanName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        StrengtheningPeriodMonth: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        StrengtheningPeriodDMT: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        ConsolidationPeriodMonth: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        ConsolidationPeriodDMT: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

      },

    };
  },


  methods: {
    // 确认新增？修改
    show (flag, data) {
      this.innerVisible = true;
      this.flag = flag;
      this.title = "治疗方案";
      this.form = { ...data };
      let a = this.form.StrengtheningPeriodMonth


      this.copyform = { ...data }


    },
    // 确定
    handlerSave () {
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
        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, async () => {
          const res = await treatmentplantemModify(this.form)
          // this.$emit("optionsEdit", this.flag, this.form,this.hasinfo);
          this.$emit("sumiteprogramme", res);
          this.$baseMessage('操作成功', "success")
          this.close();
        });
      });
    },

    //取消
    close () {
      this.innerVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },


  },
};
</script>

<style lang=scss scoped>
</style>