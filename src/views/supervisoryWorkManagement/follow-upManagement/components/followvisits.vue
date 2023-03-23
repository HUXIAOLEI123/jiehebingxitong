<template>
  <el-dialog :title="title" :visible.sync="innerVisible" top="20px" :close-on-click-modal="false" width="80%" @close="close" append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">后续随访</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="190px" :hide-required-asterisk="title == '查看详情'">
      <div class="detailstitlo">
        <p class="xqtitolstyle">基本信息</p>
      </div>
      <el-row>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="档案编号">
            <el-input v-model="form.FileNumber" placeholder="请输入内容" disabled></el-input>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="随访日期" prop="VisitDate">
            <el-date-picker
              v-model="form.VisitDate"
              align="center"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <!--  -->
        <el-col :span="8">
          <el-form-item label="督导人员" prop="Supervisor">
            <el-select v-model="form.Supervisor" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in A0026" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="随访方式" prop="VisitType">
            <el-select v-model="form.VisitType" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in A0022" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="建议日吸烟量">
            <el-input v-model="form.ProposalSmoking" placeholder="请输入数值" oninput="value=value.replace(/[^\d]/g,'')">
              <i slot="suffix" style="font-style: normal">支</i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建议日喝酒量">
            <el-input v-model="form.ProposalAlcohol" placeholder="请输入数值" oninput="value=value.replace(/[^\d]/g,'')">
              <i slot="suffix" style="font-style: normal">两</i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- 多选 -->
        <el-col :span="24">
          <!-- prop="Symptom" -->
          <el-form-item label="症状及体征" prop="Symptom">
            <el-checkbox-group v-model="Symptom" :disabled="title == '查看详情'">
              <el-checkbox v-for="item in A0023" @change="warrantNameChange" :key="item.DetailsCode" :label="item.DetailsCode">
                {{ item.DetailsName }}
              </el-checkbox>
              <el-input size="mini" v-if="reveal" v-model="form.SymptomOther" style="width: 320px; margin: 10px"></el-input>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 分割 -->

      <el-row>
        <!-- 列表单选 -->
        <el-col :span="24">
          <div class="detailstitlo">
            <p class="xqtitolstyle">用药情况</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="化疗方案">
            <el-input v-model="form.TreatmentPlan" placeholder="请输入内容" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="用法 " prop="DrugUsage">
            <el-select v-model="form.DrugUsage" placeholder="请输入内容">
              <el-option v-for="item in A0027" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="药品剂型" prop="DrugsType">
            <el-select v-model="DrugsType" multiple placeholder="请输入内容">
              <el-option v-for="item in A0025" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="漏服药次数" prop="MissedMedicationTimes">
            <el-input v-model="form.MissedMedicationTimes" placeholder="请输入数值" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="有无药物不良反应" prop="ADR">
            <el-select v-model="form.ADR" placeholder="请输入内容">
              <el-option v-for="item in A0002" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="处置意见">
            <el-input v-model="form.HandlingOpinions" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- -->
        <el-col :span="8">
          <el-form-item label="有无并发症或合并症" prop="Complication">
            <el-select v-model="form.Complication" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in A0002" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="并发症或合并症描述">
            <el-input v-model="form.ComplicationDesc" :disabled="form.Complication !== '1'" placeholder="请输入症状详情"></el-input>
          </el-form-item>
        </el-col>
        <!--  -->
        <el-col :span="8">
          <el-form-item label="下次随访日期" prop="NextVisitDate">
            <el-date-picker
              v-model="form.NextVisitDate"
              align="center"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="随访医生" prop="FollowDoctor">
            <el-input v-model="form.FollowDoctorName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- 列表单选 -->
        <el-col :span="24">
          <div class="detailstitlo">
            <p class="xqtitolstyle">转诊情况</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否转诊" prop="IsReferral">
            <el-select v-model="form.IsReferral" placeholder="请输入内容">
              <el-option label="转诊" :value="true"></el-option>
              <el-option label="未转诊" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="转诊原因">
            <el-input v-model="form.ReferralReason" :disabled="form.IsReferral !== true" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="两周内随访结果">
            <el-input v-model="form.FollowUpResults" :disabled="form.IsReferral !== true" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <!-- 列表单选 -->
        <el-col :span="24">
          <div class="detailstitlo">
            <p class="xqtitolstyle">全程管理情况(末次随访时填写)</p>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="停止治疗时间" prop="NextVisitDate">
            <el-date-picker
              v-model="form.StopTreatmentTime"
              align="center"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="停止治疗原因" prop="NextVisitDate">
            <el-select v-model="form.StopTreatmentReason" :disabled="form.StopTreatmentTime ? false : true" placeholder="请输入内容">
              <el-option v-for="item in A0030" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="应访患者次数">
            <el-input
              v-model="form.RequiredVisitsTimes"
              :disabled="form.StopTreatmentTime ? false : true"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="实际应访次数">
            <el-input
              v-model="form.ActualVisitsTimes"
              :disabled="form.StopTreatmentTime ? false : true"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="应访服药次数">
            <el-input
              v-model="form.RequiredMedicineTimes"
              :disabled="form.StopTreatmentTime ? false : true"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="实际服药次数">
            <el-input
              v-model="form.ActualMedicineTimes"
              :disabled="form.StopTreatmentTime ? false : true"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="服药率">
            <el-input v-model="form.MedicationRate" :disabled="form.StopTreatmentTime ? false : true" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="close" class="cancelbtn">取 消</el-button>
      <el-button type="primary" class="savebtn" @click="handlerSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 
