"use strict";
$(function () {
    var thisHost = "http://" + window.location.host + "/";
    var data_type = $('.wk-content').attr('data-type'); //判断是首页还是结果页
    var page = 0;//分页的起始数量
    var searchData = '';//拼接搜索框内容
    var allclear = 0;
    var resultcount = 0;//第一次调回测结果接口
    var initRate; //0 热度趋势图结果为空
    var alldata_s = [];//股票数据
    var url_opt;//二次搜索需要的第一次搜索产生的sessionid
    var no_result;//结果还没返回
    var request_count=0;//请求接口次数
    var sentence_total=[];
         sentence_total[1]=0; //基本面
         sentence_total[3]=0; //技术面
         sentence_total[2]=0;//行情面
         sentence_total[4]=0; //消息面
    var more_1=0;// 首页更多语句类型 1，基本面 2.行情面 3.技术面 4.消息面 5热点事件
    var more_2=0;
    var more_3=0;
    var more_4=0;
    var more_5=0;
    $(".wk-head-search").typeahead({
        minLength: 1,
        maxItem: 20,
        order: "asc",
        hint: true,
        group: true,
        maxItemPerGroup: null,
        backdrop: false,
        dynamic: true,
        filter: false,
        emptyTemplate: '未找到 "{{query}}" 的相关信息',
        display: ["sentence"],
        source: {
            "热点事件": {
                ajax: {
                    url: thisHost + 'ajax/backtest/ajax_search.php',
                    data: {
                        message: '{{query}}'
                    },
                    path: 'events'
                }
            },
            "基本面": {
                ajax: {
                    url: thisHost + 'ajax/backtest/ajax_search.php',
                    data: {
                        message: '{{query}}'
                    },
                    path: 'basic'
                }
            },
            "技术面": {
                ajax: {
                    url: thisHost + 'ajax/backtest/ajax_search.php',
                    data: {
                        message: '{{query}}'
                    },
                    path: 'technology'
                }
            },
            "消息面": {
                ajax: {
                    url: thisHost + 'ajax/backtest/ajax_search.php',
                    data: {
                        message: '{{query}}'
                    },
                    path: 'news'
                }
            },
            "行为热度面": {
                ajax: {
                    url: thisHost + 'ajax/backtest/ajax_search.php',
                    data: {
                        message: '{{query}}'
                    },
                    path: 'hot'
                }
            }
        },
        callback: {
            onResult: function () {
                var search = $('.wk-head-search').val();
                var search_arr = search.split('+');
                backtest.searchCheck({message: search}, null, function (resultData) {
                    if(resultData.checked_sentences){
                        if (resultData.checked_sentences.length != search_arr.length) { //不是完整语句
                            $('.typeahead__result').css("display", " block");
                        } else {
                            $('.typeahead__result').css("display", " none");//完整语句
                        }
                    }
                    searchData = search;
                });
               var input_data= isdate(search);//语句中是否有时间小时
                if(input_data==1){
                    $('.index_time .testfrom,.index_time .testto').attr({"disabled":true});
                }else{
                    $('.index_time .testfrom,.index_time .testto').attr({"disabled":false});
                }
            },
            onClick: function (node, a, item, event) {
                var arr = $('.wk-head-search').val().split('+');
                arr[arr.length - 1] = item.sentence;
                searchData = arr.join('+');
            },
            onClickAfter: function () {
                $('.wk-head-search').val(searchData);
                conditionWord();
            },
            onSubmit: function (node, form, item, event) {
                var testfrom = $('.index_time .testfrom').val();//回测开始时间
                var testto = $('.index_time .testto').val();//回测结束时间
                var search = $('.wk-head-search').val();
                var sentence;//回测条件
                var session;//session id
                backtest.searchCheck({message: search}, null, function (resultData) {
                    if(resultData.status==1){
                        sentence = resultData.checked_sentences;//回测条件
                        if (testfrom && testto) {
                            if(data_type != 'result'){
                                url_opt=-1;//首页搜索
                            }
                            if(url_opt){ //首页搜索或结果页二次搜索(第一次搜索有结果数据)
                                backtest.backtest({
                                    "search": JSON.stringify(sentence),
                                    "base_sessionid":url_opt,
                                    "start_time": testfrom,
                                    "end_time": testto
                                }, null, function (resultData) {
                                    session = resultData.body.bt_session;
                                });
                            }else{//结果页第一次搜索无数据 二次搜索无结果
                                swal({title: "无筛选结果 ", type: "warning", timer: 800, showConfirmButton: false});
                            }

                        } else {
                            swal({title: "请选择回测时间", type: "warning", timer: 800, showConfirmButton: false});
                            $('.clock_time').trigger('click');
                        }
                    }else{
                        if(resultData.result){
                            swal({title: "搜索关键字为空 ", type: "warning", timer: 600, showConfirmButton: false});
                        }else{
                            swal({title: "请输入正确的的回测关键词", type: "warning", timer: 800, showConfirmButton: false});
                        }

                    }

                });
                setTimeout(function () {
                    if (session) {
                        window.open(thisHost + "backtest/result.php?session=" + session, "_blank");
                    }
                }, 500);
                return false;
            }
        }
    });

    /**
     * 判断字符串中是否有时间
     *2016-12-12-12 格式
     */
    function isdate(str){
        var result=str.match(/\d{4}[-]\d{1,2}[-]\d{1,2}[-]\d{1,2}/);//第一个时间
        if(result==null) {
            return false;
        }else{
            return 1;
        }

    }

    /**
     * 初始化热度趋势
     */
    function initRateLine() {
        var session = getUrlParam('session');
        var rateLine = echarts.init(document.getElementById("wk-rate-line-pic"));
        backtest.getRateLine({sessionid: session}, function () {
            $('.right_yield').hide();
        }, function (resultData) {
            if (resultData.body) {
                if (resultData.body.list.length != 0) {
                    $('.right_yield').show();
                }
                common.buildRateLine("成分股", '', resultData);
                rateLine.hideLoading();
                initRate = 1;
            } else {
                initRate = 0;
            }
        });
    }

    /**
     * 点击回测时间
     */
    $('.clock_time').on('click', function () {
        var display = $('.index_time').css('display');
        if (display == 'block') {
            $('.index_time').hide();
        } else {
            $('.index_time').show();
        }
        $(document).bind("click", function (e) { //点击空白处下拉框消失
            var target = $(e.target);
            if (target.closest(".typeahead__container").length == 0) {
                $('.index_time').hide();
            }
        });
    });


    /**
     * 点击搜索框x号后 语句已选条件与搜索框联动清空
     */
    $('.wk-head-search').mousemove(function () {
        var clear = $('.typeahead__container').hasClass('cancel');
        if (!clear) { //当内容为空或者点击x好后
            allclear = 1;
        }
        var search = $('.wk-head-search').val();
        if (!search) {
            $('.index_recommend li').attr('data-type', '0').removeClass('word_active');
        }


    });

    /**
     *  手动改变搜索框内容,语句与已选条件联动
     */
    $('.wk-head-search').on('input propertychange', function () {
        conditionWord();
    });

    /*语句与已选条件联动*/
    function conditionWord() {
        var input_content = $('.wk-head-search').val();
        var tags_arr = exist_tags_arr();
        if (input_content && tags_arr) {
            var input_arr = input_content.split('+');
            var x;
            for (x in tags_arr) {
                var val = tags_arr[x];
                if (in_array(val, input_arr)) {
                    $(".index_recommend li[data-index='" + x + "']").addClass('word_active').attr('data-type', '1');
                } else {
                    $(".index_recommend li[data-index='" + x + "']").removeClass('word_active').attr('data-type', '0');
                }
            }
        }
    }

    /*判断是否存在*/
    function in_array(search, array) {
        for (var i in array) {
            if (array[i] == search) {
                return true;
            }
        }
        return false;
    }

    /*获取已经存在的标签*/
    function exist_tags_arr() {
        var obj = $('.index_recommend li span,.left li span');
        var arr = [];
        if (obj.length) {
            for (var i = 0; i < obj.length; i++) {
                var text = obj.eq(i).text();
                var key = obj.eq(i).parent().data('index');
                arr[key] = text;
            }
        }
        return arr;
    }

    /**
     * 构造首页页面
     */
    function buildIndexHtml() {
        var unix_time=Date.parse(new Date())-24*3600*1000;//当前日期前一天
        var time=Utility.unixToDate2(unix_time);//转换为日期
        $('.index_time .testfrom').val(time);
        $('.index_time .testto').val(time);
        getSentence('5', '7', 'index-ul-new');//最热语句
        getSentence('1', '7', 'index-ul-hot');//热点事件
        getSentence('2', '7', 'index-ul-classic');//经典语句
        getMoreSentence('1','','8','detail-ul-basic');//对应接口的flag, pos,count, attr_selector 基础面
        getMoreSentence('3','','8','detail-ul-tec');//技术面
        getMoreSentence('2','','8','detail-ul-industry');//行情面
        getMoreSentence('4','','8','detail-ul-news');//消息面
        getMoreSentence('5','','8','detail-ul-events');//热点事件
    }

    /**
     * 构造结果页面
     */
    function buildResultHtml() {
        getSentence('1', '7', 'result-ul-hot');//热点事件
        getSentence('5', '7', 'result-ul-new');//最热语句
        getSentence('2', '7', 'result-ul-classic');//经典语句
        $('.right_industry').append(common.getLoading());//加载动画
        setTimeout(function () {
                initRateLine();//收益率折线图
                getStock(0, 10); //股票信息列表
                scrolLoad(); //滚动与点击加载
                $('.right_yield').removeClass('dis_none')
            }
            , 1000); //1秒后执行
    }

    function in_array(search, array) {
        for (var i in array) {
            if (array[i] == search) {
                return true;
            }
        }
        return false;
    }

    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    /**
     * 调回测结果接口 获取股票信息
     */
    function getStock(p, c) {
        var session = getUrlParam('session');
        var session = getUrlParam('session');
        if (session) {
            var stockHtml = [];//股票表格
            var rigth_condition = [];//右边已选条件
            backtest.backtestResult({'session': session, 'pos': p, 'count': c}, function () {
                if (initRate) { //当热度趋势图有数据或第一次加载结果结果时
                    $(".dataload").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
                }
            }, function (resultData) {
                console.log(resultData)
                if(!resultData.body.end_time){//1秒定时结束结果还没返回
                    if(request_count>=10){   //接口调三次还没结果 默认sessionid失效
                        window.open(thisHost , "_self");//调10次接口还没结果返回
                    }else{
                        setTimeout(function () {
                                no_result=1;
                                getStock();
                                initRateLine();
                                request_count++;//请求接口次数
                            },1000); //1秒后执行
                    }
                }else {
                    if(no_result){
                        p=0;
                        no_result=0;
                    }
                    $('.right_content_title,.table-responsive,.dataload').removeClass('dis_none');
                    $('.right_industry').append(common.hideLoading());//加载动画
                    var stockData = resultData.body.stocks;
                    alldata_s = alldata_s.concat(stockData);//显示的所有股票数据

                    $('.testfrom').val(resultData.body.start_time);//开始时间
                    $('.testto').val(resultData.body.end_time);//结束时间
                    $('.right_stock_num span').html(resultData.body.count);//股票数

                    //右侧已选条件
                    if (resultData.body.right_sentence.length > 0) {
                        var input_cont;//搜索框显示回测正确语句
                        for (var i = 0; i < resultData.body.right_sentence.length; i++) { //结果页右侧已选条件
                            rigth_condition.push('<li>' + resultData.body.right_sentence[i] + '</li>');
                            if (input_cont) {
                                input_cont = input_cont + '+' + resultData.body.right_sentence[i];
                            } else {
                                input_cont = resultData.body.right_sentence[i];
                            }
                        }
                        // $('.wk-head-search').val(input_cont);//搜索框为正确语句
                        rigth_condition.push('<div class="clear"></div>');
                        $('.right_condition ul').html(rigth_condition.join(""));
                    }
                    //错误语句
                    if (resultData.body.wrong_sentence.length) {
                        if (resultcount == 0) {
                            var wrongHtml = [];
                            var content = resultData.body.wrong_sentence.join(' , ');
                            wrongHtml.push("<ul class='wrongsentence' style='text-align: center;margin:0 auto'>");
                            for (var j = 0; j < resultData.body.wrong_sentence.length; j++) {
                                wrongHtml.push("<li>" + resultData.body.wrong_sentence[j] + "</li>");
                            }
                            wrongHtml.push("<div class='clear'></div> </ul>");
                            swal({
                                title: "以下条件不符合筛选规则",
                                type: "warning",
                                text: content,
                                timer: 1200,
                                showConfirmButton: false
                            }, function () {
                                window.open(thisHost , "_self");
                            });
                            $('.sweet-alert p').html(wrongHtml.join('')).parent().css('width', '555px');
                            resultcount = 1;
                        }
                    }
                    if (resultData.body.stocks.length) {
                        if (resultData.body.stocks.length == resultData.body.count) { //如果股票数<=10 显示导出数据
                            $('.right_resolve_data,.dataload').removeClass('dis_none');
                            $('.dataload').addClass('dis_none');
                        }
                        for (var i = 0; i < stockData.length; i++) {
                            stockHtml.push('<tr><td>' + (i + p + 1) + '</td><td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+stockData[i].symbol+'&uid='+stockData[i].uid+'&token='+stockData[i].token+'" target="_blank">' + stockData[i].symbol + '</a></td><td>' + stockData[i].name + '</a></td><td class="' + Utility.getPriceColor(stockData[i].changepercent) + '">' + stockData[i].trade + '</td><td class=" ' + Utility.getPriceColor(stockData[i].changepercent) + '">' + stockData[i].changepercent.toFixed(2) + '%</td><td>' + parseInt(stockData[i].volume / 10000) + '万</td><td>' + stockData[i].amount.toFixed(2) + '</td><td>' + stockData[i].bordname + '</td></tr>');
                        }
                        $('.right_industry_table tbody').append(stockHtml.join(""));
                        $(".dataload").html('<div class="click_more">点击加载</div>');
                        $('#table1 tbody').append(stockHtml.join(""));//导出表格
                        url_opt = Utility.getUrlParam('session');//结果页url的参数 sessionid
                    } else {
                        if (alldata_s.length) {
                            $('.right_resolve_data,.dataload').removeClass('dis_none');
                            $('.dataload').addClass('dis_none');
                        } else {
                            $('.dataload').html('');
                            $('.right_industry').html('<div style="width：100%;height:100px;line-height:100px;text-align:center"><img src="../../static/imgs/backtest/message.png" width="30px;">&nbsp;&nbsp;抱歉，没有选出相关的股票，请检查输入是否正确 </div>');
                        }
                    }

                }

            });
        }
    }

    /**
     * 重构排序页面
     */
    function buildSortRankTable(buildData) {
        var stockData = buildData;
        console.log(stockData);
        var stockHtml = [];
        for (var i = 0; i < stockData.length; i++) {
            stockHtml.push('<tr><td>' + (i + 1) + '</td><td><a href="http://t.stock.iwookong.com/ajax/login/nologin.php?stock='+stockData[i].symbol+'&uid='+stockData[i].uid+'&token='+stockData[i].token+'" target="_blank">' + stockData[i].symbol + '</a></td><td>' + stockData[i].name + '</a></td><td class="' + Utility.getPriceColor(stockData[i].changepercent) + '">' + stockData[i].trade + '</td><td class=" ' + Utility.getPriceColor(stockData[i].changepercent) + '">' + stockData[i].changepercent.toFixed(2) + '%</td><td>' + parseInt(stockData[i].volume / 10000) + '万</td><td>' + stockData[i].amount.toFixed(2) + '</td><td>' + stockData[i].bordname + '</td></tr>');
        }
        $('.right_industry_table tbody').html(stockHtml.join(""));
        $(".dataload").html('<div class="click_more">点击加载</div>');
        $('#table1 tbody').html(stockHtml.join(""));//导出表格
    }

    /**
     * 调回测语句接口 获取语句
     * @html
     * @flag类型 1，热点事件 2.经典语句 3.推荐语句 4.最新语句 5.最热语句 0 全部
     * @count 数量
     * @attr_selector 标签属性与li的class
     */
    function getSentence(flag, count, attr_selector) {
        var html = [];
        backtest.getSentence({flag: flag, count: count}, function () {
            $("." + attr_selector).html("<div class='sentence_load'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
        }, function (resultData) {
            if(resultData.head.status != -103){
                if (resultData.body.sentences[0]) {
                    var data = resultData.body.sentences[0][flag];
                    for (var i = 0; i < data.length; i++) {
                        if(flag==1){
                            html.push('<li data-type="0" data-index="' + attr_selector + '-' + i + '"><span>' + data[i].sentence + '</span><i class="fa tip_time">开始时间：'+Utility.unixToDate2(data[i].create_time)+'，结束时间：'+Utility.unixToDate2(data[i].end_time)+'</i></li>');
                        }else{
                            html.push('<li data-type="0" data-index="' + attr_selector + '-' + i + '"><span>' + data[i].sentence + '</span></li>');
                        }
                    }
                    $('.' + attr_selector).find('.sentence_load').html('').removeClass('sentence_load');
                    $('.' + attr_selector).append(html.join(""));
                } else {
                    $("." + attr_selector).html("<div style='text-align:center'>暂无数据</div>");
                }
            }

        });
    };

    /**
     * 调回测语句更多接口 获取更多的语句
     * @html
     * @flag类型 1，基本面 2.行情面 3.技术面 4.消息面 5热点事件
     * @pos 起始位置
     * @count 数量
     * @attr_selector 标签属性与li的class
     */
    function getMoreSentence(flag, pos, count, attr_selector){
        var html = [];
        backtest.getMoreSentence({flag: flag, after_sentence:pos, count: count}, function () {
            $("." + attr_selector).append("<div class='sentence_load'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
            $("." + attr_selector).next().hide();
        }, function (resultData) {
            if(resultData.head.status != -103){
                if (resultData.body.sentences[0]) {
                    $("." + attr_selector).next().show();//显示下拉符号
                    var data = resultData.body.sentences[0][flag];
                    sentence_total[flag]=sentence_total[flag]+data.length;//对应类型已显示出的数据条数
                    for (var i = 0; i < data.length; i++) {
                        if(flag==1){
                            html.push('<li data-type="0" data-index="' + attr_selector + '-' + more_1 + '"><span>' + data[i].sentence + '</span></li>');
                            more_1++;
                        }else if(flag==2){
                            html.push('<li data-type="0" data-index="' + attr_selector + '-' + more_2 + '"><span>' + data[i].sentence + '</span></li>');
                            more_2++;
                        }else if(flag==3){
                            html.push('<li data-type="0" data-index="' + attr_selector + '-' + more_3 + '"><span>' + data[i].sentence + '</span></li>');
                            more_3++;
                        }else if(flag==4){
                            html.push('<li data-type="0" data-index="' + attr_selector + '-' + more_4 + '"><span>' + data[i].sentence + '</span></li>');
                            more_4++;
                        }else if(flag==5){
                            html.push('<li data-type="0" data-index="' + attr_selector + '-' + more_5 + '"><span>' + data[i].sentence + '</span></li>');
                            more_5++;
                        }
                    }
                    $('.' + attr_selector).find('.sentence_load').html('').removeClass('sentence_load');//加载中动画不显示
                    $("." + attr_selector).find('.clear').before(html.join(""));

                    if(resultData.body.sentences[0]['totals']==sentence_total[flag]){ //当数据加载完
                       $("." + attr_selector).next().hide();//下拉符号消失
                    }
                } else {
                    $("." + attr_selector).html("<div style='text-align:center'>暂无数据</div>");
                }
            }

        });
    };

    /**
     * 首页
     * 点击加载更多语句
     * */
    $('.detail_type_more').on('click',function(){
        var type=$(this).attr('data-click-type');
        var pos= $(this).prev().find('li span').last().html();
        var attr_selector=$(this).prev().attr("class");
        getMoreSentence(type,pos,8,attr_selector);
    });

    /**
     * 结果页
     * 滑动加载 与点击加载更多
     * */
    function scrolLoad() {
        $(window).scroll(function () {
            var $this = $(this);
            var scrollTop = $this.scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $this.height();
            var cha = scrollHeight - scrollTop - windowHeight;
            if (cha === 0) {
                page = page + 10;
                getStock(page, 10);
            }
        });
        $('body').on("click", ".click_more", function () {
            page = page + 10;
            getStock(page, 10);
        });
    }


    /**
     * 导出数据
     */
    function exportTable() {
        var $exportLink = document.getElementById('export');
        $exportLink.addEventListener('click', function (e) {
            e.preventDefault();
            tableExport('table1', '回测平台', e.target.getAttribute('data-type'));

        }, false);
    }

    /**
     * 推荐语句点击与搜索框联动
     */
    var all_data = ''; //初始化搜索框内容
    $('body').on("click", ".index_recommend li,.left li", function () {
        var word_type = $(this).attr('data-type');
        var content = $(this).find('span').html();
        var search = $('.wk-head-search').val();
        //点击语句 语句与搜索框联动
        if (word_type == 0) { //语句未被点击过
            if (search == '') {
                all_data = content;
            } else {
                all_data = search + '+' + content;
            }
            $(this).attr('data-type', '1').addClass('word_active');
        } else {
            all_data = search;//与搜索框保持一致
            var data_arr = all_data.split('+');
            data_arr = $.grep(data_arr, function (value) { //去除数组指定的值
                return value != content;
            });
            all_data = data_arr.join('+');
            $(this).attr('data-type', '0').removeClass('word_active');
            searchData = all_data;
            // i--;
        }
        $('.wk-head-search').val(all_data); //点击左边推荐语句与搜索框内容一致
        $('.wk-head-search').trigger('input');//触发typehead插件

    });

    /**
     * 根据点击字段名称排序
     */
    $("body").on("click", ".right thead td span", function () {
        var sortdata;
        var sort_type = $(this).attr('data-sort-type'); //desc asc
        var sort_opt = $(this).attr('data-hot-sort'); //排序名称
        if (sort_type == 'desc') {
            $(this).html("<img src='/static/imgs/i/icon_desc.png'>").attr('data-sort-type', 'ase').parent().siblings().find('span');
            sortdata = alldata_s.sort(desc_by(sort_opt));
        } else {
            $(this).html("<img src='/static/imgs/i/icon_asc.png'>").attr('data-sort-type', 'desc').parent().siblings().find('span');
            sortdata = alldata_s.sort(asc_by(sort_opt));
        }

        buildSortRankTable(sortdata);//加载排序页码
    });

    /**
     * 逆序排序函数
     */
    var desc_by = function (name) {
        return function (o, p) {
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
                return typeof a > typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }
    /**
     * 正序排序函数
     */
    var asc_by = function (name) {
        return function (o, p) {
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


    //修改已选时间时 搜索框时间与其同步
    $('.right .testfrom,.right .testto').on('focus', function () {
        var newFromTime = $('.right .testfrom').val();
        var newToTime = $('.right .testto').val();
        $('.wk-header .testfrom').val(newFromTime);
        $('.wk-header .testto').val(newToTime);
    })


    //点击首页更多 加载更多语句
    $('.index_more').on('click', function () {
        $('.detail_sentence').show();
        $('.index_sentence').hide();
    });
    //点击结果页返回 返回首页语句
    $('.detail_back').on('click', function () {
        $('.index_sentence').show();
        $('.detail_sentence').hide();
    });

    //事件提示
    $("body").on("mouseover", ".index-ul-hot li,.result-ul-hot li", function () {
        $(this).find('i').show();
    });
    $("body").on("mouseout", ".index-ul-hot li,.result-ul-hot li", function () {
        $(this).find('i').hide();
    });

    if (data_type == 'result') {
        buildResultHtml();
        exportTable();
    } else {
        buildIndexHtml();
    }
});
