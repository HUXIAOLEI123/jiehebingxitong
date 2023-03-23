<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" v-show="showSearch" label-width="80px" class="form_row">
        <el-row>
          <el-col :span="6">
            <el-form-item label="推送标题:" prop="Name">
              <el-input v-model="form.EducationTitle" placeholder="请输入标题关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div class="searchbox">
              <div class="searchBtn" @click="searchList">
                <img class="Btnicon" src="@/assets/images/searchicon2.png" alt="" />
                查询
              </div>
              <div class="ResetBtn" style="margin-left: 10px" @click="resetBtn">
                <img class="Btnicon" src="@/assets/images/reseticon.svg" alt="" />
                重置
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="butt">
        <div class="buttbox">
          <el-row :gutter="15">
            <el-col :span="1.5">
              <el-button class="addBtn Btn" round type="primary" @click="showDialog('newann')">
                <img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
                新增
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 列表展示区 -->
      <vxe-table :data="educationList" :height="tableHeight" border class="mytable-scrollbar">
        <vxe-column field="EducationTitle" title="推送标题" align="center"></vxe-column>
        <vxe-column field="PushCycleName" title="推送时间" align="center"></vxe-column>
        <vxe-column field="PushCount" title="推送次数" width="120" align="center"></vxe-column>
        <vxe-column field="ReadCount" title="阅读人次" width="120" align="center"></vxe-column>
        <vxe-column title="操作" width="120" align="center">
          <template slot-scope="scope">
            <div class="flex_center">
              <el-link type="primary" @click="showDialog('modifyann', scope.row)">修改</el-link>
              <div class="Divider"></div>
              <el-link type="danger" @click="delAnnouncement(scope.row)">删除</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>

      <!-- 分页器 -->
      <div class="app-pagination">
        <el-pagination
          ref="elPage"
          :current-page="form.CurrentPage"
          :total="form.TotalCount"
          @current-change="changePage"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="form.PageSize"
          layout="total,sizes,prev, pager, next, jumper"
        ></el-pagination>
      </div>
      <Edit ref="edit" @sumite="geteducationList"></Edit>

      <!-- 弹框 -->
    </div>
  </div>
</template>
<script>
// 字典
import {
  usedictionarydetails
} from '@/api/dict.js'
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
  addEducationList
} from '@/api/educationpush'
import Edit from "@/views/systemManagement/healthPushManagement/edit.vue"
export default {
  components: {
    Edit
  },
  name: 'AnnouncementManagement',
  data () {
    return {
      title: "",
      keyword: '',
      flag: '',
      A0031: [],
      educationList: [],
      dialogFormVisible: false,
      showSearch: true,
      form: {
        // 登录缓存中获取的派发参数
        // HealthEducationId: '44645868-41af-4162-894c-3404b68d95db',
        HealthEducationId: JSON.parse(localStorage.getItem('userInfo')).userId,
        PushCycle: '',
        CurrentPage: 1,
        PageSize: 10,
        TotalPages: 0,
      },
      tableHeight: "300", //table高度
      fileList: [],
      arrhasinfo: [],
      arr: []
    }
  },
  created () {
    let option = {
      CategoryCode: 'A0031'
    }
    usedictionarydetails(option).then(res => this.A0031 = res.Response.items)

  },
  mounted () {
    this.geteducationList()
    this.initTableHeight();

  },

  methods: {
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
    showDialog (flag, data) {
      this.$refs.edit.showDialog(flag, data)
    },
    //重置
    resetBtn () {
      this.form.EducationTitle = '';
      this.geteducationList()
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
    // 获取数据
    geteducationList () {
      educationList(this.form).then((res) => {
        this.educationList = [...res.Response.items];
        Object.assign(this.form, res.Response);
      })
    },
    searchList () {
      this.geteducationList()
    },

    //计算table的高度
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage?.$el?.clientHeight || 0; // 分页器高度
        this.tableHeight =
          availHeight - elPageClientHeight - 390;
      });
    },

    // 删除
    async delAnnouncement (data) {
      this.$confirm(`确认要删除这条数据吗?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        roundButton: true,
      }).then(async () => {
        let op = [data.HealthEducationId]
        let res = await delEducationList(op)
        if (res.StatusCode == 200) {
          this.$message({
            type: "success",
            message: "删除公告成功",
          });
          this.geteducationList()
        }
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      })
    },




    // 分页当前页变化回调
    async changePage (page) {
      this.form.PageNumber = page
      this.getListInfo()
    },
    handleSizeChange (data) {
      this.form.PageSize = data
      this.getListInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
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
