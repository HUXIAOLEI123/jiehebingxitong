// 中断治疗
import request from '@/http/request'
// 中断治疗列表  pulmonaryinterrupts/manage  get
export function getInterruptsList(params){
  return request({
    url:'pulmonaryinterrupts/manage',
    method: 'get',
    params
  })
}
// 中断治疗列表统计  /pulmonaryinterrupts/cardmanage  get
export function getAllInterruptsList(params){
  return request({
    url:'pulmonaryinterrupts/cardmanage',
    method: 'get',
    params
  })
}
// 中断治疗确认 api/pulmonaryinterrupts/management  post
export function confirmaInfo(data){
  return request({
    url:`pulmonaryinterrupts/management`,
    method: 'post',
    data
    // headers: { 'Content-Type': 'application/json-patch+json'},
  })
}
// 删除 pulmonaryinterrupts/deletes
export function deletesmanagementist(data){
  return request({
    url:'pulmonaryinterrupts/deletes',
    method: 'post',   
    data
  })
}
// export function deletesmanagementist(data){
//   return request({
//     url:'persons/deletes'+`?personId=${data}`,
//     method: 'post',   
//   })
// }