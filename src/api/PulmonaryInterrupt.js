import request from "@/http/request";

// 中断治疗

// 获取列表
export function pulmonaryinterruptslist(diagnosisId) {
  return request({
    url: `pulmonaryinterrupts?DiagnosisId=${diagnosisId}`,
    method: 'get',
  })
}

// 患者详情(图表)
export function pulmonaryinterruptscharts(data) {
  return request({
    url: `/pulmonaryinterrupts/detailchart/`+data,
    method: 'get',

  })
}

// 中断治疗确认
export function pulmonaryinterruptsconfirm(data) {
  return request({
    url: `/pulmonaryinterrupts/management`,
    method: 'post',
    data
  })
}

