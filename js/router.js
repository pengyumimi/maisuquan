
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
        .state('bi_page2',{
            url:'/bi_page2',
            templateUrl:'pages/smscenter/bi_page2.html',
        })
        .state('bi_page3',{
            url:'/bi_page3',
            templateUrl:'pages/smscenter/bi_page3.html',
        })
        .state('bi_page4',{
            url:'/bi_page4',
            templateUrl:'pages/smscenter/bi_page4.html',
        })
        .state('bi_page5seo',{
            url:'/bi_page5seo',
            templateUrl:'pages/smscenter/bi_page5seo.html',
        })
        .state('bi_page5orm',{
            url:'/bi_page5orm',
            templateUrl:'pages/smscenter/bi_page5orm.html',
        })
        .state('bi_page6',{
            url:'/bi_page6',
            templateUrl:'pages/smscenter/bi_page6.html',
        })
        .state('addhy',{
            url:'/addhy',
            templateUrl:'pages/modal/bi_ktzh.html',
        })
        .state('seoaddxm',{
            url:'/seoaddxm',
            templateUrl:'pages/smscenter/seoaddxm.html',
        })
        .state('bi_page7',{
            url:'/bi_page7',
            templateUrl:'pages/smscenter/bi_page7.html',
        })
        .state('bi_page8',{
            url:'/bi_page8',
            templateUrl:'pages/smscenter/bi_page8.html',
        })
        .state('bi_page9',{
            url:'/bi_page9',
            templateUrl:'pages/smscenter/bi_page9.html',
        })
        .state('bi_page10',{
            url:'/bi_page10',
            templateUrl:'pages/smscenter/bi_page10.html',
        })
        .state('bi_page11',{
            url:'/bi_page11',
            templateUrl:'pages/smscenter/bi_page11.html',
        })
        .state('bi_page12',{
            url:'/bi_page12',
            templateUrl:'pages/smscenter/bi_page12.html',
        })
}]);