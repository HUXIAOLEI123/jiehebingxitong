<template>
  <div class="box">
    <!-- 搜索 -->
    <el-form ref="form" :model="form" label-width="80px" size="small" inline class="form_row">
      <el-row>
        <el-col :span="6">
          <el-form-item label="管理机构:" prop="AdminOrganization">
            <el-cascader
              style="width: 100%"
              :options="tenantData"
              :props="propslist"
              v-model="form.AdminOrganization"
              :show-all-levels="false"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名:" prop="Name">
            <el-input v-model="form.Name" placeholder="请输入姓名" clearable @keyup.enter.native="query" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="证件号:" prop="CardNo">
            <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable @keyup.enter.native="query" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话号码:" prop="Phone">
            <el-input v-model="form.Phone" placeholder="请输入电话号码" clearable @keyup.enter.native="query" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-form-item label="仅本机构" prop="SelectOnly">
            <el-checkbox v-model="form.SelectOnly"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <!-- 表单搜索重置 -->
            <!-- <div class="search">
              <el-button class="searchBtn Btn" type="primary" round @click="query">
                <i class="el-icon-search searchBtnicon"></i>
                搜索
              </el-button>
              <el-button class="ResetBtn" round @click="resetBtn">
                <i class="el-icon-refresh Btnicon"></i>
                重置
              </el-button>
            </div> -->
			<div class="searchbox">
				<div class="searchBtn" @click="query">
					<img class="Btnicon" src="@/assets/images/searchicon2.png" alt="">
					查询
				</div>
				<div class="ResetBtn" style="margin-left: 10px;" @click="resetBtn">
					<img class="Btnicon" src="@/assets/images/reseticon.svg" alt="">
					重置
				</div>
			</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
    >
      <vxe-table-column field="Name" title="姓名" width="100" align="center" />
      <vxe-table-column field="Identifier" title="登录账号" width="180" align="center" />
      <vxe-column field="CardNo" title="证件号" width="180" align="center">
		  <template slot-scope="{ row }">
		  	<span>
		  		{{ row.CardNo | hideMiddlelong}}
		  	</span>
		  </template>
	  </vxe-column>
      <vxe-column field="Phone" title="电话号码" width="120" align="center">
		  <template slot-scope="{ row }">
		  	<span>
		  		{{ row.Phone | hideMiddlelong}}
		  	</span>
		  </template>
	  </vxe-column>
      <vxe-column field="Enabled" title="状态" width="170" align="center">
        <template #default="{ row }">
          <!-- <el-link type="primary" v-if="row.Enabled == true">正常</el-link>
          <el-link type="info" v-if="row.Enabled == false">停用</el-link> -->
          <el-switch v-model="row.Enabled" active-text="激活" @change="userEnabled($event, row)" inactive-text="停用"></el-switch>
        </template>
      </vxe-column>
      <vxe-table-column field="Remarks" title="备注" />
      <vxe-table-column title="操作" fixed="right" align="center" width="180">
        <template #default="{ row }">
          <div class="flex_center">
            <el-link type="primary" @click="editPassword(row)">修改密码</el-link>
            <div class="Divider"></div>
            <el-link type="danger" @click="resetpassword(row)">密码重置</el-link>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 分页器 -->
    <div class="app-pagination">
      <el-pagination
        ref="elPage"
        :layout="paginationLayout"
        :current-page="form.PageNumber"
        :page-size="form.PageSize"
        :total="form.TotalCount"
        @current-change="handlerPageChange"
        @size-change="handlerPageSizeChange"
      ></el-pagination>
    </div>
    <!-- 修改密码 -->
    <pageEdit ref="pageEdit" @submit="query" />
  </div>
</template>
<script>
import pageEdit from "./components/pageEdit";
import { getList, resetpassword, patientusersEnabled } from '@/api/systemManage/PatientUser'
import { getOrganizationList, getorgcascader } from '@/api/organizationManagement.js'

export default {
  name: "medicalSettle",
  components: { pageEdit },
  data () {
    return {
      tableData: [],
      tableHeight: "300", //table高度
      tableData: [],
      tenantData: [
		  {
		    OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
		    OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
		    Children: []
		  }
	  ], //机构数组
      form: {
        AdminOrganization: '360111021',
        Phone: '',
        CardNo: '',
        Name: '',
        SelectOnly: false,
        PageNumber: 1,
        PageSize: 10,
        TotalCount: 0
      },
      propslist: {
        value: "OrganizationId",
        label: "OrganizationName",
        children: "Children",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad
      },
    };
  },
  mounted () {
    this.initTableHeight();

  },
  watch: {},
  created () {
    this.form.AdminOrganization = (
      JSON.parse(localStorage.getItem("userInfo")) || {}
    ).authOrgId;
    this.query();
    // this.getorganizationlist()
  },
  methods: {
    //重置
    resetBtn () {
      this.$refs["form"].resetFields();
      this.query()
    },
    async lazyLoad (node, resolve) {
      let res = await getOrganizationList({
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
    // 分页当前页变化回调
    handlerPageChange (PageNumber) {
      this.form.PageNumber = PageNumber;
      this.query()
    },
    // 分页每页条数变化回调
    handlerPageSizeChange (PageSize) {
      this.form.PageSize = PageSize;
      this.query()
    },
    // 获取菜单信息列表
    async query () {
      var searchParam = this.form;
      let res = await getList(searchParam)
      this.tableData = res.Response.items;
      this.form.TotalCount = res.Response.TotalCount
    },
    //  账号停用设置
    async userEnabled (e, row) {
      await patientusersEnabled({ patientUserId: row.PatientUserId, flag: e })
      this.$baseMessage('操作成功', "success")
      this.query()
    },
    //获取机构列表
    async getorganizationlist () {
      const res = await getorgcascader(this.$utilsFun.getUserInfo().authOrgId);
      this.tenantData = res.Response;
    },
    // 修改密码
    editPassword (row) {
      var param = {
        title: "修改【" + row.Name + "】密码",
        visible: true,
        patientUserId: row.PatientUserId,
      };
      this.$refs.pageEdit.getDetail(param);
    },
    // 重置密码
    resetpassword (row) {
      this.$baseConfirm("确定要重置【" + row.Name + "】的密码吗？", null, async () => {
        let res = await resetpassword(row.PatientUserId)
        this.$baseMessage(res.Response, "success")
      }
      )
    },
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 410;
      });
    },
  }
};
</script>