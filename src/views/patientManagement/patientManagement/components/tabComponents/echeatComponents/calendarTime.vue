<template>
  <div id="map">
    <!-- <h1>111{{diagnosisId}}</h1> -->
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date, data }">
        <span style="position: relative">
          {{ data.day.split('-').slice(2).join('') }}
          <span v-for="item in response.MedicationCalendars">
            <span v-if="item.date.indexOf(data.day.split('-').slice(1).join('-')) != -1">
              <!-- {{item.MedicationSituation}} -->
              <div v-if="item.MedicationSituation == 0" class="abnormal"></div>
              <!-- 未服药 -->
              <div v-if="item.MedicationSituation == 1" class="normal"></div>
              <!-- 已服药 -->
              <div v-if="item.MedicationSituation == 2" class="nonormal" style=""></div>
              <!-- 不规则服药 -->
              <!-- <div v-if="item.MedicationSituation == 4" class="future" style=""></div> -->
              <!-- 未来服药不显示样式 -->
            </span>
          </span>
        </span>
      </template>
    </el-calendar>
    <div class="tiptitle">
      <div class="abnormal"></div>
      <div style="margin-left: 5px">未服药</div>
      <div class="normal"></div>
      <div style="margin-left: 5px">已服药</div>
      <div class="nonormal"></div>
      <div style="margin-left: 5px">服药异常</div>
      <!-- <div class="future"></div>
      <div style="margin-left: 2px">未来服药</div> -->
    </div>
  </div>
</template>

<script>
import {
  pulmonarymedicinestime
} from '@/api/PulmonaryMedicine.js'
export default {
  // 接收参数ID
  props: ['diagnosisId', 'tableData'],
  data () {
    return {
      value: new Date(),
      response: {},
      obj: {
        starttime: '',
        endtime: ''
      }
    }
  },
  watch: {
    value: {
      handler (newValue, oldValue) {
        this.funpulmonarymedicinestime()
      },
    },
    diagnosisId: function (val) {
      this.funpulmonarymedicinestime()
    },
    tableData: function (val) {
      this.funpulmonarymedicinestime()
    },
  },
  created () {
    this.funpulmonarymedicinestime()
  },
  methods: {
    // 处理时间格式的方法
    formDate (data, format = "yyyy-MM-DD") {
      let time = data ? {
        "M+": data.getMonth() + 1,
        "D+": data.getDate(),
        "H+": data.getHours(),
        "m+": data.getMinutes(),
        "s+": data.getSeconds(),
      } : {}

      if (/(y+)/i.test(format)) {
        format = format.replace(
          RegExp.$1,
          (data && (data.getFullYear() + "")).substr(4 - RegExp.$1.length)
        );
      }

      for (let k in time) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ?
              time[k] :
              ("00" + time[k]).substr(("" + time[k]).length)
          );
        }
      }
      return format;
    },

    //获取当月时间初始时间+格式化
    IdTimefun () {
      // 当月第一天0点
      let fomatValue = new Date(this.formDate(this.value));
      fomatValue.setDate(1);
      fomatValue.setHours(0);
      fomatValue.setSeconds(0);
      fomatValue.setMinutes(0);
      // data.getTime() 月初0点时间戳

      let Oneday = this.formDate(new Date(fomatValue.getTime()), "yyyy-MM-DD HH:mm:ss");


      if (fomatValue && fomatValue.getMonth() === 11) {
        fomatValue.setMonth(0);
      } else {
        fomatValue.setMonth(fomatValue && fomatValue.getMonth() + 1);
      }
      fomatValue.setDate(1);
      fomatValue.setHours(0);
      fomatValue.setSeconds(0);
      fomatValue.setMinutes(0);
      const timeEnd = (parseInt(fomatValue.getTime() / 1000) - 1) * 1000;
      // timeEnd 月末11:59时间戳
      let Endday = this.formDate(new Date(timeEnd), "yyyy-MM-DD HH:mm:ss")
      return [Oneday, Endday]
    },
    getfirstDateAndlastDate () {
      var dateStr = this.value;
      var date = new Date(dateStr);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      if (month > 12) {
        month = 1;
        year++;
      }
      if (month < 10) {
        month = '0' + month
      }
      var monthLastDay = new Date(year, month, 0).getDate();
      var firstDate = year + '-' + month + '-' + '01';
      var lastDate = year + '-' + month + '-' + monthLastDay;
      return [firstDate, lastDate]
    },
    //请求数据
    async funpulmonarymedicinestime () {
      let startDate = this.getfirstDateAndlastDate()[0]
      let endDate = this.getfirstDateAndlastDate()[1]
      const res = await pulmonarymedicinestime(this.diagnosisId, startDate, endDate)
      this.$bus.$emit('medicine', res.Response)
      //服药日历 .MedicationCalendars
      this.response = res.Response

    },



  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
  position: relative;
}

::v-deep .el-calendar-table .el-calendar-day {
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.abnormal {
  background-color: #ff4323;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-left: 5px;
}

.normal {
  background-color: #46d4a4;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-left: 5px;
}

.future {
  background-color: #252d57;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-left: 5px;
}

.nonormal {
  background-color: #ff23f7;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-left: 5px;
}

.tiptitle {
  display: flex;
  align-items: center;

  position: absolute;
  left: 18%;
  z-index: 1;
  top: 4%;
}
</style>
