<template>
  <div class="echartroom">
    <div ref="charts" id="map"> </div>
<div class="footer">
<div> <span>检查总数:  </span><span>{{ EchartList.InspectCount }}</span></div>
<div> <span>异常数
:  </span><span>{{ EchartList.AbnormalCount }}</span></div>
<div> <span>正常数:  </span><span>{{ EchartList.NormalCount }}</span></div>
</div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ['EchartList'],
  data() {
    return {
      charts: null,
  
    }
  },
  watch:{
    EchartList:{
      handler:function(newval,oldval){
        this.$nextTick(()=>{
          this.EchartList=newval
          
          this.initechart()
        })
      }
    }
  },

  methods: {
echartsValue(){
  let a= Number(this.EchartList.AbnormalCount/this.EchartList.InspectCount*100).toFixed(2)

  
  let b=this.EchartList.AbnormalCount/this.EchartList.InspectCount

      return b==b ? a+='%': 0
},
    initechart() {
      this.charts = echarts.init(this.$refs.charts);

      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          show:false
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
            color: ['#EB0E72', '#8CAADD'],
            // 控制饼状图的环形宽度
            radius: ['63%', '70%'],
            avoidLabelOverlap: false,
            // 设置数据中间样式????
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: this.echartsValue,
                  textStyle: {
                fontSize: 25,
               color:'#247FFF'
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
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.EchartList.AbnormalCount},
              { value: this.EchartList.NormalCount },


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
}

#map {
  width: 100%;
  height: 100%;
 
}
.footer{
  width: 100%;
  height: 30px;
  // background:red;
  display: flex;
  justify-content: space-around;
}
.footer>div>span{
  color: #333333;
  font-weight: 400;
  
}
</style>