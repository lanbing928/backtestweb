"use strict";
(function ($, window, document) {
    //获取传过来的股票代码
    var stockcode = Utility.getQueryStringByName("stock");
    var stockName = "";
    var xdata = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24：00"];
    var viewData = [], searchData = [], followData = [];
    var wkTreemapDataIndustry, wkTreemapDataConcept;
    var keyName = stockcode + "s";

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
        var leftHotChart = echarts.init(document.getElementById("left-hot-chart"));
        common.getSingleRealTimeHot({
            "stock": stockcode,
            "hour_data": "stock"
        }, function () {
            leftHotChart.showLoading({text: "加载中..."});
        }, function (resultData) {
            if (resultData.status === 1) {
                var todayHot = [];
                var lastHot = [];
                if (resultData.visit) {
                    var vnum = 0;
                    for (var v in resultData.visit) {
                        if (resultData.visit.hasOwnProperty(v)) {
                            viewData.push(resultData.visit[v]);
                            vnum++;
                        }
                    }
                    viewData = JSON.parse("[" + viewData.join(',') + "]");
                    var _v = Math.max.apply(Math, viewData);
                    var vindex = viewData.indexOf(Math.max.apply(Math, viewData));
                    lastHot.push("<tr><td>查看</td><td>" + viewData[viewData.length - 1] + "</td><td>" + (Utility.getNowFormatDate() + " " + (vnum - 1) + ":00") + "</td></tr>");
                    todayHot.push("<tr><td>查看</td><td>" + _v + "</td><td>" + Utility.calTime(vindex) + "</td></tr>");
                }
                if (resultData.search) {
                    var snum = 0;
                    for (var s in resultData.search) {
                        if (resultData.search.hasOwnProperty(s)) {
                            searchData.push(resultData.search[s]);
                            snum++;
                        }
                    }
                    searchData = JSON.parse("[" + searchData.join(',') + "]");
                    var _s = Math.max.apply(Math, searchData);
                    var sindex = searchData.indexOf(Math.max.apply(Math, searchData));
                    lastHot.push("<tr><td>搜索</td><td>" + searchData[searchData.length - 1] + "</td><td>" + (Utility.getNowFormatDate() + " " + (snum - 1) + ":00") + "</td></tr>");
                    todayHot.push("<tr><td>搜索</td><td>" + _s + "</td><td>" + Utility.calTime(sindex) + "</td></tr>");
                }
                if (resultData.follow) {
                    var fnum = 0;
                    for (var f in resultData.follow) {
                        if (resultData.follow.hasOwnProperty(f)) {
                            followData.push(resultData.follow[f]);
                            fnum++;
                        }
                    }
                    followData = JSON.parse("[" + followData.join(',') + "]");
                    var _f = Math.max.apply(Math, followData);
                    var findex = followData.indexOf(Math.max.apply(Math, followData));
                    lastHot.push("<tr><td>关注</td><td>" + followData[followData.length - 1] + "</td><td>" + (Utility.getNowFormatDate() + " " + (fnum - 1) + ":00") + "</td></tr>");
                    todayHot.push("<tr><td>关注</td><td>" + _f + "</td><td>" + Utility.calTime(findex) + "</td></tr>");
                }
                $(".todayhot").html(todayHot.join(''));
                $(".latesthot").html(lastHot.join(''));
                common.getLineChart("left-hot-chart", xdata, viewData, searchData, followData);
            }
        });
    }

    /**
     * 初始化热力图
     */
    function initTreeMapChart(resultData) {
        var waitLogingCharts = ["wk-industry-view-treemap", "wk-concept-view-treemap"];
        for (var i in waitLogingCharts) {
            if (waitLogingCharts.hasOwnProperty(i)) {
                var treemap = echarts.init(document.getElementById(waitLogingCharts[i]));
                treemap.showLoading({"text": "加载中..."});
            }
        }
        if (resultData.status === 1) {
            var relIndustry = resultData.stock_info.industry;
            var relConcept = resultData.stock_info.section;
            var relIndusLink = "";
            var relConLink = "";
            if (relIndustry.length > 0) {
                $(".hy-title").html(relIndustry[0].indus + "行业热度情况");
                for (var i in relIndustry) {
                    if (relIndustry.hasOwnProperty(i)) {
                        relIndusLink += "<a href='industry.php?name=" + relIndustry[i].indus + "' target='_blank'>" + relIndustry[i].indus + "</a>";
                    }
                }
            }
            if (relConcept.length > 0) {
                $(".gn-title").html(relConcept[0].sect + "概念热度情况");
                for (var j in relConcept) {
                    if (relConcept.hasOwnProperty(j)) {
                        relConLink += "<a href='concept.php?name=" + relConcept[j].sect + "' target='_blank'>" + relConcept[j].sect + "</a>";
                    }
                }
            }
            if ($("#industry-view").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                $("#industry-view").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(1, 2, 2, relIndustry[0].indus));
            }
            if ($("#industry-search").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                $("#industry-search").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(2, 2, 2, relIndustry[0].indus));
            }
            if ($("#industry-follow").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                $("#industry-follow").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(3, 2, 2, relIndustry[0].indus));
            }
            if ($("#concept-view").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                $("#concept-view").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(1, 3, 2, relConcept[0].sect));
            }
            if ($("#concept-search").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                $("#concept-search").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(2, 3, 2, relConcept[0].sect));
            }
            if ($("#concept-follow").find(".col-md-5 .wk-hot-sub-title a").length <= 0) {
                $("#concept-follow").find(".col-md-5 .wk-hot-sub-title").append(buildRankAtag(3, 3, 2, relConcept[0].sect));
            }
            stockName = resultData.stock_info.stock_name;
            $(".wk-rate-select").attr("data-stock-name", stockName);
            $(".wk-toshow-name").html(stockName + "(" + stockcode + ")");
            Utility.getSinaStockData(stockcode, function (stockData) {
                var stockStatus = Utility.getStockStatus(stockData);
                $(".wk-topshow-price").html("¥" + stockStatus.price).addClass(Utility.getUpDownColor(stockStatus.updown));
                $(".wk-topshow-price-per").html(Utility.getPriceSymbol(stockStatus.updown) + stockStatus.updown.toFixed(2) + "(" + Utility.getPriceSymbol(stockStatus.updown) + stockStatus.percent.toFixed(2) + "%)").addClass(Utility.getUpDownColor(stockStatus.percent));
                //公司概况下拉框
                $(".btn-group li a").click(function () {
                    var url = $(this).attr('href');
                    if (url.indexOf("data") < 0) {
                        $(this).attr("target", "_blank").attr("href", url + "?data=" + stockName + "," + stockcode);
                    }
                })
            });
            $(".wk-topshow-dp label").html(Utility.getTradeTime()).addClass("wk-up");
            $("title").html(resultData.stock_info.stock_name + "(" + resultData.stock_info.stock_code + ")热度情况");
            $(".wk-related-info").html("热度总览&nbsp;<i class=\"fa fa-question-circle-o\" data-toggle=\"popover\" data-content=\"" + resultData.stock_info.stock_name + "每小时产生的热度量\"></i><span>行业：" + relIndusLink + "</span><span>概念：" + relConLink + "");
            $("#wk-top-hots .latesthot-title").html(resultData.stock_info.stock_name + "最近热度");
            $("#wk-top-hots .todayhot-title").html(resultData.stock_info.stock_name + "今日最热度");
            $("#wk-top-stockdata .latesthot-title").html(resultData.stock_info.stock_name + "最新行情");
            $("#wk-top-moneyflow .latesthot-title").html(resultData.stock_info.stock_name + "资金流向");
            $("i[data-toggle='popover']").popover({container: "body", trigger: "hover"});
            var $relatedConcept = relConcept[0].sect;
            var $relatedIndustry = relIndustry[0].indus;
            if (!wkTreemapDataConcept) {
                common.getTopTwentyStock({
                    "hottype": "gn",
                    "hotval": $relatedConcept
                }, function () {
                    $("#concept-view .wk-hot-table tbody").html("<tr><td colspan='5'>加载中...</td></tr>");
                }, function (resultData) {
                    if (resultData.status === 1) {
                        buildConceptTreeMap(resultData);
                        wkTreemapDataConcept = resultData;
                    }
                });
            } else {
                buildConceptTreeMap(wkTreemapDataConcept);
            }
            if (!wkTreemapDataIndustry) {
                common.getTopTwentyStock({
                    "hottype": "hy",
                    "hotval": $relatedIndustry
                }, function () {
                    $("#industry-view .wk-hot-table tbody").html("<tr><td colspan='5'>加载中...</td></tr>");
                }, function (resultData) {
                    if (resultData.status === 1) {
                        buildIndustryTreeMap(resultData);
                        wkTreemapDataIndustry = resultData;
                    }
                });
            } else {
                buildIndustryTreeMap(wkTreemapDataIndustry);
            }
            initTodayRateLine();
            initFollowBtn();
            initReleatedInfo();
        }
    }

    /**
     * 构建行业热力图
     * @param resultData
     */
    function buildIndustryTreeMap(resultData) {
        var maptable;
        if (resultData.result.code_info.shv_.length > 0) {
            var shv = resultData.result.code_info.shv_;
            var suv = resultData.result.code_info.suv_;
            $("#industry-view .wk-hot-table tbody").html(common.buildHotmapTable(shv, "stock"));
            maptable = Utility.buildMapTable(suv);
            $("#industry-view .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#industry-view .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-industry-view-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shs_.length > 0) {
            var shs = resultData.result.code_info.shs_;
            var sus = resultData.result.code_info.sus_;
            $("#industry-search .wk-hot-table tbody").html(common.buildHotmapTable(shs, "stock"));
            maptable = Utility.buildMapTable(sus);
            $("#industry-search .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#industry-search .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-industry-search-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shf_.length > 0) {
            var shf = resultData.result.code_info.shf_;
            var suf = resultData.result.code_info.suf_;
            $("#industry-follow .wk-hot-table tbody").html(common.buildHotmapTable(shf, "stock"));
            maptable = Utility.buildMapTable(suf);
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
        var maptable;
        if (resultData.result.code_info.shv_.length > 0) {
            var shv = resultData.result.code_info.shv_;
            var suv = resultData.result.code_info.suv_;
            $("#concept-view .wk-hot-table tbody").html(common.buildHotmapTable(shv, "stock"));
            maptable = Utility.buildMapTable(suv);
            $("#concept-view .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#concept-view .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-concept-view-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shs_.length > 0) {
            var shs = resultData.result.code_info.shs_;
            var sus = resultData.result.code_info.sus_;
            $("#concept-search .wk-hot-table tbody").html(common.buildHotmapTable(shs, "stock"));
            maptable = Utility.buildMapTable(sus);
            $("#concept-search .right .toggle-treemap-table-up tbody").html(common.buildStockTable(maptable._up));
            $("#concept-search .right .toggle-treemap-table-down tbody").html(common.buildStockTable(maptable._down));
            common.buildHotmap("wk-concept-search-treemap", maptable._map, "stock");
        }
        if (resultData.result.code_info.shf_.length > 0) {
            var shf = resultData.result.code_info.shf_;
            var suf = resultData.result.code_info.suf_;
            $("#concept-follow .wk-hot-table tbody").html(common.buildHotmapTable(shf, "stock"));
            maptable = Utility.buildMapTable(suf);
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
            "query_key": stockcode,
            "query_date": "today"
        };
        common.getRateLine(queryData, function () {
            rateLine.showLoading({
                "text": "加载中..."
            });
        }, function (resultData) {
            common.buildRateLine(stockName, "today", resultData);
            rateLine.hideLoading();
        });
    }

    /**
     * 初始化关注按钮
     */
    function initFollowBtn() {
        inforcenter.showGroup(null, function (resultData) {
            if (resultData && resultData.status === 1) {
                var followBtnHtml = [];
                followBtnHtml.push("<div class=\"btn-group\" style='float: right;'>");
                if ($(".wk-topshow-right .btn-group").length <= 0) {
                    followBtnHtml.push("<button type=\"button\" class=\"btn dropdown-toggle wk-btn-follow\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">");
                    followBtnHtml.push("+ 关注");
                    followBtnHtml.push("</button>");
                    followBtnHtml.push("<ul class=\"dropdown-menu\">");
                    followBtnHtml.push("<li class='wk-follow-stock' data-follow-name='我的自选股'><a href=\"#\">我的自选股</a></li>");
                    if (resultData.result.info.group_name.length > 0) {
                        var list = resultData.result.info.group_name;
                        for (var i = 0; i < list.length; i++) {
                            followBtnHtml.push("<li class='wk-follow-stock' data-follow-name='" + list[i] + "'><a href=\"#\">" + list[i] + "</a></li>");
                        }
                        followBtnHtml.push("<li class=\"wk-follow-stock\" id='addNewGroup' data-follow-name=\"addNewGroup\"><a href=\"javascript:\">添加组合</a></li>");
                    }
                    $(".wk-topshow-right").append(followBtnHtml.join(""));
                    followBtnHtml.push("</ul>");
                    followBtnHtml.push("</div>");
                }
                initFollowEvent();
            }
        });
    }

    /**
     * 绑定关注按钮事件
     */
    function initFollowEvent() {
        $(".wk-follow-stock").each(function () {
            var followName = $(this).attr("data-follow-name");
            $(this).unbind("click").bind("click", function () {
                if (followName === "addNewGroup") {
                    swal({
                        title: "添加组合",
                        text: "组合名称不能超过6个汉字或12个字符",
                        type: "input",
                        html: true,
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        animation: "slide-from-top",
                        inputPlaceholder: "请输入组合名称"
                    }, function (inputValue) {
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                            swal.showInputError("请输入组合名称");
                            return false;
                        }
                        if (Utility.getByteLen(inputValue) > 12) {
                            swal.showInputError("字符数超过限制");
                            return false;
                        }
                        inforcenter.addGroup({ori_name: inputValue}, null, function (resultData) {
                            if (resultData.status == 1) {
                                swal({
                                    title: "",
                                    text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>组合成功",
                                    html: true,
                                    timer: 1000,
                                    showConfirmButton: false
                                });
                                $("#addNewGroup").before("<li class='wk-follow-stock' data-follow-name='" + inputValue + "'><a href=\"#\">" + inputValue + "</a></li>");
                                initAddStock(inputValue, stockcode, false);
                                initFollowEvent();
                            } else if (resultData.status == 0) {
                                swal({
                                    title: "",
                                    text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>组合异常," + resultData.msg + "",
                                    html: true,
                                    timer: 1000,
                                    showConfirmButton: false
                                });
                            }
                        });
                    });
                } else {
                    initAddStock(followName, stockcode, true);
                }
            });
        });
    }

    /**
     * 添加股票
     * @param followName
     * @param addCode
     * @param showAlert
     */
    function initAddStock(followName, addCode, showAlert) {
        inforcenter.addStock({ori_name: followName, code: addCode}, null, function (addResult) {
            if (addResult.status === 1) {
                if (showAlert) {
                    swal({
                        title: "",
                        text: "关注个股<span style='color: #F8BB86'>" + addCode + "</span>成功",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            } else if (addResult.status === 0) {
                swal({
                    title: "",
                    text: "关注个股<span style='color: #F8BB86'>" + addCode + "</span>异常," + addResult.msg + "",
                    html: true,
                    timer: 1000,
                    showConfirmButton: false
                });
            } else {
                swal({
                    title: "",
                    text: "关注个股<span style='color: #F8BB86'>" + addCode + "</span>异常,未知原因",
                    html: true,
                    timer: 1000,
                    showConfirmButton: false
                });
            }
        });
    }

    /**
     * 获取关联信息图
     */
    function initReleatedInfo() {
        common.initRelateSHG(1, stockcode, function (resultData) {
            if (resultData && resultData.status === 1) {
                var relateRank = [];
                if (resultData.industry && resultData.industry.length > 0) {
                    relateRank.push("{ \"industry\": \"" + resultData.industry[0].industry + "\", \"concept\": \"" + resultData.notion[0].section + "\" }");
                }
                var thisName = stockName + "(" + stockcode + ")";
                common.buildReleatedInfoChart(thisName, resultData);
            }
        });
    }

    /**
     * 初始化查看数据详细图表
     */
    function initModalChart() {
        $(".modal-chart").modal("show");
        var modalChart = echarts.init(document.getElementById("modal-chart"));
        common.getSingleRealTimeHot({"stock": stockcode}, function () {
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
                    modalViewData = JSON.parse("[" + modalViewData.join(',') + "]");
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
                                    if (params[p].value && params[p].value !== 0) {
                                        if (params[0].name === params[p].name) {
                                            showLabel += "<label style='color: " + params[p].color + ";font-size: 14x;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + Utility.formatNum(params[p].value) + "<br>";
                                        }
                                    }
                                }
                            }
                            return showLabel;
                        }
                    },
                    dataZoom: [{type: 'inside', realtime: true}, {type: 'slider', show: true, realtime: true}],
                    grid: {top: 10, left: 20, right: 20, bottom: 40, containLabel: true},
                    legend: {left: "left"},
                    xAxis: {type: "category", boundaryGap: false, data: modalxData},
                    yAxis: {type: "value", position: "right", scale: true},
                    calculable: false,
                    series: [{name: "查看", type: "line", smooth: true, data: modalViewData}]
                });
                myChart.hideLoading();
                window.onresize = myChart.resize;
            }
        });
    }

    /**
     * 初始化头部股票价格及时间信息
     */
    function initTopStockData() {
        $("#wk-show-chart-tip").html("<label>当前价：<span>--</span></label><label>成交量：<span>--</span>股</label><label>时间：<span>--</span></label><label>涨幅：<span>--</span></label>");
        var charts = echarts.init(document.getElementById("left-stockdata-chart"));
        common.getCurve({code: stockcode}, function () {
            charts.showLoading({text: "加载中..."});
        }, function (resultData) {
            var userData = [];
            var datas = [];
            var times = [];
            if (resultData.status === 1) {
                charts.hideLoading();
                var list = resultData.result.code_info || [];
                if (list.length > 0) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        times.push(Utility.unixToTime(list[i].time * 1000));
                        datas.push(list[i].price);
                        userData.push({
                            price: list[i].price,
                            average_price: list[i].average_price,
                            pcr: list[i].price_change_ratio,
                            volume: list[i].volume,
                            time: list[i].time
                        });
                    }
                }
                charts.setOption({
                    color: ["rgb(12, 145, 179)"],
                    tooltip: {
                        trigger: "axis",
                        formatter: function (params) {
                            var showData = userData[params[0].dataIndex];
                            var showLabel = "";
                            showLabel += params[0].name + "<br>";
                            for (var p in params) {
                                if (params.hasOwnProperty(p)) {
                                    if (params[p].value && params[p].value !== 0) {
                                        if (params[0].name === params[p].name) {
                                            showLabel += "<label style='color: " + params[p].color + ";font-size: 12x;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + Utility.formatNum(params[p].value) + "<br>";
                                        }
                                    }
                                }
                            }
                            $("#wk-show-chart-tip").html("<label>当前价:<span class='" + Utility.getPriceColor(showData.pcr) + "'>" + showData.price + "</span></label><label>成交量:<span>" + (showData.volume).toChineseNum() + "</span>股</label><label>时间:<span>" + Utility.unixToTime(showData.time * 1000) + "</span></label><label>涨幅：<span class='" + Utility.getPriceColor(showData.pcr) + "'>" + Utility.getPriceSymbol(showData.pcr) + "" + showData.pcr + "</span></label>");
                            $(".wk-top-panelcon").mouseleave(function () {
                                $("#wk-show-chart-tip").html("<label>当前价：<span>--</span></label><label>成交量：<span>--</span>股</label><label>时间：<span>--</span></label><label>涨幅：<span>--</span></label>");
                            });
                            return showLabel;
                        }
                    },
                    grid: {top: "10px", left: "3%", right: "3%", bottom: 10, containLabel: true},
                    xAxis: {
                        type: "category", boundaryGap: false, data: times, axisLabel: {
                            interval: 60
                        }
                    },
                    yAxis: {type: "value", position: "right", scale: true},
                    calculable: false,
                    series: [
                        {
                            name: "大盘数据",
                            type: "line",
                            smooth: true,
                            showSymbol: false,
                            symbolSize: 2,
                            data: userData.map(function (item) {
                                return item.price;
                            }),
                            lineStyle: {normal: {width: 1}}
                        }
                    ]
                });
                window.onresize = charts.resize;
            }
        });
        common.getGrail({code: stockcode}, null, function (resultData) {
            var grailHtml = [];
            if (resultData.status === 1) {
                var datas = resultData.result.code_info;
                grailHtml.push("<tr><td>今开：<span>" + datas.open.toFixed(2) + "</span></td><td>换手率：<span>" + datas.amount.toFixed(2) + "</span></td></tr>");
                grailHtml.push("<tr><td>昨收：<span>" + datas.settlement_.toFixed(2) + "</span></td><td>每股收益：<span>" + datas.eps.toFixed(2) + "</span></td></tr>");
                grailHtml.push("<tr><td>最高：<span>" + datas.high.toFixed(2) + "</span></td><td>总股本：<span>" + (datas.totals * 10000).toChineseNum() + "</span></td></tr>");
                grailHtml.push("<tr><td>最低：<span>" + datas.low.toFixed(2) + "</span></td><td>总市值：<span>" + (datas.zsz * 10000).toChineseNum() + "</span></td></tr>");
                grailHtml.push("<tr><td>市盈率：<span>" + datas.pe.toFixed(2) + "</span></td><td>流通市值：<span>" + (datas.ltsz * 10000).toChineseNum() + "</span></td></tr>");
                grailHtml.push("<tr><td>市净率：<span>" + datas.pb.toFixed(2) + "</span></td><td>成交量：<span>" + (datas.volume).toChineseNum() + "股</span></td></tr>");
                $("#wk-top-stockdata .right-infos table>tbody").html(grailHtml.join(''));
            }
        });
    }

    var arrData = {
        query_type: 1,
        key: stockcode,
        start_id: 0,
        info_type_list: "",
        start_time: 0
    };
    $(".nav-tabs li a").bind("click", function () {
        if ($(this).attr("href").indexOf("#wk-selfmedia") === 0) {
            if ($("#mCSB_2_container").html().trim() === "") {
                arrData.start_id = 0;
                arrData.start_time = 0;
                common.getSelfMedia(arrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-newsflash") === 0) {
            if ($("#wk-newsflash table>tbody").html().trim() === "") {
                arrData.start_id = 0;
                arrData.start_time = 0;
                common.getFastNews(arrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-notice") === 0) {
            if ($("#mCSB_4_container").html().trim() === "") {
                arrData.start_id = 0;
                common.getNotice(arrData, true);
            }
        }
        if ($(this).attr("href").indexOf("#wk-report") === 0) {
            if ($("#mCSB_5_container").html().trim() === "") {
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
            common.getLineChart("left-hot-chart", xdata, viewData, searchData, followData);
        } else {
            common.getHotRecord(arrData, function () {
                var myChart = echarts.init(document.getElementById("left-hot-chart"));
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
                common.getLineChart("left-hot-chart", xdataAll, viewDataAll, searchDataAll, followDataAll);
            });
        }
    });
    $(".treemap-toggle span").click(function () {
        $(this).addClass("treemap-active").siblings().removeClass("treemap-active");
        var to = $(this).parent().parent().parent();
        if ($(this).html() === "热力图") {
            to.find(".toggle-treemap").show();
            to.find(".toggle-treemap-table-up").hide();
            to.find(".toggle-treemap-table-down").hide();
        } else if ($(this).html() === "涨幅") {
            to.find(".toggle-treemap").hide();
            to.find(".toggle-treemap-table-up").show();
            to.find(".toggle-treemap-table-down").hide();
        } else if ($(this).html() === "跌幅") {
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
        if (querytype === "stock") {
            if (stockName) {
                querykey = stockName;
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
            case "datacompare":
                common.getRateLine(queryData, function () {
                    rateLine.showLoading({"text": "加载中..."});
                }, function (resultData) {
                    rateLine.hideLoading();
                    buildRateCompare(resultData);
                });
                break;
            default:
                break;
        }
    });
    function buildRateCompare(buildData) {
        var dateArr = [];
        var r1Data = [];
        var r2Data = [];
        var r3Data = [];
        if (buildData.body && buildData.body.list.length > 0) {
            var list = buildData.body.list;
            for (var i = 0; i < list.length; i++) {
                dateArr.push(Utility.unixToTime(list[i].trade_time * 1000));
                r1Data.push(list[i].day_yield);
                r2Data.push(list[i].hs300_day_yield);
                r3Data.push(list[i].visit);
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
                        if (params.hasOwnProperty(p)) {
                            if (params[p].seriesName !== "查看热度") {
                                if (params[p].value && params[p].value !== 0) {
                                    if (params[0].name === params[p].name) {
                                        showLabel += "<label style='color: " + params[p].color + ";font-size: 14px;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + (params[p].value * 100).toFixed(2) + "%" + "<br>";
                                    }
                                }
                            } else {
                                showLabel += "<label style='color: " + params[p].color + ";font-size: 14px;'>●</label>&nbsp;&nbsp;" + params[p].seriesName + ":" + params[p].value + "<br>";
                            }
                        }
                    }
                    return showLabel;
                }
            },
            color: ["rgb(151,47,134)", "rgb(65,77,92)", "rgb(250,100,100)"],
            legend: {data: ["收益率", '沪深300', "查看热度"], top: 0},
            grid: {top: '25px', left: 0, right: 0, bottom: 0, containLabel: true},
            xAxis: {type: 'category', boundaryGap: false, data: dateArr, axisLabel: {interval: 10}},
            yAxis: [{
                type: 'value', position: 'right', axisLabel: {
                    formatter: function (value) {
                        if (value !== 0) {
                            return (value * 100).toFixed(2) + "%";
                        } else {
                            return 0;
                        }
                    }
                }
            }, {type: 'value', position: 'left'}],
            series: [
                {name: "收益率", type: 'line', smooth: true, yAxisIndex: 0, data: JSON.parse("[" + r1Data + "]")},
                {name: '沪深300', type: 'line', smooth: true, yAxisIndex: 0, data: JSON.parse("[" + r2Data + "]")},
                {name: '查看热度', type: 'line', smooth: true, yAxisIndex: 1, data: JSON.parse("[" + r3Data + "]")}
            ]
        };
        rateChart.setOption(option);
        window.onresize = rateChart.resize;
    }

    $(".wk-topcharts-box ul>li>a").bind("click", function () {
        if ($(this).attr("aria-controls") === "wk-top-stockdata") {
            initTopStockData();
        }
    });
    /**
     * 初始化关联股票基础信息
     */
    common.getStockBase({
        "stock": stockcode
    }, null, function (resultData) {
        initTreeMapChart(resultData);
        $('.wk-hotmap a[data-toggle="tab"]').on('shown.bs.tab', function () {
            initTreeMapChart(resultData);
        });
    });
    common.getNews(arrData, true);
    initLineChart();
    common.initdoubleLine(1, keyName);
})(jQuery, window, document);