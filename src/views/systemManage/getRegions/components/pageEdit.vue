<template>
  <el-dialog
    :title="formConfig.title"
    :visible="formConfig.visible"
    :width="formConfig.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="15vh"
  >
	<div slot="title" class="dialog-title">
		<div class="sectionstly"></div>
		<span class="title-text">{{formConfig.title}}</span>
		<div class="button-right">
			<span class="title-close" @click="handleClose"></span>
		</div>
	</div>
    <el-form :model="formData" :rules="formRules" ref="refForm" label-width="100px" class="form_row">
      <div class="el-dialog-div" style="height: 30vh">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级区划:" prop="Reg_RegionCode">
              <el-cascader
                style="width: 100%"
                :options="Reg_RegionCodeData"
                :props="propslist"
                v-model="formData.Reg_RegionCode"
                :show-all-levels="false"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="区域名称:" prop="RegionName">
              <el-input v-model="formData.RegionName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域编码:" prop="RegionCode">
              <el-input v-model="formData.RegionCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="地区全称:" prop="FullRegionName">
              <el-input v-model="formData.FullRegionName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="级别:" prop="RegionLevel">
              <el-input v-model="formData.RegionLevel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancelbtn" @click="handleClose">取 消</el-button>
      <el-button class="savebtn"  type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { regionsDetail, addRegions, Editregions, cascader, getList } from "@/api/systemManage/Region";
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: '',
        rederView: true,
        visible: false,
        width: '60%',
        opt: '',
      },
      tableData: [],
      Reg_RegionCodeData: [],
      // 表单数据
      formData: {},
      // 验证规则
      formRules: {
        RegionName: { required: true, message: '区域名称不能为空', trigger: 'blur' },
        RegionCode: { required: true, message: '区域编码不能为空', trigger: 'blur' },
        RegionLevel: { required: true, message: '区域级别不能为空', trigger: 'blur' }
      },
      propslist: {
        value: "RegionCode",
        label: "RegionName",
        children: "Children",
        checkStrictly: true,
        emitPath: false,
        lazy: true,
        lazyLoad: this.lazyLoad
      },
    };
  },
  methods: {
    async getReg_RegionCodeData () {
      let res = await getList({ Reg_RegionCode: '', PageNumber: 1, PageSize: 9999, RegionLevel: 1 })
      this.Reg_RegionCodeData = res.Response.items
    },
    async lazyLoad (node, resolve) {
      let { level } = node;
      let params = node.value
      getList({ Reg_RegionCode: params, PageNumber: 1, PageSize: 9999 }).then(res => {//接口
        if (res && res.StatusCode == 200) {
          let data = [res.Response]
          if (level > 0) {
            data = res.Response.items
          }
          // if (level == 3) {
          //   data.forEach(item => {
          //     item.leaf = level >= 3
          //   });
          // }
          resolve(data);
        } else {
          this.$message.error('获取区划数据失败')
        }
      })
    },
    //关闭弹框
    handleClose () {
      this.$refs.refForm.resetFields();
      this.formConfig.visible = false
    },
    // 提交
    submit () {
      let that = this
      this.$refs.refForm.validate(async (valid) => {
        if (valid) {
          if (that.formConfig.opt == 'add') {
            await addRegions(that.formData);
            this.$message.success("新增成功");
            that.$emit("submit")
            that.handleClose()
          }
          if (that.formConfig.opt == 'edit') {
            let arr = that.$utilsFun.compareObj(that.formData, that.formDataCopy)
            await Editregions({
              RegionCode: that.formData.RegionCode,
              data: arr
            })
            this.$message.success("编辑成功");
            that.$emit("submit")
            that.handleClose()
          }
        }
      });
    },
    // 初始化弹框，获取详情
    async getDetail (param) {
      if (param.opt == '' || param.opt == null) {
        return this.$message.error('未知操作');
      }
      this.getReg_RegionCodeData()
      this.$nextTick(() => {
        this.formData = { ...{} }
      })
      this.formConfig = Object.assign(this.formConfig, param);
      //编辑直接取列表数据，不调接口
      if (param.opt == 'edit') {
        let res = await regionsDetail(param.RegionCode);
        this.$nextTick(() => {
          this.formData = { ...res.Response }
        })
        this.formDataCopy = res.Response
      };
    }
  }
};
</script>