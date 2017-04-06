<?php
/**
 * 账户收益率对比

 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
//if (CheckLogin::check() == -1) {
//    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
//    return;
//}
$startTR= isset($_POST['start_time']) ? $_POST['start_time'] : "";//开始时间
$endTR= isset($_POST['end_time']) ? $_POST['end_time'] : "";//结束时间
//$url ="http://61.147.114.67/cgi-bin/liuhw/strade/yields/user_account_info.fcgi";//localhost
$url ="http://61.147.114.67/cgi-bin/strade/yields/user_account_info.fcgi";//67
//$url ="http://61.147.114.67/cgi-bin/liuhw/strade_dev/yields/user_account_info.fcgi";//38
$arr=array(
    "user_id" =>$_SESSION['user_id'],
    "token" =>  $_SESSION["token"],
    "opcode"=>130,
    "begin_date"=>'2017-02-24',
    "end_date"=>'2017-3-24'
);
$result = RequestUtil::get($url,$arr);
print_r($result);
return;


