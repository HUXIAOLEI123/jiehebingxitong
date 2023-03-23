<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="searchForm" :model="searchForm" label-width="80px">
      <el-row :gutter="6">
        <el-col :span="6">
          <el-form-item prop="DepartmentName" label="部门名称:">
            <el-input v-model="searchForm.DepartmentName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="OrganizationCode" label="机构编码:">
            <el-input v-model="searchForm.OrganizationCode" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click="queryBtn" type="primary" style="margin-left: 10px">查询</el-button>
          <el-button @click="resetBtn" plain>重置</el-button>
          <el-button @click="add()" type="success">新增部门</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- table -->
    <vxe-table
      :data="tableData"
      ref="multipleTable"
      tooltip-effect="light"
      border
      resizable
      :tree-config="{ children: 'children', expandAll: true }"
      :height="tableHeight"
      v-loading="tableLoading"
    >
      <vxe-table-column field="departmentName" title="部门名称" min-width="120" tree-node />
      <vxe-table-column field="parentCode" title="上级部门" width="100" align="center" />
      <vxe-table-column field="organizationName" title="所属机构" width="260" />
      <vxe-table-column field="leader" title="负责人" width="80" align="center" />
      <vxe-table-column field="orderSort" title="排序" width="80" align="center" />
      <vxe-table-column field="status" title="状态" width="100" align="center" :formatter="filterStatus" />
      <vxe-table-column title="操作" fixed="right" align="center" width="160">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" v-if="scope.row.isDepart" type="primary" size="mini">修改</el-button>
          <el-button @click="delet(scope.row)" v-if="scope.row.isDepart" type="danger" size="mini">删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 新增编辑部门信息 -->
    <pageEdit ref="pageEdit" @submit="queryBtn" />
    <!-- 部门信息详情 -->
    <pageDetail ref="pageDetail" @submit="queryBtn" />
  </div>
</template>
<script>
import pageEdit from "./components/pageEdit";
import pageDetail from "./components/pageDetail";
export default {
  name: "medicalSettle",
  components: {
    pageEdit,
    pageDetail,
  },
  data () {
    return {
      tableData: [],
      tableHeight: "300", //table高度
      tableLoading: false,
      tableData: [],
      searchForm: {
        tenantid: '',
        DepartmentName: '',
        OrganizationCode: '',
      },
    };
  },
  mounted () {
    this.initTableHeight();
  },
  created () {
    this.query();
  },
  methods: {
    filterStatus (row) {
      row = row.row;
      if (row.status == '1') return '停用';
      if (row.status == '0') return '正常';
    },
    //查询按钮
    queryBtn () {
      this.query();
    },
    //重置
    resetBtn () {
      this.$refs["searchForm"].resetFields();
      this.query()
    },
    // 获取部门信息列表
    query () {
      this.tableLoading = true;
      var searchParam = this.searchForm;
      this.$store
        .dispatch("function/getApi", {
          reqData: searchParam,
          url: 'api/organizationdepartments',
        })
        .then((res) => {
          this.tableLoading = false;
          this.tableData = res.result;
        });
    },
    // 删除
    delet (row) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var searchParam = [row.departmentCode];
        this.$store
          .dispatch("function/postApi", {
            reqData: searchParam,
            url: 'api/organizationdepartments/deletes',
          })
          .then((res) => {
            this.query();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
      });
    },
    // 新增部门
    add (row) {
      var param = {
        title: "新增部门",
        visible: true,
        opt: "add"
      };
      this.$refs.pageEdit.getDetail(param);

    },
    // 修改部门
    edit (row) {
      var param = {
        title: "修改部门",
        visible: true,
        opt: "edit",
        departmentCode: row.departmentCode,
        tenantid: row.tenantid,
        organizationCode: row.organizationCode,
        row: row
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 部门详情
    detail (row) {
      var param = {
        title: "部门详情",
        visible: true,
        opt: "detail",
        row: row,
        departmentCode: row.departmentCode,
      };
      this.$refs.pageDetail.getDetail(param);
    },
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var moreSearchFormClientHeight =
          this.$refs.searchForm.$el.clientHeight; // 搜索框高度
        this.tableHeight = availHeight - moreSearchFormClientHeight - 280;
      });
    },
  },
};
</script>
