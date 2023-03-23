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
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ formConfig.title }}</span>
      <div class="button-right">
        <span class="title-close" @click="handleClose"></span>
      </div>
    </div>
    <el-form :model="formData" :rules="formRules" v-loading="formConfig.loading" ref="refForm" label-width="100px" class="form_row">
      <div class="el-dialog-div" style="height: 30vh">
        <el-row>
          <el-col :span="12">
            <el-form-item label="分类编码:" prop="CategoryCode">
              <el-input v-model="formData.CategoryCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类名称:" prop="CategoryName">
              <el-input v-model="formData.CategoryName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序:" prop="Sort">
              <el-input v-model="formData.Sort" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用标识:" prop="IsEnable">
              <el-checkbox v-model="formData.IsEnable"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="formData.Remarks" type="textarea" :rows="4" />
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
import { adddictionarycategory } from "@/api/dict.js";
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: "",
        visible: false,
        width: "60%",
        height: "50%",
        loading: false,
      },
      // 表单数据
      formData: {},
      // 验证规则
      formRules: {
        CategoryCode: {
          required: true,
          message: "分类编码不能为空",
          trigger: "blur",
        },
        CategoryName: {
          required: true,
          message: "分类名称不能为空",
          trigger: "blur",
        },
        Sort: {
          required: true,
          message: "排序不能为空",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    //关闭弹框
    handleClose () {
      this.$refs.refForm.resetFields();
      this.formConfig.visible = false;
    },
    // 提交
    submit () {
      let that = this;
      this.$refs.refForm.validate(async (valid) => {
        if (valid) {
          await adddictionarycategory(this.formData)
          this.$message.success("新增成功");
          that.$emit("submit")
          that.handleClose()
        }
      });
    },
    // 初始化弹框，获取详情
    getDetail (param) {
      if (param.opt == "" || param.opt == null) {
        return this.$message.error("未知操作");
      }
      this.formConfig = Object.assign(this.formConfig, param);
      this.$nextTick(() => {
        this.formData = {
          ...{
            IsEnable: true,
            Sort: 0,
          }
        }
      })
    },
  },
};

</script>
<style scoped>
.el-cascader {
  width: 100%;
}
.el-dialog-div-30 {
  height: 30vh;
  overflow: auto;
}
.card-title {
  padding: 0 0 10px 24px;
  font-size: 18px;
  color: #303133;
  font-weight: 500;
  font-family: Microsoft YaHei;
}
.card-detail {
  padding: 12px 0 12px 0;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  margin-bottom: 8px;
}
.card-two .card-detail {
  height: 350px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: scroll;
}
.card-detail::-webkit-scrollbar {
  display: none;
}
.el-dialog-div-30::-webkit-scrollbar {
  display: none;
}
.el-dialog .el-dialog__body .el-form .el-form-item__label,
.el-dialog .el-drawer__body .el-form .el-form-item__label,
.el-drawer .el-dialog__body .el-form .el-form-item__label,
.el-drawer .el-drawer__body .el-form .el-form-item__label {
  font-weight: normal !important;
  color: #666 !important;
}
.el-dialog-div-30 /deep/ .el-form-item__label {
  font-weight: normal !important;
  color: #666 !important;
}
.el-input__inner {
  color: #222;
}
.el-dialog-span {
  color: #222;
  margin-left: 8px;
}
</style>
