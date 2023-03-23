<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" v-show="showSearch" label-width="100px" class="form_row">
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请机构:" prop="AdminOrganization">
              <el-cascader
                style="width: 100%"
                :options="tenantData"
                :props="propslist"
                v-model="form.AdminOrganization"
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
            <el-form-item label="证件号:" prop="CardNo">
              <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="药盒序列号:" prop="BoxSN">
              <el-input v-model="form.BoxSN" placeholder="请输入药盒序列号" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <el-form-item label="仅本机构" prop="SelectOnly">
              <el-checkbox v-model="form.SelectOnly"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5">
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
          <!-- 转出-->
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
            
            <vxe-column field="CardNo" title="证件号" width="150">
            	<template slot-scope="{ row }">
            		<span>
            			{{ row.CardNo | hideMiddlelong}}
            		</span>
            	</template>
            </vxe-column>
           <vxe-column field="AdminOrganizationName" title="管理机构" width="150"></vxe-column>
            <vxe-column field="BoxSN" title="药盒序列号" width="120"></vxe-column>
            <vxe-column field="PushTime" title="推送时间"></vxe-column>
			<vxe-column field="MedicineTime" title="服药时间"></vxe-column>
            <!-- <vxe-column title="操作" width="100" fixed="right">
              <template #default="{ row }">
                <el-link type="primary" @click="handlerEdit('out', row)">查看详情</el-link>
              </template>
            </vxe-column> -->
          </vxe-table>
          <!-- 分页器 -->
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

        <!-- </el-tab-pane> -->

        <!-- </el-tabs> -->
      </template>

      <!-- 弹窗子组件 -->
      <!-- <OutEdit ref="outEdit"></OutEdit>
      <InEdit ref="inEdit"></InEdit> -->
    </div>
  </div>
</template>
<script>
// 弹窗子组件
// import OutEdit from './components/outEdit.vue'
// import InEdit from './components/inEdit.vue'
import MyCascader from "@/components/MyCascader"
import {
  applylicationtransfertist
} from '@/api/FileTransfer.js'
import {
  electronicboxpushrecordlist
} from '@/api/electronicboxpushrecord.js'
import {
  getOrganizationList,
  getorgcascader,
  getuserDrop
} from '@/api/organizationManagement.js'
import {
  usedictionarydetails
} from '@/api/dict.js'
export default {
  name: 'PatientRecords',
  components: {
    // OutEdit,
    // InEdit,
    MyCascader
  },
  data () {
    return {
      // 表单绑定数据
      form: {
        SelectOnly: false,
        AdminOrganization: this.$utilsFun.getUserInfo().authOrgId,
        // RegionCode: this.$utilsFun.getUserInfo().authRegionCode,
      },
      activeName: 'first',
      options: [{
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '777'
      },
      ],
      A0012: [],
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
      tenantData: [{
        OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
        OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
        Children: []
      }],
      total: 2,
      totalDesc: 0,
      paParams: {
        PageNumber: 1,
        PageSize: 10,
      },
      paParams2: {
        PageNumber: 1,
        PageSize: 10,
      },
      tableData: [],
      tableDataDesc: [],
      tableHeight: "300", //table高度

    }
  },



  async created () {
    // await this.applyfunlicationtransfertist();
    await this.applyfunlicationtransfertistDesc();
    await this.funusedictionarydetails()
    // await this.getorganizationlist()
  },
  async onshow () {
    // await this.applyfunlicationtransfertist();
    await this.applyfunlicationtransfertistDesc();
  },
  mounted () {
    this.initTableHeight();
  },
  methods: {
    // 字典数据请求
    async funusedictionarydetails (params) {
      const res = await usedictionarydetails({
        CategoryCode: 'A0012'
      })
      let {
        StatusCode,
        Message
      } = res
      if (!res || StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error')
      }

      this.A0012 = res.Response.items

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
    //获取机构列表
    async getorganizationlist () {
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await getorgcascader(this.form.AdminOrganization);
      // for(let i in res.Response){
      // 	res.Response[i]['label']=res.Response[i].OrganizationName
      // 	res.Response[i]['value']=res.Response[i].OrganizationId
      // }
      this.tenantData = res.Response;
    },
    // 获取导出列表
    async applyfunlicationtransfertist (params) {
      const res = await applylicationtransfertist({
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
      this.tableData = Response.items;
      this.total = Response.TotalCount
    },
    // 获取导入列表
    async applyfunlicationtransfertistDesc (params) {
      const res = await electronicboxpushrecordlist({
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

    handleClick (tab, event) { //1转入 2转出
      if (tab.index == '0') {
        this.form.TransferType = '1'
        this.applyfunlicationtransfertist();
      } else {
        this.form.TransferType = '2'
        this.applyfunlicationtransfertistDesc();
      }

    },

    // 弹窗
    handlerEdit (flag, data) {
      if (flag == 'out') {
        this.$refs.outEdit.show(flag, data)
      } else if (flag == 'in') {
        this.$refs.inEdit.show(flag, data)
      }

      // 选中的表格（行）

    },
    handleQuery () {
      // this.applyfunlicationtransfertist();
      this.applyfunlicationtransfertistDesc();
    },
    async resetQuery () {
      // this.form.Name = '';
      //             this.form.CardNo = '';
      // this.form.FileNumber = '';
      // this.form.SelectOnly = false;
      // this.form.AuditStatus = '';
      // this.form.TransferType='2';
      // // this.form.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
      // this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      // const res = await applylicationtransfertist(this.form)
      // this.tableData = res.Response.items;
      // this.total = res.Response.TotalCount


      this.form.Name = '';
      this.form.CardNo = '';
      this.form.FileNumber = '';
      this.form.SelectOnly = false;
      this.form.AuditStatus = '';
	  this.form.BoxSN = '';
      // this.formdata.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const resdata = await electronicboxpushrecordlist(this.form)
      this.tableDataDesc = resdata.Response.items;
      this.totalDesc = resdata.Response.TotalCount;
      this.$baseMessage('已重置', "success")
    },

    // 分页当前页变化回调
    handlerPageChange (PageNumber) {
      this.paParams.PageNumber = PageNumber;
      this.applyfunlicationtransfertist();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange (PageSize) {
      this.paParams.PageSize = PageSize;
      this.applyfunlicationtransfertist();
    },

    handlerPageChange2 (PageNumber) {
      this.paParams2.PageNumber = PageNumber;
      this.applyfunlicationtransfertistDesc();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange2 (PageSize) {
      this.paParams2.PageSize = PageSize;
      this.applyfunlicationtransfertistDesc();
    },

  },
}
</script>

<style lang="scss" scoped>
// .el-row {
//   margin-bottom: 20px;
// }

// .search {
//   margin-left: 70px;
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
