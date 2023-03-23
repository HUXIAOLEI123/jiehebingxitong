<template>
  <!-- 侧边栏数据 -->
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow"
    >
      <!-- 二级菜单 -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <img v-if="item.meta" :src="item.meta.icon" alt="" class="icon-img" />
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </app-link>
    </template>
    <!-- 一级菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <img v-if="item.meta" :src="item.meta.icon" alt="" class="icon-img" />
        <span v-if="item.meta" slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';
import { isExternal } from '@/utils/validate';
import Item from './Item';
import AppLink from './Link';
import FixiOSBug from './FixiOSBug';

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
<style scoped>
.el-submenu__title {
  display: flex;
  align-items: center;
}
.el-submenu__title span {
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
  flex: 1;
  /* padding-right: 20px; */
}

.el-menu-item {
  display: flex;
  align-items: center;
  padding-right: 20px !important;
}
.el-menu-item span {
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
  flex: 1;
}
.icon-img {
  margin-right: 10px;
}
</style>