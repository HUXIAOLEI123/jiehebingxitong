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
        tips: {
            type: Number,
            required: true,
            default:null
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
        tips: {
            deep: true,
            handler() {
              const vm = this
              vm.$nextTick(()=> {
                vm.draw()
              })  
            }
        }
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
      let tips = this.tips;
      let value=tips>100?100:tips;
      let option = {
        title: [
          {
            text: tips * 1 + "%",
            x: "center",
            y: "center",
            textStyle: {
              color: this.colorObj.textStyle,
              fontSize: 16
            }
          }
        ],
        series: [
          {
            type: "pie",
            radius: ["100%", "80%"],
            center: ["50%", "50%"], 
            hoverAnimation: false,
            color: this.colorObj.series.color,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: value,
                itemStyle: {
                  normal: {
                    color: this.colorObj.series.dataColor.normal
                  }
                }
              },
              {
                value: 100 - value
              }
            ]
          }
        ]
      };
      this.chart.setOption(option);
    }
  }
};
</script>