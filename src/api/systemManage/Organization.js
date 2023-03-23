import request from '@/http/request';
//机构模块
// 获取机构列表
export function getList(params) {
  return request({
    url: 'organization',
    method: 'get',
    params,
  });
}
// 创建机构信息
export function addOrganization(params) {
  return request({
    url: 'organization',
    method: 'post',
    data: params,
  });
}
// 获取机构详情
export function organizationDetail(params) {
  return request({
    url: 'organization/' + params,
    method: 'get',
  });
}
// 更新机构信息
export function editorganization(params) {
  return request({
    url: 'organization/' + params.organizationId,
    method: 'PATCH',
    data: params.data,
  });
}
// 全部机构下拉数据
export function allorganizations(params) {
  return request({
    url: 'organization/allorganizations',
    method: 'get',
  });
}
// 级联选择器
export function cascader(organizationId) {
  return request({
    url: 'organization/cascader/' + organizationId,
    method: 'get',
  });
}

// 删除机构信息
export function deletes(params) {
  return request({
    url: 'organization/deletes',
    method: 'post',
    data: params,
  });
}
