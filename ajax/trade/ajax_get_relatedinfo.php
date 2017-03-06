<?php
/**
 * 获取用户中心关联资讯
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
$query_type = isset($_POST['query_type']) ? $_POST['query_type'] : "";
$start_time = isset($_POST['start_time']) ? $_POST['start_time'] : "";
$info_type = isset($_POST['info_type']) ? $_POST['info_type'] : "";
$stock_list = isset($_POST['stock_list']) ? $_POST['stock_list'] : "";
$start_id = isset($_POST['start_id']) ? $_POST['start_id'] : "0";

$arrData = array(
    "user_id" => 9999,
    "token" => $_SESSION["token"],
   // "query_type" => $query_type,
      "query_type" => 1,
   //  "start_time" => $start_time,
    "start_time" => 1475146685633,
   // "info_type" => $info_type,
      "info_type" => 0,
   //  "stock_list" => $stock_list,
    "stock_list" => '000002|000600|600120|600503|600556|600663|600751|601229|601390|',
   //  "start_id" => $start_id
    "start_id" => 718621
);
$url = iwookongConfig::$requireUrl . "custominfo/1/relatedinfo.fcgi";
$result = RequestUtil::get($url, $arrData);
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