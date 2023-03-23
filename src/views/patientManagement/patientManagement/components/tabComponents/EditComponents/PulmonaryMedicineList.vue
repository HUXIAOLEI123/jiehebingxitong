<template>
  <vxe-modal
    :title="formConfig.title"
    v-model="formConfig.visible"
    :width="formConfig.width"
    :height="formConfig.height"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="handleClose"
    modal-append-to-body
    append-to-body
    :z-index="3000"
  >
    <div style="overflow-x: hidden">
      <el-form ref="searchForm" style="margin-top: 10px" :model="searchForm" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item field="CardNo" label="服药日期:">
              <el-date-picker
                @change="changeSubmitTimes"
                v-model="searchForm.SubmitTimes"
                unlink-panels
                type="daterange"
                style="width:100%"
                align="center"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button @click="queryBtn" type="primary" style="margin-left: 10px">查询</el-button>
            <el-button @click="resetBtn" plain>重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <vxe-table
        :data="tableData"
        border
        @cell-dblclick="cellDbRow"
        ref="xTable1"
        height="360"
        :checkbox-config="{ trigger: 'row' }"
        @checkbox-change="checkboxChange"
        @checkbox-all="checkboxAll"
      >
        <vxe-table-column type="checkbox" width="55" align="center"></vxe-table-column>
        <vxe-column field="AbnormalDate" title="异常服药日期">
          <template slot-scope="scope">
            <div>{{ scope.row.AbnormalDate.slice(0, 10) }}</div>
          </template>
        </vxe-column>
        <vxe-column field="AbnormalType" title="异常类型">
          <template slot-scope="scope">
            <div v-if="scope.row.AbnormalType == 1">中断服药</div>
            <div v-else>异常服药</div>
          </template>
        </vxe-column>
        <vxe-column field="ShouldTakeMedicineTimes" title="应服药次数"></vxe-column>
        <vxe-column field="ActualTakeMedicineTimes" title="实际服药次数"></vxe-column>
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
          ></el-pagination>
        </div>
      </div>
      <span Slots="footer" class="dialog-footer mt10">
        <el-button class="cancelbtn" @click="handleClose">关 闭</el-button>
        <el-button class="savebtn" type="primary" @click="submit">选 择</el-button>
      </span>
    </div>
  </vxe-modal>
</template>

