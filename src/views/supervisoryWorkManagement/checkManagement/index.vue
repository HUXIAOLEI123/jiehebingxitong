<template>
  <div class="box">
    <div class="room">
      <template>
        <el-tabs v-model="form.ApplicationItemCategory" @tab-click="handleClick">
          <el-tab-pane label="检查管理" name="0" value="" :lazy="true"></el-tab-pane>
          <el-tab-pane
            v-for="item in ApplicationItemCategory"
            :key="item.DetailsId"
            :label="item.DetailsName"
            :name="item.DetailsCode"
            :lazy="true"
          ></el-tab-pane>
          <el-form :model="form" ref="form" size="small" :inline="true" label-width="80px" class="form_row">
            <el-row>
              <el-col :span="6">
                <el-form-item label="管理机构:" prop="OrganizationName">
                  <el-cascader
                    :options="tenantData"
                    @change="getOid"
                    :props="propslist"
                    :placeholder="authOrgName"
                    v-model="OrganizationId"
                    :show-all-levels="false"
                    clearable
                    style="width: 100%"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名:" prop="Name" clearable>
                  <el-input v-model="form.Name" placeholder="请输入姓名" clearable @keyup.enter.native="handleQuery" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别:" prop="Sex" clearable>
                  <el-select v-model="form.Sex" placeholder="请选择">
                    <el-option v-for="item in Sex" :key="item.DetailsId" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号:" prop="CardNo">
                  <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable @keyup.enter.native="handleQuery" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <el-form-item label="仅本机构:" prop="SelectOnly">
                  <el-checkbox v-model="form.SelectOnly" size="mini"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="IsApplicationType">
                <el-form-item label="检查原因:" prop="ApplicationType">
                  <el-select v-model="form.ApplicationType" placeholder="请选择检查原因">
                    <el-option
                      v-for="item in ApplicationType"
                      :key="item.DetailsId"
                      :label="item.DetailsName"
                      :value="item.DetailsCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="IsInspectStatus">
                <el-form-item label="检查状态:" prop="InspectStatus">
                  <el-select v-model="form.InspectStatus" placeholder="请选择检查状态">
                    <el-option v-for="item in InspectStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <div class="searchbox">
                    <div class="searchBtn" @click="handleQuery">
                      <img class="Btnicon" src="@/assets/images/searchicon2.png" alt="" />
                      查询
                    </div>
                    <div class="ResetBtn" style="margin-left: 10px" @click="resetQuery">
                      <img class="Btnicon" src="@/assets/images/reseticon.svg" alt="" />
                      重置
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="tabbox">
            <AllPhlegmtab
              :tableList="tableList"
              :form="form"
              :TotalCount="TotalCount"
              :changePage="changePage || ''"
              v-if="isshow"
              @getList="getListInfo"
            ></AllPhlegmtab>
            <Phlegmtab1
              :tableList="tableList || []"
              :form="form"
              :changePage="changePage || ''"
              @getListInfo="getListInfo"
              v-if="!isshow"
              :ApplicationItemCategory="form.ApplicationItemCategory"
            ></Phlegmtab1>
            <!-- 分页器 -->
            <div class="app-pagination">
              <el-pagination
                ref="elPage"
                :current-page.sync="form.CurrentPage"
                @size-change="handleSizeChange"
                :total="form.TotalCount"
                @current-change="changePage"
                :page-size="form.PageSize"
                layout="total,sizes,prev, pager, next, jumper"
              ></el-pagination>
            </div>
          </div>
        </el-tabs>
      </template>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
