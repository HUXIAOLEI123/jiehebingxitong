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
            var option = {
                tooltip: {
                    show:false,
                    trigger: 'item',                
                },           
                legend:Object.assign({
                    show:true,
                    orient: 'vertical',
                    icon: 'rect',
                    itemWidth: 6,
                    itemHeight: 6,
                    left:'0',
                    textStyle:{
                        fontSize:12,
                        color: '#B7D5FE'
                    },
                    data:null,                
                }, chartData.legend),  
                series:chartData.series
            };
            this.chart.setOption(option);  
        }
    }
}
</script>