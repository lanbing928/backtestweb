<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>悟空</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="static/css/common.min.css">
    <link rel="stylesheet" href="static/css/index.min.css">
    <style>
        .wk-error-content{width: 550px; margin: 130px auto 0;}
        .wk-error-content img{margin: 65px 0;}
        .wk-error-title{font-size: 26px;color: #545454;text-align: center;}
        .wk-error-info{font-size: 16px;color: #545454;text-align: center;}
        .wk-error-info a{color: #303f9f;}
        .wk-error-btn{text-align: center;margin-top: 60px;}
        .wk-error-btn button{height: 35px;width: 140px;font-size: 18px;color: #FFFFFF;background-color: #4285c1;border: none;-webkit-box-shadow: #000000 2px 2px 8px; -moz-box-shadow: #000000 2px 2px 8px; box-shadow: #000000 2px 2px 8px;}
    </style>
</head>
<body>
<?php include("share/_header.php") ?>
<div class="container wk-container">
    <div class="wk-error-content">
        <p class="wk-error-title">很抱歉！您要访问的页面出错啦 >_<</p>
        <img src="static/imgs/i/error.png">
        <p class="wk-error-info">您访问的页面暂时不可用。您可以<a href="javascript:history.go(-1);">返回上一页</a></p>
        <div class="wk-error-btn">
            <button id="wk-back">返回上一页</button>
        </div>
    </div>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="static/js/Utility.min.js"></script>
<script src="static/js/all.min.js"></script>
<script>
    $("#wk-back").click(function(){
        history.go(-1);
    });
</script>
</body>
</html>