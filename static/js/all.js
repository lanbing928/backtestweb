"use strict";
$(function () {
    var thisHost = "http://" + window.location.host + "/";
    /**
     * 搜索框自动完成
     */
    $(".wk-head-search").typeahead({
        minLength: 2,
        maxItem: 20,
        order: "asc",
        hint: true,
        group: true,
        maxItemPerGroup: 5,
        backdrop: false,
        dynamic: true,
        filter: false,
        emptyTemplate: '未找到 "{{query}}" 的相关信息',
        source: {
            "股票": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "stock"]},
            "行业": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "hy"]},
            "概念": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "gn"]},
            "热点事件": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "event"]}
        },
        callback: {
            onClickAfter: function (node, a, item) {
                if (item.display !== "") {
                    switch (item.group) {
                        case "股票":
                            window.open(thisHost + "stocks.php?stock=" + item.display.substring(item.display.indexOf("(") + 1, item.display.indexOf(")")), "_blank");
                            break;
                        case "行业":
                            window.open(thisHost + "industry.php?name=" + item.display, "_blank");
                            break;
                        case "概念":
                            window.open(thisHost + "concept.php?name=" + item.display, "_blank");
                            break;
                        case "热点事件":
                            window.open(thisHost + "event.php?name=" + item.display, "_blank");
                            break;
                        default:
                            window.open(thisHost + "error.php", "_blank");
                            break;
                    }
                }
            }
        }
    });
    window.bindEnterNewsBox = function () {
        $(".wk-con-news .wk-con-box").mouseenter(function () {
            scrollHanlder.disableScroll();
        });
    };
    window.bindLeaveNewsBox = function () {
        $(".wk-con-news .wk-con-box").mouseleave(function () {
            scrollHanlder.enableScroll();
        });
    };
    $("i[data-toggle='popover']").popover({
        container: "body",
        trigger: "hover"
    });

    $('.wk-hotmap a[data-toggle="tab"]').on('shown.bs.tab', function () {
        initTreeMapChart();
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
            //initTreeMapChart();
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
});