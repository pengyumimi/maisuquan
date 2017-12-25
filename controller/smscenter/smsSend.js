/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder){

    //时间控件初始化
    $('#reservation').daterangepicker({
        "singleDatePicker": true,
        "autoApply": true,
        "timePicker": true, //是否显示小时和分钟
        "timePickerSeconds" : true,//是否显示秒
        "timePicker24Hour": true,
        "linkedCalendars": false,
        "autoUpdateInput": true,
        "locale" : {
            format: "YYYY/MM/DD HH:mm:ss" //控件中from和to 显示的日期格式
        }
    }, function(start, end) {
        var time_start=start.format('YYYY/MM/DD HH:mm:ss');//带时间的
        // var time_start=start.format('YYYY/MM/DD');
        var time_label = time_start;
        $('#reservation').val(time_label);
    });

    // 编辑短信
    var maxTags = 70;
    $scope.smscont = "";

    /*$scope.$watch('smscont', function (value) {
        $scope.smscontnum = $scope.smscont.length;
        if ($scope.smscont.length < (maxTags + 1)) {
            $scope.placeholder = '可输入 ' + (maxTags - $scope.smscont.length) + ' 个关键词';

        } else {
            $scope.smscont = disabled;
            $scope.placeholder = '不可以继续添加';
            $scope.smscont = $scope.smscont.substr(0, 5);
            /!*$scope.valid = false;
            $scope.tags.splice($scope.tags.length - 1, 1);*!/
        }
    });*/
    $scope.checkText = function () {
        $scope.smscontnum = $scope.smscont.length;
        if ($scope.smscont.length > maxTags) {
            $scope.placeholder = '不可以继续添加';
            $scope.smscont = $scope.smscont.substr(0, maxTags);
            $scope.smscontnum = $scope.smscont.length;
        }else{
            $scope.placeholder = '';
        }
    };

    $scope.isActive = true;//tab切换默认值
    $scope.sendTime = function (type) {
        $scope.sendType = '';
        if(type == 1){
            $scope.sendType = 1;
        }else if(type == 2){
            $scope.sendType = $('#reservation').val();
        }
        console.log($scope.sendType);
    }

}]);