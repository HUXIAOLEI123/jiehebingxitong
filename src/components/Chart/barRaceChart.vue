<template>
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
            default: '200px'
        },
        height: {
            type: String,
            default: '200px'
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
            vm.updateChartView();  
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
            this.chart.setOption(
                {
                    title:chartData.title ,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter:'{c}%'
                    },                    
                    grid: Object.assign( {    
                        left: '0',
                        right: '5%',
                        bottom: '0',
                        top: '29px',
                        containLabel: true
                    },chartData.grid),    
                    xAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#17337E'
                            }
                        },
                        axisLabel: {                   
                            textStyle: {
                            fontSize: 12,
                                color:'#A7BEE1'
                            }
                        },
                        splitLine :{//网格线
                            lineStyle:{
                                color: ['#17337E'],
                                width:0.5,
                                type:'dashed'//设置网格线类型 dotted：虚线solid:实线
                            },
                            show:true //隐藏或显示
                        },
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#17337E'
                            }
                        },
                        axisLabel: {
                            interval:0,                   
                            textStyle: {
                                fontSize: 12,
                                color:'#A7BEE1'
                            },
                            // rotate:"25",
                            formatter : function(params){
                                var newParamsName = "";// 最终拼接成的字符串
                                var paramsNameNumber = params.length;// 实际标签的个数
                                var provideNumber = 20;// 每行能显示的字的个数
                                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                /**
                                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                 */
                                // 条件等同于rowNumber>1
                                if (paramsNameNumber > provideNumber) {
                                    /** 循环每一行,p表示行 */
                                    for (var p = 0; p < rowNumber; p++) {
                                        var tempStr = "";// 表示每一次截取的字符串
                                        var start = p * provideNumber;// 开始截取的位置
                                        var end = start + provideNumber;// 结束截取的位置
                                        // 此处特殊处理最后一行的索引值
                                        if (p == rowNumber - 1) {
                                            // 最后一次不换行
                                            tempStr = params.substring(start, paramsNameNumber);
                                        } else {
                                            // 每一次拼接字符串并换行
                                            tempStr = params.substring(start, end) + "\n";
                                        }
                                        newParamsName += tempStr;// 最终拼成的字符串
                                    }
                                } else {
                                    // 将旧标签的值赋给新标签
                                    newParamsName = params;
                                }
                                //将最终的字符串返回
                                return newParamsName
                            }
                        },                        
                        data:chartData.yAxis.data
                    },
                    series: chartData.series
                }
            )
        }
    }
}
</script>