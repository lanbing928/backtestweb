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
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/css/index.min.css">
</head>
<body>
<?php include("../share/_userheader.php") ?>
<div class="container wk-container">
    <section class="wk-user-center">
        <div class="wk-user-datas">
            <div class="col-md-4">
                <div class="wk-user-datas-box wk-up">
                    <p class="wk-user-datas-title">上证指数</p>
                    <div>
                        <p class="wk-user-datas-num">
                            <img src="../static/imgs/i/dp_up.png" alt="">
                            2953
                        </p>
                        <div class="wk-user-datas-per">
                            <p>+123</p>
                            <p>+123%</p>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="col-md-4">
                <div class="wk-user-datas-box wk-datas-c wk-up">
                    <p class="wk-user-datas-title">上证指数</p>
                    <div>
                        <p class="wk-user-datas-num">
                            <img src="../static/imgs/i/dp_up.png" alt="">
                            2953
                        </p>
                        <div class="wk-user-datas-per">
                            <p>+123</p>
                            <p>+123%</p>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
            <div class="col-md-4">
                <div class="wk-user-datas-box wk-datas-r wk-down">
                    <p class="wk-user-datas-title">上证指数</p>
                    <div>
                        <p class="wk-user-datas-num">
                            <img src="../static/imgs/i/dp_down.png" alt="">
                            2953
                        </p>
                        <div class="wk-user-datas-per">
                            <p>-123</p>
                            <p>-123%</p>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>
        </div>
        <div class="wk-user-mychoose">
            <div class="wk-user-choose-title">
                <div class="active">我的自选股</div>
                <div class="btn-group">
                    <span>自选组合</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
                    <ul class="dropdown-menu">
                        <li><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>
                        <li><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <span>自选组合</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
                    <ul class="dropdown-menu">
                        <li><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>
                        <li><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <span>自选组合</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
                    <ul class="dropdown-menu">
                        <li><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>
                        <li><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <span>自选组合</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
                    <ul class="dropdown-menu">
                        <li><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>
                        <li><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <span>自选组合</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
                    <ul class="dropdown-menu">
                        <li><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>
                        <li><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>
                    </ul>
                </div>
                <div class="btn-group">
                    <span>自选组合</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
                    <ul class="dropdown-menu">
                        <li><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>
                        <li><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>
                    </ul>
                </div>
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
                        <input class="form-control wk-user-stock-search" type="text" placeholder="请输入股票代码">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
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
                        <th>关注热度&nbsp;&nbsp;<i class="fa fa-refresh wk-sub-refresh"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    <tr>
                        <td>600161</td>
                        <td>腾达建设</td>
                        <td>27.02</td>
                        <td>+0.63%</td>
                        <td>8500万</td>
                        <td>0.02%</td>
                        <td>219.96</td>
                        <td>56215</td>
                        <td>3365</td>
                        <td>5463</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="wk-user-mynews">
            <div class="btn-group active">
                <span>新闻</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
            </div>
            <div class="btn-group">
                <span>大V观点</span>
                    <span class="dropdown-toggle" data-toggle="dropdown">
                        <span class="fa fa-chevron-down"></span>
                    </span>
            </div>
            <div class="btn-group">
                <span>快讯</span>
            </div>
        </div>
        <div class="wk-user-news-list">
            <div class="wk-user-news">
                <label>腾达建设(600161)</label><label>招商银行(600162)</label>
                <p>万亿住房租赁市场 两类标的明显受益</p>
                <p></p>
                <p><span>来源:同花顺</span><span>2016-07-05 17:09</span></p>
            </div>
        </div>
        <div class="wk-user-vpoint-list">

        </div>
        <div class="wk-user-fastnews-list">

        </div>
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
<script>
    $(".wk-user-choose-title div").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".wk-user-mynews .btn-group").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".wk-sub-refresh").click(function () {
        $(this).addClass("fa-spin");
    })
</script>
</body>
</html>