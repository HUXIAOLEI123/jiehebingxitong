<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" v-show="showSearch" label-width="80px" class="form_row">
        <el-row>
          <el-col :span="6">
            <el-form-item label="审核机构:" prop="OperatorOrganization">
              <el-cascader
                style="width: 100%"
                :options="tenantData"
                :props="propslist"
                v-model="form.OperatorOrganization"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名:" prop="Name">
              <el-input v-model="form.Name" placeholder="请输入姓名" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="证件号:" prop="IdcardNo">
              <el-input v-model="form.IdcardNo" placeholder="请输入证件号" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审核状态:" prop="AuditStatus">
              <el-select v-model="form.AuditStatus" placeholder="请选择审核状态">
                <el-option v-for="item in status" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
      </el-form>
      <template>
        <div class="tabbox">
          <!-- 表格区域 -->
          <vxe-table
            align="center"
            size="small"
            :height="tableHeight"
            stripe
            :data="tableDataDesc"
            show-overflow
            class="mytable-scrollbar"
          >
            <vxe-column field="Name" title="姓名" width="100" fixed="left">
				<template slot-scope="{ row }">
					<span>
						{{ row.Name | hideMiddle}}
					</span>
				</template>
			</vxe-column>
            <vxe-column field="SexName" title="性别" width="100"></vxe-column>
            <vxe-column field="Age" title="年龄" width="100"></vxe-column>
            <vxe-column field="IdcardNo" title="证件号" width="150">
				<template slot-scope="{ row }">
					<span>
						{{ row.IdcardNo | hideMiddlelong}}
					</span>
				</template>
			</vxe-column>
            <vxe-column field="Address" title="居住地址" width="150">
				<template slot-scope="{ row }">
					<span>
						{{ row.Address | hideMiddlelong}}
					</span>
				</template>
			</vxe-column>
            <vxe-column field="AuditStatus" title="审核状态" width="120">
              <template #default="{ row }">
                <el-tag type="warning" v-if="row.AuditStatus == 0">未审核</el-tag>
                <el-tag type="success" v-if="row.AuditStatus == 1">审核通过</el-tag>
                <el-tag type="danger" v-if="row.AuditStatus == 2">审核未通过</el-tag>
              </template>
            </vxe-column>
            <vxe-column field="FormerOrganizationName" title="申请机构" width="150"></vxe-column>
            <vxe-column field="FormerResponsibilityName" title="申请人员" width="150"></vxe-column>
            <vxe-column field="OperateTimeFirst" title="申请日期" width="150"></vxe-column>
            <vxe-column field="MoveOrganizationName" title="转入机构" width="150"></vxe-column>
            <vxe-column field="AuditTime" title="转出日期" width="150"></vxe-column>
            <vxe-column field="AuditUserName" title="审核人员" width="150"></vxe-column>
            <vxe-column field="AuditTime" title="审核日期" min-width="150"></vxe-column>
            <!-- 字段不显示 -->
            <vxe-column title="操作" width="150" fixed="right">
              <template #default="{ row }">
                <el-link type="danger" @click="handlerEdit('audit', row)" v-if="row.AuditStatus == '0'">待审核</el-link>
                <el-link type="primary" @click="handlerEdit('out', row)" v-else>查看详情</el-link>
              </template>
            </vxe-column>
          </vxe-table>
          <div class="app-pagination">
            <el-pagination
              ref="elPage"
              :layout="paginationLayout"
              :total="totalDesc"
              :current-page="paParams2.PageNumber"
              :page-size="paParams2.PageSize"
              @current-change="handlerPageChange2"
              @size-change="handlerPageSizeChange2"
            ></el-pagination>
          </div>
        </div>
      </template>
      <!-- 弹窗子组件 -->
      <InEdit ref="inEdit"></InEdit>
      <OutEdit ref="outEdit"></OutEdit>
      <ShEdit ref="shEdit" @submit="applyfunlicationtransfertistDesc"></ShEdit>
    </div>
  </div>
