<?php
/**
 * Description:检查用户登录状态
 */
session_start();
require_once("Request.class.php");
require_once("iwookongConfig.class.php");
require_once("Cookies.class.php");

class CheckLogin
{
    public static function check()
    {
        $userCookie = new Cookies();
        $userInfo = $userCookie->get(iwookongConfig::$usercookie);
        $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "";
        $token = isset($_SESSION['token']) ? $_SESSION['token'] : "";
        if (!empty($user_id) && !empty($token)) {
            return 1;
        } else {
            if (isset($userInfo) && $userInfo != null) {
                $info = json_decode($userInfo, true);
                $userName = $info['user_name'];
                $user_id = $info['user_id'];
                $token = $info['token'];
                if (!empty($userName) && $user_id > 0 && !empty($token)) {
                    $_SESSION['user_id'] = $user_id;
                    $_SESSION['token'] = $token;
                    $userCookie->set(iwookongConfig::$usercookie, json_encode(array(
                        "user_id" => $user_id,
                        "user_name" => $userName,
                        "token" => $token
                    )), 43200);
                }
                $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "";
                $token = isset($_SESSION['token']) ? $_SESSION['token'] : "";

                if (!empty($user_id) && !empty($token)) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        }
    }
}

session_write_close();
