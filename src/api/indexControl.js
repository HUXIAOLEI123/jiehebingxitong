import request from '@/http/request.js';
//字典使用 行政区划

// 获取机构数据列表
export function cdcdatasyncDepts(params) {
  return request({
    url: 'cdcdatasync/depts',
    method: 'get',
    params,
  });
}
// 获取区划数据列表
export function cdcdatasyncRegions(params) {
  return request({
    url: 'cdcdatasync/regions',
    method: 'get',
    params,
  });
}
// 获取用户数据列表
export function cdcdatasyncUsers(params) {
  return request({
    url: 'cdcdatasync/users',
    method: 'get',
    params,
  });
}

// 异常趋势
export function dashboardAbnormaltrend(params) {
  return request({
    url: 'dashboard/abnormaltrend',
    method: 'get',
    params,
  });
}
// 不良反应
export function dashboardBadreaction(params) {
  return request({
    url: 'dashboard/badreaction',
    method: 'get',
    params,
  });
}
// 中断服药
export function dashboardDiscontinuemedication(params) {
  return request({
    url: 'dashboard/discontinuemedication',
    method: 'get',
    params,
  });
}
// 地图
export function dashboardMap(params) {
  return request({
    url: 'dashboard/map',
    method: 'get',
    params,
  });
}
// 督导情况
export function dashboardSupervisionoverview(params) {
  return request({
    url: 'dashboard/supervisionoverview',
    method: 'get',
    params,
  });
}
// 督导情况统计
export function dashboardSupervisionstatistics(params) {
  return request({
    url: 'dashboard/supervisionstatistics',
    method: 'get',
    params,
  });
}
// 随访
export function dashboardVisit(params) {
  return request({
    url: 'dashboard/visit',
    method: 'get',
    params,
  });
}
