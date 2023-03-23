import request from "@/http/request";
// 治疗方案模板

// 获取列表
export function treatmentplantemplates(params){
  return request({
    url:'treatmentplantemplates',
    method: 'get',
    params
      
  })
}

// 新增
export function treatmentplantemModify(data){
  return request({
    url:`treatmentplantemplates`,
    method:'post',
    data     
  })
}

// 治疗方案记录
export function treatmentplanrecord(diagnosisId){
  return request({
    url:`tuberculosisdiagnosiss/treatmentplanrecord/${diagnosisId}`,
    method:'get',     
  })
}
// 获取详情
export function treatmentplantemplatesDetails(params) {
  return request({
    url: 'treatmentplantemplates/' + params,
    method: 'get',
  });
}
// 更新信息 (Auth policies: Permission)
export function treatmentplanrecordEdit(params){
  return request({
    url:`treatmentplantemplates/${params.TreatmentPlanId}`,
    method: 'PATCH',
    data: params.data,    
  })
}
// 删除信息 (Auth policies: Permission)
export function treatmentplanrecordDeletes(params){
  return request({
    url:`treatmentplantemplates/deletes`,  
    method: 'POST',
    data: params,
  })
}




