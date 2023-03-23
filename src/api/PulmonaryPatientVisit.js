import request from "@/http/request";

// 后续随访


// 创建随访
export function PulmonaryPatientVisitlist(data) {
  return request({
    url: 'pulmonarypatientvisits',
    method: 'post',
    data
  })
}

//获取详情
export function PulmonaryPatientVisitdetails(params) {
  return request({
    url: `pulmonarypatientvisits/${params.patientVisitId}`,
    method: 'get',
    
  })
}


// 更新修改?
export function PulmonaryPatientVisitupdate(params,data) {
  return request({
  url: `pulmonarypatientvisits/${params.patientVisitId}`,
    method: 'patch',
    data

  })
}

// 删除
export function PulmonaryPatientVisitdelete(data) {
  return request({
    url: 'pulmonarypatientvisits/deletes',
    method: 'post',
    data

  })
}
