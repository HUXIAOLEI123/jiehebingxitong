<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" v-show="showSearch" label-width="80px" class="form_row">
        <el-row>
          <!-- 行政区划 -->
          <!-- <el-col :span="6">
            <el-form-item label="行政区划:" prop="RegionCode">
              <MyCascader v-model="form.RegionCode" :props="props" clearable></MyCascader>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="姓名:" prop="Name">
              <el-input v-model="form.Name" placeholder="请输入姓名" clearable @keyup.enter.native="managementist" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
						<el-form-item label="建档人员:" prop="UserAcc">
							<el-input v-model="form.UserAcc" placeholder="建档人员" clearable
								@keyup.enter.native="managementist" />
						</el-form-item>
					</el-col> -->
          <el-col :span="6">
            <el-form-item label="性别:" prop="Sex">
              <el-select v-model="form.Sex" placeholder="请选择性别" clearable>
                <el-option v-for="item in A0003" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建档日期:" prop="FileDate">
              <el-date-picker
                @change="changeFileDate"
                v-model="form.FileDate"
                type="daterange"
                align="center"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="证件号:" prop="CardNo">
              <el-input v-model="form.CardNo" placeholder="请输入证件号" clearable @keyup.enter.native="managementist" />
            </el-form-item>
          </el-col>
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
          <el-col :span="2">
            <el-form-item label="仅本机构" prop="SelectOnly">
              <el-checkbox v-model="form.SelectOnly"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <!-- 表单搜索重置 -->
              <div class="searchbox">
                <div class="searchBtn" @click="managementist">
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
      <!-- tab标题单选 -->
      <div class="butt">
        <!-- 按钮 -->
        <div>
          <el-row :gutter="15">
            <el-col :span="1.5">
              <el-button class="addBtn Btn" round type="primary" @click="handlerEdit('add')">
                <img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
                建档
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button class="exportBtn Btn" type="success" round @click="handlerEdit('export')">
                <img class="addBtnimg" src="../../../assets/images/exportbtnicon.svg" alt="" />
                导出
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button class="importBtn Btn" type="warning" round @click="handlerEdit('Import')">
                <img class="addBtnimg" src="../../../assets/images/importicon.svg" alt="" />
                导入
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 表格区域 -->
      <vxe-table
        align="center"
        size="small"
        :height="tableHeight"
        width="100%"
        stripe
        :data="tableData"
        show-overflow
        @checkbox-change="checkboxChange"
        @checkbox-all="checkboxAll"
        class="mytable-scrollbar"
      >
        <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
        <vxe-column field="Name" title="姓名" width="100" fixed="left">
          <template slot-scope="{ row }">
            <span>
              {{ row.Name }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="SexName" title="性别" width="70"></vxe-column>
        <vxe-column field="Age" title="年龄" width="70"></vxe-column>
        <vxe-column field="CardNo" title="证件号" width="200">
          <template slot-scope="{ row }">
            <span>
              {{ row.CardNo | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="Phone" title="联系电话" width="120">
          <template slot-scope="{ row }">
            <span>
              {{ row.Phone }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="Address" title="居住地址" min-width="300">
          <template slot-scope="{ row }">
            <span>
              {{ row.Address | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构" width="200"></vxe-column>
        <vxe-column field="UserAccName" title="建档人员" width="200"></vxe-column>
        <vxe-column field="FileDate" title="建档日期" width="200">
          <template slot-scope="{ row }">
            <span>
              {{ row.FileDate | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="200" fixed="right">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link type="primary" @click="handlerEdit('edit', row)">编辑</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="handlerEdit('details', row)">详情</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="rollOutEdit('out', row)">转移</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="handlerEdit('delete', row)">删除</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- 分页器 -->
      <div class="app-pagination">
        <el-pagination
          ref="elPage"
          :layout="paginationLayout"
          :current-page="paParams.PageNumber"
          :page-size="paParams.PageSize"
          :total="total"
          @current-change="handlerPageChange"
          @size-change="handlerPageSizeChange"
        ></el-pagination>
      </div>
      <!-- 弹窗子组件 -->
      <Edit ref="edit" @submit="managementist"></Edit>
      <OutEdit ref="outEdit" @outEdit="outEdit"></OutEdit>
      <CaseEdit ref="caseEdit" @caseEdit="caseEdit"></CaseEdit>
      <Impoortlist ref="impoortlist" @sumite="managementist"></Impoortlist>
      <XqEdit ref="XqEdit"></XqEdit>
      <CasesEdit ref="casesEdit" @casesEdit="casesEdit"></CasesEdit>
      <inEdit ref="inedit"></inEdit>
    </div>
  </div>
</template>
<script>
// 弹窗子组件
import Edit from './components/Edit.vue';
import inEdit from './components/inEdit.vue';
import XqEdit from './components/XqEdit.vue';
// 转出弹窗
import OutEdit from './components/OutEdit.vue';
// 结案
import CaseEdit from './components/CaseEdit.vue';
//导入
import Impoortlist from './components/Impoortlist.vue';
// 病例
import CasesEdit from './components/CasesEdit.vue';
// 级联选择器
import MyCascader from '@/components/MyCascader';
// 转出
import { addApplicationtransfertist } from '@/api/FileTransfer.js';
import { usedictionarydetails } from '@/api/dict.js';
// 结案
import { managementist, deletesmanagementist, exportmanagementist } from '@/api/Person';
import { getOrganizationList } from '@/api/organizationManagement.js';

export default {
  name: 'PatientRecords',
  components: {
    Edit,
    OutEdit,
    CaseEdit,
    CasesEdit,
    MyCascader,
    XqEdit,
    inEdit,
    Impoortlist,
  },
  data() {
    return {
      // 搜索表单绑定数据
      form: {
        // 登录缓存中获取的派发参数
        AdminOrganization: JSON.parse(localStorage.getItem('userInfo')).authOrgId,
        SelectOnly: false,
        RegionCode: this.$utilsFun.getUserInfo().authRegionCode,
        Name: '',
        UserAcc: '',
        CardNo: '',
      },
      props: {
        emitPath: false,
        label: 'RegionName',
        children: 'Children',
        value: 'RegionCode',
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      SourceArea: '',
      value1: '',
      showSearch: true,
      total: 0,
      tenantData: [
        {
          OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
          OrganizationName: this.$utilsFun.getUserInfo().authOrgName,
          Children: [],
        },
      ], //机构数组
      propslist: {
        value: 'OrganizationId',
        label: 'OrganizationName',
        children: 'Children',
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
      paParams: {
        PageNumber: 1,
        PageSize: 10,
      },
      tableData: [],
      // 选择项数组（选择的表格数据）
      checkRows: [],
      query: {
        SourceArea: (JSON.parse(localStorage.getItem('userInfo')) || {}).authRegionCode,
      },
      A0003: [],
      tableHeight: '300', //table高度
    };
  },

  async created() {
    await this.funusedictionarydetails();
  },
  mounted() {
    this.initTableHeight();
    this.managementist();
  },
  onshow() {
    this.managementist();
  },
  methods: {
    // 字典数据请求
    async funusedictionarydetails() {
      const res = await usedictionarydetails({
        CategoryCode: ['A0003'],
      });

      this.A0003 = res.Response.items;
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 450;
      });
    },
    ourceArea(val) {
      if (val) {
        this.query.SourceArea = val;
      } else {
        this.query.SourceArea = '';
      }
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
    // 获取列表
    async managementist(params) {
      const res = await managementist({
        ...params,
        ...this.paParams,
        ...this.form,
      });
      this.tableData = res.Response.items;
      this.total = res.Response.TotalCount;
    },

    // 新增或修改按钮 弹窗显示
    handlerEdit(flag, data) {
      // 详情
      if (flag == 'details') {
        this.$refs.XqEdit.show(flag, data);
      } else if (flag == 'add') {
        // 新增
        this.$refs.edit.show(flag, this.form.RegionCode);
      } else if (flag == 'edit') {
        // 修改
        this.$refs.edit.show(flag, data);
      } else if (flag == 'delete') {
        // 删除
        // this.$baseConfirm('确定要删除所选项吗？', null, async () => {
        //   let PersonId = data.PersonId;
        //   const res = await deletesmanagementist(PersonId);
        //   let {
        //     StatusCode,
        //     Message
        //   } = res;
        //   if (StatusCode != 200) {
        //     return this.$baseMessage(Message || '删除失败', 'error');
        //   }
        //   this.$baseMessage('删除成功', 'success');
        //   this.managementist();
        // });
        this.$confirm(`确定要删除选项数据吗`, '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          roundButton: true,
        }).then(async () => {
          let PersonId = data.PersonId;
          const res = await deletesmanagementist(PersonId);
          let { StatusCode, Message } = res;
          if (StatusCode != 200) {
            return this.$baseMessage(Message || '删除失败', 'error');
          }
          this.$baseMessage('删除成功', 'success');
          this.managementist();
        });
      } else if (flag == 'export') {
        // 导出
        this.$baseConfirm('确认导出所有数据？', null, async () => {
          const res = await exportmanagementist({
            ...this.form,
            ...this.paParams,
          });
          let { StatusCode, Message, Response } = res;
          // 拿到源地址参数

          let origin = process.env.VUE_APP_BASE;
          if (Message == undefined) {
            window.open(origin + res);
            this.$baseMessage('数据导出成功', 'success');
          } else {
            this.$baseMessage(`${Message}`, 'error');
          }
        });
      } else if (flag == 'Import') {
        this.$refs.impoortlist.show(flag, this.form.RegionCode);
      }
    },
    // 确认新增或修改(弹窗子组件的事件)
    edit() {
      this.managementist();
    },
    //建档时间选择
    changeFileDate(value) {
      this.form.FileDate = value;
    },
    //转出弹窗显示
    rollOutEdit(flag, data) {
      this.$refs.outEdit.show(flag, data);
      // this.$refs.inedit.show(flag, data)
    },
    //转出弹窗确认
    async outEdit(flag, data) {
      const res = await addApplicationtransfertist(data);
      let { StatusCode, Message, Response } = res;
      if (!Response || StatusCode != 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error');
      }
      this.$baseMessage('添加成功', 'success');
      this.managementist();
    },

    // 结案弹窗
    theCaseEdit(flag, data) {
      // this.$refs.caseEdit.show(flag, data)
    },
    // 确认
    caseEdit(flag, data) {
      // 派发请求
      this.$baseMessage('结案成功', 'success');
    },
    // 病例弹窗
    sickCaseEdit(flag, data) {
      this.$baseMessage('接口对接中,暂未开发', 'success');
      // this.$refs.casesEdit.show(flag, data)
    },
    // 确认
    casesEdit(flag, data) {
      // 派发请求
      this.$baseMessage('提交成功', 'success');
    },

    // 删除数据
    handlerDelete() {
      // this.$baseConfirm(
      //   '确定要删除选项数据吗？',
      //   error,
      //   // 将选中的数据添加属性删除
      //   async () => {
      //     let PersonId = [];
      //     this.checkRows.map(item => {
      //       PersonId.push(item.PersonId);
      //     });
      //     const res = await deletesmanagementist(PersonId);
      //     let {
      //       StatusCode,
      //       Message
      //     } = res;
      //     if (StatusCode != 200) {
      //       return this.$baseMessage(Message || '删除失败', 'error');
      //     }
      //     this.$baseMessage('删除成功', 'success');
      //     this.managementist();

      //     // this.$baseMessage('删除成功', "success")
      //   }
      // );
      this.$confirm(`确定要删除选项数据吗`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        roundButton: true,
      }).then(async () => {
        let PersonId = [];
        this.checkRows.map(item => {
          PersonId.push(item.PersonId);
        });
        const res = await deletesmanagementist(PersonId);
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(Message || '删除失败', 'error');
        }
        this.$baseMessage('删除成功', 'success');
        this.managementist();

        // this.$baseMessage('删除成功', "success")
      });
    },
    // 重置
    async resetQuery() {
      this.form.Name = '';
      this.form.UserAcc = '';
      this.form.Sex = '';
      this.form.FileDate = '';
      this.form.CardNo = '';
      this.form.SelectOnly = false;
      this.form.RegionCode = '';
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await managementist(this.form);
      this.tableData = res.Response.items;
      this.total = res.Response.TotalCount;
      this.$baseMessage('已重置', 'success');
    },

    // 复选框事件
    checkboxChange({ records }) {
      this.checkRows = records;
    },
    // 全选按钮事件
    checkboxAll({ records }) {
      this.checkRows = records;
    },

    // 分页当前页变化回调
    handlerPageChange(PageNumber) {
      this.paParams.PageNumber = PageNumber;
      this.managementist();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange(PageSize) {
      this.paParams.PageSize = PageSize;
      this.managementist();
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
