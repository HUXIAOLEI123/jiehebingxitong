<template>
  <div class="room2">
    <div class="heard">
      <!-- 图表 -->
      <div class="echartRoom">
        <p>服药完成率(天)</p>
        <MedicinerateEchart :tableData="tableData"></MedicinerateEchart>
      </div>
      <!-- 日历 -->
      <div class="calendar">
        <CalendarTime :diagnosisId="DiagnosisId" :tableData="tableData"></CalendarTime>
      </div>
    </div>
    <div class="searchtime">
      <label style="margin-right: 10px">服药时间</label>
      <el-date-picker
        @change="changeSubmitTimes"
        v-model="form.SubmitTimes"
        unlink-panels
        type="datetimerange"
        align="center"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
    </div>
    <div>
      <el-button
        :disabled="inputData.IsClosed ? true : false"
        class="exportBtn Btn addBtn2"
        type="success"
        round
        @click="takeMedicineToday"
      >
        今日服药确认
      </el-button>
      <el-button :disabled="inputData.IsClosed ? true : false" class="exportBtn Btn addBtn1" type="success" round @click="handlersure">
        批量确认
      </el-button>
      <el-button :disabled="inputData.IsClosed ? true : false" class="addBtn Btn" type="primary" round @click="clickPulmonaryMedicineList">
        补录服药
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="tablebox">
      <vxe-table
        auto-resize
        border
        align="center"
        height="300"
        show-header-overflow
        show-overflow
        :row-config="{ isHover: true }"
        :data="tableData"
        @checkbox-change="checkboxChange"
        @checkbox-all="checkboxAll"
      >
        <vxe-column type="checkbox" width="60"></vxe-column>
        <vxe-column field="RegisterTime" title="确诊日期">
          <template slot-scope="{ row }">
            <span>
              {{ row.RegisterTime | parseTime('{y}-{m}-{d}') }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="DataSources" title="数据来源">
          <template slot-scope="{ row }">
            <span>
              {{ row.DataSources | DataSourceszhuan }}
            </span>
          </template>
        </vxe-column>
        <vxe-column field="ResponsibilityName" title="责任医生"></vxe-column>
        <vxe-column field="AdminOrganizationName" title="管理机构"></vxe-column>
        <vxe-column field="SubmitTime" title="服药时间"></vxe-column>
        <!-- 服药状态判定 -->
        <vxe-column field="SubmitConfirm" title="服药状态">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.SubmitConfirm == 1">已确认</el-tag>
            <el-tag type="warning" v-else>未确认</el-tag>
          </template>
        </vxe-column>
        <!-- 播放链接 -->
        <!-- <vxe-column title="服药视频">
          <template #default="{ row }">
          </template>
        </vxe-column> -->

        <vxe-column title="操作" width="200" fixed="right">
          <template #default="{ row }">
            <div class="flex_center">
              <div v-if="row.VideoUrl" @click="watchvideo(row)">点击查看视频</div>
              <div class="Divider" v-if="row.SubmitConfirm !== 1 && row.VideoUrl"></div>
              <el-link type="danger" @click="handlerEdit(row)" v-if="row.SubmitConfirm !== 1">去确认</el-link>
              <div v-if="row.SubmitConfirm == 1 && !row.VideoUrl" style="color: #00c279">已确认</div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- 分页器 -->
      <div class="app-pagination">
        <el-pagination
          ref="elPage"
          :layout="paginationLayout"
          :total="total"
          :current-page="paParams.PageNumber"
          :page-size="paParams.PageSize"
          @current-change="handlerPageChange"
          @size-change="handlerPageSizeChange"
        ></el-pagination>
      </div>
      <!-- <Medicinetab2Edit ref="medicinetab2Edit"></Medicinetab2Edit> -->
    </div>
    <Watachvideo ref="watachvideo"></Watachvideo>
    <PulmonaryMedicineList ref="pulmonarymedicinelist" @selectSubmit="funpulmonarymedicineslist"></PulmonaryMedicineList>
    <!-- <el-dialog style="z-index: 99;" title="视频查看" :visible.sync="flagvideo" :close-on-click-modal="true" width="50%" @close="close"
	<video style="width: 50%;height: 50%;" :src="videourl" v-if="flagvideo" poster controls loop ></video>
	</el-dialog> -->
  </div>
</template>

<script>
// 图表
import MedicinerateEchart from './echeatComponents/medicinerateEchart.vue'
// 日历
import CalendarTime from './echeatComponents/calendarTime.vue'

import Watachvideo from './echeatComponents/watachvideo.vue'
//异常服药补录
import PulmonaryMedicineList from './EditComponents/PulmonaryMedicineList.vue'
import { pulmonarymedicineslist, pulmonarymedicinessruas, pulmonarymedicinesMedicinesupplement } from '@/api/PulmonaryMedicine.js'
export default {
  name: 'Medicinetab2',
  components: {
    MedicinerateEchart,
    CalendarTime,
    Watachvideo,
    PulmonaryMedicineList
  },
  props: ['inputData'],
  data () {
    return {
      form: {
        SubmitTimes: ''
      },
      tableData: [],
      checkRows: [],
      // 列表派发id
      DiagnosisId: '',
      videourl: '', //视频路径
      flagvideo: false, //是否展示视频
      total: 0,
      paParams: {
        PageNumber: 1,
        PageSize: 10,
      },
      toDayTime: ""

    }
  },
  filters: {
    DataSourceszhuan (string) {
      if (string == '1') {
        return '小程序上传'
      } else if (string == '2') {
        return '医生上传'
      } else if (string == '3') {
        return '电子药盒上传'
      } else {
        return ''
      }
    }
  },
  created () {
    this.DiagnosisId = this.inputData.DiagnosisId
    var datetime = new Date();
    var year = datetime.getFullYear(); //获取完整的年份(4位,如:1970)
    var month = datetime.getMonth() + 1; //获取月份(返回0-11,0代表1月,用的时候记得加上1)
    var date = datetime.getDate(); //获取日(返回1-31)
    var time = 'T02:22:38.209Z'
    // var time = '00:00:00'
    //判断小于等于9月的时候在月份前加一个"0"
    if (month <= 9) {
      month = "0" + month;
    }
    //判断小于等于9号的时候在天数前加一个"0"
    if (date <= 9) {
      date = "0" + date;
    }
    this.form.SubmitTimes = year + "-" + month + "-" + '' + date + time; //给建档时间默认当前
    this.toDayTime = year + "-" + month + "-" + '' + date + time; //给建档时间默认当前
    this.funpulmonarymedicineslist()
  },
  methods: {
    // 列表
    async funpulmonarymedicineslist () {

      const res = await pulmonarymedicineslist({
        DiagnosisId: this.DiagnosisId,
        SubmitTimes: this.form.SubmitTimes,
        PageNumber: this.paParams.PageNumber,
        PageSize: this.paParams.PageSize,
      })
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
      this.tableData = Response.items
      let arr = []
      arr = Response.items;
      arr.forEach((i) => {
        if (i.VideoUrl) {
          //引入的后端地址
          let origin = process.env.VUE_APP_BASE;
          // i.VideoUrl = origin + i.VideoUrl.slice(8, i.VideoUrl.length);
          i.VideoUrl = origin + i.VideoUrl
        }
      })
      this.tableData = arr;
      this.total = Response.TotalCount


    },
    // 确认
    handlerEdit (data) {
      this.$baseConfirm('确认服药', null, async () => {
        var MedicineId = []
        MedicineId.push(data.MedicineId);
        const res = await pulmonarymedicinessruas(MedicineId)
        let {
          StatusCode,
          Message
        } = res
        if (StatusCode != 200) {
          return this.$baseMessage(
            Message || '确认失败', 'error'
          )
        }
        this.funpulmonarymedicineslist()
        this.$baseMessage('确认成功', "success")
      })

    },
    //今日服药
    async takeMedicineToday () {
      await pulmonarymedicinesMedicinesupplement({
        diagnosisId: this.DiagnosisId,
        Arr: [this.toDayTime]
      })
      this.$baseMessage('服药成功', "success")
    },
    //选择服药时间
    changeSubmitTimes (value) {
      this.form.SubmitTimes = value;
      this.funpulmonarymedicineslist()
    },
    watchvideo (e) {
      this.videourl = e.VideoUrl
      // this.flagvideo = true;
      this.$refs.watachvideo.show(this.videourl)
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
    // 异常服药补录列表
    clickPulmonaryMedicineList () {
      var param = {
        title: '服药记录',
        visible: true,
        DiagnosisId: this.DiagnosisId,
        num: 1,
        SubmitConfirm: 0,
      }
      this.$refs.pulmonarymedicinelist.getDetail(param)
    },
    // 批量确认
    handlersure () {
      let len = this.checkRows.length;
      if (!len) {
        return this.$baseMessage("至少选择一项！", "error");
      }
      this.$baseConfirm("确定要服药选中的数据吗？", null,
        // 将选中的数据添加属性删除
        async () => {
          let storeId = this.checkRows.map((item) => {
            return item.MedicineId
          })
          //派发请求
          const res = await pulmonarymedicinessruas(storeId)
          this.funpulmonarymedicineslist()
          this.$baseMessage('确认成功', "success")
        }
      )

    },
    // 分页当前页变化回调
    handlerPageChange (PageNumber) {
      this.paParams.PageNumber = PageNumber;
      this.funpulmonarymedicineslist()
    },
    // 分页每页条数变化回调
    handlerPageSizeChange (PageSize) {
      this.paParams.PageSize = PageSize;
      this.funpulmonarymedicineslist()
    },
    //取消
    close () {
      this.flagvideo = false;
    },
  },
  watch: {
    inputData: function (val) {
      this.DiagnosisId = this.inputData.DiagnosisId
      var datetime = new Date();
      var year = datetime.getFullYear(); //获取完整的年份(4位,如:1970)
      var month = datetime.getMonth() + 1; //获取月份(返回0-11,0代表1月,用的时候记得加上1)
      var date = datetime.getDate(); //获取日(返回1-31)
      //判断小于等于9月的时候在月份前加一个"0"
      if (month <= 9) {
        month = "0" + month;
      }
      //判断小于等于9号的时候在天数前加一个"0"
      if (date <= 9) {
        date = "0" + date;
      }
      this.form.SubmitTimes = year + "-" + month + "-" + date; //给建档时间默认当前
      this.funpulmonarymedicineslist()
    }
  }
}
</script>
<style lang="scss" scoped>
.room2 {
  width: 100%;
  height: 500px;
  // overflow: hidden;
  position: relative;
}

.heard {
  width: 100%;
  // background:red;
  height: 300px;
  display: flex;
}

.echartRoom {
  width: 50%;
  height: 100%;

  // float: left;
}

.echartRoom > p {
  color: black;
  font-size: 25px;
  font-weight: 600;
  margin: 15px 0 0 20px;
}

.calendar {
  width: 50%;
  height: 100%;
  background: rgb(219, 228, 173);
  // float: left;
}

.tablebox {
  width: 100%;
  height: 75%;
  float: left;
  margin-top: 100px;
  // overflow-y: auto;
}

.addBtn {
  width: 7%;
  position: absolute;
  right: 0.5%;
  top: 71%;
}

.addBtn1 {
  width: 7%;
  position: absolute;
  right: 9%;
  top: 71%;
}
.addBtn2 {
  width: 8%;
  text-align: center;
  position: absolute;
  right: 18%;
  top: 71%;
}

.searchtime {
  position: absolute;
  left: 0.5%;
  top: 71%;
}
</style>
