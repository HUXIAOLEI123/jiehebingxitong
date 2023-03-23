<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    top="5vh"
    :close-on-click-modal="false"
    width="60%"
    @close="close"
    append-to-body
  >
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="120px" :hide-required-asterisk="title == '查看详情'">
      <!-- <div class="detailstitlo">
        <p class="xqtitolstyle">推送信息</p>
      </div> -->

      <el-row>
        <!-- 多选 -->
        <el-col :span="24">
          <el-form-item label="推送时间:" prop="PushCycle">
            <el-select v-model="form.PushCycle" placeholder="请选择">
              <el-option v-for="item in A0031" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 分割 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="推送标题:" prop="EducationTitle">
            <el-input v-model="form.EducationTitle" type="text"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="封面图片:" :span="24">
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
      </el-row>

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

      <el-row>
        <el-col :span="24">
          <div style="color: red; margin-left: 14%">注：输入完成时请按下回车或空格键</div>
          <el-form-item label="推送内容:" prop="EducationContent">
            <Editor :content="form.EducationContent" @change="inputSumite"></Editor>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="close" class="cancelbtn">取 消</el-button>
      <el-button type="primary" class="savebtn" @click="handleClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 字典
import {
  usedictionarydetails
} from '@/api/dict.js'
// 文件上传
// 文件上传
import {
  fileStorageInfoupload,
  fileStorageInfolist,
  fileStorageInfodeletes
} from "@/api/FileStorageInfo.js";

// api
import {
  educationList,
  delEducationList,
  addEducationList,
  detailEducationList,
  editEducationList
} from '@/api/educationpush'
import Editor from "@/components/Editor/Editor.vue"
export default {
  name: 'AnnouncementManagement',
  components: {
    Editor
  },
  data () {
    return {
      showImgViewer: false,
      imgPreviewUrl: [],
      title: "",
      keyword: '',
      flag: '',
      A0031: [],
      educationList: [],
      dialogFormVisible: false,
      form: {
        // 登录缓存中获取的派发参数
        // HealthEducationId: '44645868-41af-4162-894c-3404b68d95db',
        // HealthEducationId: JSON.parse(localStorage.getItem('userInfo')).userId,
      },
      copyform: {},
      hasinfo: [],
      tableHeight: "300", //table高度
      fileList: [],
      arrhasinfo: [],
      arr: [],
      //  表单验证
      rules: {
        PushCycle: [
          { required: true, message: "请选择推送时间", trigger: "blur" },
        ],
        EducationTitle: [
          { required: true, message: "请输入推送标题", trigger: "blur" },
        ],
        CoverImageGuid: [
          { required: true, message: "请上传封面图片", trigger: "blur" },
        ],
        EducationContent: [
          { required: true, message: "请输入推送内容", trigger: "blur" },
        ]
      },
    }
  },
  created () {
    this.funusedictionarydetails5();
  },
  mounted () {

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
      let res = await fileStorageInfoupload('InspectApplication', this.form.CoverImageGuid || '', formData)
      this.form.CoverImageGuid = res.Response[0].RelationGuid;
      this.getImgList()
    },
    //查询报告列表
    async getImgList () {
      this.fileList = []
      let res = await fileStorageInfolist({
        relationGuids: this.form.CoverImageGuid
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
    inputSumite (value) {//富文本编辑器返回
      this.form.EducationContent = value;
      this.$forceUpdate();
      console.log(value);
    },
    async funusedictionarydetails5 (params) {
      const res = await usedictionarydetails({
        CategoryCode: ['A0031'],
        PageNumber: 1,
        PageSize: 90
      })
      this.A0031 = res.Response.items
    },
    showDialog (flag, data) {
      if (flag == 'newann') {
        this.title = '新增健康宣教'
        this.form = this.$options.data().form;
        this.flag = flag;

      } else {
        this.title = '修改健康宣教'
        this.form = {
          ...data
        };
        this.form.PushCycle = this.form.PushCycle + '';
        this.flag = flag;
        this.detailEducationListlist(data);
      }
      this.fileList = []
      this.dialogFormVisible = true;
    },

    close () {
      this.dialogFormVisible = false;
      this.fileList = []
      this.form = this.$options.data().form;
    },
    // 确认
    async handleClick () {
      this.$refs["form"].validate((valid) => {
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

        this.$baseConfirm(`确认要${this.title}此健康宣教吗？`, null, async () => {
          let subData = Object.assign({}, this.form)
          if (this.flag == 'newann') {
            let result = await addEducationList(this.form)
            if (result.StatusCode == 200) {
              this.$message({
                type: "success",
                message: "新增成功",
              });
              this.close();
              this.$emit('sumite')
            }
          } else {
            console.log(this.hasinfo)
            const healthEducationId = subData.HealthEducationId
            const res = await editEducationList(healthEducationId, this.hasinfo)
            let {
              StatusCode,
              Message
            } = res;
            if (StatusCode != 200) {
              return this.$baseMessage(
                Message || '修改失败', 'error'
              )
            } else {
              this.$baseMessage('修改成功', "success")
              this.$emit("sumite")
              this.close();
            }
          }
        });
      });
    },
    async detailEducationListlist (data) {
      let result = await detailEducationList(data.HealthEducationId)
      this.form = {
        ...data,
        ...result.Response
      };
      this.copyform = {
        ...data,
        ...result.Response
      }
      this.form.PushCycle = this.form.PushCycle + '';
      this.getImgList()
    }
  }
}
</script>

<style>
.search {
  height: 50px;
  width: 88%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
