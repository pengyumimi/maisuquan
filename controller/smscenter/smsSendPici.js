/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendPiciCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder', 'apiService',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder, apiService){

    var timeTable;
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

    $scope.piciNo = "";
    $scope.smsCont = "";
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
        console.log($scope.piciNo);
        console.log($scope.smsCont);
        var dataSection = $('#date_picker').val();
        console.log(dataSection);
        if(dataSection){
            var postData = {"batchName": $scope.piciNo, "smsContent": $scope.smsCont, "startTime": timeTable.startTime, "endTime": timeTable.endTime, "page": 1};
            $scope.datatablesApi(postData);
        }else{
            $('.tip').html("至少得选个日期吧?").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");
        }
        return;

    }

    // 接口
    $scope.datatablesApi = function(postData){
        var postDataFinal;
        if(postData){
            var postDataFinal = postData;
        }else{
            //默认传当天的空内容
            postDataFinal = {"batchName": "", "smsContent": "", "startTime": timeTable.startTime, "endTime": timeTable.endTime, "page": 1};
        }

        // var _url = "ajax/pici.json"; //api/v1/getBatchReport
        var _url = "api/v1/getBatchReport"; //api/v1/getBatchReport

        console.log(postDataFinal);
        apiService.queryAPI(_url, postDataFinal, function (res) {
            if (res) {
                console.log(res);
                var dataList = res.data.result;
                $scope.datatablesMedia(dataList);
            }else{
                $('.tip').html("服务器出错").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");
            }
        }, function () {

        });
    };

    $scope.datatablesApi();


    // datatable数据渲染
    $scope.datatablesMedia = function(listDatas){

        // console.log(listDatas);
        var dataListItemsIndex = 1;
        var options = getDefaultTableOption({
            "data": listDatas,
            "columns": [
                {data: null},
                {data: 'longId'},
                {data: 'msgContent'},
                {data: 'createdAt'},
                {data: 'sendSchedule'},
                {data: 'batchStatus'},
                {data: 'batchSize'},
                {data: 'sendCount'}
            ],
            "aoColumnDefs": [
                {
                    "aTargets": [0],//第1列，即操作这一列
                    "searchable": false,
                    "mRender": function () {
                        return dataListItemsIndex++;//输出序号
                    }
                },{
                     "aTargets": [2, 3, 4],
                     // "searchable": false,   //设置是否参与搜索
                     "mRender": function (data) {
                         if(data){
                             return data;
                         }else{
                             return "--"
                         }
                     }
                 },{
                     "aTargets": [-3],
                     // "searchable": false,   //设置是否参与搜索
                     "mRender": function (data) {
                         if(data){
                             var n = "";
                             switch (data){
                                 case 1:
                                     n = '<span class="text-success"> 发送成功 </span>';
                                     break;
                                 case 2:
                                     n =  '<span class="text-warning"> 发送中... </span>';
                                     break;
                                 case 3:
                                     n =  '<span class="text-danger"> 发送失败 </span>';
                                     break;
                             }
                             return n;
                         }else{
                             return "--"
                         }

                     }
                 },{
                     "aTargets": [-1, -2],
                     // "searchable": false,   //设置是否参与搜索
                     "mRender": function (data) {
                         if(data){
                             return toThousands(data);
                         }else{
                             return "--"
                         }
                     }
                 }
            ]
        });

        $('#smsSendPiciTable').DataTable(options);

    }


    // console.log('合并后的配置为：');
    // console.log(options);



}]);