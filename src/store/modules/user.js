import { getApi } from '@/api/function';
import { Message, MessageBox, Notification, Loading } from 'element-ui';
// 获取 设置 删除 token和用户信息
import { getToken, setToken, removeToken, getLoginInfo, setLoginInfo, removeLoginInfo } from '@/utils/auth';
// 路由模块中重制路由的方法
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router';
import router from '@/router';

const state = {
  //获取token
  token: getToken(),
  //存储用户名
  name: '',
  //存储用户头像
  avatar: '',
  //服务器返回的菜单信息【根据不同的角色：返回的标记信息，数组里面的元素是字符串】
  routes: [],
  //角色信息
  roles: [],
  //按钮权限的信息
  buttons: [],
  //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的理由】
  resultAsyncRoutes: [],
  //用户最终需要展示全部路由
  resultAllRputes: [],
};
// 唯一修改state的地方
const mutations = {
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};
const actions = {
  //登录
  login({ commit }, formData) {
    const { userInfo, url } = formData;
    return new Promise((resolve, reject) => {
      getApi(userInfo, 'tokens/JWTToken3.0')
        .then(res => {
          localStorage.setItem('TOKEN', res.Response.token);
          window.localStorage.setItem('userInfo', JSON.stringify(res.Response));
          commit('SET_TOKEN', res.Response.token);
          setToken(res.Response.token);
          resolve(res);
        })
        .catch(error => {
          reject(error);
          Message('登录失败');
        });
    });
  },
  //登录
  redirectLogin({ commit }, res) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('TOKEN', res.Response.token);
      window.localStorage.setItem('userInfo', JSON.stringify(res.Response));
      commit('SET_TOKEN', res.Response.token);
      setToken(res.Response.token);
      resolve(res);
    });
  },
  //请求刷新Token（以旧换新）
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      getApi({ token: getToken() }, '/login/tokens/RefreshToken')
        .then(response => {
          if (response) {
            const { token } = response;
            let resUserInfo = getLoginInfo();
            //在当前时间curTime上加上过期时间(单位：秒)
            let effTime = 4 * 60; //token有效时间4分钟，转换成秒
            var curTime = new Date();
            var expiredTime = new Date(curTime.setSeconds(curTime.getSeconds() + effTime));
            resUserInfo.expiredTime = expiredTime.getTime();
            setLoginInfo(resUserInfo);
            commit('SET_TOKEN', token);
            setToken(token);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let data = {
        roles: ['admin'],
        introduction: '',
        avatar: '',
        name: '',
      };
      const { roles, name, avatar, introduction } = data;
      commit('SET_ROLES', roles);
      commit('SET_NAME', name);
      commit('SET_AVATAR', avatar);
      commit('SET_INTRODUCTION', introduction);
      resolve(data);
    });
  },
  //获取用户信息
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       //获取用户信息:返回数据包含：用户名name、用户头像avatar、routes[返回的标志:不同的用户应该展示哪些菜单的标记]、roles（用户角色信息）、buttons【按钮的信息：按钮权限用的标记】
  //       const { data } = response;
  //       //vuex存储用户全部的信息
  //       commit('SET_USERINFO',data);
  //       commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(cloneDeep(asyncRoutes),data.routes));
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      let info = getLoginInfo();
      if (!info || !info.remember) {
        removeLoginInfo();
      } else {
        let resUserInfo = {
          userName: info.userName,
          password: info.password,
          remember: info.remember,
        };
        setLoginInfo(resUserInfo);
      }
      resetRouter();
      // 重置访问的视图和缓存的视图
      dispatch('tagsView/delAllViews', null, { root: true });
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      let info = getLoginInfo();
      if (!info || !info.remember) {
        removeLoginInfo();
      } else {
        let resUserInfo = {
          userName: info.userName,
          password: info.password,
          remember: info.remember,
        };
        setLoginInfo(resUserInfo);
      }
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token';
    commit('SET_TOKEN', token);
    setToken(token);
    const { roles } = await dispatch('getInfo');
    resetRouter();
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
