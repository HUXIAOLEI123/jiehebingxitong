import request from '@/http/request';
/**
 * 角色
 */

// 获取角色列表
export function getOrganizationrolesList(params) {
  return request({
    url: 'organizationroles',
    method: 'get',
    params,
  });
}
// 创建角色信息
export function addorganizationroles(params) {
  return request({
    url: 'organizationroles',
    method: 'POST',
    data: params,
  });
}
// 获取角色详情
export function organizationrolesDetail(params) {
  return request({
    url: 'organizationroles/' + params,
    method: 'get',
  });
}
// 更新角色信息
export function Editorganizationroles(params) {
  return request({
    url: 'organizationroles/' + params.RoleId,
    method: 'PATCH',
    data: params.data,
  });
}
// 删除角色信息
export function deletes(params) {
  return request({
    url: 'organizationroles/' + params,
    method: 'POST',
  });
}
// 角色下拉数据
export function allroles(params) {
  return request({
    url: 'organizationroles/allroles',
    method: 'get',
    data: params,
  });
}
