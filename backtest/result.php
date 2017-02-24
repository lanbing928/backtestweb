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
    <title>回测平台</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/backtest.min.css')?>">
</head>
<body>
<?php include(dirname(__FILE__) . "/../backtest/header.php") ?>
<div id="loading-center-absolute"></div>
<div class="container wk-content" data-type="result">
    <div class="col-md-4 left index_recommend">
        <div class="result_title left_title">问句汇总</div>
        <div class="hot">
            <div class="left_content_title"><div class="fl left_hot_color color"></div><div class="fl left_hot_title">最热语句</div><img src="../static/imgs/backtest/result_up1.png" data-type="0" data-sentecne="long" class="fl"><div class="clear"></div></div>
            <ul class="detail-ul-hot">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_long_more" data-click-type="6" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>
        <div class="events">
            <div class="left_content_title"><div class="fl left_event_color color"></div><div class="fl left_event_title">热点事件</div><img src="../static/imgs/backtest/result_up2.png" data-type="0" data-sentecne="long" class="fl"><div class="clear"></div></div>
            <ul class="detail-ul-events">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_long_more" data-click-type="5" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>
        <div class="basic">
            <div class="left_content_title"><div class="fl left_basic_color color"></div><div class="fl left_basic_title">基本面</div><img src="../static/imgs/backtest/result_up3.png" data-type="0" data-sentecne="short" class="fl"><div class="clear"></div></div>
            <ul class="detail-ul-basic">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="1" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>
        <div class="tec">
            <div class="left_content_title"><div class="fl left_tec_color color"></div><div class="fl left_tec_title">技术面</div><img src="../static/imgs/backtest/result_up4.png" data-type="0" data-sentecne="short" class="fl"><div class="clear"></div></div>
            <ul class="detail-ul-tec">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="3" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>
        <div class="industry">
            <div class="left_content_title"><div class="fl left_industry_color color"></div><div class="fl left_industry_title">行情面</div><img src="../static/imgs/backtest/result_up5.png" data-type="0" data-sentecne="short" class="fl"><div class="clear"></div></div>
            <ul class="detail-ul-industry">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="2" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>
        <div class="news">
            <div class="left_content_title"><div class="fl left_news_color color"></div><div class="fl left_news_title">消息面</div><img src="../static/imgs/backtest/result_up6.png" data-type="0" data-sentecne="short" class="fl"><div class="clear"></div></div>
            <ul class="detail-ul-news">
                <div class="clear"></div>
            </ul>
            <div class="detail_more detail_type_more" data-click-type="4" data-end="0"><i class="glyphicon glyphicon-menu-down"></i></div>
        </div>
    </div>

    <div class="col-md-8 right">
        <div class="right_content">
            <div class="right_time">
                <div class="result_title right_time_title">回测时间</div>
                <div class="result_time">
                    <div class="fl" style="width:40%">
                        开始时间: <input class="testfrom" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" readonly>&nbsp;&nbsp;
                    </div>
                    <div class="fl" style="width:40%">
                        结束时间: <input class="testto" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" readonly>&nbsp;&nbsp;
                    </div>
                    <div class="clear"></div>
                </div>
            </div>

            <div class="right_condition">
                <div class="result_title right_condition_title">已选条件</div>
                <ul>
                </ul>
            </div>

            <div class="right_result">
                <div class="result_title right_result_title fl">筛选结果</div>
                <div class="right_stock_num fl">选出股票数：<span></span></div>
                <div class="clear"></div>
            </div>

            <div class="right_yield dis_none">
                <div class="right_content_title"><div class="fl right_color color"></div><div class="fl">收益率走势</div><div class="clear"></div></div>
                <div id="wk-rate-line-pic"></div>
            </div>

            <div class="right_industry">
                <div class="right_content_title dis_none"><div class="fl right_color color"></div><div class="fl">股票列表</div><div class="clear"></div></div>
                <div class="table-responsive dis_none">
                    <table class="table table-condensed right_industry_table">
                        <thead>
                        <tr>
                            <td>序号</td>
                            <td>股票代码</td>
                            <td>股票名称</td>
                            <td>最新价<span data-hot-sort='trade' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td>
                            <td>涨跌幅<span data-hot-sort='changepercent' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td>
                            <td>成交量(手)<span data-hot-sort='volume' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td>
                            <td>换手率<span data-hot-sort='amount' data-sort-type='desc'><img src='/static/imgs/i/icon_desc.png'></span></td>
                            <td>行业</td>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                <div class="dataload"></div>
                <div class="right_resolve_data dis_none">
                    <span class="export_data" id="export" data-type="xls">导出数据</span>
<!--                    <span class="build_report">生成报表</span>-->
                </div>

            </div>
        </div>
    </div>
</div>
<table id="table1">
    <thead>
    <tr>
        <td>序号</td>
        <td>股票代码</td>
        <td>股票名称</td>
        <td>最新价</td>
        <td>涨跌幅</td>
        <td>成交量(手)</td>
        <td>换手率</td>
        <td>行业</td>
    </tr>
    </thead>
    <tbody>

    </tbody>
    </table>
</table>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="http://js.97uimg.com/js/My97DatePicker/WdatePicker.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="../static/plugins/scrollCtrl.min.js"></script>
<script src="../static/plugins/table_excel/Blob.js"></script>
<script src="../static/plugins/table_excel/FileSaver.js"></script>
<script src="../static/plugins/table_excel/tableExport.js"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/common.min.js')?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/Utility.min.js')?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/page/backtest.min.js')?>"></script>
</body>
</html>

