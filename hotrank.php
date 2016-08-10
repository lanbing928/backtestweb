<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/common/Request.class.php");
require_once(dirname(__FILE__) . "/common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/common/Utility.class.php");
if (CheckLogin::check() == -1) {
    header("Location:login.php ");
    exit();
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>热度排行榜</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="static/css/common.min.css">
    <link rel="stylesheet" href="static/css/index.min.css">
</head>
<body>
<?php include("share/_header.php") ?>
<div class="container wk-container">
    <section class="wk-all-hot">
        <div class="wk-con-industry">
            <p class="wk-hot-title"></p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active" data-type="1"><a href="#view" aria-controls="view" role="tab" data-toggle="tab">查看热度</a></li>
                    <li role="presentation" data-type="2"><a href="#search" aria-controls="search" role="tab" data-toggle="tab">搜索热度</a></li>
                    <li role="presentation" data-type="3"><a href="#follow" aria-controls="follow" role="tab" data-toggle="tab">关注热度</a></li>
                </ul>
                <span class="wk-hot-time">更新时间:<?php echo date("Y-m-d H:00");?></span>
                <div class="tab-content">
                    <!--查看热度-->
                    <div role="tabpanel" class="tab-pane active" id="view">
                        <p class="wk-hot-sub-title">查看热度排行&nbsp<i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行" data-original-title="" title=""></i></p>
                        <table class="table table-hover table-condensed table-striped wk-hot-table">
                            <thead></thead>
                            <tbody class="hot_data"></tbody>
                        </table>
                        <div class="hot_more" id="view_hot_more">点击展开更多<br/><i class="glyphicon glyphicon-menu-down"></i></div>
                    </div>
                    <!--搜索热度-->
                    <div role="tabpanel" class="tab-pane fade" id="search">
                        <p class="wk-hot-sub-title">搜索热度排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行" data-original-title="" title=""></i></p>
                        <table class="table table-hover table-condensed table-striped wk-hot-table">
                            <thead></thead>
                            <tbody class="hot_data"></tbody>
                        </table>
                        <div class="hot_more" id="search_hot_more">点击展开更多<br/><i class="glyphicon glyphicon-menu-down"></i></div>
                    </div>
                    <!--关注热度-->
                    <div role="tabpanel" class="tab-pane fade" id="follow">
                        <p class="wk-hot-sub-title">关注热度排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行" data-original-title="" title=""></i></p>
                        <table class="table table-hover table-condensed table-striped wk-hot-table">
                            <thead></thead>
                            <tbody class="hot_data"></tbody>
                        </table>
                        <div class="hot_more" id="follow_hot_more">点击展开更多<br/><i class="glyphicon glyphicon-menu-down"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>


<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="static/js/all.min.js"></script>
<script src="static/js/common.min.js"></script>
<script src="static/js/Utility.min.js"></script>
<script src="static/js/page/hotrank.min.js"></script>
</body>
</html>