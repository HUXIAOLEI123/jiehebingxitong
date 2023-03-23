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
    <el-form :model="formData" :rules="formRules" v-loading="formConfig.loading" ref="refForm" label-width="100px" class="form_row">
      <div class="contentbox" style="height: 50vh">
		<div class="detailstitlo">
			<p class="xqtitolstyle">基础信息</p>
		</div>
        <el-row>
            <el-col :span="6">
              <el-form-item label="姓名: ">
                <el-input v-model="formData.Name" disabled placeholder="患者姓名"></el-input>
              </el-form-item>
            </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 10px;"  type="primary" v-if="!Isdisabled" @click="clickpatientselect">选择</el-button>
        </el-col>
		    <el-col :span="8">
		    	<el-form-item label="患者类型" prop="PatientTypeName">
		    		<el-input v-model="formData.PatientTypeName" disabled placeholder=""></el-input>
		    	</el-form-item>
		    </el-col>
            <el-col :span="8">
              <el-form-item label="证件号: ">
                <el-input v-model="formData.CardNo" disabled placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="性别">
		  			<el-select v-model="formData.Sex" disabled>
		  				<el-option v-for="item in A0003" :key="item.DetailsCode" :label="item.DetailsName"
		  					:value="item.DetailsCode" ></el-option>
		  			</el-select>
		  		</el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="年龄">
		  			<el-input v-model="formData.Age" disabled></el-input>
		  		</el-form-item>
		  	</el-col>
		  	<el-col :span="8">
		  		<el-form-item label="出生日期">
		  			<el-date-picker disabled v-model="formData.BirthDay" align="center" type="date">
		  			</el-date-picker>
		  		</el-form-item>
		  	</el-col>
		  </el-row>
        <div class="detailstitlo">
        	<p class="xqtitolstyle">电子药盒信息</p>
        </div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="药盒序列号:" prop="BoxSN">
              <el-input v-model="formData.BoxSN" :disabled='Isdisabled'/>
            </el-form-item>
          </el-col>
		  <el-col :span="8">
		    <el-form-item label="提醒时间: " prop="AlarmList">
		      <el-select v-model="formData.AlarmList" multiple placeholder="请选择提醒时间" @change="changeAlarmList">
				<el-option key="07:00:00" label="07:00:00" value="07:00:00"></el-option>
		        <el-option key="07:30:00" label="07:30:00" value="07:30:00"></el-option>
				<el-option key="11:00:00" label="11:00:00" value="11:00:00"></el-option>
				<el-option key="16:00:00" label="16:00:00" value="16:00:00"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-col>
		  <!-- <el-col :span="8">
		    <el-form-item label="备注:" prop="Remarks">
		      <el-input v-model="formData.Remarks" :disabled='Isdisabled'/>
		    </el-form-item>
		  </el-col> -->
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancelbtn" @click="handleClose">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="submit">确 定</el-button>
    </span>
	<TreatmentCardSelect ref="treatmentCardSelect" @selectSubmit="getSelectRespons"></TreatmentCardSelect>
  </el-dialog>
</template>

<script>
import {
  addelectronicboxmanagement,
  detailelectronicboxmanagement,
  editelectronicboxmanagement
} from '@/api/electronicboxmanagement '
import {
  tuberculosisdiagnosissmsg
} from '@/api/TuberculosisDiagnosis.js'
import { treatmentplantemModify, treatmentplantemplatesDetails, treatmentplanrecordEdit } from "@/api/TreatmentPlanTemplate";
import TreatmentCardSelect from '../../checkManagement/tabComponents/phlegmtab1/components/TreatmentCardSelect.vue'
import {
		usedictionarydetails
	} from '@/api/dict.js'
