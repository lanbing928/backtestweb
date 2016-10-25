<?php
/**
 * 请求语句
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$pos = isset($_POST['pos']) ? $_POST['pos'] : "0";
$sessionid = isset($_POST['session']) ? $_POST['session'] : "";
$count = isset($_POST['count']) ? $_POST['count'] : "10";
//$url = "http://61.147.114.67/cgi-bin/backtest/kensho/1/btresult.fcgi";
$url = iwookongConfig::$requireBTUrl . "kensho/1/btresult.fcgi";

$result = RequestUtil::get($url, array(
    "uid" => $_SESSION['user_id'],
//    "uid" => 10001,
    "token" => $_SESSION["token"],
   "sessionid" => $sessionid,
    "pos" => $pos,
    "count" =>$count
));

print_r($result);
return;