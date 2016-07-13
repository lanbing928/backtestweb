<?php
/**
 * 获取个人信息页面头部大盘数据
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$operate_code = isset($_POST['operate_code']) ? $_POST['operate_code'] : "";
$arrData = array(
    "user_id" => $_SESSION['user_id'],
    "token" => $_SESSION["token"],
    "operate_code" => $operate_code
);
switch ($operate_code) {
    case 1:
        $arrData["ori_name"] = isset($_POST['ori_name']) ? urlencode($_POST['ori_name'] . ",") : "";
        break;
    case 2:
        $arrData["ori_name"] = isset($_POST['ori_name']) ? urlencode($_POST['ori_name'] . ",") : "";
        break;
    case 3:
        $arrData["ori_name"] = isset($_POST['ori_name']) ? urlencode($_POST['ori_name'] . ",") : "";
        $arrData["cur_name"] = isset($_POST['cur_name']) ? urlencode($_POST['cur_name'] . ",") : "";
        break;
    case 4:
        break;
    case 5:
        $arrData["ori_name"] = isset($_POST['ori_name']) ? urlencode($_POST['ori_name'] . ",") : "";
        $arrData["code"] = isset($_POST['code']) ? $_POST['code'] . "," : "";
        break;
    case 6:
        $arrData["ori_name"] = isset($_POST['ori_name']) ? urlencode($_POST['ori_name'] . ",") : "";
        $arrData["code"] = isset($_POST['code']) ? $_POST['code'] . "," : "";
        break;
    case 7:
        $arrData["ori_name"] = isset($_POST['ori_name']) ? urlencode($_POST['ori_name'] . ",") : "";
        break;
    case 8:
        break;
    default:
        break;
}
$url = iwookongConfig::$requireUrl . "stock/1/stock_group.fcgi";
$result = RequestUtil::get($url, $arrData);
$jsonresult = json_decode($result, true);
if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    if ($jsonresult['msg'] == "权限不够") {
        print_r(json_encode(array("status" => -100, "result" => $jsonresult['msg'])));
    } else {
        print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
        return;
    }
}
