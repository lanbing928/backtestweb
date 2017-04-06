"use strict";
$(function () {
    var buy1_price;
    var sale1_price;
    var limit_up;
    var limit_down
    var isFistLoad=0;//0时第一次
    var thisHost = "http://" + window.location.host + "/";
    /**
     * 搜索框自动完成
     */
    $(".wk-trade-search").typeahead({
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
                var str = $('.wk-trade-search').val();
                var code = str.substring(str.indexOf("(") + 1, str.indexOf(")"));
                var gid=$('#buy .trade-info .user-group option:selected').val();//组合id
                if (gid == -1) {
                    swal({title: "请先选择账户名", type: "warning", timer: 1200, showConfirmButton: false});
                    $('#buy .wk-trade-search').val('');
                    return false;
                }
                getAvailableBuyNum(code); //获取交易中可买股票的数量
                getStockInfo('#buy', code);//获取右边股票信息与当前价
                $('#buy .buy-wrong').hide().attr('data-wrong-type',-1);//错误消息不显示
                $('#buy .user-group').on('change',function(){ //点击账户列表，资金，可买，总资产联动
                    getAvailableBuyNum(code);
                });
            }
        }
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
        this_s.parent().find('.trade-info .user-group option').eq(0).prop('selected', true);
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
            if (buy_price == 0 || buy_price < limit_down || buy_price > limit_up) { //输入为0或者上下波动10%
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

        //验证比例是是否可选
        this_ul.find('.num-scale input').attr("disabled",true);
        if(num_stock >= 100 && num_stock<200){
            this_ul.find('.num-scale input:nth-child(1)').attr("disabled",false);//第一个比例可选
        }else if(num_stock >=200 && num_stock < 300){
            this_ul.find('.num-scale input:nth-child(1),.num-scale input:nth-child(2)').attr("disabled",false);//全部，1/2比例可选
        }else if(num_stock >=300 && num_stock < 400){
            this_ul.find('.num-scale input:nth-child(1),num-scale input:nth-child(2),.num-scale input:nth-child(3)').attr("disabled",false);//全部，1/2，1/3比例可选
        }else if(num_stock >=400 && num_stock < 500){
            this_ul.find('.num-scale input:nth-child(1),.num-scale input:nth-child(2),.num-scale input:nth-child(3),.num-scale input:nth-child(4)').attr("disabled",false);//全部，1/2，1/3,1/4比例可选
        }else if(num_stock >= 500){
            this_ul.find('.num-scale input').attr("disabled",false);//所有比例可选
        }
        if(!buy_price || !buy_num){
            this_ul.find('.buy-total').html('');
        }else{
            this_ul.find('.buy-total').html((buy_price*buy_num).toFixed(2));
        }
    });

    /*点选比例改变数量*/
    $('.num-scale input').click(function(){
        var this_ul=$(this).parent().parent().parent();
        var scale=parseFloat($(this).attr('data-scale'));//比例
        if(scale==0.33){scale=1/3}
        var now_num=parseFloat(this_ul.find('li .now-num').html());
        var last_two_num=parseInt(now_num * scale).toString().slice(-2);//当前价格最后两位
        // var cha=100-Number(last_two_num);
        if(scale==1 || (now_num*scale)%100==0){
            now_num=parseInt(now_num*scale);
        }else{
            now_num=parseInt(now_num*scale)-Number(last_two_num);
        }
        this_ul.find('li .buy-num').val(now_num);
        $(this).parent().parent().find('.buy-num').trigger('change');//验证数量
    });

    //获取账户
    function getUserGroup() {
        trade.getUserRelatedOp({opcode:104},null,function(resultdata){
            if(resultdata.status==0){
                var group_html=[];
                var list=resultdata.group_list;
                for(var i=0;i<list.length;i++){
                    group_html.push('<option value ="'+list[i].id+'">'+list[i].name+'</option>');
                }
                $('.user-group').append(group_html.join(""));

                //处理其他页面买卖跳转过来的交易
                var url_code=Utility.getUrlParam('code');
                var url_gid=Utility.getUrlParam('gid');
                var url_name=Utility.getUrlParam('name');
                var url_type=Utility.getUrlParam('type'); //1 买 2卖
                if(url_code){ //由其他页面的买入跳转过来
                    if(url_type){ //我的账户 卖跳转过来的
                        $('#trade .nav li:nth-child(1)').removeClass('active').find('a').attr('aria-expanded','false');
                        $('#trade .nav li:nth-child(2)').addClass('active').find('a').attr('aria-expanded','true');
                        $('#trade .tab-content #buy').removeClass('active');
                        $('#trade .tab-content #sale').addClass('active');
                        $('#sale .user-group option').each(function(){  //默认选中组合名
                            if($(this).attr('value')==url_gid){
                                $(this).prop('selected',true).siblings().prop('selected',false);
                                $('#sale .sale-stock-group').trigger('change',[url_code]);//获取组合下股票信息并把点击的股票代码传给change事件

                            }
                        });
                    }else{ //我的关注与我的账户  买跳转过来的
                        $('#buy .wk-trade-search').val(url_name+'('+url_code+')');
                        getStockInfo('#buy', url_code);//获取右边股票信息与当前价
                        $('#buy .buy-wrong').hide().attr('data-wrong-type',-1);//错误消息不显示
                        $('#buy .user-group').on('change',function(){
                            getAvailableBuyNum(url_code);
                        });
                        if(url_gid){ //由我的账户买卖跳转
                            $('#buy .user-group option').each(function(){  //默认选中组合名
                                if($(this).attr('value')==url_gid){
                                    $(this).prop('selected',true).siblings().prop('selected',false);
                                    getAvailableBuyNum(url_code);
                                }
                            });
                        }
                    };
                };
            }
        });
    };

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
                buy1_price=buy[0];
                sale1_price=sell[0];
                limit_up=real_info.limit_up.toFixed(2);
                limit_down=real_info.limit_down.toFixed(2);
                //右边买卖股票信息
                for(var i=0;i<5;i++){
                    $(selector+' .table2 tr').eq(i).find('td').eq(1).html(sell[4-i].price.toFixed(2)).addClass(Utility.getPriceColor(sell[4-i].price-now_price));
                    $(selector+' .table2 tr').eq(i).find('td').eq(2).html(parseInt(sell[4-i].vol));
                    $(selector+' .table2 tr').eq(6+i).find('td').eq(1).html(buy[i].price.toFixed(2)).addClass(Utility.getPriceColor(buy[i].price-now_price));
                    $(selector+' .table2 tr').eq(6+i).find('td').eq(2).html(parseInt(buy[i].vol));
                }
                $(selector+' .table2 tr').eq(5).find('td').eq(1).html(now_price.toFixed(2)).addClass(Utility.getPriceColor(now_price - real_info.yesterday_close_price));//当前价
                $(selector+' .table1 tr').eq(0).find('td span').html(real_info.now_price.toFixed(2)).addClass(Utility.getPriceColor(real_info.now_price - now_price));
                $(selector+' .table1 tr').eq(1).find('td span').html(real_info.open_price.toFixed(2)).addClass(Utility.getPriceColor(real_info.open_price - now_price));
                $(selector+' .table1 tr').eq(2).find('td span').html(real_info.yesterday_close_price.toFixed(2));
                $(selector+' .table1 tr').eq(3).find('td span').html(real_info.high_price.toFixed(2)).addClass(Utility.getPriceColor(real_info.high_price - now_price));
                $(selector+' .table1 tr').eq(4).find('td span').html(real_info.low_price.toFixed(2)).addClass(Utility.getPriceColor(real_info.low_price - now_price));
                $(selector+' .table1 tr').eq(5).find('td span').html(real_info.limit_up.toFixed(2)).addClass(Utility.getPriceColor(real_info.limit_up - now_price));
                $(selector+' .table1 tr').eq(6).find('td span').html(real_info.limit_down.toFixed(2)).addClass(Utility.getPriceColor(real_info.limit_down - now_price));
                if(real_info.turnover_rate>1){
                    $(selector+' .table1 tr').eq(7).find('td span').html('--');
                }else{
                    $(selector+' .table1 tr').eq(7).find('td span').html((real_info.turnover_rate*100).toFixed(2)+'%');
                }
                $(selector+' .table1 tr').eq(8).find('td span').html(parseInt(real_info.vol));
    
                $(selector+' .now-price').html((real_info.now_price).toFixed(2));
                //设置交易的默认买卖价格
                if(selector=="#buy"){ //买入时候 买入价格默认卖1
                    $(selector+' .buy-price').val((sell[0].price).toFixed(2));
                    $(selector+' .buy-total').html((sell[0].price*trade_num).toFixed(2));
                }else if(selector=="#sale"){ //卖出时候  卖出价默认买1
                    $(selector+' .buy-price').val((buy[0].price).toFixed(2));
                    $(selector+' .buy-total').html((buy[0].price*trade_num).toFixed(2));
                }

                $(selector+' .right-infos').show();
                $(selector+' .buy-price').removeAttr('readonly');//价格可改
            }
        });

    }


    /*卖出 一级下拉框 获取当前可卖，股票名称代码等信息*/
    $('.sale-stock-group').change(function(event, param1){
        var gid=$(this).find("option:selected").val();
        var url_code=Utility.getUrlParam('code'); //url code
        if(gid !=='-1'){
            var html=[];
            trade.getUserRelatedOp({gid: gid,opcode:112},null,function(resultdata){
                if(resultdata.status==0){
                    var list=resultdata.stock_list;
                    html.push('<option value="-1">请选择</option>');
                    for(var i=0;i<list.length;i++){
                        html.push('<option value ="'+list[i].code+'" data-name="'+list[i].name+'" data-num="'+list[i].available+'">'+list[i].name+'('+list[i].code+')'+'</option>');
                    }
                    $('#sale .sale-stock').html(html.join(""));

                    //由我的账户卖出跳转过来，默认选中股票
                    $('#sale .sale-stock option').each(function(){
                        if($(this).attr("value")==url_code){
                            $(this).prop('selected',true).siblings().prop('selected',false);
                            $('#sale .sale-stock').trigger('change');//获取组合下股票信息 触发change事件
                        }
                    })
                }
            });

        }
    });

    /*卖出 二级下拉框 选择需要卖出的股票*/
    $('.sale-stock').change(function(){
        var this_op=$(this).find("option:selected");
        var code=this_op.val();
        var name=this_op.attr('data-name');
        var price=this_op.attr('data-price');
        var num=this_op.attr('data-num');
        if(code !== "0"){
            $('#sale .buy-num').removeAttr('readonly');//可修改卖出的数量
            $('#sale .num-scale input').eq(0).prop('checked',true);//数量默认选中全部
            $('#sale .stock-name').html(name);
            $('#sale .stock-code').html(code);
            $('#sale .now-num').html(num);
            $('#sale .buy-num').val(num);
            // $('#sale .right-infos').show();
            getStockInfo('#sale',code);//获取右边的股票信息与当前价格
            if(num >= 100 && num<200){
                $('#sale .num-scale input:nth-child(1)').attr("disabled",false);//第一个比例可选
            }else if(num >=200 && num < 300){
                $('#sale .num-scale input:nth-child(1),#sale .num-scale input:nth-child(2)').attr("disabled",false);//全部，1/2比例可选
            }else if(num >=300 && num < 400){
                $('#sale .num-scale input:nth-child(1),#sale .num-scale input:nth-child(2),#sale .num-scale input:nth-child(3)').attr("disabled",false);//全部，1/2，1/3比例可选
            }else if(num >=400 && num < 500){
                $('#sale .num-scale input:nth-child(1),#sale .num-scale input:nth-child(2),#sale .num-scale input:nth-child(3),#sale .num-scale input:nth-child(4)').attr("disabled",false);//全部，1/2，1/3,1/4比例可选
            }else if(num>= 500){
                $('#sale .num-scale input').attr("disabled",false);//所有比例可选
            }
        }
        $('#sale .buy-wrong').hide().attr('data-wrong-type',-1);//错误消息不显示
    });

    /*进行买入/卖出交易*/
    $('.trade-btn').click(function(){
        var trade_type=$(this).attr('data-type');//0：买，1：卖
        var gid=$(this).parent().find('.trade-info .user-group option:selected').val();//组合id
        var gname=$(this).parent().find('.stock-name').html();
        var stock_code=$(this).parent().find('.stock-code').html();
        var buy_price=Number($(this).parent().find('li .buy-price').val()).toFixed(2);//委托价格
        var expected_price=Number($(this).parent().find('.stop-price input').val()).toFixed(2);//止损价格
        var buy_num=$(this).parent().find('li .buy-num').val();//委托数量
        var price_wrong=$(this).parent().find('.price .buy-wrong').attr('data-wrong-type');//委托价格验证 -1没有错误 1有错误
        var num_wrong=$(this).parent().find('.num .buy-wrong').attr('data-wrong-type');//委托数量验证 -1没有错误 1有错误
        if(expected_price=="NaN"){
            expected_price='0.00';
        }
        if (gid == -1) {
            swal({title: "请选择账户名", type: "warning", timer: 1200, showConfirmButton: false});
            return false;
        }
        if(buy_price*buy_num==0){ //买卖金额
            swal({title: "交易总金额不可以为0！", type: "warning", timer: 1200, showConfirmButton: false});
            return false;
        }
        if(!buy_price || !buy_num){
            swal({title: "输入信息不正确，请补全信息", type: "warning", timer: 1200, showConfirmButton: false});
            return false;
        }
        if(price_wrong=='-1' && num_wrong=='-1') {
            var trade_word='';
            if(trade_type==0){trade_word="买入"}else if(trade_type==1){trade_word="卖出"}
            swal({
                title: "委托"+trade_word,
                text: "确定以"+buy_price+"的价格"+trade_word+buy_num+"股 "+gname+"("+stock_code+")?",
                type: "info",
                html: true,
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                animation: "slide-from-top",
            }, function () {
                trade.getUserRelatedOp({
                        opcode: 111,
                        gid: gid,
                        code: stock_code+",",
                        order_price: buy_price,
                        expected_price: expected_price,
                        order_nums: buy_num,
                        order_operation: trade_type
                    }, null,
                    function (resultData) {
                        if (resultData.status == 0 || resultData.status == 24 ||resultData.status == 25) {
                            if(trade_type==0){
                                swal({title: resultData.msg, type: "success", timer: 1200, showConfirmButton: false});
                                // swal({title: "委托买入成功！", type: "success", timer: 1200, showConfirmButton: false});
                                // getAvailableBuyNum(stock_code);//更新可买数量与可用资金
                                $('#buy .now-num').html(resultData.canbuy_num);
                                $('#buy .available-capital').html(resultData.available_capital);
                            }else if(trade_type==1){
                                // swal({title: "委托卖出成功！", type: "success", timer: 1200, showConfirmButton: false});
                                swal({title: resultData.msg, type: "success", timer: 1200, showConfirmButton: false});
                                //更新可买卖数量
                                $('#sale .now-num').html(resultData.cansell_num);
                            }
                            Utility.setCookie('last_gid',gid);//交易成功之后设置gid进入缓存
                            todayOrders();//更新当日委托
                        } else {
                            swal({title: resultData.msg, type: "error", timer: 1200, showConfirmButton: false});
                        }
                    });
            });

        }else{
            swal({title: "输入信息有误，请重新输入", type: "warning", timer: 1200, showConfirmButton: false});
        }
    });
    //获取交易里 当日委托(用户全部委托)
    function todayOrders() {
        trade.getUserRelatedOp({opcode:107,gid:0},function () {
            if(isFistLoad==0){
                $(".day_orders table tbody").html("<tr><td colspan='9'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</td></tr>");
            }
        },function(resultdata){
            if(resultdata.status==0) {
                var order_html = [];
                var list = resultdata.order_list;
                if(list.length !==0) {
                    for (var i = 0; i < list.length; i++) {
                        order_html.push('<tr>');
                        order_html.push('<td>' + (i + 1) + '</td>');
                        order_html.push('<td>' + list[i].group_name + '</td>');
                        order_html.push('<td><a href="http://stock.iwookong.com/ajax/login/nologin.php?stock=' + list[i].code + '&uid=' + uid + '&token=token" target="_blank">' + list[i].name + '(' + list[i].code + ')' + '</a></td>');
                        if (list[i].order_operation) { //0买，1卖)
                            order_html.push('<td>卖出</td>');
                        } else {
                            order_html.push('<td>买入</td>');
                        }
                        order_html.push('<td>' + list[i].order_price.toFixed(2) + '</td>');
                        order_html.push('<td>' + list[i].order_nums + '</td>');
                        order_html.push('<td>' + Utility.unixToDate4(list[i].order_time*1000) + '</td>');
                        if (list[i].status == 1) {  //0 未成交，1已成交, 2已撤销
                            order_html.push('<td>已成交</td>');
                            order_html.push('<td>--</td>');
                        } else if(list[i].status == 0) {
                            order_html.push('<td>未成交</td>');
                            order_html.push('<td class="call-back" data-order-id="' + list[i].id + '" data-gid="' + list[i].group_id + '">撤销</td>');
                        }else if(list[i].status == 2){
                            order_html.push('<td>已撤销</td>');
                            order_html.push('<td>--</td>');
                        }
                        order_html.push('</tr>');
                    }
                }else{
                    order_html.push('<tr><td colspan="8">暂无数据</td></tr>');
                }
                $('.day_orders table tbody').html(order_html.join(""));
                isFistLoad++;
            }
        });
    };


    /*撤单*/
    $('body').on("click", "#trade .call-back", function () {
        var order_id=$(this).attr('data-order-id');
        var gid=$(this).attr('data-gid');
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
            trade.getUserRelatedOp({opcode: 114, order_id: order_id, gid: gid}, null, function (resultData) {
                if (resultData.status == 0) {
                    swal({title: "撤单成功！", type: "success", timer: 1200, showConfirmButton: false});
                    todayOrders();
                } else {
                    swal({title: "撤单失败！", type: "error", timer: 1200, showConfirmButton: false});
                }
            });
        });
    });

    /*获取交易中 股票代码，股票名称，最大可买,可用资金*/
    function getAvailableBuyNum(code){
        var gid=$('#buy .trade-info .user-group option:selected').val();//组合id
        var url_gid=Utility.getUrlParam('gid');//url连接上的gid参数 由其他页面买入跳转过来
        var url_price=Utility.getUrlParam('price');//url 链接上参数
        var gprice=$('#buy .buy-price').val();//修改账户名时 价格已存在
        if(url_gid){gid=url_gid};
        trade.getUserRelatedOp({opcode:113,code: code, gid:gid}, null, function (resultdata) {
            if(resultdata.status==0){
                $('#buy .stock-name').html(resultdata.name);
                $('#buy .stock-code').html(resultdata.code);
                $('#buy .now-num').html(resultdata.count);
                $('#buy .buy-num').val(resultdata.count);
                $('#buy .available-capital').html(resultdata.available_capital);
                $('#buy .right-infos').show();
                $('#buy .num-scale input').eq(0).prop('checked',true);//数量默认选中全部
                if(gprice){  //多次选择账户时更新总金额
                    $('#buy .buy-total').html((gprice*resultdata.count).toFixed(2));
                }else{
                    if(url_price){//如果是从关注与我的账户页面的买跳转过来
                        $('#buy .buy-total').html((url_price*resultdata.count).toFixed(2));
                    }
                }
                $('#buy .num-scale input').attr("disabled",true);
               if(resultdata.count >= 100 && resultdata.count<200){
                   $('#buy .num-scale input:nth-child(1)').attr("disabled",false);//第一个比例可选
               }else if(resultdata.count >=200 && resultdata.count < 300){
                   $('#buy .num-scale input:nth-child(1),#buy .num-scale input:nth-child(2)').attr("disabled",false);//全部，1/2比例可选
               }else if(resultdata.count >=300 && resultdata.count < 400){
                   $('#buy .num-scale input:nth-child(1),#buy .num-scale input:nth-child(2),#buy .num-scale input:nth-child(3)').attr("disabled",false);//全部，1/2，1/3比例可选
               }else if(resultdata.count >=400 && resultdata.count < 500){
                   $('#buy .num-scale input:nth-child(1),#buy .num-scale input:nth-child(2),#buy .num-scale input:nth-child(3),#buy .num-scale input:nth-child(4)').attr("disabled",false);//全部，1/2，1/3,1/4比例可选
               }else if(resultdata.count >= 500){
                   $('#buy .num-scale input').attr("disabled",false);//所有比例可选
               }
                if(resultdata.count != 0){
                    $('#buy .buy-num').removeAttr('readonly');//可修改输入数量
                };
            }
        });
    };

    function init_trade() {
        getUserGroup();
        todayOrders();
    }
    init_trade();
    // setInterval(function () {
    //     todayOrders();
    // }, 2000);

});

