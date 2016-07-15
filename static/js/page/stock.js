//获取传过来的股票代码
var stockcode = Utility.getQueryStringByName("stock");
var _stockName = "";
var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];
var viewData = [],
    searchData = [],
    followData = [];
var wk_treemap_data_industry, wk_treemap_data_concept;
var myChart = echarts.init(document.getElementById("left-chart"));
myChart.showLoading({
    "text": "加载中..."
});

function initLineChart() {
    common.getSingleRealTimeHot({
        "stock": stockcode
    }, null, function (resultData) {
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
    common.getStockBase({
        "stock": stockcode
    }, function () {
        var waitLogingCharts = ["wk-industry-view-treemap", "wk-concept-view-treemap"];
        for (var i in waitLogingCharts) {
            var treemap = echarts.init(document.getElementById(waitLogingCharts[i]));
            treemap.showLoading({
                "text": "加载中..."
            });
        }
    }, function (resultData) {
        if (resultData.status == 1) {
            var rel_industry = resultData.stock_info.industry;
            var rel_concept = resultData.stock_info.section;
            var rel_indus_link = "";
            var rel_con_link = "";
            if (rel_industry.length > 0) {
                $(".hy-title").html(rel_industry[0].indus + "行业热度情况");
                for (var i in rel_industry) {
                    rel_indus_link += "<a href='industry.php?name=" + rel_industry[i].indus + "' target='_blank'>" + rel_industry[i].indus + "</a>";
                }
            }
            if (rel_concept.length > 0) {
                $(".gn-title").html(rel_concept[0].sect + "概念热度情况");
                for (var i in rel_concept) {
                    rel_con_link += "<a href='concept.php?name=" + rel_concept[i].sect + "' target='_blank'>" + rel_concept[i].sect + "</a>"
                }
            }
            _stockName = resultData.stock_info.stock_name;
            $("title").html(resultData.stock_info.stock_name + "(" + resultData.stock_info.stock_code + ")热度情况");
            $(".wk-related-info").html(resultData.stock_info.stock_name + "热度情况&nbsp;<i class=\"fa fa-question-circle-o\" data-toggle=\"popover\" data-content=\"" + resultData.stock_info.stock_name + "每小时产生的热度量\"></i><span>行业：" + rel_indus_link + "</span><span>概念：" + rel_con_link + "");
            $(".latesthot-title").html(resultData.stock_info.stock_name + "最近热度");
            $(".todayhot-title").html(resultData.stock_info.stock_name + "今日最热度");
            $("i[data-toggle='popover']").popover({
                container: "body",
                trigger: "hover"
            });
            var $related_concept = rel_concept[0].sect;
            var $related_industry = rel_industry[0].indus;
            if (!wk_treemap_data_concept) {
                common.getTopTwentyStock({
                    "hottype": "gn",
                    "hotval": $related_concept
                }, function () {
                    $("#concept-view .wk-hot-table tbody").html("<tr><td colspan='5'>加载中...</td></tr>");
                }, function (resultData) {
                    if (resultData.status == 1) {
                        buildConceptTreeMap(resultData);
                        wk_treemap_data_concept = resultData;
                    }
                });
            } else {
                buildConceptTreeMap(wk_treemap_data_concept);
            }
            if (!wk_treemap_data_industry) {
                common.getTopTwentyStock({
                    "hottype": "hy",
                    "hotval": $related_industry
                }, function () {
                    $("#industry-view .wk-hot-table tbody").html("<tr><td colspan='5'>加载中...</td></tr>");
                }, function (resultData) {
                    if (resultData.status == 1) {
                        buildIndustryTreeMap(resultData);
                        wk_treemap_data_industry = resultData;
                    }
                });
            } else {
                buildIndustryTreeMap(wk_treemap_data_industry);
            }
            initTodayRateLine();
            initFollowBtn();
        }
    });
}

function buildIndustryTreeMap(resultData) {
    if (resultData.result.code_info.shv_.length > 0) {
        var _shv = resultData.result.code_info.shv_;
        var _suv = resultData.result.code_info.suv_;
        $("#industry-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
        $("#industry-view .right .wk-treemap-table tbody").html(common.buildStockTable(_suv));
        common.buildHotmap("wk-industry-view-treemap", _suv, "stock");
    }
    if (resultData.result.code_info.shs_.length > 0) {
        var _shs = resultData.result.code_info.shs_;
        var _sus = resultData.result.code_info.sus_;
        $("#industry-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
        $("#industry-search .right .wk-treemap-table tbody").html(common.buildStockTable(_sus));
        common.buildHotmap("wk-industry-search-treemap", _sus, "stock");
    }
    if (resultData.result.code_info.shf_.length > 0) {
        var _shf = resultData.result.code_info.shf_;
        var _suf = resultData.result.code_info.suf_;
        $("#industry-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
        $("#industry-follow .right .wk-treemap-table tbody").html(common.buildStockTable(_suf));
        common.buildHotmap("wk-industry-follow-treemap", _suf, "stock");
    }
}

function buildConceptTreeMap(resultData) {
    if (resultData.result.code_info.shv_.length > 0) {
        var _shv = resultData.result.code_info.shv_;
        var _suv = resultData.result.code_info.suv_;
        $("#concept-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
        $("#concept-view .right .wk-treemap-table tbody").html(common.buildStockTable(_suv));
        common.buildHotmap("wk-concept-view-treemap", _suv, "stock");
    }
    if (resultData.result.code_info.shs_.length > 0) {
        var _shs = resultData.result.code_info.shs_;
        var _sus = resultData.result.code_info.sus_;
        $("#concept-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
        $("#concept-search .right .wk-treemap-table tbody").html(common.buildStockTable(_sus));
        common.buildHotmap("wk-concept-search-treemap", _sus, "stock");
    }
    if (resultData.result.code_info.shf_.length > 0) {
        var _shf = resultData.result.code_info.shf_;
        var _suf = resultData.result.code_info.suf_;
        $("#concept-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
        $("#concept-follow .right .wk-treemap-table tbody").html(common.buildStockTable(_suf));
        common.buildHotmap("wk-concept-follow-treemap", _suf, "stock");
    }
}

function initTodayRateLine() {
    var rateLine = echarts.init(document.getElementById("wk-rate-line-pic"));
    var queryData = {
        "query_type": "stock",
        "query_key": stockcode,
        "query_date": "today"
    };
    common.getRateLine(queryData, function () {
        rateLine.showLoading({
            "text": "加载中..."
        });
    }, function (resultData) {
        common.buildRateLine(_stockName, "today", resultData);
        rateLine.hideLoading();
    });
}

function initFollowBtn() {
    inforcenter.showGroup(null, function (resultData) {
        if (resultData && resultData.status == 1) {
            var followBtnHtml = [];
            followBtnHtml.push("<div class=\"btn-group\" style='float: right;'>");
            followBtnHtml.push("<button type=\"button\" class=\"btn dropdown-toggle wk-btn-follow\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">");
            followBtnHtml.push("+ 关注");
            followBtnHtml.push("</button>");
            if (resultData.result.info.group_name.length > 0) {
                followBtnHtml.push("<ul class=\"dropdown-menu\">");
                var list = resultData.result.info.group_name;
                followBtnHtml.push("<li class='wk-follow-stock' data-follow-name='我的自选股'><a href=\"#\">我的自选股</a></li>");
                for (var i = 0; i < list.length; i++) {
                    followBtnHtml.push("<li class='wk-follow-stock' data-follow-name='" + list[i] + "'><a href=\"#\">" + list[i] + "</a></li>");
                }
                followBtnHtml.push("</ul>");
            }
            followBtnHtml.push("</div>");
            $(".wk-related-info").append(followBtnHtml.join(''));
            $(".wk-follow-stock").each(function () {
                var follow_name = $(this).attr("data-follow-name");
                $(this).unbind("click").bind("click", function () {
                    inforcenter.addStock({ori_name: follow_name, code: stockcode}, null, function (addResult) {
                        if (addResult.status == 1) {
                            swal({
                                title: "",
                                text: "关注个股<span style='color: #F8BB86'>" + stockcode + "</span>成功",
                                html: true,
                                timer: 1000,
                                showConfirmButton: false
                            });
                        } else if (addResult.status == 0) {
                            swal({
                                title: "",
                                text: "关注个股<span style='color: #F8BB86'>" + stockcode + "</span>异常," + resultData.msg + "",
                                html: true,
                                timer: 1000,
                                showConfirmButton: false
                            });
                        } else {
                            swal({
                                title: "",
                                text: "关注个股<span style='color: #F8BB86'>" + stockcode + "</span>异常,未知原因",
                                html: true,
                                timer: 1000,
                                showConfirmButton: false
                            });
                        }
                    })
                })
            })
        }
    })
}
$(function () {
    var arrData = {
        query_type: 1,
        key: stockcode,
        start_id: 0,
        info_type_list: "",
        "start_time": 0
    };
    $(".nav-tabs li a").bind("click", function () {
        if ($(this).attr("href").indexOf("#wk-selfmedia") == 0) {
            if ($("#mCSB_2_container").html().trim() == "") {
                arrData.start_id = 0;
                arrData.start_time = 0;
                common.getSelfMedia(arrData);
            }
        }
        if ($(this).attr("href").indexOf("#wk-newsflash") == 0) {
            if ($("#wk-newsflash table>tbody").html().trim() == "") {
                arrData.start_id = 0;
                arrData.start_time = 0;
                common.getFastNews(arrData);
            }
        }
        if ($(this).attr("href").indexOf("#wk-notice") == 0) {
            if ($("#mCSB_4_container").html().trim() == "") {
                arrData.start_id = 0;
                common.getNotice(arrData);
            }
        }
    });
    $("#wk-news").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
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
            onTotalScroll: function () {
                arrData.start_id = $("#wk-selfmedia .wk-news-list:last").attr("id").replace("media_", "");
                arrData.info_type_list = "0,0,1,0,0,0";
                arrData.timestamp = $("#wk-selfmedia .wk-news-list:last").attr("data-media-timestamp");
                common.getSelfMedia(arrData);
            }
        }
    });
    $("#wk-newsflash").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                arrData.start_id = $("#wk-newsflash .wk-user-fastnews:last-child").find("ul li:last-child").attr("id").replace("fast_", "");
                arrData.info_type_list = "0,1,0,0,0,0";
                arrData.timestamp = $("#wk-newsflash  .wk-user-fastnews:last-child").find("ul li:last-child").attr("data-fastnews-timestamp");
                common.getFastNews(arrData);
            }
        }
    });
    $("#wk-notice").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                arrData.start_id = $("#wk-notice .wk-news-list:last").attr("id").replace("notice_", "");
                arrData.info_type_list = "0,0,0,0,0,0,1";
                arrData.timestamp = $("#wk-notice .wk-news-list:last").attr("data-news-timestamp");
                common.getNotice(arrData);
            }
        }
    });
    common.initRelateSHG(1, stockcode);
    common.getNews(arrData);
    initLineChart();
    initTreeMapChart();
});