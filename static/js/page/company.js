"use strict";
(function ($, window, document) {
    var stockCode = "", stockName = "";
    var data = Utility.getQueryStringByName("data"); //头部标题信息
    var htmltype = $(".wk-company").attr("data-html-type"); //公司概况四个页面分类
    if (data) {
        stockName = data.split(",")[0];
        stockCode = data.split(",")[1];
    }
    $(".wk-toshow-name").html(decodeURI(stockName) + "(" + stockCode + ")");
    $(document).attr("title", decodeURI(stockName) + "(" + stockCode + ")" + $(document).attr("title"));
    Utility.getSinaStockData(stockCode,
        function (stockData) {
            var stockStatus = Utility.getStockStatus(stockData);
            $(".wk-topshow-price").html("¥" + stockStatus.price).addClass(Utility.getUpDownColor(stockStatus.updown));
            $(".wk-topshow-price-per").html(Utility.getPriceSymbol(stockStatus.updown) + stockStatus.updown.toFixed(2) + "(" + Utility.getPriceSymbol(stockStatus.updown) + stockStatus.percent.toFixed(2) + "%)").addClass(Utility.getUpDownColor(stockStatus.percent));
        });
    $(".btn-group li a").click(function () {
        var url = $(this).attr("href");
        if (url.indexOf("data") < 0) {
            $(this).attr("target", "_blank").attr("href", url + "?data=" + stockName + "," + stockCode);
        }
    });
    initFollowBtn();

    /**
     * 公司简介
     */
    function profile() {
        company.getCompany({ "stockcode": stockCode, "htmltype": htmltype },
            null,
            function (resultData) {
                var profileHtml = [];
                if (resultData && resultData.status === 1) {
                    if (Object.keys(resultData.company_profile).length > 0) {
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
                    } else {
                        profileHtml.push("<tr class='no_date'><td colspan='2'><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td>");
                    }
                    $(".profile table").html(profileHtml.join(""));
                }
            });
    }

    /**
     * 股本结构
     */
    function capitalStru() {
        company.getCompany({ "stockcode": stockCode, "htmltype": htmltype },
            null,
            function (resultData) {
                var dateHtml = [];
                var title = ["公告日期", "总股本", "国家持股", "流通受限股份", "国家持股(受限)", "国有法人持股", "国有法人持股(受限)", "外资持股(受限)", "其他内资持股(受限)", "已流通股份", "发起人股份", "未流通股份", "已上市流通A股", "已上市流通B股", "自然人持股", "境内自然人持股", "境外上市流通股", "境外法人持股", "境内法人持股", "募集法人持股", "变动原因"];
                var arrKey = ["date", "general_capital", "state_backing", "float_stock_limit", "state_backing_limit", "legalperson_sharehold", "legalperson_sharehold_limit", "foreign_sharehold_limit", "other_domes_sharehold", "float_share", "sponsor_share", "not_float_share", "float_A_stock", "float_B_stock", "natural_sharehold", "in_natural_sharehold", "out_float_stock", "out_legalperson_sharehold", "in_legalperson_sharehold", "raise_sharehold", "change_reason"];
                //填充表格
                if (resultData && resultData.status === 1) {
                    if (resultData.result.length > 0) {
                        for (var i = 0; i < 21; i++) { //总共数据行数
                            if (i % 2 === 0 && i === 0) {
                                dateHtml.push("<tr style='color:#051b5d;background:#fafcfe'><td>" + title[i] + "</td>");
                            } else if (i % 2 === 0) {
                                dateHtml.push("<tr class='table_title'><td>" + title[i] + "</td>");

                            } else {
                                dateHtml.push("<tr'><td>" + title[i] + "</td>");
                            }

                            for (var j = 0; j < 7; j++) { //数据列数
                                dateHtml.push("<td>" + (resultData.result[j][arrKey[i]] || "--") + "</td>");
                            }
                            dateHtml.push("</tr>");
                        }
                    } else {
                        dateHtml.push("<tr class='no_date'><td><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td>");
                    }

                    $(".cap_stru table").html(dateHtml.join(""));
                }
            });
    }

    /**
     * 公司高管
     */
    function executives() {
        company.getCompany({ "stockcode": stockCode, "htmltype": htmltype },
            null,
            function (resultData) {
                var stockHtml = [];
                var profileHtml = [];
                if (resultData && resultData.status === 1) {
                    //公司高管
                    if (resultData.stock_executive.length > 0) {
                        for (var i = 0; i < resultData.stock_executive.length; i++) {
                            stockHtml.push("<tr>");
                            stockHtml.push("<td><b>" + resultData.stock_executive[i].number + "</b></td>");
                            stockHtml.push("<td>" + resultData.stock_executive[i].name + "</td>");
                            stockHtml.push("<td>" + resultData.stock_executive[i].sex + "</td>");
                            stockHtml.push("<td>" + resultData.stock_executive[i].age + "</td>");
                            stockHtml.push("<td>" + resultData.stock_executive[i].education + "</td>");
                            stockHtml.push("<td>" + resultData.stock_executive[i].duty + "</td>");
                            stockHtml.push("</tr>");
                        }
                    } else {
                        stockHtml.push("<tr class='no_date' style='background:#fff'><td colspan='6'><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td></tr>");
                    }

                    //高管介绍
                    if (resultData.executive_profile.length > 0) {
                        for (var j = 0; j < resultData.executive_profile.length; j++) {
                            profileHtml.push("<tr><th colspan='2' width='20%'>" + resultData.executive_profile[j].name + "</th><td rowspan='3'>" + resultData.executive_profile[j].brief_intro + "</td></tr>");
                            profileHtml.push("<tr><td>性别：" + resultData.executive_profile[j].sex + "</td> <td>" + resultData.executive_profile[j].education + "</td></tr>");
                            profileHtml.push(" <tr><td colspan='2'>" + resultData.executive_profile[j].position + "</td></tr><tr><td colspan='3'></td></tr>");
                            profileHtml.push("</tr>");
                        }
                    } else {
                        profileHtml.push("<tr class='no_date' style='background:#fff'><td colspan='3'><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;暂无数据</td></tr>");
                    }
                    $(".row1 tbody").html(stockHtml.join(""));
                    $(".row2 tbody").html(profileHtml.join(""));
                }
            });
    }

    /**
     * 主要股东
     */
    function stockHolder() {
        company.getCompany({ "stockcode": stockCode, "htmltype": htmltype },
            null,
            function (resultData) {
                if (resultData && resultData.status === 1) {
                    //十大流通股东 top表格所有数据
                    var floatStockHolderArr = resultData["float_stockholder"];
                    //十大股东 bottom表格所有数据
                    var stockHolderArr = resultData["stockholder"];

                    if (floatStockHolderArr.length > 0) {
                        var topLength = Object.keys(floatStockHolderArr).length;
                        var topOpt = topLength; //对应不显示li下标
                        for (var i = 0; i < topLength; i++) {
                            var keyIndex = i + 1;
                            var timeTop = floatStockHolderArr[i]["day" + keyIndex][i]["date"]; //top 获取日期
                            $("#float_stock_holder_ul li").eq(i).find("a").html(timeTop); //追加日期数据
                            var dataTop = floatStockHolderArr[i]["day" + keyIndex]; //日期对应的数据
                            addTrTd("top_opt" + keyIndex, dataTop, "top"); //传选项卡对应表格id 数据
                        }
                        //没有数据的li不显示
                        for (var k = 0; k < 5 - topLength; k++) {
                            topOpt++;
                            $(".float_stockholder ul").find($(".topli" + topOpt)).hide();
                        }
                    } else {
                        $(".float_stockholder ul").hide();
                        $(".float_stockholder table").html("<tr class='no_date'><td><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;十大流通股东暂无数据</td>");
                    }

                    if (stockHolderArr.length > 0) {
                        var botLength = Object.keys(stockHolderArr).length;
                        var botOpt = botLength; //对应不显示li下标
                        for (var j = 0; j < botLength; j++) {
                            var keyIndexBot = j + 1;
                            var timeBottom = stockHolderArr[j]["day" + keyIndexBot][j]["date"]; //bottom
                            $("#stock_holder_ul li").eq(j).find("a").html(timeBottom);
                            var dataBottom = stockHolderArr[j]["day" + keyIndexBot];
                            addTrTd("bottom_opt" + keyIndexBot, dataBottom, "bottom");
                        }
                        //没有数据的li不显示
                        for (var m = 0; m < 5 - botLength; m++) {
                            botOpt++;
                            $(".stockholder ul").find($(".botli" + botOpt)).hide();
                        }
                    } else {
                        $(".stockholder ul").hide();
                        $(".stockholder table").html("<tr class='no_date'><td><img src='../../static/imgs/i/index_nodata.png'>&nbsp;&nbsp;十大股东暂无数据</td>");
                    }
                }
            });
    }

    /**
     * 主要股东 填充对应的表格数据
     * @param appendid
     * @param data
     * @param type
     */
    function addTrTd(appendid, data, type) {
        $("#" + appendid).find("tbody").html(" ");
        for (var i = 0; i < data.length; i++) {
            var rank = data[i]["rank"] || "--";
            var stockholderName = data[i]["stockholder_name"] || "--";
            var stockholderNature = data[i]["stockholder_nature"] || "--";
            var shareType = data[i]["share_type"] || "--";
            var sharesNumber = data[i]["shares_number"] || "--";
            var totalRatio = data[i]["total_ratio"] || "--";
            var changeShare = data[i]["change_share"] || "--";
            var changeRatio = data[i]["change_ratio"] || "--";
            //表格追加内容
            var em = "";
            if (type === "top") {
                em = "<tr><td>" + rank + "</td><td>" + stockholderName + "</td><td>" + stockholderNature + "</td><td>" + shareType + "</td><td>" + sharesNumber + "</td><td>" + totalRatio + "%</td><td>" + changeShare + "</td><td>" + changeRatio + "</td></tr>";
            } else if (type === "bottom") {
                em = "<tr><td>" + rank + "</td><td>" + stockholderName + "</td><td>" + shareType + "</td><td>" + sharesNumber + "</td><td>" + totalRatio + "%</td><td>" + changeShare + "</td><td>" + changeRatio + "</td></tr>";
            }
            $("#" + appendid).find("tbody").append(em);
        }
    }

    /**
     * 初始化关注按钮
     */
    function initFollowBtn() {
        inforcenter.showGroup(null,
            function (resultData) {
                if (resultData && resultData.status === 1) {
                    var followBtnHtml = [];
                    followBtnHtml.push("<div class=\"btn-group\" style='float: right;'>");
                    if ($(".wk-topshow-right .btn-group").length <= 0) {
                        followBtnHtml.push("<button type=\"button\" class=\"btn dropdown-toggle wk-btn-follow\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">");
                        followBtnHtml.push("+ 关注");
                        followBtnHtml.push("</button>");
                        followBtnHtml.push("<ul class=\"dropdown-menu\">");
                        followBtnHtml.push("<li class='wk-follow-stock' data-follow-name='我的自选股'><a href=\"#\">我的自选股</a></li>");
                        if (resultData.result.info.group_name.length > 0) {
                            var list = resultData.result.info.group_name;
                            for (var i = 0; i < list.length; i++) {
                                followBtnHtml.push("<li class='wk-follow-stock' data-follow-name='" + list[i] + "'><a href=\"#\">" + list[i] + "</a></li>");
                            }
                            followBtnHtml.push("<li class=\"wk-follow-stock\" id='addNewGroup' data-follow-name=\"addNewGroup\"><a href=\"javascript:\">添加组合</a></li>");
                        }
                        $(".wk-topshow-right").append(followBtnHtml.join(""));
                        followBtnHtml.push("</ul>");
                        followBtnHtml.push("</div>");
                    }
                    initFollowEvent();
                }
            });
    }

    /**
     * 绑定关注按钮事件
     */
    function initFollowEvent() {
        $(".wk-follow-stock").each(function () {
            var followName = $(this).attr("data-follow-name");
            $(this).unbind("click").bind("click", function () {
                if (followName === "addNewGroup") {
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
                    },
                        function (inputValue) {
                            if (inputValue === false) return false;
                            if (inputValue === "") {
                                swal.showInputError("请输入组合名称");
                                return false;
                            }
                            if (Utility.getByteLen(inputValue) > 12) {
                                swal.showInputError("字符数超过限制");
                                return false;
                            }
                            inforcenter.addGroup({ ori_name: inputValue },
                                null,
                                function (resultData) {
                                    if (resultData.status === 1) {
                                        swal({
                                            title: "",
                                            text: "添加<span style='color: #F8BB86'>" + inputValue + "</span>组合成功",
                                            html: true,
                                            timer: 1000,
                                            showConfirmButton: false
                                        });
                                        $("#addNewGroup").before("<li class='wk-follow-stock' data-follow-name='" + inputValue + "'><a href=\"#\">" + inputValue + "</a></li>");
                                        initAddStock(inputValue, stockCode, false);
                                        initFollowEvent();
                                    } else if (resultData.status === 0) {
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
                } else {
                    initAddStock(followName, stockCode, true);
                }
            });
        });
    }

    /**
     * 添加股票
     * @param followName
     * @param addCode
     * @param showAlert
     */
    function initAddStock(followName, addCode, showAlert) {
        inforcenter.addStock({ ori_name: followName, code: addCode }, null, function (addResult) {
            if (addResult.status === 1) {
                if (showAlert) {
                    swal({ title: "", text: "关注个股<span style='color: #F8BB86'>" + addCode + "</span>成功", html: true, timer: 1000, showConfirmButton: false });
                }
            } else if (addResult.status === 0) {
                swal({ title: "", text: "关注个股<span style='color: #F8BB86'>" + addCode + "</span>异常," + addResult.msg + "", html: true, timer: 1000, showConfirmButton: false });
            } else {
                swal({ title: "", text: "关注个股<span style='color: #F8BB86'>" + addCode + "</span>异常,未知原因", html: true, timer: 1000, showConfirmButton: false });
            }
        });
    }

    if (htmltype === "profile") {
        profile();
    } else if (htmltype === "cap_stru") {
        capitalStru();
    } else if (htmltype === "executives") {
        executives();
    } else if (htmltype === "stockholder") {
        stockHolder();
    }

})(jQuery, window, document);