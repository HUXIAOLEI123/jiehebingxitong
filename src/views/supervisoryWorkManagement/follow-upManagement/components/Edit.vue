<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="60%" @close="close" append-to-body>
    <el-form class="form_row" ref="form" :rules="rules" :model="form" label-width="120px">
      <span class="headingstyles">基本信息</span>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="患者选择" prop="Name">
            <el-input v-model="form.Name" placeholder="输入+选择（姓名+证件号）" :disabled="title == '查看详情'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="随访方式" prop="VisitType">
            <el-select v-model="form.VisitType" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in followType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="患者类型" prop="PatientTypeName	">
            <el-select v-model="form.PatientTypeName" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="痰菌情况: " prop="Sputum">
            <el-select v-model="form.Sputum" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in A0015" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="耐药情况: " prop="IsDrugResistance">
            <el-select v-model="form.IsDrugResistance" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in A0001" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="督导人员" prop="name">
            <el-select v-model="form.Supervisor" placeholder="请输入内容" :disabled="title == '查看详情'">
              <el-option v-for="item in A0026" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="下次随访日期" prop="NextVisitDate" :disabled="title == '查看详情'">
            <el-date-picker v-model="form.NextVisitDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="状态及体征" prop="types">
        <el-checkbox-group v-model="Complication" :disabled="title == '查看详情'">
          <el-checkbox label="无症状" value="1"></el-checkbox>
          <el-checkbox label="咳嗽吐痰"></el-checkbox>
          <el-checkbox label="低热盗汗"></el-checkbox>
          <el-checkbox label="咳血或血痰"></el-checkbox>
          <el-checkbox label="胸痛消瘦"></el-checkbox>
          <el-checkbox label="恶心纳差"></el-checkbox>
          <el-checkbox label="头痛失眠"></el-checkbox>
          <el-checkbox label="视线模糊"></el-checkbox>
          <el-checkbox label="皮肤瘙痒、皮疹"></el-checkbox>
          <el-checkbox label="耳鸣、听力下降"></el-checkbox>
          <el-checkbox label="其他"></el-checkbox>
          <!-- <el-input></el-input> -->
        </el-checkbox-group>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="吸烟习惯" prop="type">
            <el-radio-group v-model="form.ProposalSmoking" :disabled="title == '查看详情'" size="mini">
              <el-radio label="经常"></el-radio>
              <el-radio label="偶尔"></el-radio>
              <el-radio label="从不"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="饮酒习惯" prop="A2007">
            <el-radio-group v-model="form.ProposalAlcohol" :disabled="title == '查看详情'" size="mini">
              <el-radio label="经常"></el-radio>
              <el-radio label="偶尔"></el-radio>
              <el-radio label="从不"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="独居" prop="type">
            <el-radio-group v-model="form.age12" :disabled="isShow(title)" size="mini">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通风" prop="type">
            <el-radio-group v-model="form.age13" :disabled="title == '查看详情'">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <span class="headingstyles">健康教育教育情况</span>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handlerSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* api */
// 字典
import { usedictionarydetails } from '@/api/dict.js'
import { addPulmonary } from '@/api/supervisoryWorkManagement/follow-upManagement'
export default {
  name: "Edit",
  data () {
    return {
      title: "",
      Complication: [],
      innerVisible: false,
      flag: "",
      // 弹框数据
      form: {
      },
      // 上门随访
      followType: [
        {
          value: '1',
          label: '上门随访'
        }, {
          value: '2',
          label: '未知1'
        }, {
          value: '3',
          label: '未知2'
        }, {
          value: '4',
          label: '未知3'
        },
      ],
      // 患者类型
      options: [{
        value: '1',
        label: '初诊'
      },
      {
        value: '2',
        label: '复诊'
      },
      ],
      A0003: [], A0013: [], A0014: [], A0015: [], A0016: [], A0017: [], A0021: [], A0001: [], A0022: [], A0026: [], A0028: [],
      //  表单验证
      rules: {
        name: [
          { required: true, message: "请输入角色编号", trigger: "blur" },
        ],
        charactername: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
        // ],

      },

    };
  },
  async created () {

    // 字典
    await this.funusedictionarydetails()
    this.fundictlist()
    // await this.funtreatmentplantemplates()
  },
  mounted () {
    let op = {}
    addPulmonary(op).then(res => { })
  },
  methods: {
    // 确认新增？修改
    show (flag, data) {
      this.innerVisible = true;
      this.flag = flag;

      if (flag == 'addfollow') {
        this.title = "新增随访";
      } else if (flag == 'details') {
        this.form = { ...data };
        this.title = "查看详情";

      }

    },
    // 是否展示
    isShow (title) {
      title = '查看详情' ? false : true
    },
    // 确定
    handlerSave () {
      this.$baseConfirm(`确认要${this.title}此项目吗？`, null, () => {
      })
    },
    //取消
    close () {
      this.innerVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },

    // 字典数据请求
    async funusedictionarydetails (params) {
      const res = await usedictionarydetails({ CategoryCode: ['A0021', 'A0003', 'A0013', 'A0014', 'A0015', 'A0016', 'A0017', 'A0001', 'A0022', 'A0026'], PageNumber: 1, PageSize: 90 })
      let { StatusCode, Message } = res
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
        } else if (item.CategoryCode == 'A0022') {
          this.A0022.push(item)
        } else if (item.CategoryCode == 'A0026') {
          this.A0026.push(item)
        } else if (item.CategoryCode == 'A0028') {
          this.A0028.push(item)

        }
      })


    },


  },
};


</script>

<style lang=scss scoped>
span {
  margin-left: 40px;
}
</style>