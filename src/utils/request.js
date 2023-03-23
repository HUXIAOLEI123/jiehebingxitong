import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken,getLoginInfo} from '@/utils/auth'
import { isTokenExpired } from '@/utils/index'
import $URL from "@/assets/js/requestUrl";
//请求操作正常code，支持String、Array、int多种类型,项目中和后端提前协商好，定义哪些状态码为success
const successCode=[200, 201,204, 0];
//创建一个axios实例
const service = axios.create({
  baseURL:  process.env.VUE_APP_BASE_API,//'/', 
  timeout: 60000, // 请求超时
  headers: {
    'Content-Type': "application/json;charset=UTF-8",
    'Authorization':'Bearer' +' '+ getToken()
  }
})
window.isRefreshing = false;//是否有请求正在刷新token
let refreshSubscribers = [];//被挂起的请求数组
 /*push所有请求到数组中*/
 function subscribeTokenRefresh (cb) {
  refreshSubscribers.push(cb)
 }
  /*刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
 function onRrefreshed (token) {
  refreshSubscribers.map(cb => cb(token))
 }
//请求拦截器
// service.interceptors.request.use(
//   config => {
    
//     //判断是否已登录
//     if (store.getters.token) {
//       //在请求头中添加token类型
//       config.headers.Authorization =getLoginInfo().token_type+' '+getToken();
//       //获取过期时间
//       let expiredTime=getLoginInfo().expiredTime;
//       //token是否将要过期或已经过期
//       if (isTokenExpired(expiredTime)&&config.url.indexOf($URL.urls.refreshToken) === -1) {
//         
//           //是否正在刷新
//           if (!window.isRefreshing) {
//             //将刷新token的标志置为true
//             window.isRefreshing = true;
//             //发起刷新token的请求
//             store.dispatch('user/refreshToken').then(res => {
//               //将标志置为false
//               window.isRefreshing = false;
//               //成功刷新token
//               config.headers.Authorization = res.token_Type + ' ' + res.token          
//               //执行数组里的函数,重新发起被挂起的请求
//               var res ={
//                 token:1647825973938
//               }
//               onRrefreshed(res.token);
//               //执行onRefreshed函数后清空数组中保存的请求
//               refreshSubscribers = [];
//             }).catch(err => {
//               //刷新token失败到登录页
//               MessageBox.alert('系统登录时间过长,将重新登录!','提示',{
//                 confirmButtonText: '确定',
//                 callback: action => {
//                   store.dispatch('user/resetToken').then(() => {
//                     location.reload();
//                   })
//                 }
//               });          
//             })
//           }

//         /*把请求(token)=>{....}都push到一个数组中*/
//         let retry = new Promise((resolve, reject) => {
//           /*(token) => {...}这个函数就是回调函数*/
//           subscribeTokenRefresh((token) => {
//             config.headers.Authorization = 'Bearer ' + token
//             //将请求挂起
//             resolve(config)
//           })
//         })
//         return retry
//       }
//       return config  
//     }else{
//       //未登录直接返回配置信息
//       return config
//     }
//   },error => {    
//     return Promise.reject(error)
//   }
// )

// 响应拦截器
service.interceptors.response.use(
  response => {    
    let { data, config,status,statusText} = response;
    // 判断请求code是否符合成功defiendCode
    if (successCode.includes(status)) {
      return data;
    } else {
      handleCode(status, statusText);
      return Promise.reject('请求异常拦截:' + JSON.stringify({ url: config.url, status, statusText }) || "Error")
    }
  },
  error => {
    if (error === undefined || error.code === 'ECONNABORTED') {
        Message({
          message: '服务超时，请稍后重试',
          type: 'error',
          duration: 5000
        })
        return Promise.reject(error)
    }
    const { response, message } = error;
    if (error.response && error.response.data) {
      const { status, data } = response;
      handleCode(status, data || message);
      return Promise.reject(error)
    }
  }
)
/* 处理http返回错误状态码 */
const handleCode = (code, msg) => {
  switch (code) {
      case 401:
          Message({
            message:msg.Value || `客户端接口${code}异常`,
            type: 'error',
            duration: 6000
          })
          setTimeout(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          },1000)
          break;
      default:
          Message({
            message:msg || `客户端接口${code}异常`,
            type: 'error',
            duration: 6000
          })
          break;
  }
}

/*
 * 返回状态码：
 * 
 * 2xx 成功
 * 200 - OK 请求成功
 * 201 - Created 请求成功并创建了资源
 * 204 - No Content 请求成功，但是不应该返回任何东西，例如删除操作
 * 
 * 4xx 客户端错误
 * 400 - Bad Request API消费者发送到服务器的请求是有错误的
 * 401 - Unauthorized 没有提供授权信息或者提供的授权信息不正确
 * 403 - Forbidden 身份认证已经成功，但是已认证的用户却无法访问请求的资源
 * 404 - Not Found 请求的资源不存在
 * 405 - Method Not Allowed 尝试发送请求到资源的时候，使用了不被支持的HTTP方法
 * 406 - Not Acceptable API消费者请求的表述格式并不被Web API所支持，并且API不
 *       会提供默认的表述格式
 * 409 - Conflict 请求与服务器当前状态冲突（通常指更新资源时发生的冲突）
 * 415 - Unsupported Media Type 与406正好相反，有一些请求必须带着数据发往服务器，
 *       这些数据都属于特定的媒体格式，如果API不支持该媒体类型格式，415就会被返回
 * 422 - Unprocessable Entity 它是HTTP拓展协议的一部分，它说明服务器已经懂得了
 *       Content Type，实体的语法也没有问题，但是服务器仍然无法处理这个实体数据 
 * 
 * 5xx 服务器错误
 * 500 - Internal Server Error 服务器出现错误
 */
export default service
