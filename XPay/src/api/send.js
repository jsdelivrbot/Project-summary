import request from 'src/util/request';

let assetSendOut = (data) => {
    return request({
        url: "/api/Send/Send",
        method: 'post',
        data: data
    });
}

let findSendDetails = (data) => {
    return request({
        url: "/api/Send/FindSendDetails",
        method: 'post',
        data: data
    });
}

let findReceiveDetails = (data) => {
    return request({
        url: "/api/Send/FindReceiveDetails",
        method: 'post',
        data: data
    });
}

export default {
    assetSendOut,
    getSendOutRecord: findSendDetails,
    getSendInRecord: findReceiveDetails
}