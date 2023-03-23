<template>
  <div class="content">正在退出,请稍后...</div>
</template>

<script>
import { loginbyticket } from '@/api/Sso'
export default {
  data () {
    return {}
  },
  created () {
    // this.getToken(this.$route.query.ticket)
    localStorage.clear()
    this.clearPage()
  },
  methods: {
    //关闭当前浏览器标签
    clearPage () {
      // var userAgent = navigator.userAgent;
      // if (userAgent.indexOf("MSIE") > 0) {
      //   if (userAgent.indexOf("MSIE 6.0") > 0) {
      //     window.opener = null;
      //     window.close();
      //   } else {
      //     window.open("", "_top");
      //     window.top.close();
      //   }
      // } else if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
      //   window.location.href = "about:blank "; //火狐默认状态非window.open的页面window.close是无效的
      // } else {
      //   window.opener = null;
      //   window.open("about:blank", "_self");
      //   window.close();
      // }

    },
    getToken (ticket) {
      loginbyticket({ ticket })
        .then((res) => {
          this.$store.dispatch('user/redirectLogin', res)
            .then((r) => {
              window.location.href = '/'
            })
        })
        .catch((err) => {
          this.$message.error("登录失败,即将跳转登录页...")
          setTimeout(() => {
            // window.open('/login', '_self');
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          }, 1000);
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  user-select: none;
  width: 100vw;
  height: 100vh;
  line-height: 60vh;
  background: #fff;
  color: rgb(122, 90, 23);
  font-size: 20px;
  text-align: center;
}
</style>
