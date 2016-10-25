<?php
require_once(dirname(__FILE__) . "/../common/Cookies.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
$userCookie = new Cookies();
$userInfo = $userCookie->get(iwookongConfig::$usercookie);
$message=$userCookie->get('message');
if (isset($userInfo)) {
    $info = json_decode($userInfo, true);
    $userName = $info['user_name'];
}
?>
<div class="wk-header">
    <div class="title container">
        <a href="/" class="fl"><div class="wk-backtest title_button">悟空回测</div></a>
        <a href="http://stock.iwookong.com" class="fl"><div class="wk-site title_button">返回悟空官网</div></a>
        <div class="clear"></div>
    </div>
    <img src="/static/imgs/backtest/name.png">
    <form id="form-hockey_v1" name="form-hockey_v1">
    <div class="typeahead__container">
        <div class="typeahead__field fl">
            <span class="typeahead__query"> <input class="wk-head-search"  name="car_v1[query]" type="search" placeholder="请输入回测关键词，用+号隔开....." autocomplete="off"></span>
            <span class="clock_time"><i class="typeahead__search-icon"></i></span>
            <span class="typeahead__button click_back"><button type="submit">回测一下</button></span>
        </div>
        </form>
        <div class="index_time">
            开始时间: <input class="testfrom" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" readonly><br/>
            结束时间: <input class="testto" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})" readonly>
        </div>
        <div class="clear"></div>
    </div>
</div>