<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/common/Request.class.php");
require_once(dirname(__FILE__) . "/common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/common/Utility.class.php");
require_once(dirname(__FILE__) . "/common/Cookies.class.php");
if (CheckLogin::check() == -1) {
    header("Location:login.php ");
    exit();
}
$msg_cooikes=new Cookies();
$msg_cooikes->set('message','1','2592000');
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>版本更新说明</title>
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
        <p class="wk-hot-title">悟空1.2.2版新增功能</p>
        <div class="msg">
            <b>本次悟空1.3.2版更新包括如下内容：</b>
            <div class="updata_main">
                1.热力图五涨五跌，新增涨幅/跌幅表。<br>
                2.新增资讯分类：公告。<br>
                3.A股界面新增主题事件热度情况，以及新增主题事件热度页。<br>
                4.总热度排行新增"更多"Top100。<br>
                5.新增关联股票/行业/概念/主题事件图。<br>
                6.热度折线图板块右侧新增“关注”功能按钮。<br>
                7.新增新闻趋势，新闻情感总值。<br>
                8.通过socket链接控制，一个账户只能一处登录。<br>
            </div>
            <b>更新内容介绍：</b>
                <div>1.热力图五涨五跌，新增涨幅/跌幅表。</div>
                <img src="static/imgs/msg/pic_1.png">
                <div>2.新增资讯分类：公告。</div>
                <img src="static/imgs/msg/pic_2.png">
                <div>3.A股界面新增主题事件热度情况，以及新增主题事件热度页。</div>
                <img src="static/imgs/msg/pic_3.png">
                <div>4.总热度排行新增"更多"Top100。</div>
                <img src="static/imgs/msg/pic_4.png">
                <div>5.新增关联股票/行业/概念/主题事件图。</div>
                <img src="static/imgs/msg/pic_5.png">
                <div>6.热度折线图板块右侧新增“关注”功能按钮。</div>
                <img src="static/imgs/msg/pic_6.png">
                <div>7.新增新闻趋势，新闻情感总值。</div>
                <img src="static/imgs/msg/pic_7.png">
                <div>8.通过socket链接控制，一个账户只能一处登录。</div>
            </div>
            <a href="index2.php"><button class="msg_btn btn btn-primary">立即体验</button></a>
        </div>
    </section>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</body>
</html>