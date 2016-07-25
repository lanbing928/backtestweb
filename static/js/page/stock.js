"use strict";
(function ($, window, document) {
    //获取传过来的股票代码
    var _stockcode = Utility.getQueryStringByName("stock");
    var _stockName = "";
    var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];
    var viewData = [],
        searchData = [],
        followData = [],
        timeData = [],
        newsData = [],
        sentiData = [];
    var wk_treemap_data_industry, wk_treemap_data_concept;
    var query_type = Utility.getQueryStringByName("query_type");//
    var key_name = _stockcode + 's';
    var myChart = echarts.init(document.getElementById("left-chart"));
    var twoLineChart = echarts.init(document.getElementById("left-double-chart"));
    myChart.showLoading({"text": "加载中..."});
    twoLineChart.showLoading({"text": "加载中..."});
    /**
     * 构建股票页面查看更多的a标签
     * @param a 查看、搜索、关注
     * @param b 股票、行业、概念、事件
     * @param c
     * @param d 名称
     * @returns {string}
     */
    function buildRankAtag(a, b, c, d) {
        return "<a href='hotrank.php?key=" + a + "," + b + "," + c + "," + d + "' class='wk-view-more' target='_blank'>更多&nbsp;<i class='fa fa-angle-double-right'></i></a>";
    }

    /**
     * 初始化热度总览折线图
     */
    function initLineChart() {
        common.getSingleRealTimeHot({
            "stock": _stockcode
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

    /**
     * 初始化热力图
     */
    function initTreeMapChart() {
        common.getStockBase({
            "stock": _stockcode
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
                    for (var j in rel_concept) {
                        rel_con_link += "<a href='concept.php?name=" + rel_concept[j].sect + "' target='_blank'>" + rel_concept[j].sect + "</a>";
                    }
                }
                if ($("#industry-view").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                    $("#industry-view").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(1, 2, 2, rel_industry[0].indus));
                }
                if ($("#industry-search").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                    $("#industry-search").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(2, 2, 2, rel_industry[0].indus));
                }
                if ($("#industry-follow").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                    $("#industry-follow").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(3, 2, 2, rel_industry[0].indus));
                }
                if ($("#concept-view").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                    $("#concept-view").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(1, 3, 2, rel_concept[0].sect));
                }
                if ($("#concept-search").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                    $("#concept-search").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(2, 3, 2, rel_concept[0].sect));
                }
                if ($("#concept-follow").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                    $("#concept-follow").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(3, 3, 2, rel_concept[0].sect));
                }
                _stockName = resultData.stock_info.stock_name;
                $(".wk-toshow-name").html(_stockName + "(" + _stockcode + ")");
                Utility.getSinaStockData(_stockcode, function (stockData) {
                    var _stock_status = Utility.getStockStatus(stockData);

                    $(".wk-topshow-price").html("¥" + _stock_status.price).addClass(Utility.getUpDownColor(_stock_status.updown));
                    $(".wk-topshow-price-per").html(Utility.getPriceSymbol(_stock_status.updown) + _stock_status.updown.toFixed(2) + "(" + Utility.getPriceSymbol(_stock_status.updown) + _stock_status.percent.toFixed(2) + "%)").addClass(Utility.getUpDownColor(_stock_status.percent));
                });
                $(".wk-topshow-dp label").html(Utility.getTradeTime()).addClass("wk-up");
                $("title").html(resultData.stock_info.stock_name + "(" + resultData.stock_info.stock_code + ")热度情况");
                $(".wk-related-info").html("热度总览&nbsp;<i class=\"fa fa-question-circle-o\" data-toggle=\"popover\" data-content=\"" + resultData.stock_info.stock_name + "每小时产生的热度量\"></i><span>行业：" + rel_indus_link + "</span><span>概念：" + rel_con_link + "");
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
                initReleatedInfo();
            }
        });
    }

    /**
     * 构建行业热力图
     * @param resultData
     */
    function buildIndustryTreeMap(resultData) {
        if (resultData.result.code_info.shv_.length > 0) {
            var _shv = resultData.result.code_info.shv_;
            var _suv = resultData.result.code_info.suv_;
            $("#industry-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
            var maptable = Utility.buildMapTable(_suv);
            $("#industry-view .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#industry-view .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-industry-view-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shs_.length > 0) {
            var _shs = resultData.result.code_info.shs_;
            var _sus = resultData.result.code_info.sus_;
            $("#industry-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
            var maptable = Utility.buildMapTable(_sus);
            $("#industry-search .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#industry-search .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-industry-search-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shf_.length > 0) {
            var _shf = resultData.result.code_info.shf_;
            var _suf = resultData.result.code_info.suf_;
            $("#industry-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
            var maptable = Utility.buildMapTable(_suf);
            $("#industry-follow .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#industry-follow .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-industry-follow-treemap", maptable._map, "stock");
        }
    }

    /**
     * 构建概念热力图
     * @param resultData
     */
    function buildConceptTreeMap(resultData) {
        if (resultData.result.code_info.shv_.length > 0) {
            var _shv = resultData.result.code_info.shv_;
            var _suv = resultData.result.code_info.suv_;
            $("#concept-view .wk-hot-table tbody").html(common.buildHotmapTable(_shv, "stock"));
            var maptable = Utility.buildMapTable(_suv);
            $("#concept-view .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#concept-view .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-concept-view-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shs_.length > 0) {
            var _shs = resultData.result.code_info.shs_;
            var _sus = resultData.result.code_info.sus_;
            $("#concept-search .wk-hot-table tbody").html(common.buildHotmapTable(_shs, "stock"));
            var maptable = Utility.buildMapTable(_sus);
            $("#concept-search .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#concept-search .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-concept-search-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shf_.length > 0) {
            var _shf = resultData.result.code_info.shf_;
            var _suf = resultData.result.code_info.suf_;
            $("#concept-follow .wk-hot-table tbody").html(common.buildHotmapTable(_shf, "stock"));
            var maptable = Utility.buildMapTable(_suf);
            $("#concept-follow .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#concept-follow .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-concept-follow-treemap", maptable._map, "stock");
        }
    }

    /**
     * 初始化热度趋势
     */
    function initTodayRateLine() {
        var rateLine = echarts.init(document.getElementById("wk-rate-line-pic"));
        var queryData = {
            "query_type": "stock",
            "query_key": _stockcode,
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

    /**
     * 初始化关注按钮
     */
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
                $(".wk-topshow-right").append(followBtnHtml.join(''));
                $(".wk-follow-stock").each(function () {
                    var follow_name = $(this).attr("data-follow-name");
                    $(this).unbind("click").bind("click", function () {
                        inforcenter.addStock({ori_name: follow_name, code: _stockcode}, null, function (addResult) {
                            if (addResult.status == 1) {
                                swal({
                                    title: "",
                                    text: "关注个股<span style='color: #F8BB86'>" + _stockcode + "</span>成功",
                                    html: true,
                                    timer: 1000,
                                    showConfirmButton: false
                                });
                            } else if (addResult.status === 0) {
                                swal({
                                    title: "",
                                    text: "关注个股<span style='color: #F8BB86'>" + _stockcode + "</span>异常," + resultData.msg + "",
                                    html: true,
                                    timer: 1000,
                                    showConfirmButton: false
                                });
                            } else {
                                swal({
                                    title: "",
                                    text: "关注个股<span style='color: #F8BB86'>" + _stockcode + "</span>异常,未知原因",
                                    html: true,
                                    timer: 1000,
                                    showConfirmButton: false
                                });
                            }
                        });
                    });
                });
            }
        });
    }

    /**
     * 获取关联信息图
     */
    function initReleatedInfo() {
        common.initRelateSHG(1, _stockcode, function (resultData) {
            if (resultData && resultData.status == 1) {
                var relateRank = [];
                if (resultData.industry && resultData.industry.length > 0) {
                    relateRank.push("{ \"industry\": \"" + resultData.industry[0].industry + "\", \"concept\": \"" + resultData.notion[0].section + "\" }");
                }
                var thisName = _stockName + "(" + _stockcode + ")";
                common.buildReleatedInfoChart(thisName, resultData);
            }
        });
    }

    //新闻情感趋势 双折线图
    function initdoubleLine(type, name) {
        common.getNewsTrend({'query_type': type, 'key_name': name}, null, function (resultData) {
            twoLineChart.hideLoading();//关闭加载中
            if (resultData.status == 1) {
                for (var i = 0, ilen = resultData.infotrend.length; i < ilen; i++) {
                    timeData.push(resultData.infotrend[i]['date']);
                    newsData.push(resultData.infotrend[i]['info_count']);
                    sentiData.push(resultData.infotrend[i]['info_senti']);
                }
                if (resultData.senti_per) {
                    var negData = resultData.senti_per.neg_per;
                    var posData = resultData.senti_per.pos_per;
                    $('.pro_chart .progress_neg_per').css("width", negData * 100 + '%');//负面 进度条
                    if (negData && negData > 0) {
                        $('.pro_chart .progress_neg .progress_circle').css({
                            "left": (negData * 100) - 1.5 + '%',
                            "display": "block"
                        });
                    }
                    $('.sacle .negative_per').html((negData * 100).toFixed(0));

                    $('.pro_chart .progress_pos_per').css("width", posData * 100 + '%');//非负面 进度条
                    if (posData && posData > 0) {
                        $('.pro_chart .progress_pos .progress_circle').css({
                            "left": (posData * 100) - 1.5 + '%',
                            "display": "block"
                        });
                    }
                    $('.sacle .positive_per').html((posData * 100).toFixed(0));
                }
                common.getTwoLineChart("left-double-chart", timeData, newsData, sentiData);
            }
        });
    }

    var arrData = {
        query_type: 1,
        key: _stockcode,
        start_id: 0,
        info_type_list: "",
        start_time: 0
    };
    $(".nav-tabs li a").bind("click", function () {
        if ($(this).attr("href").indexOf("#wk-selfmedia") == 0) {
            if ($("#mCSB_2_container").html().trim() == "") {
                arrData.start_id = 0;
                arrData.start_time = 0;
                common.getSelfMedia(arrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-newsflash") == 0) {
            if ($("#wk-newsflash table>tbody").html().trim() == "") {
                arrData.start_id = 0;
                arrData.start_time = 0;
                common.getFastNews(arrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-notice") == 0) {
            if ($("#mCSB_4_container").html().trim() == "") {
                arrData.start_id = 0;
                common.getNotice(arrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-report") == 0) {
            if ($("#mCSB_5_container").html().trim() == "") {
                arrData.start_id = 0;
                common.getReports(arrData, true);
            }
        }
    });
    $("#wk-news").mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "minimal-dark",
        axis: "y",
        callbacks: {
            onTotalScroll: function () {
                if ($("#wk-news .wk-news-list:last").attr("id")) {
                    arrData.start_id = $("#wk-news .wk-news-list:last").attr("id").replace("news_", "");
                    arrData.info_type_list = "1,0,0,0,0,0";
                    arrData.timestamp = $("#wk-news .wk-news-list:last").attr("data-news-timestamp");
                    common.getNews(arrData);
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
                    arrData.start_id = $("#wk-selfmedia .wk-news-list:last").attr("id").replace("media_", "");
                    arrData.info_type_list = "0,0,1,0,0,0";
                    arrData.timestamp = $("#wk-selfmedia .wk-news-list:last").attr("data-media-timestamp");
                    common.getSelfMedia(arrData);
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
                if ($("#wk-newsflash .wk-user-fastnews:last-child").find("ul li:last-child").attr("id")) {
                    arrData.start_id = $("#wk-newsflash .wk-user-fastnews:last-child").find("ul li:last-child").attr("id").replace("fast_", "");
                    arrData.info_type_list = "0,1,0,0,0,0";
                    arrData.timestamp = $("#wk-newsflash  .wk-user-fastnews:last-child").find("ul li:last-child").attr("data-fastnews-timestamp");
                    common.getFastNews(arrData);
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
                    arrData.start_id = $("#wk-notice .wk-news-list:last").attr("id").replace("notice_", "");
                    arrData.info_type_list = "0,0,0,0,0,0,1";
                    arrData.timestamp = $("#wk-notice .wk-news-list:last").attr("data-news-timestamp");
                    common.getNotice(arrData);
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
                    arrData.start_id = $("#wk-report .wk-news-list:last").attr("id").replace("report_", "");
                    arrData.info_type_list = "0,0,0,0,0,0,0,1";
                    arrData.timestamp = $("#wk-report .wk-news-list:last").attr("data-news-timestamp");
                    common.getNotice(arrData);
                }
            }
        }
    });
    $('.wk-hotmap a[data-toggle="tab"]').on('shown.bs.tab', function () {
        initTreeMapChart();
    });
    common.getNews(arrData, true);
    initLineChart();
    initTreeMapChart();
    initdoubleLine(1, key_name);
})(jQuery, window, document);