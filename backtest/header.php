<?php
require_once(dirname(__FILE__) . "/../common/Cookies.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
$userCookie = new Cookies();
$userInfo = $userCookie->get(iwookongConfig::$usercookie);
//$message=$userCookie->get('message');
if (isset($userInfo)) {
    $info = json_decode($userInfo, true);
    $userName = $info['user_name'];
    $uid = $info['user_id'];
    $token = $info['token'];
}else{
    $uid = '';
    $token = '';
}
?>
<div class="wk-header" name="top1" id="top1">
    <div class="title container">
        <a href="/" class="fl"><div class="wk-backtest title_button">悟空回测</div></a>
        <a href="http://stock.iwookong.com/ajax/login/nologin.php?uid=<?php echo $uid ?>&token=<?php echo $token ?>" class="fl" target="_blank"><div class="wk-site title_button">返回悟空官网</div></a>
        <a href='../logout.php' class="fr logout"><img src="../static/imgs/i/exit.png" alt="">&nbsp退出</a>
        <div class="clear"></div>
    </div>
    <img src="/static/imgs/backtest/name.png" class="logo">
    <form id="form-hockey_v1" name="form-hockey_v1">
    <div class="typeahead__container">
        <div class="typeahead__field fl">
            <span class="typeahead__query"> <input class="wk-head-search"  name="car_v1[query]" type="search" placeholder="请输入回测关键词，用+号隔开....." autocomplete="off"></span>
            <span class="clock_time"><i class="typeahead__search-icon"></i></span>
            <span class="typeahead__button click_back"><button type="submit">回测一下</button></span>
        </div>
        </form>
        <div class="index_time">
            开始时间: <input class="testfrom" onFocus="WdatePicker()" readonly><br/>
            结束时间: <input class="testto" onFocus="WdatePicker()" readonly>
        </div>
        <div class="clear"></div>
    </div>
</div>