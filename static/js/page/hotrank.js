"use strict";
(function ($, window, document) {
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
    var request_v = true;
    var request_s = true;
    var request_f = true;

    var alldata_v = []; //查看热度 显示的所有数据
    var alldata_s = []; //搜索热度 显示的所有数据
    var alldata_f = []; //关注热度 显示的所有数据
    var sort_opt_v; //查看热度 排序字段名称
    var sort_opt_s;
    var sort_opt_f;
    var page_type; //热度名称 stock , industry , concept , event
    var sortid;
    var sort_type; //排序类型 desc降序 asc升序

    var key = Utility.getQueryStringByName("key");
    var data_type = 1,
        hot_type = 1,
        operate_code = 1,
        rank_name = "";
    if (key && key.split(',').length > 0) {
        var spl = key.split(',');
        data_type = spl[0] || "1"; //1:查看,2：搜索,3：关注
        hot_type = spl[1] || "1"; //1:股票,2:行业，3:概念,4:事件
        operate_code = spl[2] || "1";
        rank_name = decodeURI(spl[3] || "");
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
        sortid = showid; //当前选项卡的id
        var postData = {
            'leaf_num': page,
            'datatype': type,
            "hot_type": hot_type,
            "operate_code": operate_code
        };

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
                    var hot_type_name;
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
                        hot_type_name = "stocks";
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
                        hot_type_name = "industry";
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
                        hot_type_name = "concept";
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
                        hot_type_name = "event";
                    }
                    if (operate_code == 2) {
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
                        hot_type_name = "stocks";
                    }
                    var html = buildRankTable(_newdata, hot_type_name);
                    if (hot_type == 1 || operate_code == 2) {
                        $("#" + showid).find("table>thead").html("<tr><td>序号</td><td>股票代码</td><td>股票名称</td><td>价格<span data-hot-sort='price' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td><td>涨跌幅<span data-hot-sort='price_change_ratio' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td><td>涨跌额<span data-hot-sort='differ_price' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td><td>成交量(万手)<span data-hot-sort='volume' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td><td>" + getHotName(data_type) + "<span data-hot-sort='value' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td><td>热度增量<span data-hot-sort='increment' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td></tr>");
                    } else {
                        $("#" + showid).find("table>thead").html("<tr><td>序号</td><td>名称</td><td>成交量(万手)<span data-hot-sort='volume' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td><td>" + getHotName(data_type) + "<span data-hot-sort='value' data-sort-type='desc' class='sort_active'><img src='/static/imgs/i/icon_desc.png'></span></td><td>热度增量<span data-hot-sort='increment' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td></tr>");
                    }
                    $("#" + showid).find("table>tbody").append(html);//追加表格内容
                }
            } else { //数据不存在
                if (data_type == 1) {
                    $("#view_hot_more").hide();
                    request_v = false;
                }
                if (data_type == 2) {
                    $("#search_hot_more").hide();
                    request_s = false;
                }
                if (data_type == 3) {
                    $("#follow_hot_more").hide();
                    request_f = false;
                }

            }
        });
    }

    /**
     *构建排行榜页面
     */
    function buildRankTable(buildData, buildType) {
        page_type = buildType;
        if (data_type == 1) {
            alldata_v = alldata_v.concat(buildData); //合并查看热度的数据
            if (sort_opt_v) {
                if (sort_type == 'desc') {
                    alldata_v = alldata_v.sort(desc_by(sort_opt_v));
                } else {
                    alldata_v = alldata_v.sort(asc_by(sort_opt_v));
                }
                return buildSortRankTable(alldata_v, buildType);
            }
        } else if (data_type == 2) {
            alldata_s = alldata_s.concat(buildData); //合并搜索热度的数据
            if (sort_opt_s) {
                if (sort_type == 'desc') {
                    alldata_s = alldata_s.sort(desc_by(sort_opt_s));
                } else {
                    alldata_s = alldata_s.sort(asc_by(sort_opt_s));
                }
                return buildSortRankTable(alldata_s, buildType);
            }
        } else if (data_type == 3) {
            alldata_f = alldata_f.concat(buildData);//合并关注热度的数据
            if (sort_opt_f) {
                if (sort_type == 'desc') {
                    alldata_f = alldata_f.sort(desc_by(sort_opt_f));
                } else {
                    alldata_f = alldata_f.sort(asc_by(sort_opt_f));
                }
                return buildSortRankTable(alldata_f, buildType);
            }
        }

        var buildHtml = [];
        if (buildData && buildData.length > 0) {
            if (buildType == "stocks" || operate_code == 2) {
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
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].code + "</a></td>");
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].name + "</a></td>");
                    buildHtml.push("<td class='" + Utility.getPriceColor(buildData[i].mark_z_d) + "'>" + buildData[i].price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].price_change_ratio * 100).toFixed(2) + '%' + Utility.getHotUpDown(buildData[i].price_change_ratio) + "</td>");
                    buildHtml.push("<td>" + buildData[i].differ_price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[i].value + "</td>");
                    buildHtml.push("<td>" + buildData[i].increment + Utility.getHotUpDown(buildData[i].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            } else {
                for (var j = 0, jlen = buildData.length; j < jlen; j++) {
                    buildHtml.push("<tr>");
                    if (data_type == 1) {
                        buildHtml.push("<td>" + ((j + 1) + (pagenum.vnum - 1) * 24) + "</td>");
                    }
                    if (data_type == 2) {
                        buildHtml.push("<td>" + ((j + 1) + (pagenum.snum - 1) * 24) + "</td>");
                    }
                    if (data_type == 3) {
                        buildHtml.push("<td>" + ((j + 1) + (pagenum.fnum - 1) * 24) + "</td>");
                    }
                    buildHtml.push("<td><a href='" + buildType + ".php?name=" + buildData[j].name + "' target='_blank'>" + buildData[j].name + "</a></td>");
                    buildHtml.push("<td>" + (buildData[j].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[j].value + "</td>");
                    //buildHtml.push("<td>" + buildData[j].increment + "</td>");
                    buildHtml.push("<td>" + buildData[j].increment + Utility.getHotUpDown(buildData[j].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            }
        }
        return buildHtml.join('');
    }

    /**
     * 重构排序页面
     */
    function buildSortRankTable(buildData, buildType) {
        var buildHtml = [];
        if (buildData && buildData.length > 0) {
            if (buildType == "stocks" || operate_code == 2) {
                for (var i = 0, len = buildData.length; i < len; i++) {
                    buildHtml.push("<tr>");
                    if (data_type == 1) {
                        buildHtml.push("<td>" + (i + 1) + "</td>");
                    }
                    if (data_type == 2) {
                        buildHtml.push("<td>" + (i + 1) + "</td>");
                    }
                    if (data_type == 3) {
                        buildHtml.push("<td>" + (i + 1) + "</td>");
                    }
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].code + "</a></td>");
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].name + "</a></td>");
                    buildHtml.push("<td class='" + Utility.getPriceColor(buildData[i].mark_z_d) + "'>" + buildData[i].price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].price_change_ratio * 100).toFixed(2) + '%' + Utility.getHotUpDown(buildData[i].price_change_ratio) + "</td>");
                    buildHtml.push("<td>" + buildData[i].differ_price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[i].value + "</td>");
                    buildHtml.push("<td>" + buildData[i].increment + Utility.getHotUpDown(buildData[i].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            } else {
                for (var j = 0, jlen = buildData.length; j < jlen; j++) {
                    buildHtml.push("<tr>");
                    if (data_type == 1) {
                        buildHtml.push("<td>" + (j + 1) + "</td>");
                    }
                    if (data_type == 2) {
                        buildHtml.push("<td>" + (j + 1) + "</td>");
                    }
                    if (data_type == 3) {
                        buildHtml.push("<td>" + (j + 1) + "</td>");
                    }
                    buildHtml.push("<td><a href='" + buildType + ".php?name=" + buildData[j].name + "' target='_blank'>" + buildData[j].name + "</a></td>");
                    buildHtml.push("<td>" + (buildData[j].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[j].value + "</td>");
                    //buildHtml.push("<td>" + buildData[j].increment + "</td>");
                    buildHtml.push("<td>" + buildData[j].increment + Utility.getHotUpDown(buildData[j].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            }
        }
        $("#" + sortid).find("table>tbody").html(buildHtml.join(''));//追加表格内容
    }

    function getHotName(hotNum) {
        switch (hotNum) {
            case "1":
                return "查看热度";
            case "2":
                return "搜索热度";
            case "3":
                return "关注热度";
            default:
                return "未知";
        }
    }

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
        if (pagenum.vnum > 5) {
            $(this).hide();
        }
        showData(pagenum.vnum, 1, "view");
    });
    $('#search_hot_more').click(function () {
        pagenum.snum = pagenum.snum + 1;
        if (pagenum.snum > 5) {
            $(this).hide();
        }
        showData(pagenum.snum, 2, "search");

    });
    $('#follow_hot_more').click(function () {
        pagenum.fnum = pagenum.fnum + 1;
        if (pagenum.fnum > 5) {
            $(this).hide();
            return false;
        }
        showData(pagenum.fnum, 3, "follow");
    });


    /**滑动加载*/
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        var cha = scrollHeight - scrollTop - windowHeight;
        /*获取当前对应的选项卡*/
        var type = $(".nav-tabs").find('.active').attr('data-type');
        type = parseInt(type);
        if (cha === 0) {
            if (type == 1) {
                $('#view_hot_more').click();
            }
            if (type == 2) {
                $('#search_hot_more').click();
            }
            if (type == 3) {
                if (cha == 0) {
                    if (type == 1 && request_v === true) {
                        $('#view_hot_more').click();
                    }
                    if (type == 2 && request_s === true) {
                        $('#search_hot_more').click();
                    }
                    if (type == 3 && request_f === true) {
                        $('#follow_hot_more').click();
                    }
                }
            }
        }
    });

    /**
     * 根据点击字段名称排序
     */
    $("body").on("click", "thead td span", function () {
        var sortdata;
        sort_type = $(this).attr('data-sort-type'); //desc asc
        if (data_type == 1) { //对数据进行排序
            sort_opt_v = $(this).attr('data-hot-sort');
            if (sort_type == 'desc') {
                $(this).html("<img src='/static/imgs/i/icon_desc.png'>").attr('data-sort-type', 'ase').parent().siblings().find('span');
                sortdata = alldata_v.sort(desc_by(sort_opt_v));
            } else {
                $(this).html("<img src='/static/imgs/i/icon_asc.png'>").attr('data-sort-type', 'desc').parent().siblings().find('span');
                sortdata = alldata_v.sort(asc_by(sort_opt_v));
            }
        } else if (data_type == 2) {
            sort_opt_s = $(this).attr('data-hot-sort');
            if (sort_type == 'desc') {
                $(this).html("<img src='/static/imgs/i/icon_desc.png'>").attr('data-sort-type', 'ase').parent().siblings().find('span');
                sortdata = alldata_s.sort(desc_by(sort_opt_s));
            } else {
                $(this).html("<img src='/static/imgs/i/icon_asc.png'>").attr('data-sort-type', 'desc').parent().siblings().find('span');
                sortdata = alldata_s.sort(asc_by(sort_opt_s));
            }
        } else if (data_type == 3) {
            sort_opt_f = $(this).attr('data-hot-sort');
            if (sort_type == 'desc') {
                $(this).html("<img src='/static/imgs/i/icon_desc.png'>").attr('data-sort-type', 'ase').parent().siblings().find('span');
                sortdata = alldata_f.sort(desc_by(sort_opt_f));
            } else {
                $(this).html("<img src='/static/imgs/i/icon_asc.png'>").attr('data-sort-type', 'desc').parent().siblings().find('span');
                sortdata = alldata_f.sort(asc_by(sort_opt_f));
            }
        }
        buildSortRankTable(sortdata, page_type);//加载排序页码
    });

    /**
     * 逆序排序函数
     */
    var desc_by = function (name) {
        return function (o, p) {
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a > b ? -1 : 1;
                }
                return typeof a > typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }
    /**
     * 正序排序函数
     */
    var asc_by = function (name) {
        return function (o, p) {
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }

})(jQuery, window, document);