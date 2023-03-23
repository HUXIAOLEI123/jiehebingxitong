<template>
  <!-- 性别比例分部图表 -->
  <div class="room">
    <div class="title">
      <img src="../../homeimges/icon.png" alt="" />

      <span style="cursor: default">患者男女比例</span>
    </div>

    <div ref="charts" id="map"></div>
  </div>
</template>

<script>
import { Genderdistribution } from '@/api/index.js'
import * as echarts from "echarts";
export default {
  data () {
    return {
      // 图表的初始数据
      charts: null,
      sexNumberData: {
        MaleNumber: 0,
        FemaleNumber: 0

      }
    }
  },

  watch: {
    sexNumberData: {
      deep: true,
      handler: function (newval, oldval) {
        this.sexNumberData = newval
        this.initechart()
      }
    }
  },

  computed: {
    // 男性比例
    manProportion () {
      let Proportion = this.sexNumberData.MaleNumber + this.sexNumberData.FemaleNumber
      let man = Number(this.sexNumberData.MaleNumber / Proportion * 100).toFixed(2)
      if (man == 'NaN') return '0%'
      return man += '%'
    },
    womenProportion () {
      let Proportion = this.sexNumberData.MaleNumber + this.sexNumberData.FemaleNumber
      let women = Number(this.sexNumberData.FemaleNumber / Proportion * 100).toFixed(2)
      if (women == 'NaN') return '0%'
      return women += "%"
    }

  },

  methods: {

    async funGenderdistribution () {
      const res = await Genderdistribution()
      this.sexNumberData = res.Response


    },

    // 定义显示图表数据的方法
    initechart () {
      this.charts = echarts.init(this.$refs.charts);

      this.charts.setOption({
        tooltip: {
          trigger: 'item'
        },


        legend: {
          top: '36%',
          right: '10%',
          orient: 'vertical',
          itemWidth: 20,
          itemHeight: 20,
          textStyle: {
            fontSize: 20,
            color: '#5A5A5A',
            lineHeight: 20
          }
        },
        series: [
          {
            name: '患者数量',
            type: 'pie',
            color: ['#FD81C4', '#1E6BEB',],
            // 控制饼状图的环形宽度
            radius: ['58%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            left: 0,
            right: '40%',
            top: -15,
            bottom: '8%',
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.sexNumberData.FemaleNumber, name: `女性  ${this.womenProportion}` },
              { value: this.sexNumberData.MaleNumber, name: `男性  ${this.manProportion}` },

            ]
          }
        ]

      })
    }

  },
  async created () {
    await this.funGenderdistribution()




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
  position: relative;
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
#map {
  width: 100%;
  height: 350px;
  position: absolute;
  top: 70px;
  // border: 1px solid blue;
}
</style>