<?php
/**
 *获取大盘指数

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

$url = "http://61.147.114.67/cgi-bin/phtrade2/realinfo/1/realinfo_index.fcgi";
$arr=array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION['token'],
    "uuid"  => $mac_adr,
);
$result = RequestUtil::get($url,$arr);
print_r($result);
return;