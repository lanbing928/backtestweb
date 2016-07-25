<?php
/**
 * 获取收益率走势
 */

require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$arrData = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"]
);
$query_date = isset($_POST['query_date']) ? $_POST['query_date'] : "";
$query_type = isset($_POST['query_type']) ? $_POST['query_type'] : "";
$query_key = isset($_POST['query_key']) ? $_POST['query_key'] : "";
if (empty($query_date) || empty($query_type) || empty($query_key)) {
    print_r(json_encode(array("status" => 0, "result" => "参数有误")));
}
if ($query_type == "stock") {
    $arrData["stock_code"] = "," . $query_key;
} else {
    $arrData["event"] = $query_key;
    $arrData["classify"] = $query_type;
}
switch ($query_date) {
    case "today":
        $arrData["cycle_type"] = "current";
        break;
    case "week":
        $start_date = date('Y-m-d', strtotime('-7 day'));
        $arrData["start_date"] = "," . $start_date;
        $arrData["cycle_type"] = "bydate";
        break;
    case "month":
        $start_date = date('Y-m-d', strtotime('-1 month'));
        $arrData["start_date"] = "," . $start_date;
        $arrData["cycle_type"] = "bydate";
        break;
    case "threemonth":
        $start_date = date('Y-m-d', strtotime('-3 month'));
        $arrData["start_date"] = "," . $start_date;
        $arrData["cycle_type"] = "bydate";
        break;
}
//获取收益率走势图
$stock_line_result = RequestUtil::get(iwookongConfig::$requireRateUrl."stock/v1/stockhotdiagram.fcgi", $arrData);
$json_line = json_decode($stock_line_result, true);
if ($json_line['status'] != "0") {
    print_r($stock_line_result);
    return;
} else {
    if ($json_line['msg'] == "权限不够") {
        print_r(json_encode(array("status" => -100, "result" => $json_line['msg'])));
    } else {
        print_r(json_encode(array("status" => 0, "result" => $json_line['msg'])));
        return;
    }
}
