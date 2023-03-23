<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="60%" @close="close" append-to-body top="5vh">
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="detailstitlo">
        <p class="xqtitolstyle">基本信息</p>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="患者:" prop="Name">
            <el-input v-model="form.Name" placeholder="请输入内容" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号:" prop="CardNo">
            <el-input v-model="form.CardNo" placeholder="请输入内容" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="检查项目:" prop="ApplicationItemCategory">
            <el-select v-model="form.ApplicationItemCategory" placeholder="请输入内容" disabled>
              <el-option v-for="item in A0018" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检查原因:" prop="ApplicationType">
            <el-select v-model="form.ApplicationType" placeholder="请输入内容" disabled>
              <el-option v-for="item in A0019" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="病理类型:" prop="DetectionPathway">
            <el-select v-model="form.DetectionPathway" placeholder="请输入内容" disabled>
              <el-option v-for="item in A0016" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结核病类型:" prop="DiagnosisType">
            <el-select v-model="form.DiagnosisType" placeholder="请输入内容" disabled>
              <el-option v-for="item in A0013" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="detailstitlo">
        <p class="xqtitolstyle">检查信息</p>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请日期">
            <el-date-picker v-model="form.ApplicationTime" disabled align="center" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检查结果日期:">
            <el-date-picker
              v-model="form.InspectResultTime"
              align="center"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              :picker-options="pickerOptions0"
              disabled
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="检查结果:" prop="InspectResult">
            <el-select v-model="form.InspectResult" placeholder="请选择检查结果">
              <el-option
                v-for="item in InspectResultData"
                :key="item.DetailsCode"
                :label="item.DetailsName"
                :value="item.DetailsCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检查结果描述:" prop="InspectResultDesc">
            <el-input v-model="form.InspectResultDesc" placeholder="请输入检查结果描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="上传报告:" :span="12">
            <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePicPreview"
              :before-remove="handleRemove"
              :file-list="fileList"
              :http-request="httpRequest"
              list-type="picture-card"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
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
      <el-button class="savebtn" type="primary" @click="handlerSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  usedictionarydetails
} from '@/api/dict.js'
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
  name: "Edit",

  data () {
    return {
      showImgViewer: false,
      imgPreviewUrl: [],
      title: "",
      innerVisible: false,
      flag: "",
      hasinfo: [],
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      form: {},
      // 保存修改信息
      copyform: {},
      dictarr: [],
      A0013: [],
      A0016: [],
      A0017: [],
      A0018: [],
      A0019: [],
      A0015: [],
      A0040: [],
      A0024: [],
      A0041: [],
      InspectResultData: [],
      //  表单验证
      rules: {
        InspectApplicationId: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        InspectResultTime: [{
          required: true,
          message: "请选择",
          trigger: "change"
        },],
        InspectResult: [{
          required: true,
          message: "请选择",
          trigger: "change"
        },],
      },
      fileList: [],
      arrhasinfo: [],
      arr: []
    };
  },
  created () {
    this.funusedictionarydetails() // 字典
  },
  methods: {
    //查看图片大图
    handlePicPreview (file) {
      // file是上传成功后返回的所有数据
      // 只替换第一个元素，保持每次预览列表只有一个地址
      this.imgPreviewUrl[0] = file.url
      this.showImgViewer = true
    },
    //上传报告
    async httpRequest (file, fileList) {
      let formData = new FormData();
      formData.append("files", file.file)
      //上传
      let res = await fileStorageInfoupload('InspectApplication', this.form.FileRelationGuid || '', formData)
      this.form.FileRelationGuid = res.Response[0].RelationGuid;
      this.getImgList()
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
    //删除报告
    async handleRemove (file, fileList) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await fileStorageInfodeletes({
          Ids: [file.name]
        })
        this.getImgList()
      })
        .catch(async () => {
          this.getImgList()
        })
    },
    // 字典
    async funusedictionarydetails () {
      const res = await usedictionarydetails({
        CategoryCode: ['A0013', 'A0016', 'A0017', 'A0018', 'A0019', 'A0015', 'A0040', 'A0024',
          'A0041'
        ],
        PageNumber: 1,
        PageSize: 90
      })
      this.dictarr = res.Response.items
      this.fundictlist()
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
        } else if (item.CategoryCode == 'A0015') {
          this.A0015.push(item)
        } else if (item.CategoryCode == 'A0040') {
          this.A0040.push(item)
        } else if (item.CategoryCode == 'A0024') {
          this.A0024.push(item)
        } else if (item.CategoryCode == 'A0041') {
          this.A0041.push(item)
        }
      })
    },
    // 确认新增？修改
    show (flag, data, inputData, enumType) {

      this.InspectResultData = this[enumType]
      this.innerVisible = true;
      this.flag = flag;
      this.fileList = []
      if (flag == "Modify2") {

        this.title = "修改结果";

        this.getInspectApplicationmakelist(data.InspectApplicationId)
        // this.form.Name = inputData.Name
        // this.form.CardNo = inputData.CardNo
        // this.form.DetectionPathway = inputData.DetectionPathway
        // this.form.DiagnosisType = inputData.DiagnosisType
        // this.form.FileNumber = inputData.FileNumber
      } else if (flag == 'warning') {
        this.title = "结果录入";
        this.form = {
          ...data
        };
        var datetime = new Date();
        var year = datetime.getFullYear(); //获取完整的年份(4位,如:1970)
        var month = datetime.getMonth() + 1; //获取月份(返回0-11,0代表1月,用的时候记得加上1)
        var date = datetime.getDate(); //获取日(返回1-31)
        //判断小于等于9月的时候在月份前加一个"0"
        if (month <= 9) {
          month = "0" + month;
        }
        //判断小于等于9号的时候在天数前加一个"0"
        if (date <= 9) {
          date = "0" + date;
        }
        this.form.InspectResultTime = year + "-" + month + "-" + date; //给申请时间默认当前

        // this.form.Name = inputData.Name
        // this.form.DetectionPathway = inputData.DetectionPathway
        // this.form.DiagnosisType = inputData.DiagnosisType
        // this.form.FileNumber = inputData.FileNumber
      }
      this.getImgList()
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
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        if (this.flag == 'warning') { //新增
          let param = {
            InspectApplicationId: this.form.InspectApplicationId,
            InspectResult: this.form.InspectResult,
            InspectResultTime: this.form.InspectResultTime,
            FileRelationGuid: this.form.FileRelationGuid,
            InspectResultDesc: this.form.InspectResultDesc,
          }
          await InspectApplicationresult(param);
          this.$message.success("新增成功");
          this.$emit("submit")
          this.close()
        } else { //修改
          let param = {
            InspectApplicationId: this.form.InspectApplicationId,
            InspectResult: this.form.InspectResult,
            InspectResultTime: this.form.InspectResultTime,
            FileRelationGuid: this.form.FileRelationGuid,
            InspectResultDesc: this.form.InspectResultDesc,
          }
          let arr = this.$utilsFun.compareObj(param, {})
          await InspectApplicationeModify2(this.form.InspectApplicationId, arr)
          this.$message.success("修改成功");
          this.$emit("submit")
          this.close()
        }
      });
    },
    //取消
    close () {
      this.innerVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.fileList = []
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang=scss scoped>
</style>
