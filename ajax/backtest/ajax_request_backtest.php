<?php
/**
 * 请求 回测结果
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$content = isset($_POST['search']) ? $_POST['search'] : "";
$start = isset($_POST['start_time']) ? $_POST['start_time'] : "";
$end = isset($_POST['end_time']) ? $_POST['end_time'] : "";
$baseSessionid=isset($_POST['base_sessionid']) ? $_POST['base_sessionid'] : "";
$url = iwookongConfig::$requireBTUrl . "kensho/1/btsentence.fcgi";

$result = RequestUtil::get($url, array(
    "uid" => $_SESSION['user_id'],
    "token" =>  $_SESSION["token"],
    "sonditions" => $content,
    "start_time" => $start,
    "end_time" => $end,
    "base_sessionid" => $baseSessionid
));


print_r($result);
return;