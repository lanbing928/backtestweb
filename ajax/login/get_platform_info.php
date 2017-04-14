<?php
/**
 * 获取营业部id和名称
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");

$url = iwookongConfig::$requireBTUrl . "user/1/get_platform_info.fcgi?1=1";
$result = RequestUtil::get($url,
    array(
        "uuid" => $mac_adr
    ));
$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}