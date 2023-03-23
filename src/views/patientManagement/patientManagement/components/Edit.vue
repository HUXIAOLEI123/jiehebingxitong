<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" width="85%" top="1vh" @close="close">
    <div class="content">
      <!-- 用户基本信息 -->
      <h2>基本详情</h2>
      <el-row :gutter="10">
        <el-col :span="3">
          <span>姓名:</span>
          <span class="spn">{{ form.name }}</span>
        </el-col>
        <el-col :span="4">
          <span>性别:</span>
          <span class="spn">{{ form.sex }}</span>
        </el-col>
        <el-col :span="3">
          <span>年龄:</span>
          <span class="spn">{{ form.age }}</span>
        </el-col>
        <el-col :span="6">
          <span>证件号:</span>
          <span class="spn">{{ form.idcard }}</span>
        </el-col>
        <el-col :span="8">
          <span>居住地址:</span>
          <span class="spn">{{ form.age }}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="3">
          <span>服药状态:</span>
          <span class="spn">{{ form.name }}</span>
        </el-col>

        <el-col :span="4">
          <span>结核病类型:</span>
          <span class="spn">{{ form.ger }}</span>
        </el-col>

        <el-col :span="3">
          <span>医生:</span>
          <span class="spn">{{ form.address }}</span>
        </el-col>

        <el-col :span="9">
          <span>治疗方案:</span>
          <span class="spn">{{ form.address }}</span>
        </el-col>
      </el-row>

      <!-- tab栏 -->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first" :lazy="true">
            <div class="tabbox">
              <Basictab1 :inputData="form"></Basictab1>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服药监督" name="second" :lazy="true">
            <div class="tabbox">
              <Medicinetab2 :inputData="form"></Medicinetab2>
            </div>
          </el-tab-pane>

          <el-tab-pane label="不良反应" name="third" :lazy="true">
            <div class="tabbox">
              <AdverseReactionstab3 :inputData="form"></AdverseReactionstab3>
            </div>
          </el-tab-pane>
          <el-tab-pane label="中断服药" name="fourth" :lazy="true">
            <div class="tabbox">
              <Interrupttab4 :inputData="form"></Interrupttab4>
            </div>
          </el-tab-pane>
          <el-tab-pane label="痰菌检查" name="fourth1" :lazy="true">
            <div class="tabbox">
              <Checktab5 :inputData="form"></Checktab5>
            </div>
          </el-tab-pane>
          <el-tab-pane label="分子生物学检测" name="fourth2" :lazy="true">
            <div class="tabbox">
              <MolecularBiologytab6 :inputData="form"></MolecularBiologytab6>
            </div>
          </el-tab-pane>
          <el-tab-pane label="耐药" name="fourth3" :lazy="true">
            <div class="tabbox">
              <Resistancetab7 :inputData="form"></Resistancetab7>
            </div>
          </el-tab-pane>
          <el-tab-pane label="胸片" name="fourth4" :lazy="true">
            <div class="tabbox">
              <Chesttab8 :inputData="form"></Chesttab8>
            </div>
          </el-tab-pane>
          <el-tab-pane label="肝功能" name="fourth5" :lazy="true">
            <div class="tabbox">
              <Liverttab9 :inputData="form"></Liverttab9>
            </div>
          </el-tab-pane>
          <el-tab-pane label="随访记录" name="fourth6" :lazy="true">
            <div class="tabbox">
              <Followuptab10 :inputData="form"></Followuptab10>
            </div>
          </el-tab-pane>
          <el-tab-pane label="治疗方案" name="fourth7" :lazy="true">
            <div class="tabbox">
              <TreatmentOptions11 :inputData="form"></TreatmentOptions11>
            </div>
          </el-tab-pane>
          <el-tab-pane label="结案登记" name="fourth8" :lazy="true">
            <div class="tabbox">
              <caseregistrationtab12 :inputData="form"></caseregistrationtab12>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </el-dialog>
</template>
<script>
import Basictab1 from "./tabComponents/basictab1.vue";
import Medicinetab2 from "./tabComponents/medicinetab2.vue";
import AdverseReactionstab3 from "./tabComponents/adverseReactionstab3.vue";
import Interrupttab4 from "./tabComponents/interrupttab4.vue";
import Checktab5 from "./tabComponents/checktab5.vue";
import MolecularBiologytab6 from "./tabComponents/molecularBiologytab6.vue";
import Resistancetab7 from "./tabComponents/resistancetab7.vue";
import Chesttab8 from "./tabComponents/chesttab8.vue";
import Liverttab9 from "./tabComponents/liverttab9.vue";
import Followuptab10 from "./tabComponents/follow-uptab10.vue";
import TreatmentOptions11 from "./tabComponents/treatmentOptions11.vue";
import caseregistrationtab12 from "./tabComponents/caseregistrationtab12.vue";
export default {
  name: "Edit",
  components: { Basictab1, Medicinetab2, AdverseReactionstab3, Interrupttab4, Checktab5, MolecularBiologytab6, Resistancetab7, Chesttab8, Liverttab9, Followuptab10, TreatmentOptions11, caseregistrationtab12 },
  data () {
    return {
      title: "",
      dialogVisible: false,
      flag: "",
      value1: '',
      form: {},
      activeName: 'second'
    };
  },
  methods: {
    // 确认新增？修改
    show (flag, data) {
      this.dialogVisible = true;
      this.flag = flag;
      this.form = { ...data };
      this.title = `患者详情`;
      // 派发请求
      this.$baseMessage('转出成功', 'success')
    },
    // tab栏点击事件
    handleClick (tab, event) {
    },
    //取消
    close () {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;
    },
  },
};
</script>

<style lang=scss scoped>
h2 {
  color: #000;
}
.el-row {
  margin: 30px 0;
}
span {
  font-size: 16px;
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  font-weight: 400;
  color: #999999;
}
.spn {
  color: #252d57;
}

.content {
  width: 100%;
  margin-right: 100px;
  // height: 600px
  background: white;
  box-shadow: 0px 10px 20px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  border: 1px solid #d8d8d8;
  padding-left: 20px;
  // 溢出滚动
  overflow: auto;
  padding: 0 20px 20px 20px;
}

.tabbox {
  width: 100%;
  //  height: 900px;
  // background:pink;
}
</style>