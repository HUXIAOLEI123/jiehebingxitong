<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" v-show="showSearch" label-width="80px" class="form_row">
        <el-row>
          <el-col :span="6">
            <el-form-item label="公告标题:" prop="Name">
              <el-input v-model="form.Title" placeholder="请输入标题关键字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <!-- <el-button class="searchBtn Btn" type="primary" @click="searchList">搜索</el-button> -->
            <!-- <el-button class="searchBtn Btn" type="primary" round @click="searchList">
					<i class="el-icon-search searchBtnicon"></i>
					搜索
				</el-button> -->
            <!-- <el-button @click="searchList" type="primary" style="margin-left: 10px">查询</el-button> -->
            <!-- <el-button type="primary" @click="showDialog('newann')"></el-button> -->
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
      <div>
        <vxe-table :data="searchResult" :height="tableHeight" align="center" border class="mytable-scrollbar">
          <vxe-column field="AnnouncementType'" title="公告类型" width="150">
            <template slot-scope="scope">
              <div>{{ scope.row.AnnouncementType == 1 ? '公告' : '活动' }}</div>
            </template>
          </vxe-column>
          <vxe-column field="AnnouncementDate" title="公告日期" width="200">
            <template slot-scope="{ row }">
              <span>
                {{ row.AnnouncementDate | parseTime('{y}-{m}-{d}') }}
              </span>
            </template>
          </vxe-column>
          <vxe-column field="Title" title="公告标题" width="322"></vxe-column>
          <vxe-column field="ViewRangeName" title="查看范围"></vxe-column>
          <vxe-column field="Remarks" title="备注"></vxe-column>
          <vxe-column title="操作" width="150" align="center">
            <template slot-scope="scope">
              <div class="flex_center">
                <el-link type="primary" @click="showDialog('modifyann', scope.row)">修改</el-link>
                <div class="Divider"></div>
                <el-link type="primary" @click="showDialog('detail', scope.row)">详情</el-link>
                <div class="Divider"></div>
                <el-link type="primary" @click="delAnnouncement(scope.row)">删除</el-link>
              </div>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
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
      <!-- 弹框 -->
      <Edit ref="edit" @suimte="getAnnouncementsList"></Edit>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
// 字典
import {
  usedictionarydetails
} from '@/api/dict.js'
import Edit from "@/views/systemManagement/announcementManagement/edit.vue"
// api
import {
  getAnnouncements,
  addOrUpdataAnnouncements,
  delAnnouncements,
  updataAnnounce
} from '@/api/annoucement'
export default {
  name: 'AnnouncementManagement',
  components: {
    Edit
  },
  data () {
    return {
      title: "",
      keyword: '',
      flag: '',
      A0032: [],
      A0033: [],
      announcementList: [],
      announcementtable: [],
      dialogFormVisible: false,
      showSearch: true,
      form: {
        // 登录缓存中获取的派发参数
        AnnouncementId: JSON.parse(localStorage.getItem('userInfo')).userId,
        CurrentPage: 1,
        PageSize: 10,
        TotalPages: 0,
      },
      tableHeight: "300", //table高度
      searchResult: []
    }
  },
  created () {

  },
  mounted () {
    this.getAnnouncementsList()
    this.initTableHeight();
  },
  // computed: {
  //   searchResult() {
  //     if (this.keyword) {
  //       return this.announcementList.filter((item) => {
  //         return item.Content.indexOf(this.keyword) !== -1
  //       })
  //     } else {
  //       return this.announcementList;
  //     }
  //   },
  // },

  methods: {
    // 获取数据
    getAnnouncementsList () {
      getAnnouncements(this.form).then((res) => {
        this.announcementList = [...res.Response.items];
        this.searchResult = [...res.Response.items];
        Object.assign(this.form, res.Response);
      })
    },
    // 搜索
    searchList () {
      this.getAnnouncementsList()
    },
    //重置
    resetBtn () {
      this.form.Title = '';
      this.getAnnouncementsList()
    },
    // 删除
    async delAnnouncement (data) {
      this.$confirm(`确认要删除这条数据吗?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        roundButton:true,
      }).then(async () => {
        let op = [data.AnnouncementId]
        let res = await delAnnouncements(op)
        if (res.StatusCode == 200) {
          this.$message({
            type: "success",
            message: "删除公告成功",
          });
          this.getAnnouncementsList()
        }
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      })
    },
    showDialog (flag, data) {
      if (flag == 'detail') {
        this.$router.push({
          path: '/announcementsDetil',
          query: {
            datas: data
          },
        })
      } else {
        this.$refs.edit.showDialog(flag, data)
      }


    },
    //计算table的高度
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage?.$el?.clientHeight || 0; // 分页器高度
        this.tableHeight =
          availHeight - elPageClientHeight - 380;
      });
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
  },



}
</script>

<style lang="scss" scoped>
</style>
