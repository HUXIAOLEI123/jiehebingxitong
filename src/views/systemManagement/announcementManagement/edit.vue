<template>
  <el-dialog width="50%" :visible.sync="dialogFormVisible">
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form :model="form" size="small" label-width="70px" ref="fromroule">
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="公告类型">
            <el-select v-model="form.AnnouncementType" placeholder="请选择" clearable>
              <el-option v-for="item in A0032" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="公告时间" prop="OperateTimeFirst">
            <el-date-picker
              align="center"
              v-model="form.AnnouncementDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="公告标题" prop="Remarks">
            <el-input v-model="form.Title" type="input" :rows="8" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="公告内容" prop="Remarks">
            <el-input v-model="form.Content" type="textarea" maxlength="1000" :rows="8" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.Remarks" type="input" :rows="8" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="查看范围" prop="ViewRange">
            <el-select v-model="form.ViewRange" placeholder="请选择" clearable>
              <el-option v-for="item in A0033" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
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
import { usedictionarydetails } from '@/api/dict.js'
import { getAnnouncements, addOrUpdataAnnouncements, delAnnouncements, updataAnnounce } from '@/api/annoucement'
export default {
  name: 'AnnouncementManagement',
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
      form: {
        // 登录缓存中获取的派发参数
        AnnouncementId: JSON.parse(localStorage.getItem('userInfo')).userId,
        CurrentPage: 1,
        PageSize: 10,
        TotalPages: 0,
        Remarks: '',
		AnnouncementType:'1',
      },
      tableHeight: "300", //table高度
      searchResult: []
    }
  },
  created () {
    let option = { CategoryCode: 'A0032' }
    usedictionarydetails(option).then(res => this.A0032 = res.Response.items)
    let options = { CategoryCode: 'A0033' }
    usedictionarydetails(options).then(res => this.A0033 = res.Response.items)
  },
  mounted () {
  },
  methods: {
    // 获取数据
    getAnnouncementsList () {
      getAnnouncements(this.form).then((res) => { this.announcementList = [...res.Response.items]; this.searchResult = [...res.Response.items]; Object.assign(this.form, res.Response); })
    },
    showDialog (flag, data) {
      if (flag == 'newann') {
        this.title = '新增公告'
        this.form = this.$options.data().form;
      } else {
        this.title = '修改公告'
        this.form = { ...data }
      }
      this.dialogFormVisible = true;
    },
    close () {
      this.dialogFormVisible = false;
      this.form = this.$options.data().form;
    },
    // 删除
    async delAnnouncement (data) {
      this.$confirm(`你确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    // 确认
    async handleClick () {
      if (this.form._XID) {
        let op = [this.form.AnnouncementId]
        let res = await delAnnouncements(op)
        let result = await addOrUpdataAnnouncements(this.form)
        if (result.StatusCode == 200) {
          this.$emit('suimte')
          this.$message({
            type: "success",
            message: "修改公告成功",
          });

          this.dialogFormVisible = false;
        }
      } else {
        let result = await addOrUpdataAnnouncements(this.form)
        if (result.StatusCode == 200) {
          this.$emit('suimte')
          this.$message({
            type: "success",
            message: "添加公告成功",
          });
          this.dialogFormVisible = false;
        } else {
        }
      }
    },
  },



}
</script>

<style>
</style>