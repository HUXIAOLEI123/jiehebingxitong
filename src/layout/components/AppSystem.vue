<template>
  <div>
    <div class="header-system">
      <span
        v-for="(item, index) in systemList"
        :key="index"
        class="systemName"
        @click="changeSystem(item)"
      >
        <div v-if="item.isActive" class="active">{{ item.permissionName }}</div>
        <div v-else>{{ item.permissionName }}</div>
      </span>
      <div class="header-bottom"></div>
    </div>
    
  </div>
</template>
<script>
import CryptoJS from "crypto-js";
export default {
  name: "AppSystem",
  data() {
    return {
      bigTitle: this.$bigTitle,
      userInfo: {},
      systemList: [],
    };
  },
  created() {
    this.getSysTemData();
  },
  methods: {
    //获取系统数据
    getSysTemData() {
      this.systemList = JSON.parse(window.localStorage.getItem("selectSystem"));
      if(this.systemList.filter((item)=>item.isActive ===true).length==0){
        this.systemList[0].isActive = true;
      }
    },
    //切换系统
    changeSystem(item) {
      //前往第三方系统
      if(item.externalLinks){
        this.gotoNewSys(item);
        return
      }
      this.systemList.forEach((i) => {
        if (i.permissionId === item.permissionId) {
          i.isActive = true;
        } else {
          i.isActive = false;
        }
      });
      window.localStorage.setItem("selectSystem",JSON.stringify(this.systemList));
      let url = window.location.href;
      url = url.slice(0, url.indexOf("#"));
      window.open(url, "_self");
    },
    //前往第三方系统
    gotoNewSys(item){
      let userLoginInfo = JSON.parse(window.localStorage.getItem("userLoginInfo"))
      var _url = item.code;
      var userName = userLoginInfo.loginCode;
      var passwd = userLoginInfo.password;

      
      // var userName = 'yh1';
      // var passwd = 'admin123';
      //密钥
      var secret= CryptoJS.enc.Utf8.parse("BBnFWQox")
      //key
      var key="RWVhfaoECD9miVOZzypqmVKr"
      //时间
      var systime = this.$utilsFun.dateFormat(new Date(),'YYYYmmddHHMMSS');

      //加密账号 DES加密方式
      var uname = encodeURIComponent(CryptoJS.TripleDES.encrypt(userName, secret, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString());

      //加密账号密码
      var pwd=encodeURIComponent(CryptoJS.TripleDES.encrypt(passwd, secret, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString());

      //加密时间
      var time = encodeURIComponent(CryptoJS.TripleDES.encrypt(systime, secret, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString());

      //拼接 明文账号+密码+key+时间
      var _verify=`${userName}${passwd}${key}${systime}`;
      //生成签名
      var verify = encodeURIComponent(CryptoJS.MD5(_verify).toString());
      //构造地址
      var h_url = _url+'?username='+uname+'&password='+pwd+'&verify='+verify+'&systime='+time;
      // 跳转到第三方系统
      // window.location.href = h_url;
      window.open(h_url, "_blank");
    }
  },
};
</script>
<style lang="scss" scoped>
.header-bottom{
  height: 8px;
  width: calc(100% + 20px);
  margin-left: -20px!important;
  display: flex;
  background: #eff3f9 ;
}
.header-system {
  position: fixed !important;
  top: 60px;
  height: 50px;
  width: 100%;
  z-index: 2000;
  line-height: 50px;
  background: #ffffff;
  padding-left: 20px;
  .systemName {
    cursor:pointer;
    color: #666666;
    line-height: 40px;
    font-size: 16px;
    font-weight: 400;
    font-family: Microsoft YaHei;
    div {
      float: left;
      margin-left: 3px;
      margin-right: 42px;
    }
    .active {
      color: #2d78ff;
      font-weight: bold;
      border-bottom: 3px solid #2d78ff;
    }
  }
}
</style>
