<?php

require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$querytype = isset($_POST['query_type']) ? $_POST['query_type'] : "";
$keyname = isset($_POST['key_name']) ? $_POST['key_name'] : "";

//获取新闻情感趋势
$real_timehot_result = RequestUtil::get(iwookongConfig::$requireUrl . "infotrend/1/infosentitrend.fcgi",
    array(
        "user_id"    =>  $_SESSION['user_id'],
        "token"      =>  $_SESSION["token"],
        "query_type" =>  $querytype,
        "key_name"   =>  $keyname
    ));
$json_rtr = json_decode($real_timehot_result, true);
if ($json_rtr['status'] != "0") {
    print_r($real_timehot_result);
    return;
} else {
    if ($jsonresult['flag'] == -1302 || $jsonresult['flag'] == -1301) {
        print_r(json_encode(array("status" => -100, "result" => $jsonresult['msg'])));
        return;
    }
}
