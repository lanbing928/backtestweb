"use strict";
var common = {
    /**
     * 验证是否没有权限
     * @param resultData
     */
    initCheckLogin: function (resultData) {
        var i=0;
         for(var key in resultData){
           if(key=='status'){
            i=1;
           }
        }
        if(i){
            if(resultData.status == -103){
                window.location.href = "../../common/checkDevice.php";
                // window.location.href = "http://" + window.location.host + "/login.php";
            }
        }else{
             if(resultData.head.status == -103){
                 window.location.href = "../../common/checkDevice.php";
               // window.location.href = "http://" + window.location.host + "/login.php";
             }
        }
    },
    /**
     * 登录
     */
    login: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "/ajax/login/user_login.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        })
    },
    /**
     * 获取营业部
     */
    getPlatformList: function (beforeFn, backFn) {
        $.ajax({
            url: "ajax/login/get_platform_info.php",
            type: "post",
            dataType: "json",
            cache: false,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        })
    },
    /**
     * 构建热度趋势图
     * @param query_name
     * @param query_date
     * @param buildData
     */
    buildRateLine: function (query_name, query_date, buildData) {
        var dateArr = [];
        var r1Data = [];
        var r2Data = [];
        var labelInterval = "auto";
        if (buildData.body && buildData.body.list.length > 0) {

            var list = buildData.body.list;
            if (query_date === "today" || query_date === "datacompare") {
                labelInterval = 30;
                for (var i = 0; i < list.length; i++) {
                    dateArr.push(Utility.unixToTime(list[i].trade_time * 1000));
                    r1Data.push(list[i].day_yield);
                    r2Data.push(list[i].hs300_day_yield);
                }
            } else {
                for (var j = 0; j < list.length; j++) {
                    dateArr.push(list[j].date);
                    r1Data.push(list[j].adjusted_day_yield);
                    r2Data.push(list[j].hs300_adjusted_day_yield);
                }
                dateArr.reverse();
                r1Data.reverse();
                r2Data.reverse();
            }
        }
        var rateChart = echarts.init(document.getElementById("wk-rate-line-pic"));
        var option = {
            tooltip: {
                trigger: "axis",
                formatter: function (params) {
                    var showLabel = "";
                    showLabel += params[0].name + "<br>";
                    for (var p in params) {
                    //     if (params[p].value && params[p].value != 0) {
                            if (params[0].name == params[p].name) {
                                showLabel += "<label style='color: " + params[p].color + ";font-size: 14px;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + (params[p].value * 100).toFixed(2) + "%" + "<br>";
                            }
                        // }
                    }
                    return showLabel;
                }
            },
            color: ["rgb(151,47,134)", "rgb(65,77,92)"],
            legend: {
                data: [query_name, '沪深300'],
                top: 0
            },
            //dataZoom: [{show: true, realtime: true}, {type: 'inside', realtime: true}],
            grid: {
                top: '25px',
                left: '33px',
                right: '0',
                bottom: 0,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateArr,
                axisLabel: {
                    interval: labelInterval
                }
            },
            yAxis: {
                type: 'value',
                position: 'right',
                axisLabel: {
                    formatter: function (value) {
                        if (value != 0) {
                            return (value * 100).toFixed(2) + "%";
                        } else {
                            return 0;
                        }
                    }
                }
            },
            series: [
                {
                    name: query_name,
                    type: 'line',
                    smooth: true,
                    data: JSON.parse("[" + r1Data + "]")
                },
                {
                    name: '沪深300',
                    type: 'line',
                    smooth: true,
                    data: JSON.parse("[" + r2Data + "]")
                }
            ]
        };
        rateChart.setOption(option);
        window.onresize = rateChart.resize;
    },
    /**
     * 根据价格获取颜色值
     * @param price
     * @returns {*}
     */
    getUpDownColor: function (price) {
        return price > 0 ? "wk-red" : price < 0 ? "wk-green" : "wk-gray";
    },
    /**
     * 获取加载动画
     * @returns {string}
     */
    getLoading: function () {
        var loadingHtml = [];
        loadingHtml.push("<div id=\"loading\">");
        loadingHtml.push("		<div id=\"loading-center\">");
        loadingHtml.push("			<div id=\"loading-center-absolute\">");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("				<div class=\"object\"></div>");
        loadingHtml.push("			</div>");
        loadingHtml.push("		</div>");
        loadingHtml.push("	</div>");
        return loadingHtml.join('');
    },
    hideLoading: function () {
        $("#loading").remove();
    }
};

var backtest = {
    /**
     * 回测平台
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    backtest: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_request_backtest.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    backtestResult: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_result_stock.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    getSentence: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_get_sentence.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    getMoreSentence: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_get_more_sentence.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    /**
     * 获取热度走势图
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getRateLine: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "/ajax/backtest/ajax_get_rateline.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    searchCheck:function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_search_check.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },

    /**
     * 模拟交易系统
     * 获取交易的股票信息
     * */
};


var backtest = {
    /**
     * 回测平台
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    backtest: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_request_backtest.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    backtestResult: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_result_stock.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    getSentence: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_get_sentence.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    getMoreSentence: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_get_more_sentence.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    /**
     * 获取热度走势图
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getRateLine: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "/ajax/backtest/ajax_get_rateline.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    },
    searchCheck:function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/backtest/ajax_search_check.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: arrData,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        })
    }
};
