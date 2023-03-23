import request from "@/http/request";
// 档案转移模块

// 创建申请信息
export function addApplicationtransfertist(data){
  return request({
    url:'filetransfers',
    method: 'post',
    data
      
  })
}

// 获取申请列表
export function applylicationtransfertist(params){
  return request({
    url:'filetransfers/apply',
    method: 'get',
    params
      
  })
}

// 获取审核列表  

export function auditlicationtransfertist(params){
  return request({
    url:'filetransfers/audit',
    method: 'get',
    params
      
  })
}

// 创建审核信息
export function createauditinformation(fileTransferId,auditStatus,data){
  return request({
    url:`filetransfers/audit/${fileTransferId}/${auditStatus}`,
    method: 'post',
    data
  })
}
// 获取信息
export function getlicationtransfertist(fileTransferId){
  return request({
    url:`filetransfers/${fileTransferId}`,
    method: 'get',
      
  })
}
