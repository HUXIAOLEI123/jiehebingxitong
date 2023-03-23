<template>
  <div class="room">
    <!-- 图表 -->
    <div class="heardechart">
      <p>中断服药确认率</p>
      <MedicinerateEchart_2 :EchartList="Echartdata"></MedicinerateEchart_2>
    </div>
    <div class="heardechart1">
      <div class="radiobut"></div>
      <DisposalColumnarEchart_1 :EchartList="Echartdata"></DisposalColumnarEchart_1>
    </div>
    <div class="btnbox">
		<el-button :disabled="inputData.IsClosed ? true : false" class="exportBtn Btn addBtn1" type="success" round @click="handlersure">批量处置</el-button>
	</div>
    <!-- 表格 -->
    <div class="tablebox">
      <vxe-table
        auto-resize
        border
        align="center"
        height="300"
        class="mytable-scrollbar"
        show-overflow
        :data="tableData"
        @checkbox-change="checkboxChange"
        stripe
        @checkbox-all="checkboxAll"
      >
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column field="RegisterTime" title="确诊时间">
          <template slot-scope="{ row }">
            <span>
              {{ row.RegisterTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医生"></vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构"></vxe-column>
        <vxe-column field="IsManagement" title="处置状态">
          <template #default="{ row }">
            <el-tag :type="row.IsManagement ? 'primary' : 'danger'">{{ row.IsManagement ? '已处置' : '未处置' }}</el-tag>
          </template>
        </vxe-column>
        <vxe-column field="SubmitTime" title="中断服药时间">
          <template slot-scope="{ row }">
            <span>
              {{ row.SubmitTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="ManagementTime" title="处置时间">
          <template slot-scope="{ row }">
            <span>
              {{ row.ManagementTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="ManagementMethod" title="操作" width="150">
          <template #default="{ row }">
			<div class="flex_center">
            <el-link type="primary" :disabled="inputData.IsClosed ? true : false" v-if="row.IsManagement == false" @click="handlerEdit(row)">处置</el-link>
            <el-link v-else @click="handlerDetail(row)">查看详情</el-link>
			<div class="Divider"></div>
			<el-link type="danger"  @click="delData(row)">删除</el-link>
			</div>
          </template>
        </vxe-column>
      </vxe-table>
      <interrupttab4Detail ref="adversetab4detail"></interrupttab4Detail>
    </div>
  </div>
</template>

<script>
import MedicinerateEchart_2 from './echeatComponents/medicinerateEchart_2.vue'
import DisposalColumnarEchart_1 from './echeatComponents/disposalColumnarEchart_1.vue'
import interrupttab4Detail from "./EditComponents/interrupttab4Detail.vue";
import {
  pulmonaryinterruptslist,
  pulmonaryinterruptscharts,
  pulmonaryinterruptsconfirm,
} from '@/api/PulmonaryInterrupt.js'
import {
  getInterruptsList,
  getAllInterruptsList,
  confirmaInfo,
  deletesmanagementist
} from '@/api/supervisoryWorkManagement/pulmonaryInterrupt'
export default {
  components: {
    MedicinerateEchart_2,
    DisposalColumnarEchart_1,
    interrupttab4Detail
  },
  props: ['inputData'],
  data () {
    return {
      radio1: '全部',
      form: {},
      copydata: [{}],
      tableData: [],
      Echartdata: {},
      checkRows: [],
    }
  },
  watch: {
    inputData: function (val) {
      this.funpulmonaryinterruptslist()
      this.funpulmonaryinterruptscharts()
    }
  },
  async created () {
    this.copydata[0] = this.inputData
    await this.funpulmonaryinterruptslist()
    await this.funpulmonaryinterruptscharts()
  },
  methods: {
    // 列表
    async funpulmonaryinterruptslist () {
      const res = await pulmonaryinterruptslist(this.inputData.DiagnosisId)
      let {
        StatusCode,
        Message,
        Response
      } = res;
      if (!Response || StatusCode != 200) {
        return this.$baseMessage(
          Message || '数据获取失败', 'error'
        )
      }
      this.tableData = res.Response.items
    },
    // 图表
    async funpulmonaryinterruptscharts () {
      let diagnosisId = this.inputData.DiagnosisId;
      const res = await pulmonaryinterruptscharts(diagnosisId)
      this.Echartdata = res.Response
    },
    handlerEdit (data) {
      let InterruptId = data.InterruptId;
      this.$baseConfirm('确认知晓服药?', null, async () => {
        const res = await pulmonaryinterruptsconfirm([InterruptId])
        let {
          StatusCode,
          Message
        } = res
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '修改失败', 'error'
          )
        }
        this.funpulmonaryinterruptslist()
        this.funpulmonaryinterruptscharts()
        this.$baseMessage('操作成功', "success")
      })
    },
    handlerDetail (data) {
      this.$refs.adversetab4detail.show(data, this.inputData)
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
    // 批量确认
    handlersure () {
      let len = this.checkRows.length;
      if (!len) {
        return this.$baseMessage("至少选择一项！", "error");
      }
      this.$baseConfirm("确定知晓服药选中的数据吗?", null,
        // 将选中的数据添加属性删除
        async () => {
          let storeId = this.checkRows.map((item) => {
            return item.InterruptId
          })
          //派发请求
          const res = await pulmonaryinterruptsconfirm(storeId)
          this.funpulmonaryinterruptslist()
          this.funpulmonaryinterruptscharts()
          this.$baseMessage('确认成功', "success")
        }
      )
    },
	//删除的操作
	delData (row) {
	  //弹框
	  this.$confirm(`你确定删除?`, "提示", {
	    confirmButtonText: "确定",
	    cancelButtonText: "取消",
	    type: "error",
	    roundButton:true,
	  })
	    .then(async () => {
	      //当用户点击确定按钮的时候会出发
	      //向服务器发请求
	      let op = [row.InterruptId]
	      let result = await deletesmanagementist(op);
	      //如果删除成功
	      if (result.StatusCode == 200) {
	        this.$message({
	          type: "success",
	          message: "删除成功!",
	        });
	        this.funpulmonaryinterruptslist()
	      }
	    })
	    .catch(() => {
	      //当用户点击取消按钮的时候会触发
	    });
	},
  },
}
</script>

<style lang="scss" scoped>
.room2 {
  width: 100%;
  height: 500px;
  // overflow: hidden;
  position: relative;
}

.heardechart {
  width: 50%;
  height: 300px;
  float: left;
}

.heardechart1 {
  width: 50%;
  height: 350px;
  float: left;
}

.heardechart > p {
  color: black;
  font-size: 25px;
  font-weight: 600;
  margin: 15px 0 0 20px;
}

.radiobut {
  margin: 30px 0 0 0;
  padding-left: 56%;
}

.tablebox {
  width: 100%;
  height: 100%;
  float: left;
  margin-top: 20px;
  // overflow-y: auto;
}
.addBtn1 {
  width: 7%;
  // position: absolute;
  // right: 1%;
  // top: 58%;
}
.primary {
  color: #30bf78;
}
.danger {
  color: #ff0052;
}
.btnbox{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>
