<template>
  <div class="echartroom">
    <div ref="charts" id="map"> </div>

  </div>
</template>

<script>
import * as echarts from "echarts";
import {
   pulmonarybadreactionecharts
} from '@/api/PulmonaryBadReaction.js'
export default {
 props: ['EchartList'],
  data() {
    return {
      charts: null,
      num:75,
     
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
  created(){

  },
  methods: {

    

echartsValue(){
  return this.num
},
    initechart() {
  this.charts = echarts.init(this.$refs.charts);
  this.charts.setOption({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['已处置', '未处置'],
          right: '37%',
          bottom:'5%'
},

  calculable: true,
  xAxis: [
    {
      type: 'category',    
      data: this.EchartList.xAxis
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [

    {
      name: '已处置',
      type: 'bar',
      color: '#1E6BEB',

      data:this.EchartList.ManagementyAxis,
     
    },
    {
      name: '未处置',
      type: 'bar',
      color: '#48F4FC',

      data: this.EchartList.NotManagementyAxis,
    
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