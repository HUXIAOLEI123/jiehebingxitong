<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="50%" @close="close"
    append-to-body>
		<div slot="title" class="dialog-title">
		      <div class="sectionstly"></div>
		      <span class="title-text">{{title}}</span>
		      <div class="button-right">
		        <span class="title-close" @click="close"></span>
		      </div>
		  </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" status-icon label-width="120px">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="结案人员" prop="EvaluationDoctor">
            <el-input v-model="form.EvaluationDoctor" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="建档日期" prop="EvaluationDate">
            <el-date-picker v-model="form.EvaluationDate" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-row>
      <!-- + -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="停止治疗时间" prop="EvaluationDate">
            <el-date-picker v-model="form.StopTime" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="10">
          <el-form-item label="停止治疗原因" prop="StopResult">
            <el-select v-model="form.StopResult" placeholder="请输入内容">
              <el-option v-for="item in A0030" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- + -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="应访视次数" prop="VisitNumber">
            <el-input-number v-model="form.VisitNumber" controls-position="right" :min="0" label="描述文字">
            </el-input-number>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="10">
          <el-form-item label="实际访视次数" prop="ActualVisitNumber">
            <el-input-number v-model="form.ActualVisitNumber" controls-position="right" :min="0" label="描述文字">
            </el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- + -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="应服药次数" prop="TakeMedicineNumber">
            <el-input-number v-model="form.TakeMedicineNumber" controls-position="right" :min="0" label="描述文字">
            </el-input-number>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="10">
          <el-form-item label="实际服药次数" prop="ActualTakeMedicineNumber">
            <el-input-number v-model="form.ActualTakeMedicineNumber" controls-position="right" :min="0" label="描述文字">
            </el-input-number>
          </el-form-item>
        </el-col>

      </el-row>


      <!-- + -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="服药率" prop="MedicationRate">
            <el-input v-model="form.MedicationRate" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="10">
          <el-form-item label="是否电话随访" prop="IsPhone">
            <el-select v-model="form.IsPhone" placeholder="请选择">
              <el-option label="是" :value='true'></el-option>
              <el-option label="否" :value='false'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <!-- + -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="是否就诊" prop="IsDiagnosis">
            <el-select v-model="form.IsDiagnosis" placeholder="请选择">
              <el-option label="是" :value='true'></el-option>
              <el-option label="否" :value='false'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!--  -->

        <el-col :span="10">
          <el-form-item label="是否确认结果" prop="IsResult">
            <el-select v-model="form.IsResult" placeholder="请选择活动区域">
              <el-option label="是" :value='true'></el-option>
              <el-option label="否" :value='false'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>


      <!-- + -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="档案编号" prop="FileNumber">
            <el-input v-model="form.FileNumber" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>


        <el-col :span="10">
          <el-form-item label="备注" prop="Remarks">
            <el-input v-model="form.Remarks" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="10">
          <el-form-item label="治疗方案" >
            <el-select v-model="form.TreatmentPlanId" placeholder="请输入内容">
              <el-option v-for="item in TreatmentPlanId" :key="item.TreatmentPlanName" :label="item.TreatmentPlanName"
                :value="item.TreatmentPlanName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
      <el-button class="savebtn"  type="primary" @click="handlerSave">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { usedictionarydetails } from '@/api/dict.js'
import { treatmentplantemplates } from '@/api/TreatmentPlanTemplate.js'
import { plysettlementList,  } from '@/api/PulmonaryClose.js'
export default {
  name: "Edit",
  data() {
    return {
      title: "",

      innerVisible: false,
      flag: "",
      ids:'',
      copyform: {},
      hasinfo: [],
      form: {
      },
      dictarr: [],
      A0001: [],
      A0030: [],
      //  表单验证
      rules: {


        FileNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        Name: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        CardNo: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        Phone: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        EvaluationDate: [
          { required: true, message: "请输入", trigger: "change" },
        ],

        EvaluationDoctor: [
          { required: true, message: "请输入", trigger: "change" },
        ],

        StopTime: [
          { type: 'date', required: true, message: "请输入", trigger: "change" },
        ],

        StopResult: [
          { required: true, message: "请输入", trigger: "change" },
        ],

        VisitNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        ActualVisitNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        TakeMedicineNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        ActualTakeMedicineNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        MedicationRate: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        IsPhone: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        IsDiagnosis: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        IsResult: [
          { required: true, message: "请输入", trigger: "change" },
        ],

        Remarks: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

      },

    };
  },

  async created() {
    await this.funtreatmentplantemplates()
    await this.funusedictionarydetails()
    await this.fundictlist()
  
  },
  methods: {
    async funusedictionarydetails(params) {
      const res = await usedictionarydetails({ CategoryCode: ['A0001', 'A0030'], PageNumber: 1, PageSize: 90 })
      let { StatusCode, Message } = res
      if (!res || StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error')
      }
      this.dictarr = res.Response.items

    },
    // 字典数据处理
    fundictlist() {
      this.dictarr.forEach(item => {
        if (item.CategoryCode == 'A0001') {
          this.A0001.push(item)

        } else if (item.CategoryCode == 'A0030') {
          this.A0030.push(item)
        }
      })

    },
    // 治疗方案
    async funtreatmentplantemplates(params) {
      const res = await treatmentplantemplates(params)

      this.TreatmentPlanId = res.Response.items

    },


    //结案详情
    async funplysettlementList(){
      const res = await plysettlementList({ closeId: this.ids })
      let { StatusCode, Message } = res
        if (StatusCode !== 200) {
          return this.$baseMessage(Message || '数据获取失败', 'error')
        }
        this.form = { ...res.Response }
        this.copyform = { ...res.Response }
    },


   async  show(flag, dataId) {
      this.innerVisible = true;
      this.flag = flag;
      this.ids=dataId
      if (flag == 'Modify') {
        this.title = "编辑";
        // 获取详情
        const res = await plysettlementList({ closeId: dataId })
        let { StatusCode, Message } = res
        if (StatusCode !== 200) {
          return this.$baseMessage(Message || '数据获取失败', 'error')
        }
        this.form = { ...res.Response }
        this.copyform = { ...res.Response }

      }

    },
    // 确定
    handlerSave() {
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
        this.$baseConfirm(`确认修改吗？`, null, () => {
    
          this.$emit("recurrenceEdit", this.flag,this.form, this.hasinfo);
          this.close();
        });
      });

    },


    //取消
    close() {
      this.innerVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },


  },
};
</script>

<style lang=scss scoped>
span {
  font-size: 20px;
  margin: 0px 0px 0px 0px;
  line-height: 20px;
}
</style>