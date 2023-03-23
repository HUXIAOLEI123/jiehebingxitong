<template>
  <div class="login-container">
    <div class="login-center">
      <div class="title">结核病督导管理云平台</div>
      <div class="form">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
          <el-form-item prop="identifier" :class="isFocusAcc ? 'el-form-item-active' : ''">
            <i class="icon iconfont icon-jurassic_user"></i>
            <el-input
              ref="userAccount"
              v-model="loginForm.identifier"
              placeholder="请输入账号"
              name="userAccount"
              type="text"
              tabindex="1"
              autocomplete="off"
              @focus="focusAcc"
              @blur="focusAcc"
            />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="大写锁定已打开" placement="right" manual>
            <el-form-item prop="credential" :class="isFocusPass ? 'el-form-item-active' : ''">
              <i class="icon iconfont icon-jiesuo"></i>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.credential"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                autocomplete="off"
                @keyup.native="checkCapslock"
                @blur="
                  focusPass();
                  capsTooltip = false;
                "
                @focus="focusPass"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">登 录</el-button>
        </el-form>
      </div>
      <div class="login-tc">
        <!-- <span>Copyright@2022 {{copyRight}} 版权所有</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { trimStr } from '@/utils/index'
import { removeWatermark, setWaterMark } from "@/utils/waterMark";
export default {
  name: 'Login',
  data () {
    const validateUserAccount = (rule, value, callback) => {
      let val = trimStr(value)
      if (!val) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      let val = trimStr(value)
      if (!val) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      bigTitle: this.$bigTitle,
      copyRight: this.$copyRight,
      loginForm: {
        userAccount: '',
        password: '',
        loginCode: '',
        identifier: "",
        credential: "",
        source: "1",
      },
      loginRules: {
        loginCode: [{ required: true, trigger: 'blur', validator: validateUserAccount }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      isFocusAcc: false,
      isFocusPass: false,
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created () {
    const formName = 'loginForm'
    if (this.$refs[formName] !== undefined) {
      this.$refs[formName].resetFields();
    }
  },
  mounted () {
    if (this.loginForm.userAccount === '') {
      this.$refs.userAccount.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
	removeWatermark();
    var _this = this;
    document.onkeydown = function (e) {
      //按下回车登录
      let key = window.event.keyCode;
      //事件中keycode=13为回车事件
      if (key == 13) {
        _this.handleLogin();
      }
    };
  },
  methods: {
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', { userInfo: this.loginForm, url: this.$URL.urls.login }).then((res) => {
            this.loading = false;
            window.location.href = '/'
          }).catch(() => {
            this.loading = false;
          })
        } else {
          return false;
        }
      })
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    focusAcc (e) {
      this.isFocusAcc = !this.isFocusAcc;
    },
    focusPass (e) {
      this.isFocusPass = !this.isFocusPass;
    },
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item {
    width: 385px;
    background: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 6px;
    margin-bottom: 46px;
    .el-form-item__content {
      height: 50px;
      line-height: 50px;
      display: flex;
    }
    .iconfont {
      display: block;
      width: 50px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #a3a3a3;
      text-align: center;
    }
  }
  .el-form-item.is-error {
    border-color: #ff0000;
  }
  .el-form-item__error {
    color: #ff0000;
  }
  .el-form-item-active {
    border-color: #1b65b9;
    .iconfont {
      color: #1b65b9;
    }
  }
  .el-input {
    display: inline-block;
    width: calc(100% - 50px);
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      height: 100%;
      caret-color: #222222;
      padding: 0;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: #222222 !important;
      }
    }
  }
  .login-btn {
    width: 385px;
    height: 60px;
    background: #1b65b9;
    border-radius: 6px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-top: 40px;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray: #889aa4;
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url(../../assets/images/loginBg.png);
  background-repeat: repeat;
  background-repeat: no-repeat;
  background-repeat: repeat-x;
  background-repeat: repeat-y;
  background-repeat: inherit;
  .login-center {
    position: absolute;
    width: auto;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 38px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      letter-spacing: 5px;
      margin-bottom: 45px;
    }
    .form {
      width: 550px;
      height: 459px;
      background: #ffffff;
      border-radius: 16px;
      .login-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 0;
    padding: 0 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-tc {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
