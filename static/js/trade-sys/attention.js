"use strict";
$(function () {
    var isFistLoad=0;//0时第一次
    var thisHost = "http://" + window.location.host + "/";
    var attention_gid;//选中的账户id
    var attention_name;//选中的账户名称
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
                    trade.getUserRelatedOp({opcode: 102,gid:attention_gid,code_list:code}, null, function (resultData) {
                        if (resultData.status == 0) {
                            $('.wk-attention-search').val('');
                            getStockList(attention_gid);
                        }
                    });
                }
            }
        }
    });

    /*获取账户*/
    function getGroupList(){
        trade.getUserRelatedOp({opcode: 104}, function(){
            $('.group-name-list').html('<li style="border:none">加载中...</li>');
        }, function (resultData) {
            if (resultData.status == 0) {
                var groupHtml=[];
                if(resultData.group_list.length>0){
                    for(var i=0;i<resultData.group_list.length;i++){
                        if(i==0){
                            attention_gid=resultData.group_list[0].id;//默认的账户id,gid
                            attention_name=resultData.group_list[0].name;//默认的账户id,gid
                            groupHtml.push('<li class="left gp-active" data-gid="'+resultData.group_list[0].id+'">'+resultData.group_list[0].name+'</li>')
                        }else{
                            groupHtml.push('<li class="left" data-gid="'+resultData.group_list[i].id+'">'+resultData.group_list[i].name+'</li>')
                        }
                    }
                    groupHtml.push('<li class="left add-group trade-add-group" data-gid="-1">自定义<i class="fa fa-plus"></i></li>')
                    groupHtml.push('<div class="clear"></div>');
                }else{
                    groupHtml.push('<li style="border:none">无添加的账号</li>')
                }
                $('.group-name-list').html(groupHtml.join(""));
                clickGroupList();//点击账户切换不同的股票信息
                getStockList(attention_gid);//组合下股票列表
            }
        });
    }

    /*建立模拟交易的组合*/
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
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("请输入账户名称");
                return false;
            }
            if (Utility.getByteLen(inputValue) > 12) {
                swal.showInputError("字符数超过限制");
                return false;
            }
            trade.getUserRelatedOp({opcode: 101, group_name: inputValue}, null, function (resultData) {
                console.log(resultData);
                if (resultData.status==0) {
                    swal({
                        title: "",
                        text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>账户成功",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                    getGroupList();
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
        $('#attention .group-name-list li').on('click',function(){
            $(this).not('.add-group').addClass('gp-active').siblings().removeClass('gp-active');
            var tmp_gid=$(this).attr('data-gid');
            var tmp_name=$(this).html();
            if(tmp_gid!=-1){
                attention_gid=tmp_gid;
                attention_name=tmp_name;
                getStockList(tmp_gid);
            }
        });
    };

    /*获取账户下的股票列表*/
    function getStockList(){
        trade.getUserRelatedOp({opcode: 105,gid:attention_gid}, function(){
            if(isFistLoad==0){
                $('.group-stock-list table tbody').html('<tr><td colspan="9">加载中...</td></tr>');
            };
        }, function (resultData) {
            if (resultData.status == 0) {
                var stockHtml=[];
                var list=resultData.stock_list;
                stockData=resultData.stock_list;
                if(list.length>0){
                    for(var i=0;i<list.length;i++){
                      stockHtml.push('<tr>')
                      stockHtml.push('<td>'+(i+1)+'</td>')
                      stockHtml.push('<td><input type="checkbox" class="left"><span class="left">'+list[i].code+'</span></td>')
                      stockHtml.push('<td>'+list[i].name+'</td>')
                      stockHtml.push('<td>'+list[i].visit_heat+'</td>')
                      stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].price+'</td>')
                      stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].change.toFixed(2)+'%'+Utility.getHotUpDown(list[i].change)+'</td>')
                      stockHtml.push('<td>'+(list[i].volume/10000).toFixed(2)+'</td>')
                      stockHtml.push('<td>'+list[i].industry+'</td>')
                      stockHtml.push('<td><img src="../static/imgs/trade/op_buy.png" class="one-stock-trade" data-trade-type="1" href="#trade" data-toggle="tab">&nbsp;<img src="../static/imgs/trade/op_sale.png" class="one-stock-trade" data-trade-type="2" href="#trade" data-toggle="tab"></td>')
                      stockHtml.push('<td><i class="fa fa-minus-circle text-danger btn-del-stock" data-stock-code="'+list[i].code+'" data-stock-gid="'+attention_gid+'"></i></td>')
                      stockHtml.push('</tr>')
                    }
                }else{
                    stockHtml.push('<tr><td colspan="9">暂无关注的股票</td></tr>')
                }
                $('.group-stock-list table tbody').html(stockHtml.join(""));
                delStock();
                isFistLoad++;
            }
        });
    };
    /*重构排序后股票列表*/
    function buildSortStockList(list) {
        if(list.length>0){
            var stockHtml=[];
            for(var i=0;i<list.length;i++){
                stockHtml.push('<tr>')
                stockHtml.push('<td>'+(i+1)+'</td>')
                stockHtml.push('<td><input type="checkbox" class="left"><span class="left">'+list[i].code+'</span></td>')
                stockHtml.push('<td>'+list[i].name+'</td>')
                stockHtml.push('<td>'+list[i].visit_heat+'</td>')
                stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].price+'</td>')
                stockHtml.push('<td class="' + Utility.getPriceColor(list[i].change) + '">'+list[i].change.toFixed(2)+'%'+Utility.getHotUpDown(list[i].change)+'</td>')
                stockHtml.push('<td>'+list[i].volume+'</td>')
                stockHtml.push('<td>'+list[i].industry+'</td>')
                stockHtml.push('<td><img src="../static/imgs/trade/op_buy.png">&nbsp<img src="../static/imgs/trade/op_sale.png"></td>')
                stockHtml.push('</tr>')
            }
            $('.group-stock-list table tbody').html(stockHtml.join(""));
        }
    }

    /*删除股票*/
    function delStock(){
        $(".group-stock-list table>tbody tr").hover(function(){
            var del_stock_name = $(this).find("td:nth-child(3)").html();
            $(this).find(".btn-del-stock").show().bind("click", function () {
                var del_stock = $(this).attr("data-stock-code");
                var del_group =$(this).attr("data-stock-gid");
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
                            opcode:103,
                            code_list: del_stock,
                            gid: del_group
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
            });
        },function(){
            $(this).find(".btn-del-stock").hide();
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

    /*批量买卖*/
    $('.bulk-trade-btn').click(function(){
        var num=$(this).parent().find('.modal-trade-num input').val();//交易数量
        var trade_type=$(this).attr('data-trade-type');//交易类型 1是买  2是卖
        var buy_money=0;//所选择买入的股票需要的总资金
        var group_total_assets= userTotalAssets();//获取组合下的初始资金
        var data_obj={};//{{"price":"11","code":"100000","num":"10"},{"price":"12","code":"200000","num":"20"}}
        var i = 0;
        $(".group-stock-list tbody input[type='checkbox']:checked").each(function () {
            var code=$(this).parent().find('span').html();
            var price=$(this).parent().parent().find('td:nth-child(5)').html();
            data_obj[i]={"code":code,"price":price,"num":num};
            buy_money=buy_money+price*num;
            i++;
        });
        if (Object.keys(data_obj).length != 0 && Number(num) != 0 && group_total_assets) { //可以进行批量买卖
            if(trade_type==1){ //买
                if(buy_money < group_total_assets){
                    swal({title: "剩余可买资金不足！", type: "warning", timer: 1200, showConfirmButton: false});
                    return false;
                }
            }
            //开始调用批量买卖接口
        }else if(Object.keys(data_obj).length == 0){
            swal({title: "请选择模拟的股票", type: "warning", timer: 1200, showConfirmButton: false});
        }else if(Number(num) == 0){
            swal({title: "请输入交易的数量", type: "warning", timer: 1200, showConfirmButton: false});
            return false;
        }else if(!group_total_assets){
            swal({title: "获取初始资金失败", type: "error", timer: 1200, showConfirmButton: false});
        }
    });

    /*单个股票买卖*/
    $("body").on("click", "#attention .one-stock-trade", function () {
        var trade_type=$(this).attr('data-trade-type');//1 买 2卖
        var code=$(this).parent().parent().find("td:nth-child(2) span").html();//1 买 2卖
        var stock_name=$('')
        alert(code);
        $('#collapseOne li:nth-child(1)').removeClass('active').find('a').attr('aria-expanded','false');//我的关注tab显灰
        $('#collapseOne li:nth-child(3)').addClass('active').find('a').attr('aria-expanded','true');//交易tab显示
        if(code){
            if(trade_type==1){ //买
                $('#buy .wk-trade-search').val(code);
                $('#buy .wk-trade-search').trigger('input');//触发typehead插件
            }else if(trade_type==2){  //卖
                // $('#sale .wk-trade-search').val(code);
                alert(attention_name);
                var aa=$("#sale .sale-stock-group option[text='"+attention_name+"']").val();
                // var aa=$("#sale .sale-stock-group option[text='"+attention_name+"']").val();
                alert(aa);
                // $('#sale .wk-trade-search').trigger('input');//触发typehead插件
            }
        }
    });

    /*获取用户总资产*/
    function userTotalAssets(){
        trade.getUserRelatedOp({
            opcode:116,
            gid: 1
        }, null, function (resultData) {
            if (resultData.status == 0) {
               return resultData.capital;
            }
        });
    }

    getGroupList();
    // userTotalAssets();
    // setInterval(function () {
    //     getStockList();
    // }, 2000);

});



