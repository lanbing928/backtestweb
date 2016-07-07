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
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/css/index.min.css">
</head>
<body>
<?php include("../share/_userheader.php") ?>
<div class="container wk-container">
    <section class="wk-user-center">
        <div class="wk-user-datas"></div>
        <div class="wk-user-mychoose">
            <div class="wk-user-choose-title">
                <div class="active" data-group-name="我的自选股">我的自选股</div>
            </div>
            <a class="btn btn-default btn-sm wk-add-zh">
                <i class="fa fa-plus"></i> 添加组合
            </a>
        </div>
        <div class="wk-user-mychoose-table-box">
            <div class="wk-user-sub-search text-right">
                <div class="col-md-4 col-md-offset-4">
                    <label class="wk-user-time"><span>北京</span><span>15:20:30</span></label>
                    <label class="wk-user-hs"><span>沪深</span><span>交易中</span></label>
                </div>
                <div class="col-md-4">
                    <div class="input-group">
                        <div class="typeahead__container">
                            <div class="typeahead__field"><span class="typeahead__query">
                                    <input class="form-control wk-user-stock-search" type="search" placeholder="请输入股票代码" autocomplete="off">

                                </span>
                                <span class="input-group-addon"><i class="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wk-user-mychoose-table">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>股票代码</th>
                        <th>股票名称</th>
                        <th>最新价</th>
                        <th>涨跌幅</th>
                        <th>成交量(手)</th>
                        <th>换手率</th>
                        <th>市盈率</th>
                        <th>查看热度</th>
                        <th>搜索热度</th>
                        <th>关注热度</th>
                        <th><i class="fa fa-refresh wk-sub-refresh" data-refresh="我的自选股"></i></th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <div class="wk-user-mynews">
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
        </div>
        <div class="wk-user-news-tabcon">
            <div class="wk-user-news-list" id="wk-user-news-list">
                <div class="wk-user-news-ctrl">
                    <div class="wk-user-news-ctrl-head">
                        <div><label>默认</label></div>
                        <div class="user-define">自定义&nbsp;<i class="fa fa-caret-down" data-expand="false"></i></div>
                    </div>
                    <div class="wk-user-news-ctrl-con">
                        <div class="con-item">
                            <label>
                                <div>
                                    <span class="active">大智慧</span>
                                    &nbsp;<i class="fa fa-times-circle"></i>
                                </div>
                            </label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label>
                                <div>
                                    <span class="active">大智慧</span>
                                    &nbsp;<i class="fa fa-times-circle"></i>
                                </div>
                            </label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label>
                                <div>
                                    <span class="active">大智慧</span>
                                    &nbsp;<i class="fa fa-times-circle"></i>
                                </div>
                            </label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label>
                                <div>
                                    <span class="active">大智慧</span>
                                    &nbsp;<i class="fa fa-times-circle"></i>
                                </div>
                            </label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                    </div>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="wk-user-vpoint-list" id="wk-user-vpoint-list" style="display: none;">
                <div class="wk-user-vpoint-ctrl">
                    <div class="wk-user-news-ctrl-head">
                        <div><label>默认</label></div>
                        <div class="user-define">自定义&nbsp;<i class="fa fa-caret-down" data-expand="false"></i></div>
                    </div>
                    <div class="wk-user-news-ctrl-con">
                        <div class="con-item">
                            <label>
                                <div>
                                    <span class="active">大智慧</span>
                                    &nbsp;<i class="fa fa-times-circle"></i>
                                </div>
                            </label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                        <div class="con-item">
                            <label><span>大智慧</span>&nbsp;<i class="fa fa-plus"></i></label>
                        </div>
                    </div>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">达人蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
                <div class="wk-news-list" id="news_173497" data-news-timestamp="1467649961027">
                    <div class="wk-news-list-head">
                        <p class="wk-news-list-title">
                            <a href="detail.php?infoid=173497" target="_blank">蓝筹股集体发力 有色金属等三板块成领涨风向标</a>
                        </p>
                        <span class="wk-news-list-tips wk-lihao"></span>
                    </div>
                    <div class="wk-news-list-con">
                        <p>
                            <strong>【机器人摘要】</strong>
                            其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）、亚星锚链（601890）等冲击涨停，中国船舶（600150）、钢构工程（600072）、中国重工（601989）、中航机电（002013）、中直股份（600038）、洪都航空（600316）、航天电子（600879）、光电股份（600184）等涨幅超5%。
                            <a href="detail.php?infoid=173497" target="_blank"><i class="fa fa-link"></i>详情链接</a>
                        </p>
                        <span>来源：金融界&nbsp;&nbsp;&nbsp;&nbsp;2016-07-05 00:32</span>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="wk-user-fastnews-list" id="wk-user-fastnews-list" style="display: none;">
                <div class="wk-user-fastnews">
                    <span class="wk-user-fastnews-dot">●</span>
                    <p class="wk-user-fastnews-todate">2016-07-05</p>
                    <ul>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                    </ul>
                </div>
                <div class="wk-user-fastnews">
                    <span class="wk-user-fastnews-dot">●</span>
                    <p class="wk-user-fastnews-todate">2016-07-04</p>
                    <ul>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                    </ul>
                </div>
                <div class="wk-user-fastnews">
                    <span class="wk-user-fastnews-dot">●</span>
                    <p class="wk-user-fastnews-todate">2016-07-03</p>
                    <ul>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                    </ul>
                </div>
                <div class="wk-user-fastnews">
                    <span class="wk-user-fastnews-dot">●</span>
                    <p class="wk-user-fastnews-todate">2016-07-03</p>
                    <ul>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                        <li>
                            <label>15:15</label>
                            <p>其中，以军工板块为首，是推动大盘向上的又一大力量：中船防务（600685）、中航飞机（000768）、航天通信（600677）</p>
                        </li>
                    </ul>
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
<script src="../static/js/page/infocenter.js"></script>
</body>
</html>