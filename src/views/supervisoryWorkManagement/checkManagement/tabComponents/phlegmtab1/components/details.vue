<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :close-on-click-modal="false" width="60%"
    top="70px" @close="close">
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{title}}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" label-width="100px">
      <div class="detailstitlo">
        <p class="xqtitolstyle">基本信息</p>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">
            <span>{{ form.Name }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="病例类型">
            <span>{{ form.DetectionPathway }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="检查日期">
            <span>{{ form.InspectResultTime| parseTime("{y}-{m}-{d}")   }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结核病类型">
            <span>{{ form.DiagnosisTypeName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="检查项目">
            <span>{{ form.ApplicationItemName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检查结果">
            <span>{{ form.VisitType }}</span>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="检查原因">
            <span>{{ form.ApplicationType }}</span>
          </el-form-item>
        </el-col>
        </el-row>

        <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="上传本地文件">
            <span>{{ form.Occupation }}</span>
            
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>

    </div>
  </el-dialog>
</template>
<script>
/* api */
import { usedictionarydetails } from '@/api/dict.js'

import MyCascader from "@/components/MyCascader"
export default {
  name: "Edit",
  components: { MyCascader },
  data() {
    return {
      props: {
        emitPath: false,
        label: "RegionName",
        children: "Children",
        value: "RegionCode",
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      title: "",
      // 弹窗的开关
      dialogVisible: false,
      flag: "",
      ContractStaffList: [],
      // 保存修改信息
      copyform: {},
      form: {
        ContractStaffs: []
      },
      hasinfo: [],


    };
  },
  created() {
    this.usedictionarydetails()


  },
  methods: {
    //人群属性
    async usedictionarydetails(params) {
      const res = await usedictionarydetails({ CategoryCode: 'A0021' })
      this.ContractStaffList = res.Response.items
    },





    // 确认新增？修改
    show(flag, data) {

      this.dialogVisible = true;
      this.flag = flag;
      this.title = "详情";
      this.form = { ...data };
      this.copyform = { ...data }



    },

    close() {
      this.dialogVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },

  },
};
</script>

<style lang=scss scoped>
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #999999 100%;

}

span {
  font-size: 16px;
  color: #252D57;
  margin-left: 10px;

}
</style>