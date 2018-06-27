import { parseTime, toFixed } from "@/tool/index";
import store from "@/store/index";

export function fixedFilter(value) {
    return toFixed(value, 6);
}

export function getImgUrlFilter(value) {
    var baseURL1 = location.protocol + '//' + process.env.API1;
    var baseURL2 = location.protocol + '//' + process.env.API2;
    return baseURL2 + value
}

export function fixedFilter2(value) {
    if (value) {
        return toFixed(value, 2);
    }
}

export function translate(value, obj) { // 翻译
    var val = value;
    var statusMap = store.getters.globalTranslate;
    if (statusMap[val] !== undefined && statusMap[val]) {
        return statusMap[val];
    } else {
        return val;
    }

}


export function bankType(val) { // 银行
    if (val == 1) {
        return '中国银行'
    } else if (val == 2) {
        return '工商银行'
    } else if (val == 3) {
        return '建设银行'
    } else if (val == 4) {
        return '交通银行'
    } else if (val == 5) {
        return '农业银行'
    } else {
        return val
    }
}


export function CertyType(id) { // 证件类型
    if (id == 1) {
        return '身份证'
    } else if (id == 2) {
        return '护照'
    }
}

export function RealCurrencyType(id) { // 真实货币
    if (id == 1) {
        return '人民币'
    } else if (id == 2) {
        return '美元'
    } else if (id == 3) {
        return '欧元'
    } else if (id == 4) {
        return '港币'
    } else if (id == 5) {
        return '韩元'
    } else if (id == 6) {
        return '泰铢'
    }
}

export function StatusType(id) { // 状态码
    if (id == 0) {
        return '成功'
    } else if (id == 100) {
        return '无权限'
    } else if (id == 101) {
        return '帐号或密码错误'
    } else if (id == 102) {
        return '密码修改失败'
    } else if (id == 103) {
        return '会员不存在'
    } else if (id == 104) {
        return '注册失败'
    } else if (id == 105) {
        return '不能为空'
    } else if (id == 106) {
        return '请输入8-11位作为登录帐号!'
    } else if (id == 107) {
        return '该会员已存在'
    } else if (id == 108) {
        return '长度有误'
    } else if (id == 109) {
        return '两次输入的密码不匹配'
    } else if (id == 110) {
        return '会员不存在'
    } else if (id == 111) {
        return '手机号不正确'
    }
}

export function JDPositionType(id) { // 安置位置
    if (id == 1) {
        return '左区'
    } else if (id == 2) {
        return '右区'
    }
}

export function WidthdrawType(id) { // 提现状态
    if (id == 1) {
        return '已提交审核,等待处理'
    } else if (id == 2) {
        return '审核中'
    } else if (id == 3) {
        return '审核通过'
    }
}

export function FinancialType(id) { // 财务类型
    if (id == 1) {
        return '注册会员';
    } else if (id == 2) {
        return '级别升级';
    } else if (id == 3) {
        return '充值扣款';
    } else if (id == 4) {
        return '货币转换';
    } else if (id == 5) {
        return '转账';
    } else if (id == 6) {
        return '汇款充值';
    } else if (id == 7) {
        return '提现';
    } else if (id == 8) {
        return '奖金收入';
    } else if (id == 9) {
        return '购物';
    } else if (id == 10) {
        return '会员投资';
    }
}

export function CurrencyType(id) { // 钱包类型
    if (id == 1) {
        return '激活积分'
    } else if (id == 2) {
        return '激活币'
    } else if (id == 3) {
        return '幸福指数'
    } else if (id == 4) {
        return '幸运指数'
    } else if (id == 5) {
        return '消费指数'
    } else if (id == 6) {
        return '消费积分'
    } else if (id == 7) {
        return '福利基金'
    } else if (id == 8) {
        return '爱心基金'
    } else if (id == 9) {
        return '发展基金'
    } else if (id == 10) {
        return '复投积分'
    }
}

export function LevelType(id) { // 级别类型
    if (id == 1) {
        return translate("小学")
    } else if (id == 2) {
        return translate('中学')
    } else if (id == 3) {
        return translate('高中')
    } else if (id == 4) {
        return translate('大学')
    } else if (id == 5) {
        return translate('硕士')
    } else if (id == 6) {
        return translate('博士')
    } else if (id == 7) {
        return translate('博士后')
    } else {
        return translate('免费')
    }
}

export function SplitTimeType(id) { // 拆分次数
    if (id == 0) {
        return '0'
    } else if (id == 1) {
        return '1'
    } else if (id == 2) {
        return '2'
    } else if (id == 3) {
        return '3'
    } else if (id == 4) {
        return '4'
    } else if (id == 5) {
        return '5'
    } else if (id == 6) {
        return '6'
    }
}

export function FieldType(id) { // 奖励类型
    if (id == 'Field_1') {
        return '分享值'
    } else if (id == 'Field_2') {
        return '平衡值'
    } else if (id == 'Field_3') {
        return '培育值'
    } else if (id == 'Field_4') {
        return '幸福见点'
    } else if (id == 'Field_5') {
        return '交易奖'
    } else if (id == 'Field_6') {
        return '静态收益'
    }
}


export function jyStatusType(id) { // 交易状态
    if (id == 100) {
        return '等待交易'
    } else if (id == 200) {
        return '等待买家打款'
    } else if (id == 300) {
        return '等待卖家确认收款'
    } else if (id == 400) {
        return '交易完成'
    } else if (id == 500) {
        return '买家打款超时已被投诉'
    } else if (id == 510) {
        return '买家虚假打款已被投诉'
    } else if (id == 600) {
        return '卖家已被投诉'
    } else if (id == 700) {
        return '已撤销'
    }
}

export function zfType(id) {
    if (id == 1) {
        return '未付款'
    } else if (id == 2) {
        return '银行转账'
    } else if (id == 3) {
        return '支付宝'
    } else if (id == 4) {
        return '微信'
    }
}

export function readStatus(val) { //留言状态
    if (val == true) {
        return "是"
    } else {
        return '否'
    }
}
export function orderStatus(val) { //订单状态
    if (val == 1 || val == '1') {
        return '已付款，未发货'
    }
    if (val == 2 || val == '2') {
        return '已发货，未确认'
    }
    if (val == 3 || val == '3') {
        return '已确认，交易完成'
    }
}
export function orderType(val) { //订单类型
    if (val == 1 || val == '1') {
        return '注册订单'
    }
    if (val == 2 || val == '2') {
        return '升级订单'
    }
    if (val == 3 || val == '3') {
        return '普通订单'
    }
}

export function getArr(val) { //获取数组
    
    
}