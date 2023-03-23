<template>
  <div class="room">
    <!-- 图表 -->
    <div class="heardechart">
      <p>肝功能异常率</p>
      <MedicinerateEchart_7 :EchartList="Echartdata"></MedicinerateEchart_7>
    </div>
    <div class="heardechart2">
      <StatisticsEcharts_4 :EchartList="Echartdata"></StatisticsEcharts_4>
    </div>
    <el-button :disabled="inputData.IsClosed ? true : false" type="primary" round @click.native="handlerEdit('Liver')">检查预约</el-button>
    <!-- 表格 -->
    <div class="tablebox">
      <vxe-table
        auto-resize
        border
        height="300"
        align="center"
        show-header-overflow
        show-overflow
        :row-config="{ isHover: true }"
        :data="tableData"
      >
        <vxe-column field="RegisterTime" title="确诊时间">
          <template slot-scope="{ row }">
            <span>
              {{ row.RegisterTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医生"></vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构"></vxe-column>
        <vxe-column field="ApplicationTypeName" title="检查原因"></vxe-column>
        <vxe-column field="ApplicationInspectTime" title="预约日期">
          <template slot-scope="{ row }">
            <span>
              {{ row.ApplicationInspectTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="InspectResultName" title="检查结果"></vxe-column>
        <vxe-column field="InspectResultTime" title="检查日期">
          <template slot-scope="{ row }">
            <span>
              {{ row.InspectResultTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="300">
          <template #default="{ row }">
            <div class="flex_center">
              <el-link type="warning" :disabled="row.InspectResultTime == null" @click="handlerEdit('Modify1', row)">详情</el-link>
              <div class="Divider"></div>
              <el-link type="warning" :disabled="inputData.IsClosed ? true : false" v-if="!row.InspectResultName" @click="handlerEdit('Modify', row)">修改预约</el-link>
              <div class="Divider" v-if="!row.InspectResultName"></div>
              <el-link type="success" :disabled="inputData.IsClosed ? true : false" v-if="row.InspectResultTime == null" @click="handlerEdit('warning', row)">结果录入</el-link>
              <el-link type="warning" :disabled="inputData.IsClosed ? true : false" @click="handlerEdit('Modify2', row)" v-else>修改录入</el-link>
              <div class="Divider"></div>
              <el-link type="danger" @click="handlerEdit('delete', row)">删除</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <!--预约弹窗 -->
    <CheckaPpointmentEdit ref="checkaPpointmentEdit" @checkaPpointmentEdit="checkaPpointmentEdit"></CheckaPpointmentEdit>

    <Checktab5Edit ref="checktab5Edit" @submit="funInspectApplicationlist"></Checktab5Edit>
    <Checktab6Edit ref="checktab6Edit" @checktab5Edit="checktab5Edit"></Checktab6Edit>
  </div>
</template>
<script>
import MedicinerateEchart_7 from './echeatComponents/medicinerateEchart_7.vue'
import StatisticsEcharts_4 from './echeatComponents/statisticsEcharts_4.vue'
import CheckaPpointmentEdit from './echeatComponents/checkaPpointmentEdit.vue'
import Checktab5Edit from "./EditComponents/checktab5Edit.vue";
import Checktab6Edit from "./EditComponents/checktab6Edit.vue";
import {
  InspectApplicationlist,
  InspectApplicationecharts,
  InspectApplicationeModify,
  InspectApplicationedeletes,
  InspectApplicationresult,
  InspectApplicationeModify2,
  InspectApplicationmake
} from '@/api/InspectApplication.js'
export default {
  components: { MedicinerateEchart_7, StatisticsEcharts_4, CheckaPpointmentEdit, Checktab5Edit, Checktab6Edit }
  ,
  props: ['inputData'],
  data () {
    return {
      radio1: '全部',
      form: {},
      copyData: [{}],
      Echartdata: {},
      tableData: [],
    }
  },
  async created () {
    this.copyData[0] = this.inputData;
    await this.funInspectApplicationlist()
    await this.funInspectApplicationecharts()
  },
  methods: {
    // 列表
    async funInspectApplicationlist () {
      const res = await InspectApplicationlist({ ApplicationItemCategory: 5, SourceId: this.inputData.DiagnosisId })
      let { StatusCode, Message } = res
      if (!res || StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error')
      }
      this.tableData = res.Response.items
      await this.funInspectApplicationecharts()
    },

    // 图表
    async funInspectApplicationecharts () {
      let diagnosisId = this.copyData[0].DiagnosisId
      const res = await InspectApplicationecharts(diagnosisId, 5)
      let { StatusCode, Message } = res

      if (!res || StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error')
      }
      this.Echartdata = res.Response
    },

    handlerEdit (flag, data) {
      // 预约
      if (flag == 'Liver') {
        this.$refs.checkaPpointmentEdit.show(flag, this.inputData)
      } else if (flag == 'Modify1') {
        // 修改预约
        this.$refs.checktab6Edit.show(flag, data, this.inputData)
      } else if (flag == 'Modify') {
        // 修改预约
        this.$refs.checkaPpointmentEdit.show(flag, data, this.inputData)
      } else if (flag == 'Modify2') {
        this.$refs.checktab5Edit.show(flag, data, this.inputData, 'A0041')
      } else if (flag == 'warning') {
        // 结果录入
        this.$refs.checktab5Edit.show(flag, data, this.inputData, 'A0041')
      } else if (flag == 'delete') {
        // 删除
        this.$baseConfirm("确定要删除所选项吗？", '删除', async () => {
          const inspectApplicationId = data.InspectApplicationId
          const res = await InspectApplicationedeletes([inspectApplicationId])
          let { StatusCode, Message } = res;
          if (StatusCode != 200) {
            return this.$baseMessage(
              Message || '删除失败', 'error'
            )
          }
          this.$baseMessage('删除成功', "success")
          this.funInspectApplicationlist()
          this.funInspectApplicationecharts()
        },null,"error",)
      }
    },
    // 检查预约
    async checkaPpointmentEdit (flag, form, hasinfo) {
      // 新增预约
      if (flag == 'Liver') {
        let personId = this.copyData[0].PersonId
        let sourceId = this.copyData[0].DiagnosisId
        const res = await InspectApplicationmake({ ...form, PersonId: personId, SourceId: sourceId })
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '预约失败', 'error'
          )
        }
        this.$baseMessage('预约成功', "success")
        this.funInspectApplicationlist()
        this.funInspectApplicationecharts()
      } else if (flag == 'Modify') {
        // 预约修改
        const inspectApplicationId = form.InspectApplicationId
        const res = await InspectApplicationeModify({ inspectApplicationId }, hasinfo)
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '修改失败', 'error'
          )
        }
        this.$baseMessage('修改成功', "success")
        this.funInspectApplicationlist()
        this.funInspectApplicationecharts()
      }
    },

    async checktab5Edit (flag, form, hasinfo) {
      //录入结果修改
      if (flag == 'Modify2') {
        const inspectApplicationId = form.InspectApplicationId
        const res = await InspectApplicationeModify2({ inspectApplicationId }, hasinfo)

        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '修改失败', 'error'
          )
        }
        this.$baseMessage('修改成功', "success")
        this.funInspectApplicationlist()
        this.funInspectApplicationecharts()
        // 录入结果
      } else if (flag == 'warning') {
        let inspectApplicationId = form.InspectApplicationId
        let inspectResult = form.InspectResult
        let inspectResultTime = form.InspectResultTime
        // let  fileRelationGuid=form.InspectApplicationId
        const res = await InspectApplicationresult({
          InspectApplicationId: inspectApplicationId, InspectResult: inspectResult,
          InspectResultTime: inspectResultTime,
        })

        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '录入失败', 'error'
          )
        }
        this.$baseMessage('录入成功', "success")
        this.funInspectApplicationlist()
        this.funInspectApplicationecharts()
      }


    },
  },
  watch: {
    inputData: {
      handler (val) {
        if (val.DiagnosisId) {
          this.copyData[0] = this.inputData;
          this.funInspectApplicationecharts()
        }
      },
      deep: true,
      immediate: true
    }
  },
}
</script>
<style lang="scss" scoped>
.room2 {
  width: 100%;
  height: 500px;
  position: relative;
}

.heardechart {
  width: 50%;
  height: 300px;
  float: left;
}

.heardechart2 {
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

.tablebox {
  width: 100%;
  // height: 100%;
  height: 200;
  float: left;
  margin-top: 10px;
}

.el-button--medium.is-round {
  margin-top: 30px;
  margin-left: 90%;
}
</style>