<template>
  <div class="content">登陆中,请稍后...</div>
</template>

<script>
import { loginbyticket, ssoauthurl } from '@/api/Sso'
import router from '@/router';
export default {
  data () {
    return {}
  },
  created () {
    if (this.$route.query.ticket) {
      this.getToken(this.$route.query.ticket)
    } else {
      this.getssoauthurl()
    }

  },
  methods: {
    //获取单点登录地址
    async getssoauthurl () {
      let res = await ssoauthurl({ clientLoginUrl: process.env.VUE_APP_REDIRECTURL + 'redirect' })
      window.open(res.Response, '_self');
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
            // router.push(`/login`); 
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
