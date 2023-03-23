import request from '@/http/request';
/**
 * 菜单信息
 */

// 获取菜单列表
export function getList(params) {
  return request({
    url: 'organizationpermissions',
    method: 'get',
    params,
  });
}
// 创建菜单信息
export function addOrganizationpermissions(params) {
  return request({
    url: 'organizationpermissions',
    method: 'POST',
    data:params,
  });
}
// 获取菜单详情
export function organizationpermissionsDetail(params) {
  return request({
    url: 'organizationpermissions/' + params,
    method: 'get',
  });
}
// 更新菜单信息
export function Editorganizationpermissions(params) {
  return request({
    url: 'organizationpermissions/' + params.PermissionId,
    method: 'PATCH',
    data:params.data
  });
}
// 删除菜单信息
export function deletes(params) {
  return request({
    url: 'organizationpermissions/deletes',
    method: 'POST',
    data: params,
  });
}
// 获取菜单树列表 (Auth policies: Permission)
export function allorganizationpermissionsnAvigationbar(params) {
  return request({
    url: 'organizationpermissions/navigationbar',
    method: 'get'
  });
}
// 获取菜单树 (Auth policies: Permission)
export function allorganizationpermissionsPermissiontree(params) {
  return request({
    url: 'organizationpermissions/permissiontree',
    method: 'get',
  });
}
// 通过角色获取菜单【无权限】 (Auth policies: Permission)
export function allorganizationpermissionsPermissiontree2(params) {
  return request({
    url: 'organizationpermissions/permissiontree/' + params.roleId,
    method: 'get',
  });
}
// 查询树形 Table (Auth policies: Permission)
export function allorganizationpermissionsPermissiontreetable(params) {
  return request({
    url: 'organizationpermissions/permissiontreetable',
    method: 'get',
  });
}