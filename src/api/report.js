import request from '@/http/request'
// 结核病规范管理接口 pulmonarystandard
export function Pulmonarystandard(params){
  return request({
    url:'report/pulmonarystandard',
    method: 'get',
    params
      
  })
}
// 结核病规范管理统计报表
export function Pulmonarystandardexcle(params){
  return request({
    url:'report/pulmonarystandardexcle',
    method: 'get',
    params
      
  })
}
// 结核病数据监视统计报表 report/pulmonarydatasupervision
export function RegulatoryInfo(params){
  return request({
    url:'report/pulmonarydatasupervision',
    method: 'get',
    params
      
  })
}
// 结核病数据监视统计报表excle
// export function (params){
//   return request({
//     url:'report/pulmonarydatasupervisionexcle',
//     method: 'get',
//     params
      
//   })
// }