<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="searchForm" :model="searchForm" label-width="120px" size="small" inline class="form_row">
      <el-row :gutter="15">
        <el-col :span="1.5">
          <el-button class="addBtn Btn" round type="primary" @click="add({ moduleId: '0' })">
            <img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
            新增
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- table -->
    <vxe-table
      :data="tableData"
      ref="multipleTable"
      tooltip-effect="light"
      border
      class="mytable-scrollbar"
      resizable
      :tree-config="{ children: 'children', expandAll: true }"
      :height="tableHeight"
      style="margin-top: 10px"
      v-loading="tableLoading"
    >
      <vxe-table-column field="PermissionName" title="菜单" width="200" tree-node />
      <vxe-table-column field="IsButton" title="是否按钮" width="80" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.IsButton == true">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </vxe-table-column>
      <vxe-table-column field="IsHide" title="是否隐藏" width="80" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.IsHide == true">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Enabled" title="是否激活" width="80" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.Enabled == true">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </vxe-table-column>
      <vxe-table-column field="Description" title="描述" />
      <vxe-table-column title="操作" fixed="right" align="center" width="180">
        <template slot-scope="scope">
          <div class="flex_center">
            <el-link type="primary" @click="add(scope.row)">添加下级</el-link>
            <div class="Divider"></div>
            <el-link type="primary" @click="edit(scope.row)">修改</el-link>
            <div class="Divider"></div>
            <el-link type="danger" v-if="scope.row.ParentId !== 0" @click="delet(scope.row)">删除</el-link>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 新增编辑接口信息 -->
    <pageEdit ref="pageEdit" @submit="query" />
  </div>
</template>
<script>
import pageEdit from "./components/pageEdit";
import {
  getList,
  deletes
} from "@/api/systemManage/OrganizationPermission";
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
        PageSize: 9999
      },
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
    // 获取菜单信息列表
    async query () {
      this.tableLoading = true;
      let res = await getList(this.searchForm)
      this.tableLoading = false;
      this.tableData = this.convert(null, res.Response.items);
    },
    //递归
    convert (pid, arr) {
      let resultarr = arr.filter(p => p.ParentId == pid);
      if (resultarr.length > 0) {
        resultarr.forEach((item) => {
          item.children = [];
          item.children = this.convert(item.PermissionId, arr)
        });
      }
      return resultarr;
    },
    // 删除
    delet (row) {
      this.$confirm("确认要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
        roundButton:true,
      }).then(async () => {
        await deletes([row.PermissionId])
        this.$message.success('删除成功');
        this.query()
      });
    },
    // 新增菜单
    add (row = {}) {
      var param = {
        title: "新增菜单",
        visible: true,
        opt: "add",
        ParentId: row.PermissionId || ''
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 修改菜单
    edit (row) {
      var param = {
        title: "修改菜单",
        visible: true,
        opt: "edit",
        PermissionId: row.PermissionId
      };
      this.$refs.pageEdit.getDetail(param);
    },
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        this.tableHeight = availHeight - 320;
      });
    },

  }
};
</script>
