<?php
/**
 * 获取热力图(日/周/月)
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}

$start_time = "";
$end_time = $start_time = time();

$query_type = isset($_POST['query_type']) ? $_POST['query_type'] : "";
$time_type = isset($_POST['time_type']) ? $_POST['time_type'] : "";
$key_name = isset($_POST['key_name']) ? $_POST['key_name'] : "";

if ($time_type == "day") {
    return;
}
if ($time_type == "week") {
    $start_time = strtotime('-7 day');
}
if ($time_type == "month") {
    $start_time = strtotime('-1 month');
}

$url = iwookongConfig::$requireUrl . "hotrecord/1/hotrecord.fcgi";
if ($query_type == 1 || $query_type == 0) {
    $key_name = $key_name . ",";
}
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"],
        "query_type" => $query_type,
        "start_time" => $start_time,
        "end_time" => $end_time,
        "key_name" => $key_name
    ));
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