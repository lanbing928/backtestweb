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
<div class="container wk-container wk-company" data-html-type="stockholder">
    <section class="wk-top-title">
        <label class="wk-topshow-icon"></label>
        <label class="wk-toshow-name">
            <i class="fa fa-circle-o-notch fa-spin"></i>
        </label>
        <div class="btn-group" role="group">
            <i class="fa fa-list-ul" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
            <ul class="dropdown-menu">
                <li><a href="profile.php">公司概况</a></li>
                <li><a href="executives.php">公司高管</a></li>
                <li><a href="capital_structure.php">股本结构</a></li>
                <li class="company_active"><a href="stockholder.php">主要股东</a></li>
            </ul>
        </div>
        <label class="wk-topshow-price"></label>
        <label class="wk-topshow-price-per"></label>
        <div class="wk-topshow-right">
            <label class="wk-topshow-dp">
                沪深：
                <label>
                    <i class="fa fa-circle-o-notch fa-spin"></i>
                </label>
            </label>
        </div>
    </section>
    <section class="wk-all-hot wk-stockholder">
        <div class="wk-con-box float_stockholder">
            <ul class="nav nav-tabs" role="tablist" id="float_stock_holder_ul">
                <li role="presentation" class="active" class="topli1"><a href="#top_opt1" aria-controls="top_opt1" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="topli2"><a href="#top_opt2" aria-controls="top_opt2" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="topli3"><a href="#top_opt3" aria-controls="top_opt3" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="topli4"><a href="#top_opt4" aria-controls="top_opt4" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="topli5"><a href="#top_opt5" aria-controls="top_opt5" role="tab" data-toggle="tab"></a></li>
            </ul>
            <div class="tab-content">
                <!--top day1-->
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
                        <tr style="text-align: center">
                            <td colspan="8">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--top day2-->
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
                        <tr style="text-align: center">
                            <td colspan="8">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--top day3-->
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
                        <tr style="text-align: center">
                            <td colspan="8">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--top day4-->
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
                        <tr style="text-align: center">
                            <td colspan="8">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--top day5-->
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
                        <tr style="text-align: center">
                            <td colspan="8">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <div class="wk-con-box stockholder">
            <ul class="nav nav-tabs" role="tablist" id="stock_holder_ul">
                <li role="presentation" class="active botli1"><a href="#bottom_opt1" aria-controls="bottom_opt1" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="botli2"><a href="#bottom_opt2" aria-controls="bottom_opt2" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="botli3"><a href="#bottom_opt3" aria-controls="bottom_opt3" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="botli4"><a href="#bottom_opt4" aria-controls="bottom_opt4" role="tab" data-toggle="tab"></a></li>
                <li role="presentation" class="botli5"><a href="#bottom_opt5" aria-controls="bottom_opt5" role="tab" data-toggle="tab"></a></li>
            </ul>
            <div class="tab-content">
                <!--bottom day1-->
                <div role="tabpanel" class="tab-pane active" id="bottom_opt1">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大股东名称</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style="text-align: center">
                            <td colspan="7">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--bottom day2-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt2">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大股东名称</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style="text-align: center">
                            <td colspan="7">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--bottom day3-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt3">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大股东名称</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style="text-align: center">
                            <td colspan="7">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--bottom day4-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt4">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大股东名称</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style="text-align: center">
                            <td colspan="7">加载中...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--bottom day5-->
                <div role="tabpanel" class="tab-pane fade" id="bottom_opt5">
                    <table class="table-condensed">
                        <thead>
                        <tr id="cap_stru_title">
                            <td>名次</td>
                            <td>十大股东名称</td>
                            <td>股份类型</td>
                            <td>持股数(股)</td>
                            <td>占总流通股本比</td>
                            <td>增减(股)</td>
                            <td>变动比例</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style="text-align: center">
                            <td colspan="3">加载中...</td>
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
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="../static/js/all.min.js"></script>
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
<script src="../static/js/page/company.min.js"></script>
</body>
</html>