"use strict";
(function ($, window, document) {
    var wkTreemapData, viewData = [], searchData = [], followData = [];
    var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];

    function initTreeMapChart() {
        if (!wkTreemapData) {
            common.getTopTwentyStock(null, function () {
                var waitLogingCharts = ["wk-stock-view-treemap", "wk-industry-view-treemap", "wk-concept-view-treemap", "wk-event-view-treemap"];
                for (var i in waitLogingCharts) {
                    if (waitLogingCharts.hasOwnProperty(i)) {
                        var treemap = echarts.init(document.getElementById(waitLogingCharts[i]));
                        treemap.showLoading({ "text": "加载中..." });
                    }
                }
            }, function (resultData) {
                if (resultData.status === 1) {
                    buildTreeMap(resultData);
                    wkTreemapData = resultData;
                }
            });
        } else {
            buildTreeMap(wkTreemapData);
        }
    }

    function buildTreeMap(resultData) {
        var maptable;
        if (resultData.result.code_info.shv_.length > 0) {
            var shv = resultData.result.code_info.shv_;
            var suv = resultData.result.code_info.suv_;
            $("#hot-view-stock").html("<a class='" + Utility.getPriceColor(shv[0].mark_z_d) + "' href='stocks.php?stock=" + shv[0].code + "' target='_blank'>" + shv[0].name + "(" + shv[0].code + ")</a>");
            $("#stock-view .wk-hot-table tbody").html(common.buildHotmapTable(shv, "stock"));
            maptable = Utility.buildMapTable(suv);
            $("#stock-view .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#stock-view .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-view-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shs_.length > 0) {
            var shs = resultData.result.code_info.shs_;
            var sus = resultData.result.code_info.sus_;
            $("#hot-search-stock").html("<a class='" + Utility.getPriceColor(shs[0].mark_z_d) + "' href='stocks.php?stock=" + shs[0].code + "' target='_blank'>" + shs[0].name + "(" + shs[0].code + ")</a>");
            $("#stock-search .wk-hot-table tbody").html(common.buildHotmapTable(shs, "stock"));
            maptable = Utility.buildMapTable(sus);
            $("#stock-search .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#stock-search .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-search-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shf_.length > 0) {
            var shf = resultData.result.code_info.shf_;
            var suf = resultData.result.code_info.suf_;
            $("#hot-follow-stock").html("<a class='" + Utility.getPriceColor(shf[0].mark_z_d) + "' href='stocks.php?stock=" + shf[0].code + "' target='_blank'>" + shf[0].name + "(" + shf[0].code + ")</a>");
            $("#stock-follow .wk-hot-table tbody").html(common.buildHotmapTable(shf, "stock"));
            maptable = Utility.buildMapTable(suf);
            $("#stock-follow .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#stock-follow .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-follow-treemap", maptable._map, "stock");
        }

        if (resultData.result.code_info.hhv_.length > 0) {
            var hhv = resultData.result.code_info.hhv_;
            var huv = resultData.result.code_info.huv_;
            $("#industry-view .wk-hot-table tbody").html(common.buildHotmapTable(hhv, "industry"));
            maptable = Utility.buildMapTable(huv);
            $("#industry-view .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "industry"));
            $("#industry-view .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "industry"));
            common.buildHotmap("wk-industry-view-treemap", maptable._map, "industry");
        }
        if (resultData.result.code_info.hhs_.length > 0) {
            var hhs = resultData.result.code_info.hhs_;
            var hus = resultData.result.code_info.hus_;
            $("#industry-search .wk-hot-table tbody").html(common.buildHotmapTable(hhs, "industry"));
            maptable = Utility.buildMapTable(hus);
            $("#industry-search .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "industry"));
            $("#industry-search .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "industry"));
            common.buildHotmap("wk-industry-search-treemap", maptable._map, "industry");
        }
        if (resultData.result.code_info.hhf_.length > 0) {
            var hhf = resultData.result.code_info.hhf_;
            var huf = resultData.result.code_info.huf_;
            $("#industry-follow .wk-hot-table tbody").html(common.buildHotmapTable(hhf, "industry"));
            maptable = Utility.buildMapTable(huf);
            $("#industry-follow .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "industry"));
            $("#industry-follow .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "industry"));
            common.buildHotmap("wk-industry-follow-treemap", maptable._map, "industry");
        }

        if (resultData.result.code_info.ghv_.length > 0) {
            var ghv = resultData.result.code_info.ghv_;
            var guv = resultData.result.code_info.guv_;
            $("#concept-view .wk-hot-table tbody").html(common.buildHotmapTable(ghv, "concept"));
            maptable = Utility.buildMapTable(guv);
            $("#concept-view .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "concept"));
            $("#concept-view .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "concept"));
            common.buildHotmap("wk-concept-view-treemap", maptable._map, "concept");
        }
        if (resultData.result.code_info.ghs_.length > 0) {
            var ghs = resultData.result.code_info.ghs_;
            var gus = resultData.result.code_info.gus_;
            $("#concept-search .wk-hot-table tbody").html(common.buildHotmapTable(ghs, "concept"));
            maptable = Utility.buildMapTable(gus);
            $("#concept-search .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "concept"));
            $("#concept-search .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "concept"));
            common.buildHotmap("wk-concept-search-treemap", maptable._map, "concept");
        }
        if (resultData.result.code_info.ghf_.length > 0) {
            var ghf = resultData.result.code_info.ghf_;
            var guf = resultData.result.code_info.guf_;
            $("#concept-follow .wk-hot-table tbody").html(common.buildHotmapTable(ghf, "concept"));
            maptable = Utility.buildMapTable(guf);
            $("#concept-follow .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "concept"));
            $("#concept-follow .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "concept"));
            common.buildHotmap("wk-concept-follow-treemap", maptable._map, "concept");
        }

        if (resultData.result.code_info.ehv_.length > 0) {
            var ehv = resultData.result.code_info.ehv_;
            var euv = resultData.result.code_info.euv_;
            $("#event-view .wk-hot-table tbody").html(common.buildHotmapTable(ehv, "event"));
            maptable = Utility.buildMapTable(euv);
            $("#event-view .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "event"));
            $("#event-view .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "event"));
            common.buildHotmap("wk-event-view-treemap", maptable._map, "event");
        }
        if (resultData.result.code_info.ehs_.length > 0) {
            var ehs = resultData.result.code_info.ehs_;
            var eus = resultData.result.code_info.eus_;
            $("#event-search .wk-hot-table tbody").html(common.buildHotmapTable(ehs, "event"));
            maptable = Utility.buildMapTable(eus);
            $("#event-search .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "event"));
            $("#event-search .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "event"));
            common.buildHotmap("wk-event-search-treemap", maptable._map, "event");
        }
        if (resultData.result.code_info.ehf_.length > 0) {
            var ehf = resultData.result.code_info.ehf_;
            var euf = resultData.result.code_info.euf_;
            $("#event-follow .wk-hot-table tbody").html(common.buildHotmapTable(ehf, "event"));
            maptable = Utility.buildMapTable(euf);
            $("#event-follow .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "event"));
            $("#event-follow .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "event"));
            common.buildHotmap("wk-event-follow-treemap", maptable._map, "event");
        }
    }

    function initTimeLine() {
        common.getRealTimeHot({"hour_data": "index"}, null, function (resultData) {
            if (resultData.status === 1) {
                var todayHot = [];
                if (resultData.visit) {
                    for (var v in resultData.visit) {
                        if (resultData.visit.hasOwnProperty(v)) {
                            viewData.push(resultData.visit[v]);
                        }
                    }
                    viewData = JSON.parse("[" + viewData.join(',') + "]");
                    var _v = Math.max.apply(Math, viewData);
                    var vindex = viewData.indexOf(Math.max.apply(Math, viewData));
                    todayHot.push("<tr><td>查看</td><td>" + _v + "</td><td>" + Utility.calTime(vindex) + "</td></tr>");
                }
                if (resultData.search) {
                    for (var s in resultData.search) {
                        if (resultData.search.hasOwnProperty(s)) {
                            searchData.push(resultData.search[s]);
                        }
                    }
                    searchData = JSON.parse("[" + searchData.join(',') + "]");
                    var _s = Math.max.apply(Math, searchData);
                    var sindex = searchData.indexOf(Math.max.apply(Math, searchData));
                    todayHot.push("<tr><td>搜索</td><td>" + _s + "</td><td>" + Utility.calTime(sindex) + "</td></tr>");
                }
                if (resultData.follow) {
                    for (var f in resultData.follow) {
                        if (resultData.follow.hasOwnProperty(f)) {
                            followData.push(resultData.follow[f]);
                        }
                    }
                    followData = JSON.parse("[" + followData.join(',') + "]");
                    var _f = Math.max.apply(Math, followData);
                    var findex = followData.indexOf(Math.max.apply(Math, followData));
                    todayHot.push("<tr><td>关注</td><td>" + _f + "</td><td>" + Utility.calTime(findex) + "</td></tr>");
                }
                $(".todayhot").html(todayHot.join(''));
                common.getLineChart("left-chart", xdata, viewData, searchData, followData);
            }
        });
    }

    function initModalChart() {
        $(".modal-chart").modal("show");
        var modalChart = echarts.init(document.getElementById("modal-chart"));
        common.getRealTimeHot(null, function () {
            modalChart.showLoading({"text": "加载中..."});
        }, function (resultData) {
            modalChart.hideLoading();
            var modalViewData = [];
            var modalxData = [];
            if (resultData.status === 1) {
                if (resultData.visit) {
                    for (var v in resultData.visit) {
                        if (resultData.visit.hasOwnProperty(v)) {
                            modalViewData.push(resultData.visit[v]);
                            modalxData.push("\"" + Utility.numToTime(v) + "\"");
                        }
                    }
                    modalxData = JSON.parse("[" + modalxData.join(',') + "]");
                    modalViewData = JSON.parse("[" + modalViewData.sort(function(a,b){return a-b;}).join(',') + "]");
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
                                if (params.hasOwnProperty(p)) {
                                    if (params[p].value && params[p].value != 0) {
                                        if (params[0].name == params[p].name) {
                                            showLabel += "<label style='color: " + params[p].color + ";font-size: 14x;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + Utility.formatNum(params[p].value) + "<br>";
                                        }
                                    }
                                }
                            }
                            return showLabel;
                        }
                    },
                    dataZoom: [
                        {type: 'inside', realtime: true},
                        { type: 'slider', show: true, realtime: true }
                    ],
                    grid: {top: 10, left: 20, right: 20, bottom: 40, containLabel: true},
                    legend: {left: "left"},
                    xAxis: {type: "category", boundaryGap: false, data: modalxData},
                    yAxis: {type: "value", position: "right", scale: true},
                    calculable: false,
                    series: [ { name: "查看", type: "line", smooth: true, data: modalViewData } ]
                });
                myChart.hideLoading();
                window.onresize = myChart.resize
            }
        });
    }

    $('.wk-hotmap a[data-toggle="tab"]').on('shown.bs.tab', function () {
        initTreeMapChart();
    });
    $(".wk-line-toggle a").click(function () {
        $(this).addClass("line-active").siblings().removeClass("line-active");
        var queryType = $(this).parent().attr("data-query-type");
        var key = $(this).parent().attr("data-query-key");
        var timeType = $(this).attr("data-key");
        var arrData = {
            query_type: queryType,
            key_name: key,
            time_type: timeType
        };
        if (timeType === "minute") {
            initModalChart();
            return;
        }
        if (timeType === "day") {
            common.getLineChart("left-chart", xdata, viewData, searchData, followData);
        } else {
            common.getHotRecord(arrData, function () {
                var myChart = echarts.init(document.getElementById("left-chart"));
                myChart.showLoading({"text": "加载中..."});
            }, function (resultData) {
                var viewDataAll = [];
                var searchDataAll = [];
                var followDataAll = [];
                var xdataAll = [];
                if (resultData.status === 1) {
                    for (var v in resultData.visit) {
                        if (resultData.visit.hasOwnProperty(v)) {
                            var visit = resultData.visit[v];
                            for (var vv in visit) {
                                if (visit.hasOwnProperty(vv)) {
                                    xdataAll.push(vv);
                                    viewDataAll.push(visit[vv]);
                                }
                            }
                        }
                    }
                    for (var s in resultData.search) {
                        if (resultData.search.hasOwnProperty(s)) {
                            var search = resultData.search[s];
                            for (var ss in search) {
                                if (search.hasOwnProperty(ss)) {
                                    searchDataAll.push(search[ss]);
                                }
                            }
                        }
                    }
                    for (var f in resultData.follow) {
                        if (resultData.follow.hasOwnProperty(f)) {
                            var follow = resultData.follow[f];
                            for (var ff in follow) {
                                if (follow.hasOwnProperty(ff)) {
                                    followDataAll.push(follow[ff]);
                                }
                            }
                        }
                    }
                }
                common.getLineChart("left-chart", xdataAll, viewDataAll, searchDataAll, followDataAll);
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
    initTreeMapChart();
    initTimeLine();
})(jQuery, window, document);