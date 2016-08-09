"use strict";
(function ($, window, document) {
    /**
     *分页对象
     */
    var pagenum = {
        /**
         *查看热度页码
         */
        vnum: 1,
        /**
         *搜索热度页码
         */
        snum: 1,
        /**
         *关注热度页码
         */
        fnum: 1
    };
    var request_v = true;
    var request_s = true;
    var request_f = true;

    var sort_opt;
    var sortid;
    var sort_type;
    var sort_arr = []; //全局的一个排序数组

    /**
     * 初始化排序数组
     */
    function constructSortArr(){
        var temp_page_arr = [];
        for(var p = 1;p<=5;p++){
            temp_page_arr[p]=[];//初始化页码
        }
        for(var i=1;i<=4;i++){
            for(var j=1;j<=3;j++){
                var u_key = i+''+j;
                sort_arr[u_key]=temp_page_arr;
            }
        }
    }
    constructSortArr();



    var key = Utility.getQueryStringByName("key");
    var data_type = 1,
        hot_type = 1,
        operate_code = 1,
        rank_name = "";
    if (key && key.split(',').length > 0) {
        var spl = key.split(',');
        data_type = spl[0] || "1"; //1:查看,2：搜索,3：关注
        hot_type = spl[1] || "1"; //1:股票,2:行业，3:概念,4:事件
        operate_code = spl[2] || "1";
        rank_name = decodeURI(spl[3] || "");
        $(".nav-tabs").find("li[data-type='" + data_type + "']").addClass("active in").siblings().removeClass("active in");
        if (data_type == 1) {
            $("#view").removeClass("fade").addClass("active in").siblings().addClass("fade").removeClass("active in");
            showData(pagenum.vnum, data_type, "view");
        }
        if (data_type == 2) {
            $("#search").removeClass("fade").addClass("active in").siblings().addClass("fade").removeClass("active in");
            showData(pagenum.snum, data_type, "search");
        }
        if (data_type == 3) {
            $("#follow").removeClass("fade").addClass("active in").siblings().addClass("fade").removeClass("active in");
            showData(pagenum.fnum, data_type, "follow");
        }
    }

    function showData(page, type, showid) {
        sortid=showid;
        var postData = {
            'leaf_num': page,
            'datatype': type,
            "hot_type": hot_type,
            "operate_code": operate_code
        };
        if (hot_type == 2) {
            postData.hy = rank_name;
        }
        if (hot_type == 3) {
            postData.gn = rank_name;
        }
        if (hot_type == 4) {
            postData.hot_event = rank_name;
        }
        common.getHotRank(postData, null, function (resultData) {
            //resultData={ "result": { "code_info": { "hhv_": [ { "increment": -26482, "name": "房地产", "value": 315282, "volume": 2603158152 }, { "increment": -15917, "name": "电子信息", "value": 150584, "volume": 3618400207 }, { "increment": -14451, "name": "计算机", "value": 141056, "volume": 4361212475 }, { "increment": -12994, "name": "工程建筑", "value": 136379, "volume": 5397918940 }, { "increment": -14338, "name": "交通工具", "value": 125958, "volume": 6162845569 }, { "increment": -10287, "name": "仪电仪表", "value": 120482, "volume": 6773018652 }, { "increment": -12717, "name": "有色金属", "value": 112338, "volume": 8094544678 }, { "increment": -10625, "name": "医药", "value": 106461, "volume": 8561673227 }, { "increment": -8810, "name": "化工化纤", "value": 93723, "volume": 9225134709 }, { "increment": -8605, "name": "机械", "value": 89764, "volume": 9759353023 }, { "increment": -9794, "name": "酿酒食品", "value": 84800, "volume": 10378477197 }, { "increment": -13374, "name": "煤炭石油", "value": 84451, "volume": 11517964287 }, { "increment": -7876, "name": "通信", "value": 82676, "volume": 11978059779 }, { "increment": -6717, "name": "商业连锁", "value": 75733, "volume": 12477659241 }, { "increment": -7887, "name": "运输物流", "value": 70123, "volume": 13042547209 }, { "increment": -6482, "name": "纺织服装", "value": 61887, "volume": 13478632495 }, { "increment": -5641, "name": "电器", "value": 54830, "volume": 13863725636 }, { "increment": -5292, "name": "教育传媒", "value": 52697, "volume": 14173807302 }, { "increment": -6297, "name": "建材", "value": 52287, "volume": 14666442271 }, { "increment": -4994, "name": "电力", "value": 51641, "volume": 15062422362 }, { "increment": -4728, "name": "钢铁", "value": 50369, "volume": 15812812819 }, { "increment": -3600, "name": "其他行业", "value": 41189, "volume": 16076122652 }, { "increment": -3241, "name": "农林牧渔", "value": 37835, "volume": 16343038493 }, { "increment": -3066, "name": "外贸", "value": 37671, "volume": 16618961353 } ] } }, "status": 1 };
            if (resultData && resultData.status == 1) {
                if (resultData.result.code_info) {
                    var _newdata;
                    var hot_type_name;
                    if (hot_type == 1) {
                        switch (data_type) {
                            case "1":
                                _newdata = resultData.result.code_info.shv_;
                                break;
                            case "2":
                                _newdata = resultData.result.code_info.shs_;
                                break;
                            case "3":
                                _newdata = resultData.result.code_info.shf_;
                                break;
                        }
                        hot_type_name = "stocks";
                    }
                    if (hot_type == 2) {
                        switch (data_type) {
                            case "1":
                                _newdata = resultData.result.code_info.hhv_;
                                break;
                            case "2":
                                _newdata = resultData.result.code_info.hhs_;
                                break;
                            case "3":
                                _newdata = resultData.result.code_info.hhf_;
                                break;
                        }
                        hot_type_name = "industry";
                    }
                    if (hot_type == 3) {
                        switch (data_type) {
                            case "1":
                                _newdata = resultData.result.code_info.ghv_;
                                break;
                            case "2":
                                _newdata = resultData.result.code_info.ghs_;
                                break;
                            case "3":
                                _newdata = resultData.result.code_info.ghf_;
                                break;
                        }
                        hot_type_name = "concept";
                    }
                    if (hot_type == 4) {
                        switch (data_type) {
                            case "1":
                                _newdata = resultData.result.code_info.ehv_;
                                break;
                            case "2":
                                _newdata = resultData.result.code_info.ehs_;
                                break;
                            case "3":
                                _newdata = resultData.result.code_info.ehf_;
                                break;
                        }
                        hot_type_name = "event";
                    }
                    if (operate_code == 2) {
                        switch (data_type) {
                            case "1":
                                _newdata = resultData.result.code_info.shv_;
                                break;
                            case "2":
                                _newdata = resultData.result.code_info.shs_;
                                break;
                            case "3":
                                _newdata = resultData.result.code_info.shf_;
                                break;
                        }
                        hot_type_name = "stocks";
                    }
                    var html = buildRankTable(_newdata, hot_type_name);
                    if (hot_type == 1 || operate_code == 2) {
                        $("#" + showid).find("table>thead").html("<tr><td>序号</td><td>股票代码</td><td>股票名称</td><td>价格</td><td>涨跌幅</td><td>涨跌额</td><td>成交量(万手)</td><td>" + getHotName(data_type) + "</td><td>热度增量</td></tr>");
                    } else {
                        $("#" + showid).find("table>thead").html("<tr><td>序号</td><td>名称</td><td>成交量(万手)<span hot-sort='volume' sort_type='desc'>↓</span></td><td>" + getHotName(data_type) + "<span hot-sort='value' sort_type='desc' class='sort_active'>↓</span></td><td>热度增量<span hot-sort='increment' sort_type='desc'>↓</span></td></tr>");
                    }
                    $("#" + showid).find("table>tbody").append(html);//追加表格内容
                }
            } else { //数据不存在
                if (data_type == 1) {
                    $("#view_hot_more").hide();
                    request_v = false;
                }
                if (data_type == 2) {
                    $("#search_hot_more").hide();
                    request_s = false;
                }
                if (data_type == 3) {
                    $("#follow_hot_more").hide();
                    request_f = false;
                }

            }
        });
    }

    /**
     *构建排行榜页面
     */
    function buildRankTable(buildData, buildType) {
        buildAllSortData(hot_type,data_type,buildData);//排序1
        if(sort_opt){
            var tagkey = hot_type+''+data_type;
            var newData=getSortData(tagkey);//获取当前页面加载出的页码数据
            if(sort_type == 'desc'){
                buildData=newData.sort(desc_by(sort_opt));
            }else{
                buildData=newData.sort(asc_by(sort_opt));
            }
            return buildSortRankTable(buildData,buildType); //加载更多的时候重新排序
        }
        var buildHtml = [];
        if (buildData && buildData.length > 0) {
            if (buildType == "stocks" || operate_code == 2) {
                for (var i = 0, len = buildData.length; i < len; i++) {
                    buildHtml.push("<tr>");
                    if (data_type == 1) {
                        buildHtml.push("<td>" + ((i + 1) + (pagenum.vnum - 1) * 24) + "</td>");
                    }
                    if (data_type == 2) {
                        buildHtml.push("<td>" + ((i + 1) + (pagenum.snum - 1) * 24) + "</td>");
                    }
                    if (data_type == 3) {
                        buildHtml.push("<td>" + ((i + 1) + (pagenum.fnum - 1) * 24) + "</td>");
                    }
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].code + "</a></td>");
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].name + "</a></td>");
                    buildHtml.push("<td class='" + Utility.getPriceColor(buildData[i].mark_z_d) + "'>" + buildData[i].price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].price_change_ratio * 100).toFixed(2) + '%' + Utility.getHotUpDown(buildData[i].price_change_ratio) + "</td>");
                    buildHtml.push("<td>" + buildData[i].differ_price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[i].value + "</td>");
                    buildHtml.push("<td>" + buildData[i].increment + Utility.getHotUpDown(buildData[i].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            } else {
                for (var j = 0, jlen = buildData.length; j < jlen; j++) {
                    buildHtml.push("<tr>");
                    if (data_type == 1) {
                        buildHtml.push("<td>" + ((j + 1) + (pagenum.vnum - 1) * 24) + "</td>");
                    }
                    if (data_type == 2) {
                        buildHtml.push("<td>" + ((j + 1) + (pagenum.snum - 1) * 24) + "</td>");
                    }
                    if (data_type == 3) {
                        buildHtml.push("<td>" + ((j + 1) + (pagenum.fnum - 1) * 24) + "</td>");
                    }
                    buildHtml.push("<td><a href='" + buildType + ".php?name=" + buildData[j].name + "' target='_blank'>" + buildData[j].name + "</a></td>");
                    buildHtml.push("<td>" + (buildData[j].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[j].value + "</td>");
                    //buildHtml.push("<td>" + buildData[j].increment + "</td>");
                    buildHtml.push("<td>" + buildData[j].increment + Utility.getHotUpDown(buildData[j].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            }
        }

        return buildHtml.join('');

    }

    /**
     *排序重新创建表格内容
     */
    function buildSortRankTable(buildData, buildType) {
        var buildHtml = [];
        if (buildData && buildData.length > 0) {
            if (buildType == "stocks" || operate_code == 2) {
                for (var i = 0, len = buildData.length; i < len; i++) {
                    buildHtml.push("<tr>");
                    buildHtml.push("<td>" + ((i + 1) + (1 - 1) * 24) + "</td>");
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].code + "</a></td>");
                    buildHtml.push("<td><a href='stocks.php?stock=" + buildData[i].code + "' target='_blank'>" + buildData[i].name + "</a></td>");
                    buildHtml.push("<td class='" + Utility.getPriceColor(buildData[i].mark_z_d) + "'>" + buildData[i].price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].price_change_ratio * 100).toFixed(2) + '%' + Utility.getHotUpDown(buildData[i].price_change_ratio) + "</td>");
                    buildHtml.push("<td>" + buildData[i].differ_price + "</td>");
                    buildHtml.push("<td>" + (buildData[i].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[i].value + "</td>");
                    buildHtml.push("<td>" + buildData[i].increment + Utility.getHotUpDown(buildData[i].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            } else {
                for (var j = 0, jlen = buildData.length; j < jlen; j++) {
                    buildHtml.push("<tr>");

                    buildHtml.push("<td>" + ((j + 1) + (1 - 1) * 24) + "</td>");

                    buildHtml.push("<td><a href='" + buildType + ".php?name=" + buildData[j].name + "' target='_blank'>" + buildData[j].name + "</a></td>");
                    buildHtml.push("<td>" + (buildData[j].volume / 10000 / 100).toFixed(2) + "</td>");
                    buildHtml.push("<td>" + buildData[j].value + "</td>");
                    buildHtml.push("<td>" + buildData[j].increment + Utility.getHotUpDown(buildData[j].increment) + "</td>");
                    buildHtml.push("</tr>");
                }
            }
        }

        if(sort_opt){
            $("#" + sortid).find("table>tbody").html(buildHtml.join(''));//追加表格内容
        }
    }

    function getHotName(hotNum) {
        switch (hotNum) {
            case "1":
                return "查看热度";
            case "2":
                return "搜索热度";
            case "3":
                return "关注热度";
            default:
                return "未知";
        }
    }

    $("i[data-toggle='popover']").popover({
        container: "body",
        trigger: "hover"
    });
    $(".wk-hot-title").html(decodeURI(rank_name) + "热度情况");
    $(".nav-tabs").delegate("li", "click", function () {
        var dy = $(this).attr("data-type");
        data_type = dy;
        if (dy == 1) {
            if (0 >= $("#view").find("table>tbody").find("tr").length) {
                showData(pagenum.vnum, 1, "view");
            }
        }
        if (dy == 2) {
            if (0 >= $("#search").find("table>tbody").find("tr").length) {
                showData(pagenum.snum, 2, "search");
            }
        }
        if (dy == 3) {
            if (0 >= $("#follow").find("table>tbody").find("tr").length) {
                showData(pagenum.fnum, 3, "follow");
            }
        }
    });
    $('#view_hot_more').click(function () {
        pagenum.vnum = pagenum.vnum + 1;
        if (pagenum.vnum > 5) {
            $(this).hide();
        }
        showData(pagenum.vnum, 1, "view");
    });
    $('#search_hot_more').click(function () {
        pagenum.snum = pagenum.snum + 1;
        if (pagenum.snum > 5) {
            $(this).hide();
        }
        showData(pagenum.snum, 2, "search");

    });
    $('#follow_hot_more').click(function () {
        pagenum.fnum = pagenum.fnum + 1;
        if (pagenum.fnum > 5) {
            $(this).hide();
            return false;
        }
        showData(pagenum.fnum, 3, "follow");
    });


    /**滑动加载*/
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        var cha = scrollHeight - scrollTop - windowHeight;
        /*获取当前对应的选项卡*/
        var type = $(".nav-tabs").find('.active').attr('data-type');
        type = parseInt(type);
        if (cha === 0) {
            if (type == 1) {
                $('#view_hot_more').click();
            }
            if (type == 2) {
                $('#search_hot_more').click();
            }
            if (type == 3) {
                if (cha == 0) {
                    if (type == 1 && request_v === true) {
                        $('#view_hot_more').click();
                    }
                    if (type == 2 && request_s === true) {
                        $('#search_hot_more').click();
                    }
                    if (type == 3 && request_f === true) {
                        $('#follow_hot_more').click();
                    }
                }
            }
        }
    });

    /**
     * 排序1 判断数据是否重复
     * @data 获取当前页码数据
     */
    function buildAllSortData (hot,type,data) {
        var page_arr = [];
        page_arr[1] = 'vnum';
        page_arr[2] = 'snum';
        page_arr[3] = 'fnum';
        var page_key = page_arr[type]; //页码分类
        var tag = hot+''+type;  //hot热度分类(1,2,3,4) type(1查看,2搜索,3关注)
        var temppage = parseInt(pagenum[page_key]); //获取所在页的页码
        if(sort_arr[tag][temppage].length <= 0){
            sort_arr[tag][temppage] = data;
        }
    }

    /**
     * 排序2 获取当前页面所有页码累加的所有数据
     * */
    function getSortData(tag){
        var temp_data = [];
        for (var i = 1; i <= 5 ; i++) {
            if(sort_arr[tag][i]){
                temp_data =temp_data.concat(sort_arr[tag][i]);
            }
        }
        return temp_data;
    }

    /**
     * 点击加载排序
     * */
    $("body").on("click","thead td span",function () {
        sort_opt = $(this).attr('hot-sort');//排序条件
        var tagkey = hot_type+''+data_type;
        var sort_data = getSortData(tagkey);
         sort_type = $(this).attr('sort_type');
        if(sort_type == 'desc'){
            $(this).html('↓').attr('sort_type','ase').addClass('sort_active').parent().siblings().find('span').removeClass('sort_active');
            var data = sort_data.sort(desc_by(sort_opt));
        }else{
            $(this).html('↑').attr('sort_type','desc').addClass('sort_active').parent().siblings().find('span').removeClass('sort_active');
            var data = sort_data.sort(asc_by(sort_opt));
        }
        buildSortRankTable(data,hot_type);//重新绘制排序页码
    });

    /**排序函数(正序) */
    var asc_by = function(name){
        return function(o, p){
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }
    /**排序函数(逆序) */
    var desc_by = function(name){
        return function(o, p){
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a > b ? -1 : 1;
                }
                //return typeof a > typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }


})(jQuery, window, document);