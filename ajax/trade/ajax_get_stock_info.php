<?php
/**
 * 获取交易中个股的股票信息
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
//if (CheckLogin::check() == -1) {
//    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
//    return;
//}
$code= isset($_POST['code']) ? $_POST['code'] : "";
//$url = "http://61.147.114.67/cgi-bin/swookong/realinfo/1/realinfo_latest.fcgi";
$url = "http://61.147.114.67/cgi-bin/phtrade/realinfo/1/realinfo_latest.fcgi";
$result = RequestUtil::get($url, array(
    "user_id" => 9999,
    "token" => 'abc',
    "stock_code" =>$code.'s',
));

print_r($result);
return;