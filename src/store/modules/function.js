import {getApi,postApi,putApi,deleteApi,patchApi} from '@/api/function'

const actions = {
    getApi({ commit},formData) {  
        const {reqData,url}=formData;
        return new Promise((resolve, reject) => { 
            getApi(reqData,url).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    postApi({ commit},formData) {  
        const {reqData,url}=formData;
        return new Promise((resolve, reject) => { 
            postApi(reqData,url).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    putApi({ commit},formData) {  
        const {reqData,url}=formData;
        return new Promise((resolve, reject) => { 
            putApi(reqData,url).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    patchApi({ commit},formData) {  
        const {reqData,url}=formData;
        return new Promise((resolve, reject) => { 
            patchApi(reqData,url).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    deleteApi({ commit},formData) {  
        const {reqData,url}=formData;
        return new Promise((resolve, reject) => { 
            deleteApi(reqData,url).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
}
export default {
    namespaced: true,
    actions
}