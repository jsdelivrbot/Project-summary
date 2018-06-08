'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
 



                $urlRouterProvider
                    .otherwise('/app/dashboard-v1');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(
                                            [
                                                'js/controllers/wqt_loginout.js',
                                            ]
                                        ) //登出
                                }
                            ]
                        }
                    })

                .state('app.dashboard-v1', {
                        url: '/dashboard-v1',
                        templateUrl: 'tpl/app_dashboard_v1.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'vendor/libs/echarts.min.js',
                                        'js/controllers/wqt_homepage.js',
                                        
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.ui', {
                        url: '/ui',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.ui.tree', {
                        url: '/tree',
                        templateUrl: 'tpl/ui_tree.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/tree.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })

                // form
                .state('app.form', {
                    url: '/form',
                    template: '<div ui-view class="fade-in"></div>',
                    resolve: {
                        deps: ['uiLoad',
                            function(uiLoad) {
                                return uiLoad.load('js/controllers/form.js');
                            }
                        ]
                    }
                })

                .state('app.form.validation', {
                        url: '/validation',
                        templateUrl: 'tpl/form_validation.html'
                    })
                    // pages
                    .state('app.page', {
                        url: '/page',
                        template: '<div ui-view class="fade-in-down"></div>'
                    })

                // others
                .state('lockme', {
                        url: '/lockme',
                        templateUrl: 'tpl/page_lockme.html'
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/page_signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/wqt_signin.js']); //登录
                                }
                            ]
                        }
                    })
                    .state('erwei', {
                        url: '/erwei',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('erwei.erweima', {
                        url: '/erweima',
                        //params:{'usercode':'CN123123'},
                        templateUrl: 'tpl/erweima.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/wqt_signin.js']); //登录
                                }
                            ]
                        }
                    })

                .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/page_signup.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/signup.js']);
                                }
                            ]
                        }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'tpl/page_forgotpwd.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/wqt_signin.js']);
                                }
                            ]
                        }
                    })
                    .state('access.forgetMiBao', {
                        url: '/forgetMiBao',
                        templateUrl: 'tpl/page_forgetMiBao.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/wqt_signin.js']);
                                }
                            ]
                        }
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'tpl/page_404.html'
                    })

                // fullCalendar
                .state('app.calendar', {
                    url: '/calendar',
                    templateUrl: 'tpl/app_calendar.html',
                    // use resolve to load other dependences
                    resolve: {
                        deps: ['$ocLazyLoad', 'uiLoad',
                            function($ocLazyLoad, uiLoad) {
                                return uiLoad.load(
                                    ['vendor/jquery/fullcalendar/fullcalendar.css',
                                        'vendor/jquery/fullcalendar/theme.css',
                                        'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                        'vendor/libs/moment.min.js',
                                        'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                        'js/app/calendar/calendar.js'
                                    ]
                                ).then(
                                    function() {
                                        return $ocLazyLoad.load('ui.calendar');
                                    }
                                )
                            }
                        ]
                    }
                })

                // mail
                .state('app.mail', {
                        abstract: true,
                        url: '/mail',
                        templateUrl: 'tpl/mail.html',
                        // use resolve to load other dependences
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/app/mail/mail.js',
                                        'js/app/mail/mail-service.js',
                                        'vendor/libs/moment.min.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.mail.list', {
                        url: '/inbox/{fold}',
                        templateUrl: 'tpl/mail.list.html'
                    })
                    .state('app.mail.detail', {
                        url: '/{mailId:[0-9]{1,4}}',
                        templateUrl: 'tpl/mail.detail.html'
                    })
                    .state('app.mail.compose', {
                        url: '/compose',
                        templateUrl: 'tpl/mail.new.html'
                    })

                //个人资料
                .state('app.account', {
                        url: '/account',
                        template: '<div ui-view class="fade-in-down"></div>'
                    })
                    .state('app.account.detail', { // 查看个人详细资料
                        url: '/detail',
                        templateUrl: 'tpl/account/account_dataCheck.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
									return $ocLazyLoad.load([
										'js/controllers/wqt_hyzx.js',
									    'vendor/jquery/qrcode/jquery.qrcode.js',
									    'vendor/jquery/qrcode/qrcode.js',
									    'vendor/jquery/qrcode/clipboard.min.js'
									]);
                                }
                            ]
                        }
                    })
                    .state('app.account.changepwd', { // 密码修改
                        url: '/changepwd',
                        templateUrl: 'tpl/account/account_passwordModification.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/wqt_hyzx.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.account.edit', { // 修改个人资料
                        url: '/edit',
                        templateUrl: 'tpl/account/account_dataModification.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/wqt_hyzx.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })

                .state('app.account.applysmrz', { // 实名认证
                        url: '/applysmrz',
                        templateUrl: 'tpl/account/account_smrz.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/wqt_hyzx.js']);
                                }
                            ]
                        }
                    })
                    .state('app.account.applybdsq', { // 报单申请
                        url: '/applybdsq',
                        templateUrl: 'tpl/account/account_bdsq.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/wqt_hyzx.js']);
                                }
                            ]
                        }
                    })

                .state('app.account_myTeam', { // 我的团队
                    url: '/account_myTeam',
                    templateUrl: 'tpl/account_myTeam.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                    function() {
                                        return $ocLazyLoad.load('js/controllers/tree.js');
                                    }
                                );
                            }
                        ]
                    }
                })

                //会员中心
                .state('app.member', {
                        url: '/member',
                        template: '<div ui-view></div>'
                    })
                    .state('app.member.userinfo', {
                        url: '/userinfo',
                        templateUrl: 'tpl/member_userinfo.html',

                    })

                //市场管理
                .state('app.scgl', {
                        url: '/scgl',
                        template: '<div ui-view></div>'
                    })
                    // 注册会员
                    .state('app.scgl.register', {
                        url: '/register',
                        template: '<div ui-view></div>'
                    })

                .state('app.scgl.register.index', {
                        url: '/index',
                        templateUrl: 'tpl/scgl/register/index.html',
                        resolve: {
                            deps: ['uiLoad', '$ocLazyLoad',
                                function(uiLoad, $ocLazyLoad) {
                                    return $ocLazyLoad.load(['ui.select', 'ngDialog']).then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/wqt_register.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //待激活会员
                    .state('app.scgl.activation', {
                        url: '/activation',
                        template: '<div ui-view></div>'
                    })
                    .state('app.scgl.activation.index', {
                        url: '/index',
                        templateUrl: 'tpl/scgl/activation/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/wqt_scgl.js');
                                        }
                                    );
                                }
                            ]
                        }

                    })
                    //会员升级
                    .state('app.scgl.changelevel', {
                        url: '/changelevel',
                        template: '<div ui-view></div>'
                    })
                    .state('app.scgl.changelevel.index', { // 会员升级
                        url: '/index',
                        templateUrl: 'tpl/scgl/changelevel/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/wqt_scgl.js');
                                        }
                                    );
                                }
                            ]
                        }
                }
            )
            //我的直推
            .state('app.scgl.directpush', {	
                url: '/directpush',
                template: '<div ui-view></div>'
            })
            .state('app.scgl.directpush.index', {
                url: '/index',
                templateUrl: 'tpl/scgl/directpush/index.html',
				resolve: {
					deps: ['uiLoad', '$ocLazyLoad',
						function (uiLoad, $ocLazyLoad) {
							return $ocLazyLoad.load(['ui.select', 'ngDialog']).then(
								function () {
                                    return $ocLazyLoad.load(
                                        [
                                            'js/controllers/wqt_scgl.js'
                                          

                                        ]
                                    );
								}
							);
						}
					]
				}
            })

                //网络管理
                .state('app.wlgl', {
                        url: '/wlgl',
                        template: '<div ui-view></div>'
                    })
                    //推荐网络图
                    .state('app.wlgl.tjwlt', {
                        url: '/tjwlt',
                        template: '<div ui-view></div>'
                    })
                    .state('app.wlgl.tjwlt.index', {
                        url: '/index',
                        templateUrl: 'tpl/wlgl/tjwlt/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function() {
                                            return $ocLazyLoad.load(
                                                'js/controllers/wqt_network.js'
                                            );
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //推荐树状图
                    .state('app.wlgl.tjszt', {
                        url: '/tjszt',
                        template: '<div ui-view></div>'
                    })
                    .state('app.wlgl.tjszt.index', {
                        url: '/index',
                        templateUrl: 'tpl/wlgl/tjszt/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function() {
                                            return $ocLazyLoad.load(
                                                'js/controllers/wqt_network.js'
                                            );
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //安置网络图
                    .state('app.wlgl.azwlt', {
                        url: '/azwlt',
                        template: '<div ui-view></div>'
                    })
                    .state('app.wlgl.azwlt.index', {
                        url: '/index',
                        templateUrl: 'tpl/wlgl/azwlt/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        [
                                            'js/controllers/wqt_network.js'

                                        ]
                                    );
                                }
                            ]
                        }
                    })

                //安置树状图
                .state('app.wlgl.azszt', {
                        url: '/azszt',
                        template: '<div ui-view></div>'
                    })
                    .state('app.wlgl.azszt.index', {
                        url: '/index',
                        templateUrl: 'tpl/wlgl/azszt/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                        function() {
                                            return $ocLazyLoad.load(
                                                'js/controllers/wqt_network.js'

                                            );
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //会员投资
                    .state('app.invest_calculator', { // 计算器
                        url: '/invest_calculator',
                        templateUrl: 'tpl/invest_calculator.html'
                    })
                    .state('app.invest_withdraw', { // 撤回本金
                        url: '/invest_withdraw',
                        templateUrl: 'tpl/invest_withdraw.html'
                    })
                    .state('app.invest_scale', { // 更改复合比例
                        url: '/invest_scale',
                        templateUrl: 'tpl/invest_scale.html'
                    })



                //财务管理
                .state('app.finance_report', { // 奖金报表
                        url: '/finance_report',
                        templateUrl: 'tpl/finance_report.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        [
                                            'js/controllers/finance_report.js',
                                            'vendor/jquery/spin/spin.min.js',
                                        ]
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.finance_bonus', { // 奖金明细
                        url: '/finance_bonus',
                        templateUrl: 'tpl/finance_bonus.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        [
                                            'js/controllers/finance_bonus.js',
                                            'vendor/jquery/spin/spin.min.js',
                                        ]
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.finance_ledger', { // 财务明细
                        url: '/finance_ledger',
                        templateUrl: 'tpl/finance_ledger.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/finance_ledger.js']
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.finance_insidePay', { // 汇款充值(内)
                        url: '/finance_insidePay',
                        templateUrl: 'tpl/finance_insidePay.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/finance_insidePay.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })

                .state('app.finance_deposit', { // 汇款充值
                    url: '/finance_deposit',
                    templateUrl: 'tpl/finance_deposit.html'
                })


                .state('app.finance_exchange', { // 货币兑换
                    url: '/finance_exchange',
                    templateUrl: 'tpl/finance_exchange.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('ngDialog').then(
                                    function() {
                                        return $ocLazyLoad.load('js/controllers/finance_exchange.js');
                                    }
                                );
                            }
                        ]
                    }
                })

                .state('app.finance_transfer', { // 转账功能
                        url: '/finance_transfer',
                        templateUrl: 'tpl/finance_transfer.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/finance_transfer.js']
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.finance_withdraw', { // 提现功能
                        url: '/finance_withdraw',
                        templateUrl: 'tpl/finance_withdraw.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load([
                                                'js/controllers/finance_withdraw.js',
                                                'tpl/ui_bootstrap.html'
                                            ]);
                                        }
                                    );
                                }
                            ]
                        }
                    })



                // 积分推广
                .state('app.integral_generalize', { //推广
                        url: '/integral_generaliz',
                        templateUrl: 'tpl/integral_generaliz.html'
                    })
                    .state('app.integral_withdrawals', { //推广
                        url: '/integral_withdrawals',
                        templateUrl: 'tpl/integral_withdrawals.html'
                    })

                //交易管理
                .state('app.transaction_jydt', { //积分股--交易大厅
                        url: '/transaction_jydt',
                        templateUrl: 'tpl/transaction/jfg/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load([
                                                'vendor/libs/echarts.min.js',
                                                'js/controllers/transaction/jfg/index.js'
                                            ]);
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //.state('app.transaction_jfgjylb', { //积分股--交易列表
                    //	url: '/transaction_jfgjylb',
                    //	templateUrl: 'tpl/transaction_jfgjylb.html',
                    //resolve: {
                    //	deps: ['$ocLazyLoad',
                    //		function ($ocLazyLoad) {
                    //			return $ocLazyLoad.load('ngDialog').then(
                    //				function () {
                    //					return $ocLazyLoad.load('js/controllers/transaction/jfgjylb.js');
                    //				}
                    //			);
                    //		}
                    //	]
                    //	}
                    //	})
                    .state('app.transaction_jfggmxq', { //积分股--购买详情
                        url: '/transaction_jfggmxq',
                        templateUrl: 'tpl/transaction/jfg/gmxq.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/transaction/jfg/gmxq.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.transaction_jfgcsxq', { //积分股--出售记录
                        url: '/transaction_jfgcsxq',
                        templateUrl: 'tpl/transaction/jfg/csxq.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/transaction/jfg/csxq.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                          .state('app.transaction_jfgcsjl', { //积分股--出售详情
                              url: '/transaction_jfgcsjl',
                              templateUrl: 'tpl/transaction/jfg/csjl.html',
                              params: { id: {} },
                              resolve: {
                                  deps: ['$ocLazyLoad',
                                      function ($ocLazyLoad) {
                                          return $ocLazyLoad.load('ngDialog').then(
                                              function () {
                                                  return $ocLazyLoad.load('js/controllers/transaction/jfg/csjl.js');
                                              }
                                          );
                                      }
                                  ]
                              }
                          })

                .state('app.transaction_jfggmjl', { //积分股--购买记录
                    url: '/transaction_jfggmjl',
                    templateUrl: 'tpl/transaction/jfg/gmjl.html',
                    params: { id: {} },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('ngDialog').then(
                                    function() {
                                        return $ocLazyLoad.load('js/controllers/transaction/jfg/gmjl.js');
                                    }
                                );
                            }
                        ]
                    }
                })

                .state('app.transaction_jyjfdt', { //交易积分--交易大厅
                        url: '/transaction_jyjfdt',
                        templateUrl: 'tpl/transaction/jyjf/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/transaction/jyjf/index.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.transaction_jyjf_gmjl', { //交易积分--购买记录
                        url: '/transaction_jyjf_gmjl',
                        templateUrl: 'tpl/transaction/jyjf/gmjl.html',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/transaction/jyjf/gmjl.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.transaction_jyjf_csjl', { //交易积分--出售记录
                        url: '/transaction_jyjf_csjl',
                        templateUrl: 'tpl/transaction/jyjf/csjl.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/transaction/jyjf/csjl.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.transaction_jyjf_csjl_money', { //交易积分--查看出售记录
                        url: '/transaction_jyjf_csjl_money',
                        templateUrl: 'tpl/transaction/jyjf/csjl_money.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/transaction/jyjf/csjl_money.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //在线购物 入驻商家

                // .state('app.mall', {
                //     url: '/mall',
                //     template: '<div ui-view class="fade-in-up"></div>'
                // })
                // .state('app.mall.sjrz', {
                //     url: '/sjrz',
                //     template: '<div ui-view class="fade-in-up"></div>'
                // })
                // .state('app.mall.sjrz.index', {
                //     url: '/index',
                //     templateUrl: 'tpl/mall/sjrz/index.html',
                //     resolve: {
                //         deps: ['uiLoad',
                //             function (uiLoad) {
                //                 return uiLoad.load(
                //                     ['js/controllers/wqt_shopping.js']
                //                 );
                //             }
                //         ]
                //     }

                // })

                //新闻公告
                .state('app.news', {
                        url: '/news',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.news.notice', {
                        url: '/notice',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.news.notice.index', {
                        url: '/index',
                        templateUrl: 'tpl/news/notice/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_news.js']
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.news.notice.newsDetail', { //新闻子页面
                        url: '/newsDetail',
                        templateUrl: 'tpl/news/notice/newsDetail.html',
                        params: { id: {} },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_news.js']
                                    );
                                }
                            ]
                        }
                    })
                    //我要留言
                    .state('app.message', {
                        url: '/message',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.message.form', {
                        url: '/form',
                        templateUrl: 'tpl/news/message/form.html',
                        resolve: {
                            deps: ['uiLoad', '$ocLazyLoad',
                                function (uiLoad, $ocLazyLoad) {
                                    return $ocLazyLoad.load('ui.select').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/wqt_news.js');
                                        }
                                    );
                                }
                            ]
                        }
                       
                    })
                    //我的留言
                    .state('app.message.index', {
                        url: '/index',
                        templateUrl: 'tpl/news/message/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_news.js']
                                    );
                                }
                            ]
                        }
                    })
                    //查看留言
                    .state('app.message.newsCheckMessage', {
                        url: '/newsCheckMessage',
                        templateUrl: 'tpl/news/message/newsCheckMessage.html',
                        params: { id: {} },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_news.js']
                                    );
                                }
                            ]
                        }
                    })
                    //查看未读留言
                    .state('app.message.newsCheckUnreadMessage', {
                        url: '/newsCheckUnreadMessage',
                        templateUrl: 'tpl/news/message/newsCheckUnreadMessage.html',
                        params: { id: {} },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_news.js']
                                    );
                                }
                            ]
                        }
                    })
                    // 安全设置
                    .state('app.safety_user', { //账户安全
                        url: '/safety',
                        templateUrl: 'tpl/safety_user.html'
                    })
                    .state('app.safety_back', { //请求回叫
                        url: '/safety_back',
                        templateUrl: 'tpl/safety_back.html'
                    })
                    .state('app.safety_pass', { //请求回叫
                        url: '/safety_pass',
                        templateUrl: 'tpl/safety_pass.html'
                    })
                    // 资料下载
                    .state('app.data_download', {
                        url: '/data_download',
                        templateUrl: 'tpl/data_download.html'
                    })
                    .state('app.ui.bootstrap', {
                        url: '/bootstrap',
                        templateUrl: 'tpl/ui_bootstrap.html'
                    })


                //商城
                .state('shop', {
                        url: '/shop',
                        template: '<div ui-view  class="fade-in-right-big smooth shop_content"></div>'
                    })
                    .state('shop.index', {
                        url: '/index',
                        templateUrl: './tpl/shop/sjrz/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(['js/controllers/wqt_shopping.js']);
                                }
                            ]
                        }

                    })

                //在线购物 购物车
                .state('app.mall', {
                        url: '/mall',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    //在线购物 购物广场
                    .state('app.mall.gwgc', {
                        url: '/gwgc',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mall.gwgc.index', {
                        url: '/index',
                        templateUrl: 'tpl/shop/shoppinghall/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
                    //入驻商家
                    .state('app.mall.sjrz', {
                        url: '/sjrz',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mall.sjrz.index', { //#/app/mall/sjrz/index
                        url: '/index',
                        templateUrl: 'tpl/mall/sjrz/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/wqt_shopping_sjrz.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //商家供货
                    .state('app.mall.sjgh', {
                        url: '/sjgh',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mall.sjgh.index', {
                        url: '/index',
                        templateUrl: 'tpl/shop/sjgh/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngDialog').then(
                                        function() {
                                            return $ocLazyLoad.load('js/controllers/wqt_shopping_sjgh.js');
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    //商品详情
                    //.state('app.mall.gwgc.shoppingDetail', {
                    //    url: '/shoppingDetail',
                    //    params: { id: {} },
                    //    templateUrl: './tpl/shop/sjrz/shopping_detail.html',
                    //    resolve: {
                    //        deps: ['uiLoad',
                    //            function(uiLoad) {
                    //                return uiLoad.load(
                    //                    ['js/controllers/wqt_shopping.js']
                    //                );
                    //            }
                    //        ]
                    //    }

                    //})
                    .state('app.mall.gwgc.shoppingDetail', {
                        url: '/shoppingDetail',
                        params: { id: {} },
                        templateUrl: './tpl/shop/sjrz/detail.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
                    //添加购物车成功
                    .state('app.mall.gwgc.shoppingSuccess', {
                        url: '/shoppingSuccess',
                        templateUrl: './tpl/shop/sjrz/shopping_success.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
                    //在线购物 购物车

                .state('app.mall.shopcar', {
                        url: '/shopcar',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mall.shopcar.index', {
                        url: '/index',
                        templateUrl: 'tpl/shop/shopcar/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
                    //购物详情
                    .state('app.mall.shopcar.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/shop/shopcar/shopping_ahoppingDetail.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
                    //在线购物 我的订单
                    .state('app.mall.order', {
                        url: '/order',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mall.order.index', {
                        url: '/index',
                        templateUrl: 'tpl/shop/order/index.html',
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
                    //订单详情

                //在线购物 收货地址
                .state('app.mall.address', {
                        url: '/address',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.mall.address.index', {
                        url: '/index',
                        templateUrl: 'tpl/shop/address/index.html',
                        params: { returnUrl: {} },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
                    //收货地址列表编辑
                    .state('app.mall.address.editAddress', {
                        url: '/editAddress',
                        templateUrl: 'tpl/shop/address/shopping_editAddress.html',
                        params: { AddId: {} },
                        resolve: {
                            deps: ['uiLoad',
                                function(uiLoad) {
                                    return uiLoad.load(
                                        ['js/controllers/wqt_shopping.js']
                                    );
                                }
                            ]
                        }

                    })
            }
        ]
    );