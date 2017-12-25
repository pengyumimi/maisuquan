var appModule = angular.module('scotchApp',['ui.router','datatables','ui.load','ui.bootstrap']);//定义路由，注入ui.router依赖
appModule.factory("interceptors", [function () {
    return {
        'request': function (request) {
            if (request.beforeSend)
                request.beforeSend();
            return request;
        },
        'response': function (response) {
            if (response.config.complete)
                response.config.complete(response);
            return response;
        }
    };
}]);
var maxTags = 300;//设置最多可以输入的关键词

appModule.controller('mainController',['$scope','$http',function($scope,$http){
    $scope.visible = false;
    //一键开通账号模态框
    $scope.yjktzh = function($event) {
        getid($event);//设置模态框
        return $event;
    };
    //开通账号模态框
    $scope.ktzh = function($event) {
        getid($event);
        return $event;
    };
    //删除单个模态框
    $scope.del = function($event) {
        getid($event);
        return $event;
    };
    //删除多个模态框
    $scope.delAll = function($event) {
        getid($event);
        return $event;
    };
    //添加动态接口


    //新增会员模态框
    $scope.addhy = function($event) {
        getid($event);
        return $event;
    };
    //编辑模态框
    $scope.edithy = function($event) {
        getid($event);
        return $event;
    };
    //批量修改套餐模态框
    $scope.modal_xgtc = function($event) {
        getid($event);
        return $event;
    };
    //设置模态框窗口工厂
//    function getid(_this){
//        console.log(_this);
//        var modalval = $(_this.target).attr("data-target");
//        var modalid = modalval.replace("#","");
//        scmodalbox(modalid);//设置模态框窗口
//    };
    //设置模态框窗口工厂,非直接点击的，包含直接子元素点击
    function getid(_this){
        var modalval_a = $(_this.target).attr("data-target");
        var modalval = $(_this.target).parent().attr("data-target");
        //console.log(_this.target);
        if(modalval_a){
            var modalid = modalval_a.replace("#","");
            scmodalbox(modalid);//设置模态框窗口
        }else if(modalval){
            var modalid = modalval.replace("#","");
            scmodalbox(modalid);//设置模态框窗口
        }
    };
    function scmodalbox(_id){
        $(".modalbox").append('<div class="modal fade" id="'+_id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
        //alert(123);
    };

}]);



//seo 创建项目
appModule.controller('seoaddController',['$scope','$http','$uibModal','$log',function($scope, $http, $uibModal, $log){
    $scope.items = ['item1', 'item2', 'item3'];
    //添加关键词按钮
    $scope.projects_addgjc = function(size) {
        //这里很关键,是打开模态框的过程
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,//打开时的动画开关
            templateUrl: 'pages/modal/projects_addgjc.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
            controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
            size: size,//模态框的大小尺寸
            resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                items: function () {//items是一个回调函数
                    return $scope.items;//这个值会被模态框的控制器获取到
                }
            }
        });
        //接收模态框返回值
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;//模态框的返回值
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //删除关键字
    $scope.projects_delgjc = function (size) {
        var inputs = $("#keywordslist input[name=keywordcheckbox]");
        var len = $("#keywordslist input[name=keywordcheckbox]:checked").length;
        var checkid = 1;
        $scope.len = {
            "len":len,
            "id": checkid,
        };
        if(len==0){
            $('.tip').html("请选择需要删除的项目").stop(true,false).fadeIn(0).delay(1000).fadeOut("slow");
        }else{
            //这里很关键,是打开模态框的过程
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,//打开时的动画开关
                templateUrl: 'pages/modal/projects_delgjc.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                size: size,//模态框的大小尺寸
                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    items: function () {//items是一个回调函数
                        return $scope.len;//这个值会被模态框的控制器获取到
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
                $scope.selected = selectedItem;//模态框的返回值
                del_list(selectedItem);//删除操作
                function del_list(obj){
                    $(obj).parents(".row").remove();
                };
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    };

    //设置分类按钮
    $scope.projects_setfl = function(size) {
        //弹出模态框
        $scope.len = {
            "len":1,
            "id": 2
        };
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,//打开时的动画开关
            templateUrl: 'pages/modal/projects_setfl.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
            controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
            size: size,//模态框的大小尺寸
            resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                items: function () {//items是一个回调函数
                    return $scope.len;//这个值会被模态框的控制器获取到
                },
            }
        });
        modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
            $scope.selected = selectedItem;//模态框的返回值
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //设置频道按钮
    $scope.projects_setpd = function(size) {
        //弹出模态框
        $scope.len = {
            "len":1,
            "id": 2,
        };
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,//打开时的动画开关
            templateUrl: 'pages/modal/projects_setpd.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
            controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
            size: size,//模态框的大小尺寸
            resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                items: function () {//items是一个回调函数
                    return $scope.len;//这个值会被模态框的控制器获取到
                },
            }
        });
        modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
            $scope.selected = selectedItem;//模态框的返回值
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //管理分类按钮
    $scope.projects_glfl = function(size) {
        //弹出模态框
        $scope.len = {
            "len":1,
            "id": 2,
        };
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,//打开时的动画开关
            templateUrl: 'pages/modal/projects_glfl.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
            controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
            size: size,//模态框的大小尺寸
            resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                items: function () {//items是一个回调函数
                    return $scope.len;//这个值会被模态框的控制器获取到
                },
            }
        });
        modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
            $scope.selected = selectedItem;//模态框的返回值
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //保存关键词信息
    $scope.save_addgjc = function($event) {
        alert(222);
        return $event;
    };


}]);

