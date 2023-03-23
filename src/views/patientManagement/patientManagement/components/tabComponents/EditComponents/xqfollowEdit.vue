<template>
  <el-dialog :title="title" :visible.sync="innerVisible" :close-on-click-modal="false" width="82%" @close="close" top="20px"
    append-to-body>
	<div slot="title" class="dialog-title">
		<div class="sectionstly"></div>
		<span class="title-text">{{title}}</span>
		<div class="button-right">
			<span class="title-close" @click="close"></span>
		</div>
	</div>
    <el-form class="form_row" ref="form" :model="form"  label-width="170px"
      :hide-required-asterisk="title == '查看详情'">
      <div class="detailstitlo">      
        <p class="xqtitolstyle">基本信息</p>
    </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="随访方式" >
            <span>{{ form.FirstVisitTypeName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="随访日期" >
            <span>{{ form.FirstVisitDate| parseTime("{y}-{m}-{d}")  }}</span>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="患者类型">
            <span>{{ form.PatientTypeName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="耐药情况" >
            <span>{{ form.EnduranceName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="痰菌情况" >
            <span>{{ form.SputumName }}</span>

          </el-form-item>
        </el-col>

      

        <el-col :span="8">
          <el-form-item label="药品剂型" >
            <span>{{ form.DrugsTypeName }}</span>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="督导人员" >
            <span>{{ form.SupervisorName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="用法 " >
            <span>{{ form.DrugUsageName }}</span>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="日吸烟量">
            <span>{{ form.Smoking }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="建议日吸烟量"  >
            <span>{{ form.ProposalSmoking }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="取药时间" prop="DrugTime">
            <span>{{ form.DrugTime| parseTime("{y}-{m}-{d}")  }}</span>
          </el-form-item>
        </el-col>

        <!-- ？？？？组件 -->
        <el-col :span="8">
          <el-form-item label="取药地点" >
            <span>{{ form.DrugPlace }}</span>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item label="随访医生" >
            <span>{{ form.FollowDoctorName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="下次随访日期" >
            <span>{{ form.NextVisitDate| parseTime("{y}-{m}-{d}")  }}</span>
          </el-form-item>
        </el-col>


        <!-- 单选 -->
        <el-col :span="8">
          <el-form-item label="通风情况" >
            <span>{{ form.AerationName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- 单选 -->
        <el-col :span="8">
          <el-form-item label="单独居室" >
            <span>{{ form.AloneHonceName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="15">
          <el-form-item label="症状及体征" >
            <span>{{ form.SymptomName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
   


      <el-row :gutter="20">
    
        <div class="detailstitlo">      
        <p class="xqtitolstyle">健康教育教育情况</p>
    </div>
        <el-col :span="8">
          <el-form-item label="服药记录卡的填写" >
            <span>{{ form.RecordCardName }}</span>
          </el-form-item>
        </el-col>


        <el-col :span="8">
          <el-form-item label="服药方法及药品存放">
            <span>{{ form.MethodName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="肺结核治疗疗程" >
            <span>{{ form.ProcessName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="不规律服药危害" >
            <span>{{ form.HarmName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="服药后不良反应及处理" >
            <span>{{ form.AdverseReactionName }}</span>

          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="治疗期间复诊查痰" >
            <span>{{ form.SputumExaminationName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="外出期间如何坚持服药" >
            <span>{{ form.GoOutMedicationName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="生活习惯及注意事项" >
            <span>{{ form.LifehabitName }}</span>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="密切接触者检查" >
          
            <span>{{ form.CloseContactName }}</span>
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


// 获取详情


export default {
 
  name: "Edit",
  data() {
    return {
      title: "",
  
      innerVisible: false,
      flag: "",
      form: {
      
      },
      hasinfo: [],
      dictarr: [],
      copyform: {},
    
      firstVisitId:'',

    

    };
  },


  methods: {
 
   show(flag, data,formdata) {
      this.innerVisible = true;
      this.flag = flag;
      this.title = "初次随访详情";
      this.form={...formdata}
    },
  


    //取消
    close() {
      this.innerVisible = false;

      this.form = this.$options.data().form;
      this.$refs["form"].resetFields();
    },




  },

};
</script>

<style lang=scss scoped>
::v-deep .el-form-item__label {
  font-size: 16px;
  color: #999999 100%;

}

span {
  font-size: 16px;
  color: #252D57;
  margin-left: 10px;

}
</style>