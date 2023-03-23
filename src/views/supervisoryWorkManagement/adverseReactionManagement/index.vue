<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" label-width="80px" class="form_row">
        <el-row>
          <!-- 行政区划 -->
          <!-- <el-col :span="6">
            <el-form-item label="行政区划" prop="RegionCode">
              <my-cascader v-model="form.RegionCode" :props="propt" clearable></my-cascader>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="姓名:" prop="Name">
              <el-input v-model="form.Name" placeholder="请输入姓名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别:" prop="Sex">
              <el-select v-model="form.Sex" placeholder="请选择" clearable>
                <el-option v-for="item in Sex" :key="item.DetailsId" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号:" prop="CardNo">
              <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="处置结果:" prop="IsManagement">
              <el-select v-model="form.IsManagement" placeholder="请选择" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option label="已处置" :value="true"></el-option>
                <el-option label="未处置" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="管理机构:" prop="AdminOrganization ">
              <el-cascader
                :options="tenantData"
                :props="propslist"
                v-model="form.AdminOrganization"
                :show-all-levels="false"
                style="width: 100%"
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
      <vxe-table align="center" size="small" :height="tableHeight" stripe :data="tableData" show-overflow class="mytable-scrollbar">
        <vxe-column field="Name" title="姓名" width="100" fixed="left">
          <template slot-scope="{ row }">
            <span>
              <!-- {{ row.Name | hideMiddle}} -->
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
              <!-- {{ row.Phone | hideMiddlelong}} -->
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
        <vxe-column field="AdverseReactiondurationName" title="反应时长" width="130"></vxe-column>
        <vxe-column field="AdverseReactionName" title="不良反应" width="140"></vxe-column>
        <vxe-column field="ManagementMethod" title="不良反应处置" width="120"></vxe-column>
        <vxe-column title="处置状态" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.IsManagement ? '已处置' : '未处置' }}</div>
          </template>
        </vxe-column>
        <vxe-column field="ManagementTime" title="处置时间" width="130">
          <template slot-scope="{ row }">
            <span>
              {{ row.ManagementTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构" width="120"></vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
        <vxe-column title="操作" width="100" fixed="right">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link type="primary" @click="confirm(row)" v-if="!row.IsManagement">处置</el-link>
              <el-link type="primary" @click="$refs.PageDetail.show(row)" v-if="row.IsManagement">详情</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="delData(row)">删除</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
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
    <Edit ref="edit"></Edit>
    <AdverseTab3Edit ref="adverseTab3Edit" @sumite="queryBtn"></AdverseTab3Edit>
    <PageDetail ref="PageDetail"></PageDetail>
  </div>
  <!-- </div> -->
</template>
<script>
import Edit from './components/Edit.vue';
import PageDetail from './components/PageDetail.vue';
import { usedictionarydetails } from '@/api/dict.js';
import { getOrganizationList } from '@/api/organizationManagement';
import { getBadreactionList, inshowBadreaction, delBadreaction } from '@/api/supervisoryWorkManagement/pulmonaryBadReaction';
import AdverseTab3Edit from '../../../views/patientManagement/patientManagement/components/tabComponents/EditComponents/adverseTab3Edit.vue';
export default {
  name: 'PatientRecords',
  components: {
    Edit,
    PageDetail,
    AdverseTab3Edit,
  },
  data() {
    return {
      tableHeight: '300', //table高度
      form: {
        CurrentPage: 1,
        PageSize: 10,
        TotalPages: 0,
        SelectOnly: false,
        IsManagement: '',
        AdminOrganization: JSON.parse(localStorage.getItem('userInfo')).authOrgId,
        CardNo: '',
        Name: '',
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
    };
  },
  created() {
    // 获取性别字典
    let option = {
      CategoryCode: 'A0003',
    };
    usedictionarydetails(option).then(res => (this.Sex = res.Response.items));
    // 获取初始表格数据
    this.queryBtn();
  },
  mounted() {
    this.initTableHeight();
  },
  methods: {
    //查询
    async queryBtn() {
      let res = await getBadreactionList(this.form);
      this.tableData = res.Response.items;
      this.form.TotalCount = res.Response.TotalCount;
    },
    //重置
    resetBtn() {
      this.form.PageNumber = 1;
      this.$refs['form'].resetFields();
      this.queryBtn();
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage?.$el?.clientHeight || 0; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 400;
      });
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
      }).then(async () => {
        //当用户点击确定按钮的时候会出发
        //向服务器发请求
        let op = [row.BadReactionId];
        let result = await delBadreaction(op);
        //如果删除成功
        if (result.StatusCode == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.queryBtn();
        }
      });
    },
    // 处置
    async confirm(data) {
      this.$refs.adverseTab3Edit.show(data);
      // this.$prompt('处置信息', '处置【' + data.Name + '】不良反应', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      // }).then(async ({
      //   value
      // }) => {
      //   let option = [data.BadReactionId]
      //   await inshowBadreaction(option, "'" + value + "'")
      //   this.$baseMessage('处置成功', "success")
      //   this.queryBtn()
      // }).catch(() => {

      // });
    },
    // 分页当前页变化回调
    async changePage(page) {
      this.form.PageNumber = page;
      this.queryBtn();
    },
    handleSizeChange(data) {
      this.form.PageSize = data;
      this.queryBtn();
    },
  },
};
</script>\
<style>
</style>
