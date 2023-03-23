// 教育推送
import request from '@/http/request'
// 获取列表 api/healtheducationpushrecords   get
export function educationList(params){
  return request({
    url:'healtheducations',
    method:'get',
    params
  })
}
// 新增
export function addEducationList(data){
  return request({
    url:'healtheducations',
    method:'post',
    data
  })
}

// 删除
export function delEducationList(data){
  return request({
    url:'healtheducations/deletes',
    method:'post',
    data
  })
}
//获取详情
export function detailEducationList(healthEducationId){
  return request({
    url:`healtheducations/${healthEducationId}`,
    method:'get',
  })
}

//编辑
export function editEducationList(healthEducationId,data){
  return request({
    url:`healtheducations/${healthEducationId}`,
    method: 'patch',
    data
  })
}

