<template>
	<div class="echartroom">
		<div ref="charts" id="map"> </div>
		<div class="footer">
			<div> <span>中断服药总数: </span><span>{{ EchartList.DiscontinueTreatmentCount }}</span></div>
			<div> <span>已确认数: </span><span>{{ EchartList.ManagementCount }}</span></div>
			<div> <span>未确认数: </span><span>{{ EchartList.NotManagementCount }}</span></div>
		</div>
	</div>
</template>
<script>
	import * as echarts from "echarts";
	export default {
		props: ['EchartList'],
		data() {
			return {
				charts: null,

			}
		},
		watch: {
			EchartList: {
				handler: function(newval, oldval) {
					this.$nextTick(() => {
						this.EchartList = newval
						this.initechart()
					})
				}
			}
		},
		methods: {
			echartsValue() {
				if(this.EchartList.ManagementCount){
					let a = Number(this.EchartList.ManagementCount / this.EchartList.DiscontinueTreatmentCount * 100).toFixed(2)
					return a += '%'
				  }else{
					let a = 0;
					return  a+='%'
				 }
			},
			initechart() {
				this.charts = echarts.init(this.$refs.charts);

				this.charts.setOption({
					tooltip: {
						trigger: 'item',
						show: false,// 关闭鼠标移上去后显示浮框信息
					},


					legend: {
						top: '36%',
						right: '10%',
						orient: 'vertical',
						itemWidth: 20,
						itemHeight: 20,
						selectedMode: false, // 取消标题点击后事件-这里显示和隐藏指定项

					},
					series: [{
						hoverAnimation: false, // 取消掉环形图鼠标移上去时自动放大
						// name: '异常服药次数',
						type: 'pie',
						color: ['#EB0E72', '#8CAADD'],
						// 控制饼状图的环形宽度
						radius: ['63%', '70%'],
						avoidLabelOverlap: false,
						// 设置数据中间样式????
						label: {
							normal: {
								show: true,
								position: 'center',
								formatter: this.echartsValue,
								textStyle: {
									fontSize: 25,
									color: '#247FFF'
								}
							},

						},
						left: '20%',
						right: '20%',
						top: 0,
						bottom: '0%',
						emphasis: {
							label: {
								show: true,
								fontSize: '25',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: this.EchartList.ManagementCount,
							},
							{
								value: this.EchartList.DiscontinueTreatmentCount,
							},


						]
					}]

				})
			},
		},

		mounted() {
			// this.initechart()
		}
	}
</script>

<style lang="scss" scoped>
	.echartroom {
		width: 100%;
		height: 83%;
	}

	#map {
		width: 100%;
		height: 100%;

	}

	.footer {
		width: 100%;
		height: 30px;
		// background:red;
		display: flex;
		justify-content: space-around;
	}

	.footer>div>span {
		color: #333333;
		font-weight: 400;

	}
</style>
