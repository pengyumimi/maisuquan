/*
 公共函数库，需要提前载入
 */

//页面跳转接收项目id值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

/**
 * 判断字符串是否为空或者未定义
 * @param val
 * @returns {boolean}
 */
function isNullOrEmpty(val) {
    return val === null || val === '' || val === undefined;
}


/**
 * 获取时间的日期表达式
 * @param dates
 * @returns {*}
 */
function dateToday(dates) {
    if (dates)
        return moment(dates).format('YYYY-MM-DD');
    return moment().format('YYYY-MM-DD');
}

/**
 * 指定日期的前一天，如果不指定，则默认是今天
 * @param dates
 */
function dateYesterday(dates) {
    if (dates)
        return moment(dates).add(-1, 'days').format('YYYY-MM-DD');
    return moment().add(-1, 'days').format('YYYY-MM-DD');
}

/**
 * 从日期算起的，第7天后
 * 比如：dateAfter7Day('2017-08-20'),能直接返回：2017-08-27
 * @param dates
 * @returns {*}
 */
function dateAfter7Today(dates) {
    return moment(dates).add(7, 'days').format('YYYY-MM-DD');
}

/**
 * 获取默认的查询日期，
 * @returns {{serverTime_start, serverTime_end, serverTime_start_mouth, time_start_week, time_end_week, time_start_mouth, time_end_mouth}}
 */
function getQueryDates() {
    return {
        serverTime_todaybengin: moment().format('YYYY-MM-DDT00:00:00+08:00'),//今天的服务器格式数据
        serverTime_today: moment().format('YYYY-MM-DDT23:59:59+08:00'),//今天的服务器格式数据
        serverTime_week: moment().subtract(6, 'd').format('YYYY-MM-DDT00:00:00+08:00'),//按零点查找7天的服务器格式数据
        serverTime_month: moment().subtract(29, 'd').format('YYYY-MM-DDT00:00:00+08:00'),//按零点查找30天的服务器格式数据
        time_todaybegin: moment().format('YYYY.MM.DD'),//展示今天数据
        time_today: moment().format('YYYY.MM.DD'),//展示今天数据
        time_week: moment().subtract(6, 'd').format('YYYY.MM.DD'),//展示7天数据
        time_month: moment().subtract(29, 'd').format('YYYY.MM.DD'),//展示30天数据
    }
}

/**
 * 计算2个日期之间的每一天，存到数组里面，用于数据补齐
 * @param beginDate 开始日期
 * @param endDate 结束日期
 * @returns {Array}
 */
function getDateBetween(beginDate, endDate) {
    // 补数据的核心在于计算2个日期 之间的差有多少天,并存到数组里面，然后把Data的结果，往数组里面塞
    // 数组的key是日期，value是结果，最后会形成[{'2017-08-07':1,'2017-08-07':2}]这样的格式，最后使用的时候，再转换为一维的即可
    var diffDays = moment(endDate).diff(moment(beginDate), 'days') + 1;//加1天是为了把前后日期算尽
    // console.log('查询相差日期为' + diffDays);
    var dateArray = [];
    for (var days = 0; days < diffDays; days++) {
        // console.log('Days of :');
        // console.log(moment(someData.startDate).add('days', beginDate).format('YYYY-MM-DD'));
        dateArray.push(moment(beginDate).add('days', days).format('YYYY-MM-DD'));
    }
    // console.log('日期差数组结果为：');
    //console.log(dateArray);
    return dateArray;
}

/**
 * 设置日期，当前日期的前七天
 * @param  weeks
 */
function weeks(){
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 6);
    var dateArray = [];
    var dateTemp;
    var flag = 1;
    for (var i = 0; i < 7; i++) {
        dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
        dateArray.push(myDate.getFullYear()+"-"+dateTemp);
        myDate.setDate(myDate.getDate() + flag);
    }
    return dateArray;
}

/**
 * 判断数组是否包含指定的元素
 * @param arr
 * @param obj
 * @returns {boolean}
 */
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * 时间处理格式化方法
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
};
String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
};
/**
 *
 * @param ob 多级数组扁平化组合成一维数组 & 二维数组
 * @returns {{}}
 */
var flattenObject = function (ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        //多级数组扁平化组合成一维数组
        // if ((typeof ob[i]) == 'object') {
        //     var flatObject = flattenObject(ob[i]);
        //     for (var x in flatObject) {
        //         if (!flatObject.hasOwnProperty(x)) continue;
        //
        //         toReturn[i + '.' + x] = flatObject[x];
        //     }
        // } else {
        //     toReturn[i] = ob[i];
        // }
        toReturn[i] = ob[i];
    }
    return toReturn;
};
//dataListItems = Array.prototype.concat.apply([], dataListItems);//数组的扁平化

/**
 *
 * @param 二维数组按id（或者其他属性）排序
 * @returns datalist.sort(keysrt('brandId',false));//整理排序
 */
