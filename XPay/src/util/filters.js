import store from '../store';
import {
    parseTime,
    toFixed
} from "@/util/index";

const imgUrl = (value) => {
    let baseURL = process.env.PROTOCOL + process.env.BASE_API;
    return baseURL + value;
};

const translate = function(value, obj) {
    var statusMap = store.getters.clientData.globalTranslate || {};
    var val = value;
    if (statusMap[val] !== undefined && statusMap[val]) {
        return statusMap[val];
    }
    return value;
}

const getTime = function(value) {
    alert(value);
    return parseTime(value, '{y}-{m}-{d}');
}

//货币toFixed
const currencyToFixed = function(value) {
    if (value) {
        var val = value.toFixed(8);
        if (val.indexOf('.') >= 0) val = trimRight(val, ['0']);
        val = trimRight(val, ['.']);
        return val;
    }
    return value;
}

function trimRight(str, arr) {
    var i = str.length - 1;
    for (; i > 0 && contains(arr, str.charAt(i)); i--);
    return str.substring(0, ++i);
}

export {
    imgUrl,
    translate,
    getTime,
    currencyToFixed
};