<template>
  <el-dialog
    :title="formConfig.title"
    :visible="formConfig.visible"
    :width="formConfig.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="30vh"
  >
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ formConfig.title }}</span>
      <div class="button-right">
        <span class="title-close" @click="handleClose"></span>
      </div>
    </div>
    <el-form :model="formData" :rules="formRules" ref="refForm" label-width="100px">
      <div class="el-dialog-div-30">
        <el-row>
          <el-col :span="24">
            <el-form-item label="原密码:" prop="oldPassword">
              <el-input v-model="formData.oldPassword"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新密码:" prop="newPassword">
              <el-input v-model="formData.newPassword" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer">
      <el-button class="cancelbtn" @click="handleClose">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { password } from '@/api/systemManage/PatientUser'
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: '',
        visible: false,
        width: '40%',
      },
      // 表单数据
      formData: {
        oldPassword: "",
        newPassword: "",
        patientUserId: ""
      },
      // 验证规则
      formRules: {
        oldPassword: { required: true, message: '原密码不能为空', trigger: 'blur' },
        newPassword: { required: true, message: '新密码不能为空', trigger: 'blur' }
      },
    };
  },
  methods: {
    //关闭弹框
    handleClose () {
      this.$refs.refForm.resetFields();
      this.formConfig.visible = false
    },
    // 提交
    submit () {
      this.$refs.refForm.validate(async (valid) => {
        if (!valid) return
        await password(this.formData);
        this.$emit('submit')
        this.handleClose()
      });
    },
    // 初始化弹框，获取详情
    getDetail (param) {
      this.formConfig = Object.assign(this.formConfig, param);
      this.formData = Object.assign(this.formData, param);
    }
  }
};
</script>
