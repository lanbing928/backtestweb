$(function () {
    initEvent.initGroupEvent();
    initEvent.initAddGroupEvent();
    $(".wk-user-mynews .btn-group").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var targets = $(this).attr("data-target");
        $("#" + targets).fadeIn().siblings().fadeOut();
        var arrData = {"query_type": 1, "start_time": 0, "info_type": 0};
        if (targets == "wk-user-news-list") {
            getNewsList(arrData);
        }
        if (targets == "wk-user-vpoint-list") {
            getMediaList(arrData);
        }
        if (targets == "wk-user-fastnews-list") {
            getFastNewsList(arrData);
        }
    });
    $(".wk-user-news-slider i").click(function () {
        if ($(this).attr("data-expand") == "false") {
            $(this).addClass("fa-chevron-up").removeClass("fa-chevron-down").attr("data-expand", true);
            $(".wk-user-news-ctrl").slideDown();
        } else {
            $(this).addClass("fa-chevron-down").removeClass("fa-chevron-up").attr("data-expand", false);
            $(".wk-user-news-ctrl").slideUp();
        }
    });
    $(".wk-user-vpoint-slider i").click(function () {
        if ($(this).attr("data-expand") == "false") {
            $(this).addClass("fa-chevron-up").removeClass("fa-chevron-down").attr("data-expand", true);
            $(".wk-user-vpoint-ctrl").slideDown();
        } else {
            $(this).addClass("fa-chevron-down").removeClass("fa-chevron-up").attr("data-expand", false);
            $(".wk-user-vpoint-ctrl").slideUp();
        }
    });
    $(".wk-user-news-ctrl .user-define i").click(function () {
        if ($(this).attr("data-expand") == "false") {
            $(this).addClass("fa-caret-up").removeClass("fa-caret-down").attr("data-expand", true);
            $(".wk-user-news-ctrl .wk-user-news-ctrl-con").show();
        } else {
            $(this).addClass("fa-caret-down").removeClass("fa-caret-up").attr("data-expand", false);
            $(".wk-user-news-ctrl .wk-user-news-ctrl-con").hide();
        }
    });
    $(".wk-user-vpoint-ctrl .user-define i").click(function () {
        if ($(this).attr("data-expand") == "false") {
            $(this).addClass("fa-caret-up").removeClass("fa-caret-down").attr("data-expand", true);
            $(".wk-user-vpoint-ctrl .wk-user-news-ctrl-con").show();
        } else {
            $(this).addClass("fa-caret-down").removeClass("fa-caret-up").attr("data-expand", false);
            $(".wk-user-vpoint-ctrl .wk-user-news-ctrl-con").hide();
        }
    });

    $(".wk-sub-refresh").click(function () {
        $(this).addClass("fa-spin");
        var refresh_name = $(this).attr("data-refresh");
        getGroupStock(refresh_name);
    });

    /**
     * 搜索框自动完成
     */
    $(".wk-user-stock-search").typeahead({
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
            "股票": {url: ["../ajax/ajax_search.php?message={{query}},", "stock"]}
        },
        callback: {
            onClickAfter: function (node, a, item) {
                if (item.display !== "") {
                    var stockCode = item.display.substring(item.display.indexOf("(") + 1, item.display.indexOf(")"));
                    var groupName = $(".wk-sub-refresh").attr("data-refresh");
                    inforcenter.addStock({ori_name: groupName, code: stockCode}, null, function (resultData) {
                        if (resultData && resultData.status == 1) {
                            //TODO 暂时以全部刷新,之后改为直接追加到后面
                            getGroupStock(groupName);
                        }
                    })
                }
            }
        }
    });
    getStockPoint();//大盘指数
    getMyGroup();//我的组合
    getGroupStock("我的自选股");//我的自选股
    setInterval(_getNowTime, 1000);
    getPlatform();
    getNewsList({"query_type": 1, "start_time": 0, "info_type": 0});
    //setInterval(getStockPoint, 5000);
});
/**
 * 获取大盘数据
 */
