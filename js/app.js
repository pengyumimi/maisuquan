var appModule = angular.module('scotchApp',['ui.router','datatables','ui.load','ui.bootstrap']);//定义路由，注入ui.router依赖

/*
if (!getcookies("accessKeyID") || !getcookies("accessSecurityKey")) {
    window.location.href = "../signin.html";
} else {
    //设置token
    var token = getcookies("accessKeyID") + ":" + getcookies("accessSecurityKey");
}*/

var token = 'testtoken';//测试token

var httpsrc = "http://sendsms.frp.lingdonge.com:8080/";// ip 地址
// var httpsrc = "";// ip 地址

/**
 * API 服务
 */
appModule.service("apiService", function ($http) {

    /**
     * 二次封装API请求
     * @param url 请求URL
     * @param postData
     * @param callback
     * @param beforeCallback
     */
    this.queryAPI = function (url, postData, callback, beforeCallback) {

        if (isNullOrEmpty(url) || isNullOrEmpty(token)) {
            // console.log('queryAPI发生异常，URL或者Token不能为空！');
            return;
        }

        // 尚未解决在Service里面注入interceptor，只能先手动进行处理了。
        if (beforeCallback) beforeCallback();

        var _url = url.startWith('http') ? url : httpsrc + url;//如果URL是http开头的，直接调用，不需要拼接URL

        $http({
            method: 'POST',
            headers: {"Authorization": token, "Content-Type": "application/json"},
            url: _url,
            data: postData ? postData : '',
            // beforeSend: beforeCallback ? beforeCallback() : null,
            complete: function (res) {

                // console.log('API请求[' + _url + ']，发送的postdata为：');
                // console.log(postData);
                // console.log('返回结果为：');
                // console.log(res.data);

                if (callback)
                    callback(res)
            }
        });
    }

});

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


appModule.service("fenyeService", function ($scope) {
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
    this.fenye = function fenyecont(fenyecont) {
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
            // alert(page);
            // console.log(page);
            //getLinkInfo("", pid, page, each);//传到API页面,默认只读取10条

            // var postData = {"batchName": $scope.piciNo, "smsContent": $scope.smsCont, "startTime": timeTable.startTime, "endTime": timeTable.endTime, "page": page};
            // $scope.datatablesApi(postData);
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
});

/*js原生获取cookie参数*/
function getcookies(value) {
    var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(";");  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips;  //声明变量tips
    for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
        var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
        if (value == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
            tips = arr[1];   //将cookie的值赋给变量tips
            break;   //终止for循环遍历
        }
    }
    return tips;
}

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

