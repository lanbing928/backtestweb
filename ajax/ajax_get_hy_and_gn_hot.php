<?php
/**
 * 获取行业&&概念热度
 */

require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$query_type = isset($_POST['query_type']) ? $_POST['query_type'] : "";
$name = isset($_POST['name']) ? $_POST['name'] : "";
$hour_data = isset($_POST['hour_data']) ? $_POST['hour_data'] : "";
$minute_data = isset($_POST['minute_data']) ? $_POST['minute_data'] : "";
$arrData = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "query_type" => $query_type,
    "key" => $name
);
if (!empty($hour_data)) {
    $arrData["hour_data"] = $hour_data;
}
if (!empty($minute_data)) {
    $arrData["minute_data"] = $minute_data;
}
//获取实时热度
$stock_line_result = RequestUtil::get(iwookongConfig::$requireUrl . "stock/1/hy_and_gn_hot.fcgi", $arrData);
$json_line = json_decode($stock_line_result, true);
if ($json_line['status'] != "0") {
    print_r($stock_line_result);
    return;
} else {
    if ($jsonresult['flag'] == -1302 || $jsonresult['flag'] == -1301) {
        print_r(json_encode(array("status" => -100, "result" => $jsonresult['msg'])));
        return;
    }
}
