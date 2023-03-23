import request from '@/http/request';

// 服药监督

// 获取列表
export function pulmonarymedicineslist(params) {
  return request({
    url: 'pulmonarymedicines',
    method: 'get',
    params,
  });
}

// 服药时间日历
export function pulmonarymedicinestime(diagnosisId, startDate, endDate) {
  return request({
    url: `pulmonarymedicines/statistics/${diagnosisId}/${startDate}/${endDate}`,
    method: 'get',
  });
}

// 医生批量提交患者服药
export function pulmonarymedicinesMedicinesupplement(data) {
  return request({
    url: 'pulmonarymedicines/medicinesupplement?diagnosisId=' + data.diagnosisId,
    method: 'POST',
    data:data.Arr,
  });
}


// 服药转态确认
export function pulmonarymedicinessruas(data) {
  return request({
    url: `pulmonarymedicines/medicineconfirm`,
    method: 'post',
    data,
  });
}
// 医生批量提交患者服药
export function pulmonarymedicinesupplement(diagnosisId, data) {
  return request({
    url: `pulmonarymedicines/medicinesupplement?diagnosisId=${diagnosisId}`,
    method: 'post',
    data,
  });
}
// 获取中断服药和异常服药列表适用于医生端端
export function pulmonarymedicineabnormal(DiagnosisId, SubmitConfirm, SubmitTimes, SubmitTimes1, PageNumber, PageSize) {
  return request({
    url: `pulmonarymedicines/medicineabnormal?DiagnosisId=${DiagnosisId}&SubmitConfirm=${SubmitConfirm}&SubmitTimes=${SubmitTimes}&SubmitTimes=${SubmitTimes1}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    method: 'get',
  });
}
