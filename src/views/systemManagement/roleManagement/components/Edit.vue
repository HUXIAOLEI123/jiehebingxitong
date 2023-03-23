<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    @close="close"
  >
    <el-form
      class="form_row"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
		
      <el-form-item label="角色编号" prop="roleName">
        <el-input
          v-model="form.roleName"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
   
      <el-form-item label="角色名称" prop="charactername">
        <el-input v-model="form.charactername" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="字符权限" prop="roleKey">
        <el-input
          v-model="form.roleKey"
          placeholder="请输入字符权限"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
      v-model="form.status"
      active-value="1"
     inactive-value="0"
      active-text="启用"
     inactive-text="关闭"
     @change="handleChangeStatus"
     >
</el-switch>
        <!-- <el-input
          v-model="form.status"
          placeholder="请输入状态"
        ></el-input> -->
      </el-form-item>

	  <el-form-item label="创建时间" prop="timer">
        <el-input
          v-model="form.timer"
          placeholder="请输入创建时间"
        ></el-input>
      </el-form-item>	

		  <el-form-item label="其他" prop="address">
        <el-input
          v-model="form.address"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>		
    </el-form>

    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handlerSave">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* api */
export default {
  name: "Edit",
  // 暂无数据交互，（）
  // 字典
  dicts: [
    "personnel_card_type",
    "personnel_employment_nature",
    "sys_position_duty",
    "sys_position_rank_1",
    "sys_position_rank_2",
    "sys_position_rank_3",
    "sys_position_rank_4",
  ],
  data() {
    return {
      title: "",
      // 弹窗的开关
      dialogVisible: false,
      flag: "",
      form: {
       },
      //  表单验证
      rules: {
        roleName: [
          { required: true, message: "请输入角色编号", trigger: "blur" },
        ],
        charactername: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleKey: [
          { required: true, message: "请输字符权限", trigger: "change" },
        ],

        status: [
          { required: true, message: "请输入状态", trigger: "change" },
					],
         timer: [
          { required: true, message: "请输入创建时间", trigger: "change" }],
   address: [
          { required: true, message: "请输入其他其他", trigger: "change" }],
       

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
      if (flag == "add"){
        this.title = "新增";
      } else if (flag == "edit") {
        this.title = "修改";
        // 将选择修改的表格数据复制到页面渲染
        this.form = { ...data };	
        this.$baseMessage('修改成功', 'success')	  
      }
    },
    // 确定
    handlerSave(){
      this.$refs["form"].validate((valid) =>{
        if (!valid) return;
        this.$baseConfirm(`确认要${this.title}此项目吗？`,null,()=>{
          this.$emit("edit", this.flag, this.form);
          this.close();
        });
      });
    
    },

    // 修改用户状态
handleChangeStatus(){
},
    //取消
    close() {
      this.dialogVisible = false;
      // 重置数据(封装的方法)
      this.form = this.$options.data().form;    
      this.$refs["form"].resetFields();
    },

    // 职务类型变化回调
    // async hdTitleNameChange(value) {
    //   this.titleLevelList = "sys_position_rank_" + value;
    //   for (let key in this.dict) {
    //     if (key.indexOf(value) != -1) {
    //       this.titleLevelList = this.dict[key];
    //     }
    //   }
    //   if (!this.form.staffCode) {
    //     const res = await getNewStaffCode({ titleName: value });
    //     let { code, msg } = res;
    //     if (code && code != 200)
    //       return this.$baseAlert(
    //         msg || `员工编号生成失败,错误码: ${code}`,
    //         null
    //       );
    //     this.$set(this.form, "staffCode", msg);
    //   }
    // },
  },
};
</script>

<style lang=scss scoped>

</style>