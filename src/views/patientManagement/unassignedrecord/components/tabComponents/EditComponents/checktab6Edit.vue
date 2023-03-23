<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="50%" @close="close" append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <!-- 录入+修改 -->
        <el-col :span="11">
          <el-form-item label="患者:">
            <span>{{ form.Name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="病理类型:">
            <span>{{ form.DetectionPathwayName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <!--录入 +修改 -->

        <el-col :span="11">
          <el-form-item label="检查结果日期:">
            <span>{{ form.InspectResultTime | parseTime('{y}-{m}-{d}') }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="结核病类型:">
            <span>{{ form.DiagnosisTypeName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="检查项目:">
            <span>{{ form.ApplicationItemName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="检查结果:">
            <span>{{ form.InspectResultName }}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <!-- 录入+修改 -->

        <el-col :span="11">
          <el-form-item label="申请检查类型:">
            <span>{{ form.ApplicationTypeName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="检查结果描述:">
            <span>{{ form.InspectResultDesc }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="报告查看:" :span="12">
            <el-upload
              class="upload-demo"
              :on-preview="handlePicPreview"
              action=""
              :file-list="fileList"
              list-type="picture-card"
              disabled
            ></el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <image-viewer
      v-if="showImgViewer"
      :url-list="imgPreviewUrl"
      :on-close="
        () => {
          showImgViewer = false;
        }
      "
      :z-index="9999999"
    />
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { usedictionarydetails } from '@/api/dict.js'
// 文件上传
// import {
//   fileStorageInfoupload,
//   fileStorageInfolist,
//   fileStorageInfodeletes
// } from "@/api/FileStorageInfo.js";
// 文件上传
import {
  fileStorageInfoupload,
  fileStorageInfolist,
  fileStorageInfodeletes
} from "@/api/FileStorageInfo.js";
import {
  InspectApplicationeModify2,
  InspectApplicationresult,
  getInspectApplicationmake,
} from '@/api/InspectApplication.js'
/* api */
export default {
  name: "CheckEdit",

  data () {
    return {
      title: "",
      showImgViewer: false,
      imgPreviewUrl: [],
      innerVisible: false,
      flag: "",
      hasinfo: [],
      form: {
      },
      // 保存修改信息
      copyform: {},
      dictarr: [],
      A0013: [],
      A0016: [],
      A0017: [],
      A0018: [],
      A0019: [],
      fileList: [],
      //  表单验证
      rules: {

        InspectApplicationId: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        // Name: [
        //   { required: true, message: "请输入", trigger: "blur" },
        // ],
        // DetectionPathway: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],

        InspectResultTime: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        // DiagnosisType: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],


        // ApplicationItemCategory: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],

        InspectResult: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        // ApplicationType: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],

      },
      // FileRelationGuid (文件上传字段)

      fileList: [],
      arrhasinfo: [],
      arr: []

    };
  },

  methods: {

    //查看图片大图
    handlePicPreview (file) {
      console.log(file);
      // file是上传成功后返回的所有数据
      // 只替换第一个元素，保持每次预览列表只有一个地址
      this.imgPreviewUrl[0] = file.url
      this.showImgViewer = true
    },
    // 字典
    async funusedictionarydetails () {
      const res = await usedictionarydetails({ CategoryCode: ['A0013', 'A0016', 'A0017', 'A0018', 'A0019'], PageNumber: 1, PageSize: 90 })

      this.dictarr = res.Response.items
    },
    //查询报告列表
    async getImgList () {
      this.fileList = []
      let res = await fileStorageInfolist({
        relationGuids: this.form.FileRelationGuid
      })
      res.Response.forEach((i) => {
        this.fileList.push({
          name: i.FileStorageInfoId,
          // url: process.env.VUE_APP_BASE + i.FilePath.slice(8, i.FilePath.length)
          url: process.env.VUE_APP_BASE + i.FilePath
        })
      })
    },
    //字典数据处理
    fundictlist () {
      this.dictarr.forEach(item => {
        if (item.CategoryCode == 'A0013') {
          this.A0013.push(item)
        } else if (item.CategoryCode == 'A0018') {
          this.A0018.push(item)
        } else if (item.CategoryCode == 'A0016') {
          this.A0016.push(item)
        } else if (item.CategoryCode == 'A0017') {
          this.A0017.push(item)
        } else if (item.CategoryCode == 'A0019') {
          this.A0019.push(item)
        }
      })


    },
    // 确认新增？修改
    show (flag, data, inputData) {
      this.innerVisible = true;
      this.flag = flag;
      this.fileList = []
      if (flag == "Modify1") {
        this.title = "详情";
        this.form = { ...data };
        this.copyform = { ...data }
        this.form.Name = inputData.Name
        this.form.DetectionPathway = inputData.DetectionPathway
        this.form.DetectionPathwayName = inputData.DetectionPathwayName
        this.form.DiagnosisTypeName = inputData.DiagnosisTypeName
        this.form.FileNumber = inputData.FileNumber
        this.getImgList()
      } else if (flag == "details") {
        this.title = "详情";
        this.form = { ...data };
        this.copyform = { ...data }
        this.getInspectApplicationmakelist(data.InspectApplicationId)
      }
    },
    //获取详情
    async getInspectApplicationmakelist (inspectApplicationId) {
      let res = await getInspectApplicationmake(inspectApplicationId)
      this.form = {
        ...res.Response
      };
      this.copyform = {
        ...res.Response
      }
      this.getImgList()
    },
    // 确定
    handlerSave () {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.hasinfo = [];
        for (let key in this.form) {
          let obj = {};
          if (this.form[key] !== this.copyform[key]) {
            obj.op = 'replace',
              obj.value = this.form[key];
            obj.path = key;
            this.hasinfo.push(obj)
          }
        }

        // 解决传参表单的修改传值问题
        this.hasinfo.forEach(item => {
          if (item.path == 'Name' || item.path == 'DiagnosisType' || item.path == 'DetectionPathway') {
            this.arrhasinfo.push(item)
          } else {
            this.arr.push(item)
          }
        })



        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, () => {

          this.$emit("checktab5Edit", this.flag, this.form, this.arr);
          this.close();
        });
      });

    },
    //取消
    close () {
      this.innerVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },
    // 上传照片（移除？）
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传数量
    handleExceed (files, fileList) {
      this.$message.error('最多上传6张图片');
    },
  },

  async created () {
    // 字典
    await this.funusedictionarydetails()
    this.fundictlist()
  },
};
</script>

<style lang=scss scoped>
::v-deep .el-upload--picture-card {
  display: none;
}
</style>