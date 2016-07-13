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
    <title>股票热度情况</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="static/css/common.min.css">
    <link rel="stylesheet" href="static/css/index.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="static/css/common.min.css">
    <link rel="stylesheet" href="static/css/index.min.css">
    <link rel="stylesheet" href="static/css/hotrank.css">
    <script>
        .wk-con-box .tab-pane .left{
            padding-right:5px;
        }
        .wk-con-box .tab-pane .right{
            padding:0px 0px 0px 5px;
        }
    </script>
</head>
<body>
<?php include("share/_header.php") ?>
<div class="container wk-container">
    <section class="wk-all-hot">
        <div class="wk-con-industry">
            <p class="wk-hot-title">A股市场股票热度情况</p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs wk-hotmap" role="tablist">
                    <li role="presentation" class="active"><a href="#industry-view" aria-controls="industry-view" role="tab" data-toggle="tab">查看热度</a></li>
                    <li role="presentation"><a href="#industry-search" aria-controls="industry-search" role="tab" data-toggle="tab">搜索热度</a></li>
                    <li role="presentation"><a href="#industry-follow" aria-controls="industry-follow" role="tab" data-toggle="tab">关注热度</a></li>
                </ul>
                <span class="wk-hot-time">数据日期:<?php echo date("Y-m-d H:");
                    echo UtilityTools::getNowMinute() ?></span>
                <div class="tab-content">
                    <!--查看热度-->
                    <div role="tabpanel" class="tab-pane active" id="industry-view">
                        <div class="wk-hot-sub-title">查看热度排行&nbsp;
                            <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                        </div>
                        <div class="col-md-6 left">
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="col-md-6 right">
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>2</td>
                                    <td>名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--搜索热度-->
                    <div role="tabpanel" class="tab-pane fade" id="industry-search">
                        <div class="wk-hot-sub-title">查看热度排行&nbsp;
                            <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                        </div>
                        <div class="col-md-6 left">
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>3</td>
                                    <td>名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="col-md-6 right">
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>4</td>
                                    <td>名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--关注热度-->
                    <div role="tabpanel" class="tab-pane fade" id="industry-follow">
                        <div class="wk-hot-sub-title">查看热度排行&nbsp;
                            <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                        </div>
                        <div class="col-md-6 left">
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>5</td>
                                    <td>名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="col-md-6 right">
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>6</td>
                                    <td>名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</body>
</html>