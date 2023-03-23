<template>
  <div class="app-header">
    <div class="header-l">
      <img src="../../assets/index-logo2.png" class="logo2" />
    </div>
    <div class="title">{{ bigTitle }}</div>
    <div class="headerRigh">
      <div class="header-r">
        <div class="toUser" @click="gotoMenHu">
          <i class="el-icon-s-home"></i>
          <span style="margin-left: 2px; cursor: pointer">返回门户</span>
        </div>
        <!-- <div class="userinfo" @click="gotoIndexControl">
          <i class="el-icon-pie-chart" style="margin-right: 5px"></i>
          可视化平台
        </div> -->
        <img src="../../assets/userheader.svg" alt=" " class="headportrait" />
        <div class="userinfo" style="cursor: pointer" @click="gotoInfo">个人信息</div>
        <div class="right-loginout pointer" @click="logout">
          <i class="el-icon-switch-button" style="width: 20px; height: 20px; margin-right: 30px"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getLoginInfo } from '@/utils/auth'
import { ssoLogout, ssoauthurl } from '@/api/Sso'
import { removeWatermark, setWaterMark } from "@/utils/waterMark";
export default {
  name: 'AppHeader',
  data () {
    return {
      bigTitle: this.$bigTitle,
      userInfo: {},
    }
  },
  created () {
    this.userInfo = this.$utilsFun.getUserInfo();
  },
  methods: {
    //个人信息查看
    gotoInfo () {
      this.$router.push(`/userInfo`)
    },
    //查看大屏
    gotoIndexControl () {
      let routeUrl = this.$router.resolve({
        path: "/indexControl",
        query: { id: 96 }
      });
      window.open(routeUrl.href, '_blank');
    },
    gotoMenHu () {
      // http://zhjk.jxcdc.cn:8869/smartcdc
      // http://182.106.129.104:8181/smartcdc
      window.open('http://zhjk.jxcdc.cn:8869/smartcdc', '_blank');
    },
    logout () {
      this.$confirm('确定退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sessionId = this.$utilsFun.getUserInfo().sessionId;
        if (sessionId) {
          ssoLogout({ back: "ssss" }).then((res) => {
            ssoauthurl({ clientLoginUrl: process.env.VUE_APP_REDIRECTURL + 'redirect' }).then((res) => {
              window.open(res.Response, '_self');
            })
          })
          removeWatermark();
          this.$store.dispatch('user/logout')
        } else {
          this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          removeWatermark();
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.header-r {
  float: right;
}
</style>
