"use strict";
(function ($, window, document) {
    // var userid=$('.wk-release').attr('data-userid');
    var userid = 9999;
    var page_all = 1; //初始页码
    var limit_all = 2; //每页的数目
    var page_own = 1; //初始页码
    var limit_own = 2; //每页的数目
    var data_own;
    var data_all;

    /*页面初始化*/
    function init() {
        getInterfaceData(0); //全部数据
        getInterfaceData(1); //个人数据
    }

    /**
     * 在页面中追加数据
     * @list 对应的数据
     * @div_id 追加到的对应id
     */
    function buildDatatoHtml(list, div_id) {
        if (list.length) {
            var infoHtml = [];
            /*数组日期已经处理*/
            for (var i = 0; i < list.length; i++) {
                var stock = list[i].stock;
                // var increment = list[i].increment;
                var new_stock = stock.split(',');
                // var new_increment = increment.split(',');

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
                infoHtml.push('</div><div class="content_main">');
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
                    // infoHtml.push('<span class="' + Utility.getPriceColor(parseInt(new_increment[j])) + '">' + new_stock[j] + '</span>&nbsp;');
                    infoHtml.push('<span>' + new_stock[j] + '</span>&nbsp;');
                }
                infoHtml.push('</span></div>');
                infoHtml.push('</div><div class="clear"></div></div></div>');
            }
            // $("#" + div_id + " .get_release_content").html(infoHtml.join(''));
            $("#" + div_id + " .get_release_content").append(infoHtml.join(''));
            clickEvent();
        }
    }

    /*从接口获得数据 0:全部，1为我的*/
    function getInterfaceData(type) {
        if (type == 0) { //全部信息
            //调用接口，得到结果
            webim.getReleaseInfo({"query_type" : "alltask"}, function() {
                $("#release_own_info .all_content").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
            }, function (resultData) {
                console.log(resultData);
                //进行数据处理
                if (resultData.status == 1 && resultData.result.length) {
                    data_all = getNewArr(resultData.result);
                    var data_all_pape = getFirstPageContent(page_all, limit_all, data_all);
                    buildDatatoHtml(data_all_pape, "release_all_info");
                }
            });
        }

        if (type > 0) { //个人的信息
            webim.getReleaseInfo({"query_type" : "mytask"}, function() {
                $("#release_own_info .own_content").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
            }, function (resultData) {
                //进行数据处理
                // if(resultData.status == 1 && resultData.result.length ){
                //     var data_own = getNewArr(resultData.result);
                //     var data_own_pape = getFirstPageContent(page_own,limit_own,data_own);
                //     if(data_own_pape.length <=0){
                //         $("#release_own_info .reload_more").hide(); //没有数据
                //     }
                //     buildDatatoHtml(data_own_pape,"release_own_info");
                // }
                if (resultData.status == 1 && resultData.result.length) {
                    data_own = getNewArr(resultData.result);
                    var data_own_pape = getFirstPageContent(page_own, limit_own, data_own);
                    buildDatatoHtml(data_own_pape, "release_own_info");
                }

            });
        }
    }


    /*获取分页的内容 替换*/
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
        }
        return page_arr;
    }

    /* 获取分页的内容 追加*/
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
        }
        return page_arr;
    }

    /*遍历指定的数据,在原来的数据中，添加两个字段(日期和时间)*/
    function getNewArr(arr) {
        var date_arr = [];
        for (var i = 0; i < arr.length; i++) {
            var date = Utility.getYmd(arr[i]['time']);
            var His = Utility.getHis(arr[i]['time']);
            if (!Utility.in_array(date, date_arr)) {
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

    /**
     * 发布
     * */
    $('.release_info').click(function () {
        var message = $('.release_frame textarea').val();
        webim.setReleaseInfo({"message": message}, function () {
            $('.release_ing').html('<i class="fa fa-refresh fa-spin"></i>&nbsp;发送中...&nbsp;&nbsp;');
        }, function (resultDate) {
            if (resultDate.status == 1) {
        page_all=page_all-1;
        getInterfaceData(0);
        window.location.reload();
            } else {
                swal("发送失败");
            }
        });

    });

    /**
     * 点击加载更多
     * */
    $('#release_all_info .reload_more').click(function () {
        page_all++;
        // getInterfaceData(0);
        var data_all_pape = getFirstPageContent(page_all, limit_all, data_all);
        if (data_all_pape.length <= 0) {
            $("#release_all_info .reload_more").hide(); //没有数据
        }
        buildDatatoHtml(data_all_pape, "release_all_info");
    })
    $('#release_own_info .reload_more').click(function () {
        page_own++;
        // getInterfaceData(1);
        var data_own_pape = getFirstPageContent(page_own, limit_own, data_own);
        if (data_own_pape.length <= 0) {
            $("#release_own_info .reload_more").hide(); //没有数据
        }
        buildDatatoHtml(data_own_pape, "release_own_info");
    })
    /**
     * 滑动加载
     * */
    $(window).scroll(function () {
        var $this = $(this);
        var scrollTop = $this.scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $this.height();
        var cha = scrollHeight - scrollTop - windowHeight;
        /*获取当前对应的选项卡*/
        var type = $(".nav-tabs").find('.active').attr('data-type');
        type = parseInt(type);
        if (cha === 0) {
            if (type == 0) {
                $('#release_all_info .reload_more').click();
            }
            if (type == 1) {
                $('#release_own_info .reload_more').click();
            }
        }
    });

    function clickEvent() {
        /**
         * 点击获取历史记录
         * */
        $('.release_ul li').click(function () {
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
         * 结束发布
         * */
        $('.release_own_end').on("click", function () {
            var taskid = $(this).attr('data-task-id');
            // webim.setReleaseInfo({"task_id": taskid}, null , function (resultData) {
            //     if (resultData.status == 1) {
            $(this).parent().parent('.click_end_release').html('<span class="release_end">已结束</span>');
            //     } else {
            //         swal("请求失败");
            //     }
            // });
        });

        $('.release_own').click(function () {
            $(this).find('.release_own_end').show();
        });
        $('.release_own').mouseleave(function () {
            $(this).find('.release_own_end').hide();
        });

        /**
         * 跟
         * */
        $('.support').click(function () {
            var $this = $(this);
            var taskid = $this.parent().attr('data-support-taskid');
            if (!$this.siblings().hasClass('follow_select')) {
                // webim.follow({"follow": 1, "task_id": taskid}, null, function (resultData) {
                //     if (resultData.status == 1) {
                var html = parseInt($this.find('.follow_num').html()) + 1;
                $this.addClass('follow_select').find('img').attr('src', '../static/plugins/webim/imgs/icon_add_select.png');
                $this.find('.follow_num').html(html).removeClass('follow_num');
                //     }
                // });
            }
        });

        /**
         * 不跟
         * */
        $('.nosupport').click(function () {
            var $this = $(this);
            var taskid = $this.parent().attr('data-support-taskid');
            if (!$this.siblings().hasClass('follow_select')) {
                // webim.follow({"follow":0,"task_id":taskid},null,function(resultData){
                //     if(resultData.status == 1){
                var html = parseInt($this.find('.unfollow_num').html()) + 1;
                $this.addClass('follow_select').find('img').attr('src', '../static/plugins/webim/imgs/icon_noadd_select.png');
                $this.find('.unfollow_num').html(html).removeClass('unfollow_num');
                //     }
                // });
            }
            webim.follow({"follow": 2});
        });


    }
    init();
})(jQuery, window, document);