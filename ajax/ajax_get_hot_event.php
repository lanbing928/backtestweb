<?php
/**
 * 获取主题事件页，用户访问和转载图表数据
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}

$identifier = isset($_POST['identifier']) ? $_POST['identifier'] : "";

$url = iwookongConfig::$requireUrl . "hot_event/1/hot_event.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"],
        "identifier" => $identifier . ","
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