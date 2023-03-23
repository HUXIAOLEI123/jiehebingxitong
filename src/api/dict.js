import request from '@/http/request.js';
// 字典

// 获取字典类别列表
export function dictionarydetails(params) {
  return request({
    url: 'dictionarycategory',
    method: 'get',
    params,
  });
}

//创建字典类别信息
export function adddictionarycategory(data) {
  return request({
    url: 'dictionarycategory',
    method: 'post',
    data: data,
  });
}

//获取字典类别信息 (Auth policies: Permission)
export function adddictionarycategoryDetail(data) {
  return request({
    url: 'dictionarycategory/' + data,
    method: 'get',
  });
}

// 更新字典类别信息
export function updatedictionarycategory(params) {
  return request({
    url: 'dictionarycategory/' + params.categoryCode,
    method: 'patch',
    data: params.data,
  });
}

//删除字典类别信息
export function deletedictionarycategory(data) {
  return request({
    url: 'dictionarycategory/deletes',
    method: 'post',
    data,
  });
}

// 字典详情（页面使用）
export function usedictionarydetails(params) {
  return request({
    url: 'dictionarydetails',
    method: 'get',
    params,
  });
}
// ------------------字典详情---------------------------
// 获取字典详情列表
export function dictionarydetailsList(params) {
  return request({
    url: 'dictionarydetails',
    method: 'get',
    params,
  });
}

//创建字典详情信息
export function adddictionarydetails(data) {
  return request({
    url: 'dictionarydetails',
    method: 'post',
    data: data,
  });
}

// 更新字典详情信息
export function updatadictionarydetails(params) {
  return request({
    url: 'dictionarydetails/' + params.categoryCode,
    method: 'patch',
    data: params.data,
  });
}

//删除字典详情信息
export function deletedictionarydetails(data) {
  return request({
    url: 'dictionarydetails/deletes',
    method: 'post',
    data:data,
  });
}
