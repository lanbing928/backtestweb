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
</style>
<nav class="wk-header">
    <div class="container wk-container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
            <a class="navbar-brand" href="/">
                <img src="../static/imgs/i/logo.png">
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
                    <li>
                        <a data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user"></i>&nbsp;<?php echo $userName ?></a>
                        <ul class="dropdown-menu">
                            <li><a href='infocenter/'>个人中心</a></li>
                            <li><a href='/'>返回首页</a></li>
                        </ul>
                    </li>
                    <li><a href='logout.php'>退出</a></li>
                <?php } else { ?>
                    <a href="login.php"><i class="fa fa-user"></i>&nbsp;登录</a>
                <?php } ?>
            </ul>
        </div>
    </div>
</nav>