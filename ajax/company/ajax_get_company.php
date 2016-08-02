<?php
/**
 * 获取公司简介数据
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$stockCode = isset($_POST['stockcode']) ? $_POST['stockcode'] : "";
$stockCode=$stockCode.'s';
$htmltype = ($_POST['htmltype']);
if($htmltype=="profile"){
    $url = iwookongConfig::$requireCompanyUrl . "hot/1/company_profile.fcgi";
}elseif($htmltype=="cap_stru"){
    $url = iwookongConfig::$requireCompanyUrl . "hot/1/capital_structure.fcgi";
}elseif($htmltype=="executives"){
    $url = iwookongConfig::$requireCompanyUrl . "hot/1/company_administer.fcgi";
}elseif($htmltype=="stockholder"){
    $url = iwookongConfig::$requireCompanyUrl . "hot/1/major_shareholder.fcgi";
}
$result = RequestUtil::get($url, array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "stock_code" =>$stockCode
));

$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    if ($jsonresult['flag'] == -1302 || $jsonresult['flag'] == -1301) {
        print_r(json_encode(array("status" => -100, "result" => $jsonresult['msg'])));
        return;
    }
}