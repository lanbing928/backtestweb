<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/common/Request.class.php");
require_once(dirname(__FILE__) . "/common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/common/Utility.class.php");
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>浏览器升级提醒</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="static/css/common.min.css">
    <link rel="stylesheet" href="static/css/index.min.css">
</head>
<body>
<?php include("share/_header.php") ?>
<div class="container wk-container">
    <div class="wk-update-browser">
        <p>很抱歉！您的浏览器不兼容，需要升级啦~</p>
        <label>您访问的页面暂时无法显示。您可以选择<a href="#">升级浏览器</a></label>
    </div>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="static/js/all.min.js"></script>
<script src="static/js/common.min.js"></script>
<div style="display: none;">
    <script src="http://s95.cnzz.com/z_stat.php?id=1259413901&web_id=1259413901" language="JavaScript"></script>
</div>
</body>
</html>