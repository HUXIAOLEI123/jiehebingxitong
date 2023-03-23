<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="50%"
    @close="close"
  >

<div class="content">
  <!-- 用户基本信息 -->
  <h3>基本详情</h3>
<el-row :gutter="20">
  <el-col :span="8">
  <span>姓名:</span> <span class="spn">{{form.name}}</span>
  </el-col>
  <el-col :span="8">
  <span>性别:</span> <span class="spn">{{form.sex}}</span>
  </el-col>
 <el-col :span="8">
  <span>年龄:</span> <span class="spn">{{form.age}}</span>
  </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8">
  <span>证件号:</span> <span class="spn">{{form.idcard}}</span>
  </el-col>
  <el-col :span="8">
  <span>居住地址:</span> <span class="spn">{{form.address}}</span>
  </el-col>
 <el-col :span="8">
  <span>结核病类型:</span> <span class="spn">{{form.ger}}</span>
  </el-col>
</el-row>
  
  <!-- 就诊记录 -->



</div>

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
      // 弹窗的开关
      dialogVisible: false,
      flag: "",
      // 日期数据
      value1:'',
      form: {
       },
     
    };
  },
  methods: {
    // 确认新增？修改
    show(flag, data){
      this.dialogVisible = true;
      this.flag = flag;
     
        // 将选择修改的表格数据复制到页面渲染
        this.form = { ...data };	
      
   this.title = `病例信息`;
        // 派发请求
        this.$baseMessage('转出成功', 'success')	  
  
    },
    // 确定
    handlerSave(){
    
    this.close();
    },


    //取消
    close() {
      this.dialogVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;    
      this.$refs["form"].resetFields();
    },

  
  },
};
</script>

<style lang=scss scoped>
.el-row {
    margin-bottom: 20px;}

.spn{
color: #252D57;
}


.content{
    width: 100%;
    margin-right: 100px;
    // height: 600px
     background: white;
    box-shadow: 0px 10px 20px 1px rgba(0, 0, 0, 0.0500);
    border-radius: 10px 10px 10px 10px;
    opacity: 1;
    border: 1px solid #D8D8D8;
    padding-left: 20px;
    // 溢出滚动
    overflow: auto;
    padding: 0 20px 20px 20px;
}



</style>