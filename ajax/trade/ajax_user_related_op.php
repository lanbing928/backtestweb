<?php
/**
 * 用户相关操作的接口
 * opcode 101 创建组合
 *        104 获取组合
 *        105 获取我的组合列表的股票
 *        106 获取当前持仓
 *        107 获取当日委托
 *        108 获取当日成交
 *        109 获取历史成交
 *        110 获取对账单
 *        111 买入/卖出
 *        112 获取用户组合下的当前持仓(某个组合下的所有股票)
 *        113 获取交易中可买股票的数量
 *        114 撤单
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}
//$opcode = isset($_GET['opcode']) ? $_GET['opcode'] : "";
$opcode = isset($_POST['opcode']) ? $_POST['opcode'] : "";
$code = isset($_POST['code']) ? $_POST['code'] : ""; //股票代码
$gid = isset($_POST['gid']) ? $_POST['gid'] : ""; //组合id
$order_price= isset($_POST['order_price']) ? $_POST['order_price'] : "";//委托价格
$expected_price = isset($_POST['expected_price']) ? $_POST['expected_price'] : "";//止损或止盈价格
$order_nums = isset($_POST['order_nums']) ? $_POST['order_nums'] : ""; //委托数量,单位：股
$order_operation = isset($_POST['order_operation']) ? $_POST['order_operation'] : ""; //交易类型，0：买，1：卖
$order_id = isset($_POST['order_id']) ? $_POST['order_id'] : ""; //撤单的订单id
$group_name = isset($_POST['group_name']) ? $_POST['group_name'] : ""; //组合名称
$code_list = isset($_POST['code_list']) ? $_POST['code_list'] : ""; //组合名称
$startTR= isset($_POST['start_time']) ? $_POST['start_time'] : "";//开始时间
$endTR= isset($_POST['end_time']) ? $_POST['end_time'] : "";//结束时间

$url = "http://61.147.114.67/cgi-bin/strade/user/user.fcgi";
$arr=array(
    "user_id" => '9999',
    "token" => 'abc',
    "opcode" => $opcode
);
switch ($opcode){
    case 101:
        $arr["group_name"] = $group_name;
        $arr["code_list"] = $code_list.',';
        break;
    case 105:
        $arr["group_id"] = $gid;
        break;
    case 106:
        $arr["group_id"] = 1;
        break;
    case 107:
        $arr["group_id"] = 1;
        break;
    case 108:
        $arr["group_id"] = 1;
        break;
    case 109:
        $arr["group_id"] = 1;
        break;
    case 110:
        $arr["group_id"] = 1;
        $arr["begin_time"] = $startTR;
        $arr["end_time"] = $endTR;
        break;
    case 111:
        $arr["group_id"] = $gid;
        $arr["code"] = $code;
        $arr["order_price"] = $order_price; //委托价格
        $arr["expected_price"] =$expected_price; //止损或止盈价格
        $arr["order_nums"] = $order_nums; //委托数量,单位：股
        $arr["order_operation"] = $order_operation; //0：买，1：卖
        break;
    case 112:
        $arr["group_id"] = $gid;
        break;
    case 113:
        $arr["group_id"] = 1;
        $arr["code"] = $code . ',';
        break;
    case 114:
        $arr["group_id"] = 1;
        $arr["order_id"] = 123;
        break;
}
$result = RequestUtil::get($url,$arr);
print_r($result);
return;

