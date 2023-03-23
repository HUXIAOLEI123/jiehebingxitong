import request from '@/http/request'
// 随访管理  pulmonaryvisits/manage  get
export function manageList(params){
  return request({
    url:'pulmonaryvisits/manage',
    method: 'get',
    params
  })
}
// 行政区划连级选择 api/organization/cascader get
export function cascaderList(params){
  return request({
    url:'regions/cascader',
    method: 'get',
    params
  })
}
// 新建随访  pulmonarypatientvisits   post
export function addPulmonary(data){
  return request({
    url:'pulmonarypatientvisits',
    method: 'post',
    data
  })
}

export const getPulmonary = organizationId => {
  return request({
      url: `organization/cascader/${organizationId}`,
      method: 'get'
  })
}
// 第一次随访 api/pulmonaryfirstvisits  post
export function firstPulmonaryVisit(data){
  return request({
      url: 'pulmonaryfirstvisits',
      method: 'post',
      data
  })
}
// 后续随访 api/pulmonarypatientvisits  post
export function followPulmonaryVisit(data){
  return request({
      url: 'pulmonarypatientvisits',
      method: 'post',
      data
  })
}
// 删除数据api/pulmonaryfirstvisits/deletes post 
export function delPulmonaryVisit(data){
  return request({
    // api/pulmonarypatientvisits/deletes
      // url: 'pulmonarypatientvisits/deletes',
      url: 'pulmonarypatientvisits/deletes',
      method: 'post',
      data
  })
}
// 编辑
export function editPulmonaryVisit(params,data){
  return request({
    url:`pulmonaryfirstvisits/${params}`,
    method: 'patch',
    data
  })
}
// 编辑后续
export function editpulmonarypatientvisits(params,data){
  return request({
    url:`pulmonarypatientvisits/${params}`,
    method: 'patch',
    data
  })
}

