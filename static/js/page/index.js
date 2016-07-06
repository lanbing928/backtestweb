var wk_treemap_data, viewData = [], searchData = [], followData = [];
var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];
var myLineChart = echarts.init(document.getElementById("left-chart"));
myLineChart.showLoading();
function initTreeMapChart() {
    if (!wk_treemap_data) {
        common.getTopTwentyStock(null, function () {
            var waitLogingCharts = ["wk-stock-view-treemap", "wk-industry-view-treemap", "wk-concept-view-treemap"];
            for (var i in waitLogingCharts) {
                var treemap = echarts.init(document.getElementById(waitLogingCharts[i]));
                treemap.showLoading();
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
        $("#hot-view-stock").html("<a class='" + Utility.getPriceColor(_shv[0].price) + "' href='stocks.php?stock=" + _shv[0].code + "' target='_blank'>" + _shv[0].name + "(" + _shv[0].code + ")</a>");
        $("#stock-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
        $("#stock-view .right .wk-treemap-table tbody").html(common.buildStockTable(_suv));
        common.buildHotmap("wk-stock-view-treemap", _suv, "stock");
    }
    if (resultData.result.code_info.shs_.length > 0) {
        var _shs = resultData.result.code_info.shs_;
        var _sus = resultData.result.code_info.sus_;
        $("#hot-search-stock").html("<a class='" + Utility.getPriceColor(_shs[0].price) + "' href='stocks.php?stock=" + _shs[0].code + "' target='_blank'>" + _shs[0].name + "(" + _shs[0].code + ")</a>");
        $("#stock-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
        $("#stock-search .right .wk-treemap-table tbody").html(common.buildStockTable(_sus));
        common.buildHotmap("wk-stock-search-treemap", _sus, "stock");
    }
    if (resultData.result.code_info.shf_.length > 0) {
        var _shf = resultData.result.code_info.shf_;
        var _suf = resultData.result.code_info.suf_;
        $("#hot-follow-stock").html("<a class='" + Utility.getPriceColor(_shf[0].price) + "' href='stocks.php?stock=" + _shf[0].code + "' target='_blank'>" + _shf[0].name + "(" + _shf[0].code + ")</a>");
        $("#stock-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
        $("#stock-follow .right .wk-treemap-table tbody").html(common.buildStockTable(_suf));
        common.buildHotmap("wk-stock-follow-treemap", _suf, "stock");
    }
    if (resultData.result.code_info.hhv_.length > 0) {
        var _hhv = resultData.result.code_info.hhv_;
        var _huv = resultData.result.code_info.huv_;
        $("#industry-view .wk-hot-table tbody").html(common.buildHotmapTable(_hhv, "industry"));
        $("#industry-view .right .wk-treemap-table tbody").html(common.buildOtherTable(_huv, "industry"));
        common.buildHotmap("wk-industry-view-treemap", _huv, "industry");
    }
    if (resultData.result.code_info.hhs_.length > 0) {
        var _hhs = resultData.result.code_info.hhs_;
        var _hus = resultData.result.code_info.hus_;
        $("#industry-search .wk-hot-table tbody").html(common.buildHotmapTable(_hhs, "industry"));
        $("#industry-search .right .wk-treemap-table tbody").html(common.buildOtherTable(_hus, "industry"));
        common.buildHotmap("wk-industry-search-treemap", _hus, "industry");
    }
    if (resultData.result.code_info.hhf_.length > 0) {
        var _hhf = resultData.result.code_info.hhf_;
        var _huf = resultData.result.code_info.huf_;
        $("#industry-follow .wk-hot-table tbody").html(common.buildHotmapTable(_hhf, "industry"));
        $("#industry-follow .right .wk-treemap-table tbody").html(common.buildOtherTable(_huf, "industry"));
        common.buildHotmap("wk-industry-follow-treemap", _huf, "industry");
    }
    if (resultData.result.code_info.ghv_.length > 0) {
        var _ghv = resultData.result.code_info.ghv_;
        var _guv = resultData.result.code_info.guv_;
        $("#concept-view .wk-hot-table tbody").html(common.buildHotmapTable(_ghv, "concept"));
        $("#concept-view .right .wk-treemap-table tbody").html(common.buildOtherTable(_guv, "concept"));
        common.buildHotmap("wk-concept-view-treemap", _guv, "concept");
    }
    if (resultData.result.code_info.ghs_.length > 0) {
        var _ghs = resultData.result.code_info.ghs_;
        var _gus = resultData.result.code_info.gus_;
        $("#concept-search .wk-hot-table tbody").html(common.buildHotmapTable(_ghs, "concept"));
        $("#concept-search .right .wk-treemap-table tbody").html(common.buildOtherTable(_gus, "concept"));
        common.buildHotmap("wk-concept-search-treemap", _gus, "concept");
    }
    if (resultData.result.code_info.ghf_.length > 0) {
        var _ghf = resultData.result.code_info.ghf_;
        var _guf = resultData.result.code_info.guf_;
        $("#concept-follow .wk-hot-table tbody").html(common.buildHotmapTable(_ghf, "concept"));
        $("#concept-follow .right .wk-treemap-table tbody").html(common.buildOtherTable(_guf, "concept"));
        common.buildHotmap("wk-concept-follow-treemap", _guf, "concept");
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
$(function () {
    initTreeMapChart();
    initTimeLine();
});