<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="80%" top="20px" @close="close">
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <div class="contentbox">
      <!-- <span class="headingstyles"></span> -->
	  <div class="detailstitlo">
	  	<p class="xqtitolstyle">基础信息</p>
	  </div>
      <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名: ">
              <el-input v-model="form.Name" disabled placeholder="患者姓名"></el-input>
            </el-form-item>
          </el-col>
		  <el-col :span="2">
		    <el-button style="margin-left: 10px;"  type="primary" v-if="!Isdisabled" @click="clickpatientselect">选择</el-button>
		  </el-col>
          <el-col :span="8">
            <el-form-item label="证件号: ">
              <el-input v-model="form.CardNo" disabled placeholder="请输入内容" @input="idCardNoChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号: ">
              <el-input v-model="form.Phone" disabled placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
		<div class="detailstitlo">
			<p class="xqtitolstyle">确诊信息</p>
		</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="结核病类型: ">
              <el-select v-model="form.DiagnosisType" placeholder="请输入内容">
                <el-option v-for="item in A0013" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="患者类型: " prop="PatientType">
              <el-select v-model="form.PatientType" placeholder="请输入内容">
                <el-option v-for="item in A0014" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病原学结果: " prop="Sputum">
              <el-select v-model="form.Sputum" placeholder="请输入内容">
                <el-option v-for="item in A0015" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="确诊日期: " prop="DiagnosisTime">
              <el-date-picker align="center" v-model="form.DiagnosisTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="病例类型: " prop="DetectionPathway">
              <el-select v-model="form.DetectionPathway" placeholder="请输入内容">
                <el-option v-for="item in A0016" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否耐药: " prop="IsDrugResistance">
              <el-select v-model="form.IsDrugResistance" placeholder="请输入内容">
                <el-option v-for="item in A0024" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="分子生物学检测: " prop="MolecularBiologyResult">
              <el-select v-model="form.MolecularBiologyResult" placeholder="请输入内容">
                <el-option v-for="item in A0040" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="胸片: " prop="ChestRadiographyResult">
              <el-select v-model="form.ChestRadiographyResult" placeholder="请输入内容">
                <el-option v-for="item in A0041" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="肝功能: " prop="LiverFunctionResult">
              <el-select v-model="form.LiverFunctionResult" placeholder="请输入内容">
                <el-option v-for="item in A0041" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="确诊机构: " prop="DiagnosisOrganizationId">
              <el-select filterable v-model="form.DiagnosisOrganizationId">
                <el-option
                  v-for="item in DiagnosisOrganizationIdlist"
                  :key="item.index"
                  :label="item.OrganizationName"
                  :value="item.OrganizationId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发现方式: " prop="LiverFunctionResult">
              <el-select v-model="form.DiscoveryMode" placeholder="请输入内容">
                <el-option v-for="item in A0039" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="首管理单位: " prop="FirstAdminOrganization">
              <el-select filterable v-model="form.FirstAdminOrganization">
                <el-option
                  v-for="item in ShouAdminOrganizationlist"
                  :key="item.index"
                  :label="item.OrganizationName"
                  :value="item.OrganizationId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="现管理单位: " prop="XianAdminOrganization">
              <el-select filterable v-model="form.XianAdminOrganization" @change="selectOrganizationName">
                <el-option
                  v-for="item in XianAdminOrganizationlist"
                  :key="item.index"
                  :label="item.OrganizationName"
                  :value="item.OrganizationId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服药单位: " prop="MedicineAdminOrganization">
              <el-select filterable v-model="form.MedicineAdminOrganization" @change="selectMedicineAdminOrganization">
                <el-option
                  v-for="item in MedicineAdminOrganizationlist"
                  :key="item.index"
                  :label="item.OrganizationName"
                  :value="item.OrganizationId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="督导单位: " prop="AdminOrganization">
              <el-select filterable v-model="form.AdminOrganization" @change="changeOrg">
                <el-option
                  v-for="item in AdminOrganizationlist"
                  :key="item.index"
                  :label="item.OrganizationName"
                  :value="item.OrganizationId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="责任医师: " prop="Responsibility">
              <el-select filterable v-model="form.Responsibility">
                <el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="登记号: ">
              <el-input v-model="form.RegistrationNo" placeholder="请输入登记号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始治疗日期 : " prop="TreatmentStartDate">
              <el-date-picker align="center" v-model="form.TreatmentStartDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="登记时间: ">
              <el-date-picker align="center" v-model="form.RegisterTime" disabled type="date" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结核病治疗卡编号: " prop="FileNumber">
              <el-input v-model="form.FileNumber" disabled placeholder="请输入结核病治疗卡编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="治疗方案" prop="TreatmentPlanId">
              <el-select v-model="form.TreatmentPlanId" placeholder="请输入内容" @blur="chanceTreatmentPlanId">
                <el-option
                  v-for="item in TreatmentPlanId"
                  :key="item.TreatmentPlanId"
                  :label="item.TreatmentPlanName"
                  :value="item.TreatmentPlanId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button style="margin-left: 30px" type="primary"  @click="handlerEdit">新增治疗方案</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="el-colname">
            <label>强化期(月):</label>
            <span>{{ StrengtheningPeriodMonth }}</span>
          </el-col>
          <el-col :span="6">
            <label>强化期服药频率(次/天):</label>
            <span>{{ StrengtheningPeriodDMT }}</span>
          </el-col>
          <el-col :span="6">
            <label>巩固期(月):</label>
            <span>{{ ConsolidationPeriodMonth }}</span>
          </el-col>
          <el-col :span="6">
            <label>巩固期服药频率(次/天):</label>
            <span>{{ ConsolidationPeriodDMT }}</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="handlerSave" :disabled="title == '详情'">确 定</el-button>
    </div>
    <patientSelect ref="patientselectlist" @selectSubmit="getSelectRespons"></patientSelect>
    <OptionsEdit ref="optionsedit" @sumiteprogramme="funtreatmentplantemplates"></OptionsEdit>
  </el-dialog>
