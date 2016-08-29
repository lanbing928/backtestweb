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
<div class="container wk-container">
    <section class="wk-release" data-userid="<?php echo $_SESSION['user_id'] ?>">
        <div class="release_frame">
            <textarea></textarea>
            <div class="fl release_frame_describe">说明：您发布的消息将推送至每一位用户，可在"群发小助手"中浏览信息并与意向者沟通交流</div>
            <button class="fr release_info">发布</button>
            <div class="release_ing fr"></div>
            <div class="clear"></div>
        </div>

        <ul class="nav nav-tabs release_ul">
            <li class="active" data-type="0"><a href="#release_all_info" data-toggle="tab">全部</a></li>
            <li data-type="1"><a href="#release_own_info" data-toggle="tab">我的</a></li>
        </ul>

        <div class="tab-content">
            <div class="all_content tab-pane active" id="release_all_info">
                <div class="all_load"></div>
                <div class="get_release_content">
                </div>
                <div class="reload_more">点击展开更多<br/><i class="glyphicon glyphicon-menu-down"></i></div>
            </div>

            <div class="own_content tab-pane" id="release_own_info">
                <div class="own_load"></div>
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