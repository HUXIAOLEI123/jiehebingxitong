<template>
  <div class="Roohome">
    <!-- 左侧 -->
    <div class="Lfet">
      <!-- 头部 -->
      <div class="LfetHeard">
        <div class="LfetHeard1">
          <p>{{ this.tistiData.PatientsNumber }}</p>
          <span>结核病患者数</span>
          <img src="./homeimges/结核病患者数.png" alt="" />
        </div>
        <div class="LfetHeard2">
          <p>{{ this.tistiData.VisitNumber }}</p>
          <span>访视总数</span>
          <img src="./homeimges/访视总数.png" alt="" />
        </div>
        <div class="LfetHeard3">
          <p>{{ this.tistiData.AdverseReactionNumber }}</p>
          <span>不良反应总数</span>
          <img src="./homeimges/不良反应总数.png" alt="" />
        </div>
        <div class="LfetHeard4">
          <p>{{ this.tistiData.PatientManagementRate + '%' }}</p>
          <span>患者管理率</span>
          <img src="./homeimges/患者管理率.png" alt="" />
        </div>
        <div class="LfetHeard5">
          <p>{{ this.tistiData.RegularMedicationRate + '%' }}</p>
          <span>规则服抗结核药品率</span>
          <img src="./homeimges/规则服抗结核药品率.png" alt="" />
        </div>
      </div>
      <!-- 图表部分(子组件) -->
      <div class="echarts">
        <div class="Lfetecharts1">
          <SexChart></SexChart>
        </div>
        <div class="Lfetecharts2">
          <ageEchart></ageEchart>
        </div>
        <div class="Lfetecharts3">
          <numberEchart></numberEchart>
        </div>
        <div class="Lfetecharts4">
          <areaEcharts></areaEcharts>
        </div>
      </div>
    </div>
    <!--右侧 -->
    <div class="Right">
      <div class="RightHeard">
        <div class="title">
          <img src="./homeimges/icon.png" alt="" />
          <span style="cursor: default">快捷入口</span>
        </div>
        <div class="Quickentrybox">
          <div @click="funrouter(1)" style="cursor: pointer">
            <img src="./homeimges/建档.png" alt="" />
            <span class="spa">建档管理</span>
          </div>
          <div @click="funrouter(2)" style="cursor: pointer">
            <img src="./homeimges/结案.png" alt="" />
            <span class="spa">结案管理</span>
          </div>
          <div @click="funrouter(3)" style="cursor: pointer">
            <img src="./homeimges/患者管理.png" alt="" />
            <span class="spa">病案管理</span>
          </div>
          <div @click="funrouter(4)" style="cursor: pointer">
            <img src="./homeimges/统计.png" alt="" />
            <span class="spa">规范统计</span>
          </div>
          <div @click="funrouter(5)" style="cursor: pointer">
            <img src="./homeimges/疾病监测.png" alt="" />
            <span class="spa">疾病监测</span>
          </div>
          <div @click="gotoIndexControl" style="cursor: pointer" v-if="$utilsFun.getUserInfo().authOrgClass == '1'">
            <img src="./homeimges/监管大屏.png" alt="" />
            <span class="spa">监管大屏</span>
          </div>
        </div>
        <div></div>
      </div>
      <div class="Rightbootm">
        <div class="title">
          <img src="./homeimges/icon.png" alt="" />
          <span style="cursor: default">通知公告</span>
        </div>

        <div class="announcement" v-for="item in announcementData" :key="item.AnnouncementId" @click="toAnnounce(item)">
          <span class="tex2">
            {{ item.Title }}
          </span>
          <i style="font-size: 12px; cursor: pointer">{{ item.OperateTimeFirst.substring(0, 11) }}</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SexChart from "./homeComponents/sexECharts/index.vue";
