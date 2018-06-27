import request from 'src/util/request';

let findTransferOuts = (data) => {
    return request({
        url: "/api/Transfer/FindTransferOuts",
        method: 'post',
        data: data
    });
}

let findTransferIns = (data) => {
    return request({
        url: "/api/Transfer/FindTransferIns",
        method: 'post',
        data: data
    });
}

let transfer = (data) => {
    return request({
        url: "/api/Transfer/Transfer",
        method: 'post',
        data: data
    });
}

export default {
    getTransferOuts: findTransferOuts,
    getTransferIns: findTransferIns,
    transferOut: transfer
}