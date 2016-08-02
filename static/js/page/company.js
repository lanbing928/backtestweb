"use strict";
(function ($, window, document) {
    var data = Utility.getQueryStringByName("data");//头部标题信息
    var htmltype=$('.wk-company').attr("html_type");//公司概况四个页面分类

    if (data && data.split(',').length > 0) {
        var spl = data.split(',');//0名称 1股票代码 2价格 3小数 4百分百 5状态
        $(".wk-toshow-name").html(decodeURI(spl[0]) + "(" + spl[1] + ")");
        $(".wk-topshow-price").html("¥" + spl[2]).addClass(Utility.getUpDownColor(spl[3]));
        $(".wk-topshow-price-per").html(Utility.getPriceSymbol(spl[3]) + parseFloat(spl[3]).toFixed(2) + "(" + Utility.getPriceSymbol(spl[3]) + parseFloat(spl[4]).toFixed(2) + "%)").addClass(Utility.getUpDownColor(spl[4]));
        $(".wk-topshow-dp label").html(decodeURI(spl[5])).addClass("wk-up");
    }

    //公司概况下拉框
    $(".btn-group li").click(function(){
        var type= $(this).attr('data');
        switch(type){
            case '1':$(this).find('a').attr('target','_blank').attr('href','/company/profile.php?data='+ spl[0]+','+spl[1]+','+spl[2]+','+spl[3]+','+spl[4]+','+spl[5]);break;//公司简介
            case '2':$(this).find('a').attr('target','_blank').attr('href','/company/executives.php?data='+ spl[0]+','+spl[1]+','+spl[2]+','+spl[3]+','+spl[4]+','+spl[5]);break;//公司高管
            case '3':$(this).find('a').attr('target','_blank').attr('href','/company/capital_structure.php?data='+spl[0]+','+spl[1]+','+spl[2]+','+spl[3]+','+spl[4]+','+spl[5]);break;//股本结构
            case '4':$(this).find('a').attr('target','_blank').attr('href','/company/stockholder.php?data='+spl[0]+','+spl[1]+','+spl[2]+','+spl[3]+','+spl[4]+','+spl[5]);break;//主要股东
        }
    })

    //公司简介
    function profile() {
        company.getCompany({"stockcode": spl[1],"htmltype":htmltype},null,function (resultData) {
            var profileHtml=[];
            if (resultData && resultData.status == 1) {
                if(Object.keys(resultData.company_profile).length>0){
                    profileHtml.push("<tr class='tr_title'><th width='32%'>公司名称</th><td width='68%'>" + resultData.company_profile.company_name + "</td></tr>");
                    profileHtml.push("<tr><th>公司英文名称</th><td>" + resultData.company_profile.company_eng_name + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>曾用名</th><td>" + resultData.company_profile.used_name + "</td></tr>");
                    profileHtml.push("<tr><th>A股代码</th><td>" + resultData.company_profile.A_stockcode + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>A股简称</th><td>" + resultData.company_profile.A_short + "</td></tr>");
                    profileHtml.push("<tr><th>B股代码</th><td>" + resultData.company_profile.B_stockcode + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>B股简称</th><td>" + resultData.company_profile.B_short + "</td></tr>");
                    profileHtml.push("<tr><th>H股代码</th><td>" + resultData.company_profile.H_stockcode + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>H股简称</th><td>" + resultData.company_profile.H_short + "</td></tr>");
                    profileHtml.push("<tr><th>证券类别</th><td>" + resultData.company_profile.security_type + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>所属行业</th><td>" + resultData.company_profile.industry_involved + "</td></tr>");
                    profileHtml.push("<tr><th>总经理</th><td>" + resultData.company_profile.ceo + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>法人代表</th><td>" + resultData.company_profile.law_person + "</td></tr>");
                    profileHtml.push("<tr><th>董秘</th><td>" + resultData.company_profile.secretary + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>董事长</th><td>" + resultData.company_profile.chairman + "</td></tr>");
                    profileHtml.push("<tr><th>证券事务代表</th><td>" + resultData.company_profile.security_agent + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>独立董事</th><td>" + resultData.company_profile.independent_director + "</td></tr>");
                    profileHtml.push("<tr><th>联系电话</th><td>" + resultData.company_profile.company_tel + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>电子信箱</th><td>" + resultData.company_profile.company_email + "</td></tr>");
                    profileHtml.push("<tr><th>传真</th><td>" + resultData.company_profile.company_fax + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>公司网址</th><td>" + resultData.company_profile.company_website + "</td></tr>");
                    profileHtml.push("<tr><th>办公地址</th><td>" + resultData.company_profile.business_address + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>注册地址</th><td>" + resultData.company_profile.reg_address + "</td></tr>");
                    profileHtml.push("<tr><th>区域</th><td>" + resultData.company_profile.area + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>邮政编码</th><td>" + resultData.company_profile.post_code + "</td></tr>");
                    profileHtml.push("<tr><th>注册资本(元)</th><td>" + resultData.company_profile.reg_captial + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>工商登记</th><td>" + resultData.company_profile.business_registration + "</td></tr>");
                    profileHtml.push("<tr><th>雇员人数</th><td>" + resultData.company_profile.employee_num + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>管理人员人数</th><td>" + resultData.company_profile.admin_num + "</td></tr>");
                    profileHtml.push("<tr><th>律师事务所</th><td>" + resultData.company_profile.law_firm + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>会计师事务所</th><td>" + resultData.company_profile.accounting_firm + "</td></tr>");
                    profileHtml.push("<tr><th>公司简介</th><td>" + resultData.company_profile.company_intro + "</td></tr>");
                    profileHtml.push("<tr class='pro_bg'><th>经营范围</th><td>" + resultData.company_profile.business_scope + "</td></tr>");
                }else{
                    profileHtml.push("<tr class='no_date'><td colspan='2'><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td>");
                }
                $('.profile table').html(profileHtml.join(''));
            }


        });
    }

    //股本结构
    function capitalStru(){
        company.getCompany({"stockcode": spl[1],"htmltype":htmltype}, null, function (resultData) {
            var dateHtml=[];
            var title=['公告日期','总股本','国家持股','流通受限股份','国家持股(受限)','国有法人持股','国有法人持股(受限)','外资持股(受限)','其他内资持股(受限)','已流通股份','发起人股份','未流通股份','已上市流通A股','已上市流通B股','自然人持股','境内自然人持股','境外上市流通股','境外法人持股','境内法人持股','募集法人持股','变动原因'];
            var arr_key=['date','general_capital','state_backing','float_stock_limit','state_backing_limit','legalperson_sharehold','legalperson_sharehold_limit','foreign_sharehold_limit','other_domes_sharehold','float_share','sponsor_share','not_float_share','float_A_stock','float_B_stock','natural_sharehold','in_natural_sharehold','out_float_stock','out_legalperson_sharehold','in_legalperson_sharehold','raise_sharehold','change_reason'];
            //填充表格
            if (resultData && resultData.status == 1) {
                if(resultData.result.length >0){
                    for(var i=0 ;i<21;i++){ //总共数据行数
                        if(i%2 == 0 && i==0){
                            dateHtml.push("<tr style='color:#051b5d;background:#fafcfe'><td>"+title[i]+"</td>");
                            // }
                        }else if(i%2 == 0){
                            dateHtml.push("<tr class='table_title'><td>"+title[i]+"</td>");

                        }else{
                            dateHtml.push("<tr'><td>"+title[i]+"</td>");
                        }

                        for(var j=0;j<7;j++){ //数据列数
                            dateHtml.push("<td>"+checkIsNull(resultData.result[j][arr_key[i]])+"</td>");
                        }
                        dateHtml.push("</tr>");
                    }
                }else{
                    dateHtml.push("<tr class='no_date'><td><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td>");
                }

                $(".cap_stru table").html(dateHtml.join(''));
            }

        })
    }

    //公司高管
    function executives(){
        company.getCompany({"stockcode": spl[1],"htmltype":htmltype}, null, function (resultData) {
            var stockHtml=[];
            var profileHtml=[];
            if (resultData && resultData.status == 1) {
                //公司高管
                if(resultData.stock_executive.length > 0){
                    for(var i =0 ;i<resultData.stock_executive.length;i++){
                        stockHtml.push("<tr>");
                        stockHtml.push("<td><b>"+resultData.stock_executive[i].number+"</b></td>");
                        stockHtml.push("<td>"+resultData.stock_executive[i].name+"</td>");
                        stockHtml.push("<td>"+resultData.stock_executive[i].sex+"</td>");
                        stockHtml.push("<td>"+resultData.stock_executive[i].age+"</td>");
                        stockHtml.push("<td>"+resultData.stock_executive[i].education+"</td>");
                        stockHtml.push("<td>"+resultData.stock_executive[i].duty+"</td>");
                        stockHtml.push("</tr>");
                    }
                }else{
                    stockHtml.push("<tr class='no_date' style='background:#fff'><td colspan='6'><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td></tr>");
                }

                //高管介绍
                if(resultData.executive_profile.length > 0){
                    for(var j =0 ;j<resultData.executive_profile.length;j++){
                        profileHtml.push("<tr><th colspan='2' width='20%'>"+resultData.executive_profile[j].name+"</th><td rowspan='3'>"+resultData.executive_profile[j].brief_intro+"</td></tr>");
                        profileHtml.push("<tr><td>性别："+resultData.executive_profile[j].sex+"</td> <td>"+resultData.executive_profile[j].education+"</td></tr>");
                        profileHtml.push(" <tr><td colspan='2'>"+resultData.executive_profile[j].position+"</td></tr><tr><td colspan='3'></td></tr>");
                        profileHtml.push("</tr>");
                    }
                }else{
                    profileHtml.push("<tr class='no_date' style='background:#fff'><td colspan='3'><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td></tr>");
                }
                $('.row1 tbody').html(stockHtml.join(''));
                $('.row2 tbody').html(profileHtml.join(''));
            }

        })
    }

    //主要股东
    function stockHolder() {
        company.getCompany({"stockcode": spl[1],"htmltype":htmltype}, null, function (resultData) {
            if (resultData && resultData.status == 1) {
                //十大流通股东 top表格所有数据
                var float_stock_holder_arr = resultData['float_stockholder'];
                //十大股东 bottom表格所有数据
                var stock_holder_arr = resultData['stockholder'];

                if(float_stock_holder_arr.length>0){
                    var top_length=Object.keys(float_stock_holder_arr).length;
                    var top_opt=top_length;//对应不显示li下标
                    for (var i = 0; i<top_length; i++) {
                        var key_index = i + 1;
                        var time_top = float_stock_holder_arr[i]['day' + key_index][i]['date'];//top 获取日期
                        $("#float_stock_holder_ul li").eq(i).find('a').html(time_top); //追加日期数据
                        var data_top = float_stock_holder_arr[i]['day' + key_index]; //日期对应的数据
                        addTrTd('top_opt' + key_index, data_top, 'top'); //传选项卡对应表格id 数据
                    }
                    //没有数据的li不显示
                    for(var k=0;k<5-top_length;k++){
                        top_opt++;
                        $('.float_stockholder ul').find($('.topli'+top_opt)).hide();
                    }
                }else{
                    $('.float_stockholder ul').hide();
                    $('.float_stockholder table').html("<tr class='no_date'><td><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;十大流通股东暂无数据</td>");
                }

                if(stock_holder_arr.length>0){
                    var bot_length=Object.keys(stock_holder_arr).length;
                    var bot_opt=bot_length;//对应不显示li下标
                    for (var j = 0; j<bot_length; j++) {
                        var key_index_bot = j + 1;
                        var time_bottom = stock_holder_arr[j]['day' + key_index_bot][j]['date'];//bottom
                        $("#stock_holder_ul li").eq(j).find('a').html(time_bottom);
                        var data_bottom = stock_holder_arr[j]['day' + key_index_bot];
                        addTrTd('bottom_opt' + key_index_bot, data_bottom, 'bottom');
                    }
                    //没有数据的li不显示
                    for(var m=0;m<5-bot_length;m++){
                        bot_opt++;
                        $('.stockholder ul').find($('.botli'+bot_opt)).hide();
                    }
                }else{
                    $('.stockholder ul').hide();
                    $('.stockholder table').html("<tr class='no_date'><td><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;十大股东暂无数据</td>");
                }
            }
        });
    }


    /*主要股东 填充对应的表格数据*/
    function addTrTd(appendid,data,type){
        $("#" + appendid).find('tbody').html(' ');
        for (var i = 0;i< data.length; i++) {
            var rank = checkIsNull(data[i]['rank']);
            var stockholder_name = checkIsNull(data[i]['stockholder_name']);
            var stockholder_nature = checkIsNull(data[i]['stockholder_nature']);
            var share_type = checkIsNull(data[i]['share_type']);
            var shares_number = checkIsNull(data[i]['shares_number']);
            var total_ratio = checkIsNull(data[i]['total_ratio']);
            var change_share = checkIsNull(data[i]['change_share']);
            var change_ratio = checkIsNull(data[i]['change_ratio']);
            //表格追加内容
            if(type=="top"){
                var em = '<tr><td>' + rank + '</td><td>' + stockholder_name + '</td><td>' + stockholder_nature + '</td><td>' + share_type + '</td><td>' + shares_number + '</td><td>' + total_ratio + '%</td><td>' + change_share + '</td><td>' + change_ratio + '</td></tr>';
            }else if(type=="bottom"){
                var em = '<tr><td>' + rank + '</td><td>' + stockholder_name + '</td><td>' + share_type + '</td><td>' + shares_number + '</td><td>' + total_ratio + '%</td><td>' + change_share + '</td><td>' + change_ratio + '</td></tr>';
            }
            $("#" + appendid).find('tbody').append(em);
        }
    }

    /*检查字段是否为空*/
    function checkIsNull(str){
        if(str){
            return str;
        }else{
            return '--';
        }
    }

    //关注按钮
    $(".wk-follow-stock").each(function () {
        var follow_name = $(this).attr("data-follow-name");
        $(this).unbind("click").bind("click", function () {
            inforcenter.addStock({ori_name: follow_name, code:spl[1]}, null, function (addResult) {
                if (addResult.status == 1) {
                    swal({
                        title: "",
                        text: "关注个股<span style='color: #F8BB86'>" +spl[1] + "</span>成功",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                } else if (addResult.status === 0) {
                    swal({
                        title: "",
                        text: "关注个股<span style='color: #F8BB86'>" + spl[1] + "</span>异常," + resultData.msg + "",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                } else {
                    swal({
                        title: "",
                        text: "关注个股<span style='color: #F8BB86'>" + spl[1] + "</span>异常,未知原因",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        });
    });

    if(htmltype=="profile"){
        profile();
    }else if(htmltype=="cap_stru"){
        capitalStru();
    }else if(htmltype=="executives"){
        executives();
    }else if(htmltype=="stockholder"){
        stockHolder();
    }


})(jQuery, window, document);