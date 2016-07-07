$(function () {
    initEvent.initGroupEvent();
    initEvent.initAddGroupEvent();
    $(".wk-user-mynews .btn-group").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        var targets = $(this).attr("data-target");
        $("#" + targets).fadeIn().siblings().fadeOut();
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
            $(".wk-user-news-ctrl .wk-user-news-ctrl-con").slideDown();
        } else {
            $(this).addClass("fa-caret-down").removeClass("fa-caret-up").attr("data-expand", false);
            $(".wk-user-news-ctrl .wk-user-news-ctrl-con").slideUp();
        }
    });
    $(".wk-user-vpoint-ctrl .user-define i").click(function () {
        if ($(this).attr("data-expand") == "false") {
            $(this).addClass("fa-caret-up").removeClass("fa-caret-down").attr("data-expand", true);
            $(".wk-user-vpoint-ctrl .wk-user-news-ctrl-con").slideDown();
        } else {
            $(this).addClass("fa-caret-down").removeClass("fa-caret-up").attr("data-expand", false);
            $(".wk-user-vpoint-ctrl .wk-user-news-ctrl-con").slideUp();
        }
    });
    $(".wk-user-news-ctrl-con div").hover(function () {
        $(this).find("i").show();
    }, function () {
        $(this).find("i").hide();
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
                    stockHtml.push("<td>" + list[i].name + "</td>");
                    stockHtml.push("<td>" + list[i].trade.toFixed(2) + "</td>");
                    stockHtml.push("<td>" + (list[i].price_change_ratio * 100).toFixed(2) + "</td>");
                    stockHtml.push("<td>" + list[i].volume + "</td>");
                    stockHtml.push("<td>" + (list[i].amount * 100).toFixed(2) + "%</td>");
                    stockHtml.push("<td>" + (list[i].pe * 100).toFixed(2) + "%</td>");
                    stockHtml.push("<td>" + list[i].visit_hot + "</td>");
                    stockHtml.push("<td>" + list[i].search_hot + "</td>");
                    stockHtml.push("<td>" + list[i].follow_hot + "</td>");
                    stockHtml.push("<td><i class='fa fa-minus-circle text-danger'></i></td>");
                    stockHtml.push("</tr>");
                }
            } else {
                stockHtml.push("<tr><td colspan='10'><div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>您尚未添加自选股</span></div></td></tr>");
            }
        } else {
            stockHtml.push("<tr><td colspan='10'><div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>您尚未添加自选股</span></div></td></tr>");
        }
        $(".wk-user-mychoose-table table>tbody").html(stockHtml.join(''));
    })
}
function _getNowTime() {
    var toDay = new Date();//创建时间对象
    var _hour = toDay.getHours();//时
    var _minutes = toDay.getMinutes() > 10 ? toDay.getMinutes() : "0" + toDay.getMinutes();//分
    var _seconds = toDay.getSeconds() > 10 ? toDay.getSeconds() : "0" + toDay.getSeconds();//秒
    var time = _hour + ":" + _minutes + ":" + _seconds;
    $(".wk-user-time span:last-child").html(time);
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
    initChangeGroupNameEvent: function () {
        $(".change-name").bind("click", function () {
            var group_name = $(this).parent().attr("data-group-name");
            swal({
                title: "更改名称【" + group_name + "】",
                text: "组合名称不能超过6个汉字或12个字符",
                type: "input",
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
                inforcenter.modifyGroup({ori_name: group_name, cur_name: inputValue}, null, function (resultData) {
                    if (resultData.status == 1) {
                        swal("提示!", "修改组合【" + group_name + "】为【" + inputValue + "】成功", "success");
                        getMyGroup();
                    }
                });

            });
        });
    },
    initDelGroupEvent: function () {
        $(".del-group").bind("click", function () {
            var group_name = $(this).parent().attr("data-group-name");
            swal({
                title: "确定删除【" + group_name + "】吗?",
                text: "此操作将无法恢复",
                type: "warning",
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
                            swal("提示", "组合【" + group_name + "】已被删除", "success");
                            getMyGroup();
                        }
                    });
                }
            });
        });
    },
    initAddGroupEvent: function () {
        $(".wk-add-zh").click(function () {
            swal({
                title: "添加组合",
                text: "组合名称不能超过6个汉字或12个字符",
                type: "input",
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
                inforcenter.addGroup({ori_name: inputValue}, null, function (resultData) {
                    if (resultData.status == 1) {
                        swal("提示", "添加【" + inputValue + "】组合成功", "success");
                        getMyGroup();
                    } else {
                        swal("异常!", "添加【" + inputValue + "】组合异常", "error");
                    }
                });

            });
        });
    }
};