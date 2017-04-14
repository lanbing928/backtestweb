<?php
/**
 * 获取更多语句
 * flag 1，基本面 2.行情面 3.技术面 4.消息面 5热点事件 6最热语句
 * pos 最后一个语句
 * count 返回数目
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$mac_adr=getallheaders(); //获取header头信息
$mac_adr=isset($mac_adr['uuid']) ? $mac_adr['uuid'] : ""; //mac地址
$flag = isset($_POST['flag']) ? $_POST['flag'] : "";
$pos = isset($_POST['after_sentence']) ? $_POST['after_sentence'] : "";
$pos=urlencode($pos);
$count = isset($_POST['count']) ? $_POST['count'] : "";
$url = iwookongConfig::$requireBTUrl . "hotsuggest/1/allsuggest.fcgi";
$result = RequestUtil::get($url, array(
    "uid" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "uuid"  => $mac_adr,
    "flag" =>$flag,
    "after_sentence" =>$pos,
    "count" =>$count
));

print_r($result);
return;