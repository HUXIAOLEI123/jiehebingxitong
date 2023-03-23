<template>
  <el-dialog
    :title="title"
    :visible.sync="IsdialogVisible"
    append-to-body
    top="4%"
    :close-on-click-modal="false"
    width="50%"
    @close="close"
  >
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <div class="contentbox">
      <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="130px">
        <div class="detailstitlo">
          <p class="xqtitolstyle">档案信息</p>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="form.Name" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号">
              <el-input v-model="form.IdcardNo" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请机构">
              <el-input v-model="form.AdminOrganizationName" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原责任医生">
              <el-input v-model="form.ResponsibilityName" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input v-model="form.Phone" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="居住地址">
              <el-input v-model="form.Address" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="detailstitlo">
          <p class="xqtitolstyle">转移申请</p>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="转入机构" prop="MoveOrganizationId">
              <el-cascader
                style="width: 100%"
                key="bbigdd"
                ref="regionDom"
                :options="tenantData"
                :before-filter="filterRegion"
                filterable
                :props="propslist"
                @input.native="searchRegion"
                v-model="form.MoveOrganizationId"
                :show-all-levels="false"
                clearable
                @visible-change="regionMenuChange"
                @change="changeOrg"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="转入后责任医生" prop="MoveResponsibility">
              <el-select v-model="form.MoveResponsibility">
                <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人员">
              <el-input disabled v-model="form.personnelName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期" prop="OperateTimeFirst">
              <el-date-picker v-model="form.OperateTimeFirst" type="date" align="center" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="申请原因" prop="Reason">
              <el-input v-model="form.Reason" placeholder="请输入内容" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="handlerSave">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* api */
import { getOrganizationList, getorgcascader, getuserDrop } from '@/api/organizationManagement.js';
import { generatefilenumber } from '@/api/Person.js'
import { addApplicationtransfertist } from "@/api/FileTransfer.js";
export default {
  name: "Edit",
  data () {
    return {
      title: "",
      // 弹窗的开关
      IsdialogVisible: false,
      flag: "",
      // 日期数据
      value1: '',
      tenantData: [
        {
          OrganizationId: "360111021",
          OrganizationName: "江西省疾病预防控制中心",
          Children: [],
        }
      ], //机构数组
      options: [], //医师数组
      propslist: {
        value: "OrganizationId",
        label: "OrganizationName",
        children: "Children",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      form: {
        IdcardNo: '',
        FormerResponsibility: '',
        MoveOrganizationId: '',
        MoveResponsibility: '',
      },
      noarr: [],
      arr: [],  // 复选框的数据（实际是使用表格中传输过来的数据）
      //  表单验证
      rules: {
        Name: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        IdcardNo: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        Phone: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        }],
        FormerResponsibility: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        }],
        Address: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        }],
        MoveOrganizationId: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        Reason: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        TransferType: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        FormerOrganizationId: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        MoveResponsibility: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
      },
    };
  },
  async created () {
    // await this.getarchivesnum() //获取档案编号
    // await this.getorganizationlist() //获取机构列表
    // await this.getuserDropList() //根据机构获取用户下拉列表
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
            PageNumber:1,
            PageSize:999
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
        this.getorganizationlist();
      }
    },
    // 确认新增？修改
    async show (flag, data) {
      this.IsdialogVisible = true;
      this.title = "转移档案申请";
      // 将选择修改的表格数据复制到页面渲染
      this.form.PersonId = data.PersonId
      this.form.Name = data.Name;
      this.form.IdcardNo = data.CardNo
      this.form.AdminOrganization = data.AdminOrganization
      this.form.AdminOrganizationName = data.AdminOrganizationName
      this.form.ResponsibilityName = data.ResponsibilityName
      this.form.Responsibility = data.Responsibility
      this.form.Phone = data.Phone
      this.form.Address = data.Address
      this.form.TransferType = '2' //转出
      var datetime = new Date();
      var year = datetime.getFullYear(); //获取完整的年份(4位,如:1970)
      var month = datetime.getMonth() + 1; //获取月份(返回0-11,0代表1月,用的时候记得加上1)
      var date = datetime.getDate(); //获取日(返回1-31)
      //判断小于等于9月的时候在月份前加一个"0"
      if (month <= 9) {
        month = "0" + month;
      }
      //判断小于等于9号的时候在天数前加一个"0"
      if (date <= 9) {
        date = "0" + date;
      }
      this.form.OperateTimeFirst = year + "-" + month + "-" + date; //给申请时间默认当前
      this.form.personnel = this.$utilsFun.getUserInfo().identifier; //给申请人默认当前人
      this.form.personnelName = this.$utilsFun.getUserInfo().real_Name; //给申请人默认当前人
      // await this.getorganizationlist() //获取机构列表
      // await this.getuserDropList() //根据机构获取用户下拉列表
      // await this.getarchivesnum() //获取档案编号
    },
    //获取机构列表
    async getorganizationlist () {
      var MoveOrganizationId = this.$utilsFun.getUserInfo().authOrgId;
      const res = await getorgcascader(MoveOrganizationId);
      this.tenantData = res.Response;
    },
    async lazyLoad (node, resolve) {
      let param = {
        Org_OrganizationId: node.value,
        PageNumber: 1,
        PageSize: 9999,
      }
      if (node.level < 3) {
        param.IsCDC = true
      }
      let res = await getOrganizationList(param)
      let data = []
      res.Response.items.forEach((i) => {
        i.leaf = node.level >= 4
      })
      if (node.level > 0) {
        data = res.Response.items
      }
      resolve(data);
    },
    //获取档案编号
    async getarchivesnum () {
      const res = await generatefilenumber();
      this.form.FileTransferId = res;
    },
    //医师下拉框
    async getuserDropList () {
      var organizationId = this.form.MoveOrganizationId;
      var selectOnly = true;
      const res = await getuserDrop(organizationId, selectOnly);
      this.options = []; //下拉列表

      if (res.Response.length !== 0) {
        if (res.Response.length == 1) {
          this.form.MoveResponsibility = res.Response[0].Id;
        }
        for (let item of res.Response) {
          this.options.push({
            label: item.Name,
            value: item.Id,
          });
        }
        this.$forceUpdate();
      }
    },
    // 确定
    handlerSave () {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.arr.PersonId = this.form.PersonId
        this.arr.Name = this.form.Name
        this.arr.IdcardNo = this.form.IdcardNo
        this.arr.TransferType = this.form.TransferType
        this.arr.FormerOrganizationId = this.form.AdminOrganization;
        this.arr.FormerResponsibility = this.form.Responsibility
        this.arr.MoveOrganizationId = this.form.MoveOrganizationId
        this.arr.MoveResponsibility = this.form.MoveResponsibility
        this.arr.Address = this.form.Address
        this.arr.Phone = this.form.Phone
        this.arr.Reason = this.form.Reason
        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, async () => {
          let subData = Object.assign({}, this.arr)
          const res = await addApplicationtransfertist(subData)
          // this.$emit("outEdit", this.flag, subData);
          let {
            StatusCode,
            Message
          } = res;
          if (StatusCode != 200) {
            return this.$baseMessage(
              Message || '转出失败', 'error'
            )
          }
          this.$baseMessage('转出成功', "success")
          this.close();
        });
      });
    },
    //选择行政区域
    changeOrg (value) {
      this.form.MoveOrganizationId = value;
      this.options = [];
      this.form.MoveResponsibility = '';
      this.getuserDropList()
    },
    //取消
    close () {
      this.IsdialogVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },
  },
};
</script>

<style lang=scss scoped>
</style>
