<template>
  <div class="room2">
    <el-button :disabled="inputData.IsClosed ? true : false" type="primary" v-if="tableData.length== 0" round @click.native="handlerEdit('addfollow')">新增随访
    </el-button>
    <el-button :disabled="inputData.IsClosed ? true : false" type="primary" v-if="tableData.length!== 0" round @click.native="handlerEdit2('addfollow')">后续随访
    </el-button>
    <!-- 表格 -->
    <div class="tablebox">
      <vxe-table auto-resize border height="500" align="center" show-header-overflow show-overflow :row-config="{ isHover: true }"
        :data="tableData">
        <!-- <vxe-column field="DiagnosisTime" title="确诊时间"></vxe-column> -->
        <!-- <vxe-column field="ResponsibilityName" title="责任医生"></vxe-column> -->
        <!-- <vxe-column field="AdminOrganizationName" title="管理机构"></vxe-column> -->
        <vxe-column field="VisitDoctorName" title="随访医生"></vxe-column>
        <vxe-column field="VisitOrganizationName" title="随访机构"></vxe-column>

        <vxe-column field="VisitType" title="随访类型">
          <template #default="{ row }">
            <el-link :underline="false"  v-if="row.VisitType == 1">初次随访 
            </el-link>
            <el-link :underline="false"  v-if="row.VisitType == 2">后续随访
            </el-link>
          </template>
        </vxe-column>
        <vxe-column field="VisitDate" title="随访日期">
          <template slot-scope="{ row }">
            <span>
              {{ row.VisitDate | parseTime("{y}-{m}-{d}") }}
            </span>
          </template>

        </vxe-column>
        <vxe-column field="NextVisitDate" title="下次随访日期">
          <template slot-scope="{ row }">
            <span>
              {{ row.NextVisitDate | parseTime("{y}-{m}-{d}") }}
            </span>
          </template>
        </vxe-column>

        <vxe-column field="SymptomDesc" title="症状"></vxe-column>
        <vxe-column title="操作" width="180">
          <template #default="{ row }">
            <div class="flex_center ">
              <!-- <el-link type="primary" @click="handlerEdit2('addfollow', row)">新增后续随访</el-link> -->
              <el-link type="primary" v-if="row.VisitType == 1" @click="handlerEdit('details', row)">详情</el-link>
              <div class="Divider" v-if="row.VisitType == 1"></div>
              <el-link type="warning" :disabled="inputData.IsClosed ? true : false" v-if="row.VisitType == 1" @click="handlerEdit('Modify', row)">修改</el-link>
              <div class="Divider" v-if="row.VisitType == 1"></div>
              <el-link type="danger" v-if="row.VisitType == 1" @click="handlerEdit('delete', row)">删除</el-link>
              <!-- 2次随访 -->
              <el-link type="primary" v-if="row.VisitType == 2" @click="handlerEdit2('details', row)">详情</el-link>
              <div class="Divider" v-if="row.VisitType == 2"></div>
              <el-link type="warning" :disabled="inputData.IsClosed ? true : false" v-if="row.VisitType == 2" @click="handlerEdit2('Modify', row)">修改</el-link>
              <div class="Divider" v-if="row.VisitType == 2"></div>
              <el-link type="danger" v-if="row.VisitType == 2" @click="handlerEdit2('delete', row)">删除</el-link>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <FollowupEdit ref="followupEdit" @submit="funPulmonaryVisitlist"></FollowupEdit>
    <FollowupEdit2 ref="followupEdit2" @submit="funPulmonaryVisitlist"></FollowupEdit2>
    <XqfollowEdit ref="xqfollowEdit"></XqfollowEdit>
    <XqfollowEdit2 ref="xqfollowEdit2"></XqfollowEdit2>
  </div>
</template>
<script>


// 随访弹窗
import FollowupEdit from './echeatComponents/follow-upEdit.vue'
// 后续随访
import FollowupEdit2 from './echeatComponents/follow-upEdit2.vue'
// 详情
import XqfollowEdit from './EditComponents/xqfollowEdit.vue'
import XqfollowEdit2 from './EditComponents/xqfollowEdit2.vue'
import {
  pulmonarybadreactionslist,
  pulmonarybadreactionsupdate,
  pulmonarybadreactionsdelete,
  pulmonarybadreactionsdetails
} from '@/api/PulmonaryFirstVisit.js'

import {
  PulmonaryPatientVisitlist,
  PulmonaryPatientVisitdetails,
  PulmonaryPatientVisitupdate,
  PulmonaryPatientVisitdelete
} from "@/api/PulmonaryPatientVisit";

