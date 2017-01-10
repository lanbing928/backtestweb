<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/../common/Utility.class.php");
if (CheckLogin::check() == -1) {
    header("Location:login.php ");
    exit();
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/common.min.css') ?>">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/trade-sys/holdings.css') ?>">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/trade-sys/trade.css') ?>">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/trade-sys/analysis.css') ?>">
</head>
<body>
<nav class="wk-header">
    <div class="container wk-container">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">
                <img src="/static/imgs/trade/logo.png">
                <spna class="navbar-title">模拟股票交易系统</spna>
            </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="wk-nav-search">
                    <div class="typeahead__container">
                        <div class="typeahead__field"><span class="typeahead__query"> <input class="wk-head-search" type="search" placeholder="搜索(股票/行业/概念/事件)" autocomplete="off"> </span>
                            <span class="typeahead__button"> <button> <i class="typeahead__search-icon"></i> </button> </span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right wk-nav-user">
                <li><a href="#">悟空首页</a></li>
                <li class="wk-nav-fuxi"><a href="#">&nbsp;|&nbsp;</a></li>
                <li><a href="#">伏羲回测</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="container wk-container wk-content">
    <!-- 左边菜单 -->
    <div class=" wk-nav-tabs left">
        <div class="wk-nav-hushen" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><img src="../static/imgs/trade/hushen.png">&nbsp;&nbsp;我的沪深</div>
        <ul class="nav" role="tablist" id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <li role="presentation" class="active"><a href="#holdings" role="tab" data-toggle="tab">持仓</a></li>
            <li role="presentation"><a href="#trade" role="tab" data-toggle="tab">交易</a></li>
            <li role="presentation"><a href="#analysis" role="tab" data-toggle="tab">收益分析</a></li>
        </ul>
    </div>
    <!-- 右边内容 -->
    <div class="tab-content left">
        <!-- 持仓 -->
        <section role="tabpanel" class="tab-pane active" id="holdings">
            内容容内容内容内容内容内容内容内容内容.内容容内容内容内容内容内容内
            容内容内容内容容内容内容内容内容内容内容内容内容内容容内容内容内容内
            容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容容内容
            内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内
        </section>
        <!-- 交易 -->
        <section role="tabpanel" class="tab-pane" id="trade">
            2
        </section>
        <!-- 收益分析 -->
        <section role="tabpanel" class="tab-pane" id="analysis">
            3
        </section>
    </div>
    <div class="clear"></div>
</div>

<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="http://js.97uimg.com/js/My97DatePicker/WdatePicker.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/common.min.js') ?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/Utility.min.js') ?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/all.js') ?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/trade-sys/holdings.js') ?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/trade-sys/trade.js') ?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/trade-sys/analysis.js') ?>"></script>
</body>
</html>