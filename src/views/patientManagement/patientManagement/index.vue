<template>
  <div class="box">
    <div class="room">
      <el-form :model="form" ref="form" size="small" :inline="true" label-width="80px" class="form_row">
        <el-row>
          <!-- 行政区划 -->
          <!-- <el-col :span="6">
            <el-form-item label="行政区划:" prop="RegionCode">
              <my-cascader v-model="form.RegionCode" :props="props" clearable></my-cascader>
            </el-form-item>
          </el-col> -->
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
            <el-form-item label="结案状态:" prop="IsClosed">
              <el-select clearable v-model="form.IsClosed" placeholder="请选择结案状态">
                <el-option label="已结案" value="true"></el-option>
                <el-option label="在案" value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="服药情况:" prop="IsTakeMedicine">
              <el-select v-model="form.IsTakeMedicine" placeholder="请选择服药情况" clearable>
                <el-option label="今日已服" :value="true"></el-option>
                <el-option label="今日未服" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否分配:" prop="IsBadReaction">
              <el-select v-model="form.IsPerfect" placeholder="请选择是否分配" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="管理机构:" prop="AdminOrganization">
              <el-cascader
                style="width: 100%"
                :options="tenantData"
                :props="propslist"
                v-model="form.AdminOrganization"
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
        <el-row>
          <el-row :gutter="15" style="margin-bottom: 20px">
            <el-col :span="1.5">
              <el-button class="addBtn Btn" type="primary" round @click="handlerEdit('add')">
                <img class="addBtnimg" src="../../../assets/images/addbtnicon.svg" alt="" />
                登记
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button class="exportBtn Btn" type="success" round @click="handlerEdit('export')">
                <img class="addBtnimg" src="../../../assets/images/exportbtnicon.svg" alt="" />
                导出
              </el-button>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div class="butt">
        <el-radio-group v-model="radio1" @change="hdRadioChange">
          <el-radio-button label="0">全部</el-radio-button>
          <el-radio-button label="1">确诊病例</el-radio-button>
          <el-radio-button label="2">临床诊断病例</el-radio-button>
          <el-radio-button label="3">潜伏感染者</el-radio-button>
        </el-radio-group>
      </div>
      <vxe-table
        align="center"
        size="small"
        :height="tableHeight"
        stripe
        :data="tableData"
        show-overflow
        @checkbox-change="checkboxChange"
        @checkbox-all="checkboxAll"
        class="mytable-scrollbar"
      >
        <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
        <vxe-column field="Name" title="姓名" width="100" fixed="left">
          <!-- <template slot-scope="{ row }">
						<span>
							{{ row.Name | hideMiddle}}
						</span>
					</template> -->
        </vxe-column>
        <vxe-column field="SexName" title="性别" width="70"></vxe-column>
        <vxe-column field="IsClosed" title="结案状态" width="100">
          <template #default="{ row }">
            <div>{{ row.IsClosed ? '已结案' : '在案' }}</div>
          </template>
        </vxe-column>
        <vxe-column field="Age" title="年龄" width="70"></vxe-column>
        <vxe-column field="CardNo" title="证件号" width="150">
          <template slot-scope="{ row }">
            <span>
              {{ row.CardNo | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="Phone" title="联系电话" width="150">
          <!-- <template slot-scope="{ row }">
            <span>
              {{ row.Phone | hideMiddlelong }}
            </span>
          </template> -->
        </vxe-column>
        <vxe-column field="Address" title="居住地址" min-width="150">
          <template slot-scope="{ row }">
            <span>
              {{ row.Address | hideMiddlelong }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="DiagnosisTypeName" title="结核病类型" width="120"></vxe-column>
        <vxe-column field="PatientTypeName" title="患者类型" width="120"></vxe-column>
        <vxe-column field="SputumName" title="病原学结果" width="100"></vxe-column>
        <vxe-column field="TreatmentPlanName" title="治疗方案" width="120"></vxe-column>
        <vxe-column field="DetectionPathwayName" title="病例类型" width="120"></vxe-column>
        <vxe-column field="IsTakeMedicine" title="服药情况" width="100">
          <template #default="{ row }">
            <el-tag type="primary" v-if="row.IsTakeMedicine == true">已服药</el-tag>
            <el-tag type="danger" v-if="row.IsTakeMedicine == false">未服药</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="IsPerfect" title="是否分配" width="100">
          <template #default="{ row }">
            <el-tag type="primary" v-if="row.IsPerfect == true">是</el-tag>
            <el-tag type="danger" v-if="row.IsPerfect == false">否</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构" width="100"></vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医师" width="100"></vxe-column>
        <vxe-column title="操作" width="180" fixed="right">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link :disabled="row.IsClosed ? true : false" type="primary" @click="handlerEdit('edit', row)">编辑</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="handlerEdit('details', row)">详情</el-link>
              <div class="Divider"></div>
              <el-link type="primary" @click="handlerEdit('jiean', row)">结案</el-link>
              <div class="Divider"></div>
              <el-link type="danger" @click="handlerEdit('delete', row)">删除</el-link>
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
          :current-page="paParams.PageNumber"
          :page-size="paParams.PageSize"
          @current-change="handlerPageChange"
          @size-change="handlerPageSizeChange"
        ></el-pagination>
      </div>
      <!-- 弹窗子组件 -->
      <Edit ref="edit" @edit="edit"></Edit>
      <NewEdit ref="newedit" @sumite="funtuberculosisdiagnosiss"></NewEdit>
      <CaseEdit ref="caseEdit" @sumite="funtuberculosisdiagnosiss"></CaseEdit>
    </div>
  </div>
</template>
<script>
import Edit from './components/Edit.vue';
import NewEdit from './components/newEdit.vue';
import CaseEdit from './components/CaseEdit.vue';
import { getOrganizationList, getorgcascader } from '@/api/organizationManagement.js';
import {
  tuberculosisdiagnosiss,
  addtuberculosisdiagnosiss,
  deletetuberculosisdiagnosiss,
  tuberculosisdiagnosissexcel,
} from '@/api/TuberculosisDiagnosis.js';
import { usedictionarydetails } from '@/api/dict.js';
import { addapplysettlement } from '@/api/PulmonaryClose.js';
export default {
  name: 'PatientRecords',
  components: { Edit, NewEdit, CaseEdit },
  data() {
    return {
      props: {
        emitPath: false,
        label: 'RegionName',
        children: 'Children',
        value: 'RegionCode',
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
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
      // 表单绑定数据
      form: {
        Sex: '',
        SelectOnly: false,
        AdminOrganization: this.$utilsFun.getUserInfo().authOrgId,
        DetectionPathway: '0',
        IsClosed: 'false',
      },
      radio1: '0',
      tableHeight: '300', //table高度
      total: 0,
      paParams: {
        PageNumber: 1,
        PageSize: 10,
      },
      tableData: [],
      // 选择项数组（选择的表格数据）
      checkRows: [],
      sex: '',
    };
  },
  async created() {
    this.form.DetectionPathway = '';
    await this.funusedictionarydetails();
    await this.funtuberculosisdiagnosiss();
  },
  async onshow() {
    this.form.DetectionPathway = '';
    await this.funtuberculosisdiagnosiss();
  },
  mounted() {
    this.initTableHeight();
  },
  methods: {
    // tab点击  DetectionPathway
    hdRadioChange(value) {
      if (value == '0') {
        this.form.DetectionPathway = '';
        this.funtuberculosisdiagnosiss();
      } else {
        this.form.DetectionPathway = value;
        this.funtuberculosisdiagnosiss();
      }
    },
    //计算table的高度
    initTableHeight() {
      this.$nextTick(() => {
        let availHeight = window.screen.availHeight; //页面可视化高度
        var elPageClientHeight = this.$refs.elPage.$el.clientHeight; // 分页器高度
        this.tableHeight = availHeight - elPageClientHeight - 500;
      });
    },
    // 性别字典
    async funusedictionarydetails(params) {
      const res = await usedictionarydetails({
        CategoryCode: 'A0003',
      });
      this.sex = res.Response.items;
    },
    // 列表
    async funtuberculosisdiagnosiss(params) {
      const res = await tuberculosisdiagnosiss({
        ...params,
        ...this.paParams,
        ...this.form,
      });
      let { StatusCode, Message, Response } = res;
      if (!Response || StatusCode != 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error');
      }
      this.tableData = Response.items;
      this.total = Response.TotalCount;
    },
    async getorganizationlist() {
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await getorgcascader(this.form.AdminOrganization);
      this.tenantData = res.Response;
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
    // 新增或修改按钮 弹窗显示
    handlerEdit(flag, data) {
      // 详情
      if (flag == 'details') {
        localStorage.setItem('Patientsdetails', JSON.stringify(data));
        localStorage.setItem('tablist', 1);
        this.$router.push({
          name: 'PatientManagementdetaltab',
          query: {
            diagnosisId: data.DiagnosisId,
          },
        });
      } else if (flag == 'add') {
        this.$refs.newedit.show(flag);
      } else if (flag == 'jiean') {
        this.$refs.caseEdit.show('case', data.DiagnosisId);
      } else if (flag == 'edit') {
        // 修改
        this.$refs.newedit.show(flag, data);
      } else if (flag == 'export') {
        // 导出
        this.$baseConfirm('确认导出所有数据？', null, async () => {
          const res = await tuberculosisdiagnosissexcel({
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
      } else if (flag == 'delete') {
        // 删除
        this.$baseConfirm(
          '确定要删除所选项吗？',
          '删除',
          async () => {
            let DiagnosisId = [];
            DiagnosisId.push(data.DiagnosisId);
            const res = await deletetuberculosisdiagnosiss(DiagnosisId);
            let { StatusCode, Message } = res;
            if (StatusCode != 200) {
              return this.$baseMessage(Message || '删除失败', 'error');
            }
            this.$baseMessage('删除成功', 'success');
            await this.funtuberculosisdiagnosiss();
          },
          null,
          'error'
        );
      } else if (flag == 'case') {
        this.$refs.caseEdit.show(flag, data);
      }
    },
    edit(flag, data) {
      if (flag == 'details') {
        this.$baseMessage('派发请求增加成功', 'success');
      } else if (flag == 'edit') {
        this.$baseMessage('派发请求修改成功', 'success');
      }
    },
    // 新建(???)
    async newedit(flag, data) {
      const res = await addtuberculosisdiagnosiss(data);
      let { StatusCode, Message, Response } = res;
      if (!Response || StatusCode !== 200) {
        return this.$baseMessage(Message || '添加失败', 'errror');
      }
      this.$baseMessage(Message, 'success');
    },
    //创建结案
    async caseEdit(flag, ids, data) {
      const res = await addapplysettlement({
        ...ids,
        ...data,
      });
      let { StatusCode, Message, Response } = res;
      if (!Response || StatusCode !== 200) {
        return this.$baseMessage(Message || '添加失败', 'errror');
      }
      this.$baseMessage(Message, 'success');
    },
    // 删除数据
    handlerDelete() {
      let len = this.checkRows.length;
      if (!len) {
        return this.$baseMessage('至少选择一项！', 'error');
      }
      this.$baseConfirm(
        '确定要删除全部选项吗？',
        null,
        // 将选中的数据添加属性删除
        async () => {
          let storeId = this.checkRows.map(item => {
            return item.storeId;
          });
          //派发请求
          let ids = storeId.toString();
          this.$baseMessage('删除成功', 'success');
        }
      );
    },
    // 查询搜索
    handleQuery() {
      this.funtuberculosisdiagnosiss();
    },
    async resetQuery() {
      this.form.Name = '';
      this.form.CardNo = '';
      this.form.IsTakeMedicine = '';
      this.form.Sex = '';
      this.form.SelectOnly = false;
      this.form.IsBadReaction = '';
      this.form.DetectionPathway = '';
      this.form.IsClosed = 'false';
      this.form.RegionCode = '';
      this.form.AdminOrganization = this.$utilsFun.getUserInfo().authOrgId;
      const res = await tuberculosisdiagnosiss({
        ...this.paParams,
        ...this.form,
      });
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
      this.funtuberculosisdiagnosiss();
    },
    // 分页每页条数变化回调
    handlerPageSizeChange(PageSize) {
      this.paParams.PageSize = PageSize;
      this.funtuberculosisdiagnosiss();
    },
  },
};
</script>
<style lang="scss" scoped>
.butt {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  margin-bottom: 20px;
}
</style>
