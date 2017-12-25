var appModule = angular.module('scotchApp',['ui.router']);//定义路由，注入ui.router依赖

appModule.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('home');
        //这一段我想做单独加载js文件来着，没跑通呢还
        appModule.resolveScriptDeps = function(dependencies){
            return function($q,$rootScope){
                var deferred = $q.defer();
                $script(dependencies, function() {
                    // all dependencies have now been loaded by $script.js so resolve the promise
                    $rootScope.$apply(function()
                    {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        };
        //end
        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl:'pages/smsSend.html',

            })
            .state('morris',{
                url:'/morris',
                templateUrl:'pages/widgets.html',
                // resolve: {
                //     deps: appModule.resolveScriptDeps([
                //         'js/vendor/wi_echartstheme.js'
                //     ])
                // }
            })
            .state('flot',{
                url:'/flot',
                templateUrl:'pages/charts/flot.html'
            })
            .state('inline',{
                url:'/inline',
                templateUrl:'pages/charts/inline.html'
            })
    });
appModule.controller('mainController',function(){});