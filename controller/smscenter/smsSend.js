/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder){

    $scope.submitBtn = true;//默认不可以提交的状态
    var flag1 = 0; //编辑短信验证
    var flag2 = 0; //录入手机号码验证
    //时间控件初始化
    $('#date_picker').daterangepicker({
        "singleDatePicker": true,
        "autoApply": true,
        "timePicker": true, //是否显示小时和分钟
        "timePickerSeconds" : true,//是否显示秒
        "timePicker24Hour": true,
        "linkedCalendars": false,
        "autoUpdateInput": true,
        "locale" : {
            format: "YYYY-MM-DD HH:mm:ss" //控件中from和to 显示的日期格式
        }
    }, function(start, end) {
        var time_start=start.format('YYYY-MM-DD HH:mm:ss');//带时间的
        // var time_start=start.format('YYYY/MM/DD');
        var time_label = time_start;
        $('#date_picker').val(time_label);
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
            $("input[name='sendtype']").val("1");
        }else if(type == 2){
            $scope.sendType = $('#reservation').val();
            $("input[name='sendtype']").val("2");
        }
        console.log($scope.sendType);
    }

    //录入手机号码
    $scope.phoneCont = "";
    $scope.upFile = "";
    var keywordsarr = [];

    //导入手机号
    $scope.checkFile = function () {
        $scope.upsave();
        $("input[name='type']").val("1");
    }
    /**
     * 文件上传(做文件校验使用)
     */
    $scope.upsave = function() {
        var fd = new FormData();
        var obj = document.querySelector('input[type=file]');
        var file = obj.files[0];
        $scope.$apply(function() {
            $scope.writerPhone = false;
        });
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
        $("input[name='type']").val("2");

        if($scope.phoneCont.length <= 0){
            $scope.disabledFile = false;
            flag2 = 0;
            $scope.localData();
        }else{
            keywordsarr = $scope.phoneCont.split(/[,， ]/);
            console.log(keywordsarr);
            flag2 = 1;
            $scope.localData();
        }
    };

    $scope.localData = function (v) {
        /*console.log($scope.smscont);
        console.log(flag1);
        console.log(flag2);*/
        if(flag1 && flag2){
            $scope.submitBtn = false;//改为可以提交状态
        }else{
            $scope.submitBtn = true;//改为不可以提交状态
        }
    };

    $("#btnButton").click(function () {
        $(".divNo").show();//提交前显示 loading
        $scope.submitBtn = true;//提交前改为不可以提交状态
        //提交form表单
        $("#ajaxForm").ajaxSubmit(function (responseText, statusText) {
            console.log('状态: ' + statusText + '\n 返回的内容是: \n' + responseText);
            $('.tip').html("提交成功").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");
            $(".divNo").hide();//提交完毕返回成功后隐藏 loading
            //提交成功后刷新数据,清空input file 和 输入的手机号
            $scope.$apply(function() {
                document.querySelector('input[type=file]').value = "";
                $scope.checkText = "";
                $scope.writerPhone = false;
                flag2 = 0;
                $scope.localData();
            });
            // $scope.submitBtn = false;//改为可以提交状态
        });
        return false;
    });

    //提交事件 ajax提交,暂时不用
    /*$scope.submitForm = function (v) {
        var file = "";
        var obj = document.querySelector('input[type=file]');
        file = obj.files[0];
        console.log(file);
        var postData = {
            "content" : $scope.smscont,
            "type" : 2,
            "file" : "",
            "mobileList" : $scope.phoneCont,
            "account" : $scope.selectAccountNumber,
            "sendtype" : 1
        };
        console.log(postData);
        /!*var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        fd.append('logo', file);*!/
        $http({
            method:'POST',
            url:"http://sendsms.frp.lingdonge.com:8080/api/v1/uploadSms",
            data: postData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        }).success( function (res) {
            //上传成功的操作
            console.log(res);
            alert("uplaod success");
        });

    }*/

}]);