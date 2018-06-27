import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    //console.log(Cookies.get(TokenKey));
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

const UserKey = 'Admin-UserId'
export function getUserId() {
    //console.log(Cookies.get(TokenKey));
    return Cookies.get(UserKey)
}

export function setUserId(userId) {
    return Cookies.set(UserKey, userId)
}

export function removeUserId() {
    return Cookies.remove(UserKey)
}