"use strict";
(function ($, window, document) {
    var data = Utility.getQueryStringByName("data");//头部标题信息
    if (data && data.split(',').length > 0) {
        var spl = data.split(',');
        var percent=(spl[2]).slice(6,11);
        var stockcode=decodeURI(spl[0]).split('(')[1].split(')')[0];
        $('.wk-toshow-name').html(decodeURI(spl[0]));
        $('.wk-topshow-price').html(decodeURI(spl[1])).addClass(Utility.getUpDownColor(percent));
        $('.wk-topshow-price-per').html(spl[2]).addClass(Utility.getUpDownColor(percent));
        $('.wk-topshow-dp .wk-topshow-status').html(decodeURI(spl[3]));
    }
    //公司概况下拉框
    $(".btn-group li").click(function(){
        var type= $(this).attr('data');
        switch(type){
            case '1':$(this).find('a').attr('href','/company/profile.php?data='+ $(".wk-toshow-name").html()+','+$(".wk-topshow-price").html()+','+ $(".wk-topshow-price-per").html()+','+Utility.getTradeTime());break;//公司简介
            case '2':$(this).find('a').attr('href','/company/executives.php?data='+ $(".wk-toshow-name").html()+','+$(".wk-topshow-price").html()+','+ $(".wk-topshow-price-per").html()+','+Utility.getTradeTime());break;//公司高管
            case '3':$(this).find('a').attr('href','/company/capital_structure.php?data='+ $(".wk-toshow-name").html()+','+$(".wk-topshow-price").html()+','+ $(".wk-topshow-price-per").html()+','+Utility.getTradeTime());break;//股本结构
            case '4':$(this).find('a').attr('href','/company/stockholder.php?data='+ $(".wk-toshow-name").html()+','+$(".wk-topshow-price").html()+','+ $(".wk-topshow-price-per").html()+','+Utility.getTradeTime());break;//主要股东
        }
    })
    function Profile() {
        company.getProfile(null, null, function (resultData) {

        });
    }

    $(".wk-follow-stock").each(function () {
        var follow_name = $(this).attr("data-follow-name");
        $(this).unbind("click").bind("click", function () {
            inforcenter.addStock({ori_name: follow_name, code:stockcode}, null, function (addResult) {
                if (addResult.status == 1) {
                    swal({
                        title: "",
                        text: "关注个股<span style='color: #F8BB86'>" + stockcode + "</span>成功",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                } else if (addResult.status === 0) {
                    swal({
                        title: "",
                        text: "关注个股<span style='color: #F8BB86'>" + stockcode + "</span>异常," + resultData.msg + "",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                } else {
                    swal({
                        title: "",
                        text: "关注个股<span style='color: #F8BB86'>" + stockcode + "</span>异常,未知原因",
                        html: true,
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            });
        });
    });

    Profile();
})(jQuery, window, document);