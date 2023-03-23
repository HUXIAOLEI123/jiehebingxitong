<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="35%" @close="close" append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" :rules="rules" status-icon label-width="120px">
      <span class="headingstyles">档案信息</span>

      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="结核病类型" prop="DiagnosisTypeName">
            <el-select v-model="form.DiagnosisTypeName">
              <el-option v-for="item in A0013" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="不良反应时长" prop="AdverseReactiondurationName">
            <el-select v-model="form.AdverseReactiondurationName">
              <el-option v-for="item in A0020" :key="item.DetailsCode" :label="item.DetailsName" :value="item.DetailsCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="处置意见" prop="ManagementMethod">
            <el-input type="textarea" v-model="form.ManagementMethod" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
      <el-button class="savebtn" type="primary" @click="handlerSave">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { pulmonaryinterruptsconfirm } from '@/api/PulmonaryInterrupt.js'
// 字典
import { usedictionarydetails } from '@/api/dict.js'
export default {
  name: "Edit",
  data () {
    return {
      title: "",
      innerVisible: false,
      flag: "",
      form: {
      },

      //  表单验证
      rules: {
        Name: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        DiagnosisTypeName: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        AdverseReactionName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        AdverseReactiondurationName: [
          { required: true, message: "请选择", trigger: "change" },
        ],

        ManagementMethod: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      dictarr: [],
      //  结核病类型
      A0013: [],
      //  反应时长
      A0020: []
    };
  },
  async created () {


    await this.funusedictionarydetails()
    this.fundictlist()


  },
  methods: {
    // 确认新增？修改
    show (data) {
      this.innerVisible = true;
      this.form = { ...data };
      this.title = "中断服药确认";




    },

    // 字典数据 +处理
    async funusedictionarydetails () {
      const res = await usedictionarydetails({ CategoryCode: ['A0013', 'A0020'], PageNumber: 1, PageSize: 30 })
      this.dictarr = res.Response.items

    },

    fundictlist () {
      this.dictarr.forEach(item => {
        if (item.CategoryCode == 'A0013') {
          this.A0013.push(item)
        } else if (item.CategoryCode == 'A0020') {
          this.A0020.push(item)
        }
      })
    },
    // 确定
    handlerSave () {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, async () => {
          let InterruptId = this.form.InterruptId;
          const res = await pulmonaryinterruptsconfirm([InterruptId])
          let { StatusCode, Message } = res
          if (StatusCode != 200) {
            return this.$baseMessage(
              Message || '确认失败', 'error'
            )
          }
          this.$baseMessage('确认成功', "success")
          this.close();
        });
      });

    },


    //取消
    close () {
      this.innerVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },


  },
};
</script>

<style lang=scss scoped>
/* span {
  font-size: 20px;
  margin: 0px 0px 0px 0px;
  line-height: 20px;
} */
</style>