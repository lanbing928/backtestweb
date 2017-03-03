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
                // if (resultData.index_info.length > 0) {
                //     var indexHtml = [];
                //     var list = resultData.index_info;
                //     for (var i = 0; i < list.length; i++) {
                //         indexHtml.push("<div class=\"col-md-4\">");
                //         indexHtml.push("<div class=\"redStyle" + Utility.getUpDownColor(list[i].up_price) + "\">");
                //         indexHtml.push("<p class=\"wk-user-datas-title\">" + list[i].name + "</p><div>");
                //         indexHtml.push("<p class=\"wk-user-datas-num\">");
                //         if (list[i].up_price > 0) {
                //             indexHtml.push("<img src=\"../static/imgs/trade/op_buy.png\">");
                //         }
                //         else if (list[i].up_price < 0) {
                //             indexHtml.push("<img src=\"../static/imgs/trade/op_sale.png\">");
                //         }
                //         indexHtml.push(list[i].price);
                //         indexHtml.push("</p>");
                //         indexHtml.push("<div class=\"wk-user-datas-per\">");
                //         indexHtml.push("<p>" + (list[i].up_price > 0 ? "\+" : "") + (list[i].up_price).toFixed(2) + "</p>");
                //         indexHtml.push("<p>" + (list[i].up_percent > 0 ? "\+" : "") + (list[i].up_percent * 100).toFixed(2) + "%</p>");
                //         indexHtml.push("</div></div><hr></div></div>");
                //     }
                //     $(".wk-user-datas").html(indexHtml.join(''));
                // }
                $('.index-items').html(str1);


            }

        });
    }
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







        // var option= {
        //     // tooltip: {
        //     //     trigger: 'item',
        //     //     formatter: "{a} <br/>{b}: {c} ({d}%)"
        //     // },
        //     legend: {
        //         orient: 'vertical',
        //         x: 'right',
        //         y:'center',
        //         itemWidth: '10',
        //         itemHeight:'1'
        //     },
        //     grid:{
        //         center:(0,0)
        //     },
        //     series: [
        //         {
        //             // name:'访问来源',
        //             type:'pie',
        //             radius: ['70%', '40%'],
        //             avoidLabelOverlap: false,
        //             label: {
        //                 normal: {
        //                     show: false,
        //                     position: 'center'
        //                 },
        //                 emphasis: {
        //                     show: true,
        //                     textStyle: {
        //                         fontSize: '16',
        //                         fontWeight: 'bold'
        //                     }
        //                 }
        //             },
        //             labelLine: {
        //                 normal: {
        //                     show: false
        //                 }
        //             },
        //             data:[
        //                 {value:335}
        //             ]
        //         }
        //     ]
        // };
        myChart_profit.setOption(option);
        myChart_loss.setOption(option);
    }

    //获取用户资产信息
    function getAccount() {
        trade.getAccountInfo(null, function (resultdata) {
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
        trade.getUserRelatedOp({opcode: 104,}, null, function (resultdata) {
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
                groupStockList_html.push('<td class="call_back" data-groupStockList-id="' + list[i].id + '"><img src="/static/imgs/trade/op_buy.png">&nbsp<img src="/static/imgs/trade/op_sale.png"></td>');
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


    //定义当日持仓方法
    function getHoldingStock() {
        trade.getUserRelatedOp({opcode: 106}, null, function (resultdata) {
            //console.log(resultdata);
            var holding_html = [];
            var list = resultdata.stock_list;
            // console.log(list);
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
            $('.holdingStock table tbody').html(holding_html.join(""));
        });
    }

    //定义当日委托方法
    function getTodayOrders() {
        trade.getUserRelatedOp({opcode: 107}, null, function (resultdata) {
            if(resultdata.status==1) {
                var order_html = [];
                var list = resultdata.order_list;
                for (var i = 0; i < list.length; i++) {
                    order_html.push('<tr>');
                    order_html.push('<td>' + (i + 1) + '</td>');
                    //股票代码
                    //order_html.push('<td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+list[i].code+'&uid='+uid+'&token=token" target="_blank">'+list[i].name+'('+list[i].code+')'+'</a></td>');
                    order_html.push('<td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code + '&uid=' + uid + '&token=token" target="_blank">' + list[i].code + '</a></td>');
                    if (list[i].order_operation) { //0买，1卖)
                        order_html.push('<td>卖出</td>');
                    } else {
                        order_html.push('<td>买入</td>');
                    }
                    order_html.push('<td>' + list[i].order_price + '</td>');
                    order_html.push('<td>' + list[i].order_nums + '</td>');
                    order_html.push('<td>' + Utility.unixToDate4(list[i].order_time) + '</td>');
                    if (list[i].status) {
                        order_html.push('<td>已成交</td>');
                    } else {
                        order_html.push('<td>未成交</td>');
                    }
                    order_html.push('<td class="call_back" data-order-id="' + list[i].id + '">撤销</td>');
                    order_html.push('</tr>');
                }
                $('.orderStock table tbody').html(order_html.join(""));
            }
        });
    }

    //定义当日成交方法
    function getFinishedOrder() {
        trade.getUserRelatedOp({opcode: 108}, null, function (resultdata) {
            var finishedOrder_html = [];
            var list = resultdata.order_list;
            //console.log(list);
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
            $('.finishedOrder table tbody').html(finishedOrder_html.join(""));
        });

    }

    //定义历史成交方法
    function getHistoryOrder() {
        trade.getUserRelatedOp({opcode: 109}, null, function (resultdata) {
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
        });

    }

    //定义对账单方法
    function getStatement() {
        trade.getUserRelatedOp({
            opcode: 110,
            end_time: '2017-01-12',
            start_time: '2017-01-20'
        }, null, function (resultdata) {
            var statement_html = [];
            var list = resultdata.statement_list;
            // console.log(list);
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
        });
    }
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