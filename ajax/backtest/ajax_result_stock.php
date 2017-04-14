<?php
/**
 * 请求回测结果
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
$pos = isset($_POST['pos']) ? $_POST['pos'] : "0";
$sessionid = isset($_POST['session']) ? $_POST['session'] : "";
$count = isset($_POST['count']) ? $_POST['count'] : "10";
$url = iwookongConfig::$requireBTUrl . "kensho/1/btresult.fcgi";
$result = RequestUtil::get($url, array(
    "uid" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "uuid"  => $mac_adr,
   "sessionid" => $sessionid,
    "pos" => $pos,
    "count" =>$count
));
$new_result=json_decode($result, true);
if($new_result['body']['stocks']){
    for($i=0;$i<count($new_result['body']['stocks']);$i++){
        $new_result['body']['stocks'][$i]['uid']=$_SESSION['user_id'];
        $new_result['body']['stocks'][$i]['token']=$_SESSION['token'];
    }
}
$result=json_encode($new_result);
print_r($result);
return;