function keysrt(key, desc) {
    return function (a, b) {
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}
function isURL(str) {
    return !!(str.match(/^([a-z][a-z\d.+-]*:\/*)?[-a-zA-Z0-9@:%._\+~#=\u4e00-\u9fa5]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=\u4e00-\u9fa5]*)$/) || str.match(/^([a-z][a-z\d.+-]*:\/*)?[-a-zA-Z0-9@:%._\+~#=\u4e00-\u9fa5]{1,256}\.[a-z]{2,6}\b\/?$/) || str.match(/^([a-z][a-z\d.+-]*:\/*)?[-a-zA-Z0-9@:%._\+~#=\u4e00-\u9fa5]{1,256}\.[a-z]{2,6}\b\/.+$/));
}

/**
 * 处理升降箭头
 * @param data
 * @returns {*}
 */
function updownClass(data) {
    if (data > 0) {
        return '<span class="data-up"><i class="icon-wi-data-up"></i>' + data + '</span>'
    } else if (data < 0) {
        return '<span class="data-down"><i class="icon-wi-data-down"></i>' + Math.abs(data) + '</span>'
    } else {
        return data = '0';
    }
}


/**
 * Object参数合并
 * @param target
 * @param source
 * @returns {*}
 */
function extend(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}

/**
 * 生成DataTable默认配置
 * @param defaultOptions
 * @returns {*}
 */
function getDefaultTableOption(defaultOptions) {

    var options = {
        // "aoColumnDefs": [{"bSortable": false, "aTargets": [7]}],//对操作列不进行排序
        "bPaginate": false,//分页开关
        // "pagingType": "full_numbers",
        // "sPaginationType": "full_numbers",
        "bLengthChange": false,//选择条数
        "bFilter": true,//搜索框
        "bSort": true,//所有列排序
        "bInfo": false,//显示数据条数
        "bAutoWidth": true,//自动宽度
        // "retrieve": true,//保证只有一个table实例
        "destroy": true,//datatables 必须在执行前进行销毁（销毁实例），否则无法绑定二次数据（推荐使用这个方法）
        "bDestroy": true,//datatables 必须在执行前进行销毁（销毁实例），否则无法绑定二次数据（推荐使用这个方法）
        "responsive": true,
        "fnInitComplete": function (oSettings) {//加载完成的回调函数,oSettings获取全部对象
            // console.log("datables:");
            // console.log(oSettings.nTable);
            $(oSettings.nTable).parents(".table-responsive").find(".tableSpinner").hide();//隐藏loading动画（仅限datatables使用）
        }
    };

    if (defaultOptions)
        return extend(options, defaultOptions);
    return options;

}

/**
 * 处理千分位
 * @param num
 * @returns {string}
 */
function toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

    /**
 * 调用统一的加载条方法
 * @param chart
 */
function showLoading(chart) {
    if (chart.showLoading) {//先判断是否有这个方法，避免报错
        // console.log('show loading of chart');
        chart.showLoading({
            text: "",
            color: '#15caba',
            maskColor: 'rgba(255, 255, 255, 0.8)'
        });
    }
}

/**
 * 处理提取url中的域名
 * @param  getDomain
 */
function getDomain(URL) {
    var domain = "";
    if (URL) {
        if (URL.indexOf("//") > 0) {
            var first_split = URL.split("//");
            var without_resource = first_split[1];
            var second_split = without_resource.split("/");
            domain = second_split[0];
        } else {
            var second_split = URL.split("/");
            domain = second_split[0];
        }
    }
    return (domain);
}

/**
 * 加载动画（通用型加载列表使用）
 * @param  loadingAnimation
 */
function loadingAnimation(obj,show,hide) {
    if(show){
        console.log(obj);
        $(obj).append('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');//激活loading动画
    }
    if(hide){
        $(obj).parent().find(".spinner").hide();//隐藏loading动画（通用型加载列表使用）
    }
}

/**
 * 占位符调试
 *
 * Examples:
 * format("X{0}Y{1}Z{2}") : XYZ
 * format("X{0}Y{1}Z{2}", '1') : X1YZ
 * format("X{0}Y{1}Z{2}", '1', '2') : X1Y2Z
 * format("X{0}Y{1}Z{2}", '1', '2', '3') : X1Y2Z3
 * format("X{0}Y{1}Z{2}", '1', '2', '3', '4') : X1Y2Z3
 * ------------------------------------
 * format() : null
 * format("X{0}Y{1}Z{2}", null) : XYZ
 * format(null, '1') : null
 * ------------------------------------
 * format("{0{0}1{1}2{2}}") : {012}
 * format("{0{0}1{1}2{2}}", 'x') : {0x12}
 * format("{0{0}1{1}2{2}}", 'x', 'y') : {0x1y2}
 * format("{0{0}1{1}2{2}}", 'x', 'y', 'z') : {0x1y2z}
 *
 * @param message
 * @returns {*}
 */
// function format(message) {
//     var args = arguments;
//     return this.replace(/\{(\d+)\}/g,
//         function (m, i) {
//             return args[i];
//         });
// }

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



