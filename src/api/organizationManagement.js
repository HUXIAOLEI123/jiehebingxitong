// 机构管理
import requert from '@/http/request'
// 获取机构列表 api/organization   get
export function getOrganizationList(params){
  return requert({
    url:'organization',
    method:'get',
    params
  })
}
//机构--级联
export function getorgcascader(OrganizationId,IsAppoinOrganization){
	// if(!IsAppoinOrganization){
	// 	 IsAppoinOrganization = false; 
	// }
  return requert({
      url: `organization/cascader/${OrganizationId}${IsAppoinOrganization?'?isAppoinOrganization='+IsAppoinOrganization:''}`,
      method: 'get'
  })
}



// 创建机构 api/organization post
export function addOrganization(data){
  return requert({
    url:'organization',
    method:'post',
    data
  })
}
// // 获取机构信息 api/organization  get
// export function addOrganizationInfo(params){
//   return requert({
//     url:'organization',
//     method:'get',
//     params
//   })
// }
// 获取行政区划 api/regions
export function getRegionsList(params){
  return requert({
    url:'regions',
    method:'get',
    params
  })
}
//获取机构用户列表
export function organizationusers(params){
  return requert({
    url:'organizationusers',
    method:'get',
    params
  })
}
//根据机构获取用户下拉列表
export function getuserDrop(organizationId,selectOnly){
  return requert({
      url: `organizationusers/userDrop/${organizationId}/${selectOnly}`,
      method: 'get'
  })
}
// //联级选择器
// export function getorgcascader(params){
//   return requert({
//     url:'organization/cascader/'+params,
//     method:'get',
//   })
// }
//查询所有机构
export function allorganizations(params){
  return requert({
    url:'organization/allorganizations',
    method:'get',
    params
  })
}


//查询机构下拉框
export function droporganizations(params){
  return requert({
    url:'organization/droporganizations',
    method:'get',
    params
  })
}