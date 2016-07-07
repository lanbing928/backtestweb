<?php
/**
 * 获取用户中心关联资讯
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$query_type = isset($_POST['query_type']) ? $_POST['query_type'] : "";
$start_time = isset($_POST['start_time']) ? $_POST['start_time'] : "";
$info_type = isset($_POST['info_type']) ? $_POST['info_type'] : "";
$stock_list = isset($_POST['stock_list']) ? $_POST['stock_list'] : "";

$arrData = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "query_type" => $query_type,
    "start_time" => $start_time,
    "info_type" => $info_type,
    "stock_list" => $stock_list
);
$url = iwookongConfig::$requireUrl . "custominfo/1/relatedinfo.fcgi";
$result = RequestUtil::get($url, $arrData);
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
