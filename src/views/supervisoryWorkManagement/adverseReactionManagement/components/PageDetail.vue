<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="35%" @close="close" append-to-body>
    <div slot="title" class="dialog-title">
      <div class="sectionstly"></div>
      <span class="title-text">{{ title }}</span>
      <div class="button-right">
        <span class="title-close" @click="close"></span>
      </div>
    </div>
    <el-form class="form_row" ref="form" :model="form" status-icon label-width="120px">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="患者姓名:">
            <span>{{ form.Name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="结核病类型:">
            <span>{{ form.DiagnosisTypeName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="不良反应症状:">
            <span>{{ form.AdverseReactionName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="20" v-if="form.AdverseReactionOther">
          <el-form-item label="其他不良反应:">
            <span>{{ form.AdverseReactionOther }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="不良反应时长:">
            <span>{{ form.AdverseReactiondurationName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="处置时间:">
            <span>{{ form.ManagementTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="处置意见:">
            <span>{{ form.ManagementMethod }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn" @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "Edit",
  data () {
    return {
      title: "",
      innerVisible: false,
      form: {},
    };
  },
  methods: {
    // 确认新增？修改
    show (data) {
      this.innerVisible = true;
      this.form = {
        ...data
      };
      this.title = "不良反应详情";
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