import ageEchart from './homeComponents/ageEchart/index.vue';
import numberEchart from "./homeComponents/numberEchart/index.vue";
import areaEcharts from "./homeComponents/areaEchart/index.vue";
import {
  Datastatistics,
  Announcement
} from '@/api/index'
export default {
  name: "Home",
  components: {
    SexChart,
    ageEchart,
    numberEchart,
    areaEcharts
  },
  data () {
    return {
      tistiData: {},
      announcementData: []
    };
  },
  async created () {
    this.funDatastatistics()
    await this.funAnnouncement()
  },
  methods: {
    // 公告
    toAnnounce (data) {
      this.$router.push({
        path: '/announcementsDetil',
        query: {
          datas: data
        },
      })
    },
    //查看大屏
    gotoIndexControl () {
      let routeUrl = this.$router.resolve({
        path: "/indexControl",
        query: {
          authRegionCode: this.$utilsFun.getUserInfo().authRegionCode
        }
      });
      window.open(routeUrl.href, '_blank');
    },
    async funDatastatistics () {
      const res = await Datastatistics()
      let {
        StatusCode,
        Message,
        Response,
      } = res;
      if (!Response || StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'errror')
      }
      this.tistiData = res.Response

    },
    async funAnnouncement () {
      const res = await Announcement()
      let {
        StatusCode,
        Message,
        Response,
      } = res;
      if (!Response || StatusCode !== 200) {
        return this.$baseMessage(Message || '数据获取失败', 'errror')
      }
      res.Response.forEach((i) => {
        if (i.Title.length > 10) {
          i.Title = i.Title.slice(0, 10) + '...'
        }
      })
      this.announcementData = res.Response
    },
    funrouter (val) {
      if (val == 1) {
        this.$router.push('/fileManagement/patientRecords/index')
      } else if (val == 2) {
        this.$router.push('/patientManagement/closurePatientManagement/index')
      } else if (val == 3) {
        this.$router.push('/patientManagement/patientManagement/index')
      } else if (val == 4) {
        this.$router.push('/standardStatistical/index')
      } else if (val == 5) {
        this.$router.push('/testManagement/index')
      }
    }
  },
};
</script>

<style lang=scss scoped>
* {
  padding: 0;
  margin: 0;
}

.Roohome {
  width: 100%;
  // width: 100%;
  height: 90vh;
  background: transparent;
  // padding-left: 20px;
  overflow: hidden;
  // border: 1px  solid gray;
  overflow-y: scroll;

  // 左右2侧布局
  .Lfet {
    width: 75.8%;
    height: 610px;
    margin-right: 14px;
    float: left;

    //border: 1px solid red;
    .LfetHeard {
      height: 150px;
      width: 100%;
      margin-bottom: 15px;
    }

    .LfetHeard > div {
      width: 19%;
      height: 150px;
      // background: pink;
      margin-right: 1%;
      float: left;
      border-radius: 6px;
      padding: 39px 0 0 15px;
      position: relative;
    }

    .LfetHeard > div > img {
      position: absolute;
      top: 37px;
      right: 10px;
    }

    .LfetHeard > div > p {
      color: #ffffff;
      font-size: 25px;
      margin-bottom: 15px;
    }

    .LfetHeard > div > span {
      font-weight: 400;
      color: #ffffff;
      font-size: 13px;
    }

    .LfetHeard > .LfetHeard1 {
      background: #337df7;
    }

    .LfetHeard > .LfetHeard1 > span {
      color: #9ec1fa;
    }

    .LfetHeard > .LfetHeard2 > span {
      color: #79f2aa;
    }

    .LfetHeard > .LfetHeard3 > span,
    .LfetHeard > .LfetHeard5 > span {
      color: #ccecfd;
    }

    .LfetHeard > .LfetHeard2 {
      background: #31c86e;
    }

    .LfetHeard > .LfetHeard3 {
      background: #36bbfa;
    }

    .LfetHeard > .LfetHeard4 {
      background: #fbc133;
    }

    .LfetHeard > .LfetHeard5 {
      background: #fe856e;
      margin: 0;
    }

    // 左侧图表
    .echarts {
      width: 100%;
      // height: 500px;
      // background-color: red;
    }

    .echarts > div {
      width: 49.2%;
      height: 450px;
      background: #ffffff;
      border: 1px solid #eeeeee;
      box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.04);
      border-radius: 10px;
      float: left;
      margin-bottom: 12px;
    }

    .echarts > div:nth-child(2n + 1) {
      margin-right: 15px;
    }
  }

  // 右侧
  .Right {
    width: 23%;
    height: 100%;

    float: right;
  }

  .Right > .RightHeard {
    height: 320px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #eeeeee;
    box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    margin-bottom: 12px;
    position: relative;
  }

  .Right > .Rightmiddle {
    height: 400px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #eeeeee;
    box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    margin-bottom: 12px;
  }

  .Right > .Rightbootm {
    height: 735px;
    width: 100%;
    background: #ffffff;

    border: 1px solid #eeeeee;
    box-shadow: 0px 6px 4px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    overflow: auto;
  }
}

