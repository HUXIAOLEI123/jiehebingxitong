import request from '@/http/request.js';

// 获取token (Auth policies: Permission)
export function loginbyticket(params) {
  return request({
    url: 'sso/loginbyticket',
    method: 'get',
    params,
    headers:{
      isToken:false
    }
  });
}

// 单点注销地址 (Auth policies: Permission)
export function ssoLogout(params) {
  return request({
    url: 'sso/logout',
    method: 'get',
    params,
  });
}

// 获取单点登录授权地址 (Auth policies: Permission)
export function ssoauthurl(params) {
  return request({
    url: 'sso/ssoauthurl',
    method: 'get',
    params,
  });
}
