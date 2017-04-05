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
    <title>模拟交易</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/trade-sys/analysis.css') ?>">
</head>
<body>
<?php include(dirname(__FILE__) . "/../trade/header.php") ?>
<div class="container wk-container wk-content">
    <!-- 左边菜单 -->
    <div class=" wk-nav-tabs left">
        <div class="wk-nav-hushen"><img src="../static/imgs/trade/hushen.png">&nbsp;&nbsp;我的沪深</div>
        <ul class="nav">
            <li><a href="index.php">我的关注</a></li>
            <li><a href="holdings.php">我的账户</a></li>
            <li><a href="trade.php">模拟交易</a></li>
            <li class="active"><a href="analysis.php">收益分析</a></li>
        </ul>
    </div>
    <!-- 右边内容 -->
    <div class="tab-content wk-nav-content left">
        <!-- 收益分析 -->
        <section id="analysis">
            <div id="income-analyze"></div>
        </section>
    </div>
    <div class="clear"></div>
</div>
</body>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/trade-sys/analysis.js') ?>"></script>
</html>

