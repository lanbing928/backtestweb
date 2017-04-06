<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/../common/Cookies.class.php");
require_once(dirname(__FILE__) . "/../common/iwookongConfig.class.php");
$userCookie = new Cookies();
$userInfo = $userCookie->get(iwookongConfig::$usercookie);
if (isset($userInfo)) {
    $info = json_decode($userInfo, true);
    $userName = $info['user_name'];
    $uid = $info['user_id'];
    $token = $info['token'];
}else{
    $uid = '';
    $token = '';
}
?>
<link rel="stylesheet" href="../static/plugins/bootstrap.min.css">
<link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
<link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
<link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
<link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/common.min.css') ?>">
<nav class="wk-header">
    <div class="container wk-container">
        <div class="navbar-header navbar-brand">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>
            <img src="/static/imgs/trade/logo.png">
            <spna class="navbar-title">模拟股票交易系统</spna>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="wk-nav-search">
                    <div class="typeahead__container">
                        <div class="typeahead__field"><span class="typeahead__query"> <input class="wk-head-search" type="search" placeholder="搜索(股票/行业/概念/事件)" autocomplete="off"> </span>
                            <span class="typeahead__button"> <button> <i class="typeahead__search-icon"></i> </button> </span>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right wk-nav-user">
                <li><a href="http://stock.iwookong.com/ajax/login/nologin.php?uid=<?php echo $uid ?>&token=<?php echo $token ?>" target="_blank">悟空首页</a></li>
                <li class="wk-nav-fuxi"><a href="#">&nbsp;|&nbsp;</a></li>
                <li><a href="../index.php" target="_blank">伏羲回测</a></li>
            </ul>
        </div>
    </div>
</nav>
<script src="../static/plugins/jquery-1.11.3.min.js"></script>
<script src="../static/plugins/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="http://js.97uimg.com/js/My97DatePicker/WdatePicker.js"></script>
<script src="../static/plugins/typeahead/jquery.typeahead.min.js"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/common.js') ?>"></script>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/Utility.min.js') ?>"></script>
<script>
    var thisHost = "http://" + window.location.host + "/";
    var uid=<?php echo $uid ?>;
    var token=<?php echo '"'.$token.'"' ?>;
    /**
     * 搜索框自动完成
     */
    $(".wk-head-search").typeahead({
        minLength: 2,
        maxItem: 20,
        order: "asc",
        hint: true,
        group: true,
        maxItemPerGroup: 5,
        backdrop: false,
        dynamic: true,
        filter: false,
        emptyTemplate: '未找到 "{{query}}" 的相关信息',
        source: {
            "股票": {url: [thisHost + "ajax/trade/ajax_search.php?message={{query}},&type=0", "stock"]},
            "行业": {url: [thisHost + "ajax/trade/ajax_search.php?message={{query}},&type=0", "hy"]},
            "概念": {url: [thisHost + "ajax/trade/ajax_search.php?message={{query}},&type=0", "gn"]},
            "热点事件": {url: [thisHost + "ajax/trade/ajax_search.php?message={{query}},&type=0", "event"]}
        },
        callback: {
            onClickAfter: function (node, a, item) {
                if (item.display !== "") {
                    switch (item.group) {
                        case "股票":
                            window.open("http://stock.iwookong.com/ajax/login/nologin.php?stock=" + item.display.substring(item.display.indexOf("(") + 1, item.display.indexOf(")")) + '&uid=' +uid+ '&token=' + token , "_blank");
                            break;
                        case "行业":
                            window.open("http://stock.iwookong.com/ajax/login/nologin.php?industry=" + item.display + '&uid=' + uid+ '&token=' + token , "_blank");
                            break;
                        case "概念":
                            window.open("http://stock.iwookong.com/ajax/login/nologin.php?concept=" + item.display+ '&uid=' + uid+ '&token=' + token , "_blank");
                            break;
                        case "热点事件":
                            window.open("http://stock.iwookong.com/ajax/login/nologin.php?event=" + item.display + '&uid=' + uid+ '&token=' + token , "_blank");
                            break;
                        default:
                            window.open(thisHost + "error.php", "_blank");
                            break;
                    }
                }
            }
        }
    });
</script>

