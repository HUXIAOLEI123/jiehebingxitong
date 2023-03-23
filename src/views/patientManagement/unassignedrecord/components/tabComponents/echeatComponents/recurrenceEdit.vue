<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="50%" @close="close"
    append-to-body>
     <el-form
      class="form_row"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
    <span class="headingstyles">档案信息</span>
    <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="档案编号" prop="age" >
<el-input v-model="form.age" placeholder="请输入内容" :disabled="title=='查看详情'" ></el-input>
  </el-form-item>
    </el-col>

  <el-col :span="10">
  <el-form-item label="姓名" prop="age">
<el-input v-model="form.age" placeholder="请输入内容" :disabled="title=='查看详情'" ></el-input>
  </el-form-item>
  </el-col>
</el-row>
   
      <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="证件号" prop="age">
<el-input v-model="form.age" placeholder="请输入内容" :disabled="title=='查看详情'" ></el-input>
  </el-form-item>
    </el-col>

  <el-col :span="10">
  <el-form-item label="转出机构" prop="name">
    <el-select v-model="form.name" placeholder="请输入内容"  :disabled="title=='查看详情'" >         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
  </el-form-item>
  </el-col>
</el-row>
   
  <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="联系电话" prop="age">
<el-input v-model="form.age" placeholder="请输入内容" :disabled="title=='查看详情'" ></el-input>
  </el-form-item>
    </el-col>

  <el-col :span="10">
  <el-form-item label="居住地址" prop="age">
<el-input v-model="form.age" placeholder="请输入内容" :disabled="title=='查看详情'" ></el-input>
  </el-form-item>
  </el-col>
</el-row>

  <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="建档日期" prop="age">
<el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期" :disabled="title=='查看详情'" >
    </el-date-picker>
  </el-form-item>
    </el-col>
</el-row>
<span>复发信息</span>
<el-row :gutter="20">
<el-col :span="10">
 <el-form-item label="治疗方案" prop="name">
    <el-select v-model="form.name" placeholder="请输入内容"  :disabled="title=='查看详情'" >         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
  </el-form-item>
  </el-col>
  
</el-row>

   
  <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="复发原因" prop="age">
<el-input v-model="form.age" placeholder="请输入内容" :disabled="title=='查看详情'" ></el-input>
  </el-form-item>
</el-col>

</el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handlerSave">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* api */
export default {
  name: "Edit",
  data() {
    return {
      title: "",
      value1: '',
      innerVisible: false,
      flag: "",
      form: {
      },
       options: [{
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '777'
      },
      ],
      //  表单验证
      rules: {
        age: [
          { required: true, message: "请输入角色编号", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ]

      },

    };
  },
  methods: {
    // 确认新增？修改
    show(flag, data) {
      this.innerVisible = true;
      this.form = { ...data };
      this.title = "复发";
   
        
      },
      // 确定
      handlerSave(){
        this.$refs["form"].validate((valid) => {
          if (!valid) return;
          this.$baseConfirm(`确认要${this.title}此项目吗？`, null, () => {
            this.$emit("recurrenceEdit", this.flag, this.form);
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
span{
  font-size: 20px;
  margin: 0px 0px 0px 0px;
  line-height: 20px;
}
</style>