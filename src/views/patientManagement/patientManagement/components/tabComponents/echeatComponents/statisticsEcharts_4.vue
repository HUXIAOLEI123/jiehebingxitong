<template>
	<div class="echartroom">

		<div ref="charts" id="map"> </div>

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
				return this.num
			},
			initechart() {
				this.charts = echarts.init(this.$refs.charts);
				this.charts.setOption({
					tooltip: {
						trigger: 'axis',
						formatter: function(params) {
							var result = '';
							result += `<div>
						    ${params[0].axisValue}</br>
						    <div style="display: flex;align-items: center;"><div style="background-color:${params[0].color};height:10px;width:10px;border-radius: 10px;margin-top:5px;margin-right:5px"></div>${params[0].seriesName}${Math.abs(params[0].data[1])}</div>
						</div>`
							return result
						}
					},
					legend: {
						data: ['正常', '异常'],
						right: '35%',
						bottom: '0%'
					},

					calculable: true,
					xAxis: [{
						type: 'category',

						data: this.EchartList.xAxis,
						nameLocation: 'center'
					}],

					yAxis: [

						{
							type: 'value',
							show: false,
						}
					],
					// 

					series: [

						{
							name: '正常',
							type: 'scatter',
							color: '#0600FF',
							itemStyle: {
								// 控制data正负值显示不同颜色
								// normal: {
								//     color: function (params) { 
								//       //根据数值大小设置相关颜色
								//         if (params.value > 0) {
								//             return '#0600FF'
								//         } else {
								//             return '#D8001B'
								//         }
								//     },

								// }
							},

							data: this.EchartList.AbnormalScatters,

						},
						{
							name: '异常',
							type: 'scatter',
							color: '#D8001B',
							data: this.EchartList.NormalScatters,

						}
					]

				})
			},
		},

		mounted() {
			this.initechart()

		}
	}
</script>

<style lang="scss" scoped>
	.echartroom {
		width: 100%;
		height: 83%;
		position: relative;
		margin-top: 5%;

	}

	#map {
		width: 100%;
		height: 100%;



	}
</style>
