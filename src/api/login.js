import request from '@/http/request.js';

// 登录页后获取token
export function JWTToken(params){
  return request({
    url:'tokens/JWTToken3.0',
    method: 'get',
    params
      
  })
}





