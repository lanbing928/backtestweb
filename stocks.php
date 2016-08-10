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
$stockCode = isset($_GET['stock']) ? $_GET['stock'] : "";

if (empty($stockCode)) {
    header("Location:error.php ");
    exit();
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8"/>
    <title>加载中...</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"/>
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css"/>
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css"/>
    <link rel="stylesheet" href="static/plugins/typeahead/jquery.typeahead.min.css"/>
    <link rel="stylesheet" href="static/css/common.min.css"/>
    <link rel="stylesheet" href="static/css/index.min.css"/>
</head>
<body>
<?php include("share/_header.php") ?>
<div class="container wk-container">
    <section class="wk-top-title">
        <label class="wk-topshow-icon"></label>
        <label class="wk-toshow-name">
            <i class="fa fa-circle-o-notch fa-spin"></i>
        </label>
        <div class="btn-group wk-com-info" role="group">
            <i class="fa fa-list-ul" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
            <ul class="dropdown-menu">
                <li><a href="/company/profile.php">公司概况</a></li>
                <li><a href="/company/executives.php">公司高管</a></li>
                <li><a href="/company/capital_structure.php">股本结构</a></li>
                <li><a href="/company/stockholder.php">主要股东</a></li>
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
    <section class="wk-time-hot">
        <p class="wk-hot-title wk-related-info">
            总览&nbsp;
            <i class="fa fa-question-circle-o" data-toggle="popover" data-content="每小时产生的热度量"></i>
            <span>行业：</span>
            <span>概念：</span>
        </p>
        <div class="wk-topcharts-box">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#wk-top-hots" aria-controls="wk-top-hots" role="tab" data-toggle="tab">热度</a>
                </li>
                <li role="presentation">
                    <a href="#wk-top-stockdata" aria-controls="wk-top-stockdata" role="tab" data-toggle="tab">
                        <label></label>大盘数据
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="wk-top-hots">
                    <div class="wk-top-panelcon">
                        <div class="col-md-4 col-md-offset-4 text-right wk-line-toggle" data-query-type="1" data-query-key="<?php echo $stockCode ?>">
                            <a class="line-active" data-key="day">实时</a>
                            <a data-key="week">周</a>
                            <a data-key="month">月</a>
                            <a data-key="minute">分时查看</a>
                        </div>
                        <div class="col-md-8 left-charts" id="left-hot-chart"></div>
                        <div class="col-md-4 right-infos">
                            <p class="latesthot-title">最近热度</p>
                            <hr/>
                            <table class="table table-condensed first-table latesthot">
                                <tr>
                                    <td colspan="3">加载中...</td>
                                </tr>
                            </table>
                            <p class="todayhot-title">今日最热度</p>
                            <hr/>
                            <table class="table table-condensed todayhot">
                                <tr>
                                    <td colspan="3">加载中...</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="wk-top-stockdata">
                    <div class="wk-top-panelcon">
                        <div class="col-md-8 left-charts">
                            <div id="wk-show-chart-tip">
                                <div id="wk-show-chart-tip"></div>
                            </div>
                            <div id="left-stockdata-chart"></div>
                        </div>
                        <div class="col-md-4 right-infos">
                            <p class="latesthot-title">最新行情</p>
                            <hr/>
                            <table class="table table-condensed">
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="wk-rate-line">
        <p class="wk-hot-title">
            收益率走势
            <i class="fa fa-question-circle-o" data-toggle="popover" data-content="展示其近期的收益率与沪深300的收益走势，自定义选择股票/行业/概念/主题事件对比收益率/热度"></i>
        </p>
        <div class="wk-rate-select" data-query-name="<?php echo $stockCode ?>" data-query-type="stock">
            <div class="wk-rate-select-label pull-left">
                <label class="active" data-toggle="today">当天</label>
                <label data-toggle="week">最近一周</label>
                <label data-toggle="month">最近一个月</label>
                <label data-toggle="threemonth">最近三个月</label>
            </div>
            <div class="wk-rate-compare btn-group">
                <label class="wk-compare-btn">数据对比</label>
                <label class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="fa fa-chevron-down"></span>
                </label>
                <ul class="dropdown-menu">
                    <li role="separator" class="divider"></li>
                    <li class="wk-hotevent-select">
                        <div class="pull-left">
                            <input type="checkbox" name="wk-check-hot" checked="checked"><span>查看热度</span>
                        </div>
                        <div class="pull-right">
                            <input type="checkbox" name="wk-check-rate" checked="checked"><span>收益率</span>
                        </div>
                    </li>
                    <li>
                        <div class="typeahead__container">
                            <div class="typeahead__field">
                                <span class="typeahead__query">
                                    <input class="wk-compare-search" type="search" placeholder="请输入/股票/行业/概念/事件" autocomplete="off">
                                </span>
                                <span class="typeahead__button">
                                    <i class="typeahead__search-icon"></i>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="wk-rate-line-pic"></div>
    </section>
    <section class="wk-relate-map">
        <p class="wk-hot-title">
            关联图谱
            <i class="fa fa-question-circle-o" data-toggle="popover" data-content="通过关系网，将其相关联的股票/行业/概念/主题事件依次展示"></i>
        </p>
        <div id="wk-relate-chart"></div>
    </section>
    <section class="wk-all-hot">
        <div class="wk-con-news">
            <p class="wk-hot-title relate-infos">
                关联资讯
                <i class="fa fa-question-circle-o" data-toggle="popover" data-content="展示与之相关的资讯、分为新闻、达人观点、快讯、公告和研报"></i>
            </p>
            <div class="row right pro_chart">
                <div class="col-md-5">
                    <p>最近一周新闻情感</p>
                    <div class="progress_neg">
                        <div class="progress_neg_per" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="sacle">
                        <span class="negative"></span>&nbsp;负面
                        <span class="negative_per"></span>%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="positive"></span>&nbsp;非负面
                        <span class="positive_per"></span>%
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6">
                    <p>最近一周新闻趋势</p>
                    <div class="col-md-5">
                        <div id="double-chart-a"></div>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-5">
                        <div id="double-chart-b"></div>
                    </div>
                </div>
            </div>
            <div class="wk-con-box">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#wk-news" aria-controls="wk-news" role="tab" data-toggle="tab">新闻</a>
                    </li>
                    <li role="presentation">
                        <a href="#wk-selfmedia" aria-controls="wk-selfmedia" role="tab" data-toggle="tab">
                            <label></label>达人观点
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#wk-newsflash" aria-controls="wk-newsflash" role="tab" data-toggle="tab">快讯</a>
                    </li>
                    <li role="presentation">
                        <a href="#wk-notice" aria-controls="wk-notice" role="tab" data-toggle="tab">公告</a>
                    </li>
                    <li role="presentation">
                        <a href="#wk-report" aria-controls="wk-report" role="tab" data-toggle="tab">研报</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="wk-news"></div>
                    <div role="tabpanel" class="tab-pane fade" id="wk-selfmedia"></div>
                    <div role="tabpanel" class="tab-pane fade" id="wk-newsflash">
                        <div class="wk-news-list">
                            <table class="table">
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="wk-notice"></div>
                    <div role="tabpanel" class="tab-pane fade" id="wk-report"></div>
                </div>
            </div>
        </div>
        <div class="wk-con-industry">
            <p class="wk-hot-title hy-title"></p>
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
                <span class="wk-hot-time">
                        更新时间:<?php echo date("Y-m-d H:00"); ?>
                    </span>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="industry-view">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">
                                查看热度排行&nbsp;
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
                                    <td colspan="5">加载中...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>
                                    查看热度涨跌幅排行&nbsp;
                                    <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i>
                                </p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">热力图</span>
                                    <span>涨幅</span>
                                    <span>跌幅</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-industry-view-treemap"></div>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块大小表示成交量，越大的板块成交量越大
                                </p>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色
                                </p>
                            </div>
                            <div class="toggle-treemap-table-up" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="toggle-treemap-table-down" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="industry-search">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">
                                搜索热度排行&nbsp;
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
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>
                                    搜索热度涨跌幅排行&nbsp;
                                    <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i>
                                </p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">热力图</span>
                                    <span>涨幅</span>
                                    <span>跌幅</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-industry-search-treemap"></div>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块大小表示成交量，越大的板块成交量越大
                                </p>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色
                                </p>
                            </div>
                            <div class="toggle-treemap-table-up" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="toggle-treemap-table-down" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="industry-follow">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">
                                关注热度排行&nbsp;
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
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>
                                    关注热度涨跌幅排行&nbsp;
                                    <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i>
                                </p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">热力图</span>
                                    <span>涨幅</span>
                                    <span>跌幅</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-industry-follow-treemap"></div>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块大小表示成交量，越大的板块成交量越大
                                </p>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色
                                </p>
                            </div>
                            <div class="toggle-treemap-table-up" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="toggle-treemap-table-down" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
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
            <p class="wk-hot-title gn-title"></p>
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
                <span class="wk-hot-time">
                        更新时间:<?php echo date("Y-m-d H:00"); ?>
                    </span>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="concept-view">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">
                                查看热度排行&nbsp;
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
                                    <td colspan="5">加载中...</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>
                                    查看热度涨跌幅排行&nbsp;
                                    <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i>
                                </p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">热力图</span>
                                    <span>涨幅</span>
                                    <span>跌幅</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-concept-view-treemap"></div>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块大小表示成交量，越大的板块成交量越大
                                </p>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色
                                </p>
                            </div>
                            <div class="toggle-treemap-table-up" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="toggle-treemap-table-down" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="concept-search">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">
                                搜索热度排行&nbsp;
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
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>
                                    搜索热度涨跌幅排行&nbsp;
                                    <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i>
                                </p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">热力图</span>
                                    <span>涨幅</span>
                                    <span>跌幅</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-concept-search-treemap"></div>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块大小表示成交量，越大的板块成交量越大
                                </p>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色
                                </p>
                            </div>
                            <div class="toggle-treemap-table-up" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="toggle-treemap-table-down" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="concept-follow">
                        <div class="col-md-5 left">
                            <p class="wk-hot-sub-title">
                                关注热度排行&nbsp;
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
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-md-7 right">
                            <div class="wk-hot-sub-title">
                                <p>
                                    关注热度涨跌幅排行&nbsp;
                                    <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i>
                                </p>
                                <p class="treemap-toggle">
                                    <span class="treemap-active">热力图</span>
                                    <span>涨幅</span>
                                    <span>跌幅</span>
                                </p>
                            </div>
                            <div class="toggle-treemap">
                                <div class="charts" id="wk-concept-follow-treemap"></div>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块大小表示成交量，越大的板块成交量越大
                                </p>
                                <p class="wk-hot-sub-tips">
                                    <label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色
                                </p>
                            </div>
                            <div class="toggle-treemap-table-up" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div class="toggle-treemap-table-down" style="display: none;">
                                <table class="table table-hover table-condensed wk-treemap-table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称</td>
                                        <td>价格</td>
                                        <td>价格涨跌幅</td>
                                        <td>关注热度</td>
                                        <td>热度增量</td>
                                        <td>成交量(万手)</td>
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
    <div class="modal fade modal-chart" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">分时查看</h4>
                </div>
                <div class="modal-body">
                    <div id="modal-chart"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div style="display: none;">
    <script src="http://s95.cnzz.com/z_stat.php?id=1259413901&web_id=1259413901" language="JavaScript"></script>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="static/plugins/scrollCtrl.min.js"></script>
<script src="static/js/all.min.js"></script>
<script src="static/js/common.min.js"></script>
<script src="static/js/Utility.min.js"></script>
<script src="static/js/page/stock.js"></script>
</body>
</html>