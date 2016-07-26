<?php
/**
 * 获取公司简介数据
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$url = "http://iwookong/profile.json";
//$url = iwookongConfig::$requireUrl . "information/1/stock_base.fcgi";
$result = RequestUtil::get($url);
//var_dump($result);exit;
$jsonresult = json_decode($result, true);
if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    if ($jsonresult['msg'] == "权限不够") {
        print_r(json_encode(array("status" => -100, "result" => $jsonresult['msg'])));
    } else {
        print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
        return;
    }
}

