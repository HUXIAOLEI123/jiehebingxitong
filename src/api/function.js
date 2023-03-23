import request from "@/utils/request";
import qs from "qs";
export function getApi(data, url) {
  return request({
    url: url,
    method: "get",
    contentType: "application/json-patch+json",
    params: data,
  });
}
export function postApi(data, url) {
  return request({
    url: url,
    method: "post",
    data,
    contentType: "application/json;charset=UTF-8",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // 'content-type': 'application/json;charset=UTF-8'
    },
  });
}
export function putApi(data, url) {
  return request({
    url: url,
    method: "put",
    data,
  });
}
export function patchApi(data, url) {
  return request({
    url: url,
    method: "patch",
    data,
  });
}
export function deleteApi(data, url) {
  return request({
    url: url,
    method: "delete",
    data,
  });
}
