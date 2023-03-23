import request from '@/http/request'
// 不良反应  api/pulmonarybadreactions/manage get
export function getBadreactionList(params) {
  return request({
    url: 'pulmonarybadreactions/manage',
    method: 'get',
    params
  })

}
// 不良反应的处置  api/pulmonarybadreactions/management
export function inshowBadreaction(badReactionId,data) {
  return request({
    url:  `pulmonarybadreactions/management/${badReactionId}`,
    method: 'post',
    data
  })
}



// 删除 api/pulmonarybadreactions/deletes post
export function delBadreaction(data) {
  return request({
    url: 'pulmonarybadreactions/deletes',
    method: 'post',
    data
  })
}

