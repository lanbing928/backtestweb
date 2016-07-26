"use strict";
var common = {
    /**
     * 验证是否没有权限
     * @param resultData
     */
    initCheckLogin: function (resultData) {
        if (resultData.status == -100) {
            window.location.href = "login.php";
        }
    },
    /**
     * 登录
     */
    login: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/login/user_login.php",
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
     * 获得热力图和热力图表数据
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getTopTwentyStock: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_hot_data.php",
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
     * 获取相关联的信息
     */
    getRelatedInfo: function (queryArr, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_related_info.php",
            dataType: "json",
            type: "post",
            data: queryArr,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        });
    },
    /**
     *获取事件关联新闻
     */
    getEventRelatedInfo: function (queryArr, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_event_relatedinfo.php",
            dataType: "json",
            type: "post",
            data: queryArr,
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                common.initCheckLogin(resultData);
                backFn && backFn(resultData);
            }
        });
    },
    /**
     * 新闻
     * @param arrData
     * @param isFirst
     */
    getNews: function (arrData, isFirst) {
        isFirst = isFirst || false;
        arrData.info_type_list = "1,0,0,0,0,0";
        common.getRelatedInfo(arrData, function () {
            $("#wk-news").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-news .mCSB_container").html(common.buildNews(resultData.news, isFirst));
            } else {
                $("#wk-news .mCSB_container").append(common.buildNews(resultData.news, isFirst));
            }
        });
    },
    /**
     * 达人观点(原自媒体)
     * @param arrData
     * @param isFirst
     */
    getSelfMedia: function (arrData, isFirst) {
        isFirst = isFirst || false;
        arrData.info_type_list = "0,0,1,0,0,0";
        common.getRelatedInfo(arrData, function () {
            $("#wk-selfmedia").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-selfmedia .mCSB_container").html(common.buildMedia(resultData.me_media, isFirst));
            } else {
                $("#wk-selfmedia .mCSB_container").append(common.buildMedia(resultData.me_media, isFirst));
            }
        });
    },
    /**
     * 快讯
     * @param arrData
     * @param isFirst
     */
    getFastNews: function (arrData, isFirst) {
        isFirst = isFirst || false;
        arrData.info_type_list = "0,1,0,0,0,0";
        common.getRelatedInfo(arrData, function () {
            $("#wk-newsflash").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-newsflash .mCSB_container").html(common.buildFastNews(resultData.fast_info, isFirst));
            } else {
                $("#wk-newsflash .mCSB_container").append(common.buildFastNews(resultData.fast_info, isFirst));
            }
        });
    },
    /**
     * 公告
     * @param arrData
     * @param isFirst
     */
    getNotice: function (arrData, isFirst) {
        isFirst = isFirst || false;
        arrData.info_type_list = "0,0,0,0,0,0,1";
        common.getRelatedInfo(arrData, function () {
            $("#wk-notice").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-notice .mCSB_container").html(common.buildNotice(resultData.notice, isFirst));
            } else {
                $("#wk-notice .mCSB_container").append(common.buildNotice(resultData.notice, isFirst));
            }
        });
    },
    /**
     * 研报
     * @param arrData
     * @param isFirst
     */
    getReports: function (arrData, isFirst) {
        isFirst = isFirst || false;
        arrData.info_type_list = "0,0,0,0,0,0,0,1";
        common.getRelatedInfo(arrData, function () {
            $("#wk-report").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-report .mCSB_container").html(common.buildReport(resultData.report, isFirst));
            } else {
                $("#wk-report .mCSB_container").append(common.buildReport(resultData.report, isFirst));
            }
        });
    },
    /**
     *获取事件关联新闻
     */
    getEventNews: function (arrData, isFirst) {
        isFirst = isFirst || false;
        common.getEventRelatedInfo(arrData, function () {
            $("#wk-news").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-news .mCSB_container").html(common.buildNews(resultData.result, isFirst));
            } else {
                $("#wk-news .mCSB_container").append(common.buildNews(resultData.result, isFirst));
            }
        });
    },
    /**
     *获取事件关联达人观点
     */
    getEventMedia: function (arrData, isFirst) {
        isFirst = isFirst || false;
        common.getEventRelatedInfo(arrData, function () {
            $("#wk-selfmedia").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-selfmedia .mCSB_container").html(common.buildMedia(resultData.result, isFirst));
            } else {
                $("#wk-selfmedia .mCSB_container").append(common.buildMedia(resultData.result, isFirst));
            }
        });
    },
    /**
     *获取事件关联快讯
     */
    getEventFastNews: function (arrData, isFirst) {
        isFirst = isFirst || false;
        common.getEventRelatedInfo(arrData, function () {
            $("#wk-newsflash").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-newsflash .mCSB_container").html(common.buildFastNews(resultData.result, isFirst));
            } else {
                $("#wk-newsflash .mCSB_container").append(common.buildFastNews(resultData.result, isFirst));
            }
        });
    },
    /**
     *获取事件关联公告
     */
    getEventNotice: function (arrData, isFirst) {
        isFirst = isFirst || false;
        common.getEventRelatedInfo(arrData, function () {
            $("#wk-notice").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-notice .mCSB_container").html(common.buildNotice(resultData.result, isFirst));
            } else {
                $("#wk-notice .mCSB_container").append(common.buildNotice(resultData.result, isFirst));
            }
        });
    },
    /**
     * 获取事件关联研报
     */
    getEventReport: function (arrData, isFirst) {
        isFirst = isFirst || false;
        common.getEventRelatedInfo(arrData, function () {
            $("#wk-report").append(common.getLoading());
        }, function (resultData) {
            common.hideLoading();
            if (arrData.start_id == 0) {
                $("#wk-report .mCSB_container").html(common.buildReport(resultData.result, isFirst));
            } else {
                $("#wk-report .mCSB_container").append(common.buildReport(resultData.result, isFirst));
            }
        });
    },
    /**
     *构建新闻
     */
    buildNews: function (resultData, isFirst) {
        isFirst = isFirst || false;
        var newsHtml = [];
        if (resultData.length > 0) {
            for (var i = 0; i < resultData.length; i++) {
                newsHtml.push("<div class=\"wk-news-list\" id=\"news_" + resultData[i].info_id + "\" data-news-timestamp=\"" + resultData[i].timestamp + "\">");
                newsHtml.push("<div class=\"wk-news-list-head\">");
                newsHtml.push("<p class=\"wk-news-list-title\"><a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">");
                newsHtml.push(resultData[i].title);
                newsHtml.push("</a></p>" + Utility.getgetEmotion(resultData[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
                if (resultData[i].summary != "") {
                    newsHtml.push("<strong>【机器人摘要】</strong>");
                    newsHtml.push(resultData[i].summary);
                    newsHtml.push("<a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
                }
                newsHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
            }
        } else {
            if (isFirst) {
                newsHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关新闻资讯</span></div>");
            }
        }
        return newsHtml.join('');
    },
    /**
     *构建快讯
     */
    buildFastNews: function (resultData, isFirst) {
        isFirst = isFirst || false;
        var fastHtml = [];
        if (resultData.length > 0) {
            common.hideLoading();
            for (var i in resultData) {
                for (var j in resultData[i]) {
                    fastHtml.push("<div class=\"wk-user-fastnews\">");
                    fastHtml.push("<span class=\"wk-user-fastnews-dot\">●</span>");
                    fastHtml.push("<p class=\"wk-user-fastnews-todate\">" + j + "</p>");
                    fastHtml.push("<ul>");
                    for (var k = 0; k < resultData[i][j].length; k++) {
                        fastHtml.push("<li id='" + resultData[i][j][k].info_id + "' data-fastnews-timestamp='" + resultData[i][j][k].timestamp + "'>");
                        fastHtml.push("<label>" + Utility.unixToTime(resultData[i][j][k].timestamp) + "</label>");
                        fastHtml.push("<p>" + resultData[i][j][k].summary + "</p>");
                        fastHtml.push("</li>");
                    }
                    fastHtml.push("</ul></div>");
                }
            }
        } else {
            if (isFirst) {
                fastHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关快讯</span></div>");
            }
        }
        return fastHtml.join('');
    },
    /**
     *构建自媒体
     */
    buildMedia: function (resultData, isFirst) {
        isFirst = isFirst || false;
        var mediaHtml = [];
        if (resultData.length > 0) {
            common.hideLoading();
            for (var i = 0; i < resultData.length; i++) {
                mediaHtml.push("<div class=\"wk-news-list\" id=\"media_" + resultData[i].info_id + "\" data-media-timestamp=\"" + resultData[i].timestamp + "\"><div class=\"wk-news-list-head\">");
                mediaHtml.push("<p class=\"wk-news-list-title\">");
                mediaHtml.push("<a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">" + resultData[i].title + "</a></p>");
                mediaHtml.push(Utility.getgetEmotion(resultData[i].sentiment));
                mediaHtml.push("</div><div class=\"wk-news-list-con\"><p>");
                if (resultData[i].summary != "") {
                    mediaHtml.push("<strong>【机器人摘要】</strong>");
                    mediaHtml.push(resultData[i].summary);
                    mediaHtml.push("<a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"> <i class=\"fa fa-link\"></i>详情链接</a>");
                }
                mediaHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
            }
        } else {
            if (isFirst) {
                mediaHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关达人观点</span></div>");
            }
        }
        return mediaHtml.join('');
    },
    /**
     *构建公告
     */
    buildNotice: function (resultData, isFirst) {
        isFirst = isFirst || false;
        var noticeHtml = [];
        if (resultData.length > 0) {
            common.hideLoading();
            for (var i = 0; i < resultData.length; i++) {
                noticeHtml.push("<div class=\"wk-news-list\" id=\"notice_" + resultData[i].info_id + "\" data-news-timestamp=\"" + resultData[i].timestamp + "\">");
                noticeHtml.push("<div class=\"wk-news-list-head\">");
                noticeHtml.push("<p class=\"wk-news-list-title\"><a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">");
                noticeHtml.push(resultData[i].title);
                noticeHtml.push("</a></p>" + Utility.getgetEmotion(resultData[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
                if (resultData[i].summary !== "") {
                    noticeHtml.push("<strong>【机器人摘要】</strong>");
                    noticeHtml.push(resultData[i].summary);
                    noticeHtml.push("<a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
                }
                noticeHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
            }
        } else {
            if (isFirst) {
                noticeHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关公告</span></div>");
            }
        }
        return noticeHtml.join('');
    },
    /**
     * 构建研报信息
     * @returns {string}
     */
    buildReport: function (resultData, isFirst) {
        isFirst = isFirst || false;
        var reportHtml = [];
        if (resultData.length > 0) {
            common.hideLoading();
            for (var i = 0; i < resultData.length; i++) {
                reportHtml.push("<div class=\"wk-news-list\" id=\"report_" + resultData[i].info_id + "\" data-news-timestamp=\"" + resultData[i].timestamp + "\">");
                reportHtml.push("<div class=\"wk-news-list-head\">");
                reportHtml.push("<p class=\"wk-news-list-title\"><a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">");
                reportHtml.push(resultData[i].title);
                reportHtml.push("</a></p>" + Utility.getgetEmotion(resultData[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
                if (resultData[i].summary !== "") {
                    reportHtml.push("<strong>【机器人摘要】</strong>");
                    reportHtml.push(resultData[i].summary);
                    reportHtml.push("<a href=\"detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
                }
                reportHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
            }
        } else {
            if (isFirst) {
                reportHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关研报</span></div>");
            }
        }
        return reportHtml.join('');
    },
    /**
     * 折线图
     * @param chartId
     * @param xdata
     * @param viewData
     * @param searchData
     * @param followData
     */
    getLineChart: function (chartId, xdata, viewData, searchData, followData) {
        var myChart = echarts.init(document.getElementById(chartId));
        myChart.showLoading({"text": "加载中..."});
        myChart.setOption({
            color: ["rgb(243, 104, 97)", "rgb(76, 93, 186)", "rgb(118, 172, 245)"],
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
            // dataZoom: [
            //     {type: 'inside', realtime: true},
            //     {
            //         type: 'slider',
            //         show: true,
            //         realtime: true
            //     }],
            grid: {top: "12%", left: "6%", right: "5%", bottom: 40, containLabel: true},
            legend: {left: "left", data: ["查看", "搜索", "关注"], padding: [0, 0, 0, 15]},
            xAxis: {type: "category", boundaryGap: false, data: xdata},
            yAxis: {type: "value", position: "right", scale: true, min: "dataMin", max: "dataMax"},
            calculable: false,
            series: [
                {
                    name: "查看",
                    type: "line",
                    smooth: true,
                    data: viewData
                },
                {
                    name: "搜索",
                    type: "line",
                    smooth: true,
                    data: searchData
                },
                {
                    name: "关注",
                    type: "line",
                    smooth: true,
                    // symbolSize: function (value) {
                    //     return value == 0 ? 0 : 4;
                    // },
                    data: followData
                }
            ]
        });
        myChart.hideLoading();
        window.onresize = myChart.resize
    },
    /**
     * 热力图
     * @param wk_treemap_data
     */
    getTreemap: function (wk_treemap_data) {
        for (var x in wk_treemap_data) {
            if (Utility.timeRange("09:15", "09:25")) {
                $("#" + wk_treemap_data[x].key).html("<div class=\"wk-hotmap-no\"><img src=\"static/imgs/i/nonews.png\"><span>自由竞价时间,暂无数据</span></div>");
            } else {
                var myChart = echarts.init(document.getElementById("" + wk_treemap_data[x].key + ""));
                var cdata = [];
                for (var y in wk_treemap_data[x].value) {
                    if (wk_treemap_data[x].key.indexOf("wk-stock") == 0) {
                        var tname = wk_treemap_data[x].value[y].name;
                        var tcode = wk_treemap_data[x].value[y].code;
                        var tvalue = (parseFloat(wk_treemap_data[x].value[y].value) * 100).toFixed(2);
                        var tpricelevel = wk_treemap_data[x].value[y].price_level;
                        var tstop = wk_treemap_data[x].value[y].stop;
                        if (tstop == 1) {
                            //TODO 这里判断是否停牌
                            cdata.push("{name:\"" + tname + "\\n(" + tcode + ")\\n" + (tvalue > 0 ? "+" : "") + tvalue + "%\"");
                        } else {
                            cdata.push("{name:\"" + tname + "\\n(" + tcode + ")\\n" + (tvalue > 0 ? "+" : "") + tvalue + "%\"");
                        }
                        cdata.push("value:" + wk_treemap_data[x].value[y].count);
                        cdata.push("itemStyle:{normal:{color:'" + Utility.getTreeMapColor(tpricelevel) + "'}}");
                        if (tpricelevel == -1) {
                            cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}");
                        } else if (tpricelevel == 1) {
                            cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}");
                        } else {
                            cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}");
                        }
                    } else {
                        var tsvalue = (parseFloat(wk_treemap_data[x].value[y].value) * 100).toFixed(2);
                        cdata.push('{name:"' + wk_treemap_data[x].value[y].name + "\\n" + (tsvalue > 0 ? "+" : "") + tsvalue + '%"');
                        cdata.push("value:" + wk_treemap_data[x].value[y].count);
                        cdata.push("itemStyle:{normal:{color:'" + Utility.getTreeMapColor(wk_treemap_data[x].value[y].price_level) + "'}}");
                        if (wk_treemap_data[x].value[y].price_level == -1) {
                            cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}");
                        } else {
                            if (wk_treemap_data[x].value[y].price_level == 1) {
                                cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}");
                            } else {
                                cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}");
                            }
                        }
                    }
                }
                myChart.setOption({
                    tooltip: {
                        formatter: "{b}"
                    },
                    series: [{
                        type: "treemap",
                        breadcrumb: {
                            show: false
                        },
                        roam: false,
                        nodeClick: "link",
                        width: "100%",
                        height: "100%",
                        itemStyle: {
                            normal: {
                                borderWidth: 1
                            }
                        },
                        data: eval("[" + cdata.join(",") + "]")
                    }]
                });
                window.onresize = myChart.resize;
            }
        }
    },
    /**
     * 获取分时热力图
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getHotRecord: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_hotrecord.php",
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
     * 获取折线热力图
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getRealTimeHot: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_real_time_hot.php",
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
     * 获取双折线图 新闻趋势
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getNewsTrend: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_news_trend.php",
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
     * 获取单只股票热度折线图
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getSingleRealTimeHot: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_single_real_time_hot.php",
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
     * 获取行业&&概念热度
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getHyAndGnHot: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_hy_and_gn_hot.php",
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
     * 获取股票关联的行业，概念
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getStockBase: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_stock_base.php",
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
     * 获取关联的股票/行业/概念
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getRelateSHG: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/ajax_get_relate_shg.php",
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
            url: "ajax/ajax_get_rateline.php",
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
     * 构建热度趋势图
     * @param query_name
     * @param query_date
     * @param buildData
     */
    buildRateLine: function (query_name, query_date, buildData) {
        var dateArr = [];
        var r1Data = [];
        var r2Data = [];
        if (buildData.body && buildData.body.list.length > 0) {
            var list = buildData.body.list;
            if (query_date === "today") {
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
                        if (params[p].value && params[p].value != 0) {
                            if (params[0].name == params[p].name) {
                                showLabel += "<label style='color: " + params[p].color + ";font-size: 14px;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + (params[p].value * 100).toFixed(2) + "%" + "<br>";
                            }
                        }
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
                left: '0',
                right: '0',
                bottom: 40,
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateArr,
                axisLabel: {
                    rotate: 45
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
        window.onresize = rateChart.resize
    },
    /**
     * 构建股票热力图表格
     * @param buildData
     * @returns {string}
     */
    buildStockTable: function (buildData) {
        var tableHtml = [];
        buildData.sort(function (a, b) {
            return Math.abs(b.value) - Math.abs(a.value);
        });
        if (buildData.length > 0) {
            for (var i = 0; i < buildData.length; i++) {
                var tvalue = buildData[i].value;
                tableHtml.push("<tr>");
                tableHtml.push("<td>" + (i + 1) + "</td>");
                tableHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].name + "</a></td>");
                tableHtml.push("<td class='" + common.getUpDownColor(buildData[i].mark_z_d) + "'>" + buildData[i].price + "</td>");
                tableHtml.push("<td class='" + common.getUpDownColor(buildData[i].price_change_ratio) + "'>" + (buildData[i].price_change_ratio * 100).toFixed(2) + "%</td>");
                tableHtml.push("<td>" + buildData[i].hot + "</td>");
                tableHtml.push("<td class='" + common.getUpDownColor(tvalue) + "'>" + (tvalue > 0 ? "+" : "") + tvalue + "</td>");
                tableHtml.push("<td>" + (buildData[i].count / 10000 / 100).toFixed(2) + "</td>");
                tableHtml.push("</tr>");
            }
            return tableHtml.join('');
        } else {//不存在
            var str = '<tr><td colspan="7" style="height:260px;line-height:260px;color:#545454;font-size:18px;"><img src="/static/imgs/i/index_nodata.png">&nbsp;&nbsp;&nbsp;暂时没有数据</td></tr>';
            return str;
        }
    },
    /**
     * 构建行业/概念热力图表格
     * @param buildData
     * @param buildType
     * @returns {string}
     */
    buildOtherTable: function (buildData, buildType) {
        if (buildData.length > 0) { //存在
            var tableHtml = [];
            buildData.sort(function (a, b) {
                return b.value - a.value;
            });
            for (var i = 0; i < buildData.length; i++) {
                var tvalue = buildData[i].value;
                tableHtml.push("<tr>");
                tableHtml.push("<td>" + (i + 1) + "</td>");
                tableHtml.push("<td><a href='" + buildType + ".php?name=" + buildData[i].name + "' target='_blank'>" + buildData[i].name + "</a></td>");
                tableHtml.push("<td>" + buildData[i].hot.toFormatNum() + "</td>");
                tableHtml.push("<td class='" + common.getUpDownColor(tvalue) + "'>" + (tvalue > 0 ? "+" : "") + tvalue.toFormatNum() + "</td>");
                tableHtml.push("<td>" + (buildData[i].count / 10000 / 100).toFixed(2) + "</td>");
                tableHtml.push("</tr>");
            }
            return tableHtml.join('');

        } else { //不存在
            $(this).find(".wk-treemap-table").css({
                height: "294px",
                "text-align": "center",
                "line-height": "294px",
                "color": "#545454",
                "font-size": "18px"
            });
            var str = '<tr><td colspan="5" style="height:260px;line-height:260px;color:#545454;font-size:18px;"><img src="/static/imgs/i/index_nodata.png">&nbsp;&nbsp;&nbsp;暂时没有数据</td></tr>';
            return str;

        }
    }
    ,

    /**
     * 构建热度表格
     * @param buildData
     * @param buildType
     */
    buildHotmapTable: function (buildData, buildType) {
        var hotmapHtml = [];
        if (buildData.length > 0) {
            if (buildType == "stock") {
                for (var i = 0; i < buildData.length; i++) {
                    hotmapHtml.push("<tr><td>" + (i + 1) + "</td>");
                    hotmapHtml.push("<td><a href=\"stocks.php?stock=" + buildData[i].code + "\" target=\"_blank\">" + buildData[i].name + "</a></td>");
                    hotmapHtml.push("<td>" + buildData[i].value + "</td>");
                    hotmapHtml.push("<td>" + buildData[i].increment + Utility.getHotUpDown(buildData[i].increment) + "</td>");
                    hotmapHtml.push("<td class=\"" + Utility.getPriceColor(buildData[i].mark_z_d) + "\">" + buildData[i].price + "</td></tr>");
                }
            } else {
                for (var i = 0; i < buildData.length; i++) {
                    hotmapHtml.push("<tr><td>" + (i + 1) + "</td>");
                    hotmapHtml.push("<td><a href=\"" + buildType + ".php?name=" + buildData[i].name + "\" target=\"_blank\">" + buildData[i].name + "</a></td>");
                    hotmapHtml.push("<td>" + buildData[i].value + "</td>");
                    hotmapHtml.push("<td>" + buildData[i].increment + Utility.getHotUpDown(buildData[i].increment) + "</td></tr>");
                }
            }
        }
        return hotmapHtml.join('');
    },
    /**
     * 构建热度热力图
     * @param buildId
     * @param buildData
     * @param buildType
     */
    buildHotmap: function (buildId, buildData, buildType) {
        var myChart = echarts.init(document.getElementById(buildId));
        myChart.hideLoading();
        var cdata = [];
        for (var y in buildData) {
            if (buildType == "stock") {
                var tname = buildData[y].name;
                var tcode = buildData[y].code;
                var tvalue = buildData[y].value;
                var tpricelevel = buildData[y].price_level;
                var tstop = buildData[y].stop;
                if (tstop == 1) {
                    //TODO 这里判断是否停牌
                    cdata.push("{name:\"" + tname + "\\n(" + tcode + ")\\n" + (tvalue > 0 ? "+" : "") + tvalue + "\"");
                } else {
                    cdata.push("{name:\"" + tname + "\\n(" + tcode + ")\\n" + (tvalue > 0 ? "+" : "") + tvalue + "\"");
                }
                cdata.push("value:" + buildData[y].count);
                cdata.push("itemStyle:{normal:{color:'" + Utility.getTreeMapColor(tpricelevel) + "'}}");
                if (tpricelevel == -1) {
                    cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}");
                } else if (tpricelevel == 1) {
                    cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}");
                } else {
                    cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}");
                }
            } else {
                var tsvalue = buildData[y].value;
                cdata.push('{name:"' + buildData[y].name + "\\n" + (tsvalue > 0 ? "+" : "") + tsvalue + '"');
                cdata.push("value:" + buildData[y].count);
                cdata.push("itemStyle:{normal:{color:'" + Utility.getTreeMapColor(buildData[y].price_level) + "'}}");
                if (buildData[y].price_level == -1) {
                    cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}");
                } else {
                    if (buildData[y].price_level == 1) {
                        cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}");
                    } else {
                        cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}");
                    }
                }
            }
        }
        myChart.setOption({
            tooltip: {
                formatter: "{b}"
            },
            series: [{
                type: "treemap",
                breadcrumb: {
                    show: false
                },
                roam: false,
                nodeClick: "link",
                width: "100%",
                height: "100%",
                itemStyle: {
                    normal: {
                        borderWidth: 1
                    }
                },
                data: eval("[" + cdata.join(",") + "]")
            }]
        });
        window.onresize = myChart.resize;
    },
    /**
     * 获取关联的行业股票概念
     */
    initRelateSHG: function (query_type, name, backFn) {
        var relcharts = echarts.init(document.getElementById("wk-relate-chart"));
        common.getRelateSHG({"query_type": query_type, "key_name": name}, function () {
            relcharts.showLoading({"text": "加载中..."});
        }, function (resultData) {
            if (resultData.status == 1) {
                relcharts.hideLoading();
                backFn && backFn(resultData);
            }
        });
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
    },
    /**
     *
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getHotRank: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "ajax/hotrank/ajax_get_hot_rank.php",
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
     *双折线图
     * @param chartId
     * @param timeData
     * @param newsData
     * @param sentiData
     */
    getTwoLineChart: function (chartId, timeData, newsData, sentiData) {
        var myChart = echarts.init(document.getElementById(chartId));
        myChart.showLoading({"text": "加载中..."});
        myChart.setOption({
            color: ["rgb(82,153,222)", "rgb(247,163,92)"],
            tooltip: {
                trigger: "axis"
            },
            legend: {data: [{name: "新闻数量", icon: 'circle'}, {name: "情感指数"}], bottom: "0"},
            grid: {top: '10px', left: 'auto', right: 'auto', bottom: '10%', containLabel: true},
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: timeData,
                splitLine: {show: false},
                axisLine: {show: false},
                axisLabel: {show: false}
            },
            yAxis: [{type: 'value', splitLine: {show: false}, max: "dataMax"}, {
                type: 'value',
                splitLine: {show: false},
                max: "dataMax"
            }],
            series: [
                {
                    name: '新闻数量',
                    type: "line",
                    smooth: true,
                    data: newsData
                },
                {
                    name: "情感指数",
                    type: "line",
                    smooth: true,
                    data: sentiData,
                    yAxisIndex: 1
                }
            ]
        });
        myChart.hideLoading();
        window.onresize = myChart.resize
    },
    /**
     * 构建关联信息图表
     * @param relName
     * @param relData
     */
    buildReleatedInfoChart: function (relName, relData) {
        if (relData.stock.length == 0 && relData.industry.length == 0 && relData.notion.length == 0 && relData.event.length == 0) {
            $("#wk-relate-chart").html("<div style='font-size: 18px;text-align: center;padding-top: 240px;'><img src=\"/static/imgs/i/index_nodata.png\">&nbsp;&nbsp;&nbsp;&nbsp;暂无关联信息</div>");
            return;
        }
        relName = decodeURI(relName);
        var datas = [{"name": relName, "symbolSize": 60, "category": 0, "draggable": true}];
        var links = [];
        var cate = [
            {"name": relName, "itemStyle": {normal: {color: "rgba(85,111,181,1)"}}},
            {"name": "关联股票", "itemStyle": {normal: {color: "rgba(158,90,147,1)"}}},
            {"name": "关联行业", "itemStyle": {normal: {color: "rgba(55,119,157,1)"}}},
            {"name": "关联概念", "itemStyle": {normal: {color: "rgba(92,95,135,1)"}}},
            {"name": "关联事件", "itemStyle": {normal: {color: "rgba(97,150,156,1)"}}}
        ];
        var _random_max = 30;
        var _random_min = 10;
        var _rel_stock = [], _rel_stock_link = [],
            _rel_industry = [], _rel_industry_link = [],
            _rel_concept = [], _rel_concept_link = [],
            _rel_event = [], _rel_event_link = [];
        if (relData.stock.length > 0) {
            _rel_stock.push("{\"name\": \"关联股票\",\"symbolSize\": 30,\"category\": 1,\"draggable\": true}");
            _rel_stock_link.push("{\"source\": \"关联股票\",\"target\": \"" + relName + "\",\"lineStyle\": {\"normal\": {}}}");
            for (var i = 0, ilen = relData.stock.length; i < ilen; i++) {
                _rel_stock.push("{\"name\": \"" + relData.stock[i].stock_name + "(" + relData.stock[i].stock_code + ")" + "\",\"symbolSize\": " + Utility.getRandom(_random_max, _random_min) + ",\"category\": 1,\"draggable\": true,\"itemStyle\": {\"normal\": {\"color\": \"rgba(158,90,147,1)\"}}}");
                _rel_stock_link.push("{\"source\": \"关联股票\",\"target\": \"" + relData.stock[i].stock_name + "(" + relData.stock[i].stock_code + ")" + "\",\"lineStyle\": {\"normal\": {\"color\": \"rgba(158,90,147,1)\"}}}");
            }
            datas = datas.concat(JSON.parse("[" + _rel_stock + "]"));
            links = links.concat(JSON.parse("[" + _rel_stock_link + "]"))
        }
        if (relData.industry.length > 0) {
            _rel_industry.push("{\"name\": \"关联行业\",\"symbolSize\": 30,\"category\": 2,\"draggable\": true}");
            _rel_industry_link.push("{\"source\": \"关联行业\",\"target\": \"" + relName + "\",\"lineStyle\": {\"normal\": {}}}");
            for (var j = 0, jlen = relData.industry.length; j < jlen; j++) {
                _rel_industry.push("{\"name\": \"" + relData.industry[j].industry + "\",\"symbolSize\": " + Utility.getRandom(_random_max, _random_min) + ",\"category\": 2,\"draggable\": true,\"itemStyle\": {\"normal\": {\"color\": \"rgba(55,119,157,1)\"}}}");
                _rel_industry_link.push("{\"source\": \"关联行业\",\"target\": \"" + relData.industry[j].industry + "\",\"lineStyle\": {\"normal\": {\"color\": \"rgba(55,119,157,1)\"}}}");
            }
            datas = datas.concat(JSON.parse("[" + _rel_industry + "]"));
            links = links.concat(JSON.parse("[" + _rel_industry_link + "]"))
        }
        if (relData.notion.length > 0) {
            _rel_concept.push("{\"name\": \"关联概念\",\"symbolSize\": 30,\"category\": 3,\"draggable\": true}");
            _rel_concept_link.push("{\"source\": \"关联概念\",\"target\": \"" + relName + "\",\"lineStyle\": {\"normal\": {}}}");
            for (var k = 0, klen = relData.notion.length; k < klen; k++) {
                _rel_concept.push("{\"name\": \"" + relData.notion[k].section + "\",\"symbolSize\": " + Utility.getRandom(_random_max, _random_min) + ",\"category\": 3,\"draggable\": true,\"itemStyle\": {\"normal\": {\"color\": \"rgba(92,95,135,1)\"}}}");
                _rel_concept_link.push("{\"source\": \"关联概念\",\"target\": \"" + relData.notion[k].section + "\",\"lineStyle\": {\"normal\": {\"color\": \"rgba(92,95,135,1)\"}}}");
            }
            datas = datas.concat(JSON.parse("[" + _rel_concept + "]"));
            links = links.concat(JSON.parse("[" + _rel_concept_link + "]"))
        }
        if (relData.event.length > 0) {
            _rel_event.push("{\"name\": \"关联事件\",\"symbolSize\": 30,\"category\": 4,\"draggable\": true}");
            _rel_event_link.push("{\"source\": \"关联事件\",\"target\": \"" + relName + "\",\"lineStyle\": {\"normal\": {}}}");
            for (var l = 0, llen = relData.event.length; l < llen; l++) {
                _rel_event.push("{\"name\": \"" + relData.event[l].event_name + "\",\"symbolSize\": " + Utility.getRandom(_random_max, _random_min) + ",\"category\": 4,\"draggable\": true,\"itemStyle\": {\"normal\": {\"color\": \"rgba(97,150,156,1)\"}}}");
                _rel_event_link.push("{\"source\": \"关联事件\",\"target\": \"" + relData.event[l].event_name + "\",\"lineStyle\": {\"normal\": {\"color\": \"rgba(97,150,156,1)\"}}}");
            }
            datas = datas.concat(JSON.parse("[" + _rel_event + "]"));
            links = links.concat(JSON.parse("[" + _rel_event_link + "]"))
        }
        var relcharts = echarts.init(document.getElementById("wk-relate-chart"));
        var option = {
            color: ["rgb(85,111,181)", "rgb(158,90,147)", "rgb(55,119,157)", "rgb(92,95,135)", "rgb(97,150,156)"],
            animation: false,
            legend: [{data: cate}],
            series: [
                {
                    name: '关联信息',
                    type: 'graph',
                    layout: 'force',
                    draggable: false,
                    data: datas,
                    links: links,
                    categories: cate,
                    roam: true,
                    label: {normal: {show: true, position: 'bottom'}},
                    force: {repulsion: 400}
                }
            ]
        };
        relcharts.setOption(option);
        relcharts.on('click', function (params) {
            var name = params.data.name;
            switch (params.data.category) {
                case 1:
                    if (name != "关联股票") {
                        window.open("stocks.php?stock=" + name.substring(name.indexOf("(") + 1, name.indexOf(")"))
                        );
                    }
                    break;
                case 2:
                    if (name != "关联行业") {
                        window.open("industry.php?name=" + name);
                    }
                    break;
                case 3:
                    if (name != "关联概念") {
                        window.open("concept.php?name=" + name);
                    }
                    break;
                case 4:
                    if (name != "关联事件") {
                        window.open("event.php?name=" + name);
                    }
                    break;
            }
        });
        window.onresize = relcharts.resize;
    }
};
var inforcenter = {
    /**
     * 添加组合
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    addGroup: function (arrData, beforeFn, backFn) {
        arrData.operate_code = 1;
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
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
        });
    },
    /**
     * 删除组合
     * @param arrData
     * @param beforeFn{}
     * @param backFn
     */
    delGroup: function (arrData, beforeFn, backFn) {
        arrData.operate_code = 2;
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
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
     * 修改组合
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    modifyGroup: function (arrData, beforeFn, backFn) {
        arrData.operate_code = 3;
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
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
     * 显示组合
     * @param beforeFn
     * @param backFn
     */
    showGroup: function (beforeFn, backFn) {
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: {operate_code: 4},
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        })
    },
    /**
     * 添加股票
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    addStock: function (arrData, beforeFn, backFn) {
        arrData.operate_code = 5;
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
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
     * 删除股票
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    delStock: function (arrData, beforeFn, backFn) {
        arrData.operate_code = 6;
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
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
     * 显示股票
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    showstock: function (arrData, beforeFn, backFn) {
        arrData.operate_code = 7;
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
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
     * 获取个人中心页头部大盘指数
     * @param beforeFn
     * @param backFn
     */
    getStockPoint: function (beforeFn, backFn) {
        $.ajax({
            url: "../ajax/infocenter/ajax_get_stock_group.php",
            type: "post",
            dataType: "json",
            cache: false,
            data: {operate_code: 8},
            beforeSend: function () {
                beforeFn && beforeFn();
            },
            success: function (resultData) {
                backFn && backFn(resultData);
            }
        })
    },
    /**
     * 获取新闻/达人观点/快讯关联的新闻
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    getRelatedInfo: function (arrData, beforeFn, backFn) {
        $.ajax({
            url: "../ajax/infocenter/ajax_get_relatedinfo.php",
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
     * 获取所有平台
     * @param beforeFn
     * @param backFn
     */
    getPlatform: function (beforeFn, backFn) {
        $.ajax({
            url: "../ajax/infocenter/ajax_get_all_platform.php",
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
     * 添加用户新闻平台
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    addUserPlatform: function (arrData, beforeFn, backFn) {
        arrData.custom_type = 2;
        $.ajax({
            url: "../ajax/infocenter/ajax_ctrl_customplat.php",
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
     * 删除用户新闻平台
     * @param arrData
     * @param beforeFn
     * @param backFn
     */
    delUserPlatform: function (arrData, beforeFn, backFn) {
        arrData.custom_type = 3;
        $.ajax({
            url: "../ajax/infocenter/ajax_ctrl_customplat.php",
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
    }
};

