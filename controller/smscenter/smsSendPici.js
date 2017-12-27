/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendPiciCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder', 'apiService',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder, apiService){

//时间控件初始化
    $('#reservation').daterangepicker({
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
        $('#reservation').val(time_label);
    });

    var postData = {"batchName": "", "smsContent": "", "startTime": "", "endTime": "", "pageNo": 1, "pageSize": 1000};
    var _url = "ajax/pici.json"; //api/v1/getBatchReport
    // var _url = "api/v1/getBatchReport"; //api/v1/getBatchReport

    apiService.queryAPI(_url, postData, function (res) {
        if (res) {
            console.log(res);
            var dataList = res.data.result;
            // $scope.datatablesMedia(dataList);
            list(dataList);
        }
    })

    // datatable数据渲染
    function list(listDatas){

        console.log(listDatas);
        var dataListItemsIndex = 1;
        var options = getDefaultTableOption({
            "data": listDatas,
            //使用对象数组，一定要配置columns，告诉 DataTables 每列对应的属性
            //data 这里是固定不变的，name，position，salary，office 为你数据里对应的属性
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
                             console.log(data);
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