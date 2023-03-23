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
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: chartData.grid||{
                        left: '0',
                        right: '5%',
                        bottom: '-15px',
                        top: '10px',
                        containLabel: true
                    },
                    axisPointer:{
                        clickable:true,
                        type : 'line',        // 默认为直线，可选为：'line' | 'shadow'
                        lineStyle:{
                            color:'rgba(0,0,0,0)',
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data:chartData.legendData,   
                            triggerEvent:true,                         
                            splitLine :{//网格线
                                lineStyle:{
                                    color: ['#74839C'],
                                    width:0.5 ,
                                    type:'dashed'                                 
                                } ,
                                show:true,                          
                            }, 
                            axisLine: {
                                lineStyle: {
                                    color: '#74839C',
                                    width:0.5,//坐标线的宽度
                                    type:'dashed'
                                },
                                show:true,
                            },       
                            axisLabel: {  
                                show:true,
                                interval:0,//横轴信息全部显示
						        rotate:-30,//-30度角倾斜显示
                                textStyle: {
                                    fontSize: 9,
                                    color:'#A7BEE1'
                                }
                            },                      
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#74839C' ,
                                    width:0.5,
                                    type:'dashed'                                     
                                },
                                show:true,
                            },
                            splitLine :{//网格线
                                lineStyle:{
                                    color: ['#74839C'],
                                    width:0.5,
                                    type:'dashed'                                 
                                },
                                show:true //隐藏或显示                            
                            }, 
                            axisLabel: {  
                                show:true
                            },     
                        }
                    ],
                    series: [                         
                        {
                            data: chartData.series.data,
                            type: 'bar',                             
                    //         barMaxWidth:60,
                            itemStyle:{
                                normal:{
                                    color:function(params){
                                        var colorlist = chartData.series.color;
                                        return colorlist[params.dataIndex];
                                    },
                                    label: {
                                        show: true, //开启显示
                                        textStyle: { //数值样式
                                            color: '#fff',
                                            fontSize: 12
                                        },
                                        formatter: function(params){
                                            if(params.value==0){
                                                return ""
                                            }
                                            return params.value;
                                        }
                                    }
                                }
                            },
                        }
                    ]
                }
            );
        
        }
    }
}
</script>