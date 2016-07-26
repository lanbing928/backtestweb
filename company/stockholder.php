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
    <title>主要股东</title>
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
<div class="container wk-container wk-company">
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
            <span class="wk-topshow-dp">沪深：<span class="wk-up wk-topshow-status"></span><span>
            <div class="btn-group" style="float: right;">
                <button type="button" class="btn dropdown-toggle wk-btn-follow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+ 关注</button>
                <ul class="dropdown-menu">
                    <li class="wk-follow-stock" data-follow-name="我的自选股"><a href="#">我的自选股</a></li>
                    <li class="wk-follow-stock" data-follow-name="组合A"><a href="#">组合A</a></li></ul>
            </div>
        </div>
    </section>
    <section class="wk-all-hot wk-stockholder">
        <div class="wk-con-box">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#top_opt1" aria-controls="top_opt1" role="tab" data-toggle="tab">2016-03-01</a></li>
                <li role="presentation"><a href="#top_opt2" aria-controls="top_opt2" role="tab" data-toggle="tab">2015-12-31</a></li>
                <li role="presentation"><a href="#top_opt3" aria-controls="top_opt3" role="tab" data-toggle="tab">2015-09-30</a></li>
                <li role="presentation"><a href="#top_opt4" aria-controls="top_opt4" role="tab" data-toggle="tab">2015-06-30</a></li>
                <li role="presentation"><a href="#top_opt5" aria-controls="top_opt5" role="tab" data-toggle="tab">2016-03-31</a></li>
            </ul>
            <div class="tab-content">
                <!--2016-03-01-->
                <div role="tabpanel" class="tab-pane active" id="top_opt1">
                    <table class="table-condensed">
                        <thead>
                            <tr id="cap_stru_title">
                                <td>名次</td>
                                <td>十大流通股东名称</td>
                                <td>股东性质</td>
                                <td>股份类型</td>
                                <td>持股数(股)</td>
                                <td>占总流通股本比</td>
                                <td>增减(股)</td>
                                <td>变动比例</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>国家开发投资公司</td>
                                <td>投资公司</td>
                                <td>a股</td>
                                <td>3,484,729,752</td>
                                <td>51.34%</td>
                                <td>不变</td>
                                <td>--</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>国家开发投资公司</td>
                                <td>投资公司</td>
                                <td>a股</td>
                                <td>3,484,729,752</td>
                                <td>51.34%</td>
                                <td>不变</td>
                                <td>--</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--2015-12-31-->
                <div role="tabpanel" class="tab-pane fade" id="top_opt2">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--2015-09-30-->
                <div role="tabpanel" class="tab-pane fade" id="top_opt3">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>4</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--2015-06-30-->
                <div role="tabpanel" class="tab-pane fade" id="top_opt4">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>6</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--2016-03-31-->
                <div role="tabpanel" class="tab-pane fade" id="top_opt5">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>7</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <div class="wk-con-box">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#botttom_opt1" aria-controls="botttom_opt1" role="tab" data-toggle="tab">2016-03-01</a></li>
                <li role="presentation"><a href="#bottom_opt2" aria-controls="bottom_opt2" role="tab" data-toggle="tab">2015-12-31</a></li>
                <li role="presentation"><a href="#bottom_opt3" aria-controls="bottom_opt3" role="tab" data-toggle="tab">2015-09-30</a></li>
                <li role="presentation"><a href="#bottom_opt4" aria-controls="bottom_opt4" role="tab" data-toggle="tab">2015-06-30</a></li>
                <li role="presentation"><a href="#bottom_opt5" aria-controls="bottom_opt5" role="tab" data-toggle="tab">2016-03-31</a></li>
            </ul>
            <div class="tab-content">
                <!--2016-03-01-->
                <div role="tabpanel" class="tab-pane active" id="bottom_opt1">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--2015-12-31-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt2">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>3</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--2015-09-30-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt3">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>4</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--2015-06-30-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt4">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>6</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--2016-03-31-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt5">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大流通股东名称</td>
                            <td>股东性质</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>7</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>国家开发投资公司</td>
                            <td>投资公司</td>
                            <td>a股</td>
                            <td>3,484,729,752</td>
                            <td>51.34%</td>
                            <td>不变</td>
                            <td>--</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </section>
</div>

<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="../static/js/all.min.js"></script>
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
<script  src="../static/js/page/company.min.js"></script>
</body>
</html>