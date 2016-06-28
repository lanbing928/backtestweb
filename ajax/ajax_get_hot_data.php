<?php
/**
 * 获取首页热度数据
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$hottype = isset($_POST['hottype']) ? $_POST['hottype'] : "";
$hotval = isset($_POST['hotval']) ? $_POST['hotval'] : "";
$arrData = array();
$arrData["user_id"] = $_SESSION['user_id'];
$arrData["token"] = $_SESSION["token"];
if ($hottype == "hy") {
    $arrData["hy"] = $hotval;
}
if ($hottype == "gn") {
    $arrData["gn"] = $hotval;
}
$url = iwookongConfig::$requireUrl . "stock/1/top_twenty_stock.fcgi";
$result = RequestUtil::get($url, $arrData);
$jsonresult = json_decode($result, true);
if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}
