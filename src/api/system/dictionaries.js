// import request from "@/http/request";


// // 查询字典管理列表
// export function dictionariesList(params) {
//     return request({
//         url: '/system/dict/type',
//         method: 'get',
//         params
//     })
// }

// // 获取字典管理获取详情
// export function dictionaries(params) {
//     return request({
//         url: '/system/dict/type/' + params,
//         method: 'get'
//     })
// }


// // 增加字典管理列表
// export function adddictionaries(data) {
//     return request({
//         url: '/system/dict/type',
//         method: 'post',
//         data
//     })
// }

// // 修改字典管理列表
// export function editdictionaries(data) {
//     return request({
//         url: '/system/dict/type',
//         method: 'put',
//         data
//     })
// }

// // 删除字典管理列表
// export function deletedictionaries(data) {
//     return request({
//         url: '/system/dict/type',
//         method: 'delete',
//         data
//     })
// }
// // 查询字典类型列表
// export function dictionariestypeList(params) {
//     return request({
//         url: '/system/dict/data',
//         method: 'get',
//         params
//     })
// }
// // 新增字典类型列表
// export function adddictionariestype(data) {
//     return request({
//         url: '/system/dict/data',
//         method: 'post',
//         data
//     })
// }
// // 修改字典类型列表
// export function editdictionariestype(data) {
//     return request({
//         url: '/system/dict/data',
//         method: 'put',
//         data
//     })
// }
// // 删除字典类型列表
// export function deletedictionariestype(data) {
//     return request({
//         url: '/system/dict/data',
//         method: 'delete',
//         data
//     })
// }

// // 根据字典类型查询字典数据信息
// export function getDictByType(type) {
//     return request({
//         url: `/system/dict/data/type/${type}`,
//         method: 'get',
//     })
// }