<template>
  <div class="box h100">
    <el-form :model="userInfoData" class="demo-form-inline" label-width="100px">
      <el-form-item label="姓名">{{ userInfoData.real_Name }}</el-form-item>
      <el-form-item label="机构">{{ userInfoData.authOrgName }}</el-form-item>
      <el-form-item label="用户角色">{{ userInfoData.roleName }}</el-form-item>
      <el-form-item label="联系方式">{{ userInfoData.contactPhone }}</el-form-item>
      <el-form-item label="账号">
        <div class="flexC">
          <div>{{ userInfoData.identifier }}</div>
          <div style="cursor:pointer" class="edit" @click="visible = true">修改密码</div>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog
      title="修改密码"
      :visible="visible"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleClose"
      top="30vh"
    >
      <div slot="title" class="dialog-title">
        <div class="sectionstly"></div>
        <span class="title-text">修改密码</span>
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
  </div>
</template>
<script>
import { editPassword } from '@/api/userManagement'
export default {
  data () {
    return {
      visible: false,
      userInfoData: {},
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
    }
  },
  created () {
    this.userInfoData = JSON.parse(window.localStorage.getItem("userInfo"));
    this.formData.patientUserId = this.userInfoData.userId
  },
  methods: {
    //关闭弹框
    handleClose () {
      this.$refs.refForm.resetFields();
      this.visible = false
    },
    // 提交
    submit () {
      this.$refs.refForm.validate(async (valid) => {
        if (!valid) return
        await editPassword(this.formData);
        this.handleClose()
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.flexC {
  width: 20%;
  display: flex;
  justify-content: space-between;
}
.edit {
  color: #0072e3;
}
.h100 {
  height: 80vh;
}
.form_row {
  .el-form-item {
    display: flex;

    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;

      .el-select,
      .el-date-editor {
        width: 100%;
      }
    }

    .el-input-number {
      width: 100%;

      .el-input__inner {
        text-align: left;
      }
    }
  }
}
</style>