import { usedictionarydetails } from '@/api/dict.js'

// 获取详情
// api
import { firstPulmonaryVisit, followPulmonaryVisit } from '@/api/supervisoryWorkManagement/follow-upManagement'

export default {
  name: "Followvisits",
  // props: ["getListInfo"],
  data () {
    return {
      reveal: false,
      title: "",
      checkbox: '',
      innerVisible: false,
      flag: "",
      form: {
        // FollowDoctor: JSON.parse(localStorage.getItem('Patientsdetails')).Responsibility,
        // FollowDoctorName: this.data.ResponsibilityName,
      },
      Symptom: [],
      DrugsType: [],
      hasinfo: [],
      dictarr: [],
      copyform: {},
      A0002: [],
      A0014: [],
      A0015: [],
      A0022: [], A0023: [], A0024: [], A0025: [], A0026: [], A0027: [], A0028: [], A0029: [], A0030: [],
      firstVisitId: '',

      //  表单验证
      rules: {
        FileNumber: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        VisitDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Supervisor: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        VisitType: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Symptom: [{
        	required: true,
        	message: "请选择",
        	trigger: "blur"
        }, ],
        TreatmentPlanName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        DrugUsage: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        DrugsType: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        MissedMedicationTimes: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        ADR: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        Complication: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        IsReferral: [
          { required: true, message: "请选择", trigger: "change" },
        ],

      },

    };
  },
  mounted () {
    this.getNowTime()
  },
  methods: {
    //  当前时间
    getNowTime () {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      var nextMonth = month + 1
      if (nextMonth == 13) {
        nextMonth = 1
      }
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      var nextdefaultDate = `${year}-${nextMonth}-${date}`
      this.$set(this.form, 'VisitDate', defaultDate)
      this.$set(this.form, 'NextVisitDate', nextdefaultDate)
    },
    // 字典
    async funusedictionarydetails () {
      const res = await usedictionarydetails({ CategoryCode: ['A0002', 'A0014', 'A0015', 'A0022', 'A0023', 'A0024', 'A0025', 'A0026', 'A0027', 'A0028', 'A0029', 'A0030'], PageNumber: 1, PageSize: 400 })
      this.dictarr = res.Response.items
    },
    //字典数据处理
    fundictlist () {
      this.dictarr.forEach(item => {
        if (item.CategoryCode == 'A0002') {
          this.A0002.push(item)
        } else if (item.CategoryCode == 'A0014') {
          this.A0014.push(item)
        } else if (item.CategoryCode == 'A0015') {
          this.A0015.push(item)
        } else if (item.CategoryCode == 'A0022') {
          this.A0022.push(item)
        } else if (item.CategoryCode == 'A0023') {
          this.A0023.push(item)
        } else if (item.CategoryCode == 'A0024') {
          this.A0024.push(item)
        } else if (item.CategoryCode == 'A0025') {
          this.A0025.push(item)
        } else if (item.CategoryCode == 'A0026') {
          this.A0026.push(item)
        } else if (item.CategoryCode == 'A0027') {
          this.A0027.push(item)
        } else if (item.CategoryCode == 'A0028') {
          this.A0028.push(item)
        } else if (item.CategoryCode == 'A0029') {
          this.A0029.push(item)
        } else if (item.CategoryCode == 'A0030') {
          this.A0030.push(item)
        }
      })
    },
    //判断多选框数组中是否有那个能发生改变的值
    warrantNameChange () {
      const _this = this;
      if (_this.Symptom.indexOf("10") !== (-1)) {
        _this.reveal = true;
      } else {
        _this.reveal = false;
      }
    },
    // 确认新增？修改
    show (flag, data) {
      this.Symptom = []
      this.reveal = false;
      this.getNowTime()
      this.innerVisible = true;
      this.form.FollowDoctorName = JSON.parse(localStorage.getItem('userInfo')).roleName;
      this.form.PersonId = data.PersonId;
      this.form.FileNumber = data.FileNumber;
      this.form.DiagnosisId = data.DiagnosisId;
      this.form.TreatmentPlan = data.TreatmentPlanName
      this.flag = flag;
    },
    // 确定
    handlerSave () {
      //数组转化成字符串
      let sym = this.Symptom.join()
      this.form.Symptom = sym
      let DyType = this.DrugsType.join()
      this.form.DrugsType = DyType
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.$baseConfirm(`确认要增加此次随访吗？`, null, async () => {
          let res = await followPulmonaryVisit(this.form)
          this.$baseMessage('添加成功', "success")
          this.$emit("submit")
          this.Symptom = []
          this.close();
        });
      });
    },

    close () {
      this.innerVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },
  },

  async created () {
    // 字典
    await this.funusedictionarydetails()
    this.fundictlist()


  },
};
</script>

<style lang=scss scoped>
</style>