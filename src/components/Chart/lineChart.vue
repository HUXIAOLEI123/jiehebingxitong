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
            default: 'lineChart'
        },
        className: {
            type: String,
            default: 'lineChart'
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
        }
    },
    data() {
        return {
         chart: null
        }
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                if(val){                    
                    const vm = this
                    vm.$nextTick(()=> {
                        vm.updateChartView()
                    })   
                }                             
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
            this.chart.setOption({
                title:Object.assign( {         
                    text:''
                }, chartData.title),
                tooltip: Object.assign( {    
                    trigger: 'axis'
                }, chartData.tooltip),
                legend: Object.assign({               
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight:14,
                    itemGap:13,
                    data: [],
                    left:'0',
                    textStyle: {
                        fontSize:12,
                        color:'#B7D5FE'
                    }
                }, chartData.legend),    
                grid: Object.assign( {    
                    top:40,
                    left: '5',               
                    containLabel: true
                },chartData.grid),    
                xAxis: [{
                    type: 'value',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#51688E',
                            width:0.5,
                            type:'dashed'
                        }
                    },
                    axisLabel: {   
                        show:false,
                        interval: 0,                
                        textStyle: {
                            fontSize: 11,
                            color:'#A7BEE1'
                        }
                    },
                    splitLine :{//网格线
                        lineStyle:{
                            color: ['#74839C'],
                            width:0.5,
                            type:'dashed'//设置网格线类型 dotted：虚线solid:实线
                        },
                        show:true //隐藏或显示
                    },
                    data:chartData.xAxisData
                }],
                yAxis: [{
                    type: 'value',               
                    axisLine: {
                        lineStyle: {
                            color: '#51688E',
                            width:0.5,
                            type:'dashed'
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
                            color: ['#74839C'],
                            width:0.5,
                            type:'dashed'//设置网格线类型 dotted：虚线solid:实线
                        },
                        show:true //隐藏或显示
                    }
                }],
                series:chartData.series
            })
        }
    }
}
</script>