export default {
  components: {
    TreatmentCardSelect,
  },
  data () {
    return {
      // 表单配置
      formConfig: {
        title: "",
        visible: false,
        width: "70%",
        opt: "",
        loading: false,
        rederView: true
      },
      // 表单数据
      formData: {
		  Name:'',
		  AlarmListstr:[],
		  AlarmList:[],
	  },
	  A0004: [],
	  A0003: [],
      formDataCopy: {},
      // 验证规则
      formRules: {},
	  Isdisabled: false,
    };
  },
  created () {
    this.setformRules()
	this.funusedictionarydetails6()
	this.funusedictionarydetails()
  },
  methods: {
    setformRules () {
      let arr = [
        { trigger: 'blur', message: "治疗方案名称", key: "TreatmentPlanName" },
        { trigger: 'blur', message: "强化期", key: "StrengtheningPeriodMonth" },
        { trigger: 'blur', message: "强化期服药频率", key: "StrengtheningPeriodDMT" },
        { trigger: 'change', message: "提醒时间", key: "AlarmList" },
        { trigger: 'blur', message: "药盒序列号", key: "BoxSN" },
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
	changeAlarmList(){
		// this.formData.AlarmList = [];
		// this.formData.AlarmList.push(this.formData.AlarmListstr)
		this.$forceUpdate()
	},
	// 选择治疗卡
	clickpatientselect() {
		var param = {
			title: '选择治疗卡',
			visible: true,
			num: 1
		}
		this.$refs.treatmentCardSelect.getDetail(param)
	},
	//获取选择到的治疗卡信息
	getSelectRespons(data) {
		this.$nextTick(() => {
		  // this.formData = {
		  //   ...data[0]
		  // }
		  this.formData.PersonId = data[0].PersonId
		  this.formData.DiagnosisId = data[0].DiagnosisId
		  this.formData.PatientTypeName = data[0].PatientTypeName
		  this.formData.Name = data[0].Name
		  this.formData.CardNo = data[0].CardNo
		  this.formData.Sex = data[0].Sex
		  this.formData.Age = data[0].Age
		  this.formData.BirthDay = data[0].BirthDay
		})
		this.$forceUpdate();
	},
	async funusedictionarydetails6(params) {
		const res = await usedictionarydetails({
			CategoryCode: ['A0004'],
			PageNumber: 1,
			PageSize: 90
		})
		this.A0004 = res.Response.items
	},
	async funusedictionarydetails(params) {
		const res = await usedictionarydetails({
			CategoryCode: ['A0003'],
			PageNumber: 1,
			PageSize: 90
		})
		this.A0003 = res.Response.items
	},
    //关闭弹框
    handleClose () {
      this.$nextTick(() => {
        this.$refs['refForm'].resetFields();
      })
      this.formConfig.visible = false;
    },
    // 提交
    submit () {
      let that = this;
      this.$refs.refForm.validate(async (valid) => {
        if (valid) {
          if (that.formConfig.opt == 'add') {
            await addelectronicboxmanagement(that.formData);
            this.$message.success("新增成功");
            that.$emit("submit")
            that.handleClose()
          }
          if (that.formConfig.opt == 'edit') {
			delete this.formData.AlarmListstr;//删除AlarmListstr元素
            let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy)
            await editelectronicboxmanagement(that.formData.BoxId,arr)
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
	  this.Isdisabled = false;
      this.$nextTick(() => {
        that.formData = { ...{} }
      })
      this.formConfig = Object.assign(this.formConfig, param);
      // 编辑之前先去查询详情
      if (param.opt === "edit") {
		this.Isdisabled = true;
        let res = await detailelectronicboxmanagement(param.boxId);
		const data = await tuberculosisdiagnosissmsg(param.diagnosisId)
		this.$nextTick(() => {
		  this.formData = {
			...res.Response,
		    ...data.Response,
			
		  }
		})
		res.Response.AlarmJosn =  res.Response.AlarmJosn.substring(0, res.Response.AlarmJosn.length - 1)
		res.Response.AlarmJosn = res.Response.AlarmJosn.substr(1)
		res.Response.AlarmJosn = res.Response.AlarmJosn.split(',')
		for(let i in res.Response.AlarmJosn){
			res.Response.AlarmJosn[i] = res.Response.AlarmJosn[i].substring(0, res.Response.AlarmJosn[i].length - 1)
		    res.Response.AlarmJosn[i] = res.Response.AlarmJosn[i].substr(1)
			
		}
		// res.Response.AlarmJosn =  res.Response.AlarmJosn.substring(0, res.Response.AlarmJosn.length - 1)
		// res.Response.AlarmJosn = res.Response.AlarmJosn.substr(1)
		
		this.$nextTick(() => {
		  this.formData.AlarmList = res.Response.AlarmJosn
		})
		this.$nextTick(() => {
		  this.formDataCopy = {
			...res.Response,
		    ...data.Response,
			
		  }
		})
		this.$forceUpdate()
      }
      this.formConfig.loading = false;
    },
  },
};
</script>
