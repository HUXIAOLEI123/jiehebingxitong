<template>
  <section class="app-main" ref="appMain">
    <transition name="fade-transform" mode="out-in">
      <!-- <keep-alive :exclude="cachedViews"> -->
      <router-view :key="key" style="margin-top: 8px" class="router-view" />
      <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return '';
      // return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    }
  },
  mounted () {
    let appMainHeight = this.$refs.appMain.offsetHeight;
    this.$root.appMainHeight = appMainHeight - 86;//去除padding-top值
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.app-main {
  width: calc(100% - 14px - 20px + 16px);
  /* 50= navbar  50  */
  min-height: calc(100vh - 14px);
  margin-left: -6px;
  right: -18px;
  position: relative;
  overflow: hidden;
  background-color: #eff3f9;
}

.fixed-header + .app-main {
  padding-top: calc(#{$appHeaderHeight} + 96px);
}
.router-view {
  border: 1px solid #d8d8d8;
  border-radius: 10px 10px 10px 10px;
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 14px);
  }

  .fixed-header + .app-main {
    padding-top: calc(#{$appHeaderHeight} + 70px);
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  padding-right: 0 !important;
  overflow: auto !important;
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
