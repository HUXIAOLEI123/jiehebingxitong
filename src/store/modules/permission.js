import { constantRoutes } from '@/router';
import Layout from '@/layout';
const state = {
  routes: [],
  addRoutes: [],
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};
const fun = {
  convert: (pid, arr, pname, idname) => {
    let resultarr = arr.filter(p => p[pname] == pid);
    if (resultarr.length > 0) {
      resultarr.forEach(item => {
        if (fun.convert(item[idname], arr, pname, idname).length > 0) {
          item.children = [];
          item.children = fun.convert(item[idname], arr, pname, idname);
          item.children.sort((a, b) => {
            return a.OrderSort > b.OrderSort ? 1 : -1;
          });
          if (item.children.length == 0) delete item.children;
        }
      });
    }
    return resultarr;
  },
};
// 引入的路由菜单
import FileManagement from '@/router/modules/fileManagement';
import PatientManagement from '@/router/modules/patientManagement';
import SupervisoryWorkManagement from '@/router/modules/supervisoryWorkManagement';
import SystemManagement from '@/router/modules/systemManagement';


import danganguanli from '@/assets/iconfont/danganguanli.svg'
import dudao from '@/assets/iconfont/dudao.svg'
import huanzhe from '@/assets/iconfont/huanzhe.svg'
import jianguan from '@/assets/iconfont/jianguan.svg'
import shouye from '@/assets/iconfont/shouye.svg'
import tongji from '@/assets/iconfont/tongji.svg'
import xitong from '@/assets/iconfont/xitong.svg'
const IconList = {
  danganguanli:danganguanli,
  dudao:dudao,
  huanzhe:huanzhe,
  jianguan:jianguan,
  shouye:shouye,
  tongji:tongji,
  xitong:xitong,
}
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = [];
      let menuList = JSON.parse(window.localStorage.getItem('userInfo')).menus;
      menuList.forEach(item => {
        item.component = item.ParentId == null ? Layout : resolve => require(['@/views' + item.Code], resolve);
        item.path = item.Code;
        item.name = item.Code;
        item.meta = {
          title: item.PermissionName,
          icon: item.Icon,
        };
        if (item.Icon) {
          item.meta.icon = IconList[item.Icon];
        }
      });
      if (menuList.length > 0) {
        menuList = fun.convert(null, menuList, 'ParentId', 'PermissionId');
      }
      menuList.sort((a, b) => {
        return a.OrderSort > b.OrderSort ? 1 : -1;
      });
      accessedRoutes = accessedRoutes.concat(menuList);
      // commit("SET_ROUTES", accessedRoutes);
      // let accessedRoutes = [];
      // accessedRoutes = accessedRoutes.concat(
      //   FileManagement,
      //   PatientManagement,
      //   SupervisoryWorkManagement,
      //   SystemManagement
      // );
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
