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
                var str1 = template('tpl', resultData);
                $('.index-items').html(str1);
            }
        });
    }

    var holdings_gid;//选中的账户id

    var is_first=0;
    /*我的账户里的获取账户*/
    function getGroupList() {
        trade.getUserRelatedOp({opcode: 104}, function () {
            if(is_first==0){
                $('.btn-groupList').html('<li style="border:none"><i class="fa fa-refresh fa-spin"></i>&nbsp;加载中...</li>');
            }
        }, function (resultData) {
            if (resultData.status == 0) {
                var groupHtml = [];
                if (resultData.group_list.length > 0) {
                    var cookie_gid=Utility.getCookie('last_gid');
                    for (var i = 0; i < resultData.group_list.length; i++) {
                        if(cookie_gid){ //最后一次交易的cookie存在
                            if(resultData.group_list[i].id == cookie_gid){ //最后一次交易gid cookie
                                holdings_gid = resultData.group_list[i].id;//默认的账户id,gid
                                // groupHtml.push('<li class="left gp-active" data-gid="' + resultData.group_list[i].id + '">' + resultData.group_list[i].name + '</li>')
                                groupHtml.push('<li class="left gp-active" data-gid="'+resultData.group_list[i].id+'">');
                            }
                            else{
                                // if(i==0){
                                //     holdings_gid=resultData.group_list[0].id;//默认的账户id,gid
                                //     groupHtml.push('<li class="left gp-active" data-gid="'+resultData.group_list[0].id+'">')
                                // }else{
                                    groupHtml.push('<li class="left" data-gid="'+resultData.group_list[i].id+'">')
                                // }
                            }
                            groupHtml.push('<span>'+resultData.group_list[i].name+'</span>&nbsp;');
                            groupHtml.push('<span class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-chevron-down"></i></span>');
                            groupHtml.push('<ul class="dropdown-menu" data-group-name="'+resultData.group_list[i].name+'" data-group-id="'+resultData.group_list[i].id+'"><li class="change-name"><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li><li class="del-group"><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li></ul>');
                            groupHtml.push('</li>');
                        }
                        else{ //没有cookie 最后一次交易不存在
                            if (i == 0) { //最后一次交易gid不存在就默认第一个账号
                                holdings_gid = resultData.group_list[0].id;//默认的账户id,gid
                                // groupHtml.push('<li class="left gp-active" data-gid="' + resultData.group_list[0].id + '">' + resultData.group_list[0].name + '</li>')
                                groupHtml.push('<li class="left gp-active" data-gid="'+resultData.group_list[0].id+'">');
                            } else {
                                // groupHtml.push('<li class="left" data-gid="' + resultData.group_list[i].id + '">' + resultData.group_list[i].name + '</li>')
                                groupHtml.push('<li class="left" data-gid="'+resultData.group_list[i].id+'">')

                            }
                            groupHtml.push('<span>'+resultData.group_list[i].name+'</span>&nbsp;');
                            groupHtml.push('<span class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-chevron-down"></i></span>');
                            groupHtml.push('<ul class="dropdown-menu" data-group-name="'+resultData.group_list[i].name+'" data-group-id="'+resultData.group_list[i].id+'"><li class="change-name"><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li><li class="del-group"><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li></ul>');
                            groupHtml.push('</li>');
                        }

                    }

                    // getGroupStockList();
                    // getAccount();
                }
                // else {
                //     groupHtml.push('<li style="border:none">无添加的账号</li>')
                // }
                groupHtml.push('<li class="left add-group trade-add-group" data-gid="-1">自定义<i class="fa fa-plus"></i></li>');
                groupHtml.push('<div class="clear"></div>');
                $('.btn-groupList').html(groupHtml.join(""));
                if(holdings_gid){
                    getGroupStockList();
                    clickGroupList();//点击账户切换不同的股票信息
                    changeGroupName();
                    delGroupName();
                }else{
                    $(".holdingStock table tbody").html("<tr><td colspan='11' style='padding: 50px 0 40px 0;'>暂无账户相关数据</td></tr>");
                }
                is_first++;
            }
        });
    }

    /*修改组合名称*/
    function changeGroupName() {
        $('#holdings .change-name').on('click',function(){
            var group_id=$(this).parent().attr('data-group-id');
            var group_name=$(this).parent().attr('data-group-name');
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
                $('.sa-input-error').click(function(){
                    $(this).removeClass('show').prev().val('');
                    $(this).parent().parent().find('.sa-error-container').removeClass('show');
                });
                if (inputValue === false) return false;
                if ($.trim(inputValue) === "") {
                    swal.showInputError("请输入组合名称");
                    return false;
                }
                if ($.trim(inputValue) == group_name) {
                    swal.showInputError("与原组合名重复");
                    return false;
                }
                if (Utility.getByteLen(inputValue) > 12) {
                    swal.showInputError("字符数超过限制");
                    return false;
                }
                trade.getUserRelatedOp({
                    opcode:117,
                    group_name:inputValue+',',
                    gid: group_id
                }, null, function (resultData) {
                    if (resultData.status == 0) {
                        swal({
                            title: "",
                            text: "修改组合<span style='color: #F8BB86'>" + group_name + "</span>为<span style='color: #F8BB86'>" + inputValue + "</span>成功",
                            html: true,
                            timer: 1000,
                            showConfirmButton: false
                        });
                        //修改完后重新加载我的组选股组合(tip:可以直接修改掉名字而不用请求接口)
                        getGroupList();
                        // $('#holdings .btn-groupList .gp-active span:nth-child(1)').html(inputValue);//直接改名字不调接口

                    }
                    else{
                        swal({
                            title: "",
                            text: "修改组合<span style='color: #F8BB86'>" + group_name + "</span>为<span style='color: #F8BB86'>" + inputValue + "</span>失败："+resultData.msg,
                            html: true,
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                });
            });
        });
    };

    /*删除组合*/
    function delGroupName() {
        $('#holdings .del-group').on('click',function(){
            var group_id=$(this).parent().attr('data-group-id');
            var group_name=$(this).parent().attr('data-group-name');
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
                    trade.getUserRelatedOp({opcode:118,gid: group_id}, null, function (resultData) {
                        if (resultData.status == 0) {
                            swal({
                                title: "",
                                text: "组合<span style='color: #F8BB86'>" + group_name + "</span>已被删除",
                                html: true,
                                timer: 1000,
                                showConfirmButton: false
                            });

                            if(group_id==Utility.getCookie('last_gid')){
                                Utility.unsetCookie('last_gid');
                            }
                            getGroupList();   // 重新获取账户
                            getGroupStockList();//当前持仓，当日委托，当日成交，历史成交，对账单

                        }
                        else if(resultData.status == 26){
                            swal({
                                title: "持仓未平，不能删除",
                                html: true,
                                timer: 5000,
                                showConfirmButton: true
                            });
                        }
                    });
                }
            });
        });
    }

    /*建立模拟交易的组合*/
    $("body").on("click", "#holdings .add-group", function () {
        swal({
            title: "添加账户",
            text: "账户名称不能超过6个汉字或12个字符",
            type: "input",
            html: true,
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            animation: "slide-from-top",
            inputPlaceholder: "请输入账户名称"
        }, function (inputValue) {
            $('.sa-input-error').click(function(){
                $(this).removeClass('show').prev().val('');
                $(this).parent().parent().find('.sa-error-container').removeClass('show');
            });
            if (inputValue === false) return false;
            if ($.trim(inputValue) === "") {
                swal.showInputError("请输入账户名称");
                return false;
            }
            if (Utility.getByteLen(inputValue) > 12) {
                swal.showInputError("字符数超过限制");
                return false;
            }
            trade.getUserRelatedOp({opcode: 101, group_name: inputValue+','}, null, function (resultData) {
                if (resultData.status==0) {
                    swal({
                        title: "",
                        text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>账户成功",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                    getGroupList();   // 重新获取账户
                    // getUserGroup();//模拟交易买卖中的账户列表
                } else {
                    swal({
                        title: "",
                        text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>账户失败," + resultData.msg + "",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        });
    });


    /*点击账户切换账户的股票信息*/
    function clickGroupList() {
        $('.attention .btn-groupList >li').on('click', function () {
            $(this).not('.add-group').addClass('gp-active').siblings().removeClass('gp-active');
            var tmp_gid = $(this).attr('data-gid');
            Utility.setCookie('last_gid',tmp_gid);//设置点击股票的组合id设置为最后一次操作的cookie
            if (tmp_gid != -1) {
                holdings_gid = tmp_gid;
                getGroupStockList(tmp_gid);

            }
        });
    }

    // 点击每个子账户中的当前持仓，当日委托，当日成交，历史成交，对账单；
    $('#holdings .clickLi li').on('click', function () {
        var tapList = $(this).attr('data-type');

        if (tapList == 1) {
            getHoldingStock(holdings_gid);
        }
        else if (tapList == 2) {
            getTodayOrders();
        }
        else if (tapList == 3) {
            getFinishedOrder(holdings_gid);
        }
        else if (tapList == 4) {
            getHistoryOrder('0-0-0',Utility.getNowFormatDate1());
            $('.sQuery1,.eQuery1').val('');

        }
        else if (tapList == 5) {
            getStatement('0-0-0',Utility.getNowFormatDate1());
            $('.sQuery2,.eQuery2').val('');

        }
    });
    // 获取环形图盈亏收益
    function getRoundEacharts(gid) {
        var myChart_profit = echarts.init(document.getElementById('profit'));
        var myChart_loss = echarts.init(document.getElementById('loss'));
        var profit;
        var loss;
        var profit_scale=0;
        var loss_scale=0;
        trade.getUserRelatedOp({opcode: 115, gid: holdings_gid}, null, function (resultdata) {
            if (resultdata.status == 0) {
                profit = resultdata.profit_num;
                loss = resultdata.loss_num;
                if (profit + loss == 0) {
                    profit_scale = "--";
                    loss_scale = "--";
                }
                else {
                    profit_scale = (profit / (profit + loss)*100).toFixed(2)+'%';
                    loss_scale = (loss / (profit + loss)*100).toFixed(2)+'%';
                }
                var option1= {
                    color: ['#D14A4A', '#d0d0d0'],
                    tooltip: {
                        show:false,
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left'
                    },
                    series: [
                        {
                            // name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value: profit / (profit + loss)*100, name: ''},
                                {value: loss / (profit + loss)*100, name: ''}
                            ]
                        }
                    ]
                };
                var option2= {
                    // backgroundColor: '#fff',
                    color: ['#d0d0d0','#009944'],
                    legend: {
                        orient: 'vertical',
                        x: 'left'
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:  profit / (profit + loss)*100, name: ''},
                                {value:  loss / (profit + loss)*100, name: ''}
                            ]
                        }
                    ]
                };
                myChart_profit.setOption(option1);
                myChart_loss.setOption(option2);

                $('.profit-amount p:nth-child(1)').html(profit_scale);
                $('.profit-amount p:nth-child(2) span').html(profit);
                $('.loss-amount p:nth-child(1)').html(loss_scale);
                $('.loss-amount p:nth-child(2) span').html(loss);
            }

        });

    }
    //获取每个子账户的信息
    function getAccount() {
        if(holdings_gid) {
            trade.getAccountInfo({opcode: 131, gid: holdings_gid}, function () {
                $(".fund-data .user_account").html("<div class=\"row-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载中...</div>");
            }, function (resultdata) {
                if (resultdata.status == 0) {
                    var userAccount_html = [];
                    var list = resultdata.user_account_info;
                    userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">总资产: ' + list.total_assets.toFixed(2) + '</div>');
                    // userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">当日收益率：' + (list[i].yields_of_day * 100).toFixed(2) + '%</div>');
                    userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">总收益率：' + (list.total_yields * 100).toFixed(2) + '%</div>');
                    // userAccount_html.push('<div class="col-md-3 col-xs-6 fund-item">当日盈亏：' + list[i].profit_or_loss + '</div>');
                    userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">总市值：' + list.stock_value.toFixed(2) + '</div>');
                    userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">可用资产：' + list.usable_assets.toFixed(2) + '</div>');
                    userAccount_html.push('<div class="col-md-4 col-xs-6 fund-item">持仓收益：' + list.holding_yields.toFixed(2) + '</div>');
                    $('.fund-data .user_account').html(userAccount_html.join(""));
                }
            });
        }
    }
    //默认当前持仓，当日委托，当日成交，历史成交，对账单
    function getGroupStockList(holdings_gid) {
            getRoundEacharts(holdings_gid);
            getAccount();
            getHoldingStock(holdings_gid);
            getTodayOrders();
            getFinishedOrder(holdings_gid);
            getHistoryOrder('0-0-0',Utility.getNowFormatDate1());
            getStatement('0-0-0',Utility.getNowFormatDate1());

    }

    //点击组合名实现tab切换
    $('body').on("click", ".myGroup ul li", function () {
        var gid = $(this).attr('data-gid');
        getGroupStockList(gid);

    });

    //定义当日持仓
    function getHoldingStock(gid) {
        trade.getUserRelatedOp({opcode: 106, gid: holdings_gid},
            function () {
                if(is_first==0) {
                    $(".holdingStock table tbody").html("<tr><td colspan='11' style='padding: 50px 0 40px 0;'><i class='fa fa-refresh fa-spin'></i>&nbsp;加载中...</td></tr>");
                }
            },
            function (resultdata) {
                if (resultdata.status == 0) {
                    var holding_html = [];
                    var list = resultdata.stock_list;
                    if (list.length > 0) {
                        for (var i = 0; i < list.length; i++) {
                            holding_html.push('<tr>');
                            //序号
                            holding_html.push('<td>' + (i + 1) + '</td>');
                            //股票代码
                            holding_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code+ '&uid=' + uid + '&token=token" target="_blank">' + list[i].name + '(<span>'+ list[i].code + '</span>)' + '</a></td>');
                            // holding_html.push('<td>' + list[i].code + '</td>');
                            //当前持仓
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>" + list[i].holding + '</td>');
                            //可用股数
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>" + list[i].available + '</td>');
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>" + list[i].cost.toFixed(3) + '</td>');
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>" + list[i].price.toFixed(3) + '</td>');
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>"+ list[i].market_value + '</td>');
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>" + list[i].profit.toFixed(2) + '</td>');
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>" + list[i].profit_ratio.toFixed(2)+'%'+ '</td>');
                            holding_html.push("<td class='" + Utility.getPriceColor(list[i].profit_ratio) + "'>" + list[i].position.toFixed(2)+ '</td>');
                            // holding_html.push('<td class="call_back" data-holding-id="' + list[i].id + '"><img src="/static/imgs/trade/op_buy.png">&nbsp<img src="/static/imgs/trade/op_sale.png"></td>');
                            holding_html.push('<td>');
                            holding_html.push('<a href="trade.php?name='+list[i].name+'&gid='+holdings_gid+'&code='+list[i].code+'&price='+list[i].price.toFixed(2)+'"><img src="../static/imgs/trade/op_buy.png" class="one-stock-trade" data-trade-type="0"></a>&nbsp;');
                            if(list[i].available== 0){
                                holding_html.push('&nbsp;--');
                            }else{
                                // holding_html.push('<img src="../static/imgs/trade/op_sale.png" class="one-stock-trade" data-trade-type="2" data-holding-num="'+list[i].holding+'" href="#trade" data-toggle="tab">');
                                holding_html.push('<a href="trade.php?gid='+holdings_gid+'&code='+list[i].code+'&type=1"><img src="../static/imgs/trade/op_sale.png" class="one-stock-trade" data-trade-type="0"></a>&nbsp;');
                            }
                            holding_html.push('</td>');
                            holding_html.push('</tr>');
                        }
                    } else {
                        holding_html.push("<tr><td colspan='11' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>");
                    }

                    $('.holdingStock table tbody').html(holding_html.join(""));
                }

            });
    }
    /*单个股票买卖 跳转到交易*/

    // $("body").on("click", "#holdings .one-stock-trade", function () {
    //     var trade_type=$(this).attr('data-trade-type');//1 买 2卖
    //     var code=$(this).parent().parent().find("td:nth-child(2) span").html();//1 买 2卖
    //     var stock_name=$(this).parent().parent().find("td:nth-child(3)").html();//1 买 2卖
    //     var group_name=$('#holdings .btn-groupList').find('.gp-active').html();//组合名
    //     $('#collapseOne li:nth-child(2)').removeClass('active').find('a').attr('aria-expanded','false');//我的账户tab显灰
    //     $('#collapseOne li:nth-child(3)').addClass('active').find('a').attr('aria-expanded','true');//交易tab显示
    //     if(code){
    //         if(trade_type==1){ //买
    //             $('#trade .nav li:nth-child(1)').addClass('active').find('a').attr('aria-expanded','true');
    //             $('#trade .nav li:nth-child(2)').removeClass('active').find('a').attr('aria-expanded','false');
    //             $('#trade .tab-content #buy').addClass('active');
    //             $('#trade .tab-content #sale').removeClass('active');
    //             $('#buy .wk-trade-search').val(code);
    //             $('#buy .wk-trade-search').trigger('input');//触发typehead插件
    //             $('#buy .user-group option').each(function(){  //默认选中组合名
    //                 if($(this).html()==group_name){
    //                     $(this).prop('selected',true).siblings().prop('selected',false);
    //                 }
    //             });
    //         }else if(trade_type==2){  //卖
    //             $('#trade .nav li:nth-child(1)').removeClass('active').find('a').attr('aria-expanded','false');
    //             $('#trade .nav li:nth-child(2)').addClass('active').find('a').attr('aria-expanded','true');
    //             $('#trade .tab-content #buy').removeClass('active');
    //             $('#trade .tab-content #sale').addClass('active');
    //             $('#sale .user-group option').each(function(){  //默认选中组合名
    //                 if($(this).html()==group_name){
    //                     $(this).prop('selected',true).siblings().prop('selected',false);
    //                     $('#sale .sale-stock-group').trigger('change',[code]);//获取组合下股票信息并把点击的股票代码传给change事件
    //                 }
    //             });
    //         }
    //     }
    // });
    /*撤单*/
    $('body').on("click", "#holdings .call-back", function () {
        var order_id = $(this).attr('data-order-id');
        var group_id = $(this).attr('data-id');
        // trade.getUserRelatedOp({opcode:114,order_id:order_id,gid:group_id},null,function(resultData){
        //     if(resultData.status==0){
        //         swal({title: "撤单成功！", type: "success", timer: 1200, showConfirmButton: false});
        //         getTodayOrders();
        //     }else{
        //         swal({title: "撤单失败！", type: "error", timer: 1200, showConfirmButton: false});
        //     }
        // });
        swal({
            title: "",
            text: "确认要撤销这笔委托么？",
            type: "info",
            html: true,
            showCancelButton: true,
            closeOnConfirm: false,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            animation: "slide-from-top",
        }, function () {
            trade.getUserRelatedOp({opcode: 114, order_id: order_id, gid: group_id}, null, function (resultData) {
                if (resultData.status == 0) {
                    swal({title: "撤单成功！", type: "success", timer: 1200, showConfirmButton: false});
                    getTodayOrders();
                } else {
                    swal({title: "撤单失败！", type: "error", timer: 1200, showConfirmButton: false});
                }
            });
        });
    });
    //定义当日委托
    function getTodayOrders() {
        trade.getUserRelatedOp({opcode: 107, gid: holdings_gid},
            function () {
                $(".orderStock table tbody").html("<tr><td colspan='8' style='padding: 50px 0 40px 0;'><i class='fa fa-refresh fa-spin'></i>&nbsp;加载中...</td></tr>");
            },
            function (resultdata) {
                if (resultdata.status == 0) {
                    var order_html = [];
                    var list = resultdata.order_list;
                    if (list.length > 0) {
                        for (var i = 0; i < list.length; i++) {
                            order_html.push('<tr>');
                            order_html.push('<td>' + (i + 1) + '</td>');
                            order_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code + '&uid=' + uid + '&token=token" target="_blank">' + list[i].name + '(' + list[i].code + ')' + '</a></td>');
                            if (list[i].order_operation) { //0买，1卖)
                                order_html.push('<td>卖出</td>');
                            } else {
                                order_html.push('<td>买入</td>');
                            }
                            order_html.push('<td>' + list[i].order_price.toFixed(3) + '</td>');
                            order_html.push('<td>' + list[i].order_nums + '</td>');
                            order_html.push('<td>' + Utility.unixToDate4(list[i].order_time*1000) + '</td>');
                            if (list[i].status==1) {
                                order_html.push('<td>已成交</td>');
                                order_html.push('<td>--</td>');
                            } else if(list[i].status==0) {
                                order_html.push('<td>未成交</td>');
                                order_html.push('<td class="call-back" data-order-id="' + list[i].id + '"  data-id="' + list[i].group_id + '">撤销</td>');
                            }
                            else if(list[i].status == 2){
                                order_html.push('<td>已撤销</td>');
                                order_html.push('<td>--</td>');
                            }
                            order_html.push('</tr>');
                        }
                    }
                    else {
                        order_html.push("<tr><td colspan='8' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>")
                    }
                    $('.orderStock table tbody').html(order_html.join(""));
                }
            });
    }
    //定义当日成交方法
    function getFinishedOrder(gid) {
        trade.getUserRelatedOp({opcode: 108, gid: gid},
            function () {
                $(".finishedOrder table tbody").html("<tr><td colspan='7' style='padding: 50px 0 40px 0;'><i class='fa fa-refresh fa-spin'></i>&nbsp;加载中...</td></tr>");
            },
            function (resultdata) {
                if (resultdata.status == 0) {
                    var finishedOrder_html = [];
                    var list = resultdata.order_list;
                    if (list.length > 0) {
                        for (var i = list.length-1; i >=0; i--) {
                            finishedOrder_html.push('<tr>');
                            finishedOrder_html.push('<td>' + (i + 1) + '</td>');
                            //股票代码
                            finishedOrder_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code + '&uid=' + uid + '&token=token" target="_blank">' + list[i].name + '(' + list[i].code + ')' + '</a></td>');
                            // finishedOrder_html.push('<td>' + list[i].code + '</td>');
                            if (list[i].order_operation) { //0买，1卖)
                                finishedOrder_html.push('<td>卖出</td>');
                            } else {
                                finishedOrder_html.push('<td>买入</td>');
                            }
                            finishedOrder_html.push('<td>' + list[i].order_price.toFixed(3) + '</td>');
                            finishedOrder_html.push('<td>' + list[i].order_nums + '</td>');
                            finishedOrder_html.push('<td>' + list[i].amount.toFixed(2) + '</td>');
                            finishedOrder_html.push('<td>' + Utility.unixToDate4(list[i].order_time*1000) + '</td>');
                            finishedOrder_html.push('</tr>');
                        }
                    }
                    else {
                        finishedOrder_html.push("<tr><td colspan='7' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>")
                    }

                    $('.finishedOrder table tbody').html(finishedOrder_html.join(""));
                }
            });
    }
    //定义历史成交方法
    function getHistoryOrder(start,end) {
        trade.getUserRelatedOp({opcode: 109,
                start_time: start,
                end_time:end,
                gid: holdings_gid },
            function () {
                $(".HistoryOrder table tbody").html("<tr><td colspan='7' style='padding: 50px 0 40px 0;'><i class='fa fa-refresh fa-spin'></i>&nbsp;加载中...</td></tr>");
            },
            function (resultdata) {
                if (resultdata.status == 0) {
                    var HistoryOrder_html = [];
                    var list = resultdata.order_list;
                    if(list.length>0){
                        for (var i = list.length-1; i >=0; i--) {
                            HistoryOrder_html.push('<tr>');
                            HistoryOrder_html.push('<td>' + (i + 1) + '</td>');
                            //股票代码
                            HistoryOrder_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code + '&uid=' + uid + '&token=token" target="_blank">' + list[i].name + '(' + list[i].code + ')' + '</a></td>');
                            if (list[i].order_operation) { //0买，1卖)
                                HistoryOrder_html.push('<td>卖出</td>');
                            } else {
                                HistoryOrder_html.push('<td>买入</td>');
                            }
                            HistoryOrder_html.push('<td>' + list[i].order_price.toFixed(3) + '</td>');
                            HistoryOrder_html.push('<td>' + list[i].order_nums + '</td>');
                            HistoryOrder_html.push('<td>' + list[i].amount.toFixed(2) + '</td>');
                            HistoryOrder_html.push('<td>' + Utility.unixToDate4(list[i].order_time*1000) + '</td>');
                            HistoryOrder_html.push('</tr>');
                        }
                    }
                    else {
                        HistoryOrder_html.push("<tr><td colspan='7' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>")
                    }
                    $('.HistoryOrder table tbody').html(HistoryOrder_html.join(""));
                }
            });
    }
    // 点击历史成交查询
    $('body').on('click','.h-query',function () {
            var inputVule1=$('.sQuery1').val();
            var inputVule2=$('.eQuery1').val();
            inputVule2 = inputVule2.substring(0,10);
            inputVule2 = inputVule2.replace(/-/g,'-');
            var timestamp = new Date(inputVule2).getTime();
            var oneday='86400000';
            var addOneday=parseInt(timestamp)+parseInt(oneday);
            var addOneday2=Utility.unixToDate2(addOneday);
            getHistoryOrder(inputVule1,addOneday2);
        }
    );

    //定义对账单方法
    function getStatement(start,end) {
        trade.getUserRelatedOp({
                opcode: 110,
                start_time: start,
                end_time: end,
                gid: holdings_gid
            },
            function () {
                $(".statement table tbody").html("<tr><td colspan='10' style='padding: 50px 0 40px 0;'><i class='fa fa-refresh fa-spin'></i>&nbsp;加载中...</td></tr>");
            },
            function (resultdata) {
                if (resultdata.status == 0) {
                    var statement_html = [];
                    var list = resultdata.statement_list;
                    if(list.length>0){
                        for (var i = list.length-1; i>=0; i--) {
                            statement_html.push('<tr>');
                            //股票代码
                            statement_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code + '&uid=' + uid + '&token=token" target="_blank">' + list[i].name + '(' + list[i].code + ')' + '</a></td>');
                            statement_html.push('<td>' + Utility.unixToDate4(list[i].deal_time*1000) + '</td>');
                            if (list[i].order_operation) { //0买，1卖)
                                statement_html.push('<td>卖出</td>');
                                statement_html.push('<td>' + list[i].order_price.toFixed(3) + '</td>');
                                statement_html.push('<td>' + list[i].order_nums + '</td>');
                                statement_html.push('<td>' + list[i].commission.toFixed(2) + '</td>');
                                statement_html.push('<td>' + list[i].stamp_duty.toFixed(2) + '</td>');
                                statement_html.push('<td>' + list[i].transfer_fee.toFixed(2) + '</td>');
                                statement_html.push('<td>' +list[i].amount + '</td>');
                                statement_html.push('<td>' + list[i].available_capital + '</td>');
                                statement_html.push('</tr>');


                            } else {
                                statement_html.push('<td>买入</td>');
                                statement_html.push('<td>' + list[i].order_price.toFixed(3) + '</td>');
                                statement_html.push('<td>' + list[i].order_nums + '</td>');
                                statement_html.push('<td>' + list[i].commission.toFixed(2) + '</td>');
                                statement_html.push('<td>' + list[i].stamp_duty.toFixed(2)+ '</td>');
                                statement_html.push('<td>' + list[i].transfer_fee.toFixed(2) + '</td>');
                                statement_html.push('<td>' +'-'+list[i].amount + '</td>');
                                statement_html.push('<td>' + list[i].available_capital+ '</td>');
                                statement_html.push('</tr>');


                            }
                            // statement_html.push('<td>' + list[i].order_price.toFixed(3) + '</td>');
                            // statement_html.push('<td>' + list[i].order_nums + '</td>');
                            // statement_html.push('<td>' + list[i].commission + '</td>');
                            // statement_html.push('<td>' + list[i].stamp_duty + '</td>');
                            // statement_html.push('<td>' + list[i].transfer_fee + '</td>');
                            // statement_html.push('<td>' +list[i].amount + '</td>');
                            // statement_html.push('<td>' + list[i].available_capital + '</td>');
                            // statement_html.push('</tr>');
                        }
                    }
                    else {
                        statement_html.push("<tr><td colspan='10' style='padding: 50px 0 40px 0;'><i class='fa fa-exclamation-circle'></i>&nbsp;当前没有任何记录...</td></tr>")
                    }
                    $('.statement table tbody').html(statement_html.join(""));
                }

            });
    }
    //点击对账单查询
    $('body').on('click','.s-query',function () {
            var inputVule3=$('.sQuery2').val();
            var inputVule4=$('.eQuery2').val();
            inputVule4 = inputVule4.substring(0,10);
            inputVule4 = inputVule4.replace(/-/g,'-');
            var timestamp = new Date(inputVule4).getTime();
            var oneday='86400000';
            var addOneday=parseInt(timestamp)+parseInt(oneday);
            var addOneday4=Utility.unixToDate2(addOneday);
            getStatement(inputVule3,addOneday4);
        }
    );

    //调用大盘指数
    getRealIndex();
    // 获取子账户信息
    getGroupList();
    //调用环形盈亏收益分析
    getRoundEacharts();

    // getHoldingStock();

    // setInterval(function () {
    //     // 获取子账户信息
    //     getHoldingStock();
    //     // getGroupList();
    // }, 2000);

});