import Cookies from 'js-cookie'
import Vue from 'vue'
import { axios } from "axios";
// 引入Elementui
import Element from 'element-ui';
import '../assets/styles/element-variables.scss';
Vue.use(Element, {
    size: Cookies.get('size') || 'medium',
    zIndex: 3000 // set element-ui default size
})

//全局axios
Vue.prototype.$axios=axios

// 日期时间插件
// import { parseTime } from "@/utils/date.js";
// Vue.prototype.parseTime = parseTime;

/* 全局组件注册 */
// 分页组件
import Pagination from "@/components/Pagination";

// 导出表格插件
// import  JsonExcel  from "vue-json-excel";
// Vue.component('downloadExcel', JsonExcel)

// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
Vue.component('Pagination', Pagination);
Vue.component('RightToolbar', RightToolbar);
// vxe-table
import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table/lib/style.css';
VXETable.use(VXETablePluginElement);
Vue.use(VXETable);

// 引入$vab.js+角色判定+缓存封装（全局挂载到原型上的一些实例方法）
import Vab from './$vab';
Vue.use(Vab);

// 全局指令
// import directive from '@/directive';
// Vue.use(directive);

// 表单重置(与之前项目不一样)
import { resetForm } from '@/utils/tool.js';
Vue.prototype.resetForm = resetForm;

// 混入全局字典
// import dict from '@/utils/dict.js';
// Vue.use(dict)

// 全局事件总线 （子组件之间使用vue实例传参相互）
// import VueBus from '@/utils/$bus.js';
// Vue.use(VueBus);

// 全局路由守卫
// import '@/router/permission';