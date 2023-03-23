<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="50%"
    @close="close"
  >
  <div class="heaer"></div>
    <el-form
      class="form_row"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
    <span class="headingstyles">结案信息</span>
	<el-row :gutter="20">
  <el-col :span="10">
   <el-form-item label="档案编号" prop="Serialnumber">
  <el-input v-model="form.Serialnumber" placeholder="请输入内容"></el-input>
  </el-form-item>
  </el-col>

  <el-col :span="10">
   <el-form-item label="姓名" prop="name">
            <el-input v-model="form.sex" placeholder="请输入内容"></el-input>
    </el-form-item></el-col>
</el-row>


	<el-row :gutter="20">
  <el-col :span="10">
   <el-form-item label="证件号" prop="Idcard">
  <el-input v-model="form.sex" placeholder="请输入内容"></el-input>
  </el-form-item>
  </el-col>

  <el-col :span="10">
   <el-form-item label="转出机构" prop="mechanism">
          <el-select v-model="form.faultType2" placeholder="请输入内容">
              <!-- 注意使用字典 -->
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
    </el-form-item>
  </el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="10">
   <el-form-item label="联系电话" prop="Thephone">
  <el-input v-model="form.sex" placeholder="请输入内容"></el-input>
  </el-form-item>
  </el-col>

  <el-col :span="10">
   <el-form-item label="居住地址" prop="Residentialaddress">
       <el-input v-model="form.sex" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-col>
</el-row>

	<el-row :gutter="20">
  <el-col :span="12">
   <el-form-item label="建档日期" prop="Documentdate">
     <el-date-picker
      v-model="value1"
      type="datetime"
	  align="center"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
  </el-col>
</el-row>

<span class="headingstyles">结案评估信息</span>
	<el-row :gutter="20">
  <el-col :span="10">
   <el-form-item label="结案机构" prop="organization">
          <el-select v-model="form.faultType2" placeholder="请输入内容">
              <!-- 注意使用字典 -->
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
    </el-form-item>
  </el-col>
  
    <el-col :span="10">
   <el-form-item label="结案日期" prop="Applicationdate">
         <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
  </el-col>
</el-row>

	<el-row :gutter="20">
  <el-col :span="10">
   <el-form-item label="结案人员" prop="personnel">
          <el-select v-model="form.faultType2" placeholder="请输入内容">
              <!-- 注意使用字典 -->
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
    </el-form-item>
  </el-col>
  
    <el-col :span="10">
   <el-form-item label="停止治疗时间" prop="reason">
       <el-input v-model="form.sex" placeholder="请输入内容"></el-input>
    </el-form-item>
  </el-col>
</el-row>

<el-row :gutter="20">
  <el-col :span="10">
   <el-form-item label="治疗方案" prop="Treatmentoptions">
          <el-select v-model="form.faultType2" placeholder="请输入内容">
              <!-- 注意使用字典 -->
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
    </el-form-item>
  </el-col>

  <el-col :span="10">
   <el-form-item label="是否确认结果" prop="theresults">
          <el-select v-model="form.faultType2" placeholder="请输入内容">
              <!-- 注意使用字典 -->
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
      // 弹窗的开关
      dialogVisible: false,
      flag: "",
      // 日期数据
      value1:'',
      form: {
       },
       // 复选框的数据（实际是使用表格中传输过来的数据）
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
        Serialnumber: [
          { required: true, message: "请输入档案编号", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        Idcard: [
          { required: true, message: "请输字证件号", trigger: "blur" },
        ],

        mechanism: [
          { required: true, message: "请输入转出机构", trigger: "change" },
					],
         Thephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }],
   Residentialaddress: [
          { required: true, message: "请输入居住地址", trigger: "blur" }],
      
         Documentdate: [
          { required: true, message: "请输入建档日期", trigger: "change" },
					],

 organization: [
          { required: true, message: "请输入转入机构", trigger: "change" },
					],

           Applicationdate: [
          { required: true, message: "请输入申请日期", trigger: "change" },
					],

           personnel: [
          { required: true, message: "请输入申请人员", trigger: "blur" },
					],

           reason: [
          { required: true, message: "申请原因", trigger: "blur" },
					],


      },
      // 职务等级下拉列表
      titleLevelList: [],
      restaurants: [],
    };
  },
  methods: {
    // 确认新增？修改
    show(flag, data){
      this.dialogVisible = true;
      this.flag = flag;
        this.title = "结案信息";
        // 将选择修改的表格数据复制到页面渲染
        this.form = { ...data };	
      

        // 派发请求
        this.$baseMessage('转出成功', 'success')	  
  
    },
    // 确定
    handlerSave(){
      this.$refs["form"].validate((valid) =>{
        if (!valid) return;
        this.$baseConfirm(`确认要${this.title}此项目吗？`,null,()=>{
          this.$emit("caseEdit", this.flag, this.form);
          this.close();
        });
      });
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

</style>