function getStockPoint() {
    inforcenter.getStockPoint(null, function (resultData) {
        if (resultData && resultData.status == 1) {
            if (resultData.result.info.index_info.length > 0) {
                var indexHtml = [];
                var list = resultData.result.info.index_info;
                for (var i = 0; i < list.length; i++) {
                    indexHtml.push("<div class=\"col-md-4\">");
                    indexHtml.push("<div class=\"wk-user-datas-box " + Utility.getUpDownColor(list[i].up_price) + "\">");
                    indexHtml.push("<p class=\"wk-user-datas-title\">" + list[i].name + "</p><div>");
                    indexHtml.push("<p class=\"wk-user-datas-num\">");
                    if (list[i].up_price > 0) {
                        indexHtml.push("<img src=\"../static/imgs/i/dp_up.png\">");
                    }
                    else if (list[i].up_price < 0) {
                        indexHtml.push("<img src=\"../static/imgs/i/dp_down.png\">");
                    }
                    indexHtml.push(list[i].price);
                    indexHtml.push("</p>");
                    indexHtml.push("<div class=\"wk-user-datas-per\">");
                    indexHtml.push("<p>" + (list[i].up_price > 0 ? "\+" : "") + (list[i].up_price * 100).toFixed(2) + "</p>");
                    indexHtml.push("<p>" + (list[i].up_percent > 0 ? "\+" : "") + (list[i].up_percent * 100).toFixed(2) + "%</p>");
                    indexHtml.push("</div></div><hr></div></div>");
                }
                $(".wk-user-datas").html(indexHtml.join(''));
            }
        }
    })
}
/**
 * 获取我的组合
 */
function getMyGroup() {
    inforcenter.showGroup(null, function (resultData) {
        if (resultData && resultData.status == 1) {
            if (resultData.result.info.group_name.length > 0) {
                var list = resultData.result.info.group_name;
                var groupHtml = [];
                groupHtml.push("<div class=\"active\" data-group-name=\"我的自选股\">我的自选股</div>");
                for (var i = 0; i < list.length; i++) {
                    groupHtml.push("<div class=\"btn-group\" data-group-name='" + list[i] + "'>");
                    groupHtml.push("<span>" + list[i] + "</span>");
                    groupHtml.push("<span class=\"dropdown-toggle\" data-toggle=\"dropdown\">");
                    groupHtml.push("<i class=\"fa fa-chevron-down\"></i>");
                    groupHtml.push("</span>");
                    groupHtml.push("<ul class=\"dropdown-menu\" data-group-name='" + list[i] + "'>");
                    groupHtml.push("<li class='change-name'><a href=\"#\"><i class=\"fa fa-pencil fa-fw\"></i>更改名称</a></li>");
                    groupHtml.push("<li class='del-group'><a href=\"#\"><i class=\"fa fa-trash-o fa-fw\"></i>删除组合</a></li>");
                    groupHtml.push("</ul></div>");
                }
                $(".wk-user-choose-title").html(groupHtml.join(''));
                initEvent.initChangeGroupNameEvent();
                initEvent.initDelGroupEvent();
                initEvent.initGroupEvent();
            }
        }
    })
}
/**
 * 获取组合下的股票
 * @param ori_name
 */
