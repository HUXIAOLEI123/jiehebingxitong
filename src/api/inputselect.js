import request from '@/http/request.js';
//字典使用 行政区划


//行政列表--级联
export const regions = regionCode => {
  return request({
      url: `regions/cascader/${regionCode}`,
      method: 'get'
  })
}
export const getRegions = params => {
  return request({
      url: `regions`,
      method: 'get',
      params
  })
}
//查询父级(获取信息)
export const fullparentregion = params => {
  return request({
      url: '/regions',
      method: 'get',
      params
  })
}

// 获取检查项目详情(修改)
export const getregisters = data => {
  return request({
      url: 'regions/regionCode' + data,
      method: 'patct',
  })
}

