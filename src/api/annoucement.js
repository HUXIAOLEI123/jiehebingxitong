import request from '@/http/request'
// 公告接口
// 获取公告 api/announcements get
export function getAnnouncements(params) {
  return request({
    url: 'announcements',
    method: 'get',
    params
  })
}
//修改公告  aapi/announcements patch
// 获取检查项目详情(修改)
export const updataAnnounce = data => {
  return request({
      url: 'announcements' + data,
      method: 'patct',
  })
}

// 新增公告  api/announcements
export function addOrUpdataAnnouncements(data) {
  return request({
    url: 'announcements',
    method: 'post',
    // headers: { 'Content-Type': 'application/json-patch+json'},
    data
  })
}
// 删除公告  api/announcements
export function delAnnouncements(data) {
  return request({
    url: 'announcements/deletes',
    method: 'post',
    // headers: { 'Content-Type': 'application/json-patch+json'},
    data
  })
}

//详情公告
export function DetailAnnouncements(params) {
  return request({
    url: `oannouncements/${params}`,
    method: 'get',
  })
}
