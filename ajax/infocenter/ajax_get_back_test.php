<?php
set_time_limit(0);//设置超时时间
/**
 * 获取所有平台
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

$result = RequestUtil::post($url, $arrData);
$jsonresult = json_decode($result, true);
if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    if ($jsonresult['flag'] == -1302 || $jsonresult['flag'] == -1301) {
        print_r(json_encode(array("status" => -100, "result" => $jsonresult['msg'])));
        return;
    }
}
