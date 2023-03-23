<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="30%" @close="close"
    append-to-body>
    <el-form class="form_row" ref="form" :rules="rules" :model="form"  label-width="120px"  :hide-required-asterisk="title=='查看详情'">
    

 
  <el-form-item label="患者" prop="name" >
  <el-input v-model="form.name" placeholder="请输入内容" ></el-input>
  </el-form-item>

   
        <el-form-item label="结核病类型" prop="name" >
  <el-input v-model="form.name" placeholder="请输入内容" ></el-input>
  </el-form-item>
  
  

          <el-form-item label="不良反应症状" prop="name">
    <el-input v-model="form.name" placeholder="请输入内容" ></el-input>
          </el-form-item>
    

          <el-form-item label="处置意见" prop="name">
    <el-input v-model="form.checkbox"  type="textarea" placeholder="请输入内容" ></el-input>
          </el-form-item>
  

 


  
    </el-form>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handlerSave" >确 定</el-button>
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
      checkbox: '',
      innerVisible: false,
      flag: "",
      form: {
        age10:[]
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
        name: [
          { required: true, message: "请输入角色编号", trigger: "blur" },
        ],
        charactername: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
  type:[
        { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
          ],

      },
      
    };
  },
  methods: {
    // 确认新增？修改
    show(flag, data) {
      this.innerVisible = true;
      this.flag = flag;
       
      if(flag=='addfollow'){
         this.title = "新增随访";
      }else if(flag=='details'){
       this.form = { ...data };
         this.title = "查看详情";
          
      }
      
      },
      // 确定
      handlerSave(){
        this.$refs["form"].validate((valid) => {
          if (!valid) return;
          this.$baseConfirm(`确认要${this.title}此项目吗？`, null, () => {
            this.$emit("edit", this.flag, this.form);
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
  margin-left: 40px;
}
::v-deep  .el-dialog__body{
  padding: 20px 20px;
}
</style>