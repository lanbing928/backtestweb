<?php
/**
 *获取大盘指数

 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
//require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
//if (CheckLogin::check() == -1) {
//    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
//    return;
//}

$url = "http://61.147.114.67/cgi-bin/phtrade2/realinfo/1/realinfo_index.fcgi";
$arr=array(
    "user_id" => '9999',
    "token" => '2333s'
);
$result = RequestUtil::get($url,$arr);
print_r($result);
return;