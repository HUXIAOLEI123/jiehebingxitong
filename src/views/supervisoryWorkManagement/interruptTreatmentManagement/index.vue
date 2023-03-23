<template>
  <div class="box">
    <div class="room">
      <el-tabs v-model="tabPaneValue" @tab-click="resetBtn" @change="resetBtn">
        <el-tab-pane label="中断服药统计" name="中断服药统计" value="中断服药统计" :lazy="true">
          <el-form :model="form" ref="form" size="small" :inline="true" label-width="80px" class="form_row">
            <el-row>
              <!-- 行政区划 -->
              <!-- <el-col :span="6">
                <el-form-item label="行政区划">
                  <my-cascader v-model="form.RegionCode" :props="propt" clearable></my-cascader>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="姓名:" prop="Name" clearable>
                  <el-input v-model="form.Name" placeholder="请输入姓名" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号:" prop="CardNo">
                  <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别:" prop="Sex">
                  <el-select v-model="form.Sex" placeholder="请选择" clearable>
                    <el-option v-for="item in Sex" :key="item.DetailsId" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="中断时长:" prop="InterruptDays">
                  <el-select v-model="form.InterruptDays" placeholder="请选择" clearable>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="大于3天" value="3"></el-option>
                    <el-option label="大于5天" value="5"></el-option>
                    <el-option label="大于14天" value="14"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="管理机构:" prop="OrganizationName">
                  <el-cascader
                    :options="tenantData"
                    :props="propslist"
                    v-model="form.AdminOrganization"
                    style="width: 100%"
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
                    <div class="searchBtn" @click="queryBtn">
                      <img class="Btnicon" src="@/assets/images/searchicon2.png" alt="" />
                      查询
                    </div>
                    <div class="ResetBtn" style="margin-left: 10px" @click="resetBtn">
                      <img class="Btnicon" src="@/assets/images/reseticon.svg" alt="" />
                      重置
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 表格区域 -->
          <vxe-table align="center" size="small" class="mytable-scrollbar" :height="tableHeight" stripe :data="tableData" show-overflow>
            <vxe-column field="Name" title="姓名" width="100" fixed="left">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">
                  <!-- {{ row.Name | hideMiddle }} -->
                  {{ row.Name }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="SexName" title="性别" width="100">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">{{ row.SexName }}</span>
              </template>
            </vxe-column>
            <vxe-column field="Age" title="年龄" width="100">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">{{ row.Age }}</span>
              </template>
            </vxe-column>
            <vxe-column field="CardNo" title="证件号" width="150">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">
                  {{ row.CardNo | hideMiddlelong }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="Phone" title="联系电话" width="150">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">
                  <!-- {{ row.Phone | hideMiddlelong }} -->
                  {{ row.Phone }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="Address" title="居住地址" min-width="150">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">
                  {{ row.Address | hideMiddlelong }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="DiagnosisTypeName" title="结核病类型" width="120">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">{{ row.DiagnosisTypeName }}</span>
              </template>
            </vxe-column>
            <vxe-column field="PatientTypeName" title="患者类型" width="100">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">{{ row.PatientTypeName }}</span>
              </template>
            </vxe-column>
            <vxe-column field="InterruptDays" title="中断服药时长(天)" width="130">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">{{ row.InterruptDays }}</span>
              </template>
            </vxe-column>
            <vxe-column field="AdminOrganizationName" title="管理机构" width="120">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">{{ row.AdminOrganizationName }}</span>
              </template>
            </vxe-column>
            <vxe-column field="ResponsibilityName" title="责任医师" width="100">
              <template slot-scope="{ row }">
                <span :class="row.InterruptDays > 2 ? 'red' : ''">{{ row.ResponsibilityName }}</span>
              </template>
            </vxe-column>
            <vxe-column title="操作" width="100" fixed="right">
              <template #default="{ row }">
                <div class="flex_center">
                  <el-link type="primary" @click="details(row)">详情</el-link>
                </div>
              </template>
            </vxe-column>
          </vxe-table>
          <!-- 分页器 -->
          <div class="app-pagination">
            <el-pagination
              ref="elPage"
              :current-page="form.PageNumber"
              @size-change="handleSizeChange"
              :total="form.TotalCount"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              @current-change="changePage"
              :page-size="form.PageSize"
              layout="total,sizes,prev, pager, next, jumper"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="中断服药明细" name="中断服药明细" value="中断服药明细" :lazy="true">
          <el-form :model="form" ref="form" size="small" :inline="true" label-width="80px" class="form_row">
            <el-row>
              <!-- 行政区划 -->
              <!-- <el-col :span="6">
                <el-form-item label="行政区划">
                  <my-cascader v-model="form.RegionCode" :props="propt" clearable></my-cascader>
                </el-form-item>
              </el-col> -->

              <el-col :span="6">
                <el-form-item label="姓名:" prop="Name" clearable>
                  <el-input v-model="form.Name" placeholder="请输入姓名" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件号:" prop="CardNo">
                  <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable />
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
                <el-form-item label="处置状态:" prop="IsManagement">
                  <el-select v-model="form.IsManagement" placeholder="请选择" clearable>
                    <el-option label="已处置" :value="true"></el-option>
                    <el-option label="未处置" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="管理机构:" prop="OrganizationName">
                  <el-cascader
                    :options="tenantData"
                    :props="propslist"
                    v-model="form.AdminOrganization"
                    style="width: 100%"
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
                    <div class="searchBtn" @click="queryBtn">
                      <img class="Btnicon" src="@/assets/images/searchicon2.png" alt="" />
                      查询
                    </div>
                    <div class="ResetBtn" style="margin-left: 10px" @click="resetBtn">
                      <img class="Btnicon" src="@/assets/images/reseticon.svg" alt="" />
                      重置
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 表格区域 -->
          <vxe-table
            align="center"
            size="small"
            class="mytable-scrollbar"
            :height="tableHeight"
            width="400"
            stripe
            :data="tableData"
            show-overflow
          >
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
            <vxe-column field="Address" title="居住地址" width="150">
              <template slot-scope="{ row }">
                <span>
                  {{ row.Address | hideMiddlelong }}
                </span>
              </template>
            </vxe-column>
            <vxe-column field="DiagnosisTypeName" title="结核病类型" width="120"></vxe-column>
            <vxe-column field="PatientTypeName" title="患者类型" width="100"></vxe-column>
            <vxe-column field="IsManagement" title="处置状态" width="80" align="center">
              <template slot-scope="{ row }">
                <el-tag type="primary" v-if="row.IsManagement == true">已处置</el-tag>
                <el-tag type="danger" v-if="row.IsManagement == false">未处置</el-tag>
              </template>
            </vxe-column>
            <vxe-column field="TreatmentPlanName" title="治疗方案" width="100"></vxe-column>
            <vxe-column field="SubmitTime" title="中断服药时间" width="130">
              <template slot-scope="{ row }">
                <span>
                  {{ row.SubmitTime | parseTime('{y}-{m}-{d}') }}
                </span>
              </template>
            </vxe-column>

            <vxe-column field="ManagementTime" title="处置时间" width="100"></vxe-column>
            <vxe-column field="AdminOrganizationName" title="管理机构" width="120"></vxe-column>
            <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
            <vxe-column title="操作" width="100" fixed="right">
              <template #default="{ row }">
                <div class="flex_center">
                  <el-link type="primary" @click="disposal(row)" v-if="!row.IsManagement">处置</el-link>
                  <div class="Divider" v-if="!row.IsManagement"></div>
                  <el-link type="primary" @click="delData(row)">删除</el-link>
                </div>
              </template>
            </vxe-column>
          </vxe-table>
          <!-- 分页器 -->
          <div class="app-pagination">
            <el-pagination
              ref="elPage"
              :current-page="form.PageNumber"
              @size-change="handleSizeChange"
              :total="form.TotalCount"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              @current-change="changePage"
              :page-size="form.PageSize"
              layout="total,sizes,prev, pager, next, jumper"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Edit ref="edit"></Edit>
  </div>
  <!-- </div> -->
</template>
<script>
// 弹窗子组件
import Edit from './components/Edit.vue';
// 字典
import { usedictionarydetails } from '@/api/dict.js';
// 机构
import { getOrganizationList } from '@/api/organizationManagement';
import {
  getInterruptsList,
  getAllInterruptsList,
  confirmaInfo,
  deletesmanagementist,
} from '@/api/supervisoryWorkManagement/pulmonaryInterrupt';
export default {
  name: 'PatientRecords',
  components: {
    Edit,
  },
  data() {
    return {
      tabPaneValue: '中断服药统计',
      // 表单绑定数据
      form: {
        PageNumber: 1,
        PageSize: 10,
        TotalCount: 0,
        SelectOnly: false,
        AdminOrganization: [JSON.parse(localStorage.getItem('userInfo')).authOrgId],
        IsManagement: null,
        Name: '',
        Sex: '',
        CardNo: '',
        RegionCode: '',
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
      tableHeight: '300', //table高度
    };
  },
  created() {
    this.queryBtn(); // 获取初始表格数据
    usedictionarydetails({
      CategoryCode: 'A0003',
    }).then(res => (this.Sex = res.Response.items)); // 获取性别字典
  },
  mounted() {
    this.initTableHeight();
  },
  methods: {
    //查询
    queryBtn() {
      if (this.tabPaneValue == '中断服药统计') this.getCountData();
      if (this.tabPaneValue == '中断服药明细') this.getDetailData();
    },
    //重置
    resetBtn() {
      this.form.PageNumber = 1;
      this.$refs['form'].resetFields();
      this.queryBtn();
    },
    // 获取统计表格数据
    async getCountData() {
      let form = { ...this.form };
      form.AdminOrganization = form.AdminOrganization[form.AdminOrganization.length - 1];
      let res = await getAllInterruptsList(form);
      this.tableData = res.Response.items;
      this.form.TotalCount = res.Response.TotalCount;
    },
    // 获取明细表格数据
    async getDetailData() {
      let form = { ...this.form };
      form.AdminOrganization = form.AdminOrganization[form.AdminOrganization.length - 1];
      let res = await getInterruptsList(form);
      this.tableData = res.Response.items;
      this.form.TotalCount = res.Response.TotalCount;
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
    //删除的操作
    delData(row) {
      //弹框
      this.$confirm(`你确定删除${row.Name}的数据?`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        roundButton: true,
      })
        .then(async () => {
          //当用户点击确定按钮的时候会出发
          //向服务器发请求
          let op = [row.InterruptId];
          let result = await deletesmanagementist(op);
          //如果删除成功
          if (result.StatusCode == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.queryBtn();
          }
        })
        .catch(() => {
          //当用户点击取消按钮的时候会触发
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
    //统计详情 前往治疗卡
    details(row) {
      localStorage.setItem('Patientsdetails', JSON.stringify(row));
      localStorage.setItem('tablist', 4);
      this.$router.push({
        name: 'PatientManagementdetaltab',
        query: {
          diagnosisId: row.DiagnosisId,
        },
      });
    },
    // 确认
    disposal(data) {
      // 弹框
      this.$confirm(`你确定处置${data.Name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          let dee = [data.InterruptId];
          let result = await confirmaInfo(dee);
          if (result.StatusCode == 200) {
            this.$message({
              type: 'success',
              message: '确认成功!',
            });
            this.queryBtn();
          }
        })
        .catch(() => {
          // 当用户点击取消按钮的时候会触发
          this.$message({
            type: 'info',
            message: '已取消',
          });
        });
    },
    // 分页当前页变化回调
    changePage(page) {
      this.form.PageNumber = page;
      this.queryBtn();
    },
    handleSizeChange(data) {
      this.form.PageSize = data;
      this.queryBtn();
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage?.$el?.clientHeight || 0; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 480;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
.conter {
  width: 100%;
  height: 40px;
  padding-right: 30px;
  margin-bottom: 20px;
}

::-webkit-scrollbar {
  width: 0 !important;
}
</style>
