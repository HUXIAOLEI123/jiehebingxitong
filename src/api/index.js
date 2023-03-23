import request from "@/http/request";

// 首页


// 年龄分布
export function Agedistribution(params){
  return request({
    url:'index/agedistribution',
    method: 'get',
    params
      
  })
}



// 获取公告信息
export function Announcement(params){
  return request({
    url:'index/announcement',
    method: 'get',
    params
      
  })
}
// 发病数统计
export function Casesnumberstatistics(params){
  return request({
    url:'index/casesnumberstatistics',
    method: 'get',
    params
      
  })
}

// 数据统计
export function Datastatistics(params){
  return request({
    url:'index/datastatistics',
    method: 'get',
    params
      
  })
}


// 男女比例
export function Genderdistribution(params){
  return request({
    url:'index/genderdistribution',
    method: 'get',
    params
      
  })
}


// 患者区域分布top5
export function Regionaldistribution(params){
  return request({
    url:'index/regionaldistribution',
    method: 'get',
    params
      
  })
}