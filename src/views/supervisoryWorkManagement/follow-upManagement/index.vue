<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" v-show="showSearch" label-width="120px" class="form_row">
        <el-row>
          <!-- 行政区划 -->
          <!-- <el-col :span="6">
            <el-form-item label="行政区划">
              <my-cascader v-model="form.RegionCode" :props="propt" clearable></my-cascader>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="姓名:" prop="Name" clearable>
              <el-input v-model="form.Name" placeholder="请输入姓名" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号:" prop="CardNo">
              <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别:" prop="Sex" clearable>
              <el-select v-model="form.Sex" placeholder="请选择">
                <el-option v-for="item in Sex" :key="item.DetailsId" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="末次随访日期:" prop="LastVisitDate">
              <el-date-picker
                @change="changeLastVisitDate"
                v-model="form.LastVisitDate"
                type="daterange"
                align="center"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>

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
          <el-col :span="2">
            <el-form-item label="仅本机构:" prop="SelectOnly">
              <el-checkbox v-model="form.SelectOnly"></el-checkbox>
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
      <div class="conter">
        <el-radio-group size="medium" v-model="radio1" @change="tabList">
          <el-radio-button label="全部"></el-radio-button>
          <el-badge class="item">
            <el-radio-button label="今日待随访"></el-radio-button>
          </el-badge>
          <el-badge class="item">
            <el-radio-button label="近7天待随访"></el-radio-button>
          </el-badge>
        </el-radio-group>
      </div>
      <vxe-table align="center" size="small" :height="tableHeight" stripe :data="tableData" show-overflow class="mytable-scrollbar">
        <vxe-column field="Name" title="姓名" width="100" fixed="left">
          <template slot-scope="{ row }">
            <span>
              <!-- {{ row.Name | hideMiddle }} -->
              {{ row.Name }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="SexName" title="性别" width="100"></vxe-column>
        <vxe-column field="Age" title="年龄" width="100"></vxe-column>
        <vxe-column field="CardNo" title="证件号" width="150">
          <template slot-scope="{ row }">
            <span>
              {{ row.CardNo | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="Phone" title="联系电话" width="150">
          <template slot-scope="{ row }">
            <span>
              <!-- {{ row.Phone | hideMiddlelong }} -->
              {{ row.Phone }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="Address" title="居住地址" min-width="150">
          <template slot-scope="{ row }">
            <span>
              {{ row.Address | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="DiagnosisTypeName" title="结核病类型" width="120"></vxe-column>
        <vxe-column field="DetectionPathwayName" title="病例类型" width="100"></vxe-column>
        <vxe-column field="PatientTypeName" title="患者类型" width="100"></vxe-column>
        <vxe-column field="TreatmentPlanName" title="治疗方案" width="100"></vxe-column>
        <vxe-column field="ShouldVisitCount" title="应随访次数" width="130"></vxe-column>
        <vxe-column field="ActualVisitCount" title="实际随访次数" width="130"></vxe-column>
        <vxe-column field="LastVisitDate" title="末次随访日期" :formatter="stateFormat" width="120">
          <template slot-scope="{ row }">
            <span>
              {{ row.LastVisitDate | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="NextVisitDate" title="下次随访日期" width="130">
          <template slot-scope="{ row }">
            <span>
              {{ row.NextVisitDate | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构" width="130"></vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
        <vxe-column field="age13" title="操作" width="160" fixed="right" align="center">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link type="primary" @click="handlerEdit('details', row)">详情</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="handlerEdit('addfollow', row)">新增随访</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>

      <!--弹框 -->
      <Firstvisits ref="firstvisits" @submit="getListInfo"></Firstvisits>
      <Followvisits ref="followtvisits" @submit="getListInfo"></Followvisits>
      <!-- 分页器 -->
      <div class="app-pagination">
        <el-pagination
          ref="elPage"
          :current-page="form.CurrentPage"
          @size-change="handleSizeChange"
          :total="form.TotalCount"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          @current-change="changePage"
          :page-size="form.PageSize"
          layout="total,sizes,prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// 字典
import { usedictionarydetails } from '@/api/dict.js';
// 级联选择器
import MyCascader from '@/components/MyCascader/index.vue';
// 弹窗子组件
import Firstvisits from './components/firstvisits.vue';
import Followvisits from './components/followvisits';
// api
import { getorgcascader, getOrganizationList } from '@/api/organizationManagement';
import {
  manageList,
  cascaderList,
  getPulmonary,
  followPulmonaryVisit,
  delPulmonaryVisit,
} from '@/api/supervisoryWorkManagement/follow-upManagement';
export default {
  name: 'PatientRecords',
  components: { MyCascader, Firstvisits, Followvisits },
  data() {
    return {
      // 搜索表单绑定数据
      AdminOrganization: {},
      form: {
        CurrentPage: 1,
        PageSize: 10,
        TotalPages: 0,
        SelectOnly: false,
      },
      OrganizationId: [],
      // radio1: '全部',
      radio1: '全部',
      //性别
      Sex: [],
      value: [],
      // 机构下拉数据
      propslist: {
        value: 'OrganizationId',
        label: 'OrganizationName',
        children: 'Children',
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
      tenantData: [
        {
          OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
          OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
          Children: [],
        },
      ], //机构数组
      authOrgName: '',
      // 区划多级下拉
      propt: {
        emitPath: false,
        label: 'RegionName',
        children: 'Children',
        value: 'RegionCode',
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      tableHeight: '300', //table高度
      // 分页数据
      showSearch: true,
      // 表格数据
      tableData: [],
      // 选择项数组（选择的表格数据）
    };
  },

  created() {
    // 获取初始表格数据
    this.startdata();
    // 获取性别字典
    let option = { CategoryCode: 'A0003' };
    usedictionarydetails(option).then(res => (this.Sex = res.Response.items));
  },
  mounted() {
    this.initTableHeight();
    Object.assign({}, this.staform, this.form);
  },
  onshow() {
    this.startdata();
  },
  methods: {
    // 初次获取数据
    startdata() {
      let OrganizationId = JSON.parse(localStorage.getItem('userInfo')).authOrgId;
      this.OrganizationId.push(OrganizationId);
      this.$set(this.form, 'AdminOrganization', OrganizationId);
      this.form.RegionCode = JSON.parse(localStorage.getItem('userInfo')).authRegionCode;
      manageList(this.form).then(res => {
        this.tableData = [...res.Response.items];
        Object.assign(this.form, res.Response, this.staform);
      });
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage?.$el?.clientHeight || 0; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 440;
      });
    },
    //随访时间
    changeLastVisitDate(value) {
      this.form.LastVisitDate = value;
    },
    // 获取机构id
    async getOid(value) {
      let Id = value[value.length - 1];
      this.$set(this.form, 'AdminOrganization', Id);
    },
    async lazyLoad(node, resolve) {
      let res = await getOrganizationList({
        Org_OrganizationId: node.value,
        PageNumber: 1,
        PageSize: 9999,
      });
      let data = [];
      if (node.level > 0) {
        data = res.Response.items;
      }
      resolve(data);
    },
    // 访问筛选
    tabList(str) {
      if (str == '全部') {
        this.form.QueryType = '';
        this.getListInfo();
      } else if (str == '今日随访') {
        this.form.QueryType = '1';
        this.getListInfo();
      } else {
        this.form.QueryType = '2';
        this.getListInfo();
      }
    },

    // 将时间分割
    stateFormat(row, column, cellValue) {
      if (!row.LastVisitDate) return '';
      if (row.LastVisitDate.length > 10) {
        //最长固定显示10个字符
        return row.LastVisitDate.slice(0, 10) + ' ';
      }
      return cellValue;
    },
    // 获取数据
    getListInfo() {
      let form = this.form;
      manageList(form).then(res => {
        this.tableData = [...res.Response.items];
        Object.assign(this.form, res.Response);
      });
    },

    // 新增或修改按钮 弹窗显示
    handlerEdit(flag, data) {
      // 详情  跳转页面
      if (flag == 'details') {
        localStorage.setItem('Patientsdetails', JSON.stringify(data));
        localStorage.setItem('tablist', 9);
        var dataobject = JSON.stringify(data);
        this.$router.push({
          path: '/PatientManagementdetaltab',
          query: data,
        });
      } else if (flag == 'addfollow') {
        // 后续随访
        if (data.ActualVisitCount) {
          this.$refs.followtvisits.show(flag, data);
        } else {
          // 第一次随访
          this.$refs.firstvisits.show(flag, data);
        }
      }
    },
    // 确认
    edit(flag, data) {
      if (flag == 'details') {
        this.$baseMessage('增加成功', 'success');
      }
    },
    // 查询搜索
    async handleQuery() {
      let { form } = this;
      let res = await manageList(form);
      if (res.StatusCode == 200) {
        this.tableData = [...res.Response.items];
        Object.assign(this.form, res.Response);
        // this.$baseMessage('搜索成功', "success")
      }
    },
    // 重置
    resetQuery() {
      this.form.PageNumber = 1;
      this.$refs['form'].resetFields();
      this.getListInfo();
    },

    // 分页当前页变化回调
    changePage(page) {
      this.form.PageNumber = page;
      manageList(this.form).then(res => (this.tableData = [...res.Response.items]));
    },
    handleSizeChange(data) {
      this.form.PageSize = data;
      this.getListInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
// .search {
//   margin-left: 70px;
// }

.conter {
  width: 100%;
  height: 40px;
  padding-right: 30px;
  margin-bottom: 20px;
}

.conter > .but {
  float: right;

  margin-top: 5px;
}
.form_row {
  .el-form-item {
    display: flex;

    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;

      .el-select,
      .el-date-editor {
        width: 100%;
      }
    }

    .el-input-number {
      width: 100%;

      .el-input__inner {
        text-align: left;
      }
    }
  }
}
</style>