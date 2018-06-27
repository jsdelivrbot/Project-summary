import Vue from 'vue';
import Router from 'vue-router';
import {
    getToken
} from '../util/auth';
import store from '../store';
import {
    Toast,
    Dialog
} from 'vant';
const _import = file => () =>
    import ('components/' + file + '.vue');

Vue.use(Router);

const routes = [{
        name: 'index',
        path: '/',
        redirect: 'enter'
    },
    { // 入口页
        name: 'enter',
        path: '/enter',
        component: _import('enter/index')
    },
    { // 登录页
        name: 'login',
        path: '/login',
        component: _import('login/index')
    },
    { // 找回登录/支付密码
        name: 'forgetPwd',
        path: '/forgetPwd/:type',
        component: _import('forgetPwd/index')
    },
    { // 修改登录/支付密码
        name: 'userCenter_editPwd',
        path: '/userCenter_editPwd/:type',
        component: _import('user_center/editPwd/index')
    },
    { // 注册
        name: 'register',
        path: '/register',
        component: _import('register/index')
    },
    { //  首页
        name: 'main',
        path: '/main',
        component: _import('main/index')
    },
    { // 个人中心
        name: 'userCenter',
        path: '/userCenter',
        component: _import('user_center/index')
    },
    { // 转出
        name: 'roll_out',
        path: '/roll_out/:type',
        component: _import('roll_out/index'),
        children: [{ // 转出_入口页
                name: 'roll_out_enter',
                path: 'enter',
                component: _import('roll_out/enter/index')
            },
            { // 转出_入口页下一步
                name: 'roll_out_next',
                path: 'next',
                component: _import('roll_out/next/index')
            },
            { // 转出_转出记录
                name: 'roll_out_rollRecord',
                path: 'rollRecord',
                component: _import('roll_out/rollRecord/index')
            },
            { // 转出_兑换积分
                name: 'roll_out_exchange',
                path: 'exchange',
                component: _import('roll_out/exchange/index')
            },
            { // 转出_兑换记录
                name: 'roll_out_exchangeRecord',
                path: 'exchangeRecord',
                component: _import('roll_out/exchangeRecord/index')
            }
        ]
    },
    { // 转出_二维码
        name: 'rollOut_nextQr',
        path: '/rollOut_nextQr',
        component: _import('roll_out/next_qr/index'),
    },
    { // 余额记录
        name: 'balance_record',
        path: '/balance_record',
        component: _import('balance_record/index')
    },
    { // 积分记录
        name: 'intergral_record',
        path: '/intergral_record',
        component: _import('intergral_record/index')
    },
    { //数字资产
        name: 'digital_asset',
        path: '/digital_asset',
        component: _import('digital_asset/index'),
    },
    { //数字资产_转出
        name: 'digital_rollout',
        path: '/digital_rollout',
        component: _import('digital_asset/rollout/index'),
    },
    { //数字资产_转出_记录
        name: 'digital_rollout_record',
        path: '/digital_rollout_record',
        component: _import('digital_asset/rollout/record/index'),
    },
    { //众筹中心
        name: 'crowdfundingCenter',
        path: '/crowdfundingCenter',
        component: _import('crowdfunding_center/index'),
    },
    { //众筹中心_消费记录
        name: ' crowdfundingCenter_record',
        path: '/crowdfundingCenter_record',
        component: _import('crowdfunding_center/record/index'),
    },
    { //X宝数字中心
        name: 'vDigitalcenter',
        path: '/vDigitalcenter',
        component: _import('v_digitalcenter/index'),
    },
    { //X宝数字中心_转入
        name: 'vDigitalcenter_roullIn',
        path: '/vDigitalcenter_roullIn',
        component: _import('v_digitalcenter/roll_in/index'),
    },
    { //X宝数字中心_转出
        name: 'vDigitalcenter_rollOut',
        path: '/vDigitalcenter_rollOut',
        component: _import('v_digitalcenter/roll_out/index'),
    },
    { // 设置
        name: 'userCenter_setting',
        path: '/userCenter_setting',
        component: _import('user_center/setting/index')
    },
    {
        // 设置_昵称
        name: 'userCenter_setting_editName',
        path: '/userCenter_setting_editName',
        component: _import('user_center/setting/edit_name/index')
    },
    {
        // 设置_版本
        name: 'userCenter_setting_editVersions',
        path: '/userCenter_setting_editVersions',
        component: _import('user_center/setting/versions/index')
    },
    {
        // 设置_关于
        name: 'userCenter_setting_editAbouts',
        path: '/userCenter_setting_editAbouts',
        component: _import('user_center/setting/abouts/index')
    },
    {
        // 我的银行卡
        name: 'userCenter_bnak',
        path: '/userCenter_bnak',
        component: _import('user_center/bank/index')
    },
    {
        // 添加银行卡
        name: 'add_bank',
        path: '/add_bank/:bankId',
        component: _import('user_center/bank/add_bank/index')
    },
    {
        // 我的资产
        name: 'userCenter_myCapital',
        path: '/userCenter_myCapital',
        component: _import('user_center/my_capital/index')
    },
    {
        // 公告
        name: 'userCenter_notice',
        path: '/userCenter_notice',
        component: _import('user_center/notice/index')
    },
    {
        // 公告_详情
        name: 'userCenter_notice_detail',
        path: '/userCenter_notice_detail',
        component: _import('user_center/notice/notice_detail/index')
    },
    {
        // 个人消息
        name: 'userCenter_personMsg',
        path: '/userCenter_personMsg',
        component: _import('user_center/person_msg/index')
    },
    {
        // 个人消息_详情
        name: 'userCenter_personMsg_detail',
        path: '/userCenter_personMsg_detail',
        component: _import('user_center/person_msg/person_msg_detail/index')
    },
    {
        // 投诉建议
        name: 'userCenter_complain',
        path: '/userCenter_complain',
        component: _import('user_center/complain/index')
    },
    {
        // 分享
        name: 'userCenter_share',
        path: '/userCenter_share',
        component: _import('user_center/share/index')
    },
    {
        // 分享记录
        name: 'userCenter_share_record',
        path: '/userCenter_share_record',
        component: _import('user_center/share/share_record/index')
    },
    {
        // 区域选择
        name: 'areaSelection',
        path: '/areaSelection',
        component: _import('area_selection/index')
    },
    //
    {
        name: 'buy',
        path: '/buy/:type',
        component: _import('buy/index')
    },

    {
        name: 'create_order',
        path: '/buy/in/create_order',
        component: _import('buy/create_order/index')
    },

    {
        name: 'trade_record',
        path: '/Digital_Asset/trade_record',
        component: _import('trade_record/index')
    }, ,

    {
        name: 'trade_order',
        path: '/Digital_Asset/trade_order/:type',
        component: _import('trade_order/index')
    },
    {
        name: 'digital_asset_type',
        path: '/Digital_Asset/digital_asset_type/:type',
        component: _import('digital_asset/digital_asset_type/index')
    },
    { // 订单详情 0现金 1余额
        name: 'DigitalAsset_tradeOrder_detail',
        path: '/DigitalAsset_tradeOrder_detail/:type',
        component: _import('digital_asset/detail/index')
    },
    { // 扫描页面
        name: 'barscan',
        path: '/barscan',
        component: _import('native/barscan/index')
    }
];
const router = new Router({
    routes
});

const whiteList = ['/login', '/enter', '/register', '/forgetPwd/0']; // 不重定向白名单
router.beforeEach((to, from, next) => {
    store.commit('set_loading', true);
    next();
    if (getToken()) {
        if (to.path === '/login' || to.path === '/enter') {
            next({
                path: '/main'
            });
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
            //   store.commit('set_loading', false);
        }
    }
});

router.afterEach(() => {
    store.commit('set_loading', false);
});
document.addEventListener('plusready', function() {
    //console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
    plus.key.addEventListener('backbutton', function() {
        if (!window.inBack) {
            router.back();
            return;
        }
        window.inBack();
        return;
    }, false);

});
export default router;