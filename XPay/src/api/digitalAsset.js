import request from 'src/util/request';

let generateAddress = (currency) => {
    return request({
        url: "/api/DigitalAsset/GenerateAddress",
        method: 'post',
        data: { currency: currency }
    });
}

let getWalletCoins = () => {
    return request({
        url: "/api/DigitalAsset/GetWalletCoins",
        method: 'get'
    });
}


export default {
    getWalletCoins: getWalletCoins,
    generateAddress: generateAddress
}