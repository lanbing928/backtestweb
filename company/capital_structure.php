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
    <title>股本结构</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/css/index.min.css">
<body>
<?php include(dirname(__FILE__) . "/../share/_header.php") ?>
<div class="container wk-container wk-company">
    <section class="wk-top-title">
        <label class="wk-topshow-icon"></label>
        <label class="wk-toshow-name">东旭光电(000413)</label>
        <!--                <div class="btn-group" role="group">-->
        <!--                    <i class="fa fa-list-ul" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>-->
        <!--                    <ul class="dropdown-menu">-->
        <!--                        <li><a href="#">公司概况</a></li>-->
        <!--                        <li><a href="#">公司高管</a></li>-->
        <!--                        <li><a href="#">股本结构</a></li>-->
        <!--                        <li><a href="#">主要股东</a></li>-->
        <!--                    </ul>-->
        <!--                </div>-->
        <label class="wk-topshow-price wk-down">¥0.000</label>
        <label class="wk-topshow-price-per">-14.17(0.00%)</label>
        <div class="wk-topshow-right">
            <span class="wk-topshow-dp">沪深：<span class="wk-up">交易中</span><span>
            <div class="btn-group" style="float: right;">
                <button type="button" class="btn dropdown-toggle wk-btn-follow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+ 关注</button>
                <ul class="dropdown-menu">
                    <li class="wk-follow-stock" data-follow-name="我的自选股"><a href="#">我的自选股</a></li>
                    <li class="wk-follow-stock" data-follow-name="组合A"><a href="#">组合A</a></li></ul>
            </div>
    </section>

    <section class="wk-all-hot cap_stru">
        <table class="table-condensed">
            <tr id="cap_stru_title">
                <td>公告日期</td>
                <td>2015-12-31</td>
                <td>2015-06-30</td>
                <td>2014-12-31</td>
                <td>2014-06-30</td>
                <td>2013-12-31</td>
                <td>2013-07-05</td>
                <td>2013-06-30</td>
            </tr>
            <tr>
                <td>总股本</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
            </tr>
            <tr>
                <td>总股本</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
            </tr>
            <tr>
                <td>总股本</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
            </tr>
            <tr>
                <td>总股本</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
            </tr>
            <tr>
                <td>总股本</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
            </tr>
            <tr>
                <td>总股本</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
                <td>678,602.33</td>
            </tr>
        </table>
    </section>
</div>


<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="../static/js/all.min.js"></script>
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
</body>
</html>