<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="searchForm" :model="searchForm" label-width="80px" size="small" inline class="form_row">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="ParentId" label="上级接口:">
            <el-cascader
              style="width: 100%"
              :options="tenantData"
              :props="propslist"
              v-model="searchForm.ParentId"
              :show-all-levels="false"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="ModuleName" label="接口名称:">
            <el-input v-model="searchForm.ModuleName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="LinkUrl" label="链接地址:">
            <el-input v-model="searchForm.LinkUrl" clearable />
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
      <div>
        <el-row :gutter="15">
          <el-col :span="1.5">
            <el-button class="addBtn Btn" round type="primary" @click="add">
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
      <vxe-table-column field="ModuleName" title="接口名称" width="120" />
      <vxe-table-column field="LinkUrl" title="链接地址" width="140" />
      <vxe-table-column field="ParentId" title="上级接口" width="100" />
      <vxe-column field="Enabled" title="状态" width="100">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.Enabled">正常</el-tag>
          <el-tag type="danger" v-if="!row.Enabled">停用</el-tag>
        </template>
      </vxe-column>
      <vxe-table-column field="OrderSort" title="排序" width="80" />
      <vxe-table-column field="Description" title="描述" />
      <vxe-column title="操作" width="300" fixed="right">
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
import {
  getList,
  deletes
} from "@/api/systemManage/OrganizationModule";
export default {
  name: "medicalSettle",
  components: {
    pageEdit
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
        SelectOnly: false,
      },
      tenantData: [], //接口数组
      propslist: {
        value: "ModuleId",
        label: "ModuleName",
        children: "Children",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad
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
    this.getModuleData()
  },
  methods: {
    //查询按钮
    queryBtn () {
      this.searchForm.PageNumber = 1;
      this.query();
    },
    //获取接口列表
    async getModuleData () {
      const res = await getList({
        PageNumber: 1,
        PageSize: 9999,
        ParentId: null
      });
      this.tenantData = res.Response.items;
    },
    async lazyLoad (node, resolve) {
      let {
        level
      } = node;
      let params = node.value
      getList({
        ParentId: params,
        PageNumber: 1,
        PageSize: 9999,
      }).then(res => { //接口
        if (res && res.StatusCode == 200) {
          let data = [res.Response]
          if (level > 0) {
            data = res.Response.items
          }
          // if (level == 3) {
          //   data.forEach(item => {
          //     item.leaf = level >= 3
          //   });
          // }
          resolve(data);
        } else {
          this.$message.error('获取接口数据失败')
        }
      })
    },
    //重置
    resetBtn () {
      this.$refs["searchForm"].resetFields();
      this.query()
    },
    // 获取接口信息列表
    async query () {
      this.tableLoading = true;
      let res = await getList(this.searchForm)
      this.tableLoading = false;
      this.tableData = res.Response.items;
      this.total = res.Response.TotalCount;
    },
    // 删除
    delet (row) {
      this.$confirm("确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        roundButton:true,
      }).then(async () => {
        await deletes([row.ModuleId])
        this.$message.success('删除成功');
        this.queryBtn()
      });
    },
    // 新增接口
    add () {
      var param = {
        title: "新增接口",
        visible: true,
        opt: "add"
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 修改接口
    edit (row) {
      var param = {
        title: "修改接口",
        visible: true,
        opt: "edit",
        ModuleId: row.ModuleId
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
        this.tableHeight = availHeight - elPageClientHeight - 390;
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
