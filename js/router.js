
// 页面路由
appModule.config(['$stateProvider','$urlRouterProvider','$controllerProvider','$compileProvider','$filterProvider','$provide',"$httpProvider",function($stateProvider, $urlRouterProvider,$controllerProvider,$compileProvider,$filterProvider,$provide,$httpProvider){
    appModule.controller = $controllerProvider.register;
    appModule.directive  = $compileProvider.directive;
    appModule.filter     = $filterProvider.register;
    appModule.factory    = $provide.factory;
    appModule.service    = $provide.service;
    appModule.constant   = $provide.constant;
    appModule.value      = $provide.value;
    $urlRouterProvider.otherwise('smsSend');
    $httpProvider.interceptors.push('interceptors');//控制器loading
    //end
    $stateProvider
        .state('smsSend',{
            url:'/smsSend',
            templateUrl:'pages/smscenter/smsSend.html',
            resolve: {
                deps: ['uiLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['controller/smscenter/smsSend.js?ver=' + new Date().getTime()]);
                    }]
            }
        })
        .state('smsSendPici',{
            url:'/smsSendPici',
            templateUrl:'pages/smscenter/smsSendPici.html',
            resolve: {
                deps: ['uiLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['controller/smscenter/smsSendPici.js?ver=' + new Date().getTime()]);
                    }]
            }
        })
        .state('smsSendList',{
            url:'/smsSendList',
            templateUrl:'pages/smscenter/smsSendList.html',
            resolve: {
                deps: ['uiLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['controller/smscenter/smsSendList.js?ver=' + new Date().getTime()]);
                    }]
            }
        })
        .state('smsSendCount',{
            url:'/smsSendCount',
            templateUrl:'pages/smscenter/smsSendCount.html',
            resolve: {
                deps: ['uiLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['controller/smscenter/smsSendCount.js?ver=' + new Date().getTime()]);
                    }]
            }
        })
}]);