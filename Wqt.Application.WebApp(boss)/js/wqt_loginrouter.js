'use strict';

/**
 * Config for the router
 */
angular.module('login')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
    )   
    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/');
            $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: 'tpl/login/signin.html',
                })
                .state('findByEmail', {
                    url: '/findByEmail',
                    templateUrl: 'tpl/login/findByEmail.html',
                    
                })
                .state('findByMiBao', {
                    url: '/findByMiBao',
                    templateUrl: 'tpl/login/findByMiBao.html',
                    
                })
        }] )