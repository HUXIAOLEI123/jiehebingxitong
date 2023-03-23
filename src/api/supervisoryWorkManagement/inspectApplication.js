import request from '@/http/request'
// 检查管理 获取列表数据 inspectapplications/personmanage get
// export function getInspectList(params){
//   return request({
//     url:'inspectapplications/personmanage',
//     method: 'get',
//     params
//   })
// }
// 获取列表数据 api/inspectapplications/manage
export function getInspectList(params){
  return request({
    url:'inspectapplications/manage',
    method: 'get',
    params
  })
  // 获取统计 nspectapplications/personmanage
}export function getAllInspectList(params){
  return request({
    url:'inspectapplications/personmanage',
    method: 'get',
    params
  })
}

// 预约检查 api/inspectapplications  post
export function appointment(data){
  return request({
    url:'inspectapplications',
    method: 'post',
    data
  })
}
// 上传文件  api/filestorageinfos  post
export function getFiles(data){
  return request({
    url:'filestorageinfos',
    method: 'post',
    data
  })
}
// 累计人数api/inspectapplications/inspectstatistics

export function getinspects(params){
  return request({
    url:'inspectapplications/inspectstatistics',
    method: 'get',
    params
  })
}
// 删除数据 inspectapplications/delete
export function delInspects(data){
  return request({
    url:'inspectapplications/delete',
    method: 'post',
    data
  })
}