<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="80%" @close="close"
    append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{title}}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" label-width="170px"
      :hide-required-asterisk="title == '查看详情'">
      <div class="detailstitlo">
        <p class="xqtitolstyle">基本信息</p>
      </div>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="随访方式" prop="FirstVisitType">
            <el-select v-model="form.VisitType" placeholder="请输入内容">
              <el-option v-for="item in A0022" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="随访日期" prop="VisitDate">
            <el-date-picker v-model="form.VisitDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>


        <el-col :span="7">
          <el-form-item label="患者类型" prop="PatientTypeName">
            <el-select v-model="form.PatientType" placeholder="请输入内容">
              <el-option v-for="item in A0014" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="耐药情况" prop="Endurance">
            <el-select v-model="form.Endurance" placeholder="请输入内容">
              <el-option v-for="item in A0024" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="痰菌情况" prop="Sputum">
            <el-select v-model="form.Sputum" placeholder="请输入内容">
              <el-option v-for="item in A0015" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>



        <el-col :span="7">
          <el-form-item label="药品剂型" prop="DrugsType">
            <el-select v-model="form.DrugsType" placeholder="请输入内容">
              <el-option v-for="item in A0025" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="督导人员" prop="Supervisor">
            <el-select v-model="form.Supervisor" placeholder="请输入内容">
              <el-option v-for="item in A0026" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="用法 " prop="DrugUsage">
            <el-select v-model="form.DrugUsage" placeholder="请输入内容">
              <el-option v-for="item in A0027" :key="item.DetailsCode" :label="item.DetailsName"
                :value="item.DetailsCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="7">
          <el-form-item label="日吸烟量">
            <el-input v-model="form.Smoking" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">

        <el-col :span="7">
          <el-form-item label="建议日吸烟量">
            <el-input v-model="form.ProposalSmoking" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="取药时间" prop="DrugTime">
            <el-date-picker v-model="form.DrugTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- ？？？？组件 -->
        <el-col :span="7">
          <el-form-item label="取药地点" prop="DrugPlace">
            <el-input v-model="form.DrugPlace" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="7">
          <el-form-item label="随访医生" prop="ResponsibilityName">
            <el-input v-model="form.ResponsibilityName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="下次随访日期" prop="NextVisitDate">
            <el-date-picker v-model="form.NextVisitDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>


        <!-- 单选 -->
        <el-col :span="10">
          <el-form-item label="通风情况" prop="Aeration">
            <el-radio-group v-model="form.Aeration">
              <el-radio v-for="item in A0028" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- 单选 -->
        <el-col :span="7">
          <el-form-item label="单独居室" prop="AloneHonce">
            <el-radio-group v-model="form.AloneHonce">
              <el-radio v-for="item in A0002" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- 多选 -->
        <el-col :span="22">
          <el-form-item label="症状及体征" prop="Symptom">
            <el-checkbox-group v-model="form.Symptom">
              <el-checkbox v-for="item in A0023" :key="item.DetailsCode" :label="item.DetailsCode">{{item.DetailsName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <!-- 列表单选 -->
        <el-col :span="24">
          <div class="detailstitlo">
            <p class="xqtitolstyle">健康教育教育情况</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="服药记录卡的填写" prop="RecordCard">
            <el-radio-group v-model="form.RecordCard">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>


        <el-col :span="12">
          <el-form-item label="服药方法及药品存放" prop="Method">
            <el-radio-group v-model="form.Method">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="肺结核治疗疗程" prop="Process">
            <el-radio-group v-model="form.Process">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="不规律服药危害" prop="Harm">
            <el-radio-group v-model="form.Harm">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="12">
          <el-form-item label="服药后不良反应及处理" prop="AdverseReaction">
            <el-radio-group v-model="form.AdverseReaction">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="治疗期间复诊查痰" prop="SputumExamination">
            <el-radio-group v-model="form.SputumExamination">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="外出期间如何坚持服药" prop="GoOutMedication">
            <el-radio-group v-model="form.GoOutMedication">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="生活习惯及注意事项" prop="Lifehabit">
            <el-radio-group v-model="form.Lifehabit">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="密切接触者检查" prop="CloseContact">
            <el-radio-group v-model="form.CloseContact">
              <el-radio v-for="item in A0029" :key="item.DetailsCode" :label="item.DetailsCode">{{ item.DetailsName }}
              </el-radio>
            </el-radio-group>
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
import { usedictionarydetails } from '@/api/dict.js'

// 获取详情
// api
import { firstPulmonaryVisit, followPulmonaryVisit } from '@/api/supervisoryWorkManagement/follow-upManagement'

export default {

  name: "Ceshi",
  data() {
    return {
      title: "",
      checkbox: '',
      innerVisible: false,
      flag: "",
      form: {
        Symptom: []
      },
      hasinfo: [],
      dictarr: [],
      copyform: {},
      A0002: [],
      A0014: [],
      A0015: [],
      A0022: [], A0023: [], A0024: [], A0025: [], A0026: [], A0027: [], A0028: [], A0029: [],
      firstVisitId: '',

      //  表单验证
      rules: {
        FirstVisitType: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        charactername: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Endurance: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Sputum: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        PatientType: [{ required: true, message: "请选择", trigger: "change" }]
        ,
        DrugsType: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Supervisor: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        DrugUsage: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        DrugTime: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        DrugPlace: [
          { required: true, message: "请输入", trigger: "blur" },
        ],

        FollowDoctor: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        NextVisitDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Aeration: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        AloneHonce: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Symptom: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        RecordCard: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Method: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Process: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        Harm: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        AdverseReaction: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        SputumExamination: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        GoOutMedication: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        Lifehabit: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        CloseContact: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },

    };
  },
  methods: {
    // 字典
    async funusedictionarydetails() {
      const res = await usedictionarydetails({ CategoryCode: ['A0002', 'A0014', 'A0015', 'A0022', 'A0023', 'A0024', 'A0025', 'A0026', 'A0027', 'A0028', 'A0029',], PageNumber: 1, PageSize: 400 })
      this.dictarr = res.Response.items

    },

    //字典数据处理
    fundictlist() {
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
        }
      })


    },



    // 确认新增？修改
    show(flag, data, formdata) {
      this.innerVisible = true;
      this.flag = flag;
      if (flag == 'addfollow') {
        this.title = "新增随访";

      } else if (flag == 'details') {
        this.title = "查看详情";
        this.firstVisitId = data.VisitId
        this.form = { ...data };

      } else if (flag == 'Modify') {
        this.title = "修改";
        this.firstVisitId = data.VisitId
        this.form = { ...formdata };
        this.copyform = { ...formdata }

      }
    },

    //新增访问的操作
    handlerSave(row) {
      //弹框
      this.$confirm(`你确定新增${row.Name}访问?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //向服务器发请求
          // let op = [row.InterruptId]
          // let result = await deletesmanagementist(op);
          let option = this.form
          let result = firstPulmonaryVisit(option)
          //如果新增成功
          if (result.StatusCode == 200) {
            this.$message({
              type: "success",
              message: "新增成功!",
            });
            //再次获取人员列表数据  this.list.length > 1 ? this.page : this.page - 1
            // this.getListInfo();
            getListInfo()
          }
        })
        .catch(() => {
          //当用户点击取消按钮的时候会触发
          this.$message({
            type: "info",
            message: "已取消删除",
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

  async created() {
    // 字典
    await this.funusedictionarydetails()
    this.fundictlist()


  },
};
</script>

<style lang=scss scoped>

</style>