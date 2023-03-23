import request from '@/http/request';
/**
 * 接口管理
 */

// 获取接口列表
export function getList(params) {
  return request({
    url: 'organizationmodules',
    method: 'get',
    params,
  });
}
// 创建接口信息
export function addOrganizationmodules(params) {
  return request({
    url: 'organizationmodules',
    method: 'POST',
    data:params,
  });
}
// 获取接口详情
export function organizationmodulesDetail(params) {
  return request({
    url: 'organizationmodules/' + params,
    method: 'get',
  });
}
// 更新接口信息
export function Editorganizationmodules(params) {
  return request({
    url: 'organizationmodules/' + params.ParentId,
    method: 'PATCH',
    data:params.data
  });
}
// 删除接口信息
export function deletes(params) {
  return request({
    url: 'organizationmodules/deletes',
    method: 'POST',
    data: params,
  });
}
