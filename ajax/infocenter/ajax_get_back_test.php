<?php
/**
 * 获取回测数据
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$stocks_info = isset($_POST['stocks_info']) ? $_POST['stocks_info'] : "";
$start_time = isset($_POST['start_time']) ? $_POST['start_time'] : "";
$end_time = isset($_POST['end_time']) ? $_POST['end_time'] : "";
$arrData = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "stocks_info" => $stocks_info,
    "start_date"  => $start_time,
    "end_date"  => $end_time,
    "name"  => 'CustomWeightObserver',
);
$url = iwookongConfig::$requireBackUrl . "stockhotdiagram.fcgi";

$result = RequestUtil::get($url, $arrData);
$jsonresult = json_decode($result, true);
print_r($result);
return;

