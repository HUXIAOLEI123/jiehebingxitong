<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="searchForm" :model="searchForm" label-width="80px" size="small" inline class="form_row">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="TreatmentPlanName" label="方案名称:">
            <el-input v-model="searchForm.TreatmentPlanName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="searchbox">
            <div class="searchBtn" @click="queryBtn">
              <img class="Btnicon" src="@/assets/images/searchicon2.png" alt="" />
              查询
            </div>
            <div class="ResetBtn" style="margin-left: 10px" @click="resetBtn">
              <img class="Btnicon" src="@/assets/images/reseticon.svg" alt="" />
              重置
            </div>
            <el-button class="addBtn Btn"  style="margin-left: 10px" round type="primary" @click="add">
              <img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
              新增
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <vxe-table
      :data="tableData"
      ref="multipleTable"
      tooltip-effect="light"
      border
      size="small"
      align="center"
      class="mytable-scrollbar"
      resizable
      :height="tableHeight"
      v-loading="tableLoading"
    >
      <vxe-table-column field="TreatmentPlanName" title="治疗方案名称"/>
      <vxe-table-column field="StrengtheningPeriodMonth" title="强化期(月)" width="140" />
      <vxe-table-column field="StrengtheningPeriodDMT" title="强化期服药频率(次/天)" width="200" />
      <vxe-table-column field="ConsolidationPeriodMonth" title="巩固期(月)" width="140" />
      <vxe-table-column field="ConsolidationPeriodDMT" title="巩固期服药频率(次/天)" width="200" />
      <vxe-column title="操作" width="100" fixed="right">
        <template #default="{ row }">
          <div class="flex_center">
            <el-link type="primary" @click="edit(row)">修改</el-link>
            <div class="Divider"></div>
            <el-link type="danger" @click="delet(row)">删除</el-link>
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
        :current-page="searchForm.PageNumber"
        :page-size="searchForm.PageSize"
        @current-change="handlerPageChange"
        @size-change="handlerPageSizeChange"
      ></el-pagination>
    </div>
    <!-- 新增编辑接口信息 -->
    <pageEdit ref="pageEdit" @submit="queryBtn" />
  </div>
</template>
<script>
import pageEdit from "./components/pageEdit";
import { treatmentplantemplates, treatmentplanrecordDeletes } from "@/api/TreatmentPlanTemplate";
export default {
  name: "medicalSettle",
  components: {
    pageEdit,
  },
  data () {
    return {
      tableData: [],
      tableHeight: "300", //table高度
      tableLoading: false,
      tableData: [],
      searchForm: {
        PageNumber: 1,
        PageSize: 10,
        TreatmentPlanName: '',
        StrengtheningPeriodMonth: '',
        StrengtheningPeriodDMT: '',
        ConsolidationPeriodMonth: '',
        ConsolidationPeriodDMT: '',
      },
      total: 0,
    };
  },
  mounted () {
    this.initTableHeight();
  },
  watch: {},
  created () {
    this.query();
  },
  methods: {
    //查询按钮
    queryBtn () {
      this.searchForm.PageNumber = 1;
      this.query();
    },
    //重置
    resetBtn () {
      this.$refs["searchForm"].resetFields();
      this.query()
    },
    // 获取治疗方案信息列表
    async query () {
      this.tableLoading = true;
      let res = await treatmentplantemplates(this.searchForm)
      this.tableLoading = false;
      this.tableData = res.Response.items;
      this.total = res.Response.TotalCount;
    },
    // 删除
    delet (row) {
      this.$confirm("确认要删除这条数据吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        roundButton:true,
      }).then(async () => {
        await treatmentplanrecordDeletes([row.TreatmentPlanId])
        this.$message.success('删除成功');
        this.queryBtn()
      });
    },
    // 新增治疗方案
    add () {
      var param = {
        title: "新增治疗方案",
        visible: true,
        opt: "add"
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 修改治疗方案
    edit (row) {
      var param = {
        title: "修改治疗方案",
        visible: true,
        opt: "edit",
        TreatmentPlanId: row.TreatmentPlanId
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 分页当前页变化回调
    handlerPageChange (PageNumber) {
      this.searchForm.PageNumber = PageNumber;
      this.query();
    },
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 360;
      });
    },
    // 分页每页条数变化回调
    handlerPageSizeChange (PageSize) {
      this.searchForm.PageSize = PageSize;
      this.query();
    },

  }
};
</script>
