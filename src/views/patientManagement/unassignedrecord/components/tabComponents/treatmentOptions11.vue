<template>
  <div class="room2">
    <!-- <el-button type="primary" round @click.native="handlerEdit('Modify')">修改治疗方案 </el-button> -->

    <!-- 表格 -->
    <div class="tablebox">
      <vxe-table
        auto-resize
        border
        height="500"
        align="center"
        show-header-overflow
        show-overflow
        :row-config="{ isHover: true }"
        :data="tableData"
      >
        <vxe-column field="DiagnosisTime" title="确诊时间">
          <template #default="{ row }">
            <div v-if="row.DiagnosisTime">{{ row.DiagnosisTime.slice(0, 10) }}</div>
          </template>
        </vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构"></vxe-column>
        <vxe-column field="DiagnosisTypeName" title="结核病类型"></vxe-column>
        <vxe-column field="PatientTypeName" title="患者类型"></vxe-column>
        <vxe-column field="TreatmentPlanName" title="治疗方案"></vxe-column>
        <vxe-column field="TreatmentPlanTime" title="治疗时间"></vxe-column>
      </vxe-table>
    </div>
    <OptionsEdit ref="optionsEdit" @optionsEdit="optionsEdit"></OptionsEdit>
  </div>
</template>
<script>
// 随访弹窗
import OptionsEdit from './echeatComponents/optionsEdit.vue'
import {
  treatmentplantemplates,
  treatmentplantemModify,
  treatmentplanrecord
} from '@/api/TreatmentPlanTemplate.js'
export default {
  components: {
    OptionsEdit
  },
  props: ['inputData'],
  data () {
    return {
      form: {},
      copyData: [{}],
      tableData: []
    }
  },
  methods: {
    // 列表
    async funtreatmentplantemplates () {
      const res = await treatmentplanrecord(this.inputData.DiagnosisId)
      let {
        StatusCode,
        Message
      } = res
      if (StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'error')
      }
      this.tableData = res.Response
    },
    handlerEdit (flag, data) {
      data = this.tableData[0]
      this.$refs.optionsEdit.show(flag, data)
    },

    // 修改
    async optionsEdit (flag, form, hasinfo) {
      let TreatmentPlanId = this.tableData[0].TreatmentPlanId
      // 405(请求地址无误)
      const res = await treatmentplantemModify({
        treatmentPlanId: TreatmentPlanId
      }, hasinfo)
      let {
        StatusCode,
        Message
      } = res;
      if (StatusCode != 200) {
        return this.$baseMessage(
          Message || '数据修改失败', 'error'
        )
      }
      this.$baseMessage('修改成功', "success")
      this.funtreatmentplantemplates()
    }
  },
  watch: {
    inputData: function (val) {
      this.funtreatmentplantemplates()
    }
  },
  async created () {
    this.copyData[0] = this.inputData;
    await this.funtreatmentplantemplates()
  },

}
</script>
<style lang="scss" scoped>
.room2 {
  width: 100%;
  height: 100%;
  // overflow: hidden;
}

.heard {
  width: 100%;
  // background:red;
  height: 350px;
  display: flex;
}

.tablebox {
  width: 100%;
  height: 75%;
  float: left;
  margin-top: 10px;
}

.el-button--medium.is-round {
  margin-top: 30px;
  margin-left: 85%;
}

.flex_center {
  display: flex;
  margin: 0 auto;
}
</style>