import { PulmonaryVisitlist } from '@/api/PulmonaryVisit.js'
export default {
  components: { FollowupEdit, FollowupEdit2, XqfollowEdit, XqfollowEdit2 },
  props: ['inputData'],
  data() {
    return {
      form: {},
      tableData: [],
      copyData: [{}]
    }

  },
  async created() {
    this.copyData[0] = this.inputData,
      await this.funPulmonaryVisitlist()
  },

  methods: {
    // 初次随访
    async handlerEdit(flag, data, formdata) {
      if (flag == 'addfollow') {
        let lengths = this.tableData.length
        if (lengths == 0) {
          this.$refs.followupEdit.show(flag,this.inputData)
        } else {
          this.$baseMessage('已存在初次预约随访', "error")
        }
      } else if (flag == 'details') {
        // 详情
        const res = await pulmonarybadreactionsdetails({ firstVisitId: data.VisitId })
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '数据获取失败', 'error'
          )
        }
        formdata = res.Response
        this.$refs.xqfollowEdit.show(flag, data, formdata)
      } else if (flag == 'Modify') {
        // 修改（先获取详情）
        const res = await pulmonarybadreactionsdetails({ firstVisitId: data.VisitId })
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '数据获取失败', 'error'
          )
        }
        formdata = res.Response
        formdata.Symptom = formdata.Symptom.split(',')
        formdata.DrugsType = formdata.DrugsType.split(',')
        this.$refs.followupEdit.show(flag, data, formdata)
      } else if (flag == 'delete') {
        // 删除
        this.$baseConfirm("确定要删除所选项吗？", '删除', async () => {
          const firstVisitId = data.VisitId
          const res = await pulmonarybadreactionsdelete([firstVisitId])
          let { StatusCode, Message } = res;
          if (StatusCode != 200) {
            return this.$baseMessage(
              Message || '删除失败', 'error'
            )
          }
          this.$baseMessage('删除成功', "success")
          this.funPulmonaryVisitlist()

        },null,"error",)

        this.funPulmonaryVisitlist()

      }
    },

    //后此随访
    async followupEdit(flag, firstVisitId, form, hasinfo) {
      if (flag == 'addfollow') {
        let personId = this.copyData[0].PersonId
        let diagnosisId = this.copyData[0].DiagnosisId
        let treatmentPlan = this.copyData[0].TreatmentPlanName
        const res = await pulmonarybadreactionslist({
          ...form,
          PersonId: personId,
          DiagnosisId: diagnosisId,
          TreatmentPlan: treatmentPlan,
        })
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '预约失败', 'error'
          )
        }
        this.$baseMessage('预约成功', "success")
        this.funPulmonaryVisitlist()
      } else if (flag == 'Modify') {

        const res = await pulmonarybadreactionsupdate({ firstVisitId }, hasinfo)
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '修改失败', 'error'
          )
        }
        this.$baseMessage('修改成功', "success")
        this.funPulmonaryVisitlist()
      }
      this.funPulmonaryVisitlist()
    },
    // 获取列表
    async funPulmonaryVisitlist() {
      let diagnosisId = this.copyData[0].DiagnosisId
      const res = await PulmonaryVisitlist({ DiagnosisId: diagnosisId })
      let { StatusCode, Message } = res;
      if (StatusCode != 200) {
        return this.$baseMessage(
          Message || '加载失败', 'error'
        )
      }
      this.tableData = res.Response.items
      this.tableData.forEach(item => {
        item.DiagnosisTime = this.copyData[0].DiagnosisTime
        item.ResponsibilityName = this.copyData[0].ResponsibilityName
        item.AdminOrganizationName = this.copyData[0].AdminOrganizationName
      })
    },
    // 2次随访
    async handlerEdit2(flag, data, formdata) {
      //新增
      if (flag == 'addfollow') {
        this.$refs.followupEdit2.show(flag, this.inputData)
      } else if (flag == 'details') {
        // 详情
        const res = await PulmonaryPatientVisitdetails({ patientVisitId: data.VisitId })
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '数据获取失败', 'error'
          )
        }
        formdata = res.Response
        this.$refs.xqfollowEdit2.show(flag, data, formdata)
      } else if (flag == 'Modify') {
        // 修改（先获取详情）
        const res = await PulmonaryPatientVisitdetails({ patientVisitId: data.VisitId })
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '数据获取失败', 'error'
          )
        }
        formdata = res.Response
		formdata.Symptom = formdata.Symptom.split(',')
		formdata.DrugsType = formdata.DrugsType.split(',')
        this.$refs.followupEdit2.show(flag, data, formdata)
      } else if (flag == 'delete') {
        // 删除
        this.$baseConfirm("确定要删除所选项吗？", '删除', async () => {
          const patientVisitId = data.VisitId
          const res = await PulmonaryPatientVisitdelete([patientVisitId])
          let { StatusCode, Message } = res;
          if (StatusCode != 200) {
            return this.$baseMessage(
              Message || '删除失败', 'error'
            )
          }
          this.$baseMessage('删除成功', "success")
          this.funPulmonaryVisitlist()
        },null,"error",)

        this.funPulmonaryVisitlist()


      }

    },

    async followupEdit2(flag, patientVisitId, form, hasinfo) {
      // 新增
      if (flag == 'addfollow') {
        let personId = this.copyData[0].PersonId
        let diagnosisId = this.copyData[0].DiagnosisId
        const res = await PulmonaryPatientVisitlist({
          ...form, PersonId: personId, DiagnosisId: diagnosisId
        })
        let { StatusCode, Message } = res;

        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '预约失败', 'error'
          )
        }
        this.$baseMessage('预约成功', "success")
        this.funPulmonaryVisitlist()
      } else if (flag == 'Modify') {

        const res = await PulmonaryPatientVisitupdate({ patientVisitId }, hasinfo)
        let { StatusCode, Message } = res;
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '修改失败', 'error'
          )
        }
        this.$baseMessage('修改成功', "success")
        this.funPulmonaryVisitlist()
      }
      this.funPulmonaryVisitlist()


    },
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

.echartRoom {
  width: 40%;
  height: 100%;
  // float: left;

}

.echartRoom>p {
  color: black;
  font-size: 25PX;
  font-weight: 600;
  margin: 15px 0 0 20px;
}

.calendar {
  width: 60%;
  height: 100%;
  background: rgb(219, 228, 173);
  // float: left;

}

.tablebox {
  width: 100%;
  height: 75%;
  float: left;
  margin-top: 10px;
}

.el-button--medium.is-round {
  margin-top: 30px;
  margin-left: 90%;
}

.flex_center {
  display: flex;
  margin: 0 auto;
}
</style>