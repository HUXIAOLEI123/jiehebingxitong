// 机构用户
import request from '@/http/request.js';
// 获取用户列表  api/organizationusers   get
export function getUserList(params) {
  return request({
    url: 'organizationusers',
    method: 'get',
    params,
  });
}

// 创建用户  api/organizationusers  post
export function addUser(data) {
  return request({
    url: 'organizationusers',
    method: 'post',
    data,
  });
}

// 修改用户信息  api/organizationusers  patch
export function updataUser(data) {
  return request({
    url: 'organizationusers',
    method: 'patch',
    data,
  });
}

// 删除用户信息  api/organizationusers/deletes post
export function delUser(data) {
  return request({
    url: 'organizationusers/deletes',
    method: 'post',
    data,
  });
}

// 账户密码修改
export function editPassword(data) {
  return request({
    url:
      'organizationusers/password?oldPassword=' + data.oldPassword + '&newPassword=' + data.newPassword + '&userId=' + data.patientUserId,
    method: 'POST',
    data,
  });
}
