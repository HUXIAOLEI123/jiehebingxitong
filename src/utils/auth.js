import Cookies from 'js-cookie'

const TokenKey = 'GW-HDRG-TOKEN'
const LoginKey = 'GW-HDRG-LOG'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLoginInfo() {
  return JSON.parse(localStorage.getItem(LoginKey))
}
export function setLoginInfo(info) {
  return localStorage.setItem(LoginKey,JSON.stringify(info))
}
export function removeLoginInfo() {
  return localStorage.removeItem(LoginKey);
}