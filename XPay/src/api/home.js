import request from 'src/util/request';

let getBalanceChanges = (data) => {
    return request({
        url: "/api/Home/FindBalanceChanges",
        method: 'post',
        data: data
    });
}

let getPointsChanges = (data) => {
    return request({
        url: "/api/Home/FindUserPointsChanges",
        method: 'post',
        data: data
    });
}

let GetCurrentUserAssets = () => {
    return request({
        url: "/api/Home/GetCurrentUserAssets",
        method: 'get'
    });
}

let GetCurrentDailyReleaseInfo = () => {
    return request({
        url: "/api/Home/GetCurrentDailyReleaseInfo",
        method: 'get'
    });
}

let Release = (data) => {
    return request({
        url: "/api/Home/Release",
        method: 'post'
    });
}


let GetSlideshowList = () => {
    return request({
        url: "/api/Home/GetSlideshowList",
        method: 'get'
    });
}

export default {
    getPointsChanges: getPointsChanges,
    getBalanceChanges: getBalanceChanges,
    GetCurrentUserAssets,
    GetCurrentDailyReleaseInfo,
    Release,
    GetSlideshowList
}