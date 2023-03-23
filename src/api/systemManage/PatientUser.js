import request from '@/http/request';
// 患者账号管理

// 获取申请列表
export function getList(params) {
  return request({
    url: 'patientusers',
    method: 'get',
    params,
  });
}

// 获取详情
export function getDeail(data) {
  return request({
    url: `patientusers/` + data,
    method: 'get',
    data,
  });
}

// 账户停用设置
export function patientusersEnabled(data) {
  return request({
    url: 'patientusers/enabled/' + data.patientUserId + '/' + data.flag,
    method: 'PATCH',
  });
}
// 账户密码修改
export function password(data) {
  return request({
    url:
      'patientusers/password?oldPassword=' + data.oldPassword + '&newPassword=' + data.newPassword + '&patientUserId=' + data.patientUserId,
    method: 'POST',
    data,
  });
}
// 重置密码
export function resetpassword(data) {
  return request({
    url: 'patientusers/resetpassword/?patientUserId=' + data,
    method: 'POST',
    data,
  });
}
