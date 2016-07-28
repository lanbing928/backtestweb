<?php
/**
 * Created by Lee.
 * Description:获取关联的行业股票概念
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$query_type = isset($_POST["query_type"]) ? $_POST["query_type"] : "";
$key_name = isset($_POST["key_name"]) ? $_POST["key_name"] : "";
if ($query_type == 1) {
    $key_name = $key_name . "s";
}
//获取实时热度
$real_relate_result = RequestUtil::get(iwookongConfig::$requireUrl . "information/1/relate_shg.fcgi",
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"],
        "query_type" => $query_type,
        "key_name" => $key_name
    ));
$json_rtr = json_decode($real_relate_result, true);
if ($json_rtr['status'] != "0") {
    print_r($real_relate_result);
    return;
} else {
    if ($jsonresult['flag'] == -1302 || $jsonresult['flag'] == -1301) {
        print_r(json_encode(array("status" => -100, "result" => $jsonresult['msg'])));
        return;
    }
}
