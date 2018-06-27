import request from 'src/util/request';

let findProfitDetails = (data) => {
    return request({
        url: "/api/XBao/FindProfitDetails",
        method: 'post',
        data: data
    });
}

let findXBaoTransferDetails = (data) => {
    return request({
        url: "/api/XBao/FindXBaoTransferDetails",
        method: 'post',
        data: data
    });
}

let transferIn = (data) => {
    return request({
        url: "/api/XBao/TransferIn",
        method: 'post',
        data: data
    });
}

let transferOut = (data) => {
    return request({
        url: "/api/XBao/TransferOut",
        method: 'post',
        data: data
    });
}

let getXBaoDataInfo = () => {
    return request({
        url: "/api/XBao/GetXBaoInfo",
        method: 'get'
    });
}

export default {
    getXBaoDataInfo,
    xBaoTransferIn: transferIn,
    xBaoTransferOut: transferOut,
    findXBaoTransferDetails,
    findProfitDetails
}