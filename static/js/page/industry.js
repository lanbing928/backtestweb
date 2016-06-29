var name = Utility.getQueryStringByName("name");
var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];
var wk_treemap_data, viewData = [], searchData = [], followData = [];
var myChart = echarts.init(document.getElementById("left-chart"));
myChart.showLoading();
function initLineChart() {
    common.getHyAndGnHot({"name": name, "query_type": 1}, null, function (resultData) {
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
        common.getTopTwentyStock({"hottype": "hy", "hotval": name}, function () {
            var treemap = echarts.init(document.getElementById("wk-stock-view-treemap"));
            treemap.showLoading();
            $("#industry-view .wk-hot-table tbody").html("<tr><td colspan='5'>加载中...</td></tr>");
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
        $("#industry-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
        $("#industry-view .right .wk-treemap-table tbody").html(common.buildStockTable(_suv));
        common.buildHotmap("wk-stock-view-treemap", _suv, "stock");
    }
    if (resultData.result.code_info.shs_.length > 0) {
        var _shs = resultData.result.code_info.shs_;
        var _sus = resultData.result.code_info.sus_;
        $("#industry-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
        $("#industry-search .right .wk-treemap-table tbody").html(common.buildStockTable(_sus));
        common.buildHotmap("wk-stock-search-treemap", _sus, "stock");
    }
    if (resultData.result.code_info.shf_.length > 0) {
        var _shf = resultData.result.code_info.shf_;
        var _suf = resultData.result.code_info.suf_;
        $("#industry-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
        $("#industry-follow .right .wk-treemap-table tbody").html(common.buildStockTable(_suf));
        common.buildHotmap("wk-stock-follow-treemap", _suf, "stock");
    }
}
$(function () {
    var arrData = {query_type: 2, key: name, start_id: 0, info_type_list: "", "start_time": 0};
    $(".nav-tabs li a").bind("click", function () {
        if ($(this).attr("href").indexOf("#wk-selfmedia") == 0) {
            if ($("#mCSB_2_container").html().trim() == "") {
                arrData.start_id = 0;
                common.getSelfMedia(arrData);
            }
        }
        if ($(this).attr("href").indexOf("#wk-newsflash") == 0) {
            if ($("#wk-newsflash table>tbody").html().trim() == "") {
                arrData.start_id = 0;
                common.getFastNews(arrData);
            }
        }
    });
    $("#wk-news").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScrollOffset: 150,
            onTotalScroll: function () {
                arrData.start_id = $("#wk-news .wk-news-list:last").attr("id").replace("news_", "");
                arrData.info_type_list = "1,0,0,0,0,0";
                arrData.timestamp = $("#wk-news .wk-news-list:last").attr("data-news-timestamp");
                common.getNews(arrData);
            }
        }
    });
    $("#wk-selfmedia").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScrollOffset: 150,
            onTotalScroll: function () {
                arrData.start_id = $("#wk-selfmedia .wk-news-list:last").attr("id").replace("media_", "");
                arrData.info_type_list = "0,0,1,0,0,0";
                arrData.timestamp = $("#wk-selfmedia .wk-news-list:last").attr("data-news-timestamp");
                common.getSelfMedia(arrData);
            }
        }
    });
    $("#wk-newsflash").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScrollOffset: 150,
            onTotalScroll: function () {
                arrData.start_id = $("#wk-newsflash .wk-news-list tr:last").attr("id").replace("fast_", "");
                arrData.info_type_list = "0,1,0,0,0,0";
                arrData.timestamp = $("#wk-newsflash .wk-news-list:last").attr("data-news-timestamp");
                common.getFastNews(arrData);
            }
        }
    });
    common.initRelateSHG(2, name);
    common.getNews(arrData);
    initLineChart();
    initTreeMapChart();
});
