<?php
require_once(dirname(__FILE__) . "/../common/Cookies.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
$userCookie = new Cookies();
$userInfo = $userCookie->get(iwookongConfig::$usercookie);
if (isset($userInfo)) {
    $info = json_decode($userInfo, true);
    $userName = $info['user_name'];
}
?>
<style>
    .nav .open > a, .nav .open > a:focus, .nav .open > a:hover {
        background: none;
    }
    .nav .dot{
        width:5px;
        height:5px;
        border-radius:10px;
        background-color:red;
        margin:6px 0 0 5px;
        float:right;
    }
    .msg_all{
        font-size:14px;
        min-width:250px;
        line-height:22px;
        padding:0;
    }
    .dropdown-menu ul{
        padding-left:0px;
    }
    .message li{
        list-style: none;
        padding:3px 10px;
    }
    .message .msg_title{
        padding:5px 10px;
        background: #f6f7f9;
        border-bottom: 1px solid #ddd;
    }
    .message .detail{
        border-top: 1px solid #ddd;
        padding:5px 10px;
        background: #f6f7f9;
    }
    .message .detail a{
        color:#4d5aad;
    }
    .message a:first-child{
        padding-top:18px;
    }
</style>
<nav class="wk-header">
    <div class="container wk-container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
            <a class="navbar-brand" href="/">
                <img src="static/imgs/i/logo.png">
            </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="wk-nav-search">
                    <div class="typeahead__container">
                        <div class="typeahead__field"><span class="typeahead__query"> <input class="wk-head-search" type="search" placeholder="搜索(股票/行业/概念)" autocomplete="off"> </span> <span class="typeahead__button"> <button> <i class="typeahead__search-icon"></i> </button> </span></div>
                    </div>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right wk-nav-user">
                <?php if (!empty($userName)) { ?>
                    <li class="message">
                        <a data-toggle="dropdown"><img src="static/imgs/i/icon_horn.png" style="float:left"><div class="dot"></div><div style="clear:both"></div></a>
                        <div class="dropdown-menu msg_all">
                            <div class="msg_title">悟空1.3.2版本更新</div>
                            <ul>
                                <li>本次更新包括如下内容：</li>
                                <li>1.新增Top100页面。</li>
                                <li>2.首页增加主题事件模块。</li>
                                <li>3.新增版本更新提醒功能。</li>
                                <li>4.个股Tab标签新增研报功能。</li>
                                <li>......</li>
                            </ul>
                            <div class="detail"><a href="message.php">了解详情</a></div>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i>&nbsp;<?php echo $userName ?></a>
                        <ul class="dropdown-menu">
                            <li><a href='infocenter/'>个人中心</a></li>
                            <li><a href='/'>返回首页</a></li>
                        </ul>
                    </li>
                    <li><a href='logout.php'>退出</a></li>
                <?php } else { ?>
                    <li>
                        <a href="login.php"><i class="fa fa-user"></i>&nbsp;登录</a>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </div>
</nav>