/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendPiciCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder', 'apiService',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder, apiService){

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
        var time_start=start.format('YYYY-MM-DD');
        var time_end=end.format('YYYY-MM-DD');
        var time_label = time_start+' 至 '+time_end;
        $('#date_picker').val(time_label);
        timeTable = {
            "startTime": start.format('YYYY-MM-DD'),
            "endTime": end.format('YYYY-MM-DD')
        };
    });

    $scope.piciNo = "";
    $scope.smsCont = "";
    $scope.datatablesApi;

    var defaultDates = getQueryDates();//加载常用的一些时间进来
    // 初始化一个全局时间表,用于查询的时候取值，写到全局是因为所有的查询必定是先日期选中，才能继续查
    timeTable = { // 默认使用7天的日期数据
        'startTime': defaultDates.time_todaybegin,
        'endTime': defaultDates.time_today
    };
    // $('#date_picker').val(defaultDates.serverTime_today);//设置默认时间为当天
    $('#date_picker').val(defaultDates.time_todaybegin + ' 至 ' + defaultDates.time_today);//设置默认时间为当天

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
        return false;
    };

    // 接口
    $scope.datatablesApi = function(postData){
        var postDataFinal = "";
        if(postData){
            postDataFinal = postData;
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
                //暂时将分页总数存到本地
                if(res.data.meta.pageCurrent)  {
                    sessionStorage.setItem('pagetotal', res.data.meta.totalCount);
                }
                var dataList = res.data.result;
                $scope.datatablesMedia(dataList);
            }else{
                $('.tip').html("服务器出错").stop(true, false).fadeIn(0).delay(1000).fadeOut("slow");
            }
        }, function () {

        });
    };

    // $scope.datatablesApi();

    //动态分页--创建保存页码数组的函数
    function setPage(length, amount, num, first) {//创建保存页码数组的函数
        //length数据总条数
        //amount每页数据条数
        //num保留的页码数
        //first第一页的页码
        var pages = []; //创建分页数组
        var page = Math.ceil(length / amount);
        if (page <= num) {
            for (var i = 1; i <= page; i++) {
                pages.push(i);
            }
        }
        if (page > num) {
            for (var i = first; i < first + num; i++) {
                pages.push(i);
            }
        }
        return pages;
    }

    //先取到接口返回的总条数，以便创建分页
    function fenyecont(fenyecont) {
        $scope.fenyecont = fenyecont;
        //动态分页--对你没看错，这里仅仅为了取一个总条数来创建分页！！！
        //设置分页的参数
        $scope.firstPage = 1;
        $scope.pageNum = 5;
        $scope.page = 1;
        var amount = $scope.fenyecont;//数据总条数
        var each = 10;//每页显示的条数
        $scope.each = 10;//每页显示的条数
        $scope.sub = function (page) {
            $scope.fenyeM(page, 9);
            $scope.lastPage = Math.ceil(amount / each);
            if (page >= $scope.pageNum) {
                $scope.firstPage = page - Math.floor($scope.pageNum / 2);
            } else {
                $scope.firstPage = 1;
            }
            if ($scope.firstPage > $scope.lastPage - $scope.pageNum) {
                $scope.firstPage = $scope.lastPage - $scope.pageNum + 1;
            }
            $scope.pages = setPage(amount, each, $scope.pageNum, $scope.firstPage);
            $scope.page = page;
        };
        $scope.sub(1);//默认选中第一页
        //构建分页结束
    }
    $scope.fenyeM = function (page,type,fenyecont) {
         if(type == 9){
             var postData = {"batchName": $scope.piciNo, "smsContent": $scope.smsCont, "startTime": timeTable.startTime, "endTime": timeTable.endTime, "page": page};
             $scope.datatablesApi(postData);
         }
    }

    fenyecont(sessionStorage.getItem("pagetotal"));


    // datatable数据渲染
    $scope.datatablesMedia = function(listDatas){

        // console.log(listDatas);
        var dataListItemsIndex = 1;
        var options = getDefaultTableOption({
            "data": listDatas,
            "columns": [
                {data: null},
                {data: 'batchName'},
                {data: 'msgContent'},
                {data: 'createdAt'},
                {data: 'sendSchedule'},
                {data: 'batchStatus'},
                {data: 'sendCount'},
                {data: 'successCount'}
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
                     "aTargets": [-2],
                     // "searchable": false,   //设置是否参与搜索
                     "mRender": function (data) {
                         if(data){
                             return toThousands(data);
                         }else{
                             return "--"
                         }
                     }
                },{
                     "aTargets": [-1],
                     // "searchable": false,   //设置是否参与搜索
                     "mRender": function (data) {
                         if(data){
                             return toThousands(data);
                         }else{
                             return "--"
                         }
                     },
                     "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                         console.log(oData);
                         var newData = oData.failCount + sData;
                         if(newData){
                             return newData;
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