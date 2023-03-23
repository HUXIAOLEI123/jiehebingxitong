import request from "@/http/request";

// 不良反应


// 获取不良反应列表
export function pulmonarybadreactionslist(diagnosisId) {
  return request({
    url:`pulmonarybadreactions?DiagnosisId=${diagnosisId}`,
    method: 'get',
  })
}


// 图表信息(患者详情)（数据直接链接接口）
export function pulmonarybadreactionecharts(data) {
  return request({
    url: `pulmonarybadreactions/detailchart/`+data,
    method: 'get',
  })
}

// 创建处置信息
export function addpulmonarybadreactiondisposal(badReactionId,data) {
  return request({
    url: `pulmonarybadreactions/management/`+badReactionId,
    method: 'post',
    data
  })
}
// 创建不良反应信息
export function pulmonarybadreactionsBadreaction(data) {
  return request({
    url: 'pulmonarybadreactions/badreaction',
    method: 'POST',
    data,
  });
}