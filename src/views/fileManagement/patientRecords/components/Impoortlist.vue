<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" top="5%" width="50%" @close="close">
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <div class="content">
      <div class="contentlist">
        <span>请选择需要导入的文件</span>
        <el-upload
          class="upload"
          action="#"
          :show-file-list="false"
          :on-change="handleExcel"
          accept="'.xlsx','.xls'"
          :auto-upload="false"
          :headers="headers"
        >
          <el-button size="mini" type="primary">导入</el-button>
        </el-upload>
      </div>
      <div class="contentbottom">
        <label>返回信息</label>
        <!-- <el-input style="margin-top: 10px;" v-text="Response"   :rows="5"  type="textarea"></el-input> -->
        <div class="contenttext" v-html="Response"></div>
      </div>
    </div>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* api */
import {
  generatetreatmentimport
} from '@/api/TuberculosisDiagnosis.js'
export default {
  name: "Edit",
  data () {
    return {
      title: "导入",
      // 弹窗的开关
      dialogVisible: false,
      headers: {
        "Content-Type": "multipart/form-data;charset=UTF-8"
      },
      flag: "",
      // 日期数据
      value1: '',
      form: {},
      Response: '',
      // 复选框的数据（实际是使用表格中传输过来的数据）
    };
  },
  mounted () {
    this.Response = "";
  },
  methods: {
    // 确认新增？修改
    show (data) {
      this.dialogVisible = true;
    },

    //取消
    close () {
      this.dialogVisible = false;
      this.$emit('sumite')
    },
    //导入表格
    async handleExcel (file) {
      let formData = new FormData(); //声明一个FormDate对象
      formData.append("file", file.raw);
      //调用后台导入的接口
      await generatetreatmentimport(formData).then(res => {
        this.Response = res.Response
      }).catch(err => {
      })
    },


  },
};
</script>

<style lang=scss scoped>
.content {
  height: 400px;
}
.contentlist {
  margin-top: 15px;
  display: flex;
  align-items: center;
  .upload {
    margin-left: 20px;
  }
}
.contentbottom {
  margin-top: 15px;
}
.contenttext {
  border: 1px solid #dcdfe6;
  width: 100%;
  height: 200px;
}
</style>
