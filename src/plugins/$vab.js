import config from '@/config/setting.config.js';
import * as lodash from 'lodash';
import * as echarts from 'echarts';
import { Message, MessageBox, Notification, Loading } from 'element-ui';
let { loadingText, messageDuration, title } = config;

// 封装的缓存文件
import cache from './cache';
// 用户角色判定文件
import auth from './auth';
import tab from './tab'

const install = (Vue, opts = {}) => {
    /* 全局标题 */
    Vue.prototype.$baseTitle = (() => {
        return title
    })()

    /* 全局Message */
    Vue.prototype.$baseMessage = (message, type) => {
            Message({
                offset: 60,
                showClose: true,
                message: message,
                type: type,
                dangerouslyUseHTMLString: true,
                duration: messageDuration
            })
        }
        /* 全局Alert */
    Vue.prototype.$baseAlert = (content, title, callback) => {
            MessageBox.alert(content, title || '温馨提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                callback: (action) => {
                    if (callback) {
                        callback()
                    }
                },
            })
        }
        /* 全局Confirm */
    Vue.prototype.$baseConfirm = (content, title, callback1, callback2,type) => {
            MessageBox.confirm(content, title || '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: type||'warning',
					roundButton:true,
                })
                .then(() => {
                    if (callback1) {
                        callback1()
                    }
                })
                .catch(() => {
                    if (callback2) {
                        callback2()
                    }
                })
        }
        /* 全局Notification */
    Vue.prototype.$baseNotify = (message, title, type, position) => {
        Notification({
            title: title || '系统提示',
            message: message || '',
            position: position || 'top-right',
            type: type || 'success',
            duration: messageDuration,
        })
    }

    /* 全局加载层loading */
    Vue.prototype.$baseLoading = (index, text) => {
        if (!index) {
            return Loading.service({
                lock: true,
                text: text || loadingText,
                background: 'hsla(0,0%,100%,.8)',
            })
        } else {
            return Loading.service({
                lock: true,
                text: text || loadingText,
                spinner: 'je-loading-type' + index,
                background: 'hsla(0,0%,100%,.8)',
            })
        }
    }

    /* 全局多彩加载层 */
    Vue.prototype.$baseColorfullLoading = (type, text) => {
        if (!type) {
            return Loading.service({
                lock: true,
                text: text || loadingText,
                spinner: 'dots-loader',
                background: 'hsla(0,0%,100%,.8)',
            })
        } else {
            switch (type) {
                case 1:
                    type = 'dots'
                    break
                case 2:
                    type = 'gauge'
                    break
                case 3:
                    type = 'inner-circles'
                    break
                case 4:
                    type = 'plus'
                    break
            }
            return Loading.service({
                lock: true,
                text: text || loadingText,
                spinner: type + '-loader',
                background: 'hsla(0,0%,100%,.8)',
            })
        }
    }

    /* 全局lodash */
    Vue.prototype.$baseLodash = lodash;

    /* 全局挂载echarts */
    Vue.prototype.$echarts = echarts;

    /* 全局挂载cache */
    Vue.prototype.$cache = cache;

    // 认证对象
    Vue.prototype.$auth = auth;
    
    /* 全局分页layout */
    Vue.prototype.paginationLayout = 'total, sizes, prev, pager, next, jumper';

    // 页签操作
    Vue.prototype.$tab = tab

    // 
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue)
    }
}

export default install;