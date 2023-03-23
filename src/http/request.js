import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { Notification, MessageBox, Message, Loading } from 'element-ui';
import qs from 'qs';
import { getToken } from '@/utils/auth';
import errorCode from '@/config/errorCode';
import { tansParams, blobValidate } from '@/utils/tool.js';
import cache from '@/plugins/cache';
import { removeWatermark, setWaterMark } from '@/utils/waterMark';
// 是否显示重新登录
export let isRelogin = { show: false };
let loadingInstance;
// 创建axios实例
const instance = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // loadingInstance = Vue.prototype.$baseColorfullLoading(3);
    // 1.请求是否需要加token

    // 登录请求的token
    const getisToken = localStorage.getItem('TOKEN');

    const isToken = (config.headers || {}).isToken === false; //一定要是全等===
    if (getisToken && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getisToken;
    }

    //2. get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    //3. 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      // 需要阻止的请求组装对象
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      };
      // 存储在本地的请求组装对象
      const sessionObj = cache.session.getJSON('sessionObj');
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
          const message = '数据正在处理，请勿重复提交';
          Message.warning({
            message,
          });
          return Promise.reject(new Error(message));
        } else {
          cache.session.setJSON('sessionObj', requestObj);
        }
      }
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  res => {
    loadingInstance ? loadingInstance.close() : null;
    //1. 未设置状态码则默认成功状态
    const code = res.data.StatusCode || 200;
    //2. 获取错误信息
    const msg = errorCode[code] || res.data.Message || errorCode['default'];
    //3. 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data;
    }
    // 4.处理不同状态码
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            isRelogin.show = false;
            let sessionId = JSON.parse(window.localStorage.getItem('userInfo')).sessionId;
            if (sessionId) {
              axios({
                method: 'get',
                url: process.env.VUE_APP_BASE_API + 'sso/ssoauthurl',
                params: { clientLoginUrl: process.env.VUE_APP_REDIRECTURL + 'redirect' },
              }).then(res => {
                window.open(res.data.Response, '_self');
              });
              removeWatermark();
              this.$store.dispatch('user/logout');
            } else {
              store.dispatch('user/logout');
              router.push(`/login`);
            }
          })
          .catch(() => {
            isRelogin.show = false;
          });
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
    } else if (code === 500 || code === 400 || code == 404) {
      Message({
        message: msg,
        type: 'error',
      });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      Notification.error({
        title: msg,
      });
      return Promise.reject('error');
    } else {
      return res.data;
    }
  },
  error => {
    // loadingInstance ? loadingInstance.close() : null;
    // isRelogin.show = true;
    // MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
    //   confirmButtonText: '重新登录',
    //   cancelButtonText: '取消',
    //   type: 'warning',
    // })
    //   .then(() => {
    //     isRelogin.show = false;
    //     store.dispatch('user/logout');
    //     router.push(`/login`);
    //   })
    //   .catch(() => {
    //     isRelogin.show = false;
    //     // return Promise.reject(error);
    //   });
    let { message } = error;
    if (message == 'Network Error') {
      message = '后端接口连接异常';
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时';
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常';
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default instance;
