import request from "@/http/request";


// 随访管理

// 管理列表
export function PulmonaryVisitlist(params) {
  return request({
    url: 'pulmonaryvisits',
    method: 'get',
    params

  })
}