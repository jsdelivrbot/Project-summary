import Vue from 'vue'
import Router from 'vue-router'
import { MessageBox } from 'element-ui'
import { translate } from "@/tool/filters";

// var _import = file => () => import('@/components/' + file + '.vue');
function _import(file) {
    return function () {
        return import('@/components/' + file + '.vue');
    }
}
Vue.use(Router);
let routes = [{
        path: '/',
        name: '',
        component: _import('homestyle/home_fr'),
        children: [{
            path: '/',
            name: 'indexc',
            component: _import('home'), 
        }, {
            path: 'register',
            name: '分享注册',
            component: _import('register/register'),
        }]
    },
    {
        path: '/profile',
        component: _import('homestyle/home_fr'),
        children: [{
            path: '/',
            name: '个人资料',
            component: _import('profile/info'),
        }, {
            path: 'edit',
            name: '修改资料',
            component: _import('profile/edit'),
        }, {
            path: 'changepwd',
            name: '修改密码',
            component: _import('pwd/changepwd'),
        }, {
            path: 'associate',
            name: '关联账户',
            component: _import('profile/guanlian'),
        }, {
            path: 'safety',
            name: 'safety',
            component: _import('profile/safety'),
        }]
    },
    {
        path: '/market',
        name: '市场管理',
        component: _import('homestyle/home_fr'),
        children: [{
            path: 'register',
            name: 'register1',
            component: _import('register/register'),
        }, {
            path: 'share',
            name: '分享',
            component: _import('marketmag/share'),
        }, {
            path: 'upgrade',
            name: '级别升级',
            component: _import('marketmag/upgrade'),
        }, {
            path: 'myActive',
            name: '我要激活',
            component: _import('marketmag/myActive'),
        }],
    },
    {
        path: '/finance',
        name: '财务管理',
        component: _import('homestyle/home_fr'),
        children: [{
                path: 'award',
                name: '奖励明细',
                component: _import('finance/award_detail'),
            },
            {
                path: 'fdetail',
                name: '财务明细',
                component: _import('finance/caiwu_detail'),
            },
            {
                path: 'cash',
                name: '提现管理',
                component: _import('finance/cash_manage'),
            },
            {
                path: 'exchange',
                name: '货币兑换',
                component: _import('finance/money_exchange'),
            },
            {
                path: 'transfer',
                name: '货币转账',
                component: _import('finance/money_transfer'),
            },
            {
                path: 'recharge',
                name: '汇款充值',
                component: _import('finance/remittance_recharge'),
            }
        ],
    },
    {
        path: '/mall',
        component: _import('homestyle/mall_home_fr'),
        children: [{
            path: '/',
            name: '商城首页',
            component: _import('shopping/index'),
        }, {
            path: 'car',
            name: 'mall_car', // 商城购物车
            component: _import('shopping/car'),
        }, {
            path: 'detail',
            name: 'mall_detail', // 商城详情
            component: _import('shopping/detail'),
        }, {
            path: 'order',
            name: 'mall_order', // 商城订单
            component: _import('shopping/order'),
        }, {
            path: 'order/detail/',
            name: 'mall_order_detail', // 商城订单——详情
            component: _import('shopping/order_detail'),
        }, {
            path: 'address',
            name: 'mall_address', // 商城收获地址
            component: _import('shopping/address'),
        }],
    },
    {
        path: '/network',
        name: '我的网络',
        component: _import('homestyle/home_fr'),
        children: [{
            path: 'jpos',
            component: _import('network/jspos'),
        }, {
            path: 'recom',
            component: _import('network/recommend'),
        }],
    },
    {
        path: '/trade',
        name: '交易中心',
        component: _import('homestyle/home_fr'),
        children: [{
            path: 'consume',
            component: _import('trading/consumption_index'),
        }, {
            path: 'consume/record', // 消费指数交易-交易记录
            name: 'consumption_index_record',
            component: _import('trading/consumption_index_record'),
        }, {
            path: 'currency', // 货币交易
            component: _import('trading/currency'),
        }, {
            path: 'currency/record', // 货币交易_购买记录
            component: _import('trading/currency_record'),
        }, {
            name: 'currencyDetail',
            path: 'currency/detail', // 货币交易_出售详情
            component: _import('trading/currency_detail'),
        }],
    },
    {
        path: '/information',
        component: _import('homestyle/home_fr'),
        children: [{
            path: '/',
            name: 'notice',
            component: _import('informationMng/notice'),
        }, {
            path: 'notice_detail',
            name: 'notice_detail',
            component: _import('informationMng/notice_detail'),
        }, {
            path: 'gbook',
            name: 'gbook',
            component: _import('informationMng/gbook'),
        }, {
            path: 'gbook_detail',
            name: 'gbook_detail',
            component: _import('informationMng/gbook_detail'),
        }],
    },
    { path: '/protocol', name: '注册协议', component: _import('register/protocol'), name: '注册协议' },
    { path: '/login', name: '登录', component: _import('login'), },
    { path: '/fpwd', name: '找回密码', component: _import('pwd/findpwd'), },
    { path: '/disable', name: 'disable', component: _import('disable/index'), },
];
let router = new Router({
    base: '/',
    routes
});

var mallReg = /^\/mall.*/;

var reg = /#\/.+/;

// mallReg.test(to.path)
router.beforeEach((to, from, next) => {
    let obj = JSON.parse(localStorage.getItem('amf_user'));
    let user = obj && obj.user ? obj.user : null;
    if (!user || !user.UserId) {
        //需要登录
        let target_path = to.path;
        if (to.path == '/login' || to.path == '/register' ||
            to.path == '/protocol' || to.path == '/fpwd' ||
            to.path == '/mall' || to.path == '/disable' || to.path == '/mall/detail') {
            next();
        } else {
            if (from.path == '/' && !reg.test(location.hash)) { // 如果是未登录第一次进入
                next('/mall');
            } else {
                next('/login');
            }
        }
    } else {
        //不需要登录
        next();
    }
});

export default router