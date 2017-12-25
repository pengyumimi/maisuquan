/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder){

    $scope.submitBtn = true;//默认不提交
    var flag1 = 0;
    var flag2 = 0;
    var flag3 = 0;
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
    $scope.checkText = function () {
        $scope.smscontnum = $scope.smscont.length;
        if ($scope.smscont.length > maxTags) {
            $scope.placeholder = '不可以继续添加';
            $scope.smscont = $scope.smscont.substr(0, maxTags);
            $scope.smscontnum = $scope.smscont.length;
        }else if($scope.smscont.length <= 0){
            flag1 = 0;
            $scope.localData();
        }else{
            $scope.placeholder = '';
            flag1 = 1;
            $scope.localData();
        }
    };

    //选择账号
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

    //录入手机号码
    $scope.phoneCont = "";
    $scope.upFile = "";
    var keywordsarr = $scope.phoneCont.split(/[,， ]/);
    //导入手机号
    $scope.checkFile = function () {
        $scope.upsave();
    }
    /**
     * 文件上传(做文件校验使用)
     */
    $scope.upsave = function() {
        var fd = new FormData();
        var obj = document.querySelector('input[type=file]')
        var file = obj.files[0];
        $scope.$apply(function() {
            $scope.writerPhone = false;
        })
        if(file){
            console.log(file);
            var filename = file.name;
            if (filename.length > 1 && filename) {
                var ldot = filename.lastIndexOf(".");
                var type = filename.substring(ldot + 1);
                if (type != "txt" && type != "xls" && type != "xlsx") {
                    //验证未通过-清除当前所选文件
                    $('.tip').html("上传文件类型不正确").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");

                    $scope.$apply(function() {
                        obj.outerHTML=obj.outerHTML;
                        $scope.writerPhone = false;
                        flag2 = 0;
                        $scope.localData();
                    });

                } else {
                    // 验证通过
                    $scope.$apply(function() {
                        $scope.writerPhone = true;
                        flag2 = 1;
                        $scope.localData();
                    })

                }
            }
        }
    };
    //手动录入手机号
    $scope.checkPhone = function (v) {
        $scope.disabledFile = true;
        console.log($scope.disabledFile);
        if($scope.phoneCont.length <= 0){
            $scope.disabledFile = false;
            flag2 = 0;
            $scope.localData();
        }else{
            flag2 = 1;
            $scope.localData();
        }
    }

    $scope.localData = function (v) {
        console.log($scope.smscont);
        console.log(flag1);
        console.log(flag2);
        if(flag1 && flag2){
            $scope.submitBtn = false;//改为可以提交状态
        }else{
            $scope.submitBtn = true;//改为不可以提交状态
        }
    }

}]);