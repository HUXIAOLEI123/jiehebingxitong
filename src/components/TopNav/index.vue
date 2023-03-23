<template>
	<el-menu
		:default-active="activeMenu"
		mode="horizontal"
		@select="handleSelect"
	>
		<template v-for="(item, index) in topMenus">
			<el-menu-item
				:style="{ '--theme': theme }"
				:index="item.path"
				:key="index"
				v-if="index < visibleNumber"
			>
				<i :class="item.meta.icon"></i>
				{{ item.meta.title }}</el-menu-item
			>
		</template>
		<!-- 顶部菜单超出数量折叠 -->
		<el-submenu
			:style="{ '--theme': theme }"
			index="more"
			v-if="topMenus.length > visibleNumber"
		>
			<template slot="title">更多菜单</template>
			<template v-for="(item, index) in topMenus">
				<el-menu-item
					:index="item.path"
					:key="index"
					v-if="index >= visibleNumber"
				>
					<i :class="item.meta.icon"></i>
					{{ item.meta.title }}</el-menu-item
				>
			</template>
		</el-submenu>
	</el-menu>
</template>

<script>
import { mapState } from "vuex";
import { constantRoutes } from "@/router";
export default {
	data() {
		return {
			// 顶部栏初始数
			visibleNumber: 10,
			// 是否为首次加载
			isFrist: false,
			// 当前激活菜单的 index
			currentIndex: undefined,
		};
	},
	computed: {
		...mapState("settings", ["theme"]),
		...mapState("permission", ["topbarRouters"]),
		// 顶部显示菜单
		topMenus() {
			let topMenus = [];
			this.topbarRouters.map((menu) => {
				if (menu.hidden !== true) {
					if (menu.path === "/") {
						topMenus.push(menu.children[0]);
					} else {
						topMenus.push(menu);
					}
				}
			});
			return topMenus;
		},
		// 默认激活的菜单
		activeMenu() {
      const path = this.$route.path;
      let activePath = path;
      if (path.lastIndexOf("/") > 0) {
        const tmpPath = path.substring(1, path.length);
        activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
        this.$store.dispatch('app/toggleSideBarHide', false);
      } else if ("/index" == path || "" == path) {
        if (!this.isFrist) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.isFrist = true;
        } else {
          activePath = "index";
        }
        this.$store.dispatch('app/toggleSideBarHide', true);
      }else if(!this.$route.children) {
        activePath = path;
        this.$store.dispatch('app/toggleSideBarHide', true);
      }
			this.activeRoutes(activePath);
      return activePath;
		},
		// 设置子路由
		childrenMenus() {
			var childrenMenus = [];
			this.topbarRouters.map((router) => {
				for (var item in router.children) {
					if (router.children[item].parentPath === undefined) {
						if (router.path === "/") {
							router.children[item].path = "/" + router.children[item].path;
						} else {
							if (!this.ishttp(router.children[item].path)) {
								router.children[item].path =
									router.path + "/" + router.children[item].path;
							}
						}
						router.children[item].parentPath = router.path;
					}
					childrenMenus.push(router.children[item]);
				}
			});
			return constantRoutes.concat(childrenMenus);
		},
	},
	mounted() {
		this.setVisibleNumber();
	},
	methods: {
		// 菜单选择事件
		handleSelect(key, path) {
			this.currentIndex = key;
			const route = this.topbarRouters.find((item) => item.path === key);
			if (this.ishttp(key)) {
				//1. http(s):// 路径新窗口打开
				window.open(key, "_blank");
			} else if (!route || !route.children) {
				//2. 没有子路由路径内部打开
				this.$router.push({ path: key });
				this.$store.dispatch("app/toggleSideBarHide", true);
			} else {
				//3. 显示左侧联动菜单
				this.activeRoutes(key);
				this.$store.dispatch("app/toggleSideBarHide", false);
			}
		},
		// 根据宽度计算设置顶部导航显示的个数
		setVisibleNumber() {
			const width = document.body.getBoundingClientRect().width / 3;
			this.visibleNumber = parseInt(width / 85);
		},
		// 判断菜单路径是否是http/https
		ishttp(url) {
			return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
		},
		// 当前激活的路由
		activeRoutes(key) {
			var routes = [];
			if (this.childrenMenus && this.childrenMenus.length > 0) {
				this.childrenMenus.map((item) => {
					if (key == item.parentPath || (key == "index" && "" == item.path)) {
						routes.push(item);
					}
				});
			}
			if (routes.length > 0) {
				this.$store.commit("permission/SET_SIDEBAR_ROUTERS", routes);
			}
		},
	},
	beforeMount() {
		window.addEventListener("resize", this.setVisibleNumber);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.setVisibleNumber);
	},
};
</script>

<style lang=scss scoped>
.topmenu-container.el-menu--horizontal > .el-menu-item {
  float: left;
  height: $base-navbar-height !important;
  line-height: $base-navbar-height !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active, .el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: 2px solid #{'var(--theme)'} !important;
  color: #303133;
}

/* submenu item */
 .topmenu-container.el-menu--horizontal > .el-submenu /deep/.el-submenu__title {
  float: left;
  height: $base-navbar-height !important;
  line-height: $base-navbar-height !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
</style>