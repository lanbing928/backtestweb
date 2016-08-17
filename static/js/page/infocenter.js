"use strict";
(function ($, window, document) {
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
                    "股票": { url: ["../ajax/ajax_search.php?message={{query}},", "stock"] }
                },
                callback: {
                    onClickAfter: function (node, a, item) {
                        if (item.display !== "") {
                            var stockCode = item.display.substring(item.display.indexOf("(") + 1, item.display.indexOf(")"));
                            var groupName = $(".wk-sub-refresh").attr("data-refresh");
                            inforcenter.addStock({ ori_name: groupName, code: stockCode }, null, function (resultData) {
                                if (resultData && resultData.status == 1) {
                                    ctrlInfo.getGroupStock(groupName);
                                    $(".wk-user-stock-search").val("");
                                }
                            });
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
                    inforcenter.addGroup({ ori_name: inputValue }, null, function (resultData) {
                        if (resultData.status == 1) {
                            swal({
                                title: "",
                                text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>组合成功",
                                html: true,
                                timer: 1000,
                                showConfirmButton: false
                            });
                            ctrlInfo.getMyStockGroup();
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
                        var bar_html=[];//回测持仓比股票名称
                        bar_html.push('<li>剩余调仓比:');
                        bar_html.push('<div class="scale_panel">');
                        bar_html.push(' <div class="scale" id="surplus_bar">');
                        bar_html.push(' <div id="surplus_scale"></div>');
                        bar_html.push('</div>');
                        bar_html.push('<span id="surplus_title">100%</span>');
                        bar_html.push('</div></li>');
                        groupHtml.push("<div class=\"btn-group active\" data-group-name=\"我的自选股\"><div class='wk-btn-mygroup'><span class='wk-mygroup-txt'>我的自选股</span></div></div>");
                        for (var i = 0; i < list.length; i++) {
                            groupHtml.push("<div class=\"btn-group\" data-group-name='" + list[i] + "'>");
                            groupHtml.push("<div class='wk-btn-mygroup'>");
                            groupHtml.push("<span class='wk-mygroup-txt'>" + list[i] + "</span>");
                            groupHtml.push("<span class=\"dropdown-toggle\" data-toggle=\"dropdown\">");
                            groupHtml.push("<i class=\"fa fa-chevron-down\"></i>");
                            groupHtml.push("</span>");
                            groupHtml.push("<ul class=\"dropdown-menu\" data-group-name='" + list[i] + "'>");
                            groupHtml.push("<li class='change-name'><a href=\"#\"><i class=\"fa fa-pencil fa-fw\"></i>更改名称</a></li>");
                            groupHtml.push("<li class='del-group'><a href=\"#\"><i class=\"fa fa-trash-o fa-fw\"></i>删除组合</a></li>");
                            groupHtml.push("</ul></div></div>");

                            bar_html.push('<li>'+list[i].name+':');
                            bar_html.push('<div class="scale_panel">');
                            bar_html.push('<div class="scale" id="bar'+(i+1)+'">');
                            bar_html.push('<div></div>');
                            bar_html.push('<span id="btn'+(i+1)+'"></span>');
                            bar_html.push('</div>');
                            bar_html.push('<span class="percent_num" data-self-num="0" id="title'+(i+1)+'">0</span>');
                            bar_html.push('</div></li>');
                        }
                        $(".wk-user-choose-title").html(groupHtml.join(''));
                        $('.progress_bar').html(bar_html.join(''));//追加回测持仓比进度条
                        //我的自选组合点击事件
                        $(".wk-user-choose-title .wk-btn-mygroup span").unbind("click").bind("click", function () {
                            var stockName = $(this).parent().parent().attr("data-group-name");
                            $(".wk-sub-refresh").attr("data-refresh", stockName);
                            $(this).parent().parent().addClass("active").siblings().removeClass("active");
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
                                    inforcenter.delGroup({ ori_name: group_name }, null, function (resultData) {
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
            inforcenter.showstock({ ori_name: groupName }, function () {
                $(".wk-sub-refresh").addClass("fa-spin");
                $(".wk-user-mychoose-table table>tbody").html("<tr><td colspan='11'><div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div></td></tr>");
            }, function (resultData) {
                $(".wk-sub-refresh").removeClass("fa-spin");
                var stockHtml = [];
                var bar_html=[];//回测持仓比股票名称
                var _all_stock_code = [];
                if (resultData && resultData.status == 1) {
                    if (resultData.result.info.group_info.length > 0) {
                        var list = resultData.result.info.group_info[0].stock_info;
                        bar_html.push('<li>剩余调仓比:');
                        bar_html.push('<div class="scale_panel">');
                        bar_html.push(' <div class="scale" id="surplus_bar">');
                        bar_html.push(' <div id="surplus_scale"></div>');
                        bar_html.push('</div>');
                        bar_html.push('<span id="surplus_title">100%</span>');
                        bar_html.push('</div></li>');
                        for (var i = 0; i < list.length; i++) {
                            _all_stock_code.push(list[i].code);
                            stockHtml.push("<tr>");
                            stockHtml.push("<td>" + list[i].code + "</td>");
                            stockHtml.push("<td><a href='../stocks.php?stock=" + list[i].code + "' target='_blank'>" + list[i].name + "</a></td>");
                            stockHtml.push("<td class='" + Utility.getPriceColor(list[i].price_change_ratio) + "'>" + list[i].trade.toFixed(2) + "</td>");
                            stockHtml.push("<td class='" + Utility.getPriceColor(list[i].price_change_ratio) + "'>" + (list[i].price_change_ratio).toFixed(2) + "%</td>");
                            stockHtml.push("<td>" + (list[i].volume / 10000 / 100).toFixed(2) + "</td>");
                            stockHtml.push("<td>" + (list[i].amount).toFixed(2) + "</td>");
                            stockHtml.push("<td>" + (list[i].pe).toFixed(2) + "</td>");
                            stockHtml.push("<td>" + list[i].visit_hot + "</td>");
                            stockHtml.push("<td>" + list[i].search_hot + "</td>");
                            stockHtml.push("<td>" + list[i].follow_hot + "</td>");
                            stockHtml.push("<td><i class='fa fa-minus-circle text-danger btn-del-stock' data-stock-code='" + list[i].code + "'></i></td>");
                            stockHtml.push("</tr>");

                            bar_html.push('<li>' + list[i].name + ':');
                            bar_html.push('<div class="scale_panel">');
                            bar_html.push('<div class="scale" id="bar' + (i + 1) + '">');
                            bar_html.push('<div></div>');
                            bar_html.push('<span id="btn' + (i + 1) + '"></span>');
                            bar_html.push('</div>');
                            bar_html.push('<span class="percent_num" data-self-num="0" id="title' + (i + 1) + '">0</span>');
                            bar_html.push('</div></li>');
                        }
                        $(".wk-user-mynews").attr("data-stock", _all_stock_code.join('|') + "|");
                        $('.progress_bar').html(bar_html.join(''));//追加回测持仓比进度条

                        for(var i=1;i<(list.length+1);i++){
                            new scale('btn'+i,'bar'+i,'title'+i);//调用拖拽进度条函数
                        }


                    } else {
                        $('.progress_bar').html('');//追加回测持仓比进度条
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
                var info_type = $(".wk-user-mynews").attr("data-info-type");
                if (_all_stock_code.join('|').length > 0) {
                    if (info_type == 0) {
                        ctrlInfo.getNews({
                            "query_type": query_type,
                            "start_time": 0,
                            "info_type": info_type,
                            "stock_list": _all_stock_code.join('|') + "|"
                        });
                    }
                    if (info_type == 1) {
                        ctrlInfo.getFastNews({
                            "query_type": query_type,
                            "start_time": 0,
                            "info_type": info_type,
                            "stock_list": _all_stock_code.join('|') + "|"
                        });
                    }
                    if (info_type == 2) {
                        ctrlInfo.getMedia({
                            "query_type": query_type,
                            "start_time": 0,
                            "info_type": info_type,
                            "stock_list": _all_stock_code.join('|') + "|"
                        });
                    }
                } else {
                    if (info_type == 0) {
                        ctrlInfo.getNews({
                            "query_type": query_type,
                            "start_time": 0,
                            "info_type": info_type,
                            "stock_list": "00000x|"
                        });
                    }
                    if (info_type == 1) {
                        ctrlInfo.getFastNews({
                            "query_type": query_type,
                            "start_time": 0,
                            "info_type": info_type,
                            "stock_list": "00000x|"
                        });
                    }
                    if (info_type == 2) {
                        ctrlInfo.getMedia({
                            "query_type": query_type,
                            "start_time": 0,
                            "info_type": info_type,
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
                                inforcenter.delUserPlatform({ plat_id: _plat_id }, null, function (resultData) {
                                    if (resultData.status == 1) {
                                        $this.removeClass("fa-times-circle").addClass("fa-plus").siblings().removeClass("active");
                                    }
                                });
                            } else {
                                inforcenter.addUserPlatform({ plat_id: _plat_id }, null, function (resultData) {
                                    if (resultData.status == 1) {
                                        $this.removeClass("fa-plus").addClass("fa-times-circle").siblings().addClass("active");
                                    }
                                });
                            }
                            var query_type = $(".wk-user-mynews").attr("data-query-type");
                            var info_type = $(".wk-user-mynews").attr("data-info-type");
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
                            var stock_list = $(".wk-user-mynews").attr("data-stock");
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
                                            $(".wk-user-mynews").attr("data-query-type", 1).attr("data-info-type", "0");
                                            ctrlInfo.getNews({
                                                "query_type": 1,
                                                "start_time": 0,
                                                "info_type": 0,
                                                "stock_list": stock_list
                                            });
                                        }
                                        if ($(this).hasClass("user-define")) {
                                            $(this).find("i").unbind("click").bind("click", function () {
                                                if ($(this).attr("data-expand") == "false") {
                                                    $(this).addClass("fa-caret-up").removeClass("fa-caret-down");
                                                    $("#" + target + " .wk-user-news-ctrl-con").show();
                                                    $(this).attr("data-expand", true);
                                                } else {
                                                    $(this).addClass("fa-caret-down").removeClass("fa-caret-up");
                                                    $("#" + target + " .wk-user-news-ctrl-con").hide();
                                                    $(this).attr("data-expand", false);
                                                }
                                            });
                                            $(".wk-user-mynews").attr("data-query-type", 2).attr("data-info-type", "0");
                                            ctrlInfo.getNews({
                                                "query_type": 2,
                                                "start_time": 0,
                                                "info_type": 0,
                                                "stock_list": stock_list
                                            });
                                        }
                                    })
                                }
                                return;
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
                                            $(".wk-user-mynews").attr("data-query-type", 1).attr("data-info-type", "2");
                                            ctrlInfo.getMedia({
                                                "query_type": 1,
                                                "start_time": 0,
                                                "info_type": 2,
                                                "stock_list": stock_list
                                            });
                                        }
                                        if ($(this).hasClass("user-define")) {
                                            $(this).find("i").unbind("click").bind("click", function () {
                                                if ($(this).attr("data-expand") == "false") {
                                                    $(this).addClass("fa-caret-up").removeClass("fa-caret-down");
                                                    $("#" + target + " .wk-user-news-ctrl-con").show();
                                                    $(this).attr("data-expand", true);
                                                } else {
                                                    $(this).addClass("fa-caret-down").removeClass("fa-caret-up");
                                                    $("#" + target + " .wk-user-news-ctrl-con").hide();
                                                    $(this).attr("data-expand", false);
                                                }
                                            });
                                            $(".wk-user-mynews").attr("data-query-type", 2).attr("data-info-type", "2");
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
         * 获取公告
         * @param arrData
         */
        getNotice: function (arrData) {
            inforcenter.getRelatedInfo(arrData, function () {
                $(".wk-user-news-loading").show();
                $("#wk-user-notice-list").find(".wk-con").empty();
            }, function (resultData) {
                $(".wk-user-news-loading").hide();
                var html = "";
                if (resultData) {
                    html = ctrlInfo.buildNotice(resultData.result);
                }
                else {
                    html = "<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关公告</span></div>";
                }
                $("#wk-user-notice-list").find(".wk-con").html(html);
            })
        },
        /**
         * 获取研报
         * @param arrData
         */
        getReport: function (arrData) {
            inforcenter.getRelatedInfo(arrData, function () {
                $(".wk-user-news-loading").show();
                $("#wk-user-report-list").find(".wk-con").empty();
            }, function (resultData) {
                $(".wk-user-news-loading").hide();
                var html = "";
                if (resultData) {
                    html = ctrlInfo.buildReport(resultData.result);
                }
                else {
                    html = "<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关公告</span></div>";
                }
                $("#wk-user-report-list").find(".wk-con").html(html);
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
                            var price_up_down = resultData[i].related_stock[j].price_up_down;
                            if (stock_name != "" && stock_code != "") {
                                newsHtml.push("<a class='" + Utility.getPriceColor(price_up_down) + "' href='../stocks.php?stock=" + stock_code + "' target='_blank'>●&nbsp;" + stock_name + "(" + stock_code + ")</a>");
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
                            var price_up_down = resultData[i].related_stock[j].price_up_down;
                            if (stock_name != "" && stock_code != "") {
                                mediaHtml.push("<a class='" + Utility.getPriceColor(price_up_down) + "' href='../stocks.php?stock=" + stock_code + "' target='_blank'>●&nbsp;" + stock_name + "(" + stock_code + ")</a>");
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
                            fastHtml.push("<li id='" + resultData[i][j][k].info_id + "' data-fastnews-timestamp='" + resultData[i][j][k].timestamp + "'>");
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
         * 构建公告
         * @param resultData
         * @returns {string}
         */
        buildNotice: function (resultData) {
            var noticeHtml = [];
            if (resultData.length > 0) {
                for (var i = 0; i < resultData.length; i++) {
                    noticeHtml.push("<div class=\"wk-news-list\" id=\"notice_" + resultData[i].info_id + "\" data-news-timestamp=\"" + resultData[i].timestamp + "\">");
                    noticeHtml.push("<div class=\"news-rel-stock\">");
                    if (resultData[i].related_stock.length > 0) {
                        for (var j = 0; j < resultData[i].related_stock.length; j++) {
                            var stock_name = resultData[i].related_stock[j].stock_name;
                            var stock_code = resultData[i].related_stock[j].stock_code;
                            var price_up_down = resultData[i].related_stock[j].price_up_down;
                            if (stock_name != "" && stock_code != "") {
                                noticeHtml.push("<a class='" + Utility.getPriceColor(price_up_down) + "' href='../stocks.php?stock=" + stock_code + "' target='_blank'>●&nbsp;" + stock_name + "(" + stock_code + ")</a>");
                            }
                        }
                    }
                    noticeHtml.push("</div>");
                    noticeHtml.push("<div class=\"wk-news-list-head\">");
                    noticeHtml.push("<p class=\"wk-news-list-title\"><a href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">");
                    noticeHtml.push(resultData[i].titile);
                    noticeHtml.push("</a></p>" + Utility.getgetEmotion(resultData[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
                    if (resultData[i].summary != "") {
                        noticeHtml.push("<strong>【机器人摘要】</strong>");
                        noticeHtml.push(resultData[i].summary);
                        noticeHtml.push("<a href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
                    }
                    noticeHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
                }
            } else {
                noticeHtml.push("<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关新闻公告</span></div>");
            }
            return noticeHtml.join('');
        },
        /**
         * 构建研报
         * @param resultData
         * @returns {string}
         */
        buildReport: function (resultData) {
            var reportHtml = [];
            if (resultData.length > 0) {
                for (var i = 0; i < resultData.length; i++) {
                    reportHtml.push("<div class=\"wk-news-list\" id=\"report_" + resultData[i].info_id + "\" data-news-timestamp=\"" + resultData[i].timestamp + "\">");
                    reportHtml.push("<div class=\"news-rel-stock\">");
                    if (resultData[i].related_stock.length > 0) {
                        for (var j = 0; j < resultData[i].related_stock.length; j++) {
                            var stock_name = resultData[i].related_stock[j].stock_name;
                            var stock_code = resultData[i].related_stock[j].stock_code;
                            var price_up_down = resultData[i].related_stock[j].price_up_down;
                            if (stock_name != "" && stock_code != "") {
                                reportHtml.push("<a class='" + Utility.getPriceColor(price_up_down) + "' href='../stocks.php?stock=" + stock_code + "' target='_blank'>●&nbsp;" + stock_name + "(" + stock_code + ")</a>");
                            }
                        }
                    }
                    reportHtml.push("</div>");
                    reportHtml.push("<div class=\"wk-news-list-head\">");
                    reportHtml.push("<p class=\"wk-news-list-title\"><a href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\">");
                    reportHtml.push(resultData[i].titile);
                    reportHtml.push("</a></p>" + Utility.getgetEmotion(resultData[i].sentiment) + "</div><div class=\"wk-news-list-con\"><p>");
                    if (resultData[i].summary != "") {
                        reportHtml.push("<strong>【机器人摘要】</strong>");
                        reportHtml.push(resultData[i].summary);
                        reportHtml.push("<a class='" + Utility.getPriceColor(price_up_down) + "' href=\"../detail.php?infoid=" + resultData[i].info_id + "\" target=\"_blank\"><i class=\"fa fa-link\"></i>详情链接</a>");
                    }
                    reportHtml.push("</p><span>来源：" + resultData[i].from + "&nbsp;&nbsp;&nbsp;&nbsp;" + Utility.unixToDate(resultData[i].timestamp) + "</span></div><hr></div>");
                }
            } else {
                reportHtml.push("<div class=\"wk-user-no\"><img src=\"../static/imgs/i/nonews.png\"><span>暂无相关新闻研报</span></div>");
            }
            return reportHtml.join('');
        },
        /**
         *股票列表刷新
         */
        stockRefresh: function () {
            $(".wk-sub-refresh").click(function () {
                var refreshName = $(this).attr("data-refresh");
                ctrlInfo.getGroupStock(refreshName);
            });
        }
    };
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
            ctrlInfo.getNews({ "query_type": 1, "start_time": 0, "info_type": 0, "stock_list": stock_list });
            $(".wk-user-mynews").attr("data-info-type", 0);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-fastnews-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getFastNews({ "query_type": 1, "start_time": 0, "info_type": 1, "stock_list": stock_list });
            $(".wk-user-mynews").attr("data-info-type", 1);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-vpoint-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getMedia({ "query_type": 1, "start_time": 0, "info_type": 2, "stock_list": stock_list });
            $(".wk-user-mynews").attr("data-info-type", 2);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-notice-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getNotice({ "query_type": 1, "start_time": 0, "info_type": 4, "stock_list": stock_list });
            $(".wk-user-mynews").attr("data-info-type", 4);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-report-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getReport({ "query_type": 1, "start_time": 0, "info_type": 3, "stock_list": stock_list });
            $(".wk-user-mynews").attr("data-info-type", 3);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
    });
    /**
     * 下拉刷新
     */
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollHeight - scrollTop - windowHeight == 0) {
            var stock_list = $(".wk-user-mynews").attr("data-stock");
            var query_type = $(".wk-user-mynews").attr("data-query-type");
            var info_type = $(".wk-user-mynews").attr("data-info-type");
            if (info_type == "0") {
                var lastNews = $("#wk-user-news-list .wk-con").find(".wk-news-list:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-news-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id ? last_id.replace('news_', '') : ""
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    if (resultData.result.length > 0) {
                        var html = ctrlInfo.buildNews(resultData.result);
                        $("#wk-user-news-list .wk-con").append(html);
                    }
                });
                return;
            }
            if (info_type == "1") {
                var lastNews = $("#wk-user-fastnews-list .wk-user-fastnews:last-child").find("ul li:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-fastnews-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id ? last_id.replace('fastnews_', '') : ''
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    if (resultData.result.length > 0) {
                        var html = ctrlInfo.buildFastNews(resultData.result);
                        $("#wk-user-fastnews-list .wk-con").append(html);
                    }
                });
                return;
            }
            if (info_type == "2") {
                var lastNews = $("#wk-user-vpoint-list .wk-con").find(".wk-news-list:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-news-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id ? last_id.replace('media_', '') : ""
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    if (resultData.result.length > 0) {
                        var html = ctrlInfo.buildMedia(resultData.result);
                        $("#wk-user-vpoint-list .wk-con").append(html);
                    }
                });
            }
            if (info_type == "3") {
                var lastNews = $("#wk-user-report-list .wk-con").find(".wk-news-list:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-news-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id ? last_id.replace('report_', '') : ""
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    if (resultData.result.length > 0) {
                        var html = ctrlInfo.buildReport(resultData.result);
                        $("#wk-user-report-list .wk-con").append(html);
                    }
                });
            }
            if (info_type == "4") {
                var lastNews = $("#wk-user-notice-list .wk-con").find(".wk-news-list:last-child");
                var last_id = lastNews.attr("id");
                var last_time = lastNews.attr("data-news-timestamp");
                inforcenter.getRelatedInfo({
                    "query_type": query_type,
                    "info_type": info_type,
                    "start_time": last_time,
                    "stock_list": stock_list,
                    "start_id": last_id ? last_id.replace('notice_', '') : ""
                }, function () {
                    $(".wk-user-news-loading").show();
                }, function (resultData) {
                    $(".wk-user-news-loading").hide();
                    if (resultData.result.length > 0) {
                        var html = ctrlInfo.buildNotice(resultData.result);
                        $("#wk-user-notice-list .wk-con").append(html);
                    }
                });
            }
        }
    });

    /**
     * 历史回测
     * */
    var yield_checkbox; //数据对比 收益率复选框
    var hot_degree; //数据对比 热度复选框
    $('.person-backtest .progress_bar').mouseleave(function () {
        $('.person-backtest .progress_bar').hide();//持仓比进度条下拉框 鼠标离开不显示
    });

    $('.compare_select').click(function () {
        $('.person-backtest .compare_data').show();//对比数据选择 点击下拉框显示
        $('.person-backtest .progress_bar').hide();
    });

    $('.person-backtest .compare_data').mouseleave(function () {//对比数据选择 鼠标离开
        yield_checkbox = $('.yield input:checked').val();
        hot_degree = $('.hot_degree input:checked').val();
        $('.person-backtest .compare_data').hide();
        if (yield_checkbox || hot_degree) {   //如果收益率或热度选中 则持仓比下拉框点击可显示
            $('.position_ratio').css('color', '#475586').find('img').attr('src', '/static/imgs/i/person_backtest2.png');
        } else {
            $('.position_ratio').css('color', '#BEBEBE').find('img').attr('src', '/static/imgs/i/person_backtest3.png');
            $('.person-backtest .progress_bar').hide();
        }
        $('.position_ratio').click(function () {
            if (yield_checkbox || hot_degree && $('.progress_bar').html()) {
                $('.person-backtest .progress_bar').show();
                $('.person-backtest .compare_data').hide();
            } else {
                $('.person-backtest .progress_bar').hide();
            }

        })
    });

    /**
     * 拖拽持仓进度条
     * */
    var scale = function (btn, bar, title) {
        this.btn = document.getElementById(btn);//拖拽按钮
        this.bar = document.getElementById(bar);//进度条
        this.title = document.getElementById(title);//显示拖拽的百分百
        this.step = this.bar.getElementsByTagName("DIV")[0];//拖拽长度
        this.init();
    };
    scale.prototype = {
        init: function () {
            var f = this, g = document, b = window, m = Math;
            f.btn.onmousedown = function (e) {
                var x = (e || b.event).clientX;
                var l = this.offsetLeft;
                var max = f.bar.offsetWidth - this.offsetWidth;
                g.onmousemove = function (e) {
                    var thisX = (e || b.event).clientX;
                    var to = m.min(max, m.max(-2, l + (thisX - x)));
                    f.btn.style.left = to + 'px';
                    f.ondrag(m.round(m.max(0, to / max) * 100), to);
                    b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
                };
                g.onmouseup = new Function('this.onmousemove=null');
            };

        },
        ondrag: function (pos, x) {
            /*获取当前进度条的所有百分比*/
            var percent_all = $(".percent_num"); //获取所有的进度条的综合
            var sum = 0;
            for (var i = 0; i < percent_all.length; i++) {
                var temp_num = parseInt(percent_all.eq(i).attr('data-self-num'));
                sum += temp_num;//已拖拽距离总和
            }
            var posMax = 100 - sum; //可拉动的最大距离
            if (sum >= 100) {
                var sheng = posMax;
                if (sheng > 0) {
                    sheng = sheng + 66;
                } else {
                    sheng = 0;
                }
                var surplus_scale = document.getElementById('surplus_scale');
                var surplus_title = document.getElementById('surplus_title');
                surplus_scale.style.width = sheng + 'px';
                surplus_title.innerHTML = posMax + '%';
                posMax = 0;
                document.onmousemove = function () { //滑动总和大于等于100 停止滑动
                    return false;
                };
            }
            //  本身的进度条显示
            this.step.style.width = Math.max(0, x) + 'px';
            this.title.innerHTML = pos + '%';
            this.title.setAttribute("data-self-num", pos);//把进度条长度赋值给属性

            //剩余的进度条显示
            var sheng = posMax;
            if (sheng > 0) {
                sheng = sheng + 66;
            } else {
                sheng = 0;
            }

            var surplus_scale = document.getElementById('surplus_scale');
            var surplus_title = document.getElementById('surplus_title');
            surplus_scale.style.width = sheng + 'px';
            surplus_title.innerHTML = posMax + '%';
        }
    }


    /**
     * 点击进行回测
     * */
    $('body').on('click', '.person-backtest button', function () {
        var percent_all = $('.percent_num');
        var bar_scale = [];//持仓百分比数值
        var timefrom = ',' + $('.testfrom').val();
        var timeto = ',' + $('.testto').val();
        var stocks_info = '';
        for (var i = 0; i < percent_all.length; i++) {
            var stock_key = $('.wk-user-mychoose-table tbody tr').eq(i).find('td').eq(0).html();
            var temp_num = parseInt(percent_all.eq(i).attr('data-self-num')) / 100;
            if (temp_num != 0) {
                bar_scale[stock_key] = temp_num;
            }
        }
        for (var key in bar_scale) {
            stocks_info = stocks_info + ',' + key + ',' + bar_scale[key];
        }
        getBackTest(stocks_info, timefrom, timeto);
    })

    /**
     * 画回测折线图
     * */
    function getBackTest(stocks_info, timefrom, timeto) {
        inforcenter.getBackTest({"stocks_info": stocks_info, "end_time": timefrom, "name": timeto},
            function () {
                $("#modal-chart").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>")
            }
            , function (resultData) {
                var rateLine = echarts.init(document.getElementById("modal-chart"));
                rateLine.showLoading({
                    "text": "加载中..."
                })
                common.buildRateLineBack(resultData, yield_checkbox, hot_degree);
                rateLine.hideLoading();
            })
    }

})(jQuery, window, document);