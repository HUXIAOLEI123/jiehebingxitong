<template>
  <el-dialog
    :title="formConfig.title"
    :visible.sync="formConfig.visible"
    :width="formConfig.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="20vh"
  >
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ formConfig.title }}</span>
      <div class="button-right">
        <span class="title-close" @click="handleClose"></span>
      </div>
    </div>
    <el-form :model="formData" :rules="formRules" ref="refForm" label-width="130px" class="form_row">
      <div class="el-dialog-div" style="height: 50vh">
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属机构:" prop="OrganizationId">
              <el-cascader
                v-if="isshow"
                ref="regionDom"
                key="bbigdd"
                style="width: 100%"
                filterable
                :options="tenantData"
                :props="propslist"
                @input.native="searchRegion"
                :before-filter="filterRegion"
                @visible-change="regionMenuChange"
                v-model="formData.OrganizationId"
                :show-all-levels="false"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名:" prop="RealName">
              <el-input v-model="formData.RealName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:" prop="ContactPhone">
              <el-input v-model="formData.ContactPhone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色:" prop="RoleIds">
              <el-select v-model="formData.RoleIds" multiple>
                <el-option v-for="item in RoleIdsData" :key="item.RoleId" :label="item.RoleName" :value="item.RoleId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="Sex">
              <el-select v-model="formData.Sex">
                <el-option v-for="item in A0003" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="formConfig.opt == 'add'">
            <el-form-item label="授权账户:" prop="Identifier">
              <el-input v-model="formData.Identifier" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="formConfig.opt == 'add'">
            <el-form-item label="账号密码:" prop="Credential">
              <el-input v-model="formData.Credential" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年龄:" prop="Age">
              <el-input v-model="formData.Age" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址:" prop="Address">
              <el-input v-model="formData.Address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="生日:" prop="Birth">
              <el-date-picker align="center" v-model="formData.Birth" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="状态:" prop="Status">
              <el-checkbox v-model="formData.Status"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" prop="Remark">
              <el-input v-model="formData.Remark" />
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
import { getList, cascader } from "@/api/systemManage/Organization";
import { addOrganizationusers, organizationusersDetail, Editorganizationusers } from "@/api/systemManage/OrganizationUser";
import { getOrganizationList, getorgcascader, getuserDrop } from '@/api/organizationManagement.js';
import { usedictionarydetails } from '@/api/dict.js'
import { getOrganizationrolesList } from "@/api/systemManage/OrganizationRole";
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
      isshow: true,
      RoleIdsData: [], //角色列表
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
      // 表单数据
      formData: {
        Status: true,
        RoleIds: [],
        OrganizationId: this.$utilsFun.getUserInfo().authOrgId
      },
      formDataCopy: {},
      // 验证规则
      formRules: {},
      A0003: [],
    };
  },
  created () {
    this.funusedictionarydetails();
    this.setformRules()
    this.roleData()
  },
  methods: {
    searchRegion (el) {
      if (!el.target.value) {
        return false;
      } else {
        //这里用了防抖来限制发送频率的次数 本身cascader也有debounce属性 但这里我没有用
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          //特别注意这里 如果不这么写的话 上一次的搜索结果还是会高亮显示 并且会报错 所以先清空一下
          this.$refs.regionDom.$refs.panel.activePath = [];
          getOrganizationList({
            OrganizationName: el.target.value,
            PageNumber: 1,
            PageSize: 999
          }).then(res => {
            if (res.Response.items.length !== 0) {
              this.tenantData = res.Response.items;
            }
          })
        }, 1200)
      }
    },
    filterRegion (value) {
      return false;
    },
    regionMenuChange (boolean) {
      //true下拉框展开 false下拉框收起  展开时清掉上次搜索结果 恢复如初
      if (boolean) {
        this.$refs.regionDom.$refs.panel.activePath = [];
        this.getTenantData(this.$utilsFun.getUserInfo().authOrgId);
      }
    },
    //处理机构从哪一级开始
    filterOneHospData (list) {
      let authOrgId = this.$utilsFun.getUserInfo().authOrgId
      if (!list && list.length) {
        return [];
      }
      let newRegion = []; //组装新数据
      fn(list);
      function fn (data) {
        for (let i = 0, len = data.length; i < len; i++) {
          if (data[i].OrganizationId === authOrgId) {
            newRegion.push(data[i]);
            break;
          } else if (data[i]?.Children) {
            fn(data[i].Children);
          }
        }
      }
      return newRegion;
    },
    //获取机构列表
    async getTenantData (val) {
      const res = await cascader(val);
      this.tenantData = this.filterOneHospData(res.Response);
    },
    async roleData () {
      let res = await getOrganizationrolesList({
        PageNumber: 1,
        PageSize: 9999,
      })
      this.RoleIdsData = res.Response.items;
    },
    // 字典数据请求
    async funusedictionarydetails () {
      const res = await usedictionarydetails({
        CategoryCode: ['A0003']
      })
      this.A0003 = res.Response.items.filter((i) => i.CategoryCode == 'A0003')
    },
    setformRules () {
      let arr = [{
        trigger: 'blur',
        message: "所属机构",
        key: "OrganizationId"
      },
      {
        trigger: 'blur',
        message: "姓名",
        key: "RealName"
      },
      // { trigger: 'change', message: "性别", key: "Sex" },
      {
        trigger: 'change',
        message: "角色",
        key: "RoleIds"
      },
      {
        trigger: 'blur',
        message: "授权账户",
        key: "Identifier"
      },
      {
        trigger: 'blur',
        message: "账号密码",
        key: "Credential"
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
      let {
        level
      } = node;
      let params = node.value
      getList({
        Org_OrganizationId: params,
        PageNumber: 1,
        PageSize: 9999,
      }).then(res => { //接口
        if (res && res.StatusCode == 200) {
          let data = [res.Response]
          if (level > 0) {
            data = res.Response.items
          }
          resolve(data);
        } else {
          this.$message.error('获取地区数据失败')
        }
      })
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
            await addOrganizationusers(that.formData);
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
            await Editorganizationusers({
              UserId: that.formData.UserId,
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
      let that = this;
      if (param.opt == "" || param.opt == null) {
        return this.$message.error("未知操作");
      }
      this.formConfig = Object.assign(this.formConfig, param);
      if (param.opt == 'add') {
        this.$nextTick(() => {
          this.getTenantData(this.$utilsFun.getUserInfo().authOrgId)
          that.formData = {
            ...{
              Status: true,
              RoleIds: [],
              Credential: 'jxCDC!2022'
            }
          }
          that.formData.OrganizationId = this.$utilsFun.getUserInfo().authOrgId
        })
      } else {
        this.getTenantData(param.OrganizationId)
        let res = await organizationusersDetail(param.UserId);
        this.$nextTick(() => {
          this.formData = {
            ...res.Response
          }
        })
        this.formDataCopy = res.Response
      }
    },
  },
};
</script>
