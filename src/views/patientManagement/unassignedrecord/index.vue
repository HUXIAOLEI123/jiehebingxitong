<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" class="form_row">
        <el-row>
          <el-col :span="6">
            <el-form-item label="行政区划" prop="RegionCode">
              <my-cascader v-model="form.RegionCode" :props="props" :options="regionsData" clearable :show-all-levels="true"></my-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名/证件号" prop="FuzzyQueryStr">
              <el-input
                v-model="form.FuzzyQueryStr"
                placeholder="请输入姓名/证件号"
                clearable
                @keyup.enter.native="funtuberculosisdiagnosiss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <div class="searchbox">
                <div class="searchBtn" @click="funtuberculosisdiagnosiss">
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
      <!-- 表格 -->
      <vxe-table align="center" size="small" :height="tableHeight" stripe :data="tableData" show-overflow class="mytable-scrollbar">
        <vxe-column field="Name" title="姓名" width="100" fixed="left">
          <template slot-scope="{ row }">
            <span>
              <!-- {{ row.Name | hideMiddle }} -->
              {{ row.Name }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="SexName" title="性别" width="70"></vxe-column>
        <vxe-column field="IsClosed" title="结案状态" width="100">
          <template #default="{ row }">
            <div>{{ row.IsClosed ? '已结案' : '在案' }}</div>
          </template>
        </vxe-column>
        <vxe-column field="Age" title="年龄" width="70"></vxe-column>
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
        <vxe-column field="PatientTypeName" title="患者类型" width="120"></vxe-column>
        <vxe-column field="TreatmentPlanName" title="治疗方案" width="120"></vxe-column>
        <vxe-column field="DetectionPathwayName" title="病例类型" width="120"></vxe-column>
        <vxe-column field="IsTakeMedicine" title="服药情况" width="100">
          <template #default="{ row }">
            <el-tag type="primary" v-if="row.IsTakeMedicine == true">已服药</el-tag>
            <el-tag type="danger" v-if="row.IsTakeMedicine == false">未服药</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="IsPerfect" title="是否分配" width="100">
          <template #default="{ row }">
            <el-tag type="primary" v-if="row.IsPerfect == true">是</el-tag>
            <el-tag type="danger" v-if="row.IsPerfect == false">否</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构" width="100"></vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
        <vxe-column title="操作" width="140" fixed="right">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link :disabled="row.IsClosed ? true : false" type="primary" @click="$refs.newedit.show('edit', row)">编辑</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="$refs.newedit.show('details', row)">详情</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- 分页器 -->
      <div class="app-pagination">
        <el-pagination
          ref="elPage"
          :layout="paginationLayout"
          :total="total"
          :current-page="paParams.PageNumber"
          :page-size="paParams.PageSize"
          @current-change="handlerPageChange"
          @size-change="handlerPageSizeChange"
        ></el-pagination>
      </div>
      <!-- 弹窗子组件 -->
      <NewEdit ref="newedit" @sumite="funtuberculosisdiagnosiss"></NewEdit>
    </div>
  </div>
</template>
<script>
import NewEdit from './components/newEdit.vue';
import { regions } from '@/api/inputselect.js';
import { unassignedrecordList } from '@/api/TuberculosisDiagnosis.js';
export default {
  name: 'PatientRecords',
  components: { NewEdit },
  data() {
    return {
      props: {
        emitPath: false,
        label: 'RegionName',
        children: 'Children',
        value: 'RegionCode',
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      // 表单绑定数据
      form: {
        // RegionCode:this.$utilsFun.getUserInfo().authRegionCode
      },
      tableHeight: '500', //table高度
      total: 0,
      regionsData: [],
      paParams: {
        PageNumber: 1,
        PageSize: 10,
      },
      tableData: [],
    };
  },
  created() {
    this.regionsList();
  },
  mounted() {
    this.form.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
    this.funtuberculosisdiagnosiss();
    this.initTableHeight();
  },
  methods: {
    async regionsList() {
      const res = await regions(this.$utilsFun.getUserInfo().authRegionCode);
      this.regionsData = res.Response;
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 200;
      });
    },
    // 查询列表
    async funtuberculosisdiagnosiss() {
      const res = await unassignedrecordList({ ...this.paParams, ...this.form });
      let { StatusCode, Message, Response } = res;
      if (!Response || StatusCode != 200) return this.$baseMessage(Message || '数据获取失败', 'error');
      this.tableData = Response.items;
      this.total = Response.TotalCount;
    },
    async resetQuery() {
      this.form.Name = '';
      this.form.CardNo = '';
      this.form.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
      this.funtuberculosisdiagnosiss();
      this.$baseMessage('已重置', 'success');
    },
    // 分页当前页变化回调
    handlerPageChange(PageNumber) {
      this.paParams.PageNumber = PageNumber;
      this.funtuberculosisdiagnosiss();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange(PageSize) {
      this.paParams.PageSize = PageSize;
      this.funtuberculosisdiagnosiss();
    },
  },
};
</script>
<style lang="scss" scoped>
.butt {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  margin-bottom: 20px;
}
</style>
