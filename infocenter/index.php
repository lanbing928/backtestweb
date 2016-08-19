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
    <title>悟空</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="../static/plugins/slider/css/bootstrap-slider.min.css">
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/css/index.min.css">
</head>
<body>
<?php include(dirname(__FILE__) . "/../share/_header.php") ?>
<div class="container wk-container">
    <section class="wk-user-center">
        <div class="wk-user-datas"></div>
        <div class="wk-user-mychoose">
            <div class="wk-user-choose-title">
                <div class="active" data-group-name="我的自选股">
                    <div class="wk-btn-mygroup">
                        <span>我的自选股</span>
                    </div>
                </div>
            </div>
            <a class="btn btn-default btn-sm wk-add-zh">
                <i class="fa fa-plus"></i> 添加组合
            </a>
        </div>
        <div class="wk-user-mychoose-table-box">
            <div class="wk-user-sub-search text-right">
                <!--历史回测-->
                <div class="col-md-8 person-backtest">
                    <span class="compare_select"><img src="/static/imgs/i/person_backtest1.png">对比数据选择</span>&nbsp;&nbsp;
                    <ul class="compare_data">
                        <li class="yield pull-left"><input type="checkbox" value="收益率" name="wk-check-rate"> <span>收益率&nbsp;&nbsp;&nbsp;</span></li>
                        <li class="hot_degree pull-right"><input type="checkbox" value="查看热度" name="wk-check-hot"> <span>热度</span></li>
                    </ul>

                    <span class="position_ratio"><img src="/static/imgs/i/person_backtest3.png">持仓比</span>&nbsp;&nbsp;
                    <ul class="progress_bar">
                    </ul>
                    <input class="Wdate testfrom" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" value="<?php echo date('Y-m-d', time()) ?>">&nbsp;&nbsp;
                    <input class="Wdate testto" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" value="<?php echo date('Y-m-d', time()) ?>">&nbsp;&nbsp;
                    <button id="wk-history-btn">回测</button>
                </div>

                <div class="col-md-4">
                    <div class="input-group">
                        <div class="typeahead__container">
                            <div class="typeahead__field">
                                <span class="typeahead__query">
                                    <input class="form-control wk-user-stock-search" type="search" placeholder="请输入股票代码" autocomplete="off">
                                </span>
                                <span class="input-group-addon"><i class="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wk-user-mychoose-table table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <td>股票代码</td>
                        <td>股票名称</td>
                        <td>最新价</td>
                        <td>涨跌幅</td>
                        <td>成交量(万手)</td>
                        <td>换手率</td>
                        <td>市盈率</td>
                        <td>查看热度</td>
                        <td>搜索热度</td>
                        <td>关注热度</td>
                        <td><i class="fa fa-refresh wk-sub-refresh" data-refresh="我的自选股"></i></td>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <div class="wk-user-mynews" data-stock="00000x|" data-query-type="1" data-info-type="0">
            <div class="btn-group active" data-target="wk-user-news-list">
                <div class="wk-user-news-slider">
                    <span>新闻</span>
                    <i class="fa fa-chevron-down" data-expand="false"></i>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-vpoint-list">
                <div class="wk-user-vpoint-slider">
                    <span>达人观点</span>
                    <i class="fa fa-chevron-down" data-expand="false"></i>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-fastnews-list">
                <div class="wk-user-fastnews-slider">
                    <span>快讯</span>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-notice-list">
                <div class="wk-user-notice-slider">
                    <span>公告</span>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-report-list">
                <div class="wk-user-report-slider">
                    <span>研报</span>
                </div>
            </div>
        </div>
        <div class="wk-user-news-tabcon">
            <div class="wk-user-news-list" id="wk-user-news-list">
                <div class="wk-user-news-ctrl">
                    <div class="wk-user-news-ctrl-head">
                        <div class="user-default active"><label>默认</label></div>
                        <div class="user-define"><span>自定义</span>&nbsp;<i class="fa fa-caret-down" data-expand="false"></i></div>
                    </div>
                    <div class="wk-user-news-ctrl-con"></div>
                </div>
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-vpoint-list" id="wk-user-vpoint-list" style="display: none;">
                <div class="wk-user-vpoint-ctrl">
                    <div class="wk-user-news-ctrl-head">
                        <div class="user-default active"><label>默认</label></div>
                        <div class="user-define"><span>自定义</span>&nbsp;<i class="fa fa-caret-down" data-expand="false"></i></div>
                    </div>
                    <div class="wk-user-news-ctrl-con"></div>
                </div>
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-fastnews-list" id="wk-user-fastnews-list" style="display: none;">
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-notice-list" id="wk-user-notice-list" style="display: none;">
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-report-list" id="wk-user-report-list" style="display: none;">
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
        </div>
    </section>
    <!--历史回测模态框-->
    <div class="modal fade modal-chart" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">回测数据</h4>
                </div>
                <div class="modal-body">
                    <div id="modal-chart"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="http://js.97uimg.com/js/My97DatePicker/WdatePicker.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="../static/plugins/slider/js/bootstrap-slider.min.js"></script>
<script src="../static/plugins/My97DatePicker/WdatePicker.min.js"></script>
<script src="../static/js/all.min.js"></script>
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
<script src="../static/js/page/infocenter.js"></script>
</body>
</html>