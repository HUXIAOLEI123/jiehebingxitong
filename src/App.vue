<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { removeWatermark, setWaterMark } from "./utils/waterMark";
export default {
  name: 'App',
  mounted(){
	  const patientsName = this.$utilsFun.getUserInfo().real_Name;
	  setWaterMark("", patientsName);
  },
  destroyed() {
      removeWatermark();
  },
  computed: {
      key() {
        return this.$route.path + Math.random();
      }
  },
}
</script>
<style lang="scss">
.webSocket-notification{
  .el-icon-s-promotion{
    color: #1B65B9;
  }
}
// ::-webkit-scrollbar {
// width: 0 !important;
// }

</style>
