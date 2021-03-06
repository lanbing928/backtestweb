<?php
/**
 * 获取语句
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$flag = isset($_POST['flag']) ? $_POST['flag'] : "";
$pos = isset($_POST['pos']) ? $_POST['pos'] : "";
$count = isset($_POST['count']) ? $_POST['count'] : "";
$url = iwookongConfig::$requireBTUrl . "hotsuggest/1/hotsuggest.fcgi";
$result = RequestUtil::get($url, array(
    "uid" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "flag" =>$flag,
    "pos" =>$pos,
    "count" =>$count
));

print_r($result);
return;