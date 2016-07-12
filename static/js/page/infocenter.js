"use strict";
var ctrlInfo = {
    /**
     * 获取大盘数据
     */
    getStockPoint: function () {
        inforcenter.getStockPoint(function () {
            $(".wk-user-datas").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
        }, function (resultData) {
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
                        indexHtml.push("<p>" + (list[i].up_price > 0 ? "\+" : "") + (list[i].up_price).toFixed(2) + "</p>");
                        indexHtml.push("<p>" + (list[i].up_percent > 0 ? "\+" : "") + (list[i].up_percent * 100).toFixed(2) + "%</p>");
                        indexHtml.push("</div></div><hr></div></div>");
                    }
                    $(".wk-user-datas").html(indexHtml.join(''));
                }
            }
        })
    },
    /**
     * 获取当前交易时间
     */
    getNowStockDate: function () {
        var toDay = new Date();//创建时间对象
        var _hour = toDay.getHours();//时
        var _minutes = toDay.getMinutes() > 10 ? toDay.getMinutes() : "0" + toDay.getMinutes();//分
        var _seconds = toDay.getSeconds() > 10 ? toDay.getSeconds() : "0" + toDay.getSeconds();//秒
        var time = _hour + ":" + _minutes + ":" + _seconds;
        $(".wk-user-hs").html("<span>沪深</span><span style='" + (Utility.getTradeTime() == "休市" ? "" : "color:red") + "'>" + Utility.getTradeTime() + "</span>");
        $(".wk-user-time span:last-child").html(time);
    },
    /**
     * 搜索自动完成
     */
    searchComplute: function () {
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
                                ctrlInfo.getGroupStock(groupName);
                            }
                        })
                    }
                }
            }
        });
    },
    /**
     * 添加我的自选股组合
     */
    addMyStockGroup: function () {
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
                            timer: 1000,
                            showConfirmButton: false
                        });
                        ctrlInfo.getMyStockGroup();
                    } else {
                        swal({
                            title: "",
                            text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>组合异常",
                            html: true,
                            timer: 1000,
                            showConfirmButton: false
                        });
                    }
                });
            });
        })
    },
    /**
     * 获取我的自选股组合
     */
    getMyStockGroup: function () {
        inforcenter.showGroup(function () {
            $(".wk-user-choose-title").append("<div class='btn-group'><i class='fa fa-spin fa-refresh'></i></div>");
        }, function (resultData) {
            if (resultData && resultData.status == 1) {
                if (resultData.result.info.group_name.length > 0) {
                    var list = resultData.result.info.group_name;
                    var groupHtml = [];
                    groupHtml.push("<div class=\"btn-group active\" data-group-name=\"我的自选股\"><span>我的自选股</span></div>");
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
                    //我的自选组合点击事件
                    $(".wk-user-choose-title .btn-group span:first-child").unbind("click").bind("click", function () {
                        var stockName = $(this).parent().attr("data-group-name");
                        $(".wk-sub-refresh").attr("data-refresh", stockName);
                        $(this).parent().addClass("active").siblings().removeClass("active");
                        ctrlInfo.getGroupStock(stockName);
                    });
                    //绑定更改名称事件
                    $(".change-name").unbind("click").bind("click", function () {
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
                            inforcenter.modifyGroup({
                                ori_name: group_name,
                                cur_name: inputValue
                            }, null, function (resultData) {
                                if (resultData.status == 1) {
                                    swal({
                                        title: "",
                                        text: "修改组合<span style='color: #F8BB86'>" + group_name + "</span>为<span style='color: #F8BB86'>" + inputValue + "</span>成功",
                                        html: true,
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                    //修改完后重新加载我的组选股组合(tip:可以直接修改掉名字而不用请求接口)
                                    ctrlInfo.getMyStockGroup();
                                }
                            });
                        });
                    });
                    //绑定删除组合事件
                    $(".del-group").unbind("click").bind("click", function () {
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
                                            timer: 1000,
                                            showConfirmButton: false
                                        });
                                        //TODO 删除组合后重新加载组合并加载我的自选股
                                        ctrlInfo.getMyStockGroup();
                                    }
                                });
                            }
                        });
                    });
                }
            }
        })
    },
    /**
     * 获取组合下的股票
     * @param groupName
     */
    getGroupStock: function (groupName) {
        inforcenter.showstock({ori_name: groupName}, function () {
            $(".wk-sub-refresh").addClass("fa-spin");
            $(".wk-user-mychoose-table table>tbody").html("<tr><td colspan='11'><div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div></td></tr>");
        }, function (resultData) {
            $(".wk-sub-refresh").removeClass("fa-spin");
            var stockHtml = [];
            var _all_stock_code = [];
            if (resultData && resultData.status == 1) {
                if (resultData.result.info.group_info.length > 0) {
                    var list = resultData.result.info.group_info[0].stock_info;
                    for (var i = 0; i < list.length; i++) {
                        _all_stock_code.push(list[i].code);
                        stockHtml.push("<tr>");
                        stockHtml.push("<td>" + list[i].code + "</td>");
                        stockHtml.push("<td><a href='../stocks.php?stock=" + list[i].code + "' target='_blank'>" + list[i].name + "</a></td>");
                        stockHtml.push("<td class='" + Utility.getPriceColor(list[i].price_change_ratio) + "'>" + list[i].trade.toFixed(2) + "</td>");
                        stockHtml.push("<td class='" + Utility.getPriceColor(list[i].price_change_ratio) + "'>" + (list[i].price_change_ratio * 100).toFixed(2) + "</td>");
                        stockHtml.push("<td>" + list[i].volume + "</td>");
                        stockHtml.push("<td>" + (list[i].amount * 100).toFixed(2) + "%</td>");
                        stockHtml.push("<td>" + (list[i].pe * 100).toFixed(2) + "%</td>");
                        stockHtml.push("<td>" + list[i].visit_hot + "</td>");
                        stockHtml.push("<td>" + list[i].search_hot + "</td>");
                        stockHtml.push("<td>" + list[i].follow_hot + "</td>");
                        stockHtml.push("<td><i class='fa fa-minus-circle text-danger btn-del-stock' data-stock-code='" + list[i].code + "'></i></td>");
                        stockHtml.push("</tr>");
                    }
                    $(".wk-user-mynews").attr("data-stock", _all_stock_code.join('|') + "|");

                } else {
                    $(".wk-user-mynews").attr("data-stock", "00000x|");
                    stockHtml.push("<tr><td colspan='11'><div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>您尚未添加自选股</span></div></td></tr>");
                }
            } else {
                $(".wk-user-mynews").attr("data-stock", "00000x|");
                stockHtml.push("<tr><td colspan='11'><div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>您尚未添加自选股</span></div></td></tr>");
            }
            //生成股票列表，并绑定事件
            $(".wk-user-mychoose-table table>tbody").html(stockHtml.join('')).find("tr").hover(function () {
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
                            inforcenter.delStock({
                                ori_name: del_group,
                                code: del_stock
                            }, null, function (resultData) {
                                if (resultData.status == 1) {
                                    swal({
                                        title: "",
                                        text: "<span style='color:#F8BB86'>" + del_stock_name + "(" + del_stock + ")</span>已被删除",
                                        html: true,
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                    ctrlInfo.getGroupStock(del_group);
                                }
                            });
                        }
                    });
                });
            }, function () {
                $(this).find(".btn-del-stock").hide();
            });
            //加载完股票列表后获取相关联的新闻
            var query_type = $(".wk-user-mynews").attr("data-query-type");
            if (_all_stock_code.join('|').length > 0) {
                if (query_type == 0) {
                    ctrlInfo.getNews({
                        "query_type": 0,
                        "start_time": 0,
                        "info_type": 0,
                        "stock_list": _all_stock_code.join('|') + "|"
                    });
                }
                if (query_type == 1) {
                    ctrlInfo.getFastNews({
                        "query_type": 1,
                        "start_time": 0,
                        "info_type": 0,
                        "stock_list": _all_stock_code.join('|') + "|"
                    });
                }
                if (query_type == 2) {
                    ctrlInfo.getMedia({
                        "query_type": 2,
                        "start_time": 0,
                        "info_type": 0,
                        "stock_list": _all_stock_code.join('|') + "|"
                    });
                }
            } else {
                if (query_type == 0) {
                    ctrlInfo.getNews({
                        "query_type": 0,
                        "start_time": 0,
                        "info_type": 0,
                        "stock_list": "00000x|"
                    });
                }
                if (query_type == 1) {
                    ctrlInfo.getFastNews({
                        "query_type": 1,
                        "start_time": 0,
                        "info_type": 0,
                        "stock_list": "00000x|"
                    });
                }
                if (query_type == 2) {
                    ctrlInfo.getMedia({
                        "query_type": 2,
                        "start_time": 0,
                        "info_type": 0,
                        "stock_list": "00000x|"
                    });
                }
            }
            //获取相关联的平台
            ctrlInfo.getPlatform();
        })
    },
    /**
     * 获取所有平台
     */
    getPlatform: function () {
        //获取组合下的所有平台
        inforcenter.getPlatform(function () {
            $(".wk-user-news-loading").show();
        }, function (resultData) {
            if (resultData && resultData.status == 1) {
                var news_platform = resultData.result[0].news_info_plat;
                var vpoint_platform = resultData.result[2].media_info_plat;
                if (news_platform && news_platform.length > 0) {
                    var newsHtml = [];
                    for (var i = 0; i < news_platform.length; i++) {
                        newsHtml.push("<div class=\"con-item\">");
                        if (news_platform[i].is_choosed == 1) {
                            newsHtml.push("<label><span class='active'>" + news_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-times-circle\" data-platform='" + news_platform[i].platform_id + "'></i></label>");
                        }
                        else {
                            newsHtml.push("<label><span>" + news_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-plus\"  data-platform='" + news_platform[i].platform_id + "'></i></label>");
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
                            vpointHtml.push("<label><span class='active'>" + vpoint_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-times-circle\"  data-platform='" + vpoint_platform[i].platform_id + "'></i></label>");
                        }
                        else {
                            vpointHtml.push("<label><span>" + vpoint_platform[i].platform_name + "</span>&nbsp;<i class=\"fa fa-plus\"  data-platform='" + vpoint_platform[i].platform_id + "'></i></label>");
                        }
                        vpointHtml.push("</div>");
                    }
                    $(".wk-user-vpoint-ctrl .wk-user-news-ctrl-con").html(vpointHtml.join(''));
                }
                $(".wk-user-news-ctrl-con div").hover(function () {
                    $(this).find("i").show();
                }, function () {
                    $(this).find("i").hide();
                });
                $(".con-item i").each(function () {
                    $(this).unbind("click").bind("click", function (e) {
                        var $this = $(this);
                        var _plat_id = $this.attr("data-platform");
                        if ($this.hasClass("fa-times-circle")) {
                            inforcenter.delUserPlatform({plat_id: _plat_id}, null, function (resultData) {
                                if (resultData.status == 1) {
                                    $this.removeClass("fa-times-circle").addClass("fa-plus").siblings().removeClass("active");
                                }
                            });
                        } else {
                            inforcenter.addUserPlatform({plat_id: _plat_id}, null, function (resultData) {
                                if (resultData.status == 1) {
                                    $this.removeClass("fa-plus").addClass("fa-times-circle").siblings().addClass("active");
                                }
                            });
                        }
                        var query_type = $(".wk-user-mynews").attr("query_type");
                        var info_type = $(".wk-user-mynews").attr("info_type");
                        var stock_list = $(".wk-user-mynews").attr("data-stock");
                        if (info_type == 0) {
                            ctrlInfo.getNews({
                                "query_type": query_type,
                                "start_time": 0,
                                "info_type": info_type,
                                "stock_list": stock_list
                            });
                        }
                        if (info_type == 2) {
                            ctrlInfo.getMedia({
                                "query_type": query_type,
                                "start_time": 0,
                                "info_type": info_type,
                                "stock_list": stock_list
                            });
                        }
                        e.stopPropagation();
                    });
                });
                //新闻标签后面的箭头按钮
                $(".wk-user-mynews .btn-group i").each(function () {
                    $(this).unbind("click").bind("click", function () {
                        var btnGroup = $(this).parent().parent();
                        var target = btnGroup.attr("data-target");
                        if (target == "wk-user-news-list") {
                            if (btnGroup.hasClass("active")) {
                                if ($(this).attr("data-expand") != "false") {
                                    $(this).addClass("fa-chevron-down").removeClass("fa-chevron-up").attr("data-expand", false);
                                    $(".wk-user-news-ctrl").hide();
                                } else {
                                    $(this).addClass("fa-chevron-up").removeClass("fa-chevron-down").attr("data-expand", true);
                                    $(".wk-user-news-ctrl").show();
                                }
                                $("#" + target + " .wk-user-news-ctrl-head div").click(function () {
                                    $(this).addClass("active").siblings().removeClass("active");
                                    if ($(this).hasClass("user-default")) {
                                        var stock_list = $(".wk-user-mynews").attr("data-stock");
                                        $(".wk-user-mynews").attr("query_type", 1).attr("info_type", "0");
                                        ctrlInfo.getNews({
                                            "query_type": 1,
                                            "start_time": 0,
                                            "info_type": 0,
                                            "stock_list": stock_list
                                        });
                                    }
                                    if ($(this).hasClass("user-define")) {
                                        $(this).find("i").bind("click", function () {
                                            if ($(this).attr("data-expand") == "false") {
                                                $(this).addClass("fa-caret-up").removeClass("fa-caret-down");
                                                $("#" + target + " .wk-user-news-ctrl-con").show();
                                            } else {
                                                $(this).addClass("fa-caret-down").removeClass("fa-caret-up");
                                                $("#" + target + " .wk-user-news-ctrl-con").hide();
                                            }
                                        });
                                        $(".wk-user-mynews").attr("query_type", 2).attr("info_type", "0");
                                        ctrlInfo.getNews({
                                            "query_type": 2,
                                            "start_time": 0,
                                            "info_type": 0,
                                            "stock_list": stock_list
                                        });
                                    }
                                })
                            }
                        }
                        if (target == "wk-user-vpoint-list") {
                            if (btnGroup.hasClass("active")) {
                                if ($(this).attr("data-expand") == "false") {
                                    $(this).addClass("fa-chevron-up").removeClass("fa-chevron-down").attr("data-expand", true);
                                    $(".wk-user-vpoint-ctrl").show();
                                } else {
                                    $(this).addClass("fa-chevron-down").removeClass("fa-chevron-up").attr("data-expand", false);
                                    $(".wk-user-vpoint-ctrl").hide();
                                }
                                $("#" + target + " .wk-user-news-ctrl-head div").click(function () {
                                    $(this).addClass("active").siblings().removeClass("active");
                                    var stock_list = $(".wk-user-mynews").attr("data-stock");
                                    if ($(this).hasClass("user-default")) {
                                        $(".wk-user-mynews").attr("query_type", 1).attr("info_type", "2");
                                        ctrlInfo.getMedia({
                                            "query_type": 1,
                                            "start_time": 0,
                                            "info_type": 2,
                                            "stock_list": stock_list
                                        });
                                    }
                                    if ($(this).hasClass("user-define")) {
                                        $(this).find("i").bind("click", function () {
                                            if ($(this).attr("data-expand") == "false") {
                                                $(this).addClass("fa-caret-up").removeClass("fa-caret-down");
                                                $("#" + target + " .wk-user-news-ctrl-con").show();
                                            } else {
                                                $(this).addClass("fa-caret-down").removeClass("fa-caret-up");
                                                $("#" + target + " .wk-user-news-ctrl-con").hide();
                                            }
                                        });
                                        $(".wk-user-mynews").attr("query_type", 2).attr("info_type", "2");
                                        ctrlInfo.getMedia({
                                            "query_type": 2,
                                            "start_time": 0,
                                            "info_type": 2,
                                            "stock_list": stock_list
                                        });
                                    }
                                })
                            }
                        }
                    });
                })
            }
        });
    },
    /**
     * 获取新闻
     * @param arrData
     */
    getNews: function (arrData) {
        inforcenter.getRelatedInfo(arrData, function () {
            $(".wk-user-news-loading").show();
            $("#wk-user-news-list").find(".wk-con").empty();
        }, function (resultData) {
            $(".wk-user-news-loading").hide();
            var html = "";
            if (resultData) {
                html = ctrlInfo.buildNews(resultData.result);
            }
            else {
                html = "<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关快讯</span></div>";
            }
            $("#wk-user-news-list").find(".wk-con").html(html);
        })
    },
    /**
     * 获取达人观点(原自媒体)
     * @param arrData
     */
    getMedia: function (arrData) {
        inforcenter.getRelatedInfo(arrData, function () {
            $("#wk-user-vpoint-list").find(".wk-con").empty();
            $(".wk-user-news-loading").show();
        }, function (resultData) {
            $(".wk-user-news-loading").hide();
            var html = "";
            if (resultData) {
                html = ctrlInfo.buildMedia(resultData.result);
            }
            else {
                html = "<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关达人观点</span></div>";
            }
            $("#wk-user-vpoint-list").find(".wk-con").html(html);
        })
    },
    /**
     * 获取快讯
     * @param arrData
     */
    getFastNews: function (arrData) {
        inforcenter.getRelatedInfo(arrData, function () {
            $("#wk-user-fastnews-list").find(".wk-con").empty();
            $(".wk-user-news-loading").show();
        }, function (resultData) {
            $(".wk-user-news-loading").hide();
            var html = "";
            if (resultData) {
                html = ctrlInfo.buildFastNews(resultData.result);
            } else {
                html = "<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关快讯</span></div>";
            }
            $("#wk-user-fastnews-list").find(".wk-con").html(html);
        })
    },
    /**
     * 构建新闻信息
     * @param resultData
     * @returns {string}
     */
    buildNews: function (resultData) {
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
        } else {
            newsHtml.push("<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关新闻资讯</span></div>");
        }
        return newsHtml.join('');
    },
    /**
     * 构建达人观点(原自媒体)
     * @param resultData
     * @returns {string}
     */
    buildMedia: function (resultData) {
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
        } else {
            mediaHtml.push("<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关达人观点</span></div>");
        }
        return mediaHtml.join('');
    },
    /**
     * 构建快讯
     * @param resultData
     * @returns {string}
     */
    buildFastNews: function (resultData) {
        var fastHtml = [];
        if (resultData.length > 0) {
            for (var i in resultData) {
                for (var j in resultData[i]) {
                    fastHtml.push();
                    fastHtml.push("<div class=\"wk-user-fastnews\">");
                    fastHtml.push("<span class=\"wk-user-fastnews-dot\">●</span>");
                    fastHtml.push("<p class=\"wk-user-fastnews-todate\">" + j + "</p>");
                    fastHtml.push("<ul>");
                    for (var k = 0; k < resultData[i][j].length; k++) {
                        fastHtml.push("<li>");
                        fastHtml.push("<label>" + Utility.unixToTime(resultData[i][j][k].timestamp) + "</label>");
                        fastHtml.push("<p>" + resultData[i][j][k].summary + "</p>");
                        fastHtml.push("</li>");
                    }
                    fastHtml.push("</ul></div>");
                }
            }
        } else {
            fastHtml.push("<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关快讯</span></div>");
            $(".wk-user-fastnews-list").css("border", "none");
        }
        return fastHtml.join('');
    },
    /**
     *股票列表刷新
     */
    stockRefresh: function () {
        $(".wk-sub-refresh").click(function () {
            var refreshName = $(this).attr("data-refresh");
            ctrlInfo.getGroupStock(refreshName);
        })
    }
};
$(function () {
    //获取大盘数据
    ctrlInfo.getStockPoint();
    //搜索框自动完成
    ctrlInfo.searchComplute();
    //添加我的自选股组合
    ctrlInfo.addMyStockGroup();
    //获取我的自选股组合
    ctrlInfo.getMyStockGroup();
    //默认加载第一个标签的数据
    ctrlInfo.getGroupStock("我的自选股");
    //股票列表的刷新按钮
    ctrlInfo.stockRefresh();
    //大盘时间刷新
    setInterval(ctrlInfo.getNowStockDate, 1000);
    //新闻标签点击
    $(".wk-user-mynews .btn-group span:first-child").bind("click", function () {
        var btnGroup = $(this).parent().parent();
        var stock_list = $(".wk-user-mynews").attr("data-stock");
        var target = btnGroup.attr("data-target");
        btnGroup.addClass("active").siblings().removeClass("active");
        $("#" + target).show().siblings().hide();
        if (target == "wk-user-news-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getNews({"query_type": 1, "start_time": 0, "info_type": 0, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-query-type", 0);
        }
        if (target == "wk-user-fastnews-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getFastNews({"query_type": 1, "start_time": 0, "info_type": 1, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-vpoint-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getMedia({"query_type": 1, "start_time": 0, "info_type": 2, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-query-type", 2);
        }
    });
    /**
     * 下拉刷新
     */
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight + 200 >= scrollHeight) {
            var stock_list = $(".wk-user-mynews").attr("data-stock");
            var query_type = $(".wk-user-mynews").attr("data-query-type");
            var info_type = $(".wk-user-mynews").attr("info-type");
            if (info_type == 0) {
                var lastNews = $(".wk-user-news-list .wk-con").find(".wk-news-list:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-news-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id.replace('news_', '')
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    var html = ctrlInfo.buildNews(resultData.result);
                    $("#wk-user-news-list .wk-con").append(html);
                });
            }
            if (info_type == 1) {
                var lastNews = $(".wk-user-fastnews-list .wk-con").find(".wk-news-list:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-news-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id.replace('fastnews_', '')
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    var html = ctrlInfo.buildFastNews(resultData.result);
                    $("#wk-user-fastnews-list .wk-con").append(html);
                });
            }
            if (info_type == 2) {
                var lastNews = $(".wk-user-vpoint-list .wk-con").find(".wk-news-list:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-news-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id.replace('media_', '')
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    var html = ctrlInfo.buildMedia(resultData.result);
                    $("#wk-user-vpoint-list .wk-con").append(html);
                });
            }
        }
    });
});