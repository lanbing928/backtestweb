"use strict";
(function ($, window, document) {
    var name = Utility.getQueryStringByName("name");
    var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];
    var wk_treemap_data, viewData = [], searchData = [], followData = [];
    var myChart = echarts.init(document.getElementById("left-chart"));
    myChart.showLoading({"text": "加载中..."});

    function initLineChart() {
        common.getHyAndGnHot({"name": name, "query_type": 3, "hour_data": "event"}, null, function (resultData) {
            if (resultData.status == 1) {
                var _todayHot = [];
                var _lastHot = [];
                if (resultData.visit) {
                    var _vnum = 0;
                    for (var v in resultData.visit) {
                        viewData.push(resultData.visit[v]);
                        _vnum++;
                    }
                    viewData = JSON.parse("[" + viewData.join(',') + "]");
                    var _v = Math.max.apply(Math, viewData);
                    var _vindex = viewData.indexOf(Math.max.apply(Math, viewData));
                    _lastHot.push("<tr><td>查看</td><td>" + viewData[viewData.length - 1] + "</td><td>" + (Utility.getNowFormatDate() + " " + (_vnum - 1) + ":00") + "</td></tr>");
                    _todayHot.push("<tr><td>查看</td><td>" + _v + "</td><td>" + Utility.calTime(_vindex) + "</td></tr>");
                }
                if (resultData.search) {
                    var _snum = 0;
                    for (var s in resultData.search) {
                        searchData.push(resultData.search[s]);
                        _snum++;
                    }
                    searchData = JSON.parse("[" + searchData.join(',') + "]");
                    var _s = Math.max.apply(Math, searchData);
                    var _sindex = searchData.indexOf(Math.max.apply(Math, searchData));
                    _lastHot.push("<tr><td>搜索</td><td>" + searchData[searchData.length - 1] + "</td><td>" + (Utility.getNowFormatDate() + " " + (_snum - 1) + ":00") + "</td></tr>");
                    _todayHot.push("<tr><td>搜索</td><td>" + _s + "</td><td>" + Utility.calTime(_sindex) + "</td></tr>");
                }
                if (resultData.follow) {
                    var _fnum = 0;
                    for (var f in resultData.follow) {
                        followData.push(resultData.follow[f]);
                        _fnum++;
                    }
                    followData = JSON.parse("[" + followData.join(',') + "]");
                    var _f = Math.max.apply(Math, followData);
                    var _findex = followData.indexOf(Math.max.apply(Math, followData));
                    _lastHot.push("<tr><td>关注</td><td>" + followData[followData.length - 1] + "</td><td>" + (Utility.getNowFormatDate() + " " + (_fnum - 1) + ":00") + "</td></tr>");
                    _todayHot.push("<tr><td>关注</td><td>" + _f + "</td><td>" + Utility.calTime(_findex) + "</td></tr>");
                }
                $(".todayhot").html(_todayHot.join(''));
                $(".latesthot").html(_lastHot.join(''));
                common.getLineChart("left-chart", xdata, viewData, searchData, followData);
            }
        });
    }

    function initTreeMapChart() {
        if (!wk_treemap_data) {
            common.getTopTwentyStock({"hottype": "hv", "hotval": name}, function () {
                var treemap = echarts.init(document.getElementById("wk-stock-view-treemap"));
                treemap.showLoading({"text": "加载中..."});
                $("#event-view .wk-hot-table tbody").html("<tr><td colspan='5'>加载中...</td></tr>");
            }, function (resultData) {
                if (resultData.status == 1) {
                    buildTreeMap(resultData);
                    wk_treemap_data = resultData;
                }
            });
        } else {
            buildTreeMap(wk_treemap_data);
        }
    }

    function buildTreeMap(resultData) {
        if (resultData.result.code_info.shv_.length > 0) {
            var _shv = resultData.result.code_info.shv_;
            var _suv = resultData.result.code_info.suv_;
            $("#event-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
            var maptable = Utility.buildMapTable(_suv);
            $("#event-view .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#event-view .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-view-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shs_.length > 0) {
            var _shs = resultData.result.code_info.shs_;
            var _sus = resultData.result.code_info.sus_;
            $("#event-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
            var maptable = Utility.buildMapTable(_sus);
            $("#event-search .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#event-search .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-search-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shf_.length > 0) {
            var _shf = resultData.result.code_info.shf_;
            var _suf = resultData.result.code_info.suf_;
            $("#event-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
            var maptable = Utility.buildMapTable(_suf);
            $("#event-follow .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#event-follow .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-follow-treemap", maptable._map, "stock");
        }
    }

    function initTodayRateLine() {
        var rateLine = echarts.init(document.getElementById("wk-rate-line-pic"));
        var queryData = {
            "query_type": "event",
            "query_key": name,
            "query_date": "today"
        };
        common.getRateLine(queryData, function () {
            rateLine.showLoading({"text": "加载中..."});
        }, function (resultData) {
            common.buildRateLine(decodeURI(name), "today", resultData);
            rateLine.hideLoading();
        });
    }

    /**
     * 获取关联信息图
     */
    function initReleatedInfo() {
        common.initRelateSHG(3, name, function (resultData) {
            if (resultData && resultData.status == 1) {
                common.buildReleatedInfoChart(name, resultData);
            }
        });
    }

    function initModalChart() {
        $(".modal-chart").modal("show");
        var _modalChart = echarts.init(document.getElementById("modal-chart"));
        common.getHyAndGnHot({"name": name, "query_type": 3}, function () {
            _modalChart.showLoading({"text": "加载中..."});
        }, function (resultData) {
            _modalChart.hideLoading();
            var _modalViewData = [];
            var _modalxData = [];
            if (resultData.status == 1) {
                if (resultData.visit) {
                    for (var v in resultData.visit) {
                        _modalViewData.push(resultData.visit[v]);
                        _modalxData.push("\"" + Utility.numToTime(v) + "\"");
                    }
                    _modalxData = JSON.parse("[" + _modalxData.join(',') + "]");
                    _modalViewData = JSON.parse("[" + _modalViewData.join(',') + "]");
                }
                var myChart = echarts.init(document.getElementById("modal-chart"));
                myChart.showLoading({"text": "加载中..."});
                myChart.setOption({
                    color: ["rgb(243, 104, 97)"],
                    tooltip: {
                        trigger: "axis",
                        formatter: function (params) {
                            var showLabel = "";
                            showLabel += params[0].name + "<br>";
                            for (var p in params) {
                                if (params[p].value && params[p].value != 0) {
                                    if (params[0].name == params[p].name) {
                                        showLabel += "<label style='color: " + params[p].color + ";font-size: 14x;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + Utility.formatNum(params[p].value) + "<br>";
                                    }
                                }
                            }
                            return showLabel;
                        }
                    },
                    dataZoom: [
                        {type: 'inside', realtime: true},
                        {
                            type: 'slider',
                            show: true,
                            realtime: true
                        }],
                    grid: {top: 10, left: 20, right: 20, bottom: 40, containLabel: true},
                    legend: {left: "left"},
                    xAxis: {type: "category", boundaryGap: false, data: _modalxData},
                    yAxis: {type: "value", position: "right", scale: true},
                    calculable: false,
                    series: [
                        {
                            name: "查看",
                            type: "line",
                            smooth: true,
                            data: _modalViewData
                        }
                    ]
                });
                myChart.hideLoading();
                window.onresize = myChart.resize
            }
        });
    }

    var eventArrData = {key_name: name, start_id: 0, "start_time": 0};
    $(".nav-tabs li a").bind("click", function () {
        if ($(this).attr("href").indexOf("#wk-selfmedia") === 0) {
            if ($("#mCSB_2_container").html() === "") {
                eventArrData.start_id = 0;
                eventArrData.info_type = 2;
                common.getEventMedia(eventArrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-newsflash") === 0) {
            if ($("#wk-newsflash table>tbody").html() === "") {
                eventArrData.start_id = 0;
                eventArrData.info_type = 1;
                common.getEventFastNews(eventArrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-notice") === 0) {
            if ($("#mCSB_4_container").html() === "") {
                eventArrData.start_id = 0;
                eventArrData.info_type = 4;
                common.getEventNotice(eventArrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-report") === 0) {
            if ($("#mCSB_5_container").html() === "") {
                eventArrData.start_id = 0;
                eventArrData.info_type = 3;
                common.getEventReport(eventArrData, true);
            }
        }
    });
    $('.wk-hotmap a[data-toggle="tab"]').on('shown.bs.tab', function () {
        initTreeMapChart();
    });
    $("#wk-news").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                if ($("#wk-news .wk-news-list:last").attr("id")) {
                    eventArrData.start_id = $("#wk-news .wk-news-list:last").attr("id").replace("news_", "");
                    eventArrData.info_type = 0;
                    eventArrData.start_time = $("#wk-news .wk-news-list:last").attr("data-news-timestamp");
                    common.getEventNews(eventArrData);
                }
            }
        }
    });
    $("#wk-selfmedia").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                if ($("#wk-selfmedia .wk-news-list:last").attr("id")) {
                    eventArrData.start_id = $("#wk-selfmedia .wk-news-list:last").attr("id").replace("media_", "");
                    eventArrData.info_type = 2;
                    eventArrData.start_time = $("#wk-selfmedia .wk-news-list:last").attr("data-media-timestamp");
                    common.getEventMedia(eventArrData);
                }
            }
        }
    });
    $("#wk-newsflash").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                if ($("#wk-newsflash .wk-news-list tr:last").attr("id")) {
                    eventArrData.start_id = $("#wk-newsflash .wk-news-list tr:last").attr("id").replace("fast_", "");
                    eventArrData.info_type = 1;
                    eventArrData.start_time = $("#wk-newsflash .wk-news-list:last").attr("data-fastnews-timestamp");
                    common.getEventFastNews(eventArrData);
                }
            }
        }
    });
    $("#wk-notice").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                if ($("#wk-notice .wk-news-list:last").attr("id")) {
                    eventArrData.start_id = $("#wk-notice .wk-news-list:last").attr("id").replace("notice_", "");
                    eventArrData.info_type = 4;
                    eventArrData.start_time = $("#wk-notice .wk-news-list:last").attr("data-news-timestamp");
                    common.getEventNotice(eventArrData);
                }
            }
        }
    });
    $("#wk-report").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                if ($("#wk-report .wk-news-list:last").attr("id")) {
                    eventArrData.start_id = $("#wk-report .wk-news-list:last").attr("id").replace("report_", "");
                    eventArrData.info_type = 3;
                    eventArrData.start_time = $("#wk-report .wk-news-list:last").attr("data-news-timestamp");
                    common.getEventReport(eventArrData);
                }
            }
        }
    });
    $(".wk-line-toggle a").click(function () {
        $(this).addClass("line-active").siblings().removeClass("line-active");
        var query_type = $(this).parent().attr("data-query-type");
        var key = $(this).parent().attr("data-query-key");
        var time_type = $(this).attr("data-key");
        var arrData = {
            query_type: query_type,
            key_name: key,
            time_type: time_type
        };
        if (time_type == "minute") {
            initModalChart();
            return;
        }
        if (time_type == "day") {
            common.getLineChart("left-chart", xdata, viewData, searchData, followData);
        } else {
            common.getHotRecord(arrData, function () {
                var myChart = echarts.init(document.getElementById("left-chart"));
                myChart.showLoading({"text": "加载中..."});
            }, function (resultData) {
                var _viewData = [];
                var _searchData = [];
                var _followData = [];
                var _xdata = [];
                if (resultData.status == 1) {
                    for (var v in resultData.visit) {
                        for (var vv in resultData.visit[v]) {
                            _xdata.push(vv);
                            _viewData.push(resultData.visit[v][vv]);
                        }
                    }
                    for (var s in resultData.search) {
                        for (var ss in resultData.search[s]) {
                            _searchData.push(resultData.search[s][ss]);
                        }
                    }
                    for (var f in resultData.follow) {
                        for (var ff in resultData.follow[f]) {
                            _followData.push(resultData.follow[f][ff]);
                        }
                    }
                }
                common.getLineChart("left-chart", _xdata, _viewData, _searchData, _followData);
            });
        }
    });
    $(".treemap-toggle span").click(function () {
        $(this).addClass("treemap-active").siblings().removeClass("treemap-active");
        var to = $(this).parent().parent().parent();
        if ($(this).html() == "热力图") {
            to.find(".toggle-treemap").show();
            to.find(".toggle-treemap-table-up").hide();
            to.find(".toggle-treemap-table-down").hide();
        } else if ($(this).html() == "涨幅") {
            to.find(".toggle-treemap").hide();
            to.find(".toggle-treemap-table-up").show();
            to.find(".toggle-treemap-table-down").hide();
        } else if ($(this).html() == "跌幅") {
            to.find(".toggle-treemap").hide();
            to.find(".toggle-treemap-table-up").hide();
            to.find(".toggle-treemap-table-down").show();
        }
    });
    $(".wk-rate-select label").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var querykey = $(this).parent().attr("data-query-name");//查询关键字(股票代码||行业/概念关键字)
        var querytype = $(this).parent().attr("data-query-type");//查询类别(股票/行业/概念)
        var toggle = $(this).attr("data-toggle");//查询周期(当天/一周/一个月/三个月)
        var rateLine = echarts.init(document.getElementById("wk-rate-line-pic"));
        var queryData = {
            "query_type": querytype,
            "query_key": querykey,
            "query_date": toggle
        };
        if (querytype == "stock") {
            if (_stockName) {
                querykey = _stockName;
            }
        }
        switch (toggle) {
            case "today":
                common.getRateLine(queryData, function () {
                    rateLine.showLoading({"text": "加载中..."});
                }, function (resultData) {
                    common.buildRateLine(querykey, toggle, resultData);
                    rateLine.hideLoading();
                });
                break;
            case "week":
                common.getRateLine(queryData, function () {
                    rateLine.showLoading({"text": "加载中..."});
                }, function (resultData) {
                    common.buildRateLine(querykey, toggle, resultData);
                    rateLine.hideLoading();
                });
                break;
            case "month":
                common.getRateLine(queryData, function () {
                    rateLine.showLoading({"text": "加载中..."});
                }, function (resultData) {
                    common.buildRateLine(querykey, toggle, resultData);
                    rateLine.hideLoading();
                });
                break;
            case "threemonth":
                common.getRateLine(queryData, function () {
                    rateLine.showLoading({"text": "加载中..."});
                }, function (resultData) {
                    common.buildRateLine(querykey, toggle, resultData);
                    rateLine.hideLoading();
                });
                break;
            default:
                break;
        }
    })
    common.getEventNews(eventArrData, true);
    initReleatedInfo();
    initLineChart();
    initTreeMapChart();
    initTodayRateLine();
    common.initdoubleLine(4, name);
})(jQuery, window, document);