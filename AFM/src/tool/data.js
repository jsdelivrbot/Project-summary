var langlist = [
    { title: '中文简体', value: 'zh-CN' },
    { title: '中文繁體', value: 'zh-TW' },
    { title: 'English', value: 'en' },
    { title: '한국어', value: 'ko' },
    { title: 'ภาษาไทย', value: 'th' },
    { title: 'República Argentina', value: '0agt'},
    { title: 'Australia', value: '0ydly'},
    { title: '북한', value: '0cx'},
    { title: 'Republika ng Pilipinas', value: '0flb'},
    { title: 'Canada', value: '0jnd'},
    { title: 'Российская Федерация', value: '0els'},
    { title: 'Malaysia', value: '0mlxy'},
    { title: '日本', value: '0rb'},
    { title: 'Switzerland', value: '0rs'},
    { title: 'Singapore', value: '0xjp'}
];

var getLangArr = function(preArr) {
    let arr = [];
    preArr = !Array.isArray(preArr) ? [] : preArr;
    for (let index = 0; index < preArr.length; index++) {
        let i = preArr[index];
        let obj = {
            label: i,
            value: index + 1
        };
        arr.push(obj);
    }
    return arr;
}

var getOption = function(vueInst, name) {
    var obj = {
        jihuoState_option: ['已激活', '未激活'],
        JSpos_option: ['左区', '右区'],
        identify_option: ['身份证', '护照'],
        pwdLevel_option: ['一级密码', '二级密码'],
        bankname_option: ['中国银行', '工商银行', '建设银行', '交通银行', '农业银行'],
        level_option: [
            "小学",
            "中学",
            "高中",
            "大学",
            "硕士",
            "博士",
            "博士后"
        ],
        costType_option: [
            '激活积分',
            '幸福指数',
            '幸运指数',
            '消费指数',
            '消费积分',
            '福利基金',
            '爱心基金',
            '发展基金'
        ], //扣款方式即钱包类型
        upgradeState_option: ["已审核", "未审核", "已撤销"],
    }
    return getLangArr(obj['option.' + name]);
}

var getList = function(arr, type) {
    var obj = [];

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (type == 1) {
            obj.push({
                label: item,
                value: i + 1
            });
        } else {
            obj.push({
                label: item,
                value: i
            });
        }

    }
    return obj;
}


/** 根据汇率对象匹配出对应的数组
 * configArr  匹配的数组
 * type 过滤函数
 * idType 匹配id的键
 * */
function getConfigArr(configArr, type, idType) {
    var arr = [];
    for (var i = 0; i < configArr.length; i++) {
        // 遍历每个配置
        var item = configArr[i];

        if (arr.length <= 0) {
            // 没有值时
            arr.push({
                label: type(item[idType]),
                value: item[idType]
            });
        } else {
            var flag = false;
            for (var j = 0; j < arr.length; j++) {
                var items = arr[j];
                if (items.value === item[idType]) {
                    flag = true;
                }
            }

            if (!flag) {
                // 不相等，则添加
                arr.push({
                    label: type(item[idType]),
                    value: item[idType]
                });
            }
        }
    }
    return arr;
}


module.exports = {
    langlist,
    getOption,
    getList,
    getConfigArr
}