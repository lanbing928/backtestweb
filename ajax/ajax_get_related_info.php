<?php
/**
 * 获取关联的信息
 */
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$query_type = isset($_POST['query_type']) ? $_POST['query_type'] : "";//1 - 股票资讯 2 - 行业资讯 3 - 概念资讯
$key = isset($_POST['key']) ? $_POST['key'] : "";//query_type = 1时为股票代码，query_type=2时为行业名, query_type=3时为概念名
$start_id = isset($_POST['start_id']) ? $_POST['start_id'] : "";//上一次获取到的最小的资讯id,第一次请求时为0
$start_time = isset($_POST['timestamp']) ? $_POST['timestamp'] : "";//上一次获取到的最小的资讯id的时间
//格式如 1,1,1,1,1,1
//第一个数字1表示要获取关联的新闻，如果填0表示不获取
//第二个数字1表示要获取关联的快讯，如果填0表示不获取
//第三个数字1表示要获取关联的达人观点，如果填0表示不获取
//第四个数字1表示要获取关联的股票，如果填0表示不获取
//第五个数字1表示要获取关联的行业,如果填0表示不获取
//第六个数字1表示要获取关联的概念，如果填0表示不获取
$info_type_list = isset($_POST['info_type_list']) ? $_POST['info_type_list'] : "";

//当是股票代码时加上任意字符
if ($query_type == 1) {
    $key = $key . ",";
}
$url = iwookongConfig::$requireUrl . "information/1/related_info.fcgi";
$result = RequestUtil::get($url,
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"],
        "query_type" => $query_type,
        "key" => $key,
        "start_id" => $start_id,
        "info_type_list" => $info_type_list,
        "start_time" => $start_time
    ));
$jsonresult = json_decode($result, true);
if ($jsonresult['status'] != "0") {
    print_r($result);
    return;
} else {
    print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
    return;
}