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
            default: 'pieChart'
        },
        className: {
            type: String,
            default: 'pieChart'
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
            vm.chart = vm.$echarts.init(document.getElementById(vm.id))
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
                tooltip: {
                    trigger: 'item'
                },
                legend: Object.assign(
                {                
                    orient: 'vertical',
                    left: 'left',
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 14,
                    left:'20%',                
                    textStyle:{
                        fontSize:12,
                        color: '#B7D5FE'
                    },
                    formatter: function() {
                        return chartData.legend.name
                    }
                }, chartData.legend),    
                tooltip:chartData.tooltip,  
                series: chartData.series
            })
        }
    }
}
</script>