</template>
<script>
// 弹窗子组件
import InEdit from './components/inEdit.vue'
import OutEdit from './components/outEdit.vue'
import ShEdit from './components/ShEdit .vue'
import {
  getOrganizationList,
  getorgcascader,
  getuserDrop
} from '@/api/organizationManagement.js'
import {
  auditlicationtransfertist,
  createauditinformation
} from '@/api/FileTransfer.js'
// 级联选择器
import MyCascader from "@/components/MyCascader"
import {
  usedictionarydetails
} from '@/api/dict.js'
export default {
  name: 'TransferAuditManagement',
  components: {
    InEdit,
    OutEdit,
    ShEdit,
    MyCascader
  },
  data () {
    return {
      //表单绑定数据
      form: {
        SelectOnly: false,
        OperatorOrganization: this.$utilsFun.getUserInfo().authOrgId,
        // RegionCode: this.$utilsFun.getUserInfo().authRegionCode,
        TransferType: '2',
      },
      activeName: 'first',
      // 字典的数据

      props: {
        emitPath: false,
        label: "RegionName",
        children: "Children",
        value: "RegionCode",
        multiple: false,
        checkStrictly: true,
        lazy: true,
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
      showSearch: true,
      total: 0,
      totalDesc: 0,
      paParams: {
        PageNumber: 1,
        PageSize: 10,
      },
      paParams2: {
        PageNumber: 1,
        PageSize: 10,
      },
      tenantData: [{
        OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
        OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
        Children: []
      }],
      tableData: [],
      tableDataDesc: [],
      status: '',
      tableHeight: "300", //table高度
    }
  },
  created () {
    // this.auditfunlicationtransfertist();
    this.applyfunlicationtransfertistDesc();
    // 字典使用
    this.funusedictionarydetails()
    // this.getorganizationlist()
  },
  onshow () {
    // this.auditfunlicationtransfertist();
    this.applyfunlicationtransfertistDesc();
  },
  mounted () {
    this.initTableHeight();
  },
  methods: {
    handleClick () {
      // this.auditfunlicationtransfertist()
      this.applyfunlicationtransfertistDesc();
    },
    //计算table的高度
    initTableHeight () {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        this.tableHeight =
          availHeight - elPageClientHeight - 400;
      });
    },
    // 获取列表
    async auditfunlicationtransfertist (params) {
      const res = await auditlicationtransfertist({
        ...params,
        ...this.paParams,
        ...this.form
      })
      let {
        StatusCode,
        Message,
        Response
      } = res;
      if (!Response || StatusCode != 200) {
        return this.$baseMessage(
          Message || '数据获取失败', 'error'
        )
      }
      this.tableData = Response.items;
      this.total = Response.TotalCount
    },
    //获取机构列表
    async getorganizationlist () {
      this.form.OperatorOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await getorgcascader(this.form.OperatorOrganization);
      // for(let i in res.Response){
      // 	res.Response[i]['label']=res.Response[i].OrganizationName
      // 	res.Response[i]['value']=res.Response[i].OrganizationId
      // }
      this.tenantData = res.Response;
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
    // 获取导入列表
    async applyfunlicationtransfertistDesc (params) {
      const res = await auditlicationtransfertist({
        ...params,
        ...this.paParams,
        ...this.form,
      })
      let {
        StatusCode,
        Message,
        Response
      } = res;
      if (!Response || StatusCode != 200) {
        return this.$baseMessage(
          Message || '数据获取失败', 'error'
        )
      }
      this.tableDataDesc = res.Response.items;
      this.totalDesc = res.Response.TotalCount;
    },
    // 字典
    async funusedictionarydetails (params) {
      const res = await usedictionarydetails({
        CategoryCode: ['A0012']
      })
      this.status = res.Response.items
    },
    // 详情弹窗
    handlerEdit (flag, data) {
      if (flag == 'out') {
        this.$refs.outEdit.show(flag, data)
      } else if (flag == 'in') {
        this.$refs.inEdit.show(flag, data)
      } else if (flag == 'audit') {
        this.$refs.shEdit.show(flag, data)
      }
    },


    // 审核确定
    async shEdit (flag, data) {
      const res = await createauditinformation(data.FileTransferId, data.AuditStatus, data.AuditReason)
      let {
        StatusCode,
        Message,
        Response
      } = res;
      if (StatusCode != 200) {
        return this.$baseMessage(
          Message || '数据获取失败', 'error'
        )
      }
      this.$baseMessage('审核提交成功', "success")
    },

    handleClick (tab, event) {
      if (tab.index == '0') {
        this.form.TransferType = '1'
        this.auditfunlicationtransfertist();
      } else {
        this.form.TransferType = '2'
        this.applyfunlicationtransfertistDesc();
      }
    },

    // 查询搜索
    handleQuery () {
      // this.auditfunlicationtransfertist();
      this.applyfunlicationtransfertistDesc();
    },
    async resetQuery () {
      // this.form.Name = '';
      // this.form.IdcardNo = '';
      // this.form.FileNumber = '';
      // this.form.SelectOnly = false;
      // this.form.AuditStatus = '';
      // this.form.TransferType='1';
      // this.form.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
      // this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      // const res = await applylicationtransfertist(this.form)
      // this.tableData = res.Response.items;
      // this.total = res.Response.TotalCount


      this.form.Name = '';
      this.form.IdcardNo = '';
      this.form.FileNumber = '';
      this.form.SelectOnly = false;
      this.form.AuditStatus = '';
      this.form.TransferType = '2';
      // this.formdata.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const resdata = await auditlicationtransfertist(this.form)
      this.tableDataDesc = resdata.Response.items;
      this.totalDesc = resdata.Response.TotalCount;
      this.$baseMessage('已重置', "success")
    },


    // 分页当前页变化回调
    handlerPageChange (pageNum) {
      this.paParams.pageNum = pageNum;
      this.auditfunlicationtransfertist();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange (pageSize) {
      this.paParams.pageSize = pageSize;
      this.auditfunlicationtransfertist();
    },

    // 分页当前页变化回调
    handlerPageChange2 (pageNum) {
      this.paParams2.pageNum = pageNum;
      this.applyfunlicationtransfertistDesc();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange2 (pageSize) {
      this.paParams2.pageSize = pageSize;
      this.applyfunlicationtransfertistDesc();
    },

  },
}
</script>

<style lang="scss" scoped>
// .search {
// 	margin-left: 70px;
// }
.form_row {
  .el-form-item {
    display: flex;

    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;

      .el-select,
      .el-date-editor {
        width: 100%;
      }
    }

    .el-input-number {
      width: 100%;

      .el-input__inner {
        text-align: left;
      }
    }
  }
}

.tabbox {
  width: 100%;
}
</style>
