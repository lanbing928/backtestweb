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
$stockCode = isset($_POST['stock']) ? $_POST['stock'] : "";
$url = iwookongConfig::$requireUrl . "information/1/stock_base.fcgi";
$result = RequestUtil::get($url, array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "stock_code" => $stockCode . ","
));
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