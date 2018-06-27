import request from 'src/util/request';

let findNotices = (data) => {
    return request({
        url: "/api/Notice/FindNotices",
        method: 'post',
        data: data
    });
}

let getNotice = (id) => {
    return request({
        url: "/api/Notice/GetNotice",
        method: 'get',
        params: { id: id }
    });
}


export default {
    getNoticeDatas: findNotices,
    getNoticeDetail: getNotice
}