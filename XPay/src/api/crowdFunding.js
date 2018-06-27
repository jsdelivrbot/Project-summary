import request from 'src/util/request';

let findWarmupCrowdFundings = (data) => {
    return request({
        url: "/api/CrowdFunding/FindWarmupCrowdFundings",
        method: 'post',
        data: data
    });
}

let findCrowdFundings = (data) => {
    return request({
        url: "/api/CrowdFunding/FindCrowdFundings",
        method: 'post',
        data: data
    });
}


let placeOrder = (data) => {
    return request({
        url: "/api/CrowdFunding/PlaceOrder",
        method: 'post',
        data: data
    });
}

let findPurchaseHistories = (data) => {
    return request({
        url: "/api/CrowdFunding/FindPurchaseHistories",
        method: 'post',
        data: data
    });
}


let findReleaseHistories = (data) => {
    return request({
        url: "/api/CrowdFunding/FindReleaseHistories",
        method: 'post',
        data: data
    });
}

export default {
    getWarmupCrowdFundings: findWarmupCrowdFundings,
    getCrowdFundings: findCrowdFundings,
    submitPlaceOrder: placeOrder,
    getPurchaseHistories: findPurchaseHistories,
    getReleaseHistories: findReleaseHistories
}