"use strict";
var common = {
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
                backFn && backFn(resultData);
            }
        });
    },
    /**
     * 新闻
     * @param arrData
     */
    getNews: function (arrData) {
        arrData.info_type_list = "1,0,0,0,0,0";
        common.getRelatedInfo(arrData, function () {
            $("#wk-news").append(common.getLoading());
        }, function (resultData) {
            var newsHtml = [];
            var maxNum = parseInt(($(".wk-news-title-num:last").html() == "" ? 0 : $(".wk-news-title-num:last").html()));
            if (resultData.news.length > 0) {
                common.hideLoading();
                for (var i = 0; i < resultData.news.length; i++) {
                    newsHtml.push("<div class=\"wk-news-list\" id=\"news_" + resultData.news[i].info_id + "\" data-news-timestamp=\"" + resultData.news[i].timestamp + "\">");
                    newsHtml.push("<div class=\"wk-news-list-head\">");
                    //newsHtml.push("<label class=\"wk-news-title-num\">" + (++maxNum) + "</label>");
                    newsHtml.push("<p class=\"wk-news-list-title\"><a href=\"detail.php?infoid=" + resultData.news[i].info_id + "\" target=\"_blank\">");
                    newsHtml.push(resultData.news[i].title);
                    newsHtml.push("</a></p>" + Utility.getgetEmotion(resultData.news[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
                    if (resultData.news[i].summary != "") {
                        newsHtml.push("<strong>【机器人摘要】</strong>");
                        newsHtml.push(resultData.news[i].summary);
                        newsHtml.push("<a href=\"detail.php?infoid=" + resultData.news[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
                    }
                    newsHtml.push("</p><span>来源：" + resultData.news[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData.news[i].timestamp) + "</span></div><hr></div>");
                }
                $("#wk-news .mCSB_container").append(newsHtml.join(''));
            } else {
                if (arrData.start_id == 0) {
                    common.hideLoading();
                    newsHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关新闻资讯</span></div>");
                    $("#wk-news .mCSB_container").html(newsHtml.join(''));
                } else {
                    common.hideLoading();
                }
            }
        })
    },
    /**
     * 达人观点(原自媒体)
     * @param arrData
     */
    getSelfMedia: function (arrData) {
        arrData.info_type_list = "0,0,1,0,0,0";
        common.getRelatedInfo(arrData, function () {
            $("#wk-selfmedia").append(common.getLoading());
        }, function (resultData) {
            var mediaHtml = [];
            if (resultData.me_media.length > 0) {
                common.hideLoading();
                for (var i = 0; i < resultData.me_media.length; i++) {
                    mediaHtml.push("<div class=\"wk-news-list\" id=\"media_" + resultData.me_media[i].info_id + "\" data-media-timestamp=\"" + resultData.me_media[i].timestamp + "\"><div class=\"wk-news-list-head\">");
                    mediaHtml.push("<p class=\"wk-news-list-title\">");
                    mediaHtml.push("<a href=\"detail.php?infoid=" + resultData.me_media[i].info_id + "\" target=\"_blank\">" + resultData.me_media[i].title + "</a></p>");
                    mediaHtml.push(Utility.getgetEmotion(resultData.me_media[i].sentiment));
                    mediaHtml.push("</div><div class=\"wk-news-list-con\"><p>");
                    if (resultData.me_media[i].summary != "") {
                        mediaHtml.push("<strong>【机器人摘要】</strong>");
                        mediaHtml.push(resultData.me_media[i].summary);
                        mediaHtml.push("<a href=\"detail.php?infoid=" + resultData.me_media[i].info_id + "\" target=\"_blank\"> <i class=\"fa fa-link\"></i>详情链接</a>");
                    }
                    mediaHtml.push("</p><span>来源：" + resultData.me_media[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData.me_media[i].timestamp) + "</span></div><hr></div>");
                }
                $("#wk-selfmedia .mCSB_container").append(mediaHtml.join(''));
            } else {
                if (arrData.start_id == 0) {
                    common.hideLoading();
                    mediaHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关达人观点</span></div>");
                    $("#wk-selfmedia .mCSB_container").html(mediaHtml.join(''));
                } else {
                    common.hideLoading();
                }
            }
        })
    },
    /**
     * 快讯
     * @param arrData
     */
    getFastNews: function (arrData) {
        arrData.info_type_list = "0,1,0,0,0,0";
        common.getRelatedInfo(arrData, function () {
            $("#wk-newsflash").append(common.getLoading());
        }, function (resultData) {
            var fastHtml = [];
            if (resultData.fast_info.length > 0) {
                common.hideLoading();
                for (var i = 0; i < resultData.fast_info.length; i++) {
                    fastHtml.push("<tr id='fast_" + resultData.fast_info[i].info_id + "' data-fastnews-timestamp=\"" + resultData.fast_info[i].timestamp + "\"><td><label>");
                    fastHtml.push(Utility.unixToDate(resultData.fast_info[i].timestamp).substring(10, 16));
                    fastHtml.push("</label></td><td>");
                    fastHtml.push(resultData.fast_info[i].summary);
                    fastHtml.push("</td></tr>");
                }
                $("#wk-newsflash .wk-news-list table>tbody").append(fastHtml.join(''));
            } else {
                if (arrData.start_id == 0) {
                    common.hideLoading();
                    fastHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关快讯</span></div>");
                    $("#wk-newsflash .mCSB_container").html(fastHtml.join(''));
                } else {
                    common.hideLoading();
                }
            }
        })
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
        myChart.showLoading();
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
                                showLabel += "<label style='color: " + params[p].color + ";font-size: 18px;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + Utility.formatNum(params[p].value) + "<br>";
                            }
                        }
                    }
                    return showLabel;
                }
            },
            grid: {top: "12%", left: "6%", right: "5%", bottom: "0", containLabel: true},
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
                            cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}")
                        } else {
                            if (wk_treemap_data[x].value[y].price_level == 1) {
                                cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}")
                            } else {
                                cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}")
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
            }
        }
        var rateChart = echarts.init(document.getElementById("wk-rate-line-pic"));
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            color: ["rgb(151,47,134)", "rgb(65,77,92)"],
            legend: {
                data: [query_name, '沪深300'],
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
                data: dateArr
            },
            yAxis: {
                type: 'value',
                position: 'right'
            },
            series: [
                {
                    name: query_name,
                    type: 'line',
                    smooth: true,
                    data: JSON.parse("[" + r1Data.reverse() + "]")
                },
                {
                    name: '沪深300',
                    type: 'line',
                    smooth: true,
                    data: JSON.parse("[" + r2Data.reverse() + "]")
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
            return b.value - a.value;
        });
        for (var i = 0; i < buildData.length; i++) {
            var tvalue = buildData[i].value;
            tableHtml.push("<tr>");
            tableHtml.push("<td>" + (i + 1) + "</td>");
            tableHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].name + "</a></td>");
            tableHtml.push("<td class='" + common.getUpDownColor(buildData[i].price_level) + "'>" + buildData[i].price + "</td>");
            tableHtml.push("<td class='" + common.getUpDownColor(buildData[i].price_change_ratio) + "'>" + (buildData[i].price_change_ratio * 100).toFixed(2) + "%</td>");
            tableHtml.push("<td>" + buildData[i].hot + "</td>");
            tableHtml.push("<td class='" + common.getUpDownColor(tvalue) + "'>" + (tvalue > 0 ? "+" : "") + tvalue + "</td>");
            tableHtml.push("<td>" + buildData[i].count + "</td>");
            tableHtml.push("</tr>");
        }
        return tableHtml.join('');
    },
    /**
     * 构建行业/概念热力图表格
     * @param buildData
     * @param buildType
     * @returns {string}
     */
    buildOtherTable: function (buildData, buildType) {
        var tableHtml = [];
        buildData.sort(function (a, b) {
            return b.value - a.value;
        });
        for (var i = 0; i < buildData.length; i++) {
            var tvalue = buildData[i].value;
            tableHtml.push("<tr>");
            tableHtml.push("<td>" + (i + 1) + "</td>");
            tableHtml.push("<td><a href='" + buildType + ".php?name=" + buildData[i].name + "' target='_blank'>" + buildData[i].name + "</a></td>");
            tableHtml.push("<td>" + buildData[i].hot + "</td>");
            tableHtml.push("<td class='" + common.getUpDownColor(tvalue) + "'>" + (tvalue > 0 ? "+" : "") + tvalue + "</td>");
            tableHtml.push("<td>" + buildData[i].count + "</td>");
            tableHtml.push("</tr>");
        }
        return tableHtml.join('');
    },
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
                    cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}")
                } else {
                    if (buildData[y].price_level == 1) {
                        cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}")
                    } else {
                        cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}")
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
    initRelateSHG: function (query_type, name) {
        common.getRelateSHG({"query_type": query_type, "key_name": name}, function () {
            $(".relate-infos").html("关联资讯<i class=\"fa fa-circle-o-notch fa-spin fa-fw\"></i>");
        }, function (resultData) {
            if (resultData.status == 1) {
                var relateInfo = [];
                if (resultData.industry.length > 0) {
                    relateInfo.push("<span>关联行业&nbsp;:&nbsp;</span>");
                    for (var i in resultData.industry) {
                        relateInfo.push("<a href='industry.php?name=" + resultData.industry[i].industry + "' target='_blank'>" + resultData.industry[i].industry + "</a>");
                    }
                }
                if (resultData.stock.length > 0) {
                    relateInfo.push("<span>关联股票&nbsp;:&nbsp;</span>");
                    for (var s in resultData.stock) {
                        relateInfo.push("<a href='stocks.php?stock=" + resultData.stock[s].stock_code + "' target='_blank'>" + resultData.stock[s].stock_name + "</a>");
                    }
                }
                if (resultData.notion.length > 0) {
                    relateInfo.push("<span>关联概念&nbsp;:&nbsp;</span>");
                    for (var n in resultData.notion) {
                        relateInfo.push("<a href='concept.php?name=" + resultData.notion[n].section + "' target='_blank'>" + resultData.notion[n].section + "</a>");
                    }
                }
                $(".relate-infos").html("关联资讯" + relateInfo.join(''));
            }
        })
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
    }
};
