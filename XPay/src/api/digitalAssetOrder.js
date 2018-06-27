import request from 'src/util/request';

let findDigitalAssetHistories = (data) => {
    return request({
        url: "/api/DigitalAssetOrder/FindDigitalAssetHistories",
        method: 'post',
        data: data
    });
}

let getCoinInfo = (currency) => {
    return request({
        url: "/api/DigitalAssetOrder/GetCoinInfo",
        method: 'get',
        params: { currency: currency }
    });
}

let publishOrder = (data) => {
    return request({
        url: "/api/DigitalAssetOrder/PublishOrder",
        method: 'post',
        data: data
    });
}

let getCoinPriceTrends = (data) => {
    return request({
        url: "/api/DigitalAssetOrder/GetCoinPriceTrends",
        method: 'get',
        params: data
    });
}

let getCoinKLines = (currency) => {
    return request({
        url: "/api/DigitalAssetOrder/GetCoinKLines",
        method: 'get',
        params: { currency: currency }
    });
}

let findActiveOrders = (data) => {
    return request({
        url: "/api/DigitalAssetOrder/FindActiveOrders",
        method: 'post',
        data: data
    });
}

let findMyActiveOrders = (data) => {
    return request({
        url: "/api/DigitalAssetOrder/FindMyActiveOrders",
        method: 'post',
        data: data
    });
}

let findUnderwayOrDoneOrders = (data) => {
    return request({
        url: "/api/DigitalAssetOrder/FindMyOrderDetails",
        method: 'post',
        data: data
    });
}

let cancelOrder = (id) => {
    return request({
        url: "/api/DigitalAssetOrder/CancelOrder",
        method: 'post',
        data: { orderId: id }
    });
}

export default {
    getTradeRecord: findDigitalAssetHistories,
    getCoinInfo,
    publishOrder,
    getCoinPriceTrends,
    getCoinKLines,
    getActiveOrders: findActiveOrders,
    getMyActiveOrders: findMyActiveOrders,
    getUnderwayOrDoneOrders: findUnderwayOrDoneOrders,
    cancelOrder
}