import request from '@/http/request';
/**
 * 机构用户
 */

// 获取机构用户列表
export function getOrganizationusersList(params) {
  return request({
    url: 'organizationusers',
    method: 'get',
    params,
  });
}
// 创建机构用户信息
export function addOrganizationusers(params) {
  return request({
    url: 'organizationusers',
    method: 'POST',
    data: params,
  });
}
// 获取机构用户详情
export function organizationusersDetail(params) {
  return request({
    url: 'organizationusers/' + params,
    method: 'get',
  });
}
// 更新机构用户信息
export function Editorganizationusers(params) {
  return request({
    url: 'organizationusers/' + params.UserId,
    method: 'PATCH',
    data: params.data,
  });
}
// 删除机构用户信息
export function deletes(params) {
  return request({
    url: 'organizationusers/deletes',
    method: 'POST',
    data: params,
  });
}
// 账户密码修改 (Auth policies: Permission)
export function editPassword(params) {
  console.log(params);
  return request({
    url:
      'organizationusers/password?userId=' + params.userId + '&oldPassword=' + params.oldPassword + '&newPassword=' + params.newPassword,
    method: 'POST',
  });
}

// 账户密码重置 (Auth policies: Permission, Permission)
export function editResetpassword(params) {
  return request({
    url: 'organizationusers/resetpassword?userId=' + params,
    method: 'POST',
  });
}

// 根据机构获取用户下拉列表 (Auth policies: Permission)
export function editResetUserDrop(params) {
  return request({
    url: 'organizationusers/userDrop/' + params.organizationId + '/' + params.selectOnly,
    method: 'get',
  });
}
