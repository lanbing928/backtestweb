<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/../common/Utility.class.php");
if (CheckLogin::check() == -1) {
    header("Location:../login.php ");
    exit();
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>公司简介</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/css/index.min.css">
<body>
<?php include(dirname(__FILE__) . "/../share/_header.php") ?>
<div class="container wk-container wk-company" html_type="profile">
    <section class="wk-top-title">
        <label class="wk-topshow-icon"></label>
        <label class="wk-toshow-name"></label>
            <div class="btn-group" role="group">
                <i class="fa fa-list-ul" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <ul class="dropdown-menu">
                    <li data="1"><a href="#">公司概况</a></li>
                    <li data="2"><a href="#">公司高管</a></li>
                    <li data="3"><a href="#">股本结构</a></li>
                    <li data="4"><a href="#">主要股东</a></li>
                </ul>
            </div>
        <label class="wk-topshow-price"></label>
        <label class="wk-topshow-price-per"></label>
        <div class="wk-topshow-right">
            <label class="wk-topshow-dp">沪深：<label><i class="fa fa-circle-o-notch fa-spin"></i></label></label>
            <div class="btn-group" style="float: right;">
                <button type="button" class="btn dropdown-toggle wk-btn-follow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+ 关注</button>
                <ul class="dropdown-menu">
                    <li class="wk-follow-stock" data-follow-name="我的自选股"><a href="#">我的自选股</a></li>
                    <li class="wk-follow-stock" data-follow-name="组合A"><a href="#">组合A</a></li></ul>
            </div>
        </div>
    </section>

    <section class="wk-all-hot profile" id="ggg">
        <table class="table-condensed">
            <tr style="text-align: center"><td colspan="2">加载中...</td></tr>
        </table>
    </section>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="../static/js/all.min.js"></script>
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
<script  src="../static/js/page/company.min.js"></script>

</body>
</html>