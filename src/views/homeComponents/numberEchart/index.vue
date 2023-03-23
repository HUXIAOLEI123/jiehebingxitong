<template>
  <div class="room">
    <div class="title">
      <img src="../../homeimges/icon.png" alt="">
      <span style="cursor: default;">发病数统计</span>
    </div>
    <!-- 发病数图表 -->
    <div ref="charts" id="map"></div>
  </div>
</template>
<script>
import { Casesnumberstatistics } from '@/api/index.js'
import * as echarts from "echarts";
export default {
  data() {
    return {
      charts: null,
      numberData: {}
    }
  },


  watch: {
    numberData: {
      deep: true,
      handler: function (newval, oldval) {
        this.numberData = newval
    
        this.initechart()
      }
    }
  },


  async created() {
    await this.funCasesnumberstatistics()
  },
  methods: {

    async funCasesnumberstatistics() {
      const res = await Casesnumberstatistics()
      this.numberData = res.Response
      this.numberData=JSON.parse(JSON.stringify(this.numberData))
      

    },
    initechart() {
      this.charts = echarts.init(this.$refs.charts);
      this.charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: [
          {
            type: 'category',
            // this.numberData.xAxis
            data:this.numberData.xAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [

          {
            name: '发病的数量',
            type: 'bar',

            color: ['#0D5DE2'],
            // 设置柱状图柱子的宽度
            barWidth: '30%',
            // this.numberData.CasesNumberyAxis
            data: this.numberData.CasesNumberyAxis
          }
        ]
      })
    }
  },

  mounted() {
    this.initechart()
  }
}
</script>

<style lang="scss" scoped>
.room {
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 80%;
}

.title {

  margin: 25px 0 0 22px;
  display: flex;
}

.title>img {
  margin-right: 13px;
}

.title>span {
  font-weight: 400;
  color: #2A2A2A;
  margin-top: 0;

}
</style>