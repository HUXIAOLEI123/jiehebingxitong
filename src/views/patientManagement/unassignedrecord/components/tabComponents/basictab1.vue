<template>
  <div class="room2">
    <!-- tab1页面 -->
    <!-- 头部图表 -->
    <div class="heard">
      <div class="heardechart">
        <p>服药监督异常</p>
        <MedicineEchart :EchartList="Echartdata"></MedicineEchart>
      </div>
      <div class="heardechart">
        <p>不良反应</p>
        <AdverseEchart :EchartList="Echartdata"></AdverseEchart>
      </div>
      <div class="heardechart">
        <p>中断服药</p>
        <InterruptEcheart :EchartList="Echartdata"></InterruptEcheart>
      </div>
      <div class="heardechart">
        <p>检查指标异常</p>
        <CheckEcheart :EchartList="Echartdata"></CheckEcheart>
      </div>
    </div>

    <!-- 详情区域  class="form_row"-->
    <div class="inputconet">
      <div class="detailstitlo">
        <p class="xqtitolstyle">基本信息</p>
      </div>

      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="姓名">
              <span>{{ form.Name }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="性别">
              <span>{{ form.SexName }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="年龄">
              <span>{{ form.Age }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="联系方式">
              <span>{{ form.Phone }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="证件号">
              <span>{{ form.CardNo }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="出生日期">
              <span v-if="form.BirthDay">{{ form.BirthDay.slice(0,10)}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="建档机构">

              <span>{{ form.AdminOrganizationName}}</span>
            </el-form-item>
          </el-col>


          <!-- <el-col :span="7">
            <el-form-item label="职业">
              <span>{{ form.OccupationName }}</span>
            </el-form-item>
          </el-col> -->
		  <el-col :span="7">
		    <el-form-item label="居住地址">
		  
		      <span>{{ form.Address }}</span>
		    </el-form-item>
		  </el-col>
          <el-col :span="7">
            <el-form-item label="工作地址">
              <span>{{ form.WorkUnit }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
         

          <el-col :span="7">
            <el-form-item label="户籍地址">
              <span>{{ form.ResidenceAddress }}</span>
            </el-form-item>
          </el-col>
          <!-- 字典 -->
          <el-col :span="7">
            <el-form-item label="人群属性">
              <span>{{form.ContractStaffName}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="detailstitlo">
          <p class="xqtitolstyle">确诊信息</p>
        </div>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="结核病类型" prop="DiagnosisTypeName">
              <span>{{form.DiagnosisTypeName}}</span>
            </el-form-item>
          </el-col>


          <el-col :span="7">
            <el-form-item label="患者类型" prop="PatientTypeName">
              <span>{{form.PatientTypeName}}</span>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="痰菌情况" prop="SputumName">
              <span v-if="form.Sputum=='1'">阳性</span>
              <span v-else-if="form.Sputum=='2'">阴性</span>
              <span v-else-if="form.Sputum=='3'">未查痰</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="确诊机构">
              <span>{{form.DiagnosisOrganizationName}}</span>
            </el-form-item>
          </el-col>


          <el-col :span="7">
            <el-form-item label="确诊日期">
              <span v-if="form.DiagnosisTime">{{form.DiagnosisTime.slice(0,10)||[]}}</span>
            </el-form-item>
          </el-col>


          <el-col :span="7">
            <el-form-item label="病例类型">
              <span>{{form.DetectionPathwayName}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="责任医生">
              <span>{{form.ResponsibilityName}}</span>
            </el-form-item>
          </el-col>


          <el-col :span="7">
            <el-form-item label="登记日期" prop="DiagnosisTime">
              <span v-if="form.DiagnosisTime">{{form.DiagnosisTime.slice(0,10)}}</span>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="耐药">
              <!-- <span v-if="form.DetailsCode='1'">是</span>
              <span v-else-if="form.DetailsCode='2'">否</span> -->
			  <span>{{form.IsDrugResistanceName}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="分子生物学检测">
              <!-- <span v-if="form.MolecularBiologyResult='1'">已检测</span>
              <span v-else-if="form.MolecularBiologyResult='2'">未检测</span> -->
			  <span>{{form.MolecularBiologyResultName}}</span>
            </el-form-item>
          </el-col>


          <el-col :span="7">
            <el-form-item label="胸片">
              <!-- <span v-if="form.ChestRadiographyResult=='1'">正常</span>
              <span v-else-if="form.ChestRadiographyResult=='2'">异常</span>
              <span v-else-if="form.ChestRadiographyResult=='3'">未查</span> -->
			  <span>{{form.ChestRadiographyResultName}}</span>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="肝功能">
              <!-- <span v-if="form.LiverFunctionResult=='1'">正常</span>
              <span v-else-if="form.LiverFunctionResult=='2'">异常</span>
              <span v-else-if="form.LiverFunctionResult=='3'">未查</span> -->
			  <span>{{form.LiverFunctionResultName}}</span>
            </el-form-item>
          </el-col>
        </el-row>



        <el-row :gutter="20">
          <el-col :span="7" class="row">
            <el-form-item label="治疗方案">
              <span>{{form.TreatmentPlanName}}</span>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
import MedicineEchart from './echeatComponents/medicineEchart.vue'
import AdverseEchart from './echeatComponents/adverseEchart.vue'
import InterruptEcheart from './echeatComponents/interruptEcheart.vue'
import CheckEcheart from './echeatComponents/checkEcheart.vue'
import {
   detailmanagementist	
} from '@/api/Person.js'

import {
  usedictionarydetails
} from '@/api/dict.js'
import {
  treatmentplantemplates
} from '@/api/TreatmentPlanTemplate.js'
import {
  tuberculosisdiagnoecharts,
  tuberculosisdiagnosissmsg
} from '@/api/TuberculosisDiagnosis.js'
export default {
  components: {
    MedicineEchart,
    AdverseEchart,
    InterruptEcheart,
    CheckEcheart
  },
  // 接收父组件弹框收据
  props: ['inputData'],
  data() {
    return {
      form: {
        SputumName: '',
      },

      Echartdata: {},
      TreatmentPlanId: [],
      //  表单验证

      A0003: [],
      A0013: [],
      A0014: [],
      A0015: [],
      A0016: [],
      A0017: [],
      A0021: [],
      A0024: [],
      dictarr: [],
      paParams: {
        PageNumber: 1,
        PageSize: 60,
      },
    }
  },
  async created() {
    this.form = this.inputData
    
    await this.funusedictionarydetails()
    this.fundictlist()
    await this.funtuberculosisdiagnoecharts()
    await this.detailmanagementistlist()
	await this.tuberculosisdiagnosissmsglist()
  },
  async mounted() {
    await this.funusedictionarydetails()
    this.fundictlist()
    await this.funtuberculosisdiagnoecharts()
  },
  methods: {
    //图表
    async funtuberculosisdiagnoecharts() {
      let ids = this.inputData.DiagnosisId
      const res = await tuberculosisdiagnoecharts({
        diagnosisId: ids
      })
      let {
        StatusCode,
        Message
      } = res

      if (StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error')
      }
      this.Echartdata = res.Response
      this.Echartdata = JSON.parse(JSON.stringify(this.Echartdata))

    },
    async detailmanagementistlist() {
    	const res = await detailmanagementist(this.form.PersonId)
    	this.form = {
    		
			...this.inputData,
			...res.Response,
    	};
    },
	async tuberculosisdiagnosissmsglist() {
		const res = await tuberculosisdiagnosissmsg(this.form.DiagnosisId)
		this.form = {
			...this.form,
			...res.Response,
		};
	},
    // 字典数据请求
    async funusedictionarydetails(params) {
      const res = await usedictionarydetails({
        CategoryCode: ['A0021', 'A0003', 'A0013', 'A0014', 'A0015', 'A0016', 'A0017', 'A0024'],
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
    fundictlist() {
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
        } else if (item.CategoryCode == 'A0024') {
          this.A0024.push(item)
        } else if (item.CategoryCode == 'A0021') {
          this.A0021.push(item)

        }
      })


    },
  },
  watch: {
    inputData: function (val) {
      this.form = this.inputData
      this.funtuberculosisdiagnoecharts()
	  this.detailmanagementistlist()
	  this.tuberculosisdiagnosissmsglist()
    }
  }

}
</script>

<style lang="scss" scoped>
.room2 {
  width: 100%;
  height: 100%;
  // overflow: hidden;

}

.heard {
  height: 250px;
  width: 100%;
  display: flex;

}

.heardechart {
  width: 25%;
  height: 100%;

}

.heardechart>p {
  text-align: center;
  color: black;
  font-size: 15PX;
  font-weight: 600;
}

// 表单
.inputconet {
  width: 100%;
  height: 700px;
  padding: 0 0 0 20px;

}

span {
  color: black;
  margin: 0px 0px 0px 10px;
  font-weight: 600;
  font-size: 20px;
  line-height: 35px;

}

::v-deep element.style {
  width: 100%;
  height: 100%;
}
.room::-webkit-scrollbar { width: 0 !important }
// 详情样式
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #999999 100%;

}

span {
  font-size: 16px;
  color: #252D57;

}
</style>
