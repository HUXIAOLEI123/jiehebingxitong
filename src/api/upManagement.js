import request from '@/http/request.js';

//获取列表
export function getList(params) {
  return request({
    url: `pulmonaryvisits/manage`,
    method: 'get',
    params: params,
    data: params,
  });
}
