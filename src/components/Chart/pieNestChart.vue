<template>
    <!-- 环形图 -->
    <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>
<script>
import resize from './mixins/resize'
export default {
    mixins: [resize],
    props: {        
        id: {
            type: String,
            default: 'barChart'
        },
        className: {
            type: String,
            default: 'barChart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        chartData: {
            type: Object,
            default:()=>{{}},
        },
    },
     data() {
        return {
        chart: null
        }
    },
    watch: {
        chartData: {
            deep: true,
            handler() {
                const vm = this
                vm.$nextTick(()=> {
                    vm.updateChartView()
                })  
            }
        }
    },
    mounted() {
        const vm = this
        vm.$nextTick(()=> {
            vm.chart = vm.$echarts.init(document.getElementById(vm.id));
            vm.updateChartView()        
        })
    },
    beforeDestroy() {
        // 销毁图表实例，避免内存溢出
        if (!this.chart) {return;}
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        updateChartView() {
            let chartData=this.chartData;
            if(!chartData){return;}
               
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(formatter) {
                        if(formatter.name===""){
                            return ''
                        }
                        return formatter.name+':'+formatter.value;
                    }                    
                },
                legend: chartData.legend,
                series:[
                {
                    name: '',
                    type: 'pie',
                    radius: ['10%', '18%'],
                    labelLine: {                      
                      normal:{    
                        length:50,

                        lineStyle: {
                            color: "#7189AA"
                        }
                    },
                    },                        
                    data: [
                        {
                          value: 80, 
                          name: '无创DNA筛查率',
                          itemStyle: {
                            normal: {
                                color: '#D97BAE'
                            }
                          }
                        },
                        {
                            value:20,   
                            itemStyle: {
                              normal: {
                                  color: '#D4E9FE'
                              }
                            },                                                       
                            labelLine:{  
                                show:false,
                                normal:{                                          
                                    length:0,  // 改变标示线的长度
                                    lineStyle: {
                                        color: "transparent"  // 改变标示线的颜色
                                    }
                                },
                            },
                        }
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['26%', '34%'],
                    labelLine: {
                        length:50,
                    },
                    data: [
                        {
                          value: 88, 
                          name: '孕中期血清学筛查率',
                          itemStyle: {
                              normal: {
                                  color: '#90F861'
                              }
                          }
                        },
                        {
                            value:12,
                            itemStyle: {
                                normal: {
                                    color: '#D4E9FE'
                                }
                            },
                            labelLine:{  
                              show:false,
                              normal:{                                          
                                  length:0,  // 改变标示线的长度
                                  lineStyle: {
                                      color: "transparent"  // 改变标示线的颜色
                                  }
                              },
                            },
                        }
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['42%', '50%'],
                    labelLine: {
                        length:50,
                    },
                    data: [
                        {
                          value:90, 
                          name: '产前筛查率',
                            itemStyle: {
                                normal: {
                                    color: '#53D2F9'
                                }
                            }
                        },
                        {
                            value:10,
                            itemStyle: {
                                normal: {
                                    color: '#D4E9FE'
                                }
                            },
                            labelLine:{  
                                show:false,
                                normal:{                                          
                                    length:0,  // 改变标示线的长度
                                    lineStyle: {
                                        color: "transparent"  // 改变标示线的颜色
                                    }
                                },
                            },
                        }
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['58%', '66%'],
                    labelLine: {
                        length:50,
                    },
                    data: [
                        {
                          value:98, 
                          name: '产前宣传率',
                            itemStyle: {
                                normal: {
                                    color: '#B79BF8'
                                }
                            }
                        },
                        {
                            value:2,
                            itemStyle: {
                                normal: {
                                    color: '#D4E9FE'
                                }
                            },
                            labelLine:{  
                                show:false,
                                normal:{                                          
                                    length:0,  // 改变标示线的长度
                                    lineStyle: {
                                        color: "transparent"  // 改变标示线的颜色
                                    }
                                },
                            },
                        }
                    ]
                },
                {
                  name: '',
                  type: 'pie',
                  radius: ['74%', '82%'],
                  labelLine: {
                      length:50,
                  },
                  data: [
                      {
                        value:23, 
                        name: '符合条件的建册率',
                          itemStyle: {
                              normal: {
                                  color: '#FB9393'
                              }
                          }
                      },
                      {
                          value:77,
                          itemStyle: {
                              normal: {
                                  color: '#D4E9FE'
                              }
                          },
                          labelLine:{  
                              show:false,
                              normal:{                                          
                                  length:0,  // 改变标示线的长度
                                  lineStyle: {
                                      color: "transparent"  // 改变标示线的颜色
                                  }
                              },
                          },
                      }
                  ]
                }
              ]
            };
            this.chart.setOption(option);  
        }
    }
}
</script>