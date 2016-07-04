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
$conceptName = isset($_GET['name']) ? $_GET['name'] : "";
if (empty($conceptName)) {
    header("Location:error.php ");
    exit();
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title><?php echo $conceptName ?>概念热度情况</title>
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
        <p class="wk-hot-title"><?php echo $conceptName ?>概念热度情况&nbsp;
            <i class="fa fa-question-circle-o" data-toggle="popover" data-content="<?php echo $conceptName ?>概念每小时产生的热度量"></i>
        </p>
        <div class="col-md-4 col-md-offset-4 text-right wk-line-toggle" data-query-type="3" data-query-key="<?php echo $conceptName ?>">
            <a class="line-active" data-key="day">实时</a>
            <a data-key="week">周</a>
            <a data-key="month">月</a>
        </div>
        <div class="col-md-8 left-charts" id="left-chart"></div>
        <div class="col-md-4 right-infos">
            <p>
                <?php echo $conceptName ?>最近热度
                &nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-placement="bottom" data-content=""></i>
            </p>
            <hr>
            <table class="table table-condensed first-table latesthot">
                <tr>
                    <td colspan="3">加载中...</td>
                </tr>
            </table>
            <p><?php echo $conceptName ?>今日最热度</p>
            <hr>
            <table class="table table-condensed todayhot">
                <tr>
                    <td colspan="3">加载中...</td>
                </tr>
            </table>
        </div>
    </section>
    <section class="wk-rate-line">
        <p class="wk-hot-title">收益率走势</p>
        <div class="wk-rate-select">
            <label class="active" data-toggle="today">当天</label>
            <label data-toggle="week">最近一周</label>
            <label data-toggle="month">最近一个月</label>
            <label data-toggle="threemonth">最近三个月</label>
        </div>
        <div id="wk-rate-line-pic"></div>
    </section>
    <section class="wk-all-hot">
        <div class="wk-con-news">
            <p class="wk-hot-title relate-infos">关联资讯</p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#wk-news" aria-controls="wk-news" role="tab" data-toggle="tab">新闻</a></li>
                    <li role="presentation"><a href="#wk-selfmedia" aria-controls="wk-selfmedia" role="tab" data-toggle="tab"><label></label>达人观点</a></li>
                    <li role="presentation"><a href="#wk-newsflash" aria-controls="wk-newsflash" role="tab" data-toggle="tab">快讯</a></li>
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
                </div>
            </div>
        </div>
        <div class="wk-con-industry">
            <p class="wk-hot-title"><?php echo $conceptName ?>概念热度情况</p>
            <div class="wk-con-box">
                <ul class="nav nav-tabs hot-map" role="tablist">
                    <li role="presentation" class="active"><a href="#concept-view" aria-controls="concept-view" role="tab" data-toggle="tab">查看热度</a></li>
                    <li role="presentation"><a href="#concept-search" aria-controls="concept-search" role="tab" data-toggle="tab">搜索热度</a></li>
                    <li role="presentation"><a href="#concept-follow" aria-controls="concept-follow" role="tab" data-toggle="tab">关注热度</a></li>
                </ul>
                <span class="wk-hot-time">数据日期:<?php echo date("Y-m-d H:");
                    echo UtilityTools::getNowMinute() ?></span>
                <div class="tab-content">
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="concept-view">
                            <div class="col-md-5 left">
                                <p class="wk-hot-sub-title">查看热度排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i></p>
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
                                            <td>热度涨跌幅</td>
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
                                <p class="wk-hot-sub-title">搜索热度排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i></p>
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
                                    <table class="table table-hover table-condensed wk-treemap-table">
                                        <thead>
                                        <tr>
                                            <td>序号</td>
                                            <td>股票名称</td>
                                            <td>价格</td>
                                            <td>价格涨跌幅</td>
                                            <td>搜索热度</td>
                                            <td>热度涨跌幅</td>
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
                                <p class="wk-hot-sub-title">关注热度排行&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i></p>
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
                                            <td>热度涨跌幅</td>
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
        </div>
    </section>
</div>

<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="static/js/common.min.js"></script>
<script src="static/js/Utility.min.js"></script>
<script src="static/js/all.min.js"></script>
<script src="static/js/page/concept.min.js"></script>
</body>
</html>