<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="35%" @close="close" append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" status-icon label-width="120px">
      <span class="headingstyles">档案信息</span>

      <el-form-item label="责任医生" prop="ResponsibilityName">
        <el-input v-model="form.ResponsibilityName" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="确诊时间" prop="RegisterTime">
        <el-input v-model="form.RegisterTime" placeholder="请输入内容"></el-input>
      </el-form-item>

      <el-form-item label="服药确认时间" prop="SubmitConfirmTime">
        <el-date-picker v-model="form.SubmitConfirmTime" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item label="服药确认" prop="SubmitConfirm">
        <el-select v-model="form.SubmitConfirm">
          <el-option label="已服药" :value="true"></el-option>
          <el-option label="未服药" :value="false"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="handlerSave">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { pulmonarymedicinessruas } from '@/api/PulmonaryMedicine.js'
export default {
  name: "Edit",
  data () {
    return {
      title: "",

      innerVisible: false,
      flag: "",
      form: {
      },

      //  表单验证
      rules: {
        ResponsibilityName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        RegisterTime: [
          { required: true, message: "请输入", trigger: "change" },
        ],

        SubmitConfirmTime: [
          { required: true, message: "请确认", trigger: "change" },
        ],
        SubmitConfirm: [
          { required: true, message: "请确认", trigger: "change" },
        ],
      },

    };
  },
  methods: {
    // 确认新增？修改
    show (data) {
      this.innerVisible = true;
      this.form = { ...data };
      this.title = "服药确认";


    },
    // 确定
    handlerSave () {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, async () => {
          const res = await pulmonarymedicinessruas(this.form.MedicineId)
          let { StatusCode, Message } = res
          if (StatusCode != 200) {
            return this.$baseMessage(
              Message || '确认失败', 'error'
            )
          }
          this.$baseMessage('确认成功', "success")
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
/* span {
  font-size: 20px;
  margin: 0px 0px 0px 0px;
  line-height: 20px;
} */
</style>