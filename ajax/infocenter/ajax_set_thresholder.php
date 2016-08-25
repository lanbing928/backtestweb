<?php
/**
 * 设置提醒阀值
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$stock = isset($_POST['stock']) ? $_POST['stock'] : "";
$hot = isset($_POST['hot']) ? $_POST['hot'] : "";
$yield = isset($_POST['yield']) ? $_POST['yield'] : "";
$url = iwookongConfig::$requireReleaseUrl . "forwarding/1/group_task.fcgi";
$result = RequestUtil::get($url, array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "stock" => $stock,
    "hot" => $stock,
    "yield" => $yield
));
print_r($result);
return;