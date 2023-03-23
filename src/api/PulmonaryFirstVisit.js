import request from "@/http/request";

// tab第一次随访



// 创建随访
export function pulmonarybadreactionslist(data) {
  return request({
    url: 'pulmonaryfirstvisits',
    method: 'post',
    data
  })
}

//获取详情
export function pulmonarybadreactionsdetails(params) {
  return request({
    url: 'pulmonaryfirstvisits/firstVisitId',
    method: 'get',
    params
  })
}


// 更新修改?
export function pulmonarybadreactionsupdate(params,data) {
  return request({
    url: `pulmonaryfirstvisits/${params.firstVisitId}`,
    method: 'patch',
    data

  })
}

// 删除
export function pulmonarybadreactionsdelete(data) {
  return request({
    url: 'pulmonaryfirstvisits/deletes',
    method: 'post',
    data

  })
}