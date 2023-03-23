// 角色管理
import request from '@/http/request'
// 获取角色信息列表 organizationroles  get
export function getRoleList(params) {
  return request({
    url: 'organizationroles',
    method: 'get',
    params
  })
}
// 角色权限 organizationroles/allroles get
export function getRoleLiss(params) {
  return request({
    url: 'organizationroles/allroles',
    method: 'get',
    params
  })
}

// 角色树 organizationpermissions/navigationbar 
export function getRoleTree(params) {
  return request({
    url: 'organizationpermissions/navigationbar',
    method: 'get',
    params
  })
}

// 菜单树 organizationpermissions/permissiontree

export function getTreeList(params) {
  return request({
    url: 'organizationpermissions/permissiontree',
    method: 'get',
    params
  })
}

// 获取菜单列表  /organizationpermissions 

export function getOverList(params) {
  return request({
    url: 'organizationpermissions',
    method: 'get',
    params
  })
}
// 获取菜单树 organizationpermissions/navigationbar
export function getNavigationbarList(params) {
  return request({
    url: 'organizationpermissions/navigationbar',
    method: 'get',
    params
  })
}

//过去角色菜单 organizationpermissions/permissiontree    get
export function getorganizationpermissionsList(params) {
  return request({
    url: 'organizationpermissions/permissiontree',
    method: 'get',
    params
  })
}

// 查询树形  organizationpermissions/permissiontree
export function getpermissiontreetableList(params) {
  return request({
    url: 'organizationpermissions/permissiontree',
    method: 'get',
    params
  })
}


