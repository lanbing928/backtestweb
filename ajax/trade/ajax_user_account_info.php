<?php
/**
 * 用户资产变动

 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}

$url = "http://61.147.114.67/cgi-bin/tangtao/yields/1/user_account_info.fcgi";
$arr=array(
    "user_id" => '666',
    "token" => 'abc'
);
$result = RequestUtil::get($url,$arr);
print_r($result);
return;