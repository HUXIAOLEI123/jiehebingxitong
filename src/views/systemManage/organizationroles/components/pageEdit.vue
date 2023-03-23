<template>
  <el-dialog
    :title="formConfig.title"
    :visible="formConfig.visible"
    :width="formConfig.width"
    :height="formConfig.height"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="10vh"
  >
  <div slot="title" class="dialog-title">
  	<div class="sectionstly"></div>
  	<span class="title-text">{{formConfig.title}}</span>
  	<div class="button-right">
  		<span class="title-close" @click="handleClose"></span>
  	</div>
  </div>
    <el-form :model="formData" :rules="formRules" ref="refForm" class="form_row" label-width="100px">
      <div class="el-dialog-div-30" style="height: 60vh">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称:" prop="RoleName">
              <el-input v-model="formData.RoleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限范围:" prop="AuthorityScope">
              <el-select v-model="formData.AuthorityScope" placeholder="请选择权限范围" clearable>
                <el-option label="无任何权限" value="-1"></el-option>
                <el-option label="自定义权限" value="1"></el-option>
                <el-option label="本部门" value="2"></el-option>
                <el-option label="本部门及以下" value="3"></el-option>
                <el-option label="仅自己" value="4"></el-option>
                <el-option label="全部" value="9"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序:" prop="OrderSort">
              <el-input v-model="formData.OrderSort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="激活状态:" prop="Enabled">
              <el-checkbox v-model="formData.Enabled"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单权限:" prop="PermissionIds">
              <vxe-table
                resizable
                :data="tableData"
                height="300"
                ref="table"
                border
                v-if="formConfig.renderView"
                row-id="PermissionId"
                :tree-config="{ children: 'children', expandAll: true }"
                :checkbox-config="{
                  checkRowKeys: formData.PermissionIds,
                  checkStrictly:true
                }"
                @checkbox-change="selectChangeEvent"
                @checkbox-all="selectChangeEvent"
              >
                <vxe-table-column type="checkbox" title="" width="200" tree-node></vxe-table-column>
                <vxe-table-column field="PermissionName" title="菜单" width="200" />
                <vxe-table-column field="IsButton" title="是否按钮" width="80" align="center">
                  <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.IsButton == true">是</el-tag>
                    <el-tag type="danger" v-else>否</el-tag>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="IsHide" title="是否隐藏" width="80" align="center">
                  <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.IsHide == true">是</el-tag>
                    <el-tag type="danger" v-else>否</el-tag>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="Enabled" title="是否激活" width="80" align="center">
                  <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.Enabled == true">是</el-tag>
                    <el-tag type="danger" v-else>否</el-tag>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="Description" title="描述" />
              </vxe-table>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述:" prop="Description">
              <el-input v-model="formData.Description" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancelbtn" @click="handleClose">取 消</el-button>
      <el-button class="savebtn"  type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getList } from "@/api/systemManage/OrganizationPermission";
import { organizationrolesDetail, addorganizationroles, Editorganizationroles } from "@/api/systemManage/OrganizationRole";
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: "",
        visible: false,
        width: "70%",
        opt: "",
        height: "70%",
        moduleId: "",
        tenantid: "",
        renderView: true,
      },
      tableData: [],
      // 表单数据
      formData: {
        PermissionIds: []
      },
      // 验证规则
      formRules: {
        RoleName: {
          required: true,
          message: "角色名称不能为空",
          trigger: "blur",
        },
        // OrderSort: { required: true, message: "排序不能为空", trigger: "blur" },
      },
    };
  },
  created () {
    this.getTableData();
  },
  methods: {
    //表格选择事件
    selectChangeEvent ({ records }) {
      this.formData.PermissionIds = [];
      records.forEach((item) => {
        this.formData.PermissionIds.push(item.PermissionId);
      });
    },
    // 获取菜单信息列表
    async getTableData () {
      let res = await getList({
        PageNumber: 1,
        PageSize: 9999,
      })
      this.tableData = this.convert(null, res.Response.items);
    },
    //递归
    convert (pid, arr) {
      let resultarr = arr.filter(p => p.ParentId == pid);
      if (resultarr.length > 0) {
        resultarr.forEach((item) => {
          item.children = [];
          item.children = this.convert(item.PermissionId, arr)
        });
      }
      return resultarr;
    },
    //关闭弹框
    handleClose () {
      this.$refs.refForm.resetFields();
      this.$refs['table'].clearCheckboxRow();
      this.formData.PermissionIds = []
      this.formConfig.visible = false;
    },
    //数组去重
    filterData (arr) {
      var newArr = [...new Set(arr)]; //利用了Set结构不能接收重复数据的特点
      return newArr;
    },
    // 提交
    submit () {
      let that = this;
      this.$refs.refForm.validate(async (valid) => {
        if (valid) {
          if (this.formConfig.opt == 'add') {
            await addorganizationroles(that.formData);
            that.$message.success("新增成功");
            that.$emit("submit")
            that.handleClose()
          }
          if (that.formConfig.opt == 'edit') {
            let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy, ['PermissionIds'])
            arr.push({
              op: 'Replace',
              path: 'PermissionIds',
              value: this.formData.PermissionIds,
            })
            await Editorganizationroles({
              RoleId: that.formData.RoleId,
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
      if (param.opt == "" || param.opt == null) {
        return this.$message.error("未知操作");
      }
      this.formConfig = Object.assign(this.formConfig, param);
      this.$nextTick(() => {
        this.formData = { ...{ Enabled: true } }
      })
      // 编辑之前先去查询详情
      if (param.opt === "edit") {
        let res = await organizationrolesDetail(param.RoleId);
        this.formConfig.renderView = false;
        this.$nextTick(() => {
          res.Response.PermissionIds = res.Response.PermissionIds;
          this.formData = { ...res.Response }
          this.formConfig.renderView = true;
        })
        this.formDataCopy = res.Response
      }
      this.formConfig.loading = false;
    },
  },
};
</script>
