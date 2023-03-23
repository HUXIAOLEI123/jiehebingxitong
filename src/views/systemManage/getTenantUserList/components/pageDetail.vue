<template>
  <el-dialog
    :title="formConfig.title"
    :visible.sync="formConfig.visible"
    :width="formConfig.width"
    :height="formConfig.height"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="25vh"
  >
    <el-form :model="formData" ref="refForm" label-width="70px">
      <div class="el-dialog-div-40">
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构名称:" prop="tenantname">
              <span class="el-dialog-span">{{ formData.tenantname }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人:" prop="contactname">
              <span class="el-dialog-span">{{ formData.contactname }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:" prop="phone">
              <span class="el-dialog-span">{{ formData.phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: '',
        visible: false,
        width: '60%',
        opt: '',
        height: '50%',
        tenantid: ''
      },
      // 表单数据
      formData: {
        tenantid: '',
        phone: '',
        contactname: '',
        tenantname: '',
      }
    };
  },
  methods: {
    //关闭弹框
    handleClose () {
      this.$refs.refForm.resetFields();
      this.formConfig.visible = false
    },
    // 初始化弹框，获取详情
    getDetail (param) {
      if (param.opt == '' || param.opt == null) {
        return this.$message.error('未知操作');
      }
      this.formConfig = Object.assign(this.formConfig, param);
      // 编辑之前先去查询详情
      if (this.formConfig.opt === 'detail') {
        var param = {
          tenantid: this.formConfig.tenantid
        };
        this.$store
          .dispatch("function/postApi", { reqData: param, url: this.$URL.urls.GetTenantUserInfo, })
          .then((res) => {
            if (res.resultCode == -1) {
              return this.$message.error(res.resultMessage)
            }
            this.formData = Object.assign(this.formData, res.result);
          });

      }
    }
  }
};
</script>

