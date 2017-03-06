/**
 * echarts构建环形图
 *
 */
// 基于准备好的dom，初始化echarts实例

// 使用刚指定的配置项和数据显示图表。



"use strict";
$(function () {
    //获取大盘指数
    function getRealIndex() {
        trade.getStockPoint(function () {
            $(".index-items").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
        }, function (resultData) {
            if (resultData && resultData.status == 1) {
                var str1=template('tpl',resultData);
                $('.index-items').html(str1);
            }
        });
    }
    // 点击我的账户获取相应的子账户
    $('.myAccount').click(function () {
        $('.myAccount-1').show();
        $(this).siblings().find('.myAccount-1').hide();

    });


    // 获取环形图盈亏收益
    function getRoundEacharts(id,data,type) {

        var myChart_profit = echarts.init(document.getElementById('profit'));
        var myChart_loss = echarts.init(document.getElementById('loss'));
        var data = {
            "total": 80000.00,
            "month": 12,
            "per": 6936.16,
            "unit": 8
        };
        var  option = {
            backgroundColor: '#fff',
            color: ['#D14A4A', '#eee'],
            series: [
                {
                    // name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    symbolSize:11,
                    hoverAnimation:false,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:20, name:''},
                        {value:80, name:''}
                    ]
                }
            ]
        };
        myChart_profit.setOption(option);
        myChart_loss.setOption(option);
    }

    //获取用户账户信息
    function getAccount() {
        trade.getAccountInfo(function () {
            $(".fund-data").html("<div class=\"row-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载中...</div>");
        },  function (resultdata) {
            if(resultdata.status==1){
                var userAccount_html = [];
                var list = resultdata.result;
                userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">总资产: '+list.total_assets+'</div>');
                userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">当日收益率：'+(list.yields_of_day*100).toFixed(2)+'%</div>');
                userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">总收益率：'+(list.total_yields*100).toFixed(2)+'%</div>');
                userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">可用资金：'+list.usable_assets+'</div>');
                userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">当日盈亏：'+list.profit_or_loss+'</div>');
                userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">股票市值：'+list.stock_value+'</div>');
                $('.fund-data .row').html(userAccount_html.join(""));
            }
        });
    }

    var firstgid;
    //获取我的组合
    function getMygroupStock() {
        trade.getUserRelatedOp({opcode: 104}, null, function (resultdata) {
            if(resultdata.status==0){
                var myGroup_html = [];
                var list = resultdata.group_list;
                // console.log(list);
                for (var i = 0; i < list.length; i++) {
                    if(i===0) {
                        firstgid=list[i].id;
                        myGroup_html.push(' <li role="presentation" class="active" data-gid="'+list[i].id+'"><a href="#index1-1" role="tab" data-toggle="tab">'+list[i].name+'</a></li>');
                    }
                    else {
                        myGroup_html.push(' <li role="presentation" data-gid="'+list[i].id+'"><a href="#index1-1" role="tab" data-toggle="tab">'+list[i].name+'</a></li>');
                    }
                }
                $('.myGroup ul').html(myGroup_html.join(""));
                getGroupStockList(firstgid);
            }
        });
    }
    //我的组合股票列表
    function getGroupStockList(gid) {
        trade.getUserRelatedOp({opcode: 105, gid: gid}, null, function (resultdata) {
            var groupStockList_html = [];
            var list = resultdata.stock_list;
            // console.log(list);
            for (var i = 0; i < list.length; i++) {
                groupStockList_html.push('<tr>');
                //序号
                groupStockList_html.push('<td>' + (i + 1) + '</td>');
                //股票代码
                //  groupStockList_html.push('<td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">'+list[i].name+'('+list[i].code+')'+'</a></td>');
                groupStockList_html.push('<td><input type="checkbox" class="checkbox"><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">' + list[i].name + '</a></td>');
                groupStockList_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">' + list[i].code + '</a></td>');
                groupStockList_html.push('<td>' + list[i].visit_heat + '</td>');
                groupStockList_html.push('<td>' + list[i].price + '</td>');
                groupStockList_html.push('<td>' + list[i].change + '</td>');
                groupStockList_html.push('<td>' + list[i].volume + '</td>');
                groupStockList_html.push('<td>' + list[i].industry + '</td>');
                groupStockList_html.push('<td class="call_back" data-groupStockList-id="' + list[i].id + '"><a href=""><img src="/static/imgs/trade/op_buy.png">&nbsp<img src="/static/imgs/trade/op_sale.png"></a></td>');
                groupStockList_html.push('</tr>');
            }
            $('.groupStockList table tbody').html(groupStockList_html.join(""));
        });
    }
    //点击组合名实现tab切换

    $('body').on("click", ".myGroup ul li", function () {
        var gid = $(this).attr('data-gid');
        getGroupStockList(gid);

    });


    //定义当日持仓
    function getHoldingStock() {
        trade.getUserRelatedOp({opcode: 106,gid:1},
            //     function () {
            //     $(".holdingStock table tbody").append("<tr><td colspan='11' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>");
            // },
            null,
            function (resultdata) {
                console.log(resultdata);
                if(resultdata.status==0){
                    //console.log(resultdata);
                    var holding_html = [];
                    var list = resultdata.stock_list;
                    if(list.length>0){
                        for (var i = 0; i < list.length; i++) {
                            holding_html.push('<tr>');
                            //序号
                            holding_html.push('<td>' + (i + 1) + '</td>');
                            //股票代码
                            //  holding_html.push('<td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">'+list[i].name+'('+list[i].code+')'+'</a></td>');
                            holding_html.push('<td>' + list[i].code + '</td>');
                            //当前持仓
                            holding_html.push('<td>' + list[i].holding + '</td>');
                            //可用股数
                            holding_html.push('<td>' + list[i].available + '</td>');
                            holding_html.push('<td>' + list[i].cost + '</td>');
                            holding_html.push('<td>' + list[i].price + '</td>');
                            holding_html.push('<td>' + list[i].market_value + '</td>');
                            holding_html.push('<td>' + list[i].profit + '</td>');
                            holding_html.push('<td>' + list[i].profit_ratio + '</td>');
                            holding_html.push('<td>' + list[i].position + '</td>');
                            holding_html.push('<td class="call_back" data-holding-id="' + list[i].id + '"><img src="/static/imgs/trade/op_buy.png">&nbsp<img src="/static/imgs/trade/op_sale.png"></td>');
                            holding_html.push('</tr>');
                        }
                    }else{
                        holding_html.push("<tr><td colspan='11' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>");
                    }

                    $('.holdingStock table tbody').html(holding_html.join(""));
                }

            });
    }

    //定义当日委托
    function getTodayOrders() {
        trade.getUserRelatedOp({opcode:107,gid:1},null,
            //     function () {
            //     $(".orderStock table tbody").append("<tr><td colspan='8' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>");
            // },
            function(resultdata){

                if(resultdata.status==0){
                    var order_html=[];
                    var list=resultdata.order_list;
                    if(list.length>0){
                        for(var i=0;i<list.length;i++){
                            order_html.push('<tr>');
                            order_html.push('<td>'+(i+1)+'</td>');
                            order_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">'+list[i].name+'('+list[i].code+')'+'</a></td>');
                            if(list[i].order_operation){ //0买，1卖)
                                order_html.push('<td>卖出</td>');
                            }else{
                                order_html.push('<td>买入</td>');
                            }
                            order_html.push('<td>'+list[i].order_price+'</td>');
                            order_html.push('<td>'+list[i].order_nums+'</td>');
                            order_html.push('<td>'+Utility.unixToDate4(list[i].order_time)+'</td>');
                            if(list[i].status){
                                order_html.push('<td>已成交</td>');
                            }else{
                                order_html.push('<td>未成交</td>');
                            }
                            order_html.push('<td class="call-back" data-order-id="'+list[i].id+'">撤销</td>');
                            order_html.push('</tr>');
                        }

                        $('.orderStock table tbody').html(order_html.join(""));
                    }
                     else {order_html.push("<tr><td colspan='8' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>")}


                }

            });
    }

    //定义当日成交方法
    function getFinishedOrder() {
        trade.getUserRelatedOp({opcode: 108,gid:1},
            null,
            //     function () {
            //     $(".finishedOrder table tbody").append("<tr><td colspan='7' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>");
            // },
            function (resultdata) {
                if(resultdata.status==0){
                    var finishedOrder_html = [];
                    var list = resultdata.order_list;
                    if(list.length>0){
                        for (var i = 0; i < list.length; i++) {
                            finishedOrder_html.push('<tr>');
                            finishedOrder_html.push('<td>' + (i + 1) + '</td>');
                            //股票代码
                            //order_html.push('<td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">'+list[i].name+'('+list[i].code+')'+'</a></td>');
                            finishedOrder_html.push('<td>' + list[i].code + '</td>');
                            if (list[i].order_operation) { //0买，1卖)
                                finishedOrder_html.push('<td>卖出</td>');
                            } else {
                                finishedOrder_html.push('<td>买入</td>');
                            }
                            finishedOrder_html.push('<td>' + list[i].order_price + '</td>');
                            finishedOrder_html.push('<td>' + list[i].order_nums + '</td>');
                            finishedOrder_html.push('<td>' + list[i].amount + '</td>');
                            finishedOrder_html.push('<td>' + Utility.unixToDate4(list[i].order_time) + '</td>');
                            finishedOrder_html.push('</tr>');
                        }
                    }

                    $('.finishedOrder table tbody').html(finishedOrder_html.join(""));
                }

            });

    }

    //定义历史成交方法
    function getHistoryOrder() {
        trade.getUserRelatedOp({opcode: 109,gid:1},
            null,
            //     function () {
            //     $(".HistoryOrder table tbody").append("<tr><td colspan='7' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>");
            // },
            function (resultdata) {
                if(resultdata.status==0){
                    var HistoryOrder_html = [];
                    var list = resultdata.order_list;
                    //console.log(list);
                    for (var i = 0; i < list.length; i++) {
                        HistoryOrder_html.push('<tr>');
                        HistoryOrder_html.push('<td>' + (i + 1) + '</td>');
                        //股票代码
                        //order_html.push('<td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">'+list[i].name+'('+list[i].code+')'+'</a></td>');
                        HistoryOrder_html.push('<td>' + list[i].code + '</td>');
                        if (list[i].order_operation) { //0买，1卖)
                            HistoryOrder_html.push('<td>卖出</td>');
                        } else {
                            HistoryOrder_html.push('<td>买入</td>');
                        }
                        HistoryOrder_html.push('<td>' + list[i].order_price + '</td>');
                        HistoryOrder_html.push('<td>' + list[i].order_nums + '</td>');
                        HistoryOrder_html.push('<td>' + list[i].amount + '</td>');
                        HistoryOrder_html.push('<td>' + Utility.unixToDate4(list[i].order_time) + '</td>');
                        HistoryOrder_html.push('</tr>');
                    }
                    $('.HistoryOrder table tbody').html(HistoryOrder_html.join(""));
                }

            });

    }

    //定义对账单方法
    function getStatement() {
        trade.getUserRelatedOp({
                opcode: 110,
                end_time: '2017-01-12',
                start_time: '2017-01-20'
            },
            null,
            //     function () {
            //     $(".statement table tbody").append("<tr><td colspan='10' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>");
            // },
            function (resultdata) {
                if(resultdata.status==0){
                    var statement_html = [];
                    var list = resultdata.statement_list;
                    console.log(list);
                    for (var i = 0; i < list.length; i++) {
                        statement_html.push('<tr>');
                        //股票代码
                        //order_html.push('<td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">'+list[i].name+'('+list[i].code+')'+'</a></td>');
                        statement_html.push('<td>' + Utility.unixToDate4(list[i].amount) + '</td>');
                        statement_html.push('<td>' + list[i].code + '</td>');
                        if (list[i].order_operation) { //0买，1卖)
                            statement_html.push('<td>卖出</td>');
                        } else {
                            statement_html.push('<td>买入</td>');
                        }
                        statement_html.push('<td>' + list[i].order_price + '</td>');
                        statement_html.push('<td>' + list[i].order_nums + '</td>');
                        statement_html.push('<td>' + list[i].commission + '</td>');
                        statement_html.push('<td>' + list[i].order_operation + '</td>');
                        statement_html.push('<td>' + list[i].stamp_duty + '</td>');
                        statement_html.push('<td>' + list[i].transfer_fee + '</td>');
                        statement_html.push('<td>' + list[i].available_capital + '</td>');
                        statement_html.push('</tr>');
                    }
                    $('.statement table tbody').html(statement_html.join(""));
                }

            });
    }
    //命名空间
    var ctrlInfo = {

        getGroupStock: function (groupName) {
            trade.showstock({ori_name: groupName}, function () {
                $(".wk-sub-refresh").addClass("fa-spin");
                $(".wk-user-mychoose-table table>tbody").html("<tr><td colspan='11'><div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div></td></tr>");
            }, function () {
                $(".wk-sub-refresh").removeClass("fa-spin");
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
            trade.getPlatform(function () {
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
                                trade.delUserPlatform({plat_id: _plat_id}, null, function (resultData) {
                                    if (resultData.status == 1) {
                                        $this.removeClass("fa-times-circle").addClass("fa-plus").siblings().removeClass("active");
                                    }
                                });
                            } else {
                                trade.addUserPlatform({plat_id: _plat_id}, null, function (resultData) {
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
            trade.getRelatedInfo(arrData, function () {
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
            trade.getRelatedInfo(arrData, function () {
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
            trade.getRelatedInfo(arrData, function () {
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
            trade.getRelatedInfo(arrData, function () {
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
            trade.getRelatedInfo(arrData, function () {
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
        }


    };

    // 新闻标签点击
    $(".wk-user-mynews .btn-group span:first-child").bind("click", function () {
        var btnGroup = $(this).parent().parent();
        var stock_list = $(".wk-user-mynews").attr("data-stock");
        var target = btnGroup.attr("data-target");
        btnGroup.addClass("active").siblings().removeClass("active");
        $("#" + target).show().siblings().hide();
        if (target == "wk-user-news-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getNews({"query_type": 1, "start_time": 0, "info_type": 0, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-info-type", 0);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-fastnews-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getFastNews({"query_type": 1, "start_time": 0, "info_type": 1, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-info-type", 1);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-vpoint-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getMedia({"query_type": 1, "start_time": 0, "info_type": 2, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-info-type", 2);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-notice-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getNotice({"query_type": 1, "start_time": 0, "info_type": 4, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-info-type", 4);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
        if (target == "wk-user-report-list") {
            $("#" + target).find(".wk-con").html("");
            ctrlInfo.getReport({"query_type": 1, "start_time": 0, "info_type": 3, "stock_list": stock_list});
            $(".wk-user-mynews").attr("data-info-type", 3);
            $(".wk-user-mynews").attr("data-query-type", 1);
        }
    });

    // 新闻下拉刷新
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
                trade.getRelatedInfo({
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
                trade.getRelatedInfo({
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
                trade.getRelatedInfo({
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
                trade.getRelatedInfo({
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
                trade.getRelatedInfo({
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

    //调用大盘指数
    getRealIndex();
    //调用环形盈亏收益分析
    getRoundEacharts();
    //调用用户资产变动信息
    getAccount();
    //调用我的股票组合，渲染页面
    getMygroupStock();
    //调用当前持仓，渲染页面
    getHoldingStock();
    //调用当日委托，渲染页面
    getTodayOrders();
    //调用当日成交，渲染页面
    getFinishedOrder();
    //调用历史成交，渲染页面
    getHistoryOrder();
    //调用对账单，渲染页面
    getStatement();


});