import request from 'src/util/request';

let updateUserPassword = (data) => {
    return request({
        url: "/api/UserSecurity/EditL1Pwd",
        method: 'post',
        data: data
    });
}

let updatePayPassword = (data) => {
    return request({
        url: "/api/UserSecurity/EditL2Pwd",
        method: 'post',
        data: data
    });
}

let forGetUserPassword = (data) => {
    return request({
        url: "/api/UserSecurity/FoundL1Pwd",
        method: 'post',
        data: data
    });
}

let forGetPayPassword = (data) => {
    return request({
        url: "/api/UserSecurity/FoundL2Pwd",
        method: 'post',
        data: data
    });
}


export default {
    updateUserPassword: updateUserPassword,
    updatePayPassword: updatePayPassword,
    forGetUserPassword: forGetUserPassword,
    forGetPayPassword: forGetPayPassword
}