appModule.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
    $scope.items = items;//这里就可以去外层主控制器的数据了

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
        $uibModalInstance.dismiss('cancel');
    };
});

appModule.controller('addgjcmodalController',['$scope','$http','$uibModal', '$log','$timeout',function($scope, $http, $uibModal, $log, $timeout){
    //ngTagsInput
    $scope.tags = [];

    $scope.tagsall = maxTags;
    $scope.num = 0;
    $scope.$watch('tags.length', function(value) {
        $scope.num = value;
        if (value < maxTags){
            $scope.placeholder = '可输入 ' + (maxTags - value) + ' 个关键词';
        }else{
            $scope.placeholder = '不可以继续添加';
            $scope.valid = false;
        }
    });
    $scope.tagAdded = function(tag) {
        //alert("新增");
    };
    $scope.tagRemoved = function(tag) {
        //alert("删除");
    };
    //ngTagsInput end

}]);

appModule.controller('page7Controller',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http,DTOptionsBuilder, DTColumnDefBuilder){

    var url2="ajax/test7.json";
    var vm = this;
    $http.get(url2).success( function(response){
        console.log(response);
        datalist(response);
    });
    //datalist(testdata);

    function datalist(data){
        //console.log(typeof (data));
        vm.order = data;
        // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        // vm.dtColumnDefs = [
        //     DTColumnDefBuilder.newColumnDef(0),
        //     DTColumnDefBuilder.newColumnDef(1),
        //     DTColumnDefBuilder.newColumnDef(2),
        //     DTColumnDefBuilder.newColumnDef(3).notSortable()
        // ];
    };
}]);

appModule.controller('page8Controller',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http,DTOptionsBuilder, DTColumnDefBuilder){

    var url2="ajax/test7.json";
    var vm = this;
    $http.get(url2).success( function(response){
        console.log(response);
        datalist(response);
    });
    //datalist(testdata);

    function datalist(data){
        //console.log(typeof (data));
        vm.order = data;
        // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        // vm.dtColumnDefs = [
        //     DTColumnDefBuilder.newColumnDef(0),
        //     DTColumnDefBuilder.newColumnDef(1),
        //     DTColumnDefBuilder.newColumnDef(2),
        //     DTColumnDefBuilder.newColumnDef(3).notSortable()
        // ];
    };
}]);

appModule.controller('page11Controller',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http,DTOptionsBuilder, DTColumnDefBuilder){

    var url2="ajax/test11.json";
    var vm = this;
    $http.get(url2).success( function(response){
        console.log(response);
        datalist(response);
    });
    //datalist(testdata);

    function datalist(data){
        //console.log(typeof (data));
        vm.order = data;
        // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        // vm.dtColumnDefs = [
        //     DTColumnDefBuilder.newColumnDef(0),
        //     DTColumnDefBuilder.newColumnDef(1),
        //     DTColumnDefBuilder.newColumnDef(2),
        //     DTColumnDefBuilder.newColumnDef(3).notSortable()
        // ];
    };
}]);

appModule.controller('page12Controller',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http,DTOptionsBuilder, DTColumnDefBuilder){

    var url2="ajax/test12.json";
    var vm = this;
    $http.get(url2).success( function(response){
        console.log(response);
        datalist(response);
    });
    //datalist(testdata);

    function datalist(data){
        //console.log(typeof (data));
        vm.order = data;
        // vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        // vm.dtColumnDefs = [
        //     DTColumnDefBuilder.newColumnDef(0),
        //     DTColumnDefBuilder.newColumnDef(1),
        //     DTColumnDefBuilder.newColumnDef(2),
        //     DTColumnDefBuilder.newColumnDef(3).notSortable()
        // ];
    };
}]);


//选择列表全选、全不选
function checkall() {
    //绑定多选框checked事件（监听选中的）
    $('input[name=keywordcheckbox_all]').on('ifChecked', function(){
        var checkallbtn = $(this).attr('data-checkall');
        $("input[data-check="+checkallbtn+"]").iCheck('check');
    });
    //绑定多选框ifUnchecked事件(监听取消选中的事件)
    $('input[name=keywordcheckbox_all]').on('ifUnchecked', function(){
        var checkallbtn = $(this).attr('data-checkall');
        $("input[data-check="+checkallbtn+"]").iCheck('uncheck');
    });
}