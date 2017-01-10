"use strict";
$(function () {
    var thisHost = "http://" + window.location.host + "/";
    /**
     * 搜索框自动完成
     */
    $(".wk-head-search").typeahead({
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
            "股票": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "stock"]},
            "行业": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "hy"]},
            "概念": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "gn"]},
            "热点事件": {url: [thisHost + "ajax/ajax_search.php?message={{query}},", "event"]}
        },
        callback: {
            onClickAfter: function (node, a, item) {
                if (item.display !== "") {
                    switch (item.group) {
                        case "股票":
                            window.open(thisHost + "stocks.php?stock=" + item.display.substring(item.display.indexOf("(") + 1, item.display.indexOf(")")), "_blank");
                            break;
                        case "行业":
                            window.open(thisHost + "industry.php?name=" + item.display, "_blank");
                            break;
                        case "概念":
                            window.open(thisHost + "concept.php?name=" + item.display, "_blank");
                            break;
                        case "热点事件":
                            window.open(thisHost + "event.php?name=" + item.display, "_blank");
                            break;
                        default:
                            window.open(thisHost + "error.php", "_blank");
                            break;
                    }
                }
            }
        }
    });


    // $(".wk-con-news .wk-con-box").mouseenter(function (e) {
    //     scrollHanlder.disableScroll();
    //     e.stopPropagation();
    // });
    // $(".wk-con-news .wk-con-box").mouseleave(function (e) {
    //     scrollHanlder.enableScroll();
    //     e.stopPropagation();
    // });
    Number.prototype.toWanNum = function () {
        var str = this;
        return (str / 10000).toFixed(2) + "万";
    };
    Number.prototype.toChineseNum = function () {
        var str = this;
        if (str == 0) {
            return str;
        }
        if (str > 9999 && str < 99999999) {
            return (str / 10000).toFixed(2) + "万";
        }
        if (str >= 100000000) {
            return (str / 100000000).toFixed(2) + "亿";
        }
        return str.toFixed(2);
    };
    Number.prototype.toFormatNum = function () {
        var num = this;
        return num && (num.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
                return $1 + ",";
            }) : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, function ($0, $1) {
                return $1 + ",";
            }));
    };
    $("i[data-toggle='popover']").popover({
        container: "body",
        trigger: "hover"
    });
    $(".wk-topshow-dp label").html(Utility.getTradeTime()).addClass("wk-up");

});