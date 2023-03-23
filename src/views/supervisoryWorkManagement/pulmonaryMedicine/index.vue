<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" class="form_row" ref="form" size="small" :inline="true" v-show="showSearch" label-width="80px">
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
            <el-form-item label="性别:" prop="Sex">
              <el-select v-model="form.Sex" placeholder="请选择性别" clearable>
                <el-option v-for="item in Sex" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="管理机构:" prop="OrganizationName">
              <el-cascader
                style="width: 100%"
                :options="tenantData"
                @change="getOid"
                :props="propslist"
                v-model="OrganizationId"
                :show-all-levels="false"
                clearable
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
        <vxe-column field="TreatmentPlanName" title="治疗方案" width="130"></vxe-column>
        <vxe-column field="ActualTakeMedicineDays" title="已服药天数" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.ActualTakeMedicineDays }}天</span>
          </template>
        </vxe-column>
        <vxe-column field="NoTakeMedicineDays" title="未服药天数" width="100">
          <template slot-scope="{ row }">
            <span>{{ row.NoTakeMedicineDays }}天</span>
          </template>
        </vxe-column>
        <vxe-column field="MedicineAbnormalCount" title="服药异常天数" width="130">
          <template slot-scope="{ row }">
            <span>{{ row.MedicineAbnormalCount }}天</span>
          </template>
        </vxe-column>
        <vxe-column field="StopTakeMedicineDays" title="中断服药天数" width="130">
          <template slot-scope="{ row }">
            <span>{{ row.StopTakeMedicineDays }}天</span>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构" width="120"></vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
        <vxe-column title="操作" width="100" fixed="right">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link type="primary" @click="handlerEdit(row)">详情</el-link>
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
        @size-change="handleSizeChange"
        :total="form.TotalCount"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        @current-change="changePage"
        :page-size="form.PageSize"
        layout="total,sizes,prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
// 弹窗子组件
import Edit from './components/Edit.vue';
// 级联选择器
import MyCascader from '@/components/MyCascader/index.vue';
// 字典
import { usedictionarydetails } from '@/api/dict.js';
// 机构
import { getPulmonary } from '@/api/supervisoryWorkManagement/follow-upManagement';
import { getOrganizationList } from '@/api/organizationManagement';
// api
import { getMedicinesList, delMedicines } from '@/api/supervisoryWorkManagement/pulmonaryMedicine';
export default {
  name: 'PatientRecords',
  components: {
    Edit,
    MyCascader,
  },

  data() {
    return {
      // 表单绑定数据
      form: {
        CurrentPage: 1,
        PageSize: 10,
        TotalPages: 0,
        SelectOnly: false,
      },
      Sex: [],
      tenantData: [
        {
          OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
          OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
          Children: [],
        },
      ], //机构数组
      // 机构多级下拉
      propslist: {
        value: 'OrganizationId',
        label: 'OrganizationName',
        children: 'Children',
        checkStrictly: true,
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
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
      // 表格数据
      tableData: [],
      OrganizationId: [],
      authOrgName: '',
      radio1: '全部',
      showSearch: true,
      tableHeight: '300', //table高度
      // 选择项数组（选择的表格数据）
      checkRows: [],
    };
  },
  created() {
    // 获取性别字典
    let option = {
      CategoryCode: 'A0003',
    };
    usedictionarydetails(option).then(res => (this.Sex = res.Response.items));
    // 获取初始表格数据
    this.getFistdata();
  },
  mounted() {
    this.initTableHeight();
    Object.assign({}, this.staform, this.form);
  },
  onshow() {
    // 获取初始表格数据
    this.getFistdata();
  },
  methods: {
    // 初次获取数据
    getFistdata() {
      // 加在当前账号机构
      let OrganizationId = JSON.parse(localStorage.getItem('userInfo')).authOrgId;
      getPulmonary(OrganizationId).then(res => {});
      this.OrganizationId.push(OrganizationId);
      this.authOrgName = JSON.parse(localStorage.getItem('userInfo')).authOrgName;
      this.$set(this.form, 'AdminOrganization', OrganizationId);
      getMedicinesList(this.form).then(res => {
        this.tableData = [...res.Response.items];
        Object.assign(this.form, res.Response);
      });
    },
    // 获取机构id
    async getOid(value) {
      let Id = value[value.length - 1];
      this.$set(this.form, 'AdminOrganization', Id);
      // this.lazyLoad()
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
    // 跳转详情
    handlerEdit(data) {
      localStorage.setItem('Patientsdetails', JSON.stringify(data));
      localStorage.setItem('tablist', 2);
      data.stype = 99;
      this.$router.push({
        name: 'PatientManagementdetaltab',
        query: {
          diagnosisId: JSON.stringify(data),
        },
      });
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage?.$el?.clientHeight || 0; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 390;
      });
    },
    // 删除按钮
    delData(row) {
      let op = [row.DiagnosisId];
      delMedicines(op).then(res => {});
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
      let res = await getMedicinesList(form);
      if (res.StatusCode == 200) {
        this.tableData = [...res.Response.items];
        Object.assign(this.form, res.Response);
        // this.$baseMessage('搜索成功', "success")
      }
    },
    // 重置
    async resetQuery() {
      this.form.PageNumber = 1;
      this.$refs['form'].resetFields();
      this.getListInfo();
    },
    // 获取列表数据
    getListInfo() {
      let form = this.form;
      getMedicinesList(form).then(res => {
        this.tableData = [...res.Response.items];
        Object.assign(this.form, res.Response);
      });
    },
    // 分页当前页变化回调
    async changePage(page) {
      this.form.PageNumber = page;
      this.getListInfo();
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
