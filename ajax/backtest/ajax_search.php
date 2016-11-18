<?php
/**
 * 回测平台 模糊搜索
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$message = isset($_GET["message"]) ? $_GET["message"] : "";
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
        "sonditions" => $message.','
    ));
$jsonresultc=json_decode($result, true);

$jsonresult=$jsonresultc['body']['prompt'];

if($jsonresultc['head']['status']==-103){
    $jsonresult=$jsonresultc['head'];
}

$newresult=json_encode_ex($jsonresult);
function json_encode_ex($value)
{
    if (version_compare(PHP_VERSION,'5.4.0','<'))
    {
        $str = json_encode($value);
        $str = preg_replace_callback(
            "#\\\u([0-9a-f]{4})#i",
            function($matchs)
            {
                return iconv('UCS-2BE', 'UTF-8', pack('H4', $matchs[1]));
            },
            $str
        );
        return $str;
    }
    else
    {
        return json_encode($value, JSON_UNESCAPED_UNICODE);
    }
}
print_r($newresult);
return;