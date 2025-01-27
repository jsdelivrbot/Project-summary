import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
    // in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
    // detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/login',
        component: _import('login/index'),
        hidden: true,
        children:[
            {
                name:'登录',
                path:'/login',
                component: _import('login/userLogin/index'),
            },
            {
                name:'忘记密码',
                path:'/login/forget',
                component: _import('login/forgetPassword/index'),
            },
            {
                name:'找回密码',
                path:'/login/find',
                component: _import('login/forgetPassword/find'),
            },
            {
                name:'找回密码成功',
                path:'/login/findSuccess',
                component: _import('login/forgetPassword/success'),
            },
        ]
    },
    {
        path: '/404',
        component: _import('404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: '/dashboard',
            // component: _import('dashboard/index')
        }]
    },
    {
        path: '/friendsHome',
        redirect: '/friendsHome',
        name: 'friendsHome',
        component: _import('friendsHome/index'),
        hidden: true,
        children: [{
            path: '/friendsHome/index/:id',
            component: _import('friendsHome/index'),
        }]
    },

    {
        path: '/PersonalCenter',
        component: Layout,
        redirect: '/PersonalCenter',
        name: '个人中心',
        children: [{
            path: 'index',
            component: _import('PersonalCenter/index'),
            children: [{
                    name: '第一步',
                    path: '/security/changeSecurity/step1',
                    component: _import('security/changeSecurity/step1'),
                },
                {
                    name: '第二步',
                    path: '/security/changeSecurity/step2',
                    component: _import('security/changeSecurity/step2'),
                },
                {
                    name: '修改登录密码',
                    path: '/security/changePwd/pwd1',
                    component: _import('security/changePwd/pwd1'),
                },
                {
                    name: '修改交易密码',
                    path: '/security/changePwd/pwd2',
                    component: _import('security/changePwd/pwd2'),
                },
            ]
        }, ]
    },

    {
        path: '/TradingHall',
        component: Layout,
        redirect: '/TradingHall',
        name: '交易大厅',
        children: [{
                path: 'index',
                component: _import('TradingHall/index'),
                children:[{
                    name:'交易市场',
                    path: '/TradingHall/tradeMarket',
                    component: _import('TradingHall/tabItem/tradeMarket'),
                },
                {
                    name:'我的挂单',
                    path: '/TradingHall/pendOrder',
                    component: _import('TradingHall/tabItem/pendOrder'),
                },
                {
                    name:'已匹配挂单',
                    path: '/TradingHall/matchpendOrder',
                    component: _import('TradingHall/tabItem/matchpendOrder'),
                    children:[{
                        name:'查看信息',
                        path: '/TradingHall/matchpendOrder/chekInfo:id',
                        component: _import('TradingHall/tradeModel/checkInfo'),

                    }]
                },
                {
                    name:'购买记录',
                    path: '/TradingHall/buyRecord',
                    component: _import('TradingHall/tabItem/buyRecord'),
                    children:[{
                        name:'查看信息',
                        path: '/TradingHall/buyRecord/chekInfo:id',
                        component: _import('TradingHall/tradeModel/checkInfoBuy'),

                    }]
                }
            ]
            },
            {
                path: 'DirectionalTrade',
                component: _import('TradingHall/tradeOperate/DirectionalTrade'),
            },
            {
                path: 'sell',
                component: _import('TradingHall/tradeOperate/sell'),
            },
        ]
    },

    {
        path: '/Wallet',
        component: Layout,
        redirect: '/wallet',
        name: '多宝鱼钱包',
        children: [{
                name: '多宝鱼钱包',
                path: 'index',
                component: _import('wallet/index'),
                children: [{

                        name: '多宝鱼数量',
                        path: '/wallet/report',
                        component: _import('wallet/report/index'),
                        children: [{
                            name: '兑换雨苗',
                            path: '/wallet/report/form',
                            component: _import('wallet/report/form'),
                        }, ]

                    },
                    {

                        name: '收支明细',
                        path: '/wallet/detail',
                        component: _import('wallet/detail/index')
                            // children: [{
                            //     name: '多宝鱼充值表单',
                            //     path: '/wallet/recharge/form',
                            //     component: _import('wallet/recharge/form'),
                            // }, ]

                    }
                ]
            },
            {
                name: '多宝鱼充值',
                path: '/wallet/recharge',
                component: _import('wallet/recharge/index'),
                children: [{
                    name: '多宝鱼充值表单',
                    path: '/wallet/recharge/form',
                    component: _import('wallet/recharge/form'),
                }, ]
            },

        ]
    },
    {
        path: '/shop',
        component: Layout,
        name: '商城',
        children: [{
                name: '首页',
                path: '/shop',
                component: _import('shop/index'),
                children: [{
                        name: '商品列表',
                        path: '/shop/goods',
                        component: _import('shop/goods/index'),
                        children: [{
                            name: '购买',
                            path: '/shop/cart/buy/:id',
                            component: _import('shop/goods/buy'),
                        }]
                    },
                    {
                        name: '购物车',
                        path: '/shop/cart',
                        component: _import('shop/cart/index'),
                        children: [{
                            name: '去结算',
                            path: '/shop/cart/pay:id',
                            component: _import('shop/confirmOrder/index'),
                            children:[{
                                name: '添加收货地址',
                                path: '/shop/cart/pay/address',
                                component: _import('shop/address/add'),
                            }]
                        }]
                    },
                    {
                        name: '我的订单',
                        path: '/shop/order',
                        component: _import('shop/order/index'),
                    },
                    {
                        name: '现金结算',
                        path: '/shop/Cash',
                        component: _import('shop/Cash/index'),
                    }

                ]
            }

        ]
    },
    {
        path: '/teamManage',
        component: Layout,
        name: '团队管理',
        children: [{
                name: '首页',
                path: '/teamManage',
                component: _import('teamManage/index'),
                children: [{
                        name: '推广注册',
                        path: '/teamManage/expanRegister',
                        component: _import('teamManage/manageItem/expanRegister'),
                    },
                    {
                        name: '我的团队',
                        path: '/teamManage/myTeam',
                        component: _import('teamManage/manageItem/myTeam'),
                    }

                ]
            }

        ]
    },
    {
        path:'/splitChart',
        component: Layout,
        name: '拆分走势',
        redirect: '/splitChart',
        children: [{
                name: '拆分走势',
                path: 'index',
                component: _import('splitChart/index'),
            }

        ]
    },
    {
        path:'/activity',
        component: Layout,
        name: '团队管理',
        redirect: '/activity',
        children: [{
                name: '活动',
                path: 'index',
                component: _import('Activity/index'),
                children:[{
                    name:'中奖',
                    path:'/activity/lucky',
                    component: _import('Activity/lucky'),
                },
                {
                    name:'未中奖',
                    path:'/activity/unlucky',
                    component: _import('Activity/Unlucky'), 
                }
            ]
            }

        ]

    },
    {
        path:'/setting',
        component: Layout,
        name: '团队管理',
        redirect: '/setting',
        children: [{
                name: '设置',
                path: 'index',
                component: _import('setting/index'),
            }

        ]

    },
    {
        path: '/infoManage',
        component: Layout,
        name: '信息管理',
        children: [{
                name: '首页',
                path: '/infoManage',
                component: _import('infoManage/index'),
                children: [{
                        name: '新闻公告',
                        path: '/infoManage/news',
                        component: _import('infoManage/news/index'),
                        children: [{
                            name: '新闻详情',
                            path: '/infoManage/news/detail/:id',
                            component: _import('infoManage/news/detail'),
                        }]
                    },
                    {
                        name: '联系客服',
                        path: '/infoManage/message',
                        component: _import('infoManage/message/index'),
                        children: [{
                            name: '查看留言',
                            path: '/infoManage/message/check/:id',
                            component: _import('infoManage/message/check'),
                        }]
                    },
                    {
                        name: '我要留言',
                        path: '/infoManage/message/form',
                        component: _import('infoManage/message/form'),

                    },


                ]
            }

        ]
    },


    {
        path: '/security',
        component: Layout,
        name: '安全中心',
        children: [{
                name: '修改登录密码',
                path: '/security/changePwd/pwd1',
                component: _import('security/changePwd/pwd1'),
            },
            {
                name: '修改交易密码',
                path: '/security/changePwd/pwd2',
                component: _import('security/changePwd/pwd1'),
            },
            {
                name: '修改密保',
                path: '/security/changeSecurity',
                component: _import('security/changeSecurity/index'),
                children: [{
                        name: '第一步',
                        path: '/security/changeSecurity',
                        component: _import('security/changeSecurity/step1'),
                    },
                    {
                        name: '第二步',
                        path: '/security/changeSecurity',
                        component: _import('security/changeSecurity/step2'),
                    }
                ]
            }
        ]
    },


    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})