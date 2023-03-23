<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="searchForm" :model="searchForm" label-width="120px" size="small" inline class="form_row">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="OrganizationName" label="机构名称:">
            <el-input v-model="searchForm.OrganizationName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="Abbreviation" label="机构简称:">
            <el-input v-model="searchForm.Abbreviation" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="Address" label="机构地址:">
            <el-input v-model="searchForm.Address" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="Phone" label="电话:">
            <el-input v-model="searchForm.Phone" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="IsSupervisionUnit" label="督导单位:">
            <el-select v-model="searchForm.IsSupervisionUnit" placeholder="请选择" clearable>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="IsAppoinOrganization" label="定点医疗机构:">
            <el-select v-model="searchForm.IsAppoinOrganization" placeholder="请选择" clearable>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="IsCDC" label="疾控中心:">
            <el-select v-model="searchForm.IsCDC" placeholder="请选择" clearable>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="Contacts" label="联系人:">
            <el-input v-model="searchForm.Contacts" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="机构级别:" prop="OrganizationClass">
            <el-select v-model="searchForm.OrganizationClass" placeholder="请选择" clearable>
              <el-option v-for="item in A0034" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="Org_OrganizationId" label="上级机构:">
            <el-cascader
              style="width: 100%"
              :options="tenantData"
              :props="propslist"
              v-model="searchForm.Org_OrganizationId"
              :show-all-levels="false"
              clearable
            ></el-cascader>
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
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="butt">
      <div class="buttbox">
        <el-row :gutter="15">
          <el-col :span="1.5">
            <el-button class="addBtn Btn" round type="primary" @click="add({ moduleId: '0' })">
              <img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
              新增
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- table -->
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
      <vxe-table-column field="OrganizationId" title="机构编码" width="270" />
      <vxe-table-column field="OrganizationName" title="机构名称" width="270" />
      <vxe-table-column field="Abbreviation" title="机构简称" width="100" />
      <vxe-column field="IsSupervisionUnit" title="督导单位" width="100">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.IsSupervisionUnit">是</el-tag>
          <el-tag type="danger" v-if="!row.IsSupervisionUnit">否</el-tag>
        </template>
      </vxe-column>
      <vxe-column field="IsAppoinOrganization" title="定点医疗机构" width="160">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.IsAppoinOrganization">是</el-tag>
          <el-tag type="danger" v-if="!row.IsAppoinOrganization">否</el-tag>
        </template>
      </vxe-column>
      <vxe-column field="IsCDC" title="疾控中心" width="100">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.IsCDC">是</el-tag>
          <el-tag type="danger" v-if="!row.IsCDC">否</el-tag>
        </template>
      </vxe-column>
      <vxe-table-column field="OrganizationClassName" title="机构级别" width="100" />
      <vxe-table-column field="OrganizationTypeName" title="机构类型" width="100" />
      <vxe-table-column field="Contacts" title="联系人" width="100" />
      <vxe-table-column field="Phone" title="电话" width="150" />
      <vxe-table-column field="Address" title="机构地址" width="100" />
      <vxe-table-column field="Remarks" title="备注" width="100" />
      <vxe-column title="操作" width="150" fixed="right">
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
    <!-- 接口信息详情 -->
    <pageDetail ref="pageDetail" @submit="queryBtn" />
  </div>
</template>
<script>
import pageEdit from "./components/pageEdit";
import pageDetail from "./components/pageDetail";
import {
  getList,
  cascader,
  deletes
} from "@/api/systemManage/Organization";
import {
  usedictionarydetails
} from '@/api/dict.js'
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
        PageNumber: 1,
        PageSize: 10,
        OrganizationName: "",
        Org_OrganizationId: "",
        Abbreviation: "",
        Address: "",
        IsSupervisionUnit: "",
        IsAppoinOrganization: "",
        IsCDC: "",
        Contacts: "",
        Phone: "",
      },
      tenantData: [{
        OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
        OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
        Children: []
      }], //机构数组
      propslist: {
        value: "OrganizationId",
        label: "OrganizationName",
        children: "Children",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      total: 0,
      A0034: []
    };
  },
  mounted () {
    this.initTableHeight();
  },
  watch: {},
  created () {
    this.query();
    this.funusedictionarydetails();
  },
  methods: {
    // 字典数据请求
    async funusedictionarydetails () {
      const res = await usedictionarydetails({
        CategoryCode: ['A0036', 'A0034']
      })
      this.A0034 = res.Response.items.filter((i) => i.CategoryCode == 'A0034')
      this.A0036 = res.Response.items.filter((i) => i.CategoryCode == 'A0036')
    },
    //查询按钮
    queryBtn () {
      this.searchForm.PageNumber = 1;
      this.query();
    },
    async lazyLoad (node, resolve) {
      let res = await getList({
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
    //重置
    resetBtn () {
      this.$refs["searchForm"].resetFields();
      this.query()
    },
    // 获取机构信息列表
    async query () {
      this.tableLoading = true;
      let res = await getList(this.searchForm)
      this.tableLoading = false;
      this.tableData = res.Response.items;
      this.total = res.Response.TotalCount;
    },
    // 删除
    delet (row) {
      this.$confirm("确认要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        roundButton:true,
      }).then(async () => {
        await deletes([row.OrganizationId])
        this.$message.success('删除成功');
        this.queryBtn()
      });
    },
    // 新增机构
    add () {
      var param = {
        title: "新增机构",
        visible: true,
        opt: "add"
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 修改机构
    edit (row) {
      var param = {
        title: "修改机构",
        visible: true,
        opt: "edit",
        Org_OrganizationId:row.Org_OrganizationId,
        OrganizationId: row.OrganizationId
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 机构详情
    detail (row) {
      var param = {
        title: "机构详情",
        visible: true,
        opt: "detail",
        row: row,
        moduleId: row.moduleId,
      };
      this.$refs.pageDetail.getDetail(param);
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
        this.tableHeight = availHeight - elPageClientHeight - 480;
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
