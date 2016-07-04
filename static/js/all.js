"use strict";
$(function () {
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
            "股票": {url: ["ajax/ajax_search.php?message={{query}},", "stock"]},
            "行业": {url: ["ajax/ajax_search.php?message={{query}},", "hy"]},
            "概念": {url: ["ajax/ajax_search.php?message={{query}},", "gn"]},
            "热点事件": {url: ["ajax/ajax_search.php?message={{query}},", "rd"]}
        },
        callback: {
            onClickAfter: function (node, a, item) {
                if (item.display !== "") {
                    switch (item.group) {
                        case "股票":
                            window.open("stocks.php?stock=" + item.display.substring(item.display.indexOf("(") + 1, item.display.indexOf(")")), "_blank");
                            break;
                        case "行业":
                            window.open("industry.php?name=" + item.display, "_blank");
                            break;
                        case "概念":
                            window.open("concept.php?name=" + item.display, "_blank");
                            break;
                        case "热点事件":
                            window.open("hotevent.php?name=" + item.display, "_blank");
                            break;
                        default:
                            window.open("error.php", "_blank");
                            break;
                    }
                }
            }
        }
    });
    $(".wk-con-news .wk-con-box").mouseenter(function () {
        //$(document.body).css({"overflow-x": "hidden", "overflow-y": "hidden"});
    });
    $(".wk-con-news .wk-con-box").mouseleave(function () {
        //$(document.body).css({"overflow-x": "auto", "overflow-y": "auto"});
    });
    $("i[data-toggle='popover']").popover({
        container: "body",
        trigger: "hover"
    });
    $('.hot-map a[data-toggle="tab"]').on('shown.bs.tab', function () {
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
                myChart.showLoading();
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
        if ($(this).html() == "图") {
            to.find(".toggle-treemap").show();
            to.find(".toggle-treemap-table").hide();
            initTreeMapChart();
        } else {
            to.find(".toggle-treemap").hide();
            to.find(".toggle-treemap-table").show();
        }
    });
    $(".wk-rate-select label").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var toggle = $(this).attr("data-toogle");
        var rateChart = echarts.init(document.getElementById("wk-rate-line-pic"));
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            color: ["rgb(151,47,134)", "rgb(65,77,92)"],
            legend: {
                data: ['平安银行', '沪深300'],
                bottom: '0'
            },
            grid: {
                top: '8px',
                left: '0',
                right: '0',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2016-06-18', '2016-06-19', '2016-06-20', '2016-06-21', '2016-06-22', '2016-06-23', '2016-06-24','2016-06-25','2016-06-26','2016-06-27','2016-06-28','2016-06-29','2016-06-30','2016-07-01']
            },
            yAxis: {
                type: 'value',
                position: 'right'
            },
            series: [
                {
                    name: '平安银行',
                    type: 'line',
                    smooth: true,
                    data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '沪深300',
                    type: 'line',
                    smooth: true,
                    data: [220, 182, 191, 234, 290, 330, 310, 134, 90, 230, 210, 120, 132, 101]
                }
            ]
        };
        rateChart.setOption(option);
        window.onresize = rateChart.resize
        switch (toggle) {
            case "today":
                break;
            case "week":
                break;
            case "month":
                break;
            case "threemonth":
                break;
        }
    })
});