
export default {
  data() {
    return {
      // 表单配置
      formConfig:{
        title:'',
        visible:false,
        width:'70%',
        opt:'',
        height:'50%',
        moduleId:'',
        tenantid:''
      },
      // 表单数据
      formData:{
        moduleId:"",
        parentId: 0,
        code: "",
        permissionName: "",
        isButton: true,
        isHide: true,
        isKeepAlive: true,
        func: "",
        orderSort: 0,
        icon: "",
        enabled: true,
        isLast: true,
        description: "",
        operatorNameFirst: "",
        operatorIdFirst: ""
      },
    };
  },
  methods:{
    //关闭弹框
    handleClose(){
      this.$refs.refForm.resetFields();
      this.formConfig.visible = false
    },
    // 初始化弹框，获取详情
    getDetail(param){
      if(param.opt == '' || param.opt == null){
        return this.$message.error('未知操作');
      }
      this.formConfig = Object.assign(this.formConfig,param);
      setTimeout(() => {
        this.formData = Object.assign(this.formData,param.row || param);
      }, 300);
      return
      if(this.formConfig.opt === 'detail'){
        var param = {
          tenantid:this.formConfig.tenantid,
          deptid:this.formConfig.deptid
        };
        this.$store
          .dispatch("function/postApi", {reqData: param,url: this.$URL.urls.GetDeptInfo,})
          .then((res) => {
            if(res.resultCode == -1){
              return this.$message.error(res.resultMessage)
            }
            this.formData = Object.assign(this.formData,res.result);
          });
        
      }
    }
  }
};