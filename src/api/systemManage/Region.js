import request from '@/http/request';
import { param } from '@/utils';
/**
 * 行政区划
 */

// 获取行政区划列表
export function getList(params) {
  return request({
    url: 'regions',
    method: 'get',
    params,
  });
}
// 创建行政区划信息
export function addRegions(params) {
  return request({
    url: 'regions',
    method: 'POST',
    data:params,
  });
}
// 获取行政区划详情
export function regionsDetail(params) {
  return request({
    url: 'regions/' + params,
    method: 'get',
  });
}
// 更新行政区划信息
export function Editregions(params) {
  return request({
    url: 'regions/' + params.RegionCode,
    method: 'PATCH',
    data:params.data
  });
}
// 删除行政区划信息
export function deletes(params) {
  return request({
    url: 'regions/deletes',
    method: 'POST',
    data: params,
  });
}

// 获取行政区划级联选择器 (Auth policies: Permission)
export function cascader(params) {
  return request({
    url: 'regions/cascader/' + params.regionCode,
    method: 'get',
  });
}

// 根据级别获取对应区划信息 (Auth policies: Permission)
export function levelofregion(params) {
  return request({
    url: 'regions/levelofregion/' + params.regionCode + '/' + params.regionLevel,
    method: 'get',
  });
}