<script>
import {
  pulmonarymedicineabnormal,
  pulmonarymedicinesupplement
} from '@/api/PulmonaryMedicine'
export default {
  data () {
    return {
      // 表单配置
      formConfig: {
        title: '',
        visible: false,
        width: '56%',
        opt: '',
        height: '85%',
        num: 9999
      },
      checkRows: [],
      searchForm: {
        CardNo: '',
        Name: "",
        pageIndex: 1,
        pageSize: 10,
        SelectOnly: false,
        RegionCode: '',
        AdminOrganization: '',
        SubmitTimes: [],
      },
      totalcount: 0, //总条数
      pageSize: 10, // 每页显示条数
      pagenum: 1, // 当前页码
      tableData: [],//表格数据
      selectTableData: [],//选择的表格数据
    };
  },
  created () {

  },
  filters: {
    AbnormalTypelist (row) {
      switch (row.row.AbnormalType) {
        case '1':
          return '中断服药'
        case '2':
          return '异常服药';
        default:
          return '';
      }
    },

  },
  methods: {
    //查询按钮
    queryBtn () {
      this.pagenum = 1;
      this.query();
    },
    //重置
    resetBtn () {
      var datetime = new Date();
      var year = datetime.getFullYear(); //获取完整的年份(4位,如:1970)
      var month = datetime.getMonth() + 1; //获取月份(返回0-11,0代表1月,用的时候记得加上1)
      var date = datetime.getDate() - 7; //获取日(返回1-31)
      var date1 = datetime.getDate(); //获取日(返回1-31)
      //判断小于等于9月的时候在月份前加一个"0"
      if (month <= 9) {
        month = "0" + month;
      }
      //判断小于等于9号的时候在天数前加一个"0"
      if (date <= 9) {
        date = "0" + date;
      }
     this.searchForm.SubmitTimes.push(this.formtime(new Date())) //给建档时间默认当前
     this.searchForm.SubmitTimes.push(this.formtime(new Date().getTime() - 3600 * 1000 * 24 * 30))
      this.query()
    },
    //格式化时间显示
    formatterDate (row, column, cellValue, index) {
      return row.row.birthday.slice(0, 10)
    },
    //每页显示条目个数改变时
    handleSizeChange (val) {
      this.pageSize = val;
      this.pagenum = 1;
      this.query();
    },
    //当前页改变时
    handleCurrentChange (val) {
      this.pagenum = val;
      this.query();
    },
    cellDbRow ({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {
      let selectData = this.$refs.xTable1.getCheckboxRecords();
      selectData.push(row)
      this.$emit("selectSubmit", selectData);
      this.handleClose()
    },
    // 获取服药记录信息列表
    async query () {
      const res = await pulmonarymedicineabnormal(this.searchForm.DiagnosisId, this.searchForm.SubmitConfirm, this.searchForm.SubmitTimes[0], this.searchForm.SubmitTimes[1], this.pagenum, this.pageSize)
      this.tableLoading = false;
      this.totalcount = res.Response.TotalCount; // 总条数
      this.tableData = res.Response.items;
    },
    //选择的表格数据
    submit () {
      let len = this.checkRows.length;
      if (!len) {
        return this.$baseMessage("至少选择一项！", "error");
      }
      this.$baseConfirm("确定要提交选中的数据吗？", null,
        // 将选中的数据添加属性删除
        async () => {
          let storeId = this.checkRows.map((item) => {
            return item.AbnormalDate
          })
          //派发请求
          const res = await pulmonarymedicinesupplement(this.checkRows[0].DiagnosisId, storeId)
          this.$emit("selectSubmit");
          this.handleClose()
          this.$baseMessage('确认成功', "success")
        }
      )

    },
    //选择服药时间
    changeSubmitTimes (value) {
      this.searchForm.SubmitTimes = value;
    },
    // 初始化弹框，获取详情
    getDetail (param) {
      this.formConfig = Object.assign(this.formConfig, param);
      this.tableLoading = true;
      this.searchForm.PageSize = this.pageSize;
      this.searchForm.PageNumber = this.pagenum;
      this.searchForm.SubmitConfirm = this.formConfig.SubmitConfirm;
      this.searchForm.DiagnosisId = this.formConfig.DiagnosisId;

      var datetime = new Date();
      var year = datetime.getFullYear(); //获取完整的年份(4位,如:1970)
      var month = datetime.getMonth() + 1; //获取月份(返回0-11,0代表1月,用的时候记得加上1)
      var date = datetime.getDate() - 7; //获取日(返回1-31)
      var date1 = datetime.getDate(); //获取日(返回1-31)
      //判断小于等于9月的时候在月份前加一个"0"
      if (month <= 9) {
        month = "0" + month;
      }
      //判断小于等于9号的时候在天数前加一个"0"
      if (date <= 9) {
        date = "0" + date;
      }
      this.searchForm.SubmitTimes.push(this.formtime(new Date())) //给建档时间默认当前
      this.searchForm.SubmitTimes.push(this.formtime(new Date().getTime() - 3600 * 1000 * 24 * 30))
      this.query();
    },
    // 复选框事件
    checkboxChange ({
      records
    }) {
      this.checkRows = records
    },
    // 全选按钮事件
    checkboxAll ({
      records
    }) {
      this.checkRows = records
    },
	formtime(endDate) {
		let endTime = endDate - 600000
		let dates = new Date(endTime)
		let y = dates.getFullYear() // 年
		let MM = dates.getMonth() + 1 // ⽉
		MM = MM < 10 ? ('0' + MM) : MM
		let d = dates.getDate() // ⽇
		d = d < 10 ? ('0' + d) : d
		return y + '-' + MM + '-' + d
	},
    //关闭弹框
    handleClose () {
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
.mt10 {
  margin-top: 10px;
}
::v-deep {
  .el-input--medium .el-input__inner {
    width: 100% !important;
  }
  .dialog-footer {
    float: right;
  }
}
</style>
