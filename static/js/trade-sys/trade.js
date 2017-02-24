"use strict";
$(function () {
    var open_price;
    $(function () {
        var thisHost = "http://" + window.location.host + "/";
        /**
         * 搜索框自动完成
         */
        $(".wk-head-search2").typeahead({
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
                "股票": {url: [thisHost + "ajax/trade/ajax_search.php?message={{query}},&type=1", "stock"]},
            },
            callback: {
                onClickAfter: function () {
                    var str = $('.wk-head-search2').val();
                    var code = str.substring(str.indexOf("(") + 1, str.indexOf(")"));
                    getAvailableBuyNum(code); //获取交易中可买股票的数量
                    getStockInfo('#buy', code);//获取右边股票信息与当前价
                    $('#buy .buy-wrong').hide().attr('data-wrong-type',-1);//错误消息不显示
                }
            }
        });
    });

    /*重置*/
    $('.trade-reset').click(function () {
        var this_s = $(this);
        this_s.parent().find('.trade-info li input').val('');
        this_s.parent().find('.trade-info li .num-scale  input').prop('checked', false);
        this_s.parent().find('.trade-info li>span').html('');
        this_s.parent().find('.trade-info li .buy-wrong').hide().attr('data-wrong-type',-1);
        this_s.parent().find('.trade-info li .buy-price,.trade-info li .buy-num').attr("readonly","readonly");
        this_s.parent().find('.trade-info li .num-scale input').attr("disabled",true);//单选按钮不可选
        //卖出的选择标签恢复默认
        this_s.parent().find('.trade-info .sale-stock-group option').eq(0).prop('selected', true);
        this_s.parent().find('.trade-info li .sale-stock').html('').append('<option value="-1">请选择</option>');
    });

    /*验证价格与数量是否符合条件 计算总金额*/
    $('.buy-price,.buy-num').change(function () {
        var this_ul=$(this).parent().parent();
        var num_stock = parseFloat(this_ul.find('li .now-num').html());//当前数量
        var buy_price = parseFloat(this_ul.find('li .buy-price').val()); //买入/卖出价格
        var buy_num = parseInt(this_ul.find('li .buy-num').val()); //买入/卖出数量
        //验证价格
        if(buy_price){
            var price_dot=buy_price.toString().split(".")[1];//价格后面的小数部分
            if (buy_price == 0 || buy_price < open_price - open_price * 0.1 || buy_price > open_price + open_price * 0.1) { //输入为0或者上下波动10%
                $(this).parent().find('.buy-wrong').show().attr('data-wrong-type',1);
            } else {
                if(price_dot && price_dot.length>2){
                    $(this).parent().find('.buy-wrong').show().attr('data-wrong-type',1);
                }else{
                    $(this).parent().find('.buy-wrong').hide().attr('data-wrong-type',-1);
                }
            }
        }else{
            $(this).parent().find('.buy-wrong').show().attr('data-wrong-type',1);
        }
        //验证数量
        if(buy_num && num_stock){
           if (buy_num == 0 || buy_num>num_stock || buy_num%100!=0) { //买入数量不能等于0不能大于总量，必须是100倍数
               this_ul.find('.num .buy-wrong').show().attr('data-wrong-type',1);
           } else {
               this_ul.find('.num .buy-wrong').hide().attr('data-wrong-type',-1);
           }
        }else{
           this_ul.find('.num .buy-wrong').show().attr('data-wrong-type',1);
        }
        this_ul.find('.buy-total').html((buy_price.toFixed(2))*buy_num);
    });

    /*点选比例改变数量*/
    $('.num-scale input').click(function(){
        var this_ul=$(this).parent().parent().parent();
        var scale=parseFloat($(this).attr('data-scale'));
        // var buy_price=parseFloat(this_ul.find('li .buy-price').val());
        var now_num=parseFloat(this_ul.find('li .now-num').html());
        this_ul.find('li .buy-num').val(now_num * scale);
        $(this).parent().parent().find('.buy-num').trigger('change');//验证数量
    });

    /*买入下单*/
    $('.trade-btn').click(function(selector){
        var price=$(this).parent().find('ul li .buy-price');
        var num=$(this).parent().find('ul li .buy-num');
        var stop_price=$(this).parent().find('ul li .stop-price');
    });

    /*获取买5卖5个股基本信息，当前价、开盘价*/
    function getStockInfo(selector,stock_code){
        trade.getStockInfo({code:stock_code},null,function(resultdata){
            console.log(resultdata);
            if(resultdata.status==1){
                var now_price=resultdata.real_info.now_price;
                var buy=resultdata.buy;
                var sell=resultdata.sell;
                var real_info=resultdata.real_info;
                var trade_num=$(selector+' .buy-num').val();//输入买/卖股票的数量
                open_price=real_info.open_price;
                //右边买卖股票信息
                for(var i=0;i<5;i++){
                    $(selector+' .table2 tr').eq(i).find('td').eq(1).html(sell[i].price).addClass(Utility.getPriceColor(sell[i].price-now_price));
                    $(selector+' .table2 tr').eq(i).find('td').eq(2).html(sell[i].amount);
                    $(selector+' .table2 tr').eq(6+i).find('td').eq(1).html(buy[i].price).addClass(Utility.getPriceColor(buy[i].price-now_price));;
                    $(selector+' .table2 tr').eq(6+i).find('td').eq(2).html(buy[i].amount);
                }
                $(selector+' .table2 tr').eq(5).find('td').eq(1).html(now_price).addClass(Utility.getPriceColor(now_price - real_info.yesterday_close_price));//当前价
                $(selector+' .table1 tr').eq(0).find('td span').html(real_info.now_price).addClass(Utility.getPriceColor(real_info.now_price - now_price));
                $(selector+' .table1 tr').eq(1).find('td span').html(real_info.open_price).addClass(Utility.getPriceColor(real_info.open_price - now_price));
                $(selector+' .table1 tr').eq(2).find('td span').html(real_info.yesterday_close_price);
                $(selector+' .table1 tr').eq(3).find('td span').html(real_info.high_price).addClass(Utility.getPriceColor(real_info.high_price - now_price));
                $(selector+' .table1 tr').eq(4).find('td span').html(real_info.low_price).addClass(Utility.getPriceColor(real_info.low_price - now_price));
                $(selector+' .table1 tr').eq(5).find('td span').html(real_info.limit_up).addClass(Utility.getPriceColor(real_info.limit_up - now_price));
                $(selector+' .table1 tr').eq(6).find('td span').html(real_info.limit_down).addClass(Utility.getPriceColor(real_info.limit_down - now_price));
                $(selector+' .table1 tr').eq(7).find('td span').html(real_info.turnover_rate+'%');
                $(selector+' .table1 tr').eq(8).find('td span').html(real_info.amount);
    
                $(selector+' .now-price').html(real_info.now_price);
                $(selector+' .buy-price').val(real_info.now_price);
                $(selector+' .buy-total').html(real_info.now_price*trade_num);
                $(selector+' .right-infos').show();
                $(selector+' .buy-price').removeAttr('readonly');//价格可改
            }
        });

    }

    //获取用户的组合
    function getUserGroup() {
        trade.getUserRelatedOp({opcode:104},null,function(resultdata){
            if(resultdata.status==0){
                var group_html=[];
                var list=resultdata.group_list;
                for(var i=0;i<list.length;i++){
                    group_html.push('<option value ="'+list[i].id+'">'+list[i].name+'</option>');
                }
                $('#sale .sale-stock-group').append(group_html.join(""));
            }
        });
    };

    /*一级下拉框 获取组合下面的持仓股票信息*/
    $('.sale-stock-group').change(function(){
        var gid=$(this).find("option:selected").val();
        if(gid !=='-1'){
            var html=[];
            trade.getUserRelatedOp({gid: gid,opcode:112},null,function(resultdata){
                if(resultdata.status==0){
                    var list=resultdata.stock_list;
                    html.push('<option value="-1">请选择</option>');
                    for(var i=0;i<list.length;i++){
                        html.push('<option value ="'+list[i].code+'" data-name="'+list[i].name+'" data-num="'+list[i].holding+'">'+list[i].name+'('+list[i].code+')'+'</option>');
                    }
                    $('#sale .sale-stock').html(html.join(""));
                }
            });
        }else{
            var html=[];
            html.push('<option value="-1">请选择</option>');
            $('#sale .sale-stock').html(html.join(""));
        }
    });

    /*二级下拉框 选择需要卖出的股票*/
    $('.sale-stock').change(function(){
        var this_op=$(this).find("option:selected");
        var code=this_op.val();
        var name=this_op.attr('data-name');
        var price=this_op.attr('data-price');
        var num=this_op.attr('data-num');
        if(code !== "0"){
            $('#sale .buy-num').removeAttr('readonly');//可修改卖出的数量
            $('#sale .num-scale input').eq(0).prop('checked',true);//数量默认选中全部
            $('#sale .trade-info li .num-scale input').removeAttr("disabled");//数量可选
            $('#sale .stock-name').html(name);
            $('#sale .stock-code').html(code+',');
            $('#sale .now-num').html(num);
            $('#sale .buy-num').val(num);
            // $('#sale .right-infos').show();
            getStockInfo('#sale',code);//获取右边的股票信息与当前价格
        }
        $('#sale .buy-wrong').hide().attr('data-wrong-type',-1);//错误消息不显示
    });

    /*进行买入/卖出交易*/
    $('.trade-btn').click(function(){
        var trade_type=$(this).attr('data-type');//0：买，1：卖
        var stock_code=$(this).parent().find('.stock-code').html();
        var buy_price=$(this).parent().find('li .buy-price').val();//委托价格
        var expected_price=$(this).parent().find('.stop-price input').val();//止损价格
        var buy_num=$(this).parent().find('li .buy-num').val();//委托数量
        var price_wrong=$(this).parent().find('.price .buy-wrong').attr('data-wrong-type');//委托价格验证 -1没有错误 1有错误
        var num_wrong=$(this).parent().find('.num .buy-wrong').attr('data-wrong-type');//委托数量验证 -1没有错误 1有错误
        if(trade_type=="0"){ //买
            var gid=$(this).attr('data-buy-gid');//默认0 当前持仓
        }else{ //卖
            var gid=$('#sale .sale-stock-group option:selected').val();
        }
        if(expected_price){
            if(!(expected_price.split(".")[1])){//如果是整数 拼接小数
                expected_price=expected_price+'.00';
            }
        }else{ //买入时候用户未输入止损价格或者是卖出
            expected_price='0.00';
        }
        if(buy_price && !(buy_price.split(".")[1])){ //如果是整数 拼接小数
            buy_price=buy_price+'.00';
        }
        if(!buy_price || !buy_num){
            swal({title: "输入信息不完整，请补全信息", type: "warning", timer: 1200, showConfirmButton: false});
            return false;
        }
        if(price_wrong=='-1' && num_wrong=='-1') {
            trade.getUserRelatedOp({
                    opcode: 111,
                    gid: gid,
                    code: stock_code,
                    order_price: buy_price,
                    expected_price: expected_price,
                    order_nums: buy_num,
                    order_operation: trade_type
                }, null,
                function (resultData) {
                    if (resultData.status == 0) {
                        swal({title: "下单成功！", type: "success", timer: 1200, showConfirmButton: false});
                        todayOrders();//更新当日委托
                    } else {
                        swal({title: "下单失败！", type: "error", timer: 1200, showConfirmButton: false});
                    }
                });
        }else{
            swal({title: "输入信息有误，请重新输入", type: "warning", timer: 1200, showConfirmButton: false});
        }
    });

    /*撤单*/
    $('body').on("click", ".call-back", function () {
        var order_id=$(this).attr('data-order-id');
        trade.getUserRelatedOp({opcode:114,order_id:order_id},null,function(resultData){
            if(resultData.status==0){
                swal({title: "撤单成功！", type: "success", timer: 1200, showConfirmButton: false});
                todayOrders();
            }else{
                swal({title: "撤单失败！", type: "error", timer: 1200, showConfirmButton: false});
            }
        });
    });

    //当日委托
    function todayOrders() {
        trade.getUserRelatedOp({opcode:107},function () {
             $(".day_orders table tbody").append("<tr><td colspan='8'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</td></tr>");
            },function(resultdata){
                if(resultdata.status==0) {
                    var order_html = [];
                    var list = resultdata.order_list;
                    if(list.length !==0) {
                        for (var i = 0; i < list.length; i++) {
                            order_html.push('<tr>');
                            order_html.push('<td>' + (i + 1) + '</td>');
                            order_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code + '&uid=' + uid + '&token=token" target="_blank">' + list[i].name + '(' + list[i].code + ')' + '</a></td>');
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
                            order_html.push('<td class="call-back" data-order-id="' + list[i].id + '">撤销</td>');
                            order_html.push('</tr>');
                        }
                    }else{
                        order_html.push('<tr><td colspan="8">暂无数据</td></tr>');
                    }
                    $('.day_orders table tbody').html(order_html.join(""));
                }
        });
    };

    /*获取交易中可买股票的数量*/
    function getAvailableBuyNum(code){
        trade.getUserRelatedOp({code: code,opcode:113}, null, function (resultdata) {
            if(resultdata.status==0){
                $('#buy .stock-name').html(resultdata.name);
                $('#buy .stock-code').html(resultdata.code);
                $('#buy .now-num').html(resultdata.count);
                $('#buy .buy-num').val(resultdata.count);
                $('#buy .right-infos').show();
                $('#buy .trade-info li .num-scale input').attr("disabled",false);//数量可选
                $('#buy .num-scale input').eq(0).prop('checked',true);//数量默认选中全部
                $('#buy .num-scale input').removeAttr('readonly');//数量可改
            }
        });
    };

    getUserGroup();
    todayOrders();

});

