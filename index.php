<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/common/Request.class.php");
require_once(dirname(__FILE__) . "/common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/common/Utility.class.php");
if (CheckLogin::check() == -1) {
    header("Location:/common/checkDevice.php ");
    exit();
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>回测平台</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/backtest.min.css')?>">
</head>
<body>
<?php include(dirname(__FILE__) . "/backtest/header.php") ?>
<div class="wk-content container">
    <div class="index_recommend detail_sentence">
        <div class="hot">
            <div class="detail_title detail_hot_title">最热语句<img src="static/imgs/backtest/index_up.png" data-type="0" data-sentecne="long"></div>
            <ul class="detail-ul-hot">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_long_more" data-click-type="6" data-end="0" ><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>

        <div class="events">
            <div class="detail_title detail_events_title">热点事件<img src="static/imgs/backtest/index_up.png" data-type="0" data-sentecne="long"></div>
            <ul class="detail-ul-events">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_long_more" data-click-type="5" data-end="0" ><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>

        <div class="basic">
            <div class="detail_title detail_basic_title">基本面<img src="static/imgs/backtest/index_up.png" data-type="0" data-sentecne="short"></div>
            <ul class="detail-ul-basic">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="1" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>

        <div class="tec">
            <div class="detail_title detail_tec_title">技术面<img src="static/imgs/backtest/index_up.png" data-type="0" data-sentecne="short"></div>
            <ul class="detail-ul-tec">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="3" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>

        <div class="industry">
            <div class="detail_title detail_industry_title">行情面<img src="static/imgs/backtest/index_up.png" data-type="0" data-sentecne="short"></div>
            <ul class="detail-ul-industry">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="2" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>

        <div class="news">
            <div class="detail_title detail_news_title">消息面<img src="static/imgs/backtest/index_up.png" data-type="0" data-sentecne="short"></div>
            <ul class="detail-ul-news">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="4" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>
    </div>
    <div class="back_top"><a href="#top1"></ahref><img src="static/imgs/i/back_top.png"></a></div>
</div>

<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="http://js.97uimg.com/js/My97DatePicker/WdatePicker.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/common.min.js')?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/Utility.min.js')?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/page/backtest.min.js')?>"></script>
</body>
</html>