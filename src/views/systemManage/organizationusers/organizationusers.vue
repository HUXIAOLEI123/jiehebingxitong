<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="searchForm" :model="searchForm" label-width="90px" size="small" inline class="form_row">
      <el-row>
        <el-col :span="5">
          <el-form-item prop="OrganizationId" label="所属机构:">
            <el-cascader
              style="width: 100%"
              :options="tenantData"
              :props="propslist"
              v-model="searchForm.OrganizationId"
              :show-all-levels="false"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="RealName" label="姓名:">
            <el-input v-model="searchForm.RealName" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="ContactPhone" label="联系电话:">
            <el-input v-model="searchForm.ContactPhone" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="仅本机构：" prop="SelectOnly">
            <el-checkbox v-model="searchForm.SelectOnly"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="3">
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
        <el-row :gutter="15" style="margin-left: 5px">
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
      <vxe-table-column field="RealName" title="姓名" width="80" />
      <vxe-table-column field="Identifier" title="登录账号" width="100" />
      <vxe-table-column field="ContactPhone" title="电话号码" width="100" />
      <vxe-table-column field="Age" title="年龄" width="80" />
      <vxe-table-column field="SexName" title="性别" width="80" />
      <vxe-column field="Status" title="状态" width="80">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.Status">正常</el-tag>
          <el-tag type="danger" v-if="!row.Status">停用</el-tag>
        </template>
      </vxe-column>
      <vxe-table-column field="OrganizationName" title="所属机构" width="200" />
      <vxe-table-column field="Address" title="住址" />
      <vxe-table-column field="Remarks" title="备注" />
      <vxe-column title="操作" width="300" fixed="right">
        <template #default="{ row }">
          <div class="flex_center">
            <el-link type="primary" @click="edit(row)">修改</el-link>
            <div class="Divider"></div>
            <el-link type="primary" @click="editPassword(row)">修改密码</el-link>
            <div class="Divider"></div>
            <el-link type="danger" @click="resetpassword(row)">密码重置</el-link>
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
    <pageEditPassWord ref="pageEditPassWord" @submit="queryBtn" />
  </div>
</template>
<script>
import pageEdit from "./components/pageEdit";
import pageEditPassWord from "./components/pageEditPassWord";
import {
  getList,
  cascader,
} from "@/api/systemManage/Organization";
import {
  getOrganizationusersList,
  deletes,
  editResetpassword
} from "@/api/systemManage/OrganizationUser";
export default {
  name: "medicalSettle",
  components: {
    pageEdit,
    pageEditPassWord,
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
        OrganizationId:this.$utilsFun.getUserInfo().authOrgId
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
    // 获取用户信息列表
    async query () {
      this.tableLoading = true;
      let res = await getOrganizationusersList(this.searchForm)
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
        await deletes([row.UserId])
        this.$message.success('删除成功');
        this.queryBtn()
      });
    },
    // 修改密码
    editPassword (row) {
      var param = {
        title: "修改【" + row.RealName + "】密码",
        visible: true,
        opt: "edit",
        userId: row.UserId,
      };
      this.$refs.pageEditPassWord.getDetail(param);
    },
    // 重置密码
    resetpassword (row) {
      this.$baseConfirm("确定要重置【" + row.RealName + "】的密码吗？", null, async () => {
        let res = await editResetpassword(row.UserId + '')
        this.$baseMessage(res.Response, "success")
      })
    },
    // 新增用户
    add () {
      var param = {
        title: "新增用户",
        visible: true,
        opt: "add"
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 修改用户
    edit (row) {
      var param = {
        title: "修改用户",
        visible: true,
        opt: "edit",
        UserId: row.UserId,
        OrganizationId: row.OrganizationId
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 用户详情
    detail (row) {
      var param = {
        title: "用户详情",
        visible: true,
        opt: "detail",
        row: row,
        UserId: row.UserId,
      };
      this.$refs.pageEditPassWord.getDetail(param);
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
        this.tableHeight = availHeight - elPageClientHeight - 375;
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
