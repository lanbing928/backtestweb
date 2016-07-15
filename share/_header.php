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
<nav class="wk-header">
    <div class="container wk-container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
            <a class="navbar-brand" href="/">
                <img src="/static/imgs/i/logo.png">
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
                        <a data-toggle="dropdown"><img src="/static/imgs/i/icon_horn.png" style="float:left">
                            <div class="dot"></div>
                            <div style="clear:both"></div>
                        </a>
                        <div class="dropdown-menu msg_all">
                            <div class="msg_title">悟空1.x.x版本更新</div>
                            <ul>
                                <li>本次更新包括如下内容：</li>
                                <li>1.新增Top100页面。</li>
                                <li>2.首页增加主题事件模块。</li>
                                <li>3.新增版本更新提醒功能。</li>
                                <li>4.个股Tab标签新增研报功能。</li>
                                <li>......</li>
                            </ul>
                            <div class="detail"><a href="../message.php">了解详情</a></div>
                        </div>
                    </li>
                    <li>
                        <a data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i>&nbsp;<?php echo $userName ?></a>
                        <ul class="dropdown-menu wk-user-topmenu">
                            <li><a href='../infocenter/'>个人中心</a></li>
                            <li><a href='/'>返回首页</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href='../logout.php'>退出</a></li>
                        </ul>
                    </li>
                <?php } else { ?>
                    <li>
                        <a href="../login.php"><i class="fa fa-user"></i>&nbsp;登录</a>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </div>
</nav>