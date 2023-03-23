<template>
  <div id="screen" :style="{ width: `${style.width}px`, height: `${style.height}px`, transform: `${style.transform}` }">
    <div class="bg">
      <!-- 标题 -->
      <div>
        <div class="head_title">结核病督导综合监测管理平台</div>
        <div class="head_time">{{ newTime }}</div>
      </div>
      <!-- 中间 -->
      <div class="flexC">
        <div class="content_left">
          <div class="title">督导概况</div>
          <div class="number_of_people">
            <div>
              <img src="../../assets/indexControl/huanzhe.png" alt="" />
              <div class="f14 cFFF">结核病患者数</div>
              <div class="f30 c00FFFF">{{ dashboardSupervisionoverviewData.Patients }}</div>
            </div>
            <div>
              <img src="../../assets/indexControl/dudao.png" alt="" />
              <div class="f14 cFFF">结核病督导人数</div>
              <div class="f30 c00FFFF">{{ dashboardSupervisionoverviewData.Supervision }}</div>
            </div>
            <div>
              <img src="../../assets/indexControl/xiaolv.png" alt="" />
              <div class="f14 cFFF">规范管理率</div>
              <div class="f30 c00FFFF">{{ dashboardSupervisionoverviewData.ManagementRate }}%</div>
            </div>
          </div>
          <div class="flexC content_left_2">
            <div
              style="width: 50%"
              @click="itemClick('结核病患者分布情况')"
              :class="[active == '结核病患者分布情况' ? 'active' : 'noActive']"
            >
              结核病患者分布情况
            </div>
            <div style="width: 50%" @click="itemClick('督导工作情况')" :class="[active == '督导工作情况' ? 'active' : 'noActive']">
              督导工作情况
            </div>
          </div>
          <div style="width: 100%; height: 150px">
            <div id="Cake" style="width: 100%; height: 150px" v-if="active == '结核病患者分布情况'"></div>
            <div style="width: 100%; height: 150px; padding-top: 40px" v-if="active == '督导工作情况'">
              <div class="flexC">
                <div class="dudao_num">
                  <div class="dudao_num_title">服药转换处置数量</div>
                  <div class="value">{{ dashboardSupervisionoverviewData.MedicationConversions }}</div>
                </div>
                <div class="dudao_num">
                  <div class="dudao_num_title">不良反应总数</div>
                  <div class="value">{{ dashboardSupervisionoverviewData.BadReactions }}</div>
                </div>
              </div>
              <div class="flexC">
                <div class="dudao_num">
                  <div class="dudao_num_title">随访总数</div>
                  <div class="value">{{ dashboardSupervisionoverviewData.Visits }}</div>
                </div>
                <div class="dudao_num">
                  <div class="dudao_num_title">检查总数</div>
                  <div class="value">{{ dashboardSupervisionoverviewData.Inspections }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="flexC" style="padding: 0px 27px">
            <div class="content_left_bottom_1">
              <div class="content_left_bottom_text">{{ dashboardSupervisionoverviewData.City }}%</div>
              <div class="content_left_bottom_text2">城区</div>
            </div>
            <div class="content_left_bottom_2">
              <div class="content_left_bottom_text">{{ dashboardSupervisionoverviewData.Town }}%</div>
              <div class="content_left_bottom_text2">乡镇</div>
            </div>
            <div class="content_left_bottom_3">
              <div class="content_left_bottom_text">{{ dashboardSupervisionoverviewData.Male }}%</div>
              <div class="content_left_bottom_text2">男性</div>
            </div>
            <div class="content_left_bottom_4">
              <div class="content_left_bottom_text">{{ dashboardSupervisionoverviewData.Female }}%</div>
              <div class="content_left_bottom_text2">女性</div>
            </div>
          </div>
        </div>
        <div>
          <div class="map_title">地图分布图</div>
          <div class="view_select_type">
            <div style="width: 40%">筛查任务:</div>
            <div>
              <el-select
                v-model="searchForm.Year"
                placeholder="请选择"
                @change="setEachartsData('江西省', JiangxiProvince)"
                :popper-append-to-body="false"
              >
                <!-- <el-option label="全部" value="0"></el-option> -->
                <el-option label="2023年度" value="2023"></el-option>
                <el-option label="2022年度" value="2022"></el-option>
                <el-option label="2021年度" value="2021"></el-option>
                <el-option label="2020年度" value="2020"></el-option>
              </el-select>
            </div>
          </div>
          <div id="Map"></div>
        </div>
        <div class="content_right">
          <div class="content_right_top">
            <div class="title">中断服药数/处置率</div>
            <div id="FYYCBL"></div>
          </div>
          <div class="content_right_bottom">
            <div class="title">不良反应数/处置率</div>
            <div id="BLFYSBL"></div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="flexC">
        <div class="bottom_left_and_right">
          <div class="title">督导异常趋势</div>
          <div id="DDYCQS"></div>
        </div>
        <div class="bottom_content">
          <div class="title">各市督导情况统计</div>
          <div>
            <div class="flexC table_title">
              <div>地区</div>
              <div>耐药筛查率</div>
              <div>规范管理率</div>
            </div>
            <div class="table">
              <template v-for="(item, index) of tableData">
                <div :key="index" :class="[index % 2 == 0 ? 'row1' : 'row2', 'flexC']">
                  <div>{{ item.RegionName }}</div>
                  <div>{{ item.MDRRate }}%</div>
                  <div>{{ item.ManagementRate }}%</div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="bottom_left_and_right">
          <div class="title">随访总数/完成率</div>
          <div id="SFZSWCL"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import indexControl from './minxins/indexControl';
import { removeWatermark, setWaterMark } from '@/utils/waterMark';
import {
  dashboardAbnormaltrend,
  dashboardBadreaction,
  dashboardDiscontinuemedication,
  dashboardMap,
  dashboardSupervisionoverview,
  dashboardVisit,
  dashboardSupervisionstatistics,
} from '@/api/indexControl.js';
export default {
  mixins: [indexControl],
  data() {
    return {
      dashboardSupervisionoverviewData: {
        MedicationConversions: '',
        BadReactions: '',
        Visits: '',
        Inspections: '',
      },
      style: {
        width: '1920',
        height: '1080',
        transform: 'scaleY(1) scaleX(1) translate(-50%, -50%)',
      },
      newTime: '',
      active: '结核病患者分布情况',
      MapData: [],
      tableData: [],
      searchForm: {
        RegionCode: '',
        Year: '2023',
      },
    };
  },
  mounted() {
    let that = this; //防止this指向问题
    that.searchForm.RegionCode = that.$route.query.authRegionCode;
    that.setScale();
    /*窗口改变事件*/
    window.onresize = () => {
      that.setScale();
    };
    this.dateShow(); //展示实时时间
    var timer = setInterval(function () {
      // 判断页面所有资源已加载完毕
      if (document.readyState === 'complete') {
        that.setEachartsData('江西省', that.JiangxiProvince);
        window.clearInterval(timer);
      }
    }, 800);
    removeWatermark();
  },
  methods: {
    //动态计算屏幕宽高
    setScale() {
      const w = window.innerWidth / this.style.width;
      const h = window.innerHeight / this.style.height;
      let scale = { x: w, y: h };
      this.style.transform = 'scaleY(' + scale.y + ') scaleX(' + scale.x + ') translate(-50%, -50%)';
    },
    //切换督导分类
    itemClick(item) {
      this.active = item;
      if (item == '结核病患者分布情况') {
        this.$nextTick(() => {
          this.setCharData(); //结核病分布情况
        });
      } else {
        this.$echarts.init(document.getElementById('Cake')).dispose(); //销毁实例，否则来回几下就变卡了
      }
      this.$forceUpdate();
    },
    //设置echarts图数据
    async setEachartsData(name, data) {
      this.setCharData(); //结核病分布情况
      this.setDDYCQSData(); //督导异常趋势
      this.setSFZSWCLData(); //随访总数/完成率
      this.setFYYCBLData(); //服药异常数/比率
      this.setBLFYSBLData(); //不良反应数/比率
      this.setMAPData(name, data); //地图
      let res = await dashboardSupervisionstatistics(this.searchForm);
      this.tableData = res.Response;
    },
    //设置echarts图数据
    async setCharData() {
      var Cake = this.$echarts.init(document.getElementById('Cake'));
      let res = await dashboardSupervisionoverview(this.searchForm);
      let dataList = [
        {
          name: '3岁以下',
          value: res.Response.YearsOld0To3,
          ratio: ((Number(res.Response.YearsOld0To3) / Number(res.Response.Patients)) * 100).toFixed(2),
        },
        {
          name: '3-12岁',
          value: res.Response.YearsOld3To12,
          ratio: ((Number(res.Response.YearsOld3To12) / Number(res.Response.Patients)) * 100).toFixed(2),
        },
        {
          name: '13-18岁',
          value: res.Response.YearsOld13To18,
          ratio: ((Number(res.Response.YearsOld13To18) / Number(res.Response.Patients)) * 100).toFixed(2),
        },
        {
          name: '19-48岁',
          value: res.Response.YearsOld19To48,
          ratio: ((Number(res.Response.YearsOld19To48) / Number(res.Response.Patients)) * 100).toFixed(2),
        },
        {
          name: '49-64岁',
          value: res.Response.YearsOld49To64,
          ratio: ((Number(res.Response.YearsOld49To64) / Number(res.Response.Patients)) * 100).toFixed(2),
        },
        {
          name: '65岁以上',
          value: res.Response.YearsOldOver65,
          ratio: ((Number(res.Response.YearsOldOver65) / Number(res.Response.Patients)) * 100).toFixed(2),
        },
      ];
      for (let item of dataList) {
        if (item.ratio == 'NaN') {
          item.ratio = 0;
        }
      }
      this.$nextTick(() => {
        this.$set(this.dashboardSupervisionoverviewData, 'Patients', res.Response.Patients);
        this.$set(this.dashboardSupervisionoverviewData, 'Supervision', res.Response.Supervision);
        this.$set(this.dashboardSupervisionoverviewData, 'ManagementRate', res.Response.ManagementRate);
        this.$set(this.dashboardSupervisionoverviewData, 'Male', res.Response.Male);
        this.$set(this.dashboardSupervisionoverviewData, 'Female', res.Response.Female);
        this.$set(this.dashboardSupervisionoverviewData, 'City', res.Response.City);
        this.$set(this.dashboardSupervisionoverviewData, 'Town', res.Response.Town);
        this.$set(this.dashboardSupervisionoverviewData, 'MedicationConversions', res.Response.MedicationConversions);
        this.$set(this.dashboardSupervisionoverviewData, 'BadReactions', res.Response.BadReactions);
        this.$set(this.dashboardSupervisionoverviewData, 'Visits', res.Response.Visits);
        this.$set(this.dashboardSupervisionoverviewData, 'Inspections', res.Response.Inspections);
        this.$forceUpdate();
      });
      let option = {};
      option = {
        legend: {
          show: true,
          left: '55%',
          top: '0%',
          align: 'left',
          orient: 'vertical',
          textStyle: {
            color: '#fff',
          },
          formatter: function (name) {
            for (let item of dataList) {
              if (name == item.name) {
                return name + ` ` + item.value + `人` + ` ` + '占比' + item.ratio + `%`;
              }
            }
          },
        },
        tooltip: {
          trigger: 'item',
          position: ['14%', '25%'],
          formatter: function (param) {
            return param.data.ratio + '%</br>' + param.data.name;
          },
          alwaysShowContent: true,
          tooltip: true,
          borderWidth: 0,
          backgroundColor: 'rgba(50,50,50,0)',
          textStyle: {
            color: '#fff',
            fontSize: 20,
          },
        },
        series: [
          {
            name: '结核病分布情况',
            type: 'pie',
            radius: ['70%', '90%'],
            center: ['25%', '50%'],
            data: dataList,
            label: {
              show: false,
            },
          },
        ],
        color: ['#A6A600', '#F6CD59', '#EA9138', '#ED5C3C', '#CC2F0C', '#64DABD'],
      };
      // 使用刚指定的配置项和数据显示图表。
      Cake.setOption(option);
    },
    //督导异常趋势
    async setDDYCQSData() {
      var DDYCQS = this.$echarts.init(document.getElementById('DDYCQS'));
      let option = {};
      let xData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      let firstIndustry = [];
      let twoIndustry = [];
      let thirdIndustry = [];
      let res = await dashboardAbnormaltrend(this.searchForm);
      let dataList = res.Response;
      for (let item of xData) {
        let arr = dataList.filter(i => {
          return i.Month == item;
        });
        if (arr.length == 0) {
          firstIndustry.push(0);
          twoIndustry.push(0);
          thirdIndustry.push(0);
        } else {
          firstIndustry.push(arr[0].AbnormalMedications);
          twoIndustry.push(arr[0].BadReactions);
          thirdIndustry.push(arr[0].DiscontinuemeDications);
        }
      }
      option = {
        backgroundColor: '#061740',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false,
          },
          nameRotate: 50,
          interval: 1,
          axisLabel: {
            color: 'rgba(36, 173, 254, 1)',
            fontSize: '1rem',
            rotate: 40,
          },
          axisLine: {
            show: false,
          },
          data: xData,
        },
        yAxis: {
          type: 'value',
          name: '总天数',
          //坐标轴线样式
          splitLine: {
            show: true,
            lineStyle: {
              type: 'solid', //solid实线;dashed虚线
              color: 'rgba(36, 173, 254, 0.2)',
            },
          },
          axisLabel: {
            show: true,
            color: '#fff',
          },
          nameTextStyle: {
            color: '#fff',
          },
        },
        series: [
          //let legendData = ['服药异常数', '不良反应', '中断治疗']; //图例
          {
            name: '服药异常数',
            data: firstIndustry,
            type: 'line',
            smooth: 1,
            symbolSize: 0,
            lineStyle: {
              show: true,
              color: '#00FBD2',
              width: 5,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: '#00FBD290',
                  },
                  {
                    offset: 1,
                    color: '#00FBD210',
                  },
                ],
                global: false,
              },
            },
          },
          {
            name: '不良反应',
            data: twoIndustry,
            type: 'line',
            smooth: 1,
            symbolSize: 0,
            lineStyle: {
              show: true,
              color: '#1BC7FF',
              width: 5,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: '#1BC7FF90',
                  },
                  {
                    offset: 1,
                    color: '#1BC7FF10',
                  },
                ],
                global: false,
              },
            },
          },
          {
            name: '中断服药',
            data: thirdIndustry,
            type: 'line',
            smooth: 1,
            symbolSize: 0,
            lineStyle: {
              show: true,
              color: '#F1FF33',
              width: 5,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: '#F1FF3390',
                  },
                  {
                    offset: 1,
                    color: '#F1FF3310',
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      DDYCQS.setOption(option);
    },
    //随访总数/完成率
    async setSFZSWCLData() {
      var SFZSWCL = this.$echarts.init(document.getElementById('SFZSWCL'));
      let option = {};
      let res = await dashboardVisit(this.searchForm);
      let dataList = res.Response;
      let Xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      let column = [];
      let lineData = [];
      for (let item of Xdata) {
        let arr = dataList.filter(i => {
          return i.Month == item;
        });
        if (arr.length == 0) {
          column.push(0);
          lineData.push(0);
        } else {
          column.push(arr[0].Visits);
          lineData.push(arr[0].Rate);
        }
      }
      option = {
        backgroundColor: '#050f29',
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontWeight: 'normal',
            color: '#A2A5AA',
          },
        },
        xAxis: {
          type: 'category',
          scale: true,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },
          },
          data: Xdata,
        },
        yAxis: [
          {
            type: 'value',
            name: '人数（总次数）',
            nameTextStyle: {
              color: '#A2A5AA',
              fontSize: 10,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#FFF', //改轴颜色
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#A2A5AA', //改轴数值颜色
                fontSize: 10,
              },
            },
          },
          {
            type: 'value',
            name: '环比(%)',
            min: 0,
            max: 100,
            interval: 20,
            nameTextStyle: {
              color: '#A2A5AA',
              fontSize: 10,
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.1)', //改轴颜色
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#6C6F79', //改轴颜色
              },
            },
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                color: '#A2A5AA', //改轴数值颜色
                fontSize: 10,
              },
            },
          },
        ],
        series: [
          {
            z: 1,
            type: 'bar',
            name: '随访总数',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#72F5E4', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#5A92E5', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            barWidth: 14,
            data: column,
          },
          {
            name: '完成率',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10, //设定实心点的大小
            yAxisIndex: 1,
            smooth: 1,
            lineStyle: {
              color: '#00FCF0',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: '#00FCF090',
                  },
                  {
                    offset: 1,
                    color: '#00FBD010',
                  },
                ],
                global: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#00FBD2',
              },
            },
            data: lineData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      SFZSWCL.setOption(option);
    },
    //中断服药数/处置率
    async setFYYCBLData() {
      var FYYCBL = this.$echarts.init(document.getElementById('FYYCBL'));
      let option = {};
      let res = await dashboardDiscontinuemedication(this.searchForm);
      let dataList = res.Response;
      let Xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      let column = [];
      let lineData = [];
      for (let item of Xdata) {
        let arr = dataList.filter(i => {
          return i.Month == item;
        });
        if (arr.length == 0) {
          column.push(0);
          lineData.push(0);
        } else {
          column.push(arr[0].DiscontinuemeDications);
          lineData.push(arr[0].Rate);
        }
      }
      option = {
        backgroundColor: '#050f29',
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontWeight: 'normal',
            color: '#A2A5AA',
          },
        },
        xAxis: {
          type: 'category',
          scale: true,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },
          },
          data: Xdata,
        },
        yAxis: [
          {
            type: 'value',
            name: '人数（总次数）',
            nameTextStyle: {
              color: '#A2A5AA',
              fontSize: 10,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#FFF', //改轴颜色
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#A2A5AA', //改轴数值颜色
                fontSize: 10,
              },
            },
          },
          {
            type: 'value',
            name: '环比(%)',
            min: 0,
            max: 100,
            interval: 20,
            nameTextStyle: {
              color: '#A2A5AA',
              fontSize: 10,
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.1)', //改轴颜色
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#6C6F79', //改轴颜色
              },
            },
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                color: '#A2A5AA', //改轴数值颜色
                fontSize: 10,
              },
            },
          },
        ],
        series: [
          {
            z: 1,
            type: 'bar',
            name: '中断服药数',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#72F5E4', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#5A92E5', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            barWidth: 14,
            data: column,
          },
          {
            name: '处置率',
            type: 'line',
            symbol: 'circle',
            smooth: 1,
            symbolSize: 10, //设定实心点的大小
            yAxisIndex: 1,
            lineStyle: {
              color: '#00FCF0',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: '#00FCF090',
                  },
                  {
                    offset: 1,
                    color: '#00FBD010',
                  },
                ],
                global: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#00FBD2',
              },
            },
            data: lineData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      FYYCBL.setOption(option);
    },
    //不良反应数/比率
    async setBLFYSBLData() {
      var BLFYSBL = this.$echarts.init(document.getElementById('BLFYSBL'));
      let option = {};
      let column = [];
      let lineData = [];
      let res = await dashboardBadreaction(this.searchForm);
      let dataList = res.Response;
      let Xdata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      for (let item of Xdata) {
        let arr = dataList.filter(i => {
          return i.Month == item;
        });
        if (arr.length == 0) {
          column.push(0);
          lineData.push(0);
        } else {
          column.push(arr[0].BadReactions);
          lineData.push(arr[0].Rate);
        }
      }
      option = {
        backgroundColor: '#050f29',
        tooltip: {
          trigger: 'axis',
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontWeight: 'normal',
            color: '#A2A5AA',
          },
        },
        xAxis: {
          type: 'category',
          scale: true,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
              color: '#FFFFFF',
              fontSize: 12,
            },
          },
          data: Xdata,
        },
        yAxis: [
          {
            type: 'value',
            name: '人数（总次数）',
            nameTextStyle: {
              color: '#A2A5AA',
              fontSize: 10,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#FFF', //改轴颜色
              },
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#A2A5AA', //改轴数值颜色
                fontSize: 10,
              },
            },
          },
          {
            type: 'value',
            name: '环比(%)',
            min: 0,
            max: 100,
            interval: 20,
            nameTextStyle: {
              color: '#A2A5AA',
              fontSize: 10,
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.1)', //改轴颜色
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#6C6F79', //改轴颜色
              },
            },
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                color: '#A2A5AA', //改轴数值颜色
                fontSize: 10,
              },
            },
          },
        ],
        series: [
          {
            z: 1,
            type: 'bar',
            name: '不良反应数',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#72F5E4', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#5A92E5', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            barWidth: 14,
            data: column,
          },
          {
            name: '处置率',
            type: 'line',
            symbol: 'circle',
            symbolSize: 10, //设定实心点的大小
            yAxisIndex: 1,
            smooth: 1,
            lineStyle: {
              color: '#00FCF0',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: '#00FCF090',
                  },
                  {
                    offset: 1,
                    color: '#00FBD010',
                  },
                ],
                global: false,
              },
            },
            itemStyle: {
              normal: {
                color: '#00FBD2',
              },
            },
            data: lineData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      BLFYSBL.setOption(option);
    },
    //地图
    async setMAPData(name, data) {
      var that = this;
      let res = await dashboardMap(this.searchForm);
      this.MapData = res.Response;
      var Map = this.$echarts.init(document.getElementById('Map'));
      let option = {};
      this.$echarts.registerMap(name, data);
      option = {
        tooltip: {
          show: true,
          borderWidth: 0,
          backgroundColor: '#1B1B1BCC',
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 400,
          },
          formatter: function (params) {
            for (let item of res.Response) {
              if (item.RegionName == params.name) {
                return (
                  `<h2>` +
                  params.name +
                  `</h2>` +
                  `<br/>` +
                  `规范管理率:` +
                  item.ManagementRate +
                  `%<br/>` +
                  `管理人数:` +
                  item.ManagementPatients +
                  `人<br/>` +
                  `患者总数:` +
                  item.Patients +
                  `人`
                );
              }
            }
          },
        },
        series: [
          {
            name: 'MAP',
            type: 'map',
            mapType: name,
            selectedMode: 'false', //是否允许选中多个区域
            aspectScale: 1,
            zoom: 1.2,
            label: {
              show: true,
              color: '#FFF',
              fontWeight: 500,
              fontSize: 14,
            },
            //未激活样式
            itemStyle: {
              areaColor: '#FFFFFF00',
              borderColor: '#00FCFD',
              borderWidth: 2,
            },
            //高亮状态下的多边形和标签样式
            emphasis: {
              itemStyle: {
                areaColor: '#00FCFD',
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      Map.setOption(option);
      this.$forceUpdate();
      var timeFn = null;
      //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
      Map.on('click', function (params) {
        clearTimeout(timeFn);
        //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
        timeFn = setTimeout(function () {
          var name = params.name; //地区name
          for (let item of that.MapData) {
            if (item.RegionName == params.name) {
              that.searchForm.RegionCode = item.RegionCode;
            }
          }
          var mapCode = that.city[name] || that.county[name]; //地区的json数据
          if (!mapCode) return;
          // alert('无此区域地图显示');
          that.$echarts.init(document.getElementById('Map')).dispose(); //销毁实例，否则来回几下就变卡了
          that.setEachartsData(name, mapCode);
        }, 250);
      });
      // 绑定双击事件，返回全国地图
      Map.on('dblclick', function (params) {
        //当双击事件发生时，清除单击事件，仅响应双击事件
        clearTimeout(timeFn);
        that.$echarts.init(document.getElementById('Map')).dispose(); //销毁实例，否则来回几下就变卡了
        that.searchForm.RegionCode = '360000000000';
        that.setEachartsData('江西省', that.JiangxiProvince);
        //返回全国地图
      });
    },
    //展示实时时间
    dateShow() {
      setInterval(() => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        var week = new Date().getDay();
        switch (week) {
          case 1:
            week = '一';
            break;
          case 2:
            week = '二';
            break;
          case 3:
            week = '三';
            break;
          case 4:
            week = '四';
            break;
          case 5:
            week = '五';
            break;
          case 6:
            week = '六';
            break;
          case 0:
            week = '日';
            break;
        }
        this.newTime = year + '年' + month + '月' + day + '日 周' + week + ' ' + hours + ':' + minutes + ':' + seconds;
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .el-select {
    // top: -2px!important;
    font-size: 20px !important;
    color: rgb(84, 182, 196) !important;
  }
  .el-select-dropdown {
    min-width: 212.531px;
    transform-origin: center top;
    z-index: 3019 !important;
    position: fixed !important;
    top: 200px !important;
    left: 650px !important;
    background-color: rgb(20, 35, 66) !important;
    border: none !important;
  }
  .el-select-dropdown__item {
    font-size: 20px !important;
    color: rgb(84, 182, 196) !important;
    background-color: rgb(20, 35, 66) !important;
  }
  .el-popper .popper__arrow::after {
    border-bottom-color: rgb(20, 35, 66) !important;
    background-color: rgb(20, 35, 66) !important;
  }
  .el-input__inner {
    background-color: rgb(20, 35, 66) !important;
    border: none !important;
    color: rgb(84, 182, 196) !important;
    font-size: 20px !important;
    margin-top: -5px !important;
  }
}
#screen {
  z-index: 100;
  transform-origin: 0 0;
  position: fixed;
  left: 50%;
  top: 50%;
  transition: 0.3s;
}
.flex {
  display: flex;
}
.bg {
  width: 100%;
  height: 100%;
  padding: 0px 23px;
  background-image: url('../../assets/indexControl/bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .dudao_num {
    display: flex;
    justify-content: space-between;
    width: 50%;
    padding: 10px;
    font-size: 20px;
    line-height: 40px;
    .dudao_num_title {
      color: #fff;
    }
    .value {
      color: #00ffff;
    }
  }
  .map_title {
    color: #fff;
    font-size: 20px;
    position: fixed;
    top: 9%;
    left: 26%;
  }
  .view_select_type {
    position: fixed;
    top: 13%;
    z-index: 200;
    display: flex;
    left: 26%;
    width: 350px;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    padding: 0px 10px;
    background: rgb(20, 35, 66);
    border: 1px solid rgb(84, 182, 196);
    color: rgb(84, 182, 196);
  }
  .content_left {
    margin-top: 35px;
    width: 500px;
    height: 626px;
    background: #050f29;
    border: 1px solid #4d81a7;
    .number_of_people {
      display: flex;
      justify-content: space-between;
      padding: 32px 0px 40px 0px;
      img {
        width: 56px;
        height: 57px;
      }
      div {
        width: 100%;
        text-align: center;
        line-height: 30px;
      }
    }
    .content_left_2 {
      width: calc(100% - 40px);
      margin-left: 20px;
      .active {
        background: #1e55f8;
        border-radius: 3px 0px 0px 3px;
        color: #ffffff;
        height: 48px;
        text-align: center;
        line-height: 48px;
      }
      .noActive {
        background: #061c45;
        border-radius: 3px;
        color: #ffffff;
        height: 48px;
        text-align: center;
        line-height: 48px;
      }
    }
    .content_left_bottom_1 {
      width: 100px;
      height: 111px;
      background-image: url('../../assets/indexControl/icon1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .content_left_bottom_2 {
      width: 100px;
      height: 111px;
      background-image: url('../../assets/indexControl/icon2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .content_left_bottom_3 {
      width: 100px;
      height: 111px;
      background-image: url('../../assets/indexControl/icon3.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .content_left_bottom_4 {
      width: 100px;
      height: 111px;
      background-image: url('../../assets/indexControl/icon4.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .content_left_bottom_text {
      width: 90%;
      text-align: center;
      margin-top: 15px;
      margin-left: 11px;
      font-size: 24px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #00ffff;
    }
    .content_left_bottom_text2 {
      font-size: 18px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #ffffff;
      margin-top: 63px;
      margin-left: 32px;
    }
  }
  .content_right {
    margin-top: 35px;
    width: 500px;
    height: 626px;
  }
  .content_right_top {
    width: 500px;
    height: 305px;
    background: #050f29;
    border: 1px solid #4d81a7;
  }
  .content_right_bottom {
    margin-top: 18px;
    width: 500px;
    height: 305px;
    background: #050f29;
    border: 1px solid #4d81a7;
  }
  .bottom_content {
    margin-top: 36px;
    width: 930px;
    height: 330px;
    background: #050f29;
    border: 1px solid #4d81a7;
    .table_title {
      width: 100%;
      height: 48px;
      background: #1e55f8;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 48px;
      padding: 0px 178px 0px 67px;
    }
    .table {
      height: 232px;
      width: 100%;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 48px;
      overflow-x: hidden;
      overflow-y: scroll;
      .row1 {
        padding: 0px 178px 0px 67px;
        background: #061c45;
        width: 100%;
      }
      .row2 {
        width: 100%;
        padding: 0px 178px 0px 67px;
        background: #031b50;
      }
    }
    .table::-webkit-scrollbar {
      display: none;
    }
  }
  .bottom_left_and_right {
    margin-top: 36px;
    width: 500px;
    height: 330px;
    background: #050f29;
    border: 1px solid #4d81a7;
  }
  .head_title {
    padding-top: 15px;
    font-size: 36px;
    font-family: FZZhengHeiS-EB-GB;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
  }
  .head_time {
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 15px;
    right: 32px;
  }
  .title {
    width: 100%;
    height: 48px;
    background-image: url('../../assets/indexControl/title.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 48px;
    padding-left: 27px;
  }
}
.flexC {
  display: flex;
  justify-content: space-between;
}
.flex {
  display: flex;
}
.cFFF {
  color: #fff;
}
.f14 {
  font-size: 14px;
}
.f30 {
  font-size: 30px;
}
.c00FFFF {
  color: #00ffff;
}
#DDYCQS {
  width: 463px;
  height: 280px;
}
#SFZSWCL {
  width: 463px;
  height: 280px;
}
#FYYCBL {
  width: 500px;
  height: 260px;
}
#BLFYSBL {
  width: 500px;
  height: 260px;
}
#Map {
  width: 880px;
  padding-top: 50px;
  height: 626px;
}
</style>
