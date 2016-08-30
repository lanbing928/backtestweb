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
<!--    <link rel="stylesheet" href="../static/css/common.min.css">-->
    <link rel="stylesheet" href="../static/css/backtest.css">
</head>
<body>
<?php include(dirname(__FILE__) . "/../backtest/header.php") ?>
<div class="wk-index-content container">
   <div class="index_time row">
       <div class="col-md-1" style="width:50px;"><img src="/static/imgs/backtest/clock.png"></div>
       <div class="col-md-3">
          开始时间：<input class="testfrom" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" value="<?php echo date('Y-m-d', time()) ?>">&nbsp;&nbsp;
       </div>
       <div class="col-md-3">
           结束时间：<input class="testto" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" value="<?php echo date('Y-m-d', time()) ?>">&nbsp;&nbsp;
       </div>
   </div>
   <div class="index_recommend row">
       <div class="col-md-4 new_words">
           <div class="new_title">最热语句</div>
           <img src="/static/imgs/backtest/line1.png">
           <ul>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
           </ul>
       </div>

       <div class="col-md-4 hot_events">
           <div class="hot_title">最热语句</div>
           <img src="/static/imgs/backtest/line2.png">
           <ul>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
           </ul>
       </div>

       <div class="col-md-4 classic_words">
           <div class="classic_title">最热语句</div>
           <img src="/static/imgs/backtest/line3.png">
           <ul>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
               <a href=""><li>总股本大于10亿</li></a>
           </ul>
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
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
<script src="../static/js/page/backtest.js"></script>
</body>
</html>