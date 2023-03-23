<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="60%" @close="close"
    append-to-body>
    <el-form class="form_row" ref="form" :rules="rules" :model="form"  label-width="120px"  :hide-required-asterisk="title=='查看详情'">
    
<span class="headingstyles">基本信息</span>

 <el-row :gutter="20">
   <el-col :span="12" >
  <el-form-item label="患者选择" prop="name" >
  <el-input v-model="form.name" placeholder="输入+选择（姓名+证件号）" :disabled="title=='查看详情'"></el-input>
  </el-form-item>
   </el-col>
 </el-row>
   <el-row :gutter="20">
        <el-col :span="7" >
          <el-form-item label="随访方式" prop="name" >
             <el-select v-model="form.name" placeholder="请输入内容" :disabled="title=='查看详情'">         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      <el-col :span="7">
          <el-form-item label="患者类型" prop="name">
             <el-select v-model="form.name" placeholder="请输入内容" :disabled="title=='查看详情'">         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


         <el-col :span="7">
          <el-form-item label="菌痰情况" prop="name">
             <el-select v-model="form.name" placeholder="请输入内容" :disabled="title=='查看详情'">         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
  
  <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="耐药情况" prop="name">
             <el-select v-model="form.name" placeholder="请输入内容" :disabled="title=='查看详情'">         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      <el-col :span="7">
          <el-form-item label="督导人员" prop="name">
             <el-select v-model="form.name" placeholder="请输入内容" :disabled="title=='查看详情'">         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>


         <el-col :span="7">
          <el-form-item label="下次随访日期" prop="name">
             <el-select v-model="form.name" placeholder="请输入内容" :disabled="title=='查看详情'">         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

  <el-form-item label="状态及体征"  prop="type">
    <el-checkbox-group v-model="form.age10" :disabled="title=='查看详情'">
      <el-checkbox label="无症状" name="type" ></el-checkbox>
      <el-checkbox label="咳嗽吐痰" name="type"></el-checkbox>
      <el-checkbox label="低热盗汗" name="type"></el-checkbox>
      <el-checkbox label="头痛失眠" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

<el-row :gutter="20">
<el-col :span="10">
  <el-form-item label="吸烟习惯" prop="type">
    <el-radio-group v-model="form.age11" :disabled="title=='查看详情'">
      <el-radio label="经常"></el-radio>
      <el-radio label="偶尔"></el-radio>
      <el-radio label="从不"></el-radio>   
    </el-radio-group>
  </el-form-item></el-col>
<el-col :span="10">
  <el-form-item label="饮酒习惯" prop="type">
    <el-radio-group v-model="form.age11" :disabled="title=='查看详情'">
      <el-radio label="经常"></el-radio>
      <el-radio label="偶尔"></el-radio>
      <el-radio label="从不"></el-radio>   
    </el-radio-group>
  </el-form-item></el-col>
</el-row>

  <el-row :gutter="20">
 
  <el-col :span="7">
   <el-form-item label="独居" prop="type">
    <el-radio-group v-model="form.age12" :disabled="title=='查看详情'">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>   
    </el-radio-group>
  </el-form-item>
  </el-col>
    <el-col :span="7">
   <el-form-item label="通风" prop="type">
    <el-radio-group v-model="form.age12" :disabled="title=='查看详情'">
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
</style>