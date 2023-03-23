<template>
  <!-- 年龄分布图表 -->
  <div class="room">
    <div class="title">
      <img src="../../homeimges/icon.png" alt="" />
      <span style="cursor: default">患者年龄分布</span>
    </div>
    <div ref="charts" id="map"></div>
  </div>
</template>

<script>
import { Agedistribution } from '@/api/index.js'
import * as echarts from "echarts";
export default {
  data () {
    return {
      charts: null,
      ageNumberData: {}
    }
  },
  watch: {
    ageNumberData: {
      deep: true,
      handler: function (newval, oldval) {
        this.ageNumberData = newval
        this.initechart()
      }
    }
  },
  computed: {
    totalNumber () {
      return this.ageNumberData.YearsOld0To3 + this.ageNumberData.YearsOld3To12 + this.ageNumberData.YearsOld13To18 + this.ageNumberData.YearsOld19To48 + this.ageNumberData.YearsOld49To64 + this.ageNumberData.YearsOldOver65
    },
    YearsOld0To3 () {
      let a = Number(this.ageNumberData.YearsOld0To3 / this.totalNumber * 100).toFixed(2)
      if (a == 'NaN') return '0%'
      return a += '%'
    },
    YearsOld3To12 () {
      let a = Number(this.ageNumberData.YearsOld3To12 / this.totalNumber * 100).toFixed(2)
      if (a == 'NaN') return '0%'
      return a += '%'
    },
    YearsOld13To18 () {
      let a = Number(this.ageNumberData.YearsOld13To18 / this.totalNumber * 100).toFixed(2)
      if (a == 'NaN') return '0%'
      return a += '%'
    },
    YearsOld19To48 () {
      let a = Number(this.ageNumberData.YearsOld19To48 / this.totalNumber * 100).toFixed(2)
      if (a == 'NaN') return '0%'
      return a += '%'
    },
    YearsOld49To64 () {
      let a = Number(this.ageNumberData.YearsOld49To64 / this.totalNumber * 100).toFixed(2)
      if (a == 'NaN') return '0%'
      return a += '%'
    },
    YearsOldOver65 () {
      let a = Number(this.ageNumberData.YearsOldOver65 / this.totalNumber * 100).toFixed(2)
      if (a == 'NaN') return '0%'
      return a += '%'
    },
  },
  methods: {
    async funAgedistribution () {
      const res = await Agedistribution()
      this.ageNumberData = res.Response
    },
    initechart () {
      this.charts = echarts.init(this.$refs.charts);
      this.charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        // 设置标题的位置和排序
        legend: {
          top: '27%',
          right: '40px',
          orient: 'vertical',
          itemWidth: 20,
          itemHeight: 20,
          textStyle: {
            fontSize: 15,
            color: '#5A5A5A',
            lineHeight: 20
          }
        },
        // 设置图表在容器中的位置grid(饼状图在数据中直接设置)
        series: [
          {
            name: '患者数量',
            type: 'pie',
            color: [
              "#A6A600",
              "#F6CD59",
              "#EA9138",
              "#ED5C3C",
              "#CC2F0C",
              "#64DABD",
            ],
            radius: ['42%', '70%'],
            avoidLabelOverlap: false,

            label: {
              show: false,
              position: 'center'
            },
            left: 0,
            right: '40%',
            top: 10,
            bottom: '8%',
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              },
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.ageNumberData.YearsOld0To3, name: `0-3岁 ${this.YearsOld0To3}` },
              { value: this.ageNumberData.YearsOld3To12, name: `4-12岁 ${this.YearsOld3To12}` },
              { value: this.ageNumberData.YearsOld13To18, name: `13-18岁 ${this.YearsOld13To18}` },
              { value: this.ageNumberData.YearsOld19To48, name: `19-48岁 ${this.YearsOld19To48}` },
              { value: this.ageNumberData.YearsOld49To64, name: `49-64岁 ${this.YearsOld49To64}` },
              { value: this.ageNumberData.YearsOldOver65, name: `65岁以上 ${this.YearsOldOver65}` }
            ]
          }
        ]

      })
    }
  },
  async created () {
    await this.funAgedistribution()
  },
  mounted () {
    // 调用方法显示图表
    this.initechart()
  }
}
</script>

<style lang="scss" scoped>
.room {
  width: 100%;
  height: 100%;
  // position: relative;
  // border: 1px solid red;
}

.title {
  margin: 25px 0 0 22px;
  display: flex;
}

.title > img {
  margin-right: 13px;
}

.title > span {
  font-weight: 400;
  color: #2a2a2a;
  margin-top: 0;
}

// 图表容器
#map {
  width: 100%;
  height: 350px;

  margin-top: 35px;
  // border: 1px solid blue;
}
</style>