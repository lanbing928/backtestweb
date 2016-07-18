/**
 *分页对象
 */
var pagenum = {
    /**
     *查看热度页码
     */
    vnum: 1,
    /**
     *搜索热度页码
     */
    snum: 1,
    /**
     *关注热度页码
     */
    fnum: 1
};
var key = Utility.getQueryStringByName("key");
var data_type = 1, hot_type = 1, rank_name = "";
if (key && key.split(',').length > 0) {
    var spl = key.split(',');
    data_type = spl[0] || "";//1:查看,2：搜索,3：关注
    hot_type = spl[1] || "";//1:股票,2:行业，3:概念,4:事件
    rank_name = decodeURI(spl[2] || "");
    $(".nav-tabs").find("li[data-type='" + data_type + "']").addClass("active in").siblings().removeClass("active in");
    if (data_type == 1) {
        $("#view").removeClass("fade").addClass("active in").siblings().addClass("fade").removeClass("active in");
        showData(pagenum.vnum, data_type, "view");
    }
    if (data_type == 2) {
        $("#search").removeClass("fade").addClass("active in").siblings().addClass("fade").removeClass("active in");
        showData(pagenum.snum, data_type, "search");
    }
    if (data_type == 3) {
        $("#follow").removeClass("fade").addClass("active in").siblings().addClass("fade").removeClass("active in");
        showData(pagenum.fnum, data_type, "follow");
    }
}
function showData(page, type, showid) {
    var postData = { 'leaf_num': page, 'datatype': type, "hot_type": hot_type };
    if (hot_type == 2) {
        postData.hy = rank_name;
    }
    if (hot_type == 3) {
        postData.gn = rank_name;
    }
    if (hot_type == 4) {
        postData.hot_event = rank_name;
    }
    common.getHotRank(postData, null, function (resultData) {
        if (resultData && resultData.status == 1) {
            if (resultData.result.code_info) {
                var _newdata;
                if (hot_type == 1) {
                    switch (data_type) {
                        case "1":
                            _newdata = resultData.result.code_info.shv_;
                            break;
                        case "2":
                            _newdata = resultData.result.code_info.shs_;
                            break;
                        case "3":
                            _newdata = resultData.result.code_info.shf_;
                            break;
                    }
                }
                if (hot_type == 2) {
                    switch (data_type) {
                        case "1":
                            _newdata = resultData.result.code_info.hhv_;
                            break;
                        case "2":
                            _newdata = resultData.result.code_info.hhs_;
                            break;
                        case "3":
                            _newdata = resultData.result.code_info.hhf_;
                            break;
                    }
                }
                if (hot_type == 3) {
                    switch (data_type) {
                        case "1":
                            _newdata = resultData.result.code_info.ghv_;
                            break;
                        case "2":
                            _newdata = resultData.result.code_info.ghs_;
                            break;
                        case "3":
                            _newdata = resultData.result.code_info.ghf_;
                            break;
                    }
                }
                if (hot_type == 4) {
                    switch (data_type) {
                        case "1":
                            _newdata = resultData.result.code_info.ehv_;
                            break;
                        case "2":
                            _newdata = resultData.result.code_info.ehs_;
                            break;
                        case "3":
                            _newdata = resultData.result.code_info.ehf_;
                            break;
                    }
                }
                var html = buildRankTable(_newdata, hot_type);
                if (hot_type == 1) {
                    $("#" + showid).find("table>thead").html("<tr><td>序号</td><td>股票代码</td><td>股票名称</td><td>价格</td><td>涨跌幅</td><td>涨跌额</td><td>成交量(万手)</td><td>查看热度</td><td>热度增量</td></tr>");
                } else {
                    $("#" + showid).find("table>thead").html("<tr><td>序号</td><td>名称</td><td>成交量(万手)</td><td>查看热度</td><td>热度增量</td></tr>");
                }
                $("#" + showid).find("table>tbody").append(html);
            }
        } else {
            if (data_type == 1) {
                $("#view_hot_more").hide();
            }
            if (data_type == 2) {
                $("#search_hot_more").hide();
            }
            if (data_type == 3) {
                $("#follow_hot_more").hide();
            }
        }
    });
}
/**
 *构建排行榜页面
 */
