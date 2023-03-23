<template>
  <div class="navbar">
    <img class="location" src="@/assets/images/location.png"/>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import {getLoginInfo} from '@/utils/auth'
export default {
  components: {
    Breadcrumb
  },
  data(){
      return{
          userInfo:''
      }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  created(){
      this.userInfo=getLoginInfo();
  },   
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
     this.$confirm('确定退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        //await this.$store.dispatch('user/logout')
        this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }).catch(() => {});     
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.navbar {
  height: #{$navbarHeight};
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;  
  background: #FFFFFF;  
  padding-left: 46px;
  .location{
    width: 15px;
    height: 16px; 
    float: left;
    margin-top: 20.5px;
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