</template>
<script>
import { usedictionarydetails } from '@/api/dict.js'
import {
  getOrganizationList,
  getorgcascader,
  getuserDrop,
  droporganizations,
} from '@/api/organizationManagement.js';
import {
  tuberculosisdiagnosiss,
  addtuberculosisdiagnosiss,
  edittuberculosisdiagnosiss,
  deletetuberculosisdiagnosiss,
  tuberculosisdiagnosissexcel,
  generatetreatmentnumber,
  tuberculosisdiagnosissmsg
} from '@/api/TuberculosisDiagnosis.js'
import {
  pulmonaryclosesvisitandmedicine,
  addapplysettlement,
  pulmonarycloseslist,
  updatatuberculosisModify
} from '@/api/PulmonaryClose.js'
import OptionsEdit from '../components/tabComponents/echeatComponents/optionsEdit.vue' //./echeatComponents/optionsEdit.vue
import { treatmentplantemplates } from '@/api/TreatmentPlanTemplate.js'
import patientSelect from '../components/patientSelect.vue'
export default {
  components: {
    patientSelect,
    OptionsEdit
  },
  name: "Edit",
  data () {
    return {
      title: "新增治疗卡",
      Isdisabled: false,
      // 弹窗的开关
      dialogVisible: false,
      flag: "",
      StrengtheningPeriodMonth: '',
      StrengtheningPeriodDMT: '',
      ConsolidationPeriodMonth: '',
      ConsolidationPeriodDMT: '',
      form: {
        ContractStaffs: [],
        MedicineAdminOrganization: "",
        AdminOrganization: "",
        FileNumber: '',
        Name: '',
        RegisterTime:"",
      },
      TreatmentPlanId: [],
      ContractStaffList: [],
      tenantData: [], //行政区域
      options: [], //医师
      propslist: {
        value: "OrganizationId",
        label: "OrganizationName",
        children: "Children",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad
      },
      //  表单验证
      rules: {
        FileNumber: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        Name: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        Sex: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        Age: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        Phone: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        CardNo: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        RegistrationNo: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        TreatmentStartDate: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        },],
        XianAdminOrganization: [{
          required: true,
          message: "请选择现管理单位",
          trigger: "blur"
        },],
        MedicineAdminOrganization: [{
          required: true,
          message: "请选择服药单位",
          trigger: "blur"
        },],
        AdminOrganization: [{
          required: true,
          message: "请选择督导单位",
          trigger: "blur"
        },],
        FirstAdminOrganization: [{
          required: true,
          message: "请选择首管单位",
          trigger: "blur"
        },],
        ContractStaff: [{
          required: true,
          message: "请至少选择一项",
          trigger: "change"
        },],
        DiagnosisType: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        PatientType: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        Sputum: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        // DiagnosisOrganizationId: [{
        //   required: true,
        //   message: "请输入",
        //   trigger: "change"
        // },],
        DiagnosisTime: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        // DetectionPathway: [{
        //   required: true,
        //   message: "请输入",
        //   trigger: "change"
        // },],
        // IsDrugResistance: [{
        //   required: true,
        //   message: "请输入",
        //   trigger: "change"
        // },],
        // MolecularBiologyResult: [{
        //   required: true,
        //   message: "请输入",
        //   trigger: "change"
        // },],
        // ChestRadiographyResult: [{
        //   required: true,
        //   message: "请输入",
        //   trigger: "change"
        // },],
        // LiverFunctionResult: [{
        //   required: true,
        //   message: "请选择",
        //   trigger: "blur"
        // },],
        Responsibility: [{
          required: true,
          message: "请选择",
          trigger: "blur"
        },],
        RegisterTime: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
        TreatmentPlanId: [{
          required: true,
          message: "请输入",
          trigger: "change"
        },],
      },
      A0003: [],
      A0013: [],
      A0014: [],
      A0015: [],
      A0016: [],
      A0017: [],
      A0021: [],
      A0001: [],
      A0039: [],
	  A0040:[],
	  A0041:[],
	  A0024:[],
      dictarr: [],
      XianAdminOrganizationlist: [], //现管机构
      ShouAdminOrganizationlist: [],//首管理单位
      MedicineAdminOrganizationlist: [], //服药单位
      AdminOrganizationlist: [], //督导机构
      DiagnosisOrganizationIdlist: [], //确诊机构
      paParams: {
        PageNumber: 1,
        PageSize: 60,
      },
      copyform: {},

    };
  },
  async created () {
    // 字典
    await this.funusedictionarydetails()
    this.fundictlist()
    await this.funtreatmentplantemplates()
    await this.usedictionarydetails()
    await this.getorganizationlist() //获取机构列表
    // await this.getuserDropList() //根据机构获取用户下拉列表
    // this.form.RegisterTime = 
  },
  methods: {
    //选择现管理单位
    selectOrganizationName () {
      this.form.MedicineAdminOrganization = '';
      this.form.AdminOrganization = '';
      this.getMedicineAdminOrganizationlist() //服药单位列表
    },
    //获取服药单位列表 
    async getMedicineAdminOrganizationlist () {
      if (this.form.XianAdminOrganization) {
        const res = await droporganizations({
          OrganizationId: this.form.XianAdminOrganization,
          SelectOnly: false,
          PageSize: 9999
        });
        this.MedicineAdminOrganizationlist = res.Response;
      }
    },
    //获取督导机构列表 
    async getAdminOrganizationlist () {
      if (this.form.MedicineAdminOrganization) {
        const res = await droporganizations({
          OrganizationId: this.form.MedicineAdminOrganization,
          SelectOnly: false,
          PageSize: 9999
        });
        this.AdminOrganizationlist = res.Response;

      }
    },
    //选择服药单位
    selectMedicineAdminOrganization () {
      this.form.AdminOrganization = '';
      this.getAdminOrganizationlist() //督导单位列表
    },
    //根据主键获取全部信息
    async pulmonarycloseslistmsg (data) {
      const res = await tuberculosisdiagnosissmsg(data.DiagnosisId)
      this.form = {
        ...res.Response
      }
      await this.getuserDropList() //根据机构获取用户下拉列表
      this.copyform = {
        ...res.Response
      }
    },
    //加载所有机构
    async allorganizationslist () {
      const res = await droporganizations({
        IsAppoinOrganization: true
      })
      this.DiagnosisOrganizationIdlist = res.Response;
      const res2 = await droporganizations({
        IsCDC: true
      })
      this.ShouAdminOrganizationlist = res2.Response;
      const res3 = await droporganizations({
        OrganizationId: this.$utilsFun.getUserInfo().authOrgId,
        SelectOnly: false,
        IsCDC: true,
      })
      this.XianAdminOrganizationlist = res3.Response;
    },
    // 确认新增？修改
    async show (flag, data) {
      this.dialogVisible = true;
      this.flag = flag;
      if (flag == "add") {
        this.title = "新增病案";
        this.Isdisabled = false;
        this.form.OperatorNameFirst = this.$utilsFun.getUserInfo().real_Name //给建档人默认当前人
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
        this.form.OperateTimeFirst = year + "-" + month + "-" + date; //给建档时间默认当前
		this.form.RegisterTime = year + "-" + month + "-" + date;
        this.StrengtheningPeriodDMT = '';
        this.ConsolidationPeriodMonth = '';
        this.ConsolidationPeriodDMT = '';
        this.StrengtheningPeriodMonth = '';
        this.getarchivesnum() //获取档案编号
        this.getorganizationlist() //获取机构列表
        this.allorganizationslist() //所有机构列表
      } else if (flag == "edit") {
        this.title = "编辑";
        this.Isdisabled = true;
        await this.pulmonarycloseslistmsg(data)
        await this.allorganizationslist() //所有机构列表
        await this.getorganizationlist() //获取机构列表
        await this.getMedicineAdminOrganizationlist() //服药单位列表
        await this.getAdminOrganizationlist()//督导机构列表
      } else if (flag == 'recurrence') {
        this.title = "复发";
        this.Isdisabled = true;
        await this.pulmonarycloseslistmsg(data)
        await this.getarchivesnum() //获取档案编号
        await this.allorganizationslist() //所有机构列表
        await this.getorganizationlist() //获取机构列表
        await this.getMedicineAdminOrganizationlist() //服药单位列表
        await this.getAdminOrganizationlist()//督导机构列表
        this.form.PatientType = '2' //复治
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
		this.form.RegisterTime = year + "-" + month + "-" + date;
      }
    },
    //获取档案编号
    async getarchivesnum () {
      const res = await generatetreatmentnumber();
      this.form.FileNumber = res;
    },
    //人群属性
    async usedictionarydetails (params) {
      const res = await usedictionarydetails({
        CategoryCode: 'A0021'
      })
      this.ContractStaffList = res.Response.items
    },
    //获取机构列表
    async getorganizationlist () {
      // this.form.DiagnosisOrganizationId = this.$utilsFun.getUserInfo().authOrgId; //this.$utilsFun.getUserInfo().authOrgId'360111000'
      const res = await getorgcascader(this.form.DiagnosisOrganizationId);
      // for(let i in res.Response){
      // 	res.Response[i]['label']=res.Response[i].OrganizationName
      // 	res.Response[i]['value']=res.Response[i].OrganizationId
      // }
      this.tenantData = res.Response;
    },
    //获取确诊机构列表
    async getDiagnosisOrganizationIdlist () {
      const res = await getOrganizationList({
        // IsAppoinOrganization: true,
        PageSize: 9999
        // IsCDC: true,
      });
      this.DiagnosisOrganizationIdlist = res.Response.items;
      this.XianAdminOrganizationlist = res.Response.items;
      this.MedicineAdminOrganizationlist = res.Response.items;
      this.AdminOrganizationlist = res.Response.items;
    },
    //医师下拉框
    async getuserDropList () {
      var organizationId = this.form.AdminOrganization;
      var selectOnly = true;
      const res = await getuserDrop(organizationId, selectOnly);
      this.options = []; //下拉列表
      if (res.Response.length !== 0) {
        if (res.Response.length == 1) {
          this.form.Responsibility = res.Response[0].Id;

        }
        for (let item of res.Response) {
          this.options.push({
            label: item.Name,
            value: item.Id,
          });
        }
      }
    },
    async lazyLoad (node, resolve) {
      let {
        level
      } = node;
      let params = node.value
      getOrganizationList({
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
    chanceXianAdminOrganization () {
    },
    //新增治疗方案
    handlerEdit (flag, data) {
      data = this.TreatmentPlanId;
      this.$refs.optionsedit.show(flag, data)
    },
    //选择行政区域
    changeOrg (value) {
      this.form.AdminOrganization = value;
      this.options = [];
      this.form.Responsibility = '';
      this.getuserDropList()
    },
    // 保存
    handlerSave () {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.hasinfo = [];
        for (let key in this.form) {
          let obj = {};
          if (this.form[key] !== this.copyform[key]) {
            obj.op = 'replace',
              obj.value = this.form[key];
            obj.path = key;
            this.hasinfo.push(obj)
          }
        }
        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, async () => {
          let subData = Object.assign({}, this.form)
          if (this.flag == 'add') {
            const res = await addtuberculosisdiagnosiss(subData)
            this.$emit("sumite")
            this.$baseMessage('操作成功', "success")
            // this.$emit("newedit", this.flag, subData);
            this.close();
          } else if (this.flag == 'edit') {
            const DiagnosisId = subData.DiagnosisId
            const res = await edittuberculosisdiagnosiss(DiagnosisId, this.hasinfo)
            let {
              StatusCode,
              Message
            } = res;
            if (StatusCode != 200) {
              return this.$baseMessage(
                Message || '修改失败', 'error'
              )
            } else {
              this.$baseMessage('修改成功', "success")
              this.$emit("sumite")
              this.close();
            }
          } else if (this.flag == 'recurrence') {
            const res = await addtuberculosisdiagnosiss({
              ...this.Personform,
              ...this.form,
            })
            this.$emit('sumite');
            this.close();
            this.$baseMessage('操作成功', "success")
            this.$router.push('/patientManagement/patientManagement/index')
          }
        });
      });
    },
    close () {
      this.dialogVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },
    //治疗方案下拉
    chanceTreatmentPlanId (val) {
    },
    idCardNoChange () {
      const IdNmber = this.form.CardNo
      const sex = IdNmber.slice(16, 17)
      const myDate = new Date();
      const month = myDate.getMonth() + 1;
      const day = myDate.getDate();
      //出生日期
      this.form.BirthDay = IdNmber.slice(6, 10) + '-' + IdNmber.slice(10, 12) + '-' + IdNmber.slice(12, 14)
      // 年龄
      if (IdNmber.slice(6, 14).length == 8) {
        this.form.Age = myDate.getFullYear() - IdNmber.slice(6, 10) - 1
        if (IdNmber.slice(10, 12) < month || IdNmber.slice(10, 12) == month && IdNmber.slice(12, 14) <= day) {
          this.form.Age++
        }
        // 性别
        if (IdNmber.length == 17 || IdNmber.length == 18) {
          if (sex % 2 == 0) {
            this.form.Sex = '女'
          } else if (sex % 2 == 1) {
            this.form.Sex = '男'
          }
        }
      }
    },
    //获取选择到的患者信息
    getSelectRespons (data) {
      this.form.Name = data[0].Name
      this.form.CardNo = data[0].CardNo
      this.form.Phone = data[0].Phone
      this.form.PersonId = data[0].PersonId;
    },
    // 选择患者
    clickpatientselect () {
      var param = {
        title: '选择患者',
        visible: true,
        OrganizationId: this.form.AdminOrganization,
        num: 1
      }
      this.$refs.patientselectlist.getDetail(param)
    },
    // 字典数据请求
    async funusedictionarydetails (params) {
      const res = await usedictionarydetails({
        CategoryCode: ['A0021', 'A0003', 'A0013', 'A0014', 'A0015', 'A0016', 'A0017', 'A0001', 'A0039','A0040','A0041','A0024'],
        PageNumber: 1,
        PageSize: 90
      })
      let {
        StatusCode,
        Message
      } = res
      if (!res || StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error')
      }
      this.dictarr = res.Response.items
    },
    //字典数据处理
    fundictlist () {
      this.dictarr.forEach(item => {
        if (item.CategoryCode == 'A0003') {
          this.A0003.push(item)
        } else if (item.CategoryCode == 'A0013') {
          this.A0013.push(item)
        } else if (item.CategoryCode == 'A0014') {
          this.A0014.push(item)
        } else if (item.CategoryCode == 'A0015') {
          this.A0015.push(item)
        } else if (item.CategoryCode == 'A0016') {
          this.A0016.push(item)
        } else if (item.CategoryCode == 'A0017') {
          this.A0017.push(item)
        } else if (item.CategoryCode == 'A0001') {
          this.A0001.push(item)
        } else if (item.CategoryCode == 'A0021') {
          this.A0021.push(item)
        } else if (item.CategoryCode == 'A0039') {
          this.A0039.push(item)
        } else if (item.CategoryCode == 'A0040') {
          this.A0040.push(item)
        }else if (item.CategoryCode == 'A0041') {
          this.A0041.push(item)
        }else if (item.CategoryCode == 'A0024') {
          this.A0024.push(item)
        }
      })
    },
    // 治疗方案
    async funtreatmentplantemplates (params) {
	  
      const res = await treatmentplantemplates({
		  PageSize:999
	  })
      this.TreatmentPlanId = res.Response.items
    }

  },
  watch: {
    'form.TreatmentPlanId': function (val) {
      for (let i in this.TreatmentPlanId) {
        if (this.TreatmentPlanId[i].TreatmentPlanId == this.form.TreatmentPlanId) {
          this.StrengtheningPeriodDMT = this.TreatmentPlanId[i].StrengtheningPeriodDMT;
          this.ConsolidationPeriodMonth = this.TreatmentPlanId[i].ConsolidationPeriodMonth;
          this.ConsolidationPeriodDMT = this.TreatmentPlanId[i].ConsolidationPeriodDMT;
          this.StrengtheningPeriodMonth = this.TreatmentPlanId[i].StrengtheningPeriodMonth;
        }
      }
    },
    // 'form.XianAdminOrganization': function(val) {
    // 	// this.form.MedicineAdminOrganization = '';
    // 	// this.form.AdminOrganization= '';
    // 	this.getMedicineAdminOrganizationlist() //服药单位列表
    // },
    // 'form.MedicineAdminOrganization': function(val) {
    // 	// this.form.AdminOrganization= '';
    // 	this.getAdminOrganizationlist() //督导单位列表
    // }
  }
};
</script>

<style lang=scss scoped>
.el-row {
  margin: 1px 0;
}

.contentbox {
  height: 600px;
}

.el-colname {
  margin-left: 60px;
}

.headingstyles {
  line-height: 25px;
}
</style>
