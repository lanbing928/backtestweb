<?php
/**
 * 回测平台 模糊搜索 验证
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$mac_adr=isset(getallheaders()['uuid']) ? getallheaders()['uuid'] : ""; //mac地址
$message = isset($_POST["message"]) ? $_POST["message"] : "";
if (empty($message)) {
    print_r(json_encode(array("status" => 0, "result" => "搜索关键字为空")));
    return;
}
$message=urlencode($message);
$url = iwookongConfig::$requireBTUrl . "search/1/btsearch.fcgi";
$result = RequestUtil::get($url,
    array(
        "uid" => $_SESSION['user_id'],
        "token" => $_SESSION["token"],
        "uuid"  => $mac_adr,
        "sonditions" => $message.','
    ));
$jsonresultc=json_decode($result, true);

$jsonresult=$jsonresultc['body']['check'];
if($jsonresultc['head']['status']==-103){
    $jsonresult=$jsonresultc['head'];
}
$newresult=json_encode($jsonresult);
print_r($newresult);
return;