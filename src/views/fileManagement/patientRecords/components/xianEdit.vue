<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" 
  v-if="dialogVisible" :close-on-click-modal="false"  width="70%"
    :hide-required-asterisk="title == '详情'" top="20px" @close="close">

    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handlerSave" :disabled="title == '详情'">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
/* api */
import { usedictionarydetails } from '@/api/dict.js'
import Region from '../../../homeComponents/cascaderRegion.vue';

export default {
  name: "Edit",
  components:{Region},
  data() {
    return {
      title: "",
      // 弹窗的开关
      dialogVisible: false,
      flag: "",
      ContractStaffList: [],
      // 保存修改信息
      copyform: {},
      form: {
        ContractStaffs: []
      },
      hasinfo: [],
      
     
    };
  },
  created() {
    this.usedictionarydetails()


  },
  methods: {
    //人群属性
    async usedictionarydetails(params) {
      const res = await usedictionarydetails({ CategoryCode: 'A0021' })
      this.ContractStaffList = res.Response.items
    },


  
    // 确认新增？修改
    show(flag, data) {

      this.dialogVisible = true;
      this.flag = flag;
      if (flag == "add") {
        this.title = "新增";
      } else if (flag == "details") {
        this.title = "详情";
        this.form = { ...data };
      } else if (flag == "edit") {
        this.title = "修改";
        this.form = { ...data };
        this.copyform = { ...data }

      }

    },
    // 保存
    handlerSave() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.hasinfo = [];
        for (let key in this.form) {
          let obj = {};
          if (this.form[key] !== this.copyform[key]) {
            obj.op = 'replace',
              obj.value = this.form[key];
            obj.path = key;
            this.hasinfo.push(obj)
          }
        }

        this.$baseConfirm(`确认要${this.title}此项目吗？`, null, () => {
          this.$emit("edit", this.flag, this.form, this.hasinfo);
          this.close();
        });
      });
    },
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
  margin: 15px 0;
}

.row {
  margin-left: 60px;
}
</style>