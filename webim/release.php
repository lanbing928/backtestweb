<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/../common/Request.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/../common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/../common/Utility.class.php");
if (CheckLogin::check() == -1) {
    header("Location:../login.php ");
    exit();
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>发布页</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/plugins/webim/webim.min.css">
</head>
<body>
<?php include(dirname(__FILE__) . "/../share/_header.php") ?>
<div class="container wk-container wk-company">
    <section class="wk-release" data-userid="<?php echo $_SESSION['user_id'] ?>">
        <div class="release_frame">
            <textarea></textarea>
            <div class="fl release_frame_describe">说明：您发布的消息将推送至每一位用户，可在"群发小助手"中浏览信息并与意向者沟通交流</div>
            <button class="fr release_info">发布</button>
            <div class="clear"></div>
        </div>

        <ul class="nav nav-tabs release_ul" style="padding-top: 11px;border:0px">
            <li class="active"><a href="#release_all_info" data-toggle="tab">全部</a></li>
            <li><a href="#release_own_info" data-toggle="tab">我的</a></li>
        </ul>

        <div class="tab-content">
            <div class="all_content tab-pane active" id="release_all_info">

                <div class="get_release_content">
<!--                    <div class="date">2016-08-09 <div class="circle"></div></div>-->
<!---->
<!--                    <div class="one_msg">-->
<!--                        <div class="time fl">12:20<div class="circle"></div></div>-->
<!--                        <div class="release_usericon fl"></div>-->
<!--                        <div class="release_content fl">-->
<!--                            <div class="content_user">pufa-浦发银行 <i class="glyphicon glyphicon-menu-down release_own"><div class="release_own_end">结束发布</div></i></div>-->
<!--                            <div class="content_main">-->
<!--                                <div class="content_main_text">-->
<!--                                    投资于不动产，我仅限。。-->
<!--                                </div>-->
<!--                                <div class="content_support">-->
<!--                                <span>-->
<!--                                    <img src="../static/plugins/webim/imgs/icon_add_unselect.png" width="15px">&nbsp;跟 ( 388 )-->
<!--                                </span>&nbsp;&nbsp;-->
<!--                                    <span>-->
<!--                                    <img src="../static/plugins/webim/imgs/icon_noadd_unselect.png" width="15px">&nbsp;不跟 ( 388 )-->
<!--                                </span>&nbsp;-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="content_bottom">-->
<!--                                <span class="stock">股票：</span>-->
<!--                                <span class="stock_name">-->
<!--                                   <span>山东黄金</span>&nbsp;-->
<!--                                   <span>四川长虹</span>&nbsp;-->
<!--                                   <span>四川长虹</span>&nbsp;-->
<!--                                   <span>四川长虹</span>&nbsp;-->
<!--                            </span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="clear"></div>-->
<!--                    </div>-->
                </div>
                <div class="reload_more">点击展开更多<br/><i class="glyphicon glyphicon-menu-down"></i></div>
            </div>

            <div class="own_content tab-pane" id="release_own_info">
                <div class="get_release_content">
                </div>
                <div class="reload_more">点击展开更多<br/><i class="glyphicon glyphicon-menu-down"></i></div>
            </div>
        </div>
    </section>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="../static/js/all.min.js"></script>
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
<script src="../static/plugins/webim/webim.min.js"></script>
</body>
</html>