// 弹窗子组件
import Phlegmtab1 from './tabComponents/phlegmtab1/phlegmtab1.vue'
import MyCascader from "@/components/MyCascader/index.vue"
import AllPhlegmtab from './tabComponents/phlegmtab1/allPhlegmtab.vue'
import { usedictionarydetails } from '@/api/dict.js'// 字典
import { getOrganizationList } from '@/api/organizationManagement'// 机构
import { getInspectList, getAllInspectList, getinspects } from '@/api/supervisoryWorkManagement/inspectApplication'// api 
export default {
  name: 'PatientRecords',
  components: { Phlegmtab1, MyCascader, AllPhlegmtab },
  data () {
    return {
      activeName: 'first',
      Sex: [],
      options: [],
      IsApplicationType: false,//是否显示检查原因
      IsInspectStatus: false,//是否显示检查状态
      TotalCount: 0,
      // 表单绑定数据
      form: {
        // tab选项
        ApplicationItemCategory: '',
        CurrentPage: 1,
        PageSize: 10,
        SelectOnly: false,
        ApplicationType: null,
        InspectStatus: null,
        Name: '',
        Sex: '',
        CardNo: '',
      },
      isshow: false,
      // 机构多级下拉
      propslist: {
        value: "OrganizationId",
        label: "OrganizationName",
        children: "Children",
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      // 区划多级下拉
      propts: {
        emitPath: false,
        label: "RegionName",
        children: "Children",
        value: "RegionCode",
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      InspectStatus: [{ label: '全部', value: '' }, { label: '已检查', value: true }, { label: '未检查', value: false }],
      ApplicationType: [],
      OrganizationId: [],
      authOrgName: '',
      tenantData: [{
        OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
        OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
        Children: []
      }], //机构数组
      // 申请项目
      ApplicationItemCategory: [],
      // 表格数据
      tableList: [],
      Statistics: {}
    }
  },
  created () {
    // 获取性别字典
    usedictionarydetails({ CategoryCode: ['A0003', 'A0019', 'A0018'], PageNumber: 1, PageSize: 999 }).then(res => {
      this.Sex = res.Response.items.filter((i) => { return i.CategoryCode == 'A0003' })
      this.ApplicationType = res.Response.items.filter((i) => { return i.CategoryCode == 'A0019' })
      this.ApplicationItemCategory = res.Response.items.filter((i) => { return i.CategoryCode == 'A0018' })
    })
    let OrganizationId = JSON.parse(localStorage.getItem('userInfo')).authOrgId
    this.OrganizationId.push(OrganizationId)
    this.authOrgName = JSON.parse(localStorage.getItem('userInfo')).authOrgName
    this.$set(this.form, 'ApplicationHospId', OrganizationId)
  },
  mounted () {
    //获取table数据
    this.getListInfo()
    Object.assign({}, this.staform, this.form)
    // 获取人数
    this.getAllInspects()
  },
  onshow () {
    this.getListInfo()
  },
  methods: {
    // 获取统计人数
    getAllInspects () {
      let form = this.form
      getinspects(form).then(({ Response }) => this.Statistics = Response)
    },
    // 获取机构id
    async getOid (value) {
      let Id = value[value.length - 1]
      this.$set(this.form, 'ApplicationHospId', Id)
    },
    async lazyLoad (node, resolve) {
      let res = await getOrganizationList({
        Org_OrganizationId: node.value,
        PageNumber: 1,
        PageSize: 9999,
      })
      let data = []
      if (node.level > 0) {
        data = res.Response.items
      }
      resolve(data);
    },
    // 根据点击tab加载表格数据
    getListInfo () {
      let form = this.form
      if (form.ApplicationItemCategory == 0 || '') {
        this.isshow = true
        form.ApplicationItemCategory = ''
        getAllInspectList(form).then((res) => {
          this.tableList = [...res.Response.items]; Object.assign(this.form, res.Response);
          this.TotalCount = res.Response.TotalCount
        })

      } else {
        this.isshow = false
        getInspectList(form).then((res) => {
          this.tableList = [...res.Response.items]; Object.assign(this.form, res.Response);
          this.TotalCount = res.Response.TotalCount
        })
      }
    },
    // 点击切换栏
    handleClick (tab) {
      this.form.PageSize = 10;
      this.form.PageNumber = 1;
      this.form.CurrentPage = 1;
      this.form.Name = '';
      this.form.Sex = '';
      this.form.CardNo = '';
      this.form.ApplicationType = '';
      this.form.InspectStatus = '';
      this.form.SelectOnly = false;
      this.form.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
      this.form.OrganizationId = this.$utilsFun.getUserInfo().authOrgId;
      this.$forceUpdate();
      this.getListInfo()
      this.getAllInspects()

      if (this.form.ApplicationItemCategory == 0 || '') {
        this.IsApplicationType = false;
        this.IsInspectStatus = false;
      } else {
        this.IsApplicationType = true;
        this.IsInspectStatus = true;
      }
    },
    // 查询搜索
    async handleQuery () {
      let res = await this.getListInfo()
      this.getAllInspects()
    },
    resetQuery () {
      this.$refs["form"].resetFields();
      let OrganizationId = JSON.parse(localStorage.getItem('userInfo')).authOrgId
      this.OrganizationId = [];
      this.OrganizationId.push(OrganizationId)
      this.$set(this.form, 'ApplicationHospId', OrganizationId)
      this.handleQuery()
    },
    // 分页当前页变化回调
    changePage (page) {
      this.form.PageNumber = page
      if (this.form.ApplicationItemCategory == 0 || '') {
        getAllInspectList(this.form).then(res => this.tableList = [...res.Response.items])
      } else {
        getInspectList(this.form).then(res => this.tableList = [...res.Response.items])
      }

    },
    // 分页当前页变化回调
    handleSizeChange (page) {
      this.form.PageSize = page;
      if (this.form.ApplicationItemCategory == 0 || '') {
        getAllInspectList(this.form).then(res => this.tableList = [...res.Response.items])
      } else {
        getInspectList(this.form).then(res => this.tableList = [...res.Response.items])
      }

    },
  },
}
</script>

<style lang="scss" scoped>
.tabbox {
  width: 100%;
}
.heard {
  width: 41%;
  height: 160px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0;
  border-radius: 10px;
  // background-color: #31c86e;
}
.heard > div {
  width: 250px;
  height: 100%;
  margin-right: 20px;
  border-radius: 8px;
  background: #31c86e;
  float: left;
  position: relative;
  padding: 20px 0 0 25px;
}
.heard > div > span {
  font-size: 20px;
  font-weight: 600;
}
.heard > div > i {
  position: absolute;
  top: 50px;
  right: 20px;
  font-size: 50px;
}
.el-icon-s-data {
  color: #37d975;
}
.heard > .graphics1 {
  background: #fe856e;
}
.el-icon-s-custom {
  color: #fca08d;
}
.heard {
  span {
    color: #fff;
  }
  p {
    color: #fff;
    line-height: 40px;
    font-size: 18px;
    margin-left: 10px;
  }
}
</style>