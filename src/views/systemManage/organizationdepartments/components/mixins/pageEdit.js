export default {
  data() {
    return {
      // 表单配置
      formConfig:{
        title:'',
        visible:false,
        width:'60%',
        renderView:true,
        opt:'',
        height:'70%',
        moduleId:'',
        tenantid:'',
        parentCodeList:[]
      },
      tableData: [],
      tenantData: [],
      // 表单数据
      formData:{
        organizationCode:"",
        departmentName:"",
        parentCode:"",
        codeRelationShip:"",
        leader:"",
        moduleId:'3',
        orderSort:"",
        isLast:"",
        isBook:"",
        status:"",
        departmentCode:"",
      },
      // 验证规则
      formRules:{
        departmentName: { required: true, message: '部门名称不能为空', trigger: 'blur' },
        organizationCode: { required: true, message: '机构信息不能为空', trigger: 'blur' },
      },

    };
  },
  methods:{
    // 获取部门信息列表
    getDepEnum() {
      this.$store
        .dispatch("function/getApi", {
          reqData: {OrganizationCode:this.formData.organizationCode},
          url: 'api/organizationdepartments',
        })
        .then((res) => {
          this.tableLoading = false;
          this.tableData = res.result;
        });
    },
    // 获取机构列表
    getTenantEnum() {
      this.$store
        .dispatch("function/postApi", {
          reqData: {},
          url: '/api/tenant/GetTenantUserList',
        })
        .then((res) => {
          this.tenantData = res.result;
        });
    },
    //选择机构
    selectOrganizationCode(){
      this.formConfig.parentCodeList = [];
      this.tableData = [];
      this.getDepEnum();
    },
    //递归
    convert(pid, arr) {
      let resultarr = arr.filter(p=>p.parentCode == pid);
      if (resultarr.length > 0) {
        resultarr.forEach((item) => {
          if(this.convert(item.departmentCode, arr).length>0){
            item.children = [];
            item.children = this.convert(item.departmentCode, arr)
          }
        });
      }
      return resultarr;
    },
    //关闭弹框
    handleClose(){
      this.$refs.refForm.resetFields();
      this.formConfig.parentCodeList = []
      this.formConfig.visible = false
    },
    // 提交
    submit(){
      this.$refs.refForm.validate((valid) => {
        if (valid) {
          this.formData.status = this.formData.status?"0":'1'
          if(this.formConfig.parentCodeList.length>0){
            if(this.formConfig.parentCodeList.length>1){
              this.formData.parentCode = this.formConfig.parentCodeList[this.formConfig.parentCodeList.length-1];
            }else{
              this.formData.parentCode = 0;
            }
            this.formData.codeRelationShip = this.formConfig.parentCodeList.join(",")
          }
          if(this.formConfig.opt === 'add'){
            this.$store
            .dispatch("function/postApi", {reqData: this.formData,url: 'api/organizationdepartments',})
            .then((res) => {
              if(res.resultCode == -1){
                return this.$message.error(res.resultMessage)
              }
              this.$message.success('新增成功');
              this.$emit('submit')
              this.handleClose();
            });
          }else{
            this.$store
            .dispatch("function/patchApi", {reqData: this.formData,url: "api/organizationdepartments/" + this.formData.departmentCode,})
            .then((res) => {
              if(res.resultCode == -1){
                return this.$message.error(res.resultMessage)
              }
              this.$message.success('编辑成功');
              this.$emit('submit')
              this.handleClose();
            });
          }
        }
      });
    },
    // 初始化弹框，获取详情
    getDetail(param){
      if(param.opt == '' || param.opt == null){
        return this.$message.error('未知操作');
      }
      this.getDepEnum();//查询部门信息
      this.getTenantEnum();
      this.formConfig = Object.assign(this.formConfig,param);
      // 编辑之前先去查询详情
      if (this.formConfig.opt === "edit") {
        this.$store
          .dispatch("function/getApi", {
            reqData: {departmentCode :param.departmentCode },
            url: 'api/organizationdepartments/' + param.departmentCode ,
          })
          .then((res) => {
            if(res.resultCode =='-1'){
              return this.$message.error(res.resultMessage)
            }
            this.formData = Object.assign(this.formData, res.result);
            this.formData.status = this.formData.status=='1'?false:true
            this.formData.organizationCode = Number(res.result.organizationCode);
            this.formConfig.parentCodeList = res.result.codeRelationShip.split(",");
          });
      }
    }
  }
};