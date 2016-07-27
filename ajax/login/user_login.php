<?php
/**
 * Created by Lee.
 * Date: 2016/5/12 0012 16:42
 * Description:用户登录
 */
session_start();
require_once(dirname(__FILE__) . "/../../common/Request.class.php");
require_once(dirname(__FILE__) . "/../../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../../common/VerifyAction.class.php");
require_once(dirname(__FILE__) . "/../../common/Cookies.class.php");

$username = isset($_POST['user_name']) ? $_POST['user_name'] : "";      //用户名
$userpwd = isset($_POST['password']) ? $_POST['password'] : "";         //密码
$platformid = isset($_POST['platform_id']) ? $_POST['platform_id'] : "";//平台ID
$autologin = isset($_POST['autologin']) ? $_POST['autologin'] : false;  //自动登录

if (empty($username) || empty($userpwd)) {
    print_r(json_encode(array("status" => 0, "result" => "账号或密码为空")));
    return;
}
if (!VerifyAction::isPwd($userpwd, 6, 16)) {
    print_r(json_encode(array("status" => 0, "result" => "密码格式不规范")));
    return;
}
//TODO 上线时密码无加密应该改掉
$md5Password = md5(crypt($userpwd, substr($userpwd, 0, 2)));//将密码无敌加密
$url = iwookongConfig::$requireUrl . "user/1/user_login.fcgi";
$result = RequestUtil::get($url,
    array(
        "platform_id" => $platformid,
        "user_name" => $username,
        "password" => $md5Password
    ));
$jsonresult = json_decode($result, true);

if ($jsonresult['status'] != null) {
    if ($jsonresult['status'] != "0") {
        $uid = $jsonresult['result']['user_info']['user_id'];
        $utoken = $jsonresult['result']['user_info']['token'];
        $uname = $jsonresult['result']['user_info']['user_name'];
        $resultArr = array(
            "user_id" => $uid,
            "user_name" => $uname,
            "token" => $utoken
        );
        $_SESSION['user_id'] = $uid;   //用户ID
        $_SESSION['user_name'] = $uname;   //用户名
        $_SESSION['token'] = $utoken;    //token

        //如果用户选择"10天内免登录",则存储用户的信息(由于token失效期的原因，故之后代码改为存储用户的登录名和密码，并加密)
        if ($autologin) {
            $usercookie = new Cookies();
            $usercookie->set(iwookongConfig::$usercookie, json_encode($resultArr), 864000);
        }

        print_r(json_encode(array("status" => 1, "result" => $jsonresult['status'])));
    } else {
        print_r(json_encode(array("status" => 0, "result" => $jsonresult['msg'])));
        return;
    }
} else {
    print_r(json_encode(array("status" => 0, "result" => "未知错误")));
    return;
}
session_write_close();