function getGroupStock(ori_name) {
    inforcenter.showstock({ori_name: ori_name}, function () {
        $(".wk-sub-refresh").addClass("fa-spin");
    }, function (resultData) {
        var stockHtml = [];
        if (resultData && resultData.status == 1) {
            $(".wk-sub-refresh").removeClass("fa-spin");
            if (resultData.result.info.group_info.length > 0) {
                var list = resultData.result.info.group_info[0].stock_info;
                for (var i = 0; i < list.length; i++) {
                    stockHtml.push("<tr>");
                    stockHtml.push("<td>" + list[i].code + "</td>");
                    stockHtml.push("<td><a href='../stocks.php?stock=" + list[i].code + "' target='_blank'>" + list[i].name + "</a></td>");
                    stockHtml.push("<td>" + list[i].trade.toFixed(2) + "</td>");
                    stockHtml.push("<td>" + (list[i].price_change_ratio * 100).toFixed(2) + "</td>");
                    stockHtml.push("<td>" + list[i].volume + "</td>");
                    stockHtml.push("<td>" + (list[i].amount * 100).toFixed(2) + "%</td>");
                    stockHtml.push("<td>" + (list[i].pe * 100).toFixed(2) + "%</td>");
                    stockHtml.push("<td>" + list[i].visit_hot + "</td>");
                    stockHtml.push("<td>" + list[i].search_hot + "</td>");
                    stockHtml.push("<td>" + list[i].follow_hot + "</td>");
                    stockHtml.push("<td><i class='fa fa-minus-circle text-danger btn-del-stock' data-stock-code='" + list[i].code + "'></i></td>");
                    stockHtml.push("</tr>");
                }
            } else {
                stockHtml.push("<tr><td colspan='11'><div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>您尚未添加自选股</span></div></td></tr>");
            }
        } else {
            stockHtml.push("<tr><td colspan='11'><div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>您尚未添加自选股</span></div></td></tr>");
        }
        $(".wk-user-mychoose-table table>tbody").html(stockHtml.join(''));
        initEvent.initStockTableHoverEvent();
    })
}

/**
 * 获取所有平台
 */
function getPlatform() {
    inforcenter.getPlatform(null, function (resultData) {
        if (resultData.status == 1) {
            var news_platform = resultData.result[0].news_info_plat;
            var vpoint_platform = resultData.result[2].media_info_plat;
            if (news_platform && news_platform.length > 0) {
                var newsHtml = [];
                for (var i = 0; i < news_platform.length; i++) {
                    newsHtml.push("<div class=\"con-item\">");
                    if (news_platform[i].is_choosed == 1) {
                        newsHtml.push("<label><span class='active'>" + news_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-times-circle\"></i></label>");
                    }
                    else {
                        newsHtml.push("<label><span>" + news_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-plus\"></i></label>");
                    }
                    newsHtml.push("</div>");
                }
                $(".wk-user-news-list .wk-user-news-ctrl-con").html(newsHtml.join(''));
            }
            if (vpoint_platform && vpoint_platform.length > 0) {
                var vpointHtml = [];
                for (var i = 0; i < vpoint_platform.length; i++) {
                    vpointHtml.push("<div class=\"con-item\">");
                    if (vpoint_platform[i].is_choosed == 1) {
                        vpointHtml.push("<label><span class='active'>" + vpoint_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-times-circle\"></i></label>");
                    }
                    else {
                        vpointHtml.push("<label><span>" + vpoint_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-plus\"></i></label>");
                    }
                    vpointHtml.push("</div>");
                }
                $(".wk-user-vpoint-list .wk-user-news-ctrl-con").html(vpointHtml.join(''));
            }
            initEvent.initPlatformShowEvent();
        }
    })
}

/**
 * 获取当前时间
 * @private
 */
function _getNowTime() {
    var toDay = new Date();//创建时间对象
    var _hour = toDay.getHours();//时
    var _minutes = toDay.getMinutes() > 10 ? toDay.getMinutes() : "0" + toDay.getMinutes();//分
    var _seconds = toDay.getSeconds() > 10 ? toDay.getSeconds() : "0" + toDay.getSeconds();//秒
    var time = _hour + ":" + _minutes + ":" + _seconds;
    $(".wk-user-time span:last-child").html(time);
}

