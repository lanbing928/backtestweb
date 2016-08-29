<?php
/**
 * 发布页 获取历史任务
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$message = isset($_POST['message']) ? $_POST['message'] : "";
$url = iwookongConfig::$requireReleaseUrl . "forwarding/1/group_task.fcgi";

$result = RequestUtil::get($url, array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "message" => $message
));
print_r($result);
return;