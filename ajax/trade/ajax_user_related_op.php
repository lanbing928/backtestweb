<?php
/**
 * 用户相关操作的接口
 * opcode 101 创建组合
 *        102 添加股票
 *        103 删除股票
 *        104 获取组合
 *        105 获取我的组合列表的股票
 *        106 获取当前持仓
 *        107 获取当日委托
 *        108 获取当日成交
 *        109 获取历史成交
 *        110 获取对账单
 *        111 买入/卖出
 *        112 获取用户组合下的当前持仓(某个组合下当前可卖数量)
 *        113 获取交易中可买股票的数量
 *        114 撤单
 *        115 盈利亏损笔数
 *        116 增加初始资金 capital=0.0时为查询用户所在账号的初始资金
 *        117 修改组合名称
 *        118 删除组合
 *
 *        120 创建关注
 *        121 修改关注名
 *        122 删除关注
 *        123 查询关注列表
 *        124 关注增加股票
 *        125 关注中删除股票(包括批量删除)
 *        126 关注中股票列表
 */
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/CheckUserLogin.class.php");
if (CheckLogin::check() == -1) {
    print_r(json_encode(array("status" => -1, "result" => "未知登录状态")));
    return;
}

$opcode = isset($_POST['opcode']) ? $_POST['opcode'] : "";
$code = isset($_POST['code']) ? $_POST['code'] : ""; //股票代码
$code_list = isset($_POST['code_list']) ? $_POST['code_list'] : ""; //股票列表
$gid = isset($_POST['gid']) ? $_POST['gid'] : ""; //组合id
$order_price= isset($_POST['order_price']) ? $_POST['order_price'] : "";//委托价格
$expected_price = isset($_POST['expected_price']) ? $_POST['expected_price'] : "";//止损或止盈价格
$order_nums = isset($_POST['order_nums']) ? $_POST['order_nums'] : ""; //委托数量,单位：股
$order_operation = isset($_POST['order_operation']) ? $_POST['order_operation'] : ""; //交易类型，0：买，1：卖
$order_id = isset($_POST['order_id']) ? $_POST['order_id'] : ""; //撤单的订单id
$group_name = isset($_POST['group_name']) ? urlencode($_POST['group_name']) : ""; //组合名称
$startTR= isset($_POST['start_time']) ? $_POST['start_time'] : "";//开始时间
$endTR= isset($_POST['end_time']) ? $_POST['end_time'] : "";//结束时间
$attention_id=isset($_POST['attention_id']) ? $_POST['attention_id'] : ""; //关注id
$attention_name = isset($_POST['attention_name']) ? $_POST['attention_name'] : ""; //关注名称

//$url = "http://61.147.114.67/cgi-bin/liuhw/strade/user/user.fcgi"; //localhost
$url = "http://61.147.114.67/cgi-bin/strade/user/user.fcgi"; //67
//$url = "http://61.147.114.67/cgi-bin/liuhw/strade_dev/user/user.fcgi"; //38
$arr=array(
    "user_id" =>$_SESSION['user_id'],
    "token" =>  $_SESSION["token"],
    "opcode" => $opcode
);
switch ($opcode){
    case 101: //创建组合
        $arr["group_name"] = $group_name;
        $arr["init_capital"]='500000,';
        break;
    case 102: //添加股票
        $arr["group_id"] = $gid;
        $arr["code_list"] = $code_list.',';
        break;
    case 103: //删除股票
        $arr["group_id"] = $gid;
        $arr["code_list"] = $code_list.',';
        break;
    case 105: //获取我的组合列表的股票
        $arr["group_id"] = $gid;
        break;
    case 106: //获取当前持仓
        $arr["group_id"] = $gid;
        break;
    case 107: //获取当日委托
        $arr["group_id"] = $gid;
        break;
    case 108: //获取当日成交
        $arr["group_id"] = $gid;
        break;
    case 109: //获取历史成交
        $arr["group_id"] = $gid;
        $arr["begin_time"] = $startTR;
        $arr["end_time"] = $endTR;
        break;
    case 110: //获取对账单
        $arr["group_id"] = $gid;
        $arr["begin_time"] = $startTR;
        $arr["end_time"] = $endTR;
        break;
    case 111: //委托买入/委托卖出
        $arr["group_id"] = $gid;
        $arr["code"] = $code;
        $arr["order_price"] = $order_price; //委托价格
        $arr["expected_price"] =$expected_price; //止损或止盈价格
        $arr["order_nums"] = $order_nums; //委托数量,单位：股
        $arr["order_operation"] = $order_operation; //0：买，1：卖
        break;
    case 112: //获取用户组合下的当前持仓(某个组合下当前可卖数量,组合总资金等)
        $arr["group_id"] = $gid;
        break;
    case 113: //获取最大可买
        $arr["group_id"] = $gid;
        $arr["code"] = $code . ',';
        break;
    case 114: //撤单
        $arr["group_id"] = $gid;
        $arr["order_id"] = $order_id;
        $arr["group_id"] = $gid;
        break;
    case 115: //盈利亏损笔数
        $arr["group_id"] = $gid;
        break;
    case 116:
        $arr["group_id"] = $gid;
        $arr["capital"] = "0.0";
        break;
    case 117:
        $arr["group_id"] = $gid;
        $arr["group_name"] = $group_name;//新组合名
        break;
    case 118:
        $arr["group_id"] = $gid;
        break;
    case 120:
        $arr["attention_id"] =  $attention_id;
        $arr["code_list"] = $code_list;
        $arr["attention_name"] = $attention_name;
        break;
    case 121:
        $arr["attention_id"] =  $attention_id;
        $arr["attention_name"] = $attention_name;
        break;
    case 122:
        $arr["attention_id"] =  $attention_id;
        break;
    case 124:
        $arr["attention_id"] =  $attention_id;
        $arr["code_list"] = $code_list;
        break;
    case 125:
        $arr["attention_id"] = $attention_id;
        $arr["code_list"] = $code_list;
        break;
    case 126:
        $arr["attention_id"] = $attention_id;
        break;
    case 131:
        $arr["group_id"] = $gid;
        $arr["code"] = $code_list;
        $arr["order_price"] = $order_price; //委托价格
        $arr["expected_price"] =$expected_price; //止损或止盈价格
        $arr["order_nums"] = $order_nums; //委托数量,单位：股
        $arr["order_operation"] = $order_operation; //0：买，1：卖
        break;
}
$result = RequestUtil::get($url,$arr);
print_r($result);
return;
