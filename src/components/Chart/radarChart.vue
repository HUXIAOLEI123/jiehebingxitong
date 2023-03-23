<template>
  <div :id="id" :style="{height:height,width:width}" ></div>
</template>
<script>
import resize from './mixins/resize'
export default {
    mixins: [resize],
    props: {
        id: {
            type: String,
            required: true,
            default: "chartRate"
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        colorObj: {
            type: Object,
            default: function() {
                return {
                    textStyle: "#fff",
                    series: {
                        color: ["#00bcd44a", "transparent"],
                        dataColor: {
                            normal: "#03a9f4"
                        }
                    }
                };
            }
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
    },
    mounted() {
        const vm = this
        vm.$nextTick(()=> {
           // 基于准备好的dom，初始化echarts实例
            vm.chart = vm.$echarts.init(document.getElementById(vm.id)); 
            vm.draw();     
        })
    },
    beforeDestroy() {
        // 销毁图表实例，避免内存溢出
        if (!this.chart) {return;}
        this.chart.dispose();
        this.chart = null;
    },
  methods: {
    draw() {        
      let option = {
        color: ['#0263FF'],
        title: {
            text: '平台在线人数',
            textStyle: {
                fontSize:12,
                color:'#8BF524'
            }
        },
        legend: {
            left: 'center',
            data: []
        },
        radar: [
            {
                indicator: [
                    { text: '观看课程数', max: 100 },
                    { text: '直播数', max: 100 },
                    { text: '观看直播数', max: 100 },
                    { text: '转诊数', max: 100 },
                    { text: '会诊数', max: 100 }
                ],
                center: ['50%', '50%'],
                radius: 60,
                name:{
                    textStyle:{color:'#8BF524'}
                },
            }
        ],
        series: [
            {
                type: 'radar',
                data: [
                    {
                    value: [60, 73, 85, 40, 40],
                    name: '平台在线人数',
                    areaStyle: {
                        color: {
                        colorStops: [{
                            offset: 0,
                            color: "#0E9CFF" // 0% 处的颜色
                            }, {
                            offset: 0.7,
                            color: "rgba(2, 99, 255, 0.16)" // 100% 处的颜色
                            }],
                        }
                    },
                    }
                ]
            },
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>