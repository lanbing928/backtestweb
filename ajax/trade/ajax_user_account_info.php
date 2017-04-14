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
$mac_adr=getallheaders(); //获取header头信息
$mac_adr=isset($mac_adr['uuid']) ? $mac_adr['uuid'] : ""; //mac地址
$gid = isset($_POST['gid']) ? $_POST['gid'] : ""; //组合id
$opcode = isset($_POST['opcode']) ? $_POST['opcode'] : ""; //组合id

//$url = "http://61.147.114.67/cgi-bin/liuhw/strade/yields/user_account_info.fcgi";//localhost
$url = "http://61.147.114.67/cgi-bin/strade/yields/user_account_info.fcgi";//67
//$url = "http://61.147.114.67/cgi-bin/liuhw/strade_dev/yields/user_account_info.fcgi";//38
$arr=array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION['token'],
    "uuid"  => $mac_adr,
    "group_id" => $gid,
    "opcode" => $opcode
);
$result = RequestUtil::get($url,$arr);
print_r($result);
return;