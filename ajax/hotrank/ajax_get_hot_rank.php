<?php
/**
 * 获取首页热度数据
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$leaf_num = isset($_POST['leaf_num']) ? $_POST['leaf_num'] : "";
$operate_code = 1;
$datatype = isset($_POST['datatype']) ? $_POST['datatype'] : "";
$hot_type = isset($_POST['hot_type']) ? $_POST['hot_type'] : "";

$url = iwookongConfig::$requireUrl . "stock/1/top_twenty_stock.fcgi";
$result = RequestUtil::get($url, array(
    "user_id" =>$_SESSION['user_id'],
    "token" =>$_SESSION["token"],
    "leaf_num" => $leaf_num,
    "operate_code" => $operate_code,
    "datatype" => $datatype,
    "hot_type" => $hot_type
));
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

