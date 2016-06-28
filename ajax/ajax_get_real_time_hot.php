<?php
/**
 * 获取首页实时热度
 */

require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
//获取实时热度
$real_timehot_result = RequestUtil::get(iwookongConfig::$requireUrl . "stock/1/real_time_hot.fcgi",
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"]
    ));
$json_rtr = json_decode($real_timehot_result, true);
if ($json_rtr['status'] != "0") {
    print_r($real_timehot_result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $json_rtr['msg'])));
    return;
}