function buildRankTable(buildData, buildType) {
    var buildHtml = [];
    if (buildData && buildData.length > 0) {
        if (buildType == 1) {
            for (var i = 0, len = buildData.length; i < len; i++) {
                buildHtml.push("<tr>");
                if (data_type == 1) {
                    buildHtml.push("<td>" + ((i + 1) + (pagenum.vnum - 1) * 24) + "</td>");
                }
                if (data_type == 2) {
                    buildHtml.push("<td>" + ((i + 1) + (pagenum.snum - 1) * 24) + "</td>");
                }
                if (data_type == 3) {
                    buildHtml.push("<td>" + ((i + 1) + (pagenum.fnum - 1) * 24) + "</td>");
                }
                buildHtml.push("<td>" + buildData[i].code + "</td>");
                buildHtml.push("<td>" + buildData[i].name + "</td>");
                buildHtml.push("<td class='" + Utility.getPriceColor(buildData[i].mark_z_d) + "'>" + buildData[i].price + "</td>");
                buildHtml.push("<td>" + (buildData[i].price_change_ratio).toFixed(2) + '%' + Utility.getHotUpDown(buildData[i].price_change_ratio) + "</td>");
                buildHtml.push("<td>" + buildData[i].differ_price + "</td>");
                buildHtml.push("<td>" + buildData[i].volume / 10000 + "</td>");
                buildHtml.push("<td>" + buildData[i].value + "</td>");
                buildHtml.push("<td>" + buildData[i].increment + "</td>");
                buildHtml.push("</tr>");
            }
        } else {
            for (var j = 0, jlen = buildData.length; j < jlen; j++) {
                buildHtml.push("<tr>");
                buildHtml.push("<td>" + (j + 1) + "</td>");
                buildHtml.push("<td>" + buildData[j].name + "</td>");
                buildHtml.push("<td>" + buildData[j].volume / 10000 + "</td>");
                buildHtml.push("<td>" + buildData[j].value + "</td>");
                buildHtml.push("<td>" + buildData[j].increment + "</td>");
                buildHtml.push("</tr>");
            }
        }
    }
    return buildHtml.join('');
}

$(function () {
    $("i[data-toggle='popover']").popover({
        container: "body",
        trigger: "hover"
    });
    $(".wk-hot-title").html(decodeURI(rank_name) + "热度情况");
    $(".nav-tabs").delegate("li", "click", function () {
        var dy = $(this).attr("data-type");
        data_type = dy;
        if (dy == 1) {
            if (0 >= $("#view").find("table>tbody").find("tr").length) {
                showData(pagenum.vnum, 1, "view");
            }
        }
        if (dy == 2) {
            if (0 >= $("#search").find("table>tbody").find("tr").length) {
                showData(pagenum.snum, 2, "search");
            }
        }
        if (dy == 3) {
            if (0 >= $("#follow").find("table>tbody").find("tr").length) {
                showData(pagenum.fnum, 3, "follow");
            }
        }
    });
    $('#view_hot_more').click(function () {
        pagenum.vnum = pagenum.vnum + 1;
        if (pagenum.vnum >= 5) {
            $(this).hide();
        }
        showData(pagenum.vnum, 1, "view");
    });
    $('#search_hot_more').click(function () {
        pagenum.snum = pagenum.snum + 1;
        if (pagenum.snum >= 5) {
            $(this).hide();
        }
        showData(pagenum.snum, 2, "search");

    });
    $('#follow_hot_more').click(function () {
        pagenum.fnum = pagenum.fnum + 1;
        if (pagenum.fnum >= 5) {
            $(this).hide();
            return false;
        }
        showData(pagenum.fnum, 3, "follow");
    });
});