"use strict";
(function ($, window, document) {
    var wk_treemap_data, viewData = [],
        searchData = [],
        followData = [];
    var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];
    var myLineChart = echarts.init(document.getElementById("left-chart"));
    myLineChart.showLoading({
        "text": "加载中..."
    });

    function initTreeMapChart() {
        if (!wk_treemap_data) {
            common.getTopTwentyStock(null, function () {
                var waitLogingCharts = ["wk-stock-view-treemap", "wk-industry-view-treemap", "wk-concept-view-treemap", "wk-event-view-treemap"];
                for (var i in waitLogingCharts) {
                    var treemap = echarts.init(document.getElementById(waitLogingCharts[i]));
                    treemap.showLoading({
                        "text": "加载中..."
                    });
                }
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
            $("#hot-view-stock").html("<a class='" + Utility.getPriceColor(_shv[0].mark_z_d) + "' href='stocks.php?stock=" + _shv[0].code + "' target='_blank'>" + _shv[0].name + "(" + _shv[0].code + ")</a>");
            $("#stock-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
            var maptable = Utility.buildMapTable(_suv);
            $("#stock-view .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#stock-view .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-view-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shs_.length > 0) {
            var _shs = resultData.result.code_info.shs_;
            var _sus = resultData.result.code_info.sus_;
            $("#hot-search-stock").html("<a class='" + Utility.getPriceColor(_shs[0].mark_z_d) + "' href='stocks.php?stock=" + _shs[0].code + "' target='_blank'>" + _shs[0].name + "(" + _shs[0].code + ")</a>");
            $("#stock-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
            var maptable = Utility.buildMapTable(_sus);
            $("#stock-search .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#stock-search .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-search-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shf_.length > 0) {
            var _shf = resultData.result.code_info.shf_;
            var _suf = resultData.result.code_info.suf_;
            $("#hot-follow-stock").html("<a class='" + Utility.getPriceColor(_shf[0].mark_z_d) + "' href='stocks.php?stock=" + _shf[0].code + "' target='_blank'>" + _shf[0].name + "(" + _shf[0].code + ")</a>");
            $("#stock-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
            var maptable = Utility.buildMapTable(_suf);
            $("#stock-follow .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#stock-follow .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-stock-follow-treemap", maptable._map, "stock");
        }

        if (resultData.result.code_info.hhv_.length > 0) {
            var _hhv = resultData.result.code_info.hhv_;
            var _huv = resultData.result.code_info.huv_;
            $("#industry-view .wk-hot-table tbody").html(common.buildHotmapTable(_hhv, "industry"));
            var maptable = Utility.buildMapTable(_huv);
            $("#industry-view .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "industry"));
            $("#industry-view .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "industry"));
            common.buildHotmap("wk-industry-view-treemap", maptable._map, "industry");
        }
        if (resultData.result.code_info.hhs_.length > 0) {
            var _hhs = resultData.result.code_info.hhs_;
            var _hus = resultData.result.code_info.hus_;
            $("#industry-search .wk-hot-table tbody").html(common.buildHotmapTable(_hhs, "industry"));
            var maptable = Utility.buildMapTable(_hus);
            $("#industry-search .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "industry"));
            $("#industry-search .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "industry"));
            common.buildHotmap("wk-industry-search-treemap", maptable._map, "industry");
        }
        if (resultData.result.code_info.hhf_.length > 0) {
            var _hhf = resultData.result.code_info.hhf_;
            var _huf = resultData.result.code_info.huf_;
            $("#industry-follow .wk-hot-table tbody").html(common.buildHotmapTable(_hhf, "industry"));
            var maptable = Utility.buildMapTable(_huf);
            $("#industry-follow .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "industry"));
            $("#industry-follow .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "industry"));
            common.buildHotmap("wk-industry-follow-treemap", maptable._map, "industry");
        }

        if (resultData.result.code_info.ghv_.length > 0) {
            var _ghv = resultData.result.code_info.ghv_;
            var _guv = resultData.result.code_info.guv_;
            $("#concept-view .wk-hot-table tbody").html(common.buildHotmapTable(_ghv, "concept"));
            var maptable = Utility.buildMapTable(_guv);
            $("#concept-view .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "concept"));
            $("#concept-view .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "concept"));
            common.buildHotmap("wk-concept-view-treemap", maptable._map, "concept");
        }
        if (resultData.result.code_info.ghs_.length > 0) {
            var _ghs = resultData.result.code_info.ghs_;
            var _gus = resultData.result.code_info.gus_;
            $("#concept-search .wk-hot-table tbody").html(common.buildHotmapTable(_ghs, "concept"));
            var maptable = Utility.buildMapTable(_gus);
            $("#concept-search .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "concept"));
            $("#concept-search .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "concept"));
            common.buildHotmap("wk-concept-search-treemap", maptable._map, "concept");
        }
        if (resultData.result.code_info.ghf_.length > 0) {
            var _ghf = resultData.result.code_info.ghf_;
            var _guf = resultData.result.code_info.guf_;
            $("#concept-follow .wk-hot-table tbody").html(common.buildHotmapTable(_ghf, "concept"));
            var maptable = Utility.buildMapTable(_guf);
            $("#concept-follow .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "concept"));
            $("#concept-follow .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "concept"));
            common.buildHotmap("wk-concept-follow-treemap", maptable._map, "concept");
        }

        if (resultData.result.code_info.ehv_.length > 0) {
            var _ehv = resultData.result.code_info.ehv_;
            var _euv = resultData.result.code_info.euv_;
            $("#event-view .wk-hot-table tbody").html(common.buildHotmapTable(_ehv, "event"));
            var maptable = Utility.buildMapTable(_euv);
            $("#event-view .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "event"));
            $("#event-view .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "event"));
            common.buildHotmap("wk-event-view-treemap", maptable._map, "event");
        }
        if (resultData.result.code_info.ehs_.length > 0) {
            var _ehs = resultData.result.code_info.ehs_;
            var _eus = resultData.result.code_info.eus_;
            $("#event-search .wk-hot-table tbody").html(common.buildHotmapTable(_ehs, "event"));
            var maptable = Utility.buildMapTable(_eus);
            $("#event-search .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "event"));
            $("#event-search .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "event"));
            common.buildHotmap("wk-event-search-treemap", maptable._map, "event");
        }
        if (resultData.result.code_info.ehf_.length > 0) {
            var _ehf = resultData.result.code_info.ehf_;
            var _euf = resultData.result.code_info.euf_;
            $("#event-follow .wk-hot-table tbody").html(common.buildHotmapTable(_ehf, "event"));
            var maptable = Utility.buildMapTable(_euf);
            $("#event-follow .right .toggle-treemap-table-up tbody").html(common.buildOtherTable(maptable._up, "event"));
            $("#event-follow .right .toggle-treemap-table-down tbody").html(common.buildOtherTable(maptable._down, "event"));
            common.buildHotmap("wk-event-follow-treemap", maptable._map, "event");
        }
    }

    function initTimeLine() {
        common.getRealTimeHot(null, null, function (resultData) {
            if (resultData.status == 1) {
                var _todayHot = [];
                if (resultData.visit) {
                    for (var v in resultData.visit) {
                        viewData.push(resultData.visit[v]);
                    }
                    viewData = JSON.parse("[" + viewData.join(',') + "]");
                    var _v = Math.max.apply(Math, viewData);
                    var _vindex = viewData.indexOf(Math.max.apply(Math, viewData));
                    _todayHot.push("<tr><td>查看</td><td>" + _v + "</td><td>" + Utility.calTime(_vindex) + "</td></tr>");
                }
                if (resultData.search) {
                    for (var s in resultData.search) {
                        searchData.push(resultData.search[s]);
                    }
                    searchData = JSON.parse("[" + searchData.join(',') + "]");
                    var _s = Math.max.apply(Math, searchData);
                    var _sindex = searchData.indexOf(Math.max.apply(Math, searchData));
                    _todayHot.push("<tr><td>搜索</td><td>" + _s + "</td><td>" + Utility.calTime(_sindex) + "</td></tr>");
                }
                if (resultData.follow) {
                    for (var f in resultData.follow) {
                        followData.push(resultData.follow[f]);
                    }
                    followData = JSON.parse("[" + followData.join(',') + "]");
                    var _f = Math.max.apply(Math, followData);
                    var _findex = followData.indexOf(Math.max.apply(Math, followData));
                    _todayHot.push("<tr><td>关注</td><td>" + _f + "</td><td>" + Utility.calTime(_findex) + "</td></tr>");
                }
                $(".todayhot").html(_todayHot.join(''));
                common.getLineChart("left-chart", xdata, viewData, searchData, followData);
            }
        });
    }
    $('.wk-hotmap a[data-toggle="tab"]').on('shown.bs.tab', function () {
        initTreeMapChart();
    });
    initTreeMapChart();
    initTimeLine();
})(jQuery, window, document);