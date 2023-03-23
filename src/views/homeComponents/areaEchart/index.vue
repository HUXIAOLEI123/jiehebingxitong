<template>

   <div class="room">
    <div class="title">
       <img src="../../homeimges/icon.png" alt="">
       <span style="cursor: default;">患者区域分布TOP5</span>
<div class="routerbox">
   <router-link   to="/testManagement/index" style="color:#4B83FF;float: right; ">查看更多</router-link>
</div>
      
       </div>
    <!-- 患者区域图表 -->
     <div ref="charts" id="map"> </div>
  </div>
</template>

<script>
import {Regionaldistribution} from '@/api/index'
import * as echarts from "echarts";
export default {
  data() {
   return{
  charts: null,
  regionaldata:{}
  }
  },
  watch: {
    regionaldata: {
      deep: true,
   
      handler: function (newval, oldval) {
 
        this.regionaldata = newval

        this.initechart()
      }
    }
  },
  async created() {
    await this.funRegionaldistribution()
  },
  methods: {
async funRegionaldistribution(){
  const res= await Regionaldistribution()
  this.regionaldata = res.Response
  this.regionaldata=JSON.parse(JSON.stringify(this.regionaldata))
 
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
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
   
          data:this.regionaldata.yAxis
        },
        series: [
          {
            // name: '2022',
            type: 'bar',

            data:this.regionaldata.PatientsNumberxAxis,
            color: '#4B83FF'
          },
   
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
  width: 100%;
  // background: green;
}

.title>img {
  margin-right: 13px;
}

.title>span {
  font-weight: 400;
  color: #2A2A2A;
  margin-top: 0;
}
.routerbox{
flex: 1;

  padding-right: 60px;
}

</style>
