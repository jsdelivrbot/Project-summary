import request from 'src/util/request'

export function Register(data) {
    return request({
        url: '/api/User/Register',
        method: 'post',
        data: data
    })
}

// 获取当前登录用户的信息
export function GetCurrentUser(token) {
    return request({
        url: '/api/User/GetCurrentUser',
        method: 'get',
    })
}
// 获取其它用户信息
export function GetOtherUser(data) {
    return request({
        url: '/api/User/GetOtherUser',
        method: 'post',
        data: data
    })
}
// 判断用户是否存在
export function IsUserExisting(data) {
    return request({
        url: '/api/User/IsUserExisting',
        method: 'post',
        data: data
    })
}

// 编辑昵称
export function EditNickName(data) {
    return request({
        url: '/api/User/EditNickName',
        method: 'post',
        data: data
    })
}

//上传头像
export function uploadAvatar(data) {
    return request({
        url: '/api/FileInfo/UploadAvatar',
        method: 'post',
        data: data
    })
}