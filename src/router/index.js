import Vue from 'vue';
import Router from 'vue-router';
import shouye from '@/assets/iconfont/shouye.svg';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';
import openBlank from '@/layout/openBlank'; //空白页布局，全屏展示
// import FileManagement from './modules/fileManagement.js'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index'),
  //     },
  //   ],
  // },
  {
    path: '/signOut',
    component: openBlank,
    hidden: true,
    children: [
      {
        path: '/signOut',
        component: () => import('@/views/login/signOut'),
        name: '单点退出',
        orderSort: 0,
        meta: { title: '单点退出', icon: 'icon-shouye', affix: true },
      },
    ],
  },
  {
    path: '/redirect',
    component: openBlank,
    hidden: true,
    children: [
      {
        path: '/redirect',
        component: () => import('@/views/login/redirect'),
        name: '单点登录',
        orderSort: 0,
        meta: { title: '单点登录', icon: 'icon-shouye', affix: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    orderSort: 0,
    meta: {
      title: '首页',
      affix: true,
      icon: shouye,
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/index'),
        name: 'home',
        orderSort: 0,
        meta: {
          title: '首页',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/indexControl',
    component: openBlank,
    hidden: true,
    redirect: '/',
    orderSort: 0,
    children: [
      {
        path: '/indexControl',
        component: () => import('@/views/home/indexControl'),
        name: '结核病督导综合检测管理平台',
        orderSort: 0,
        meta: { title: '结核病督导综合检测管理平台', icon: 'icon-shouye', affix: true },
      },
    ],
  },
  {
    path: '/indexControlDemo',
    component: openBlank,
    hidden: true,
    redirect: '/',
    orderSort: 0,
    children: [
      {
        path: '/indexControlDemo',
        component: () => import('@/views/home/indexControlDemo'),
        name: '结核病督导综合检测管理平台(演示数据)',
        orderSort: 0,
        meta: { title: '结核病督导综合检测管理平台', icon: 'icon-shouye', affix: true },
      },
    ],
  },
  {
    path: '/userInfo',
    component: Layout,
    hidden: true,
    redirect: '/',
    orderSort: 0,
    children: [
      {
        path: '/userInfo',
        component: () => import('@/views/home/userInfo'),
        name: '个人信息',
        orderSort: 0,
        meta: { title: '个人信息', icon: 'icon-shouye', affix: true },
      },
    ],
  },

  // 结核病患者管理中的详情大tab页面路由()

  {
    path: '/patientManagementdetaltab',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/patientManagementdetaltab',
        name: 'PatientManagementdetaltab',
        component: () => import('@/views/patientManagement/patientManagement/components/tabEditRouter.vue'),
        meta: { title: '结核病患者管理详情', keepalive: false },
      },
    ],
  },
  // 公告详情
  {
    path: '/announcementsDetil',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/announcementsDetil',
        name: 'Detil',
        component: () => import('@/views/systemManagement/announcementManagement/detil.vue'),
        meta: { title: '公告详情', keepalive: false },
      },
    ],
  },
  // 结核病规范统计
  // {
  //   path: '/standardStatistical',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/standardStatistical',
  //       name: 'StandardStatistical',
  //       component: () => import('@/views/standardStatistical/index'),
  //       meta: { title: '结核病规范统计', icon: 'icon-fenxi' },
  //     },
  //   ],
  // },
  // // 疾病检测管理
  // {
  //   path: '/testManagement',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/testManagement',
  //       name: 'TestManagement',
  //       component: () => import('@/views/testManagement/index'),
  //       meta: { title: '结核病数据监管', icon: 'icon-winfo-icon-dongtaijianguan' },
  //     },
  //   ],
  // },
  // //权限部分
  // {
  //   path: '/systemManage',
  //   component: Layout,
  //   redirect: '/systemManage',
  //   name: 'systemManage',
  //   meta: {
  //     title: '系统管理2',
  //     icon: 'icon-zhikongfenxi',
  //   },
  //   children: [
  //     {
  //       path: 'getTenantUserList',
  //       component: () => import('@/views/systemManage/getTenantUserList/getTenantUserList'),
  //       name: 'getTenantUserList',
  //       meta: {
  //         title: '机构信息管理',
  //       },
  //     },
  //     {
  //       path: 'organizationpermissions',
  //       component: () => import('@/views/systemManage/organizationpermissions/organizationpermissions'),
  //       name: 'organizationpermissions',
  //       meta: {
  //         title: '菜单信息管理',
  //       },
  //     },
  //     {
  //       path: 'organizationroles',
  //       component: () => import('@/views/systemManage/organizationroles/organizationroles'),
  //       name: 'organizationroles',
  //       meta: {
  //         title: '角色信息管理',
  //       },
  //     },
  //     {
  //       path: 'organizationusers',
  //       component: () => import('@/views/systemManage/organizationusers/organizationusers.vue'),
  //       name: 'organizationusers',
  //       meta: {
  //         title: '用户信息管理',
  //       },
  //     },
  //     {
  //       path: 'getRegions',
  //       component: () => import('@/views/systemManage/getRegions/getRegions'),
  //       name: 'getRegions',
  //       meta: {
  //         title: '行政区划管理',
  //       },
  //     },
  //     {
  //       path: 'organizationmodules',
  //       component: () => import('@/views/systemManage/organizationmodules/organizationmodules'),
  //       name: 'organizationmodules',
  //       meta: {
  //         title: '接口信息管理',
  //       },
  //     },
  //     // {
  //     //   path: 'organizationdepartments',
  //     //   component: () => import('@/views/systemManage/organizationdepartments/organizationdepartments'),
  //     //   name: 'organizationdepartments',
  //     //   meta: {
  //     //     title: '部门管理',
  //     //   },
  //     // },
  //     {
  //       path: 'patientUser',
  //       component: () => import('@/views/systemManage/patientUser/patientUser.vue'),
  //       name: 'patientUser',
  //       meta: {
  //         title: '患者账号管理',
  //       },
  //     },
  //   ],
  // },
];

/**
 * asyncRoutes
 * 异步加载路由
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
