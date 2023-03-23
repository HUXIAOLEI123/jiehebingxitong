<template>
  <el-dialog
    :title="formConfig.title"
    :visible.sync="formConfig.visible"
    :width="formConfig.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="10vh"
  >
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ formConfig.title }}</span>
      <div class="button-right">
        <span class="title-close" @click="handleClose"></span>
      </div>
    </div>
    <el-form :model="formData" :rules="formRules" ref="refForm" label-width="130px" class="form_row">
      <div class="el-dialog-div" style="height: 60vh">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级机构:" prop="Org_OrganizationId">
              <el-cascader
                style="width: 100%"
                :options="tenantData"
                :props="propslist"
                v-model="formData.Org_OrganizationId"
                :show-all-levels="false"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属区域:" prop="RegionCode">
              <MyCascader v-model="formData.RegionCode" :props="props" clearable></MyCascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称:" prop="OrganizationName">
              <el-input v-model="formData.OrganizationName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构编码:" prop="OrganizationId">
              <el-input v-model="formData.OrganizationId" disabled placeholder="自动生成"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构简称:" prop="Abbreviation">
              <el-input v-model="formData.Abbreviation" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构地址:" prop="Address">
              <el-input v-model="formData.Address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="督导单位:" prop="IsSupervisionUnit">
              <el-select v-model="formData.IsSupervisionUnit" placeholder="请选择督导单位" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="定点医疗机构:" prop="IsAppoinOrganization">
              <el-select v-model="formData.IsAppoinOrganization" placeholder="请选择定点医疗机构" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="疾控中心:" prop="IsCDC">
              <el-select v-model="formData.IsCDC" placeholder="请选择疾控中心" clearable>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构级别:" prop="OrganizationClass">
              <el-select v-model="formData.OrganizationClass" placeholder="请选择机构级别" clearable>
                <el-option v-for="item in A0034" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型:" prop="OrganizationType">
              <el-select v-model="formData.OrganizationType" placeholder="请选择机构类型" clearable>
                <el-option v-for="item in A0036" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人:" prop="Contacts">
              <el-input v-model="formData.Contacts" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号:" prop="Phone">
              <el-input v-model="formData.Phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序:" prop="Sort">
              <el-input v-model="formData.Sort" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注:" prop="Remarks">
              <el-input v-model="formData.Remarks" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button class="cancelbtn" @click="submitandContinue">完成并下一个</el-button> -->
      <el-button class="cancelbtn" @click="handleClose">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getList,
  cascader,
  addOrganization,
  organizationDetail,
  editorganization
} from "@/api/systemManage/Organization";
import {
  usedictionarydetails
} from '@/api/dict.js'
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: "",
        visible: false,
        width: "70%",
        opt: "",
        rederView: true
      },
      Continue: false,
      tenantData: [], //机构数组
      propslist: {
        value: "OrganizationId",
        label: "OrganizationName",
        children: "Children",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      props: {
        emitPath: false,
        label: "RegionName",
        children: "Children",
        value: "RegionCode",
        multiple: false,
        checkStrictly: true,
        lazy: true,
      },
      // 表单数据
      formData: {
        Sort: "0",
      },
      formDataCopy: {},
      // 验证规则
      formRules: {},
      A0036: [],
      A0034: [],
    };
  },
  created () {
    this.funusedictionarydetails();
    this.setformRules()
  },
  methods: {
    //获取机构列表
    async getTenantData (val) {
      const res = await cascader(val);
      this.tenantData = [...res.Response];
    },
    // 字典数据请求
    async funusedictionarydetails () {
      const res = await usedictionarydetails({
        CategoryCode: ['A0036', 'A0034']
      })
      this.A0034 = res.Response.items.filter((i) => i.CategoryCode == 'A0034')
      this.A0036 = res.Response.items.filter((i) => i.CategoryCode == 'A0036')
    },
    setformRules () {
      let arr = [{
        trigger: 'change',
        message: "上级机构",
        key: "Org_OrganizationId"
      },
      {
        trigger: 'blur',
        message: "机构名称",
        key: "OrganizationName"
      },
      {
        trigger: 'blur',
        message: "所属区域",
        key: "RegionCode"
      },
      // {
      //   trigger: 'blur',
      //   message: "机构编码",
      //   key: "OrganizationId"
      // },
      {
        trigger: 'change',
        message: "是否是督导单位",
        key: "IsSupervisionUnit"
      },
      {
        trigger: 'change',
        message: "是否是定点医疗机构",
        key: "IsAppoinOrganization"
      },
      {
        trigger: 'change',
        message: "是否是疾控中心",
        key: "IsCDC"
      },
      {
        trigger: 'change',
        message: "机构级别",
        key: "OrganizationClass"
      },
      {
        trigger: 'change',
        message: "机构类型",
        key: "OrganizationType"
      },
      ]
      for (let item of arr) {
        let obj = {
          trigger: item.trigger,
          required: true,
        }
        if (item.trigger == 'blur') obj.message = item.message + '不能为空';
        if (item.trigger == 'change') obj.message = '请选择' + item.message;
        this.formRules[item.key] = obj
      }
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
    //关闭弹框
    handleClose () {
      this.$nextTick(() => {
        this.$refs['refForm'].resetFields();
      })
      this.formConfig.visible = false;
    },
    //完成并下一个
    submitandContinue () {
      this.Continue = true;
      this.submit()
    },
    // 提交
    submit () {
      let that = this;
      this.$refs.refForm.validate(async (valid) => {
        if (valid) {
          if (that.formConfig.opt == 'add') {
            await addOrganization(that.formData);
            this.$message.success("新增成功");
            if (that.Continue) {
              that.Continue = false;
            } else {
              that.$emit("submit")
              that.handleClose()
            }
          }
          if (that.formConfig.opt == 'edit') {
            let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy)
            await editorganization({
              organizationId: that.formData.OrganizationId,
              data: arr
            })
            this.$message.success("编辑成功");
            that.$emit("submit")
            that.handleClose()
          }
        }
      });
    },
    // 初始化弹框，获取详情
    async getDetail (param) {
      if (param.opt == "" || param.opt == null) {
        return this.$message.error("未知操作");
      }
      if (param.opt == 'add') {
        this.getTenantData(this.$utilsFun.getUserInfo().authOrgId)
        this.$nextTick(() => {
          this.formData = {
            ...{
              Org_OrganizationId: this.$utilsFun.getUserInfo().authOrgId
            }
          }
        })
      } else {
        this.getTenantData(param.Org_OrganizationId)
        this.$nextTick(() => {
          this.formData = {
            ...{
              Org_OrganizationId: param.Org_OrganizationId
            }
          }
        })
      }
      this.formConfig = Object.assign(this.formConfig, param);
      // 编辑之前先去查询详情
      if (param.opt === "edit") {
        let res = await organizationDetail(param.OrganizationId);
        this.$nextTick(() => {
          this.formData = {
            ...res.Response
          }
          this.formData.OrganizationClass = this.formData.OrganizationClass + '';
        })
        this.formDataCopy = res.Response
      }
    },
  },
};
</script>
