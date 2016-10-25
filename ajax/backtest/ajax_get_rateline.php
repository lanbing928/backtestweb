<?php
/**
 * 获取收益率走势
 */

require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$session_id = isset($_POST['sessionid']) ? $_POST['sessionid'] : "";
$url = iwookongConfig::$requireBTUrl . "kensho/1/btyield.fcgi";
//获取收益率走势图
$result = RequestUtil::get($url, array(
    "uid" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "sessionid" =>$session_id
));
print_r($result);
return;
