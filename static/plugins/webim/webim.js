"use strict";
(function ($, window, document) {
    /**
     * 获取全部发布信息
     */
     function allReleaseInfo(user_id) {
        // webim.getAllReleaseInfo(function () {
        //     $(".all_content").html("<div class=\"wk-user-no\"><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>");
        // }, function (resultData) {
          var user_id=user_id;
          var  resultData = {
                "result": [{
                    "user_id": 1,
                    "time": 12345,
                    "message": "task1",
                    "stock": "山东黄金，四川长虹",
                    "follow_num": 20,
                    "not_follow_num": 5,
                    "is_end": 1
                }, {
                    "user_id": 2,
                    "time": 12346,
                    "message": "task2",
                    "stock": "万科A，宁波银行",
                    "follow_num": 30,
                    "not_follow_num": 8,
                    "is_end": 0
                }],
                "status": 1
            }
            // if (resultData && resultData.status == 1) {
                if (resultData.result.length > 0) {
                    var allTimeHtml = [];
                    var allInfoHtml = [];
                    var list = resultData.result;
                    allTimeHtml.push('<li class="cont_date fl">2016-08-16</li><div class="cont_date_line fl"><div class="cont_date_circle"></div></div>');
                    for (var i = 0; i < list.length; i++) {
                        allTimeHtml.push('<li class="fl">'+list[i].time+'</li>');
                        allTimeHtml.push('<div class="time_line fl">  <div class="time_circle"></div><div class="release_usericon"></div></div>');

                        allInfoHtml.push('<div class="release_content">');
                        allInfoHtml.push('<div class="content_user">pufa-浦发银行');
                        allInfoHtml.push('<div class="content_user">pufa-浦发银行');

                        if(list[i].user_id == user_id){
                            allInfoHtml.push('<i class="glyphicon glyphicon-menu-down release_own"><div class="release_own_end">结束发布</div></i></div>');
                        }else{
                            if(list[i].is_end == 1){
                                allInfoHtml.push('<span class="release_end">已结束</span>');
                            }
                        }
                    }
                    $(".release_time").html(allTimeHtml.join(''));
                // }
            }
        // })
    }

    /**
     * 点击进行回测
     * */
    $('body').on('click', '.release_ul li ', function () {
        var type=$(this).find('a').attr('href');
        if(type=='#release_all_info'){
            var userid=$(this).attr('data-userid');
            allReleaseInfo(userid);
        }else if(type=='#release_own_info'){
            ownReleaseInfo();
        }

    });
})(jQuery, window, document);