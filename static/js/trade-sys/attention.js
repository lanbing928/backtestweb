"use strict";
$(function () {
    var thisHost = "http://" + window.location.host + "/";
    var attention_gid;//选中的账户id
    var stockData;//当前账户下所有股票数据
    /**
     * 搜索框自动完成
     */
    $(".wk-attention-search").typeahead({
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
                var str = $('.wk-attention-search').val();
                var code = str.substring(str.indexOf("(") + 1, str.indexOf(")"));
                //添加股票
                if(attention_gid && code){
                    trade.getUserRelatedOp({opcode:124,attention_id:attention_gid,code_list:code+','}, null, function (resultData) {
                        if (resultData.status == 0) {
                            $('.wk-attention-search').val('');
                            getStockList(attention_gid);
                        }
                    });
                }
            }
        }
    });

    /*获取关注*/
    function getGroupList(){
        trade.getUserRelatedOp({opcode: 123}, function(){
            $('.group-name-list').html('<li style="border:none"><i class="fa fa-refresh fa-spin"></i>&nbsp;加载中...</li>');
        }, function (resultData) {
            if (resultData.status == 0) {
                var groupHtml=[];
                if(resultData.attention_list.length>0){
                    for(var i=0;i<resultData.attention_list.length;i++){
                        if(i==0){
                            attention_gid=resultData.attention_list[0].id;//默认的账户id,gid
                            groupHtml.push('<li class="left gp-active" data-gid="'+resultData.attention_list[0].id+'">')
                        }else{
                            groupHtml.push('<li class="left" data-gid="'+resultData.attention_list[i].id+'">')
                        }
                        groupHtml.push('<span>'+resultData.attention_list[i].name+'</span>&nbsp;');
                        groupHtml.push('<span class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-chevron-down"></i></span>');
                        groupHtml.push('<ul class="dropdown-menu" data-group-name="'+resultData.attention_list[i].name+'" data-group-id="'+resultData.attention_list[i].id+'"><li class="change-name"><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li><li class="del-group"><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li></ul>');
                        groupHtml.push('</li>');
                    }
                }
                groupHtml.push('<li class="left add-group trade-add-group" data-gid="-1">自定义<i class="fa fa-plus"></i></li>');
                groupHtml.push('<div class="clear"></div>');
                $('.group-name-list').html(groupHtml.join(""));
                if(attention_gid){
                    clickGroupList();//点击账户切换不同的股票信息
                    getStockList(attention_gid);//组合下股票列表
                    changeGroupName();//改变组合名
                    delGroupName();//删除组合
                }else{
                    $('.group-stock-list table tbody').html('<tr><td colspan="10">暂无组合相关的股票信息</td></tr>');
                }
            }
        });
    }

    /*建立关注*/
    $("body").on("click", "#attention .add-group", function () {
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
            trade.getUserRelatedOp({opcode: 120, attention_name: encodeURIComponent(inputValue+','),code_list:','}, null, function (resultData) {

                if (resultData.status==0) {
                    swal({
                        title: "",
                        text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>账户成功",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                    getGroupList();//我的关注中账户列表
                } else {
                    swal({
                        title: "",
                        text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>账户异常," + resultData.msg + "",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        });
    });

    /*点击账户切换账户的股票信息*/
    function clickGroupList(){
        $('#attention .group-name-list >li').on('click',function(){
            $(this).not('.add-group').addClass('gp-active').siblings().removeClass('gp-active');
            var tmp_gid=$(this).attr('data-gid');
            if(tmp_gid!=-1){
                attention_gid=tmp_gid;
                getStockList(tmp_gid);
            }
        });
    };

    /*获取关注下的股票列表*/
    function getStockList(){
        trade.getUserRelatedOp({opcode: 126,attention_id:attention_gid},
            function(){
                $('.group-stock-list table tbody').html('<tr><td colspan="10"><i class="fa fa-refresh fa-spin"></i>&nbsp;加载中...</td></tr>');
            }
            , function (resultData) {
            if (resultData.status == 0) {
                var stockHtml=[];
                var list=resultData.stock_list;
                stockData=resultData.stock_list;
                if(list.length>0){
                    for(var i=0;i<list.length;i++){
                      stockHtml.push('<tr>');
                      stockHtml.push('<td>'+(i+1)+'</td>');
                      stockHtml.push('<td><input type="checkbox" class="left"><span class="left">'+list[i].code+'</span></td>');
                      stockHtml.push('<td>'+list[i].name+'</td>');
                      stockHtml.push('<td>'+list[i].visit_heat+'</td>');
                      stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].price.toFixed(2)+'</td>');
                      stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].change.toFixed(2)+'%'+Utility.getHotUpDown(list[i].change)+'</td>');
                      stockHtml.push('<td>'+(list[i].volume/10000).toFixed(2)+'</td>');
                      stockHtml.push('<td>'+list[i].industry+'</td>');
                      stockHtml.push('<td>');
                      stockHtml.push('<a href="trade.php?name='+list[i].name+'&code='+list[i].code+'&price='+list[i].price.toFixed(2)+'"><img src="../static/imgs/trade/op_buy.png" class="one-stock-trade" data-trade-type="0"></a>&nbsp;');
                        // if(list[i].holding_num == 0){
                        //     stockHtml.push('&nbsp;--');
                        // }else{
                        //     stockHtml.push('<a><img src="../static/imgs/trade/op_sale.png" class="one-stock-trade" data-trade-type="1" data-holding-num="'+list[i].holding_num+'"></a>');
                        // }
                      stockHtml.push('</td>');
                      stockHtml.push('<td><i class="fa fa-minus-circle text-danger btn-del-stock" data-stock-code="'+list[i].code+'" data-stock-gid="'+attention_gid+'"></i></td>');
                      stockHtml.push('</tr>');
                    }
                }else{
                    stockHtml.push('<tr><td colspan="10">暂无关注的股票</td></tr>')
                }
                $('.group-stock-list table tbody').html(stockHtml.join(""));
                $('.bulk-trade-op').attr('data-capital',resultData.available_capital);
                delStock();
            }
        });
    };
    /*重构排序后股票列表*/
    function buildSortStockList(list) {
        if(list.length>0){
            var stockHtml=[];
            for(var i=0;i<list.length;i++){
                stockHtml.push('<tr>');
                stockHtml.push('<td>'+(i+1)+'</td>');
                stockHtml.push('<td><input type="checkbox" class="left"><span class="left">'+list[i].code+'</span></td>');
                stockHtml.push('<td>'+list[i].name+'</td>');
                stockHtml.push('<td>'+list[i].visit_heat+'</td>');
                stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].price.toFixed(2)+'</td>');
                stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].change.toFixed(2)+'%'+Utility.getHotUpDown(list[i].change)+'</td>');
                stockHtml.push('<td>'+(list[i].volume/10000).toFixed(2)+'</td>');
                stockHtml.push('<td>'+list[i].industry+'</td>');
                stockHtml.push('<td>');
                stockHtml.push('<a href="trade.php?name='+list[i].name+'&code='+list[i].code+'&price='+list[i].price.toFixed(2)+'"><img src="../static/imgs/trade/op_buy.png" class="one-stock-trade" data-trade-type="0"></a>&nbsp;');
                // if(list[i].holding_num == 0){
                //     stockHtml.push('&nbsp;--');
                // }else{
                //     stockHtml.push('<a><img src="../static/imgs/trade/op_sale.png" class="one-stock-trade" data-trade-type="1" data-holding-num="'+list[i].holding_num+'"></a>');
                // }
                stockHtml.push('</td>');
                stockHtml.push('<td><i class="fa fa-minus-circle text-danger btn-del-stock" data-stock-code="'+list[i].code+'" data-stock-gid="'+attention_gid+'"></i></td>');
                stockHtml.push('</tr>');
            }
            $('.group-stock-list table tbody').html(stockHtml.join(""));
        }
    }

    /*删除股票*/
    function delStock(){
        $(".group-stock-list table tr").hover(function(){
            var del_stock_name = $(this).find("td:nth-child(3)").html();
            $(this).find(".btn-del-stock").show().bind("click", function () {
                var del_stock = $(this).attr("data-stock-code");
                var del_group =$(this).attr("data-stock-gid");
                if(!del_stock){ //批量删除股票
                    var i=0;
                    del_group=attention_gid;
                    $(".group-stock-list tbody input[type='checkbox']:checked").each(function () { //获取股票列表
                        if(i==0){
                            del_stock=$(this).parent().find('span').html();
                        }else{
                            del_stock=del_stock+','+$(this).parent().find('span').html();
                        }
                        i++;
                    });
                }
                if(del_stock && del_group) {
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
                            trade.getUserRelatedOp({
                                opcode: 125,
                                code_list: del_stock+',',
                                attention_id: del_group
                            }, null, function (resultData) {
                                if (resultData.status == 0) {
                                    swal({
                                        title: "",
                                        text: "<span style='color:#F8BB86'>" + del_stock_name + "(" + del_stock + ")</span>已被删除",
                                        html: true,
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                    getStockList();
                                }
                            });
                        }
                    });
                }else if(!del_stock){
                    swal({title: "请选择需要批量删除的股票", type: "warning", timer: 1200, showConfirmButton: false});
                }
            });
        },function(){
            $(this).find(".btn-del-stock").hide();
        });

    }

    /*批量买卖*/
    $('.bulk-trade-btn').click(function() {
        var num = $(this).parent().find('.modal-trade-num input').val();//交易数量
        var code_list;
        var price_list;
        // var num_arr=[];
        var trade_type = $(this).attr('data-trade-type');//交易类型 0是买  1是卖
        var buy_money = 0;//所选股票买入需要的资金
        var available_capital = $('#attention .bulk-trade-op').attr('data-capital');//获取组合可用资金
        var i = 0;
        $(".group-stock-list tbody input[type='checkbox']:checked").each(function () { //获取股票代码与对应当前价格列表
            var tmp_code = $(this).parent().find('span').html();
            var tmp_price = $(this).parent().parent().find('td:nth-child(5)').html();
            var tmp_num = $(this).parent().parent().find('td:nth-child(9) img:nth-child(2)').attr('data-holding-num');
            if (i == 0) {
                code_list = tmp_code;
                price_list = tmp_price;
            } else {
                code_list = code_list + ',' + tmp_code;
                price_list = price_list + ',' + tmp_price;
            }
            // num_arr[i]=tmp_num;
            buy_money = buy_money + tmp_price * num;
            i++;
        });
        // var smallest_num=Math.min.apply(Math,num_arr);//所选股票中可买数量最小值
        // if(num > smallest_num){ //筛选 不可以输入大于可买数量的最小值
        //     swal({title: "", type: "warning", text: "大于最大可买数量：" + smallest_num, timer: 1200, showConfirmButton: false});
        //     return false;
        // }

        if (code_list && price_list && available_capital && Number(num) != 0) {
            if (trade_type == 0) { //买
                if (available_capital-buy_money<0) {
                    swal({title: "剩余可买资金不足！", type: "warning", timer: 1200, showConfirmButton: false});
                    return false;
                }
            }
            trade.getUserRelatedOp({
                    opcode:131,
                    gid: attention_gid,
                    code_list: code_list+',',
                    order_price: price_list+',',
                    expected_price: "0.00",
                    order_nums: num*100,
                    order_operation: trade_type
                }, null,
                function (resultData) {
                    if (resultData.fail_List.length == 0 && resultData.success_list.length != 0) {  //交易成功
                        if(trade_type==0){
                            swal({title: "买入成功！", type: "success", timer: 2000, showConfirmButton: false});
                        }else if(trade_type==1){
                            swal({title: "卖出成功！", type: "success", timer: 2000, showConfirmButton: false});
                        }
                        getStockList();//更新股票列表
                        // todayOrders();//更新交易里面的当日委托
                    }else{ //交易失败
                        var del_success='';//交易成功的股票
                        var del_fail=''; //交易失败的股票
                        for(var i=0;i<resultData.success_list.length;i++){ //拼接成功的股票
                            if(i==0){
                                del_success += resultData.success_list[i].name+'('+resultData.success_list[i].code+")";
                            }else{
                                del_success += ','+resultData.success_list[i].name+'('+resultData.success_list[i].code+")";
                            }
                        };
                        for(var i=0;i<resultData.fail_List.length;i++){  //拼接失败的股票
                            if(i==0){
                                del_fail += resultData.fail_List[i].name+'('+resultData.fail_List[i].code+")";
                            }else{
                                del_fail += ','+resultData.fail_List[i].name+'('+resultData.fail_List[i].code+")";
                            }
                        };
                        if(resultData.success_list.length == 0){ //全部失败
                            swal({
                                title: "",
                                text: "交易全部失败:<span style='color:#F8BB86'>" + del_fail + "</span>",
                                html: true,
                                // timer: 2500,
                                showConfirmButton: true
                            });
                        }else{  //部分成功部分失败
                            swal({
                                title: "",
                                text: "交易成功的股票：<span style='color:#F8BB86'>" + del_success + "</span>,交易失败:<span style='color:#F8BB86'>" + del_fail + "</span>",
                                html: true,
                                // timer: 2500,
                                showConfirmButton: true
                            });
                        }

                        getStockList();//更新股票列表
                    }
                });
            
        } else if (!code_list) {
            swal({title: "请选择模拟的股票", type: "warning", timer: 1200, showConfirmButton: false});
        } else if (Number(num) == 0) {
            swal({title: "请输入交易的数量", type: "warning", timer: 1200, showConfirmButton: false});
            return false;
        } else if (!available_capital) {
            swal({title: "获取初始资金失败", type: "error", timer: 1200, showConfirmButton: false});
        }
    });

    /*单个股票买卖 跳转到交易*/
    // $("body").on("click", "#attention .one-stock-trade", function () {
    //     var trade_type=$(this).attr('data-trade-type');//0 买 1卖
    //     var code=$(this).parent().parent().find("td:nth-child(2) span").html();
    //     var stock_name=$(this).parent().parent().find("td:nth-child(3)").html();
    //     var group_name=$('#attention .group-name-list').find('.gp-active >span').html();//组合名
    //     $('#collapseOne li:nth-child(1)').removeClass('active').find('a').attr('aria-expanded','false');//我的关注tab显灰
    //     $('#collapseOne li:nth-child(3)').addClass('active').find('a').attr('aria-expanded','true');//交易tab显示
    //     if(code){
    //         if(trade_type==0){ //买
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
    //         }else if(trade_type==1){  //卖
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
    //
    //         }
    //     }
    // });
    /*修改组合名称*/
    function changeGroupName() {
        $('#attention .change-name').on('click',function(){
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
                    opcode:121,
                    attention_name:encodeURIComponent(inputValue+','),
                    attention_id: group_id
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
                        // $('.group-name-list .gp-active span:nth-child(1)').html(inputValue);//直接改名字不调接口 反复修改名称有问题
                    }else{
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
        $('#attention .del-group').on('click',function(){
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
                    trade.getUserRelatedOp({opcode:122,attention_id: group_id}, null, function (resultData) {
                        if (resultData.status == 0) {
                            swal({
                                title: "",
                                text: "组合<span style='color: #F8BB86'>" + group_name + "</span>已被删除",
                                html: true,
                                timer: 1000,
                                showConfirmButton: false
                            });
                            getGroupList();//我的关注股账户列表
                        }
                    });
                }
            });
        });
    }

    /*获取用户总资产*/
    function userTotalAssets(){
        trade.getUserRelatedOp({
            opcode:116,
            gid: 13
        }, null, function (resultData) {
            if (resultData.status == 0) {
               return resultData.capital;
            }
        });
    }

    //点击全选/全不选
    $("#attention .checkedAll").click(function () {
        Utility.allcheckOrNot($(this),'#attention .group-stock-list');
    });

    /**
     * 根据点击字段名称排序
     */
    $("body").on("click", "#attention .group-stock-list td .sort_img", function () {
        var sortdata;
        var sort_type = $(this).attr('data-sort-type'); //desc asc
        var sort_opt = $(this).attr('data-hot-sort'); //排序名称
        if (sort_type == 'desc') {
            $(this).attr({'src':'/static/imgs/trade/arrow_up.png','data-sort-type': 'ase'}).parent().siblings().find('.sort_img').attr('src','/static/imgs/trade/arrow_down.png');
            sortdata = stockData.sort(Utility.asc_by(sort_opt));
        } else {
            $(this).attr({'src':'/static/imgs/trade/arrow_down.png','data-sort-type': 'desc'});
            sortdata = stockData.sort(Utility.desc_by(sort_opt));
        }
        buildSortStockList(sortdata);//加载排序页面
    });

    getGroupList();
    // setInterval(function () {
    //     getStockList();
    // }, 2000);

});



