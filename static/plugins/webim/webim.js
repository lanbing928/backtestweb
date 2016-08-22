"use strict";
(function ($, window, document) {
    // var userid=$('.wk-release').attr('data-userid');
    var userid = 9999;
    /**
     * 获取全部发布信息
     */
    var page_all = 1; //初始页码
    var limit_all = 1; //每页的数目
    var page_own = 1; //初始页码
    var limit_own = 1; //每页的数目

    /*页面初始化*/
    function init() {
        getInterfaceData(0); //全部数据
        getInterfaceData(1); //个人数据
    }

    //在页面中追加数据，传入想对应的数据，以及需要在那个div下追加数据
    function buildDatatoHtml(list, div_id) {
        if (list.length) {
            var infoHtml = [];
            /*数组日期已经处理*/
            for (var i = 0; i < list.length; i++) {
                var stock = list[i].stock;
                var new_stock = stock.split(',');

                /*判断是否是每一天的第一条数据*/
                if (list[i].is_ymd) {
                    infoHtml.push(' <div class="date">' + list[i].is_ymd + '<div class="circle"></div></div>');
                }
                infoHtml.push('<div class="one_msg">');
                infoHtml.push('<div class="time fl">' + list[i].show_time + '<div class="circle"></div></div>');
                infoHtml.push('<div class="release_usericon fl"></div>');
                infoHtml.push('<div class="release_content fl">');
                infoHtml.push('<div class="content_user">' + list[i].user_name);
                if (list[i].user_id == userid) {
                    if (list[i].is_end == 1) {
                        infoHtml.push('<span class="release_end">已结束</span>');
                    } else {
                        infoHtml.push('<div class="click_end_release"><i class="glyphicon glyphicon-menu-down release_own"><div class="release_own_end" data-task-id="' + list[i].task_id + '">结束发布</div></i></div>');
                    }
                } else {
                    if (list[i].is_end == 1) {
                        infoHtml.push('<span class="release_end">已结束</span>');
                    }
                }
                infoHtml.push('<div class="content_main">');
                infoHtml.push('<div class="content_main_text">' + list[i].message + '</div>');
                infoHtml.push('<div class="content_support" data-support-taskid="' + list[i].task_id + '">');
                if (list[i].self_follow == 0) { //无状态
                    infoHtml.push('<span class="support"><img src="../static/plugins/webim/imgs/icon_add_unselect.png" width="15px">&nbsp;跟 ( <span class="follow_num">' + list[i].follow_num + '</span> )</span>&nbsp;&nbsp; <span class="nosupport"><img src="../static/plugins/webim/imgs/icon_noadd_unselect.png" width="15px">&nbsp;不跟(  <span class="unfollow_num">' + list[i].not_follow_num + '</span> ) </span>&nbsp;');
                } else if (list[i].self_follow == 1) { //跟
                    infoHtml.push('<span class="follow_select"><img src="../static/plugins/webim/imgs/icon_add_select.png" width="15px">&nbsp;跟 ( ' + list[i].follow_num + ' )</span>&nbsp;&nbsp; <span class="nosupport"><img src="../static/plugins/webim/imgs/icon_noadd_unselect.png" width="15px">&nbsp;不跟(  <span class="unfollow_num">' + list[i].not_follow_num + '</span> ) </span>&nbsp;');
                } else if (list[i].self_follow == 2) {  //不跟
                    infoHtml.push('<span class="support"><img src="../static/plugins/webim/imgs/icon_add_unselect.png" width="15px">&nbsp;跟 (  <span class="follow_num">' + list[i].follow_num + '</span> )</span>&nbsp;&nbsp; <span class="follow_select"><img src="../static/plugins/webim/imgs/icon_noadd_select.png" width="15px">&nbsp;不跟( ' + list[i].not_follow_num + ' ) </span>&nbsp;');
                }
                infoHtml.push('</div></div>');
                infoHtml.push('<div class="content_bottom"><span class="stock">股票：</span><span class="stock_name">');
                for (var j = 0; j < new_stock.length; j++) {
                    if (j % 2 == 0) {
                        infoHtml.push('<span class="span_ou" style="#color:#A9080E;">' + new_stock[j] + '</span>&nbsp;');
                    } else {
                        infoHtml.push('<span class="span_ji" style="color:#2A6F52;">' + new_stock[j] + '</span>&nbsp;');
                    }
                }
                infoHtml.push('</span></div>');
                infoHtml.push('</div><div class="clear"></div></div></div>');
            }
            $("#" + div_id + " .get_release_content").append(infoHtml.join(''));
        }
    }

//获取从接口获得的数据 0:全部，1为我的  @is_build 0:不画图,1:画图
    function getInterfaceData(type) {
        if (type == 0) { //全部信息
            //调用接口，得到结果
            // webim.getReleaseInfo({"query_type" : "alltask"}, function() {
            //     $("#release_own_info .all_content").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
            // }, function (resultData) {
            //     console.log(resultData);
            //     //进行数据处理
            //     if(resultData.status == 1 && resultData.result.length ){
            //         var data_all = getNewArr(resultData.result);
            //         var data_all_pape = getFirstPageContent(page_all,limit_all,data_all);
            //
            //         if(data_all_pape.length <=0){
            //             $("#release_all_info .reload_more").hide(); //没有数据
            //         }
            //
            //         buildDatatoHtml(data_all_pape,"release_all_info");
            //     }
            //
            // });

            var resultData = {
                "result": [
                    {
                        "task_id": 123,
                        "user_id": 9999,
                        "time": 1403699534,
                        "user_name": "admin-招商证券",
                        "message": "task1333",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 0,
                        "is_end": 0
                    },
                    {
                        "task_id": 123,
                        "user_id": 1,
                        "time": 1403699534,
                        "user_name": "admin-招商证券",
                        "message": "task1",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 1,
                        "is_end": 0
                    },
                    {
                        "task_id": 123,
                        "user_id": 1,
                        "time": 1403699534,
                        "user_name": "admin-招商证券",
                        "message": "task1",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 2,
                        "is_end": 1
                    },

                    {
                        "task_id": 123,
                        "user_id": 1,
                        "time": 1403299534,
                        "user_name": "admin-招商证券",
                        "message": "task1",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 0,
                        "is_end": 1
                    },
                    {
                        "task_id": 123,
                        "user_id": 2,
                        "time": 1403149534,
                        "user_name": "admin-招商证券",
                        "message": "task1",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 0,
                        "is_end": 1
                    }, {
                        "task_id": 125,
                        "user_id": 2,
                        "time": 1403149534,
                        "user_name": "pufa-浦发银行",
                        "message": "task2",
                        "stock": "万科A,宁波银行",
                        "follow_num": 30,
                        "not_follow_num": 8,
                        "self_follow": 1,
                        "is_end": 0
                    }, {
                        "task_id": 125,
                        "user_id": 2,
                        "time": 1403149534,
                        "user_name": "pufa-浦发银行",
                        "message": "task2",
                        "stock": "万科A,宁波银行",
                        "follow_num": 30,
                        "not_follow_num": 8,
                        "self_follow": 1,
                        "is_end": 0
                    }, {
                        "task_id": 125,
                        "user_id": 2,
                        "time": 1403149534,
                        "user_name": "pufa-浦发银行",
                        "message": "task2",
                        "stock": "万科A,宁波银行",
                        "follow_num": 30,
                        "not_follow_num": 8,
                        "self_follow": 1,
                        "is_end": 0
                    }, {
                        "task_id": 125,
                        "user_id": 2,
                        "time": 1403069534,
                        "user_name": "pufa-浦发银行",
                        "message": "task2",
                        "stock": "万科B,徐州银行",
                        "follow_num": 30,
                        "not_follow_num": 8,
                        "self_follow": 1,
                        "is_end": 1
                    }],
                "status": 1
            }
            if (resultData.status == 1 && resultData.result.length) {
                var data_all = getNewArr(resultData.result);
                var data_all_pape = getFirstPageContent(page_all, limit_all, data_all);

                if (data_all_pape.length <= 0) {
                    $("#release_all_info .reload_more").hide(); //没有数据
                }

                buildDatatoHtml(data_all_pape, "release_all_info");
            }
        }

        if (type > 0) { //个人的信息
            // webim.getReleaseInfo({"query_type" : "mytask"}, function() {
            //     $("#release_own_info .own_content").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
            // }, function (resultData) {
            //     //进行数据处理
            //     if(resultData.status == 1 && resultData.result.length ){
            //         var data_own = getNewArr(resultData.result);
            //         var data_own_pape = getFirstPageContent(page_own,limit_own,data_own);
            //
            //         if(data_own_pape.length <=0){
            //             $("#release_own_info .reload_more").hide(); //没有数据
            //         }
            //
            //         buildDatatoHtml(data_own_pape,"release_own_info");
            //     }
            //
            // });

            var resultData = {
                "result": [
                    {
                        "task_id": 123,
                        "user_id": 1,
                        "time": 1403699534,
                        "user_name": "admin-招商证券",
                        "message": "task1",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 2,
                        "is_end": 1
                    },

                    {
                        "task_id": 123,
                        "user_id": 1,
                        "time": 1403299534,
                        "user_name": "admin-招商证券",
                        "message": "task1",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 0,
                        "is_end": 1
                    },
                    {
                        "task_id": 123,
                        "user_id": 2,
                        "time": 1403149534,
                        "user_name": "admin-招商证券",
                        "message": "task1",
                        "stock": "山东黄金,四川长虹",
                        "follow_num": 20,
                        "not_follow_num": 5,
                        "self_follow": 0,
                        "is_end": 1
                    }],
                "status": 1
            }
            if (resultData.status == 1 && resultData.result.length) {
                var data_own = getNewArr(resultData.result);
                var data_own_pape = getFirstPageContent(page_own, limit_own, data_own);

                if (data_own_pape.length <= 0) {
                    $("#release_own_info .reload_more").hide(); //没有数据
                }

                buildDatatoHtml(data_own_pape, "release_own_info");
            }


        }
    }


//获取前几页的数据内容
    function getPageContent(page, limit, arr) {
        var start = (page - 1) * limit;
        var page_arr = [];
        if (arr.length <= start) {
            return page_arr; //如果没有数据返回空
        }
        if (arr.length > start) {
            if (arr.length - start < limit) {
                limit = arr.length - start;
            }

            for (var i = 0; i < start + limit; i++) {
                page_arr[i] = arr[i];
            }
            ;
        }
        return page_arr;
    }

//获取每个分页的内容
    function getFirstPageContent(page, limit, arr) {

        var start = (page - 1) * limit;
        var page_arr = [];

        if (arr.length <= start) {
            return page_arr; //如果没有数据返回空
        }
        if (arr.length > start) {
            if (arr.length - start < limit) {
                limit = arr.length - start;
            }
            var j = 0;
            for (var i = start; i < start + limit; i++) {

                page_arr[j] = arr[i];
                j++;
            }
            ;
        }
        return page_arr;

    }

//遍历指定的数据,在原来的数据中，添加两个字段
    function getNewArr(arr) {
        var date_arr = [];
        for (var i = 0; i < arr.length; i++) {
            var date = getYmd(arr[i]['time']);
            var His = getHis(arr[i]['time']);
            if (!in_array(date, date_arr)) {
                date_arr.push(date);
                arr[i]['show_time'] = His;
                arr[i]['is_ymd'] = date;  //是 每日的第一条数据
            } else {
                arr[i]['show_time'] = His;
                arr[i]['is_ymd'] = 0; // 不是每一条的数据
            }

        }
        return arr;
    }

//时间戳转换成八位日期2014-05-05
    function getYmd(time) {
        var myDate = new Date(time * 1000);
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = myDate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    }


//时间戳转换成6位时间10:10:00
    function getHis(time) {
        var myDate = new Date(time * 1000);
        var hours = myDate.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        var minutes = myDate.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var second = myDate.getSeconds();
        if (second < 10) {
            second = '0' + second;
        }
        return hours + ':' + minutes + ':' + second;
    }

//某个值是否在数组中存在，数组是一维数组
    function in_array(search, array) {
        for (var i in array) {
            if (array[i] == search) {
                return true;
            }
        }
        return false;
    }

    /**
     * 点击获取历史记录
     * */
    $('body').on('click', '.release_ul li ', function () {
        var type = $(this).find('a').attr('href');
        if (type == '#release_all_info') {
            $("#release_all_info").show();
            $("#release_own_info").hide();

        } else if (type == '#release_own_info') {
            $("#release_all_info").hide();
            $("#release_own_info").show();
        }
    });

    /**
     * 点击加载更多
     * */
    $('body').on('click', '#release_all_info .reload_more', function () {
        page_all++;
        getInterfaceData(0);

    });
    $('body').on('click', '#release_own_info .reload_more', function () {
        page_own++;
        getInterfaceData(1);
    });

    /**
     * 发布
     * */
    $('body').on('click', '.release_info', function () {
        var message = $('.release_frame textarea').val();
        webim.setReleaseInfo({"message": message});
        window.location.reload()
    });

    /**
     * 结束发布
     * */
    $('body').on('mouseleave', '.release_own_end', function () {
        var taskid = $(this).attr('data-task-id');
        // webim.setReleaseInfo({"task_id": taskid}, null, function(resultDate){
        //     if(resultData.status && resultData.result.length){
        $('.click_end_release').html('<span class="release_end">已结束</span>');
        //     }
        // });
    });
    $('body').on('click', '.release_own', function () {
        $('.release_own_end').show();
    });
    $('body').on('mouseleave', '.release_own', function () {
        $('.release_own_end').hide();
    });


    /**
     * 跟
     * */
    $('body').on('click', '.support', function () {
        var taskid = $(this).parent().attr('data-support-taskid');
        alert(taskid);
        if (!$(this).siblings().hasClass('follow_select')) {
            // webim.follow({"follow":1,"task_id":taskid},null,function(resultData){
            //     if(resultData.status == 1){
            var html = parseInt($(this).find('.follow_num').html()) + 1;
            $(this).addClass('follow_select').find('img').attr('src', '../static/plugins/webim/imgs/icon_add_select.png');
            $(this).find('.follow_num').html(html).removeClass('follow_num');
            //     }
            // });
        }

    });

    /**
     * 不跟
     * */
    $('body').on('click', '.nosupport', function () {
        var taskid = $(this).parent().attr('data-support-taskid');
        if (!$(this).siblings().hasClass('follow_select')) {
            // webim.follow({"follow":0,"task_id":taskid},null,function(resultData){
            //     if(resultData.status == 1){
            var html = parseInt($(this).find('.unfollow_num').html()) + 1;
            $(this).addClass('follow_select').find('img').attr('src', '../static/plugins/webim/imgs/icon_noadd_select.png');
            $(this).find('.unfollow_num').html(html).removeClass('unfollow_num');
            //     }
            // });
        }
        webim.follow({"follow": 2});
    });

    init();
})(jQuery, window, document);