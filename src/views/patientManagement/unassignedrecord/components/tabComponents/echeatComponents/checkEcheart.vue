<template>
  <div class="echartroom">
    <div ref="charts" id="map"> </div>

  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ['EchartList'],
  data() {
    return {
      charts: null,
      num:75
    }
  },
  watch:{
    EchartList:{
      handler:function(newval,oldval){
        this.$nextTick(()=>{
          this.num=newval
          
          this.initechart()
        })
      }
    }
  },
  computed:{
    nums(){
      return this.num.AbnormalMedicationCount+this.num.AdverseReactionCount+this.num.DiscontinueTreatmentCount
    }

  },
  methods: {

echartsValue(){
  return this.num.AbnormalInspectionCount
},
    initechart() {
      this.charts = echarts.init(this.$refs.charts);

      this.charts.setOption({
        tooltip: {
          trigger: 'item',
		show: false,// 关闭鼠标移上去后显示浮框信息
        },
        legend: {
          top: '36%',
          right: '10%',
          orient: 'vertical',
          itemWidth: 20,
          itemHeight: 20,
		selectedMode: false, // 取消标题点击后事件-这里显示和隐藏指定项
        },
        series: [
          {
			hoverAnimation: false, // 取消掉环形图鼠标移上去时自动放大
            // name: '异常服药次数',
            type: 'pie',
            color: ['#F2637A', '#F0F0F0'],
            // 控制饼状图的环形宽度
            radius: ['58%', '70%'],
            avoidLabelOverlap: false,
            // 设置数据中间样式????
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: this.echartsValue,
                  textStyle: {
                fontSize: 25,
               color:'#252D57'
              }
              },
            
            },
            left: '20%',
            right: '20%',
            top: 0,
            bottom: '0%',
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.num.AbnormalInspectionCount, },
              { value: this.nums, },


            ]
          }
        ]

      })
    },
  },

  mounted() {
    this.initechart()
  }
}
</script>

<style lang="scss" scoped>
.echartroom {
  width: 100%;
  height: 83%;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
 
}
</style>