.Roohome::-webkit-scrollbar {
  display: none;
}

// 右侧
.title {
  margin: 15px 0 0 15px;
  display: flex;
}

.title > img {
  margin-right: 13px;
}

.title > span {
  font-weight: 400;
  color: #2a2a2a;
  margin-top: 0;
}

.Quickentrybox {
  top: 72px;
  left: 10%;
  width: 80%;
  height: 200px;
  position: absolute;
}

.Quickentrybox > div {
  width: 20%;
  float: left;
  margin-bottom: 12%;
}

.Quickentrybox > div > span {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #5a5a5a;
  white-space: nowrap;
  /*强制span不换行*/
  // text-align: center;
}

.Quickentrybox > div:nth-child(2),
.Quickentrybox > div:nth-child(5) {
  margin: 0 20%;
}

.Quickentrybox > div > span {
  margin-left: -7px;
}

.Quickentrybox > div > .spa {
  margin-left: -8px;
}

.Quickentrybox > div > img {
  width: 45px;
  height: 45px;
}

// 今日任务
.follow-up,
.interrupt {
  width: 90%;
  height: 45px;
  margin-left: 5%;
  border-bottom: 1px dashed #e6e7e9;
  white-space: nowrap;
  /*强制span不换行*/
  display: inline-block;
  /*将span当做块级元素对待*/
  width: 250px;
  /*限制宽度*/
  overflow: hidden;
  /*超出宽度部分隐藏*/
  text-overflow: ellipsis;
  /*超出部分以点号代替*/
  overflow-y: auto;
}

.follow-up > span {
  font-size: 14px;
  color: #1e6beb;
  font-weight: 600;
  line-height: 45px;
  margin-right: 40px;
}

.interrupt > span {
  font-size: 14px;
  font-weight: 600;
  // color: red;
  line-height: 45px;
  margin-right: 10px;
}

.follow-up > .tex,
.interrupt > .tex {
  font-size: 16px;
  color: #8b8b8b;
  font-weight: 400;
}

// 通知公告
.Right > .Rightbootm > .announcement {
  width: 90% !important;

  height: 45px;
  margin-left: 5%;
  border-bottom: 1px dashed #e6e7e9;
  white-space: nowrap;
  /*强制span不换行*/
  display: inline-block;
  /*将span当做块级元素对待*/
  width: 250px;
  /*限制宽度*/
  overflow: hidden;
  /*超出宽度部分隐藏*/
  text-overflow: ellipsis;
  /*超出部分以点号代替*/
}

.announcement > .tex2 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #3c4353;
  line-height: 45px;
  cursor: pointer;
}

.announcement > i {
  float: right;
  line-height: 45px;
  margin-right: 10px;
}
.LfetHeard p {
  cursor: default;
}
.LfetHeard span {
  cursor: default;
}
</style>
