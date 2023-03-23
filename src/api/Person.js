import request from "@/http/request";
// 档案管理模块




// 获取列表
export function managementist(params){
  return request({
    url:'persons',
    method: 'get',
    params
      
  })
}

// 新增
export function addmanagementist(data){
  return request({
    url:'persons',
    method: 'post',
    data
      
  })
}
// 删除 
export function deletesmanagementist(data){
  return request({
    url:'persons/deletes'+`?personId=${data}`,
    method: 'post',   
  })
}

// 导出档案
export function exportmanagementist(params){
  return request({
    url:'persons/excel',
    method: 'get',
    params
      
  })
}

// 更新修改

export function updatemanagementist(params,data){
  return request({
    url:`persons/${params.personId}`,
    method: 'patch',
    data
  })
}
export function detailmanagementist(personId){
  return request({
    url:`persons/${personId}`,
    method: 'get',
  })
}

// 根据身份证号返回档案列表是否重复
export function ardNoemanagementist(params){
  return request({
    url:`persons/repeat/${params}`,
    method: 'get',
  })
}
// 生成档案编号
export function generatefilenumber(params){
  return request({
    url:`persons/generatefilenumber`,
    method: 'get',
  })
}