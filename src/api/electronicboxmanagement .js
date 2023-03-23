// 电子药盒
import request from '@/http/request'
// 获取列表 
export function electronicboxmanagementlist(params){
  return request({
    url:'electronicboxmanagement',
    method:'get',
    params
  })
}
// 新增
export function addelectronicboxmanagement(data){
  return request({
    url:'electronicboxmanagement',
    method:'post',
    data
  })
}
// 删除
export function delelectronicboxmanagement(data){
  return request({
    url:'electronicboxmanagement/deletes?boxId='+data,
    method:'post',
  })
}
//获取详情
export function detailelectronicboxmanagement(boxId){
  return request({
    url:`electronicboxmanagement/${boxId}`,
    method:'get',
  })
}
// 解绑
export function unbindctronicboxmanagement(boxId){
  return request({
    url:`electronicboxmanagement/unbind/${boxId}`,
    method:'get',
  })
}
//编辑
export function editelectronicboxmanagement(boxId,data){
  return request({
    url:`electronicboxmanagement/${boxId}`,
    method: 'patch',
    data
  })
}



