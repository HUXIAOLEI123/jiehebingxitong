<template>
  <el-dialog
    :title="formConfig.title"
    :visible="formConfig.visible"
    :width="formConfig.width"
    :height="formConfig.height"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="20vh"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="refForm"
      label-width="100px"
    >
      <div class="el-dialog-div-30">
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构:" prop="organizationCode">
              <el-cascader
                clearable
                :props="{emitPath:false,checkStrictly:true}"
                v-model="formData.organizationCode" 
                :options="tenantData"
                :disabled="formConfig.opt === 'edit'"
                @change="selectOrganizationCode"
                v-if="formConfig.renderView"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formData.organizationCode">
            <el-form-item label="上级部门:" prop="parentCode">
              <el-cascader 
                :props="{checkStrictly:true}"
                v-model="formConfig.parentCodeList" 
                :options="tableData" 
                :disabled="formConfig.opt === 'edit'"
                v-if="formConfig.renderView && formData.organizationCode"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称:" prop="departmentName">
              <el-input v-model="formData.departmentName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人:" prop="leader">
              <el-input v-model="formData.leader" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序:" prop="orderSort">
              <el-input v-model="formData.orderSort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:" prop="status">
              <el-checkbox v-model="formData.status"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
import pageEdit from "./mixins/pageEdit";
export default {
  mixins: [pageEdit],
  data() {
    return {};
  },
};
</script>
<style scoped>
.el-cascader{
  width: 100%;
}
.el-dialog-div-30::-webkit-scrollbar {
  display: none;
}
.el-dialog-div-30 {
  height: 40vh;
  overflow: auto;
}
.el-dialog .el-dialog__body .el-form .el-form-item__label,
.el-dialog .el-drawer__body .el-form .el-form-item__label,
.el-drawer .el-dialog__body .el-form .el-form-item__label,
.el-drawer .el-drawer__body .el-form .el-form-item__label {
  font-weight: normal !important;
  color: #666 !important;
}
.el-input__inner {
  color: #222;
}
</style>
