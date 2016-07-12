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
    <title>悟空</title>
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
    <section class="wk-time-hot">
        <p class="wk-hot-title">A股市场实时热度&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="A股市场每小时产生的热度量"></i></p>
        <div class="col-md-4 col-md-offset-4 text-right wk-line-toggle" data-query-type="0" data-query-key="000001">
            <a class="line-active" data-key="day">实时</a>
            <a data-key="week">周</a>
            <a data-key="month">月</a>
        </div>
        <div class="col-md-8 left-charts" id="left-chart"></div>
        <div class="col-md-4 right-infos">
            <p>
                A股今日最热度情况
                <!--                &nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-placement="bottom" data-content=""></i>-->
            </p>
            <hr>
            <table class="table table-condensed first-table todayhot">
                <tr>
                    <td colspan="3">加载中...</td>
                </tr>
            </table>
            <p>A股今日最热股情况</p>
            <hr>
            <table class="table table-condensed">
                <tr>
                    <td>查看最热股</td>
                    <td id="hot-view-stock"></td>
                </tr>
                <tr>
                    <td>搜索最热股</td>
                    <td id="hot-search-stock"></td>
                </tr>
                <tr>
                    <td>关注最热股</td>
                    <td id="hot-follow-stock"></td>
                </tr>
            </table>
        </div>
    </section>
    <section class="wk-all-hot">
        <div class="wk-con-stock">
            <p class="wk-hot-title">A股市场股票热度情况</p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs wk-hotmap" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#stock-view" aria-controls="stock-view" role="tab" data-toggle="tab">查看热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#stock-search" aria-controls="stock-search" role="tab" data-toggle="tab">搜索热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#stock-follow" aria-controls="stock-follow" role="tab" data-toggle="tab">关注热度</a>
                    </li>
                </ul>
                <span class="wk-hot-time">
                    数据日期:<?php echo date("Y-m-d H:");
                    echo UtilityTools::getNowMinute() ?>
                </span>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="stock-view">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">查看热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
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
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>查看热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-stock-view-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>查看热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="stock-search">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">搜素热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>搜索热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>搜索热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-stock-search-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed table-striped wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>搜索热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="stock-follow">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">关注热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>股票名称</td>
                                    <td>关注热度</td>
                                    <td>热度增量</td>
                                    <td>价格</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>关注热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-stock-follow-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wk-con-industry">
            <p class="wk-hot-title">A股市场行业热度情况</p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs wk-hotmap" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#industry-view" aria-controls="industry-view" role="tab" data-toggle="tab">查看热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#industry-search" aria-controls="industry-search" role="tab" data-toggle="tab">搜索热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#industry-follow" aria-controls="industry-follow" role="tab" data-toggle="tab">关注热度</a>
                    </li>
                </ul>
                <span class="wk-hot-time">数据日期:<?php echo date("Y-m-d H:");
                    echo UtilityTools::getNowMinute() ?></span>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="industry-view">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">查看热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>行业名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>查看热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-industry-view-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>查看热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="industry-search">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">搜索热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>行业名称</td>
                                    <td>搜索热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>搜索热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-industry-search-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>搜索热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="industry-follow">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">关注热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>行业名称</td>
                                    <td>关注热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>关注热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-industry-follow-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wk-con-concept">
            <p class="wk-hot-title">A股市场概念热度情况</p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs wk-hotmap" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#concept-view" aria-controls="stock-view" role="tab" data-toggle="tab">查看热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#concept-search" aria-controls="concept-search" role="tab" data-toggle="tab">搜索热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#concept-follow" aria-controls="concept-follow" role="tab" data-toggle="tab">关注热度</a>
                    </li>
                </ul>
                <span class="wk-hot-time">数据日期:<?php echo date("Y-m-d H:");
                    echo UtilityTools::getNowMinute() ?></span>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="concept-view">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">查看热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>概念名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>查看热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-concept-view-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>查看热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="concept-search">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">搜索热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>概念名称</td>
                                    <td>搜索热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>搜索热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-concept-search-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>搜索热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="concept-follow">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">关注热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>概念名称</td>
                                    <td>关注热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>关注热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-concept-follow-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wk-con-event">
            <p class="wk-hot-title">A股市场事件热度情况</p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs wk-hotmap" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#event-view" aria-controls="event-view" role="tab" data-toggle="tab">查看热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#event-search" aria-controls="event-search" role="tab" data-toggle="tab">搜索热度</a>
                    </li>
                    <li role="presentation">
                        <a href="#event-follow" aria-controls="event-follow" role="tab" data-toggle="tab">关注热度</a>
                    </li>
                </ul>
                <span class="wk-hot-time">数据日期:<?php echo date("Y-m-d H:");
                    echo UtilityTools::getNowMinute() ?></span>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="event-view">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">查看热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>概念名称</td>
                                    <td>查看热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>查看热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-event-view-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>查看热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="event-search">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">搜索热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>概念名称</td>
                                    <td>搜索热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>搜索热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-event-search-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>搜索热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="event-follow">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">关注热度排行&nbsp;
                                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i>
                            </p>
                            <table class="table table-hover table-condensed table-striped wk-hot-table">
                                <thead>
                                <tr>
                                    <td>序号</td>
                                    <td>概念名称</td>
                                    <td>关注热度</td>
                                    <td>热度增量</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colspan="5">正在加载...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>关注热度涨跌幅排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i></p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">图</span>
                                    <span>表</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-event-follow-treemap"></div>
                                <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p>
                                <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p>
                            </div>
                            <div class="toggle-treemap-table" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>行业名称</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
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
<script src="static/js/page/index.min.js"></script>
<div style="display: none;">
    <script src="http://s95.cnzz.com/z_stat.php?id=1259413901&web_id=1259413901" language="JavaScript"></script>
</div>
</body>
</html>