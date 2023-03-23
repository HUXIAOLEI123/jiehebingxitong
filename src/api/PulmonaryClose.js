import request from "@/http/request";

// 档案管理==》结案



// 获取结案列表
export function toapplysettlement(params){
  return request({
    url:'pulmonarycloses/manage',
    method: 'get',
    params
      
  })
}
// 根据结案主键或管理卡主键获取结案信息
export function pulmonarycloseslist(data,closeId){
  return request({
    url:`pulmonarycloses?diagnosisId=${data}&closeId=${closeId}`,
    method: 'get',  
  })
}
// 结案列表
export function pulmonaryclosesrecordlist(data){
  return request({
    url:`pulmonarycloses/record?diagnosisId=${data}`,
    method: 'get',  
  })
}
// 获取随访服药情况
export function pulmonaryclosesvisitandmedicine(data){
  return request({
    url:`pulmonarycloses/visitandmedicine?diagnosisId=${data}`,
    method: 'get',  
  })
}


// 新建结案
export function addapplysettlement(data){
  return request({
    url:'pulmonarycloses',
    method: 'post',
    data
      
  })
}


// 删除结案
export function deletetuberculosisdiagnosiss(data){
  return request({
    url:'pulmonarycloses/deletes' + `?closeId=${data}`,
    method: 'post',
    
   
  })
}

// 获取结案详情
export function plysettlementList(params){
  return request({
    url:'pulmonarycloses',
    method: 'get',
    params
      
  })
}

// 修改结案
export function updatatuberculosisModify(params,data){
  return request({
    url:`pulmonarycloses/${params}`,
    method: 'patch',
    data
   
  })
}

