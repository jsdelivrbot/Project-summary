import request from 'src/util/request';

let getBankAll = (countryCode) => {
    return request({
        url: "/api/BankInfo/FindAll",
        method: 'post',
        data: 'scope=&countryCode=' + countryCode
    });
}

let createBankInfo = (data) => {
    return request({
        url: "/api/BankInfo/CreateBankInfo",
        method: 'post',
        data: data
    });
}

let removeBankInfo = (bankInfoId) => {
    return request({
        url: "/api/BankInfo/RemoveBankInfo",
        method: 'post',
        data: 'scope=&bankInfoId=' + bankInfoId
    });
}

let setDefalutBank = (bankInfoId) => {
    return request({
        url: "/api/BankInfo/SetDefaultBank",
        method: 'post',
        data: 'scope=&bankInfoId=' + bankInfoId
    });
}
let getBankInfoById = (bankInfoId) => {
    return request({
        url: "/api/BankInfo/GetBankInfo",
        method: 'get',
        params: { id: bankInfoId }
    });
}

let setBankInfo = (data) => {
    return request({
        url: "/api/BankInfo/EditBankInfo",
        method: 'post',
        data: data
    });
}
export default {
    getBankAll: getBankAll,
    addBankInfo: createBankInfo,
    deleteBankInfo: removeBankInfo,
    setDefalutBankInfo: setDefalutBank,
    getBankInfoById: getBankInfoById,
    updateBankInfo: setBankInfo
}