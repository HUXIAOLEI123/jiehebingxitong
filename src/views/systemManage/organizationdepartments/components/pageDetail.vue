<template>
  <el-dialog
    :title="formConfig.title"
    :visible.sync="formConfig.visible"
    :width="formConfig.width"
    :height="formConfig.height"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    @close="handleClose"
    top="10vh"
  >
    <el-form
      :model="formData"
      ref="refForm"
      label-width="100px"
    >
    <div class="el-dialog-div-40">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级菜单:" prop="parentId">{{formData.parentId}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单路径:" prop="code">{{formData.code}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称:" prop="permissionName">{{formData.permissionName}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="按钮权限:" prop="func">{{formData.func}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否按钮:" prop="isButton">
              <el-checkbox v-model="formData.isButton" disabled></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="隐藏菜单:" prop="isHide">
              <el-checkbox v-model="formData.isHide" disabled></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否keepAlive:" prop="isKeepAlive">
              <el-checkbox v-model="formData.isKeepAlive" disabled></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否激活:" prop="enabled">
              <el-checkbox v-model="formData.enabled" disabled></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="末级标志:" prop="isLast">
              <el-checkbox v-model="formData.isLast" disabled></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建人:" prop="operatorNameFirst">{{formData.operatorNameFirst}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序:" prop="orderSort">{{formData.orderSort}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标:" prop="icon">{{formData.icon}}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述:" prop="description">{{formData.description}}</el-form-item>
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
import pageDetail from "./mixins/pageDetail";
export default {
  mixins: [pageDetail],
  data() {
    return {};
  },
};
</script>
<style>
.el-dialog-div-40::-webkit-scrollbar {display:none}
.el-dialog-div-40{
  height: 60vh;
  overflow: auto;
}
.el-dialog .el-dialog__body .el-form .el-form-item__label, .el-dialog .el-drawer__body .el-form .el-form-item__label, .el-drawer .el-dialog__body .el-form .el-form-item__label, .el-drawer .el-drawer__body .el-form .el-form-item__label{
  font-weight: normal!important;
  color:#666!important;
}
.el-input__inner{
  color: #222;
}
.el-dialog-span{
  color: #222;
  margin-left: 8px;
}
</style>
