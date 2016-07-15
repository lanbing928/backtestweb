<?php
/**
 * 获取事件新闻
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$info_type = isset($_POST['info_type']) ? $_POST['info_type'] : "";
$key_name = isset($_POST['key_name']) ? $_POST['key_name'] : "";
$start_id = isset($_POST['start_id']) ? $_POST['start_id'] : "";
$start_time = isset($_POST['start_time']) ? $_POST['start_time'] : "";
$url = iwookongConfig::$requireUrl . "eventinfo/1/event_relatedinfo.fcgi";
$result = RequestUtil::get($url, 
array(
    'user_id' => $_SESSION['user_id'],
    'token'=> $_SESSION["token"],
    'info_type'=>$info_type,//0 - 新闻 1-快讯 2-自媒体 4-公告
    'key_name'=>$key_name,
    'start_time'=>$start_time,
    'start_id'=>$start_id
    )
);
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
