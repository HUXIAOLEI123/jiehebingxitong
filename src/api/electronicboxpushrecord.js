// 电子药盒日志
import request from '@/http/request'
// 获取列表 
export function electronicboxpushrecordlist(params){
  return request({
    url:'electronicboxpushrecord',
    method:'get',
    params
  })
}