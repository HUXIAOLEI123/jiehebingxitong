import request from '@/http/request.js';

// 检查申请 (tab中  痰菌检查，分子、耐药、胸片、肝功能)


// 获取列表
export function InspectApplicationlist(params){
  return request({
    url:'inspectapplications/inspectrecord',
    method: 'get',
    params
      
  })
}


// 获取图表
export function InspectApplicationecharts(data,data2){
  return request({
    url:'inspectapplications/detailchart/'+data+'/'+data2,
    method: 'get',
  
      
  })
}


//更新申请修改（预约）

export function InspectApplicationeModify(params,data){
  return request({
    url:`inspectapplications/${params.inspectApplicationId}`,
    method: 'patch',
    data
  
      
  })
}

// 录入结果修改  
export function InspectApplicationeModify2(params,data){
  return request({
    url:`inspectapplications/result/${params}`,
    method: 'patch',
    data:data
  })
}

// 删除 deletes

export function InspectApplicationedeletes(data){
  return request({
    url:`inspectapplications/deletes`,
    method: 'post',    
    data  
  })
}

// 检查结构录入
export function InspectApplicationresult(data){
  return request({
    url:`inspectapplications/result`,
    method: 'post',      
    data
  })
}



// 创建申请信息(预约)
export function InspectApplicationmake(data){
  return request({
    url:`inspectapplications`,
    method: 'post',      
    data
  })
}

// 获取详情
export function getInspectApplicationmake(inspectApplicationId) {
  return request({
    url: `inspectapplications/${inspectApplicationId}`,
    method: 'get',
  })
}
