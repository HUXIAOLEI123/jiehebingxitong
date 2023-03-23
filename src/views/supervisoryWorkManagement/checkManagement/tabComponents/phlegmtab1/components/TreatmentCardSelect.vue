<template>
  <vxe-modal
    :title="formConfig.title"
    v-model="formConfig.visible"
    :width="formConfig.width"
    :height="formConfig.height"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    top="5vh"
    modal-append-to-body
    append-to-body
    :z-index='9999'
  >
  <div style="overflow-x:hidden;">
    <el-form ref="searchForm" style="margin-top:10px;" :model="searchForm" label-width="90px">
      <el-row>
        <el-col :span="6">
          <el-form-item field="Name" label="姓名:">
            <el-input v-model="searchForm.Name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item field="CardNo" label="证件号:">
            <el-input v-model="searchForm.CardNo" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button @click="queryBtn" type="primary" style='margin-left:10px'>查询</el-button>
          <el-button @click="resetBtn" plain>重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <vxe-table :data="tableData" border @cell-dblclick='cellDbRow' ref="xTable1" height="360" :checkbox-config="{trigger:'row'}">
        <vxe-table-column type="checkbox" width="55" align="center"></vxe-table-column>
        <!-- <vxe-table-column field="UserId" align="center" title="编号" width="50"/> -->
        <vxe-column field="Name" title="姓名" width="100"></vxe-column>
        <vxe-column field="SexName" title="性别" width="70"></vxe-column>
        <vxe-column field="IsClosed" title="结案状态" width="100">
          <template #default="{ row }">
            <div>{{ row.IsClosed ? '已结案' : '在案' }}</div>
          </template>
        </vxe-column>
        <vxe-column field="Age" title="年龄" width="70"></vxe-column>
        <vxe-column field="CardNo" title="证件号" width="150"></vxe-column>
        <vxe-column field="Phone" title="联系电话" width="150"></vxe-column>
        <vxe-column field="Address" title="居住地址" width="150"></vxe-column>
        <vxe-column field="DiagnosisTypeName" title="结核病类型" width="120"></vxe-column>
		<vxe-column field="PatientTypeName" title="患者类型" width="120"></vxe-column>
		<vxe-column field="TreatmentPlanName" title="治疗方案" width="120"></vxe-column>
    </vxe-table>
    <!-- 分页 -->
    <div class="app-pagination" ref="appPagination">
      <div class="paging-total">共{{ totalcount }}条</div>
      <div>
        <el-pagination
          layout="prev, pager, next"
          :total="totalcount"
          :page-size="pageSize"
          ref="elPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagenum"
        >
        </el-pagination>
      </div>
    </div>
    <span Slots="footer" class="dialog-footer mt10">
      <el-button class="cancelbtn" @click="handleClose">关 闭</el-button>
      <el-button  class="savebtn" type="primary" @click="submit">选 择</el-button>
    </span>

  </div>
  </vxe-modal>
</template>

<script>
	import {
	  tuberculosisdiagnosiss,
	} from '@/api/TuberculosisDiagnosis'
   export default {
    data() {
    return {
      // 表单配置
      formConfig:{
        title:'',
        visible:false,
        width:'70%',
        opt:'',
        height:'85%',
        num:1
      },
      searchForm: {
        CardNo:'',
        Name: "",
        pageIndex: 1,
        pageSize: 10,
		SelectOnly:false,
		RegionCode:'',
		AdminOrganization:'',
      },
      totalcount: 0, //总条数
      pageSize: 10, // 每页显示条数
      pagenum: 1, // 当前页码
      tableData:[],//表格数据
      selectTableData:[],//选择的表格数据
    };
  },
  created() {
    
  },
  methods:{
    //查询按钮
    queryBtn() {
      this.pagenum = 1;
      this.query();
    },
    //重置
    resetBtn() {
      this.searchForm.CardNo='',
      this.searchForm.Name="",
      this.query()
    },
    //格式化时间显示
    formatterDate(row, column, cellValue, index){
      return row.row.birthday.slice(0,10)
    },  
    //每页显示条目个数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.pagenum = 1;
      this.query();
    },
    //当前页改变时
    handleCurrentChange(val) {
      this.pagenum = val;
      this.query();
    },
    cellDbRow({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }){
      let selectData = this.$refs.xTable1.getCheckboxRecords();
      selectData.push(row)
      if(selectData.length > this.formConfig.num){
        return this.$message.error("最多只能选择" + this.formConfig.num + "位患者")
      }
      this.$emit("selectSubmit",selectData);
      this.handleClose()
    },
    // 获取医师列表信息列表
    async query() {
      this.tableLoading = true;
      this.searchForm.PageSize = this.pageSize;
      this.searchForm.PageNumber = this.pagenum;
	  this.searchForm.SelectOnly = false;
	  this.searchForm.RegionCode = this.$utilsFun.getUserInfo().authRegionCode;
	  this.searchForm.IsClosed = false;
	  this.searchForm.AdminOrganization = JSON.parse(localStorage.getItem('userInfo')).authOrgId;
	  const res = await tuberculosisdiagnosiss(this.searchForm)
	  this.tableLoading = false;
	  this.totalcount = res.Response.TotalCount; // 总条数
	  this.tableData = res.Response.items;
      // this.$store
      //   .dispatch("function/postApi", {
      //     reqData: searchParam,
      //     url: this.$URL.urls.PatientBaseInfoQuery,
      //   })
      //   .then((res) => {
      
      //     if(res.code == '0'){
      //       this.totalcount = res.result.meta.totalCount; // 总条数
      //       this.tableData = res.result.data;
      //     }
      //   });
    },
    //选择的表格数据
    submit(){
      let selectData = this.$refs.xTable1.getCheckboxRecords();
      if(selectData.length > this.formConfig.num){
        return this.$message.error("最多只能选择" + this.formConfig.num + "位患者")
      }
      this.$emit("selectSubmit",selectData);
      this.handleClose()
    },
    // 初始化弹框，获取详情
    getDetail(param){
      this.formConfig = Object.assign(this.formConfig,param);
	  this.query();
    },
    //关闭弹框
    handleClose(){
      this.$refs.xTable1.clearCheckboxRow();
      this.formConfig.visible = false;
    },
  }
};
</script>
<style scoped lang='scss'>
  .app-pagination {
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #303133;
    width: 100%;
    background-color: #fff;
    padding-top: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
  }
  
  .app-pagination .paging-total {
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #606266;
  }
  .mt10{
    margin-top: 10px;
  }
  ::v-deep{
    .el-input--medium .el-input__inner{
      width: 100%!important;
    }
    .dialog-footer{
      float: right;
    }
  }
</style>
