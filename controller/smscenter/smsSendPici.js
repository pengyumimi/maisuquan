/**
 * Created by hero on 2017/12/24 0024.
 */
appModule.controller('msgSendPiciCtrl',['$scope','$http','DTOptionsBuilder','DTColumnDefBuilder',function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder){

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

}]);