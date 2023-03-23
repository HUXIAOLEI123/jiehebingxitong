<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="50%" @close="close"
    append-to-body>
     <div slot="title" class="dialog-title">
           <div class="sectionstly"></div>
           <span class="title-text">{{title}}</span>
           <div class="button-right">
             <span class="title-close" @click="close"></span>
           </div>
       </div>
     <el-form
      class="form_row"
      ref="form"
      :model="form"
      label-width="120px"
    >
    <span class="headingstyles">档案信息</span>
    <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="档案编号" >
<el-input v-model="form.FileNumber" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
    </el-col>

  <el-col :span="10">
  <el-form-item label="姓名" >
<el-input v-model="form.Name" placeholder="请输入内容" disabled></el-input>
  </el-form-item>
  </el-col>
</el-row>
   
<el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="证件号" >
<el-input v-model="form.CardNo" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
    </el-col>

<!--  -->
  <el-col :span="10">
  <el-form-item label="转出机构" >
  <el-input v-model="form.CardNo" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
  </el-col>
</el-row>
   
  <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="联系电话" >
<el-input v-model="form.Phone" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
    </el-col>

  <el-col :span="10">
  <el-form-item label="居住地址" >
<el-input v-model="form.Address" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
  </el-col>
</el-row>

<!--  -->
  <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="建档日期" >
<el-input v-model="form.Address" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
    </el-col>
</el-row>

<span class="headingstyles">结案评估信息</span>
<el-row :gutter="20">
<el-col :span="10">
<!-- 评估？？ -->
  <el-form-item label="结案机构" >
<el-input v-model="form.Address" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
  </el-col>

<!--  -->
  <el-col :span="10">   
  <el-form-item label="结案日期" >
<el-input v-model="form.Address" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
    </el-col>
</el-row>
<!--  -->
<el-row :gutter="20">
<el-col :span="10">
  <el-form-item label="结案人员" >
    <el-select v-model="form.name" placeholder="请输入内容" disabled >         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
        </el-option>
      </el-select>
  </el-form-item>
  </el-col>

<!--  -->
 <el-col :span="10">   
  <el-form-item label="停止治疗时间" >
<el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择时间" >
    </el-date-picker>
  </el-form-item>
    </el-col>
</el-row>

  <el-row :gutter="20">
  <el-col :span="10">   
  <el-form-item label="治疗方案" >
<el-input v-model="form.TreatmentPlanName" placeholder="请输入内容" disabled ></el-input>
  </el-form-item>
    </el-col>

<!--  -->
  <el-col :span="10">
  <el-form-item label="是否确认结果" >
    <el-select v-model="form.name" placeholder="请输入内容"  >         
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
  </el-form-item>
  </el-col>
</el-row>
    </el-form>
    <div slot="footer">
      <el-button class="cancelbtn"  @click="close">取 消</el-button>

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
  

    };
  },
  methods: {
    // 确认新增？修改
    show(flag, data) {
    this.innerVisible = true;
    this.form = { ...data };
     this.title = "结案评估";        
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
</style>