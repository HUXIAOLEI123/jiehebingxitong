<template>
  <el-dialog
    :title="formConfig.title"
    :visible.sync="formConfig.visible"
    :width="formConfig.width"
    :height="formConfig.height"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="5vh"
  >
    <div slot="title" class="dialog-title">
    	<div class="sectionstly"></div>
    	<span class="title-text">{{formConfig.title}}</span>
    	<div class="button-right">
    		<span class="title-close" @click="handleClose"></span>
    	</div>
    </div>
    <div class="el-dialog-div" style="height: 70vh">
      <div class="gw-divider">
        <div class="gw-divider__text">
          <a class="el-link el-link--primary">
            <span class="el-link--inner">分类信息</span>
          </a>
        </div>
        <el-form :model="formData" :rules="formRules" ref="refForm" label-width="100px" class="form_row">
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类编码:" prop="CategoryCode">
                <el-input v-model="formData.CategoryCode" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类名称:" prop="CategoryName">
                <el-input v-model="formData.CategoryName" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
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
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注:" prop="Remarks">
                <el-input v-model="formData.Remarks" type="textarea" :rows="4" />
              </el-form-item>
            </el-col>
            <el-button round type="primary" @click="submit" class="fr mr20">保存分类</el-button>
          </el-row>
        </el-form>
      </div>
      <div class="gw-divider">
        <div class="gw-divider__text">
          <a class="el-link el-link--primary">
            <span class="el-link--inner">编码字典信息</span>
          </a>
        </div>
        <el-form
          :model="AddOrUpdateDictionaryData"
          :rules="formRulesAddOrUpdateDictionary"
          ref="refAddOrUpdateDictionary"
          label-width="100px"
          class="form_row"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="字典编码:" prop="DetailsCode">
                <el-input v-model="AddOrUpdateDictionaryData.DetailsCode" :disabled="AddOrUpdateDictionaryData.opt == 'edit'" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="字典名称:" prop="DetailsName">
                <el-input v-model="AddOrUpdateDictionaryData.DetailsName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="排序:" prop="Sort">
                <el-input v-model="AddOrUpdateDictionaryData.Sort" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注:" prop="Remark">
                <el-input v-model="AddOrUpdateDictionaryData.Remark" type="textarea" :rows="2" />
              </el-form-item>
            </el-col>
            <el-button round type="primary" @click="submitAddOrUpdateDictionary" class="fr mr20">保存编码</el-button>
            <el-button round @click="reset" class="fr mr20">重置</el-button>
          </el-row>
        </el-form>
        <vxe-table
          :data="tableData"
          ref="multipleTable"
          tooltip-effect="light"
          border
          resizable
          class="mytable-scrollbar mt20"
          :height="300"
        >
          <vxe-table-column prop="DetailsCode" label="字典编码" width="200" align="center" />
          <vxe-table-column prop="DetailsName" label="字典名称" width="200" align="center" />
          <vxe-table-column prop="Sort" label="排序" width="80" align="center" />
          <vxe-table-column prop="Remarks" label="备注" />
          <vxe-table-column label="操作" align="center" width="140">
            <template slot-scope="scope">
			  <div class="flex_center ">
              <!-- <el-button @click="edit(scope.row)" type="primary" size="mini">修改</el-button>
              <el-button @click="delet(scope.row)" type="danger" size="mini">删除</el-button> -->
			  <el-link type="primary" @click="edit(scope.row)">修改</el-link>
			  <div class="Divider"></div>
			  <el-link type="danger" @click="delet(scope.row)">删除</el-link>
			  </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  updatedictionarycategory,
  adddictionarycategoryDetail,
  dictionarydetailsList,
  adddictionarydetails,
  updatadictionarydetails,
  deletedictionarydetails
} from "@/api/dict.js";
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: "",
        visible: false,
        width: "70%",
        height: "50%",
        categoryCode: "",
      },
      // 表单数据
      formData: {},
      formDataCopy: {},
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
      AddOrUpdateDictionaryData: {},
      AddOrUpdateDictionaryDataCopy: {},
      formRulesAddOrUpdateDictionary: {
        DetailsCode: {
          required: true,
          message: "字典编码不能为空",
          trigger: "blur",
        },
        DetailsName: {
          required: true,
          message: "字典名称不能为空",
          trigger: "blur",
        },
        Sort: {
          required: true,
          message: "排序不能为空",
          trigger: "blur",
        },
      },
      tableData: []
    };
  },
  methods: {
    //关闭弹框
    handleClose () {
      this.$refs.refForm.resetFields();
      this.$refs.refAddOrUpdateDictionary.resetFields();
      this.tableData = [];
      this.formConfig.visible = false;
      this.$emit('submit')
    },
    edit (row) {
      this.$nextTick(() => {
        this.AddOrUpdateDictionaryData = { ...row }
        this.AddOrUpdateDictionaryData.opt = 'edit'
        this.AddOrUpdateDictionaryDataCopy = { ...row }
      })
    },
    reset () {
      this.AddOrUpdateDictionaryData.opt = 'add'
      this.$refs.refAddOrUpdateDictionary.resetFields();
    },
    // 删除
    delet (row) {
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deletedictionarydetails([row.DetailsId])
        this.$message.success("删除成功");
        this.getTableList()
      })
    },
    //获取表格数据
    async getTableList () {
      let res = await dictionarydetailsList({
        PageNumber: 1,
        PageSize: 9999,
        CategoryCode: this.formData.CategoryCode
      });
      this.tableData = res.Response.items;
    },
    // 提交
    submit () {
      let that = this;
      this.$refs.refForm.validate(async (valid) => {
        if (valid) {
          let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy)
          await updatedictionarycategory({
            categoryCode: that.formData.CategoryCode,
            data: arr
          })
          this.$message.success("编辑成功");
        }
      });
    },
    // 提交
    submitAddOrUpdateDictionary () {
      let that = this;
      if (this.AddOrUpdateDictionaryData.DetailsCode && this.AddOrUpdateDictionaryData.opt == 'add') {
        for (let item of this.tableData) {
          if (item.DetailsCode == this.AddOrUpdateDictionaryData.DetailsCode) {
            return this.$message.error("编码重复");
          }
        }
      }
      this.$refs.refAddOrUpdateDictionary.validate(async (valid) => {
        if (valid) {
          if (this.AddOrUpdateDictionaryData.opt == 'add') {
            delete this.AddOrUpdateDictionaryData.opt
            await adddictionarydetails(this.AddOrUpdateDictionaryData);
            this.$refs.refAddOrUpdateDictionary.resetFields();
            this.$message.success("新增成功");
            this.AddOrUpdateDictionaryData.opt = 'add';
            this.getTableList()
          }
          if (this.AddOrUpdateDictionaryData.opt == 'edit') {
            delete this.AddOrUpdateDictionaryData.opt
            let arr = that.$utilsFun.compareObj(that.AddOrUpdateDictionaryData, that.AddOrUpdateDictionaryDataCopy)
            await updatadictionarydetails({
              categoryCode: that.AddOrUpdateDictionaryData.DetailsId,
              data: arr
            })
            this.$refs.refAddOrUpdateDictionary.resetFields();
            this.$message.success("编辑成功");
            this.getTableList()
            this.AddOrUpdateDictionaryData.opt = 'add'
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
      let res = await adddictionarycategoryDetail(param.CategoryCode);
      this.$nextTick(() => {
        let param = {
          CategoryCode: res.Response.CategoryCode,
          CategoryName: res.Response.CategoryName,
          Sort: res.Response.Sort,
          IsEnable: res.Response.IsEnable,
          Remarks: res.Response.Remarks,
        }
        this.formData = { ...param }
        this.formDataCopy = { ...param }
        this.tableData = res.Response.DictionaryDetails;
        this.AddOrUpdateDictionaryData.opt = 'add';
        this.AddOrUpdateDictionaryData.CategoryCode = res.Response.CategoryCode
      })
    },
  },
};

</script>
<style scoped>
.mt20 {
  margin-top: 20px;
}
.mr20 {
  margin-right: 20px;
}
.gw-divider .gw-divider__text {
  position: absolute;
  background-color: #fff;
  padding: 0 0.833333rem;
  font-size: 0.777778rem;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #2a2a2a;
  line-height: 2.777778rem;
  height: 2.777778rem;
  top: -1.388889rem;
  left: 1.111111rem;
}
.el-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 0.777778rem;
  font-weight: 500;
}
.el-link.el-link--primary {
  color: #1890ff;
}
.gw-divider {
  width: 100%;
  border: 0.055556rem solid #dcdfe6;
  margin: 1.388889rem 0;
  padding: 0.833333rem;
  position: relative;
}
.el-cascader {
  width: 100%;
}
.el-dialog-div-30 {
  height: 70vh;
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
