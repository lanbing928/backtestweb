<?php
/**
 * 用户新闻平台的操作
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$custom_type = isset($_POST['custom_type']) ? $_POST['custom_type'] : "";
$plat_id = isset($_POST['plat_id']) ? $_POST['plat_id'] : "";

$arrData = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "custom_type" => $custom_type,
    "plat_id" => $plat_id
);
$url = iwookongConfig::$requireUrl . "custominfo/1/customplat.fcgi";
$result = RequestUtil::get($url, $arrData);
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
