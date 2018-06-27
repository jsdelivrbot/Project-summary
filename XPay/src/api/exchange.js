import request from 'src/util/request';

let exchange = (data) => {
    return request({
        url: "/api/Exchange/Exchange",
        method: 'post',
        data: data
    });
}

let findExchangeDetails = (data) => {
    return request({
        url: "/api/Exchange/FindExchangeDetails",
        method: 'post',
        data: data
    });
}
export default {
    exchange,
    getExchangeDetails: findExchangeDetails
}