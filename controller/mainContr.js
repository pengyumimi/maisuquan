/**
 * Created by hero on 2017/12/24 0024.
 */
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