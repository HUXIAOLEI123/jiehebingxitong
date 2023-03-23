import request from '@/http/request'
// 服药管理  pulmonarymedicines/manage  get
export function getMedicinesList(params){
  return request({
    url:'pulmonarymedicines/manage',
    method: 'get',
    params
  })
}
// 删除api/pulmonarymedicines/deletes   post
export function delMedicines(data){
  return request({
    url:'pulmonarymedicines/deletes',
    method: 'post',
    data
  })
}
// export const delMedicines = PersonId => {
//   return request({
//       url: `pulmonarymedicines/deletes/${PersonId}`,
//       method: 'post'
//   })
// }
