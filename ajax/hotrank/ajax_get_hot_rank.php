<?php
/**
 * 获取首页热度数据
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$leaf_num = isset($_POST['leaf_num']) ? $_POST['leaf_num'] : "";//页码
$datatype = isset($_POST['datatype']) ? $_POST['datatype'] : "";//查看，搜索，关注
$hot_type = isset($_POST['hot_type']) ? $_POST['hot_type'] : "";//股票,行业，概念，事件
$operate_code = isset($_POST['operate_code']) ? $_POST['operate_code'] : "";//操作码

$hy = isset($_POST['hy']) ? $_POST['hy'] : "";//行业时使用
$gn = isset($_POST['gn']) ? $_POST['gn'] : "";//概念时使用
$hot_event = isset($_POST['hot_event']) ? $_POST['hot_event'] : "";//热点事件时使用

$arrData = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "leaf_num" => $leaf_num,
    "datatype" => $datatype,
    "hot_type" => $hot_type,
    "operate_code" => $operate_code
);
if (!empty($hy)) {
    $arrData["hy"] = urldecode($hy);
}
if (!empty($gn)) {
    $arrData["gn"] = urldecode($gn);
}
if (!empty($hot_event)) {
    $arrData["hot_event"] = urldecode($hot_event);
}
$url = iwookongConfig::$requireUrl . "stock/1/top_twenty_stock.fcgi";
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

