<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 头部 -->
    <app-header />
    <!-- <app-system/> -->
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />

    <div :class="{ hasTagsView: needTagsView }" id="mainContainer" class="main-container">
      11
      <div :class="{ 'fixed-header': fixedHeader }">
        <div class="tags-view">
          <div class="icon">
            <i
              class="el-icon-s-unfold"
              style="font-size: 26px; color: #9fa0a5; margin-top: 5px; transform: rotate(-180deg)"
              @click="toggleSideBar"
            ></i>
            <!-- <i class="el-icon-s-fold" style="font-size: 26px; color: #9fa0a5" @click="toggleSideBar"></i> -->
            <div class="title">{{ $route.meta.title }}</div>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel';
import { AppHeader, AppSystem, AppMain, Navbar, Settings, Sidebar, TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { mapState } from 'vuex';
export default {
  name: 'Layout',
  components: {
    AppHeader,
    AppSystem,
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
    }),
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  width: calc(100% - #{$sideBarWidth} + 18px);
  // right: -18px;
  position: absolute !important;
  top: 90px;
  z-index: 1 !important;
  // width: calc(100% - #{$sideBarWidth} - 14px - 20px);
  // right: 20px;
  transition: width 0.28s;
  background: #eff3f9;
  .tags-view {
    margin-left: 10px;
    .icon {
      display: flex;
      align-items: center;
      .title {
        margin-left: 20px;
        font-size: 22px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #484848;
      }
    }
  }
}

.hideSidebar .fixed-header {
  // width: calc(100% - 54px - 14px - 20px)
  width: calc(100% - 54px + 18px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
