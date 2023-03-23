import request from '@/http/request';

// 文件管理模块

// 上传文件

export function fileStorageInfoupload(type, relationGuid, data) {
  return request({
    url: `/filestorageinfos?type=` + type + '&relationGuid=' + relationGuid,
    method: 'post',
    data,
  });
}

// 删除上传文件
export function fileStorageInfodeletes(data) {
  return request({
    url: `/filestorageinfos/deletes`,
    method: 'post',
    data,
  });
}

// 获取文件信息列表
export function fileStorageInfolist(params) {
  return request({
    url: `/filestorageinfos/files?relationGuids=` + params.relationGuids,
    method: 'get'
  });
}
