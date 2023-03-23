import Vue from 'vue';
// import Vue from "vue/dist/vue.common.js";

import Cookies from 'js-cookie';

// import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/assets/styles/index.scss';
import './plugins';

import Element from 'element-ui';
import './styles/element-variables.scss';
import enLang from 'element-ui/lib/locale/lang/zh-CN'; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// 引入icon.css
import './assets/iconfont/iconfont.css';
import '@/styles/index.scss'; // global css
import '@/styles/allStyle.scss'; // global css
import App from './App';
import store from './store';
import router from './router';
Vue.prototype.$CopyRouter = router;

// 全局页码器
import Pagination from '@/components/Pagination';
Vue.component('Pagination', Pagination);

//行政区划
import MyCascader from '@/components/MyCascader';
Vue.component('MyCascader', MyCascader);

// 全局组件传输
// 我们在main.js中用常量创建一个bus，然后将它放入Vue实例的原型对象中。
const bus = new Vue();
Vue.prototype.$bus = bus;

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log

import * as filters from './filters'; // global filters 过滤器引入

import './directive/el-drag-dialog/drag'; //弹框拖拽放大

import './utils/rem';//屏幕分辨率适配

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang, // 如果使用中文，无需设置，请删除
});
//引入通用方法
import utilsFun from '@/utils/indexFun';
Vue.prototype.$utilsFun = utilsFun;

// register global utility filters注册全局实用程序过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.prototype.paginationLayout = 'total, sizes, prev, pager, next, jumper';

import preventReClick from './utils/plugins';
Vue.use(preventReClick); //防重复点击(指令实现)

//echart组件
import * as echarts from 'echarts/dist/echarts.min.js';
Vue.prototype.$echarts = echarts;

// 引入常量
import partten from './assets/js/constant';
Vue.prototype.$PARTTEN = partten;
import requestUrl from './assets/js/requestUrl';
Vue.prototype.$URL = requestUrl;

import { showLoading, hideLoading } from '@/utils/index';
Vue.prototype.$loading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
// 播放器api
import VueAliplayerV2 from 'vue-aliplayer-v2';
Vue.use(VueAliplayerV2);

import { bigTitle, copyRight } from './settings.js';
Vue.prototype.$bigTitle = bigTitle;
Vue.prototype.$copyRight = copyRight;
//打印注册
import Print from 'vue-print-nb';
Vue.use(Print);
// 自定义组件全局引用
import './utils/SysComponents';
import { Message } from 'element-ui';

Vue.prototype.$message = function (msg) {
  Message(msg);
};
Vue.prototype.$message = function (msg) {
  return Message({
    message: msg.message,
    duration: msg.duration || 2000,
    type: msg.type || '',
  });
};
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 1500,
  });
};
Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 1000,
  });
};
Vue.prototype.$message.error = function (msg) {
  return Message.error({
    message: msg,
    duration: 5000,
  });
};

// vxe-table表格组件
import 'xe-utils';
import XEUtils from 'xe-utils';
import VXETable from 'vxe-table';
//import 'font-awesome/css/font-awesome.min.css'
import 'vxe-table/lib/style.css';
Vue.use(VXETable);
Vue.prototype.$XEUtils = XEUtils;
//vxe-table 导出xlsx格式
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';
VXETable.use(VXETablePluginExportXLSX);

import DataV from '@jiaminghi/data-view';
Vue.use(DataV); //数据可视化组件

new Vue({
  el: '#app',
  router,
  store,
  data: function () {
    return {
      appMainHeight: '',
    };
  },
  render: h => h(App),
});