function getNewsList(arrData) {
    arrData.info_type = 0;
    inforcenter.getRelatedInfo(arrData, null, function (resultData) {
        if (resultData && resultData.status == 1) {
            buildNews(resultData.result);
        }
    })
}
function getMediaList(arrData) {
    arrData.info_type = 2;
    inforcenter.getRelatedInfo(arrData, null, function (resultData) {
        if (resultData && resultData.status == 1) {
            buildMedia(resultData.result);
        }
    })
}
function getFastNewsList(arrData) {
    arrData.info_type = 1;
    inforcenter.getRelatedInfo(arrData, null, function (resultData) {
        if (resultData && resultData.status == 1) {
            buildFastNews(resultData.result);
        }
    })
}
function buildNews(resultData) {
    var newsHtml = [];
    if (resultData.length > 0) {
        for (var i = 0; i < resultData.length; i++) {
            newsHtml.push("<div class=\"wk-news-list\" id=\"news_" + resultData[i].info_id + "\" data-news-timestamp=\"" + resultData[i].timestamp + "\">");
            newsHtml.push("<div class=\"news-rel-stock\">");
            if (resultData[i].related_stock.length > 0) {
                for (var j = 0; j < resultData[i].related_stock.length; j++) {
                    var stock_name = resultData[i].related_stock[j].stock_name;
                    var stock_code = resultData[i].related_stock[j].stock_code;
                    if (stock_name != "" && stock_code != "") {
                        newsHtml.push("<a href='../stocks.php?stock=" + stock_code + "' target='_blank'>" + stock_name + "(" + stock_code + ")</a>");
                    }
                }
            }
            newsHtml.push("</div>");
            newsHtml.push("<div class=\"wk-news-list-head\">");
            newsHtml.push("<p class=\"wk-news-list-title\"><a href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">");
            newsHtml.push(resultData[i].titile);
            newsHtml.push("</a></p>" + Utility.getgetEmotion(resultData[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
            if (resultData[i].summary != "") {
                newsHtml.push("<strong>【机器人摘要】</strong>");
                newsHtml.push(resultData[i].summary);
                newsHtml.push("<a href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
            }
            newsHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
        }
        $("#wk-user-news-list").append(newsHtml.join(''));
    } else {
        // if (arrData.start_id == 0) {
        //     common.hideLoading();
        //     newsHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关新闻资讯</span></div>");
        //     $("#wk-news .mCSB_container").html(newsHtml.join(''));
        // } else {
        //     common.hideLoading();
        // }
    }
}
function buildMedia(resultData) {
    var mediaHtml = [];
    if (resultData.length > 0) {
        for (var i = 0; i < resultData.length; i++) {
            mediaHtml.push("<div class=\"wk-news-list\" id=\"media_" + resultData[i].info_id + "\" data-news-timestamp=\"" + resultData[i].timestamp + "\">");
            mediaHtml.push("<div class=\"news-rel-stock\">");
            if (resultData[i].related_stock.length > 0) {
                for (var j = 0; j < resultData[i].related_stock.length; j++) {
                    var stock_name = resultData[i].related_stock[j].stock_name;
                    var stock_code = resultData[i].related_stock[j].stock_code;
                    if (stock_name != "" && stock_code != "") {
                        mediaHtml.push("<a href='../stocks.php?stock=" + stock_code + "' target='_blank'>" + stock_name + "(" + stock_code + ")</a>");
                    }
                }
            }
            mediaHtml.push("</div>");
            mediaHtml.push("<div class=\"wk-news-list-head\">");
            mediaHtml.push("<p class=\"wk-news-list-title\"><a href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">");
            mediaHtml.push(resultData[i].titile);
            mediaHtml.push("</a></p>" + Utility.getgetEmotion(resultData[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
            if (resultData[i].summary != "") {
                mediaHtml.push("<strong>【机器人摘要】</strong>");
                mediaHtml.push(resultData[i].summary);
                mediaHtml.push("<a href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
            }
            mediaHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
        }
        $("#wk-user-vpoint-list").append(mediaHtml.join(''));
    } else {
        // if (arrData.start_id == 0) {
        //     common.hideLoading();
        //     newsHtml.push("<div class=\"wk-news-no\"><img src=\"static/imgs/i/nonews.png\"><span>暂无相关新闻资讯</span></div>");
        //     $("#wk-news .mCSB_container").html(newsHtml.join(''));
        // } else {
        //     common.hideLoading();
        // }
    }
}
function buildFastNews(resultData) {
    var fastHtml = [];
    if (resultData.length > 0) {
        for (var i in resultData) {
            for (var j in resultData[i]) {
                fastHtml.push();
                fastHtml.push("<div class=\"wk-user-fastnews\">");
                fastHtml.push("                    <span class=\"wk-user-fastnews-dot\">●</span>");
                fastHtml.push("                    <p class=\"wk-user-fastnews-todate\">" + j + "</p>");
                fastHtml.push("                    <ul>");
                for (var k = 0; k < resultData[i][j].length; k++) {
                    fastHtml.push("                        <li>");
                    fastHtml.push("                            <label>" + Utility.unixToTime(resultData[i][j][k].timestamp) + "</label>");
                    fastHtml.push("                            <p>" + resultData[i][j][k].summary + "</p>");
                    fastHtml.push("                        </li>");
                }
                fastHtml.push("                    </ul>");
                fastHtml.push("                </div>");
            }
        }
        $("#wk-user-fastnews-list").append(fastHtml.join(''));
    }
}
/**
 * 初始化一些事件
 */
var initEvent = {
    /**
     * 我的自选组合事件
     */
    initGroupEvent: function () {
        $(".wk-user-choose-title div").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var group_name = $(this).attr("data-group-name");
            $(".wk-sub-refresh").attr("data-refresh", group_name);
            getGroupStock(group_name);
        });
    },
    /**
     * 修改组合名字
     */
    initChangeGroupNameEvent: function () {
        $(".change-name").bind("click", function () {
            var group_name = $(this).parent().attr("data-group-name");
            swal({
                title: "更改名称【" + group_name + "】",
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
                inforcenter.modifyGroup({ori_name: group_name, cur_name: inputValue}, null, function (resultData) {
                    if (resultData.status == 1) {
                        swal({
                            title: "",
                            text: "修改组合<span style='color: #F8BB86'>" + group_name + "</span>为<span style='color: #F8BB86'>" + inputValue + "</span>成功",
                            html: true,
                            type: "success"
                        });
                        getMyGroup();
                    }
                });
            });
        });
    },
    /**
     * 删除组合
     */
    initDelGroupEvent: function () {
        $(".del-group").bind("click", function () {
            var group_name = $(this).parent().attr("data-group-name");
            swal({
                title: "",
                text: "确定删除<span style='color: #F8BB86'>" + group_name + "</span>吗?此操作将无法恢复!",
                type: "warning",
                html: true,
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    inforcenter.delGroup({ori_name: group_name}, null, function (resultData) {
                        if (resultData.status == 1) {
                            swal({
                                title: "",
                                text: "组合<span style='color: #F8BB86'>" + group_name + "</span>已被删除",
                                html: true,
                                type: "success"
                            });
                            getMyGroup();
                        }
                    });
                }
            });
        });
    },
    /**
     * 添加组合
     */
    initAddGroupEvent: function () {
        $(".wk-add-zh").click(function () {
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
                            type: "success"
                        });
                        getMyGroup();
                    } else {
                        swal({
                            title: "",
                            text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>组合异常",
                            html: true,
                            type: "success"
                        });
                    }
                });
            });
        });
    },
    /**
     * 股票列表hover事件
     */
    initStockTableHoverEvent: function () {
        $(".wk-user-mychoose-table table>tbody>tr").hover(function () {
            var del_stock_name = $(this).find("td:nth-child(2)").html();
            $(this).find(".btn-del-stock").show().bind("click", function () {
                var del_stock = $(this).attr("data-stock-code");
                var del_group = $(".wk-sub-refresh").attr("data-refresh");
                swal({
                    title: "",
                    text: "确定删除<span style='color: #F8BB86'>" + del_stock_name + "(" + del_stock + ")</span>吗?此操作将无法恢复!",
                    type: "warning",
                    html: true,
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        inforcenter.delStock({ori_name: del_group, code: del_stock}, null, function (resultData) {
                            if (resultData.status == 1) {
                                swal({
                                    title: "",
                                    text: "<span style='color:#F8BB86'>" + del_stock_name + "(" + del_stock + ")</span>已被删除",
                                    html: true,
                                    type: "success"
                                });
                                getGroupStock(del_group);
                            }
                        });
                    }
                });
            });
        }, function () {
            $(this).find(".btn-del-stock").hide();
        })
    },
    /**
     * 新闻平台hover显示添加或删除按钮
     */
    initPlatformShowEvent: function () {
        $(".wk-user-news-ctrl-con div").hover(function () {
            $(this).find("i").show();
        }, function () {
            $(this).find("i").hide();
        });
    }
};