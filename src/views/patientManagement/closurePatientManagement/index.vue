<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" v-show="showSearch" label-width="80px" class="form_row">
        <el-row>
          <!-- 行政区划 -->
          <!-- <el-col :span="6">
            <el-form-item label="行政区划:" prop="RegionCode">
              <my-cascader v-model="form.RegionCode" :props="props" clearable></my-cascader>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="姓名:" prop="Name">
              <el-input v-model="form.Name" placeholder="请输入姓名" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="证件号:" prop="CardNo">
              <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结案日期:" prop="SubmitTime">
              <el-date-picker v-model="form.SubmitTime" type="daterange" align="center" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="管理机构:" prop="AdminOrganization">
              <el-cascader
                style="width: 100%"
                :options="tenantData"
                :props="propslist"
                v-model="form.AdminOrganization"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="仅本机构" prop="SelectOnly">
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
        <el-row></el-row>
      </el-form>
      <!-- 表格区域 -->
      <vxe-table align="center" size="small" :height="tableHeight" stripe :data="tableData" show-overflow class="mytable-scrollbar">
        <vxe-column field="Name" title="姓名" width="100">
          <template slot-scope="{ row }">
            <span>
              {{ row.Name | hideMiddle }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="SexName" title="性别" width="80"></vxe-column>
        <vxe-column field="CardNo" title="证件号" width="150">
          <template slot-scope="{ row }">
            <span>
              {{ row.CardNo | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="Phone" title="电话号码" width="100">
          <template slot-scope="{ row }">
            <span>
              {{ row.Phone | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="Address" title="居住地址" min-width="200">
          <template slot-scope="{ row }">
            <span>
              {{ row.Address | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="建档机构" width="200"></vxe-column>
        <vxe-column field="PatientTypeName" title="患者类型" width="100"></vxe-column>
        <vxe-column field="EvaluationDate" title="评估日期">
          <template #default="{ row }">
            <div>{{ row.EvaluationDate.slice(0, 10) }}</div>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="200" fixed="right">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link type="primary" @click="handlerEdit('details', row)">查看详情</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="handlerEdit('edit', row)">编辑</el-link>
              <div class="Divider"></div>
              <el-link type="danger" @click="handlerEdit('recurrence', row)">复发</el-link>
              <div class="Divider"></div>
              <el-link type="danger" @click="handlerEdit('delete', row)">删除</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- </div> -->
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

      <Edit ref="edit"></Edit>
      <CaseEdit ref="caseEdit" @sumite="funtoapplysettlement"></CaseEdit>
      <RecurrenceEdit ref="recurrenceEdit" @recurrenceEdit="recurrenceEdit"></RecurrenceEdit>
      <NewEdit ref="newedit" @sumite="funtoapplysettlement"></NewEdit>
    </div>
  </div>
</template>
<script>
// 弹窗子组件
import Edit from './components/Edit.vue';
import RecurrenceEdit from './components/recurrenceEdit.vue';
import CaseEdit from '../patientManagement/components/CaseEdit.vue';
import NewEdit from '../patientManagement/components/newEdit.vue';
// 级联选择器
import MyCascader from '@/components/MyCascader';
// 结案
import { toapplysettlement, deletetuberculosisdiagnosiss } from '@/api/PulmonaryClose.js';
import { getOrganizationList, getorgcascader, getuserDrop } from '@/api/organizationManagement.js';
export default {
  name: 'PatientRecords',
  components: {
    Edit,
    RecurrenceEdit,
    MyCascader,
    CaseEdit,
    NewEdit,
  },
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
      propslist: {
        value: 'OrganizationId',
        label: 'OrganizationName',
        children: 'Children',
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
      // 表单绑定数据
      form: {
        SelectOnly: false,
        AdminOrganization: this.$utilsFun.getUserInfo().authOrgId,
        IsClosed: true,
      },
      // closeId:null,
      radio1: '全部',
      tenantData: [
        {
          OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
          OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
          Children: [],
        },
      ], //机构数组
      showSearch: true,
      total: 0,
      paParams: {
        PageNumber: 1,
        PageSize: 10,
      },
      tableData: [],
      tableHeight: '300', //table高度
    };
  },

  async created() {
    await this.funtoapplysettlement();
    // await this.getorganizationlist()
  },
  mounted() {
    this.initTableHeight();
  },
  methods: {
    // 获取列表
    async funtoapplysettlement() {
      const res = await toapplysettlement({
        ...this.paParams,
        ...this.form,
      });

      let { StatusCode, Message, Response } = res;
      if (!Response || StatusCode != 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error');
      }
      this.tableData = Response.items;
      this.total = Response.TotalCount;
    },
    //获取机构列表
    async getorganizationlist() {
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await getorgcascader(this.form.AdminOrganization);
      this.tenantData = res.Response;
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
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 400;
      });
    },
    // 新增或修改按钮 弹窗显示
    handlerEdit(flag, data) {
      if (flag == 'details') {
        this.$refs.edit.show(flag, data.CloseId);
        // 复发？？？
      } else if (flag == 'recurrence') {
        this.$refs.newedit.show(flag, data);
      } else if (flag == 'edit') {
        this.$refs.caseEdit.show(flag, data);
      } else if (flag == 'delete') {
        // 删除
        this.$baseConfirm(
          '确定要删除所选项吗？',
          '删除',
          async () => {
            // id
            let CloseId = data.CloseId;
            const res = await deletetuberculosisdiagnosiss(CloseId);
            let { StatusCode, Message, Response } = res;
            this.$baseMessage('删除成功', 'success');
            this.funtoapplysettlement();
          },
          null,
          'error'
        );
      } else if (flag == 'Modify') {
        // 修改
        this.$refs.recurrenceEdit.show(flag, data.CloseId);
      }
    },
    //结案时间选择
    changeSubmitTime(value) {
      this.form.SubmitTime = value;
    },

    async recurrenceEdit(flag, form, hasinfo) {
      let CloseId = form.CloseId;

      const res = await deletetuberculosisModify(
        {
          closeId: CloseId,
        },
        hasinfo
      );
      let { StatusCode, Message } = res;
      if (StatusCode != 200) {
        return this.$baseMessage(Message || '修改失败', 'error');
      }
      this.$baseMessage('修改成功', 'success');
    },

    // 查询搜索
    handleQuery() {
      this.funtoapplysettlement();
    },
    async resetQuery() {
      this.form.Name = '';
      this.form.CardNo = '';
      this.form.IsTakeMedicine = '';
      this.form.Sex = '';
      this.form.SelectOnly = false;
      this.form.UserAcc = '';
      this.form.SubmitTime = '';
      this.form.IsClosed = true;
      this.form.RegionCode = '';
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await toapplysettlement({
        ...this.paParams,
        ...this.form,
      });
      this.tableData = res.Response.items;
      this.total = res.Response.TotalCount;
      this.$baseMessage('已重置', 'success');
    },

    // 分页当前页变化回调
    handlerPageChange(pageNum) {
      this.paParams.PageNumber = pageNum;
      this.funtoapplysettlement();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange(pageSize) {
      this.paParams.PageSize = pageSize;
      this.funtoapplysettlement();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
