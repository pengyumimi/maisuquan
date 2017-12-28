/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendCountCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder', 'apiService',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder, apiService){

    var timeTable = {};
    //时间控件初始化
    $('#date_picker').daterangepicker({
        //"singleDatePicker": true,
        // "autoApply": true,
        "timePicker": false,
        "timePicker24Hour": false,
        "linkedCalendars": false,
        "autoUpdateInput": false,
    }, function(start, end) {
        //var time_start=start.format('YYYY/MM/DD HH:mm');//带时间的
        var time_start=start.format('YYYY/MM/DD');
        var time_end=end.format('YYYY/MM/DD');
        var time_label = time_start+' - '+time_end;
        $('#date_picker').val(time_label);
        timeTable = {
            "startTime": start.format('YYYY-MM-DDT00:00:00+08:00'),
            "endTime": end.format('YYYY-MM-DDT23:59:59+08:00')
        };
    });

    $scope.datatablesApi;

    var defaultDates = getQueryDates();//加载常用的一些时间进来
    // 初始化一个全局时间表,用于查询的时候取值，写到全局是因为所有的查询必定是先日期选中，才能继续查
    timeTable = { // 默认使用7天的日期数据
        'startTime': defaultDates.serverTime_todaybengin,
        'endTime': defaultDates.serverTime_today
    };
    // $('#date_picker').val(defaultDates.serverTime_today);//设置默认时间为当天
    $('#date_picker').val(defaultDates.time_todaybegin + ' - ' + defaultDates.time_today);//设置默认时间为当天

    //搜索按钮
    $scope.searchBtn = function (e) {
        var dataSection = $('#date_picker').val();
        if(dataSection){
            var postData ={"startTime": timeTable.startTime, "endTime": timeTable.endTime, "page": 1};
            $scope.datatablesInfoApi(postData);
            $scope.datatablesCountApi(postData);
        }else{
            $('.tip').html("至少得选个日期吧?").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");
        }
        return false;
    };

    // 日报简介接口
    $scope.datatablesInfoApi = function(postData){
        var postDataFinal = "";
        if(postData){
            postDataFinal = postData;
        }else{
            //默认传当天的空内容
            postDataFinal = {"startTime": timeTable.startTime, "endTime": timeTable.endTime, "page": 1};
        }

        // var _url = "ajax/pici.json"; //api/v1/getBatchReport
        var _url = "api/v1/getDailyReport"; //api/v1/getBatchReport

        console.log("日报API传参");
        console.log(postDataFinal);
        apiService.queryAPI(_url, postDataFinal, function (res) {
            if (res) {
                console.log(res);
                var dataList = res.data.result;
                $scope.smsSendInfoTable(dataList);
            }else{
                $('.tip').html("服务器出错").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");
            }
        }, function () {

        });
    };

    $scope.datatablesInfoApi();

    // 日报详情接口
    $scope.datatablesCountApi = function(postData){
        var postDataFinal = "";
        if(postData){
            postDataFinal = postData;
        }else{
            //默认传当天的空内容
            postDataFinal = {"startTime": timeTable.startTime, "endTime": timeTable.endTime, "page": 1};
        }

        var _url = "api/v1/getDailyReportDetail"; //api/v1/getBatchReport

        console.log("日报详情API传参");
        console.log(postDataFinal);
        apiService.queryAPI(_url, postDataFinal, function (res) {
            if (res) {
                console.log("qqqqq");
                console.log(res);
                var dataList = res.data.result;
                $scope.smsSendCountTable(dataList);
            }else{
                $('.tip').html("服务器出错").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");
            }
        }, function () {

        });
    };

    $scope.datatablesCountApi();

    // 日报简介datatable数据渲染
    $scope.smsSendInfoTable = function(listDatas){

        // console.log(listDatas);
        var dataListItemsIndex = 1;
        var options = getDefaultTableOption({
            "data": listDatas,
            "bPaginate": false,//分页开关
            "bFilter": false,//搜索开关
            "columns": [
                {data: 'dates'},
                {data: 'sendCount'},
                {data: 'successCount'},
                {data: 'failCount'},
                {data: 'unknownCount'}
            ],
            "aoColumnDefs": [
                {
                    "aTargets": [0, 1, 2, 3, 4],
                    // "searchable": false,   //设置是否参与搜索
                    "mRender": function (data) {
                        if(data){
                            return data;
                        }else{
                            return "--"
                        }
                    }
                }
            ]
        });

        $('#smsSendInfoTable').DataTable(options);

    };

    // 日报详情datatable数据渲染
    $scope.smsSendCountTable = function(listDatas){

        // console.log(listDatas);
        var dataListItemsIndex = 1;
        var options = getDefaultTableOption({
            "data": listDatas,
            "bPaginate": false,//分页开关
            "columns": [
                {data: null},
                {data: 'batchName'},
                {data: 'dates'},
                {data: 'sendCount'},
                {data: 'successCount'},
                {data: 'failCount'},
                {data: 'unknownCount'}
            ],
            "aoColumnDefs": [
                {
                    "aTargets": [0],//第1列，即操作这一列
                    "searchable": false,
                    "mRender": function () {
                        return dataListItemsIndex++;//输出序号
                    }
                },{
                    "aTargets": [1, 2, 3, 4, 5, 6],
                    // "searchable": false,   //设置是否参与搜索
                    "mRender": function (data) {
                        if(data){
                            return data;
                        }else{
                            return "--"
                        }
                    }
                }
            ]
        });

        $('#smsSendCountTable').DataTable(options);

    }

}]);