import request from "@/http/request";


// 肺结核确诊管理 /api/tuberculosisdiagnosiss

// 获取列表(患者管理)
export function tuberculosisdiagnosiss(params){
  return request({
    url:'tuberculosisdiagnosiss',
    method: 'get',
    params
      
  })
}
// 获取列表(患者管理)
export function unassignedrecordList(params){
  return request({
    url:'tuberculosisdiagnosiss/unassignedrecord',
    method: 'get',
    params
      
  })
}
// 获取信息
export function tuberculosisdiagnosissmsg(params){
  return request({
    url:`tuberculosisdiagnosiss/${params}`,
    method: 'get',
  })
}

// 创建
export function addtuberculosisdiagnosiss(data){
  return request({
    url:'tuberculosisdiagnosiss',
    method: 'post',
    data
      
  })
}
// 编辑
export function edittuberculosisdiagnosiss(params,data){
  return request({
    url:`tuberculosisdiagnosiss/${params}`,
    method: 'patch',
    data
  })
}
 
// 删除 

export function deletetuberculosisdiagnosiss(data){
  return request({
    url:'tuberculosisdiagnosiss/deletes',
    method: 'post',
    data
  })
}


// 患者详情图表
export function tuberculosisdiagnoecharts(params){
  return request({
    url:`tuberculosisdiagnosiss/detailchart/${params.diagnosisId}`,
    method: 'get',
    params
      
  })
}




// 导出 
export function tuberculosisdiagnosissexcel(params){
  return request({
    url:'tuberculosisdiagnosiss/excel',
    method: 'get',
    params
      
  })
}

//生成治疗卡编号
export function generatetreatmentnumber(params){
  return request({
    url:'tuberculosisdiagnosiss/generatetreatmentnumber',
    method: 'get',
    params
      
  })
}


//导入
export function generatetreatmentimport(data){
  return request({
    url:'tuberculosisdiagnosiss/import',
    method: 'post',
	data
  })
}
// 患者转移记录
export function transferrecordlist(diagnosisId){
  return request({
    url:`tuberculosisdiagnosiss/transferrecord/${diagnosisId}`,
    method: 'get',
  })
}


