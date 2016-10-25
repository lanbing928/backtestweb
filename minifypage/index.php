<?php
date_default_timezone_set("PRC");
require_once(dirname(__FILE__) . "/common/Request.class.php");
require_once(dirname(__FILE__) . "/common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/common/CheckUserLogin.class.php");
require_once(dirname(__FILE__) . "/common/Utility.class.php");

ob_start("ob_gzhandler");
if (CheckLogin::check() == -1) {
    header("Location:login.php ");
    exit();
}
$index_info_result = RequestUtil::get(iwookongConfig::$requireUrl . "stock/1/top_twenty_stock.fcgi",
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"]
    ));
$json_iis = json_decode($index_info_result, true);
if ($json_iis["status"] != "1") {
    header("Location:error.php");
    exit();
}

#region 股票热股及热力图
$stock_v = $json_iis["result"]["code_info"]["shv_"];//热股查看
$stock_s = $json_iis["result"]["code_info"]["shs_"];//热股搜索
$stock_f = $json_iis["result"]["code_info"]["shf_"];//热股关注
$stock_map_v = $json_iis["result"]["code_info"]["suv_"];//热股查看热力图
$stock_map_s = $json_iis["result"]["code_info"]["sus_"];//热股搜索热力图
$stock_map_f = $json_iis["result"]["code_info"]["suf_"];//热股关注热力图
#endregion

#region 行业热度及热力图
$industry_v = $json_iis["result"]["code_info"]["hhv_"];//行业查看
$industry_s = $json_iis["result"]["code_info"]["hhs_"];//行业搜索
$industry_f = $json_iis["result"]["code_info"]["hhf_"];//行业关注
$industry_map_v = $json_iis["result"]["code_info"]["huv_"];//行业查看热力图
$industry_map_s = $json_iis["result"]["code_info"]["hus_"];//行业搜索热力图
$industry_map_f = $json_iis["result"]["code_info"]["huf_"];//行业关注热力图
#endregion

#region 概念热度及热力图
$concept_v = $json_iis["result"]["code_info"]["ghv_"];//概念查看
$concept_s = $json_iis["result"]["code_info"]["ghs_"];//概念搜索
$concept_f = $json_iis["result"]["code_info"]["ghf_"];//概念关注
$concept_map_v = $json_iis["result"]["code_info"]["guv_"];//概念查看热力图
$concept_map_s = $json_iis["result"]["code_info"]["gus_"];//概念搜索热力图
$concept_map_f = $json_iis["result"]["code_info"]["guf_"];//概念关注热力图
#endregion

//获取实时热度
$real_timehot_result = RequestUtil::get(iwookongConfig::$requireUrl . "stock/1/real_time_hot.fcgi",
    array(
        "user_id" => $_SESSION['user_id'],
        "token" => $_SESSION["token"]
    ));
$json_rtr = json_decode($real_timehot_result, true);

if ($json_rtr["status"] == "1") {
    $viewdata = "";
    $searchdata = "";
    $followdata = "";
    for ($i = 0; $i < count($json_rtr["visit"]); $i++) {
        $viewdata .= $json_rtr["visit"][$i] . ($i + 1 < count($json_rtr["visit"]) ? "," : "");
    }
    for ($i = 0; $i < count($json_rtr["search"]); $i++) {
        $searchdata .= $json_rtr["search"][$i] . ($i + 1 < count($json_rtr["search"]) ? "," : "");
    }
    for ($i = 0; $i < count($json_rtr["follow"]); $i++) {
        $followdata .= $json_rtr["follow"][$i] . ($i + 1 < count($json_rtr["follow"]) ? "," : "");
    }
    if (count($json_rtr["visit"]) > 0) {
        $maxView = (int)array_search(max($json_rtr["visit"]), $json_rtr["visit"]);
    } else {
        $maxView = -1;
    }
    if (count($json_rtr["search"]) > 0) {
        $maxSearch = (int)array_search(max($json_rtr["search"]), $json_rtr["search"]);
    } else {
        $maxSearch = -1;
    }
    if (count($json_rtr["follow"]) > 0) {
        $maxFollow = (int)array_search(max($json_rtr["follow"]), $json_rtr["follow"]);
    } else {
        $maxFollow = -1;
    }
} else {
    header("Location:error.php");
    exit();
}
?>
    <!DOCTYPE html><html lang="zh-CN"><head> <meta charset="UTF-8"> <title>悟空</title> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"> <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"> <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css"> <link rel="stylesheet" href="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css"> <link rel="stylesheet" href="staticplugins/typeahead/jquery.typeahead.min.css"> <link rel="stylesheet" href="staticcss/common.min.css"> <link rel="stylesheet" href="staticcss/wookong/index.min.css"> <script type='text/javascript'> var _vds = _vds || []; window._vds = _vds; (function(){ _vds.push(['setAccountId', 'aad52788d5f4641b']); (function() { var vds = document.createElement('script'); vds.type='text/javascript'; vds.async = true; vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(vds, s); })(); })(); </script></head><body><?php include("share/_header.php") ?><div class="container wk-container"> <section class="wk-time-hot"> <p class="wk-hot-title">A股市场实时热度&nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-content="A股市场每小时产生的热度量"></i></p> <div class="col-md-8 left-charts" id="left-chart"></div> <div class="col-md-4 right-infos"> <p> A股今日最热度情况 &nbsp;<i class="fa fa-question-circle-o" data-toggle="popover" data-placement="bottom" data-content=""></i> </p> <hr> <table class="table table-condensed first-table"> <tr> <td>查看</td> <td><?php echo count($json_rtr["visit"]) > 0 ? max($json_rtr["visit"]) : "-" ?></td> <td> <?php if ($maxView >= 0) { if ($maxView - 1 > 0) { echo ($maxView - 1) . ":00 - " . $maxView . ":00"; } else { echo "0:00"; } } else { echo "-"; } ?> </td> </tr> <tr> <td>搜索</td> <td><?php echo count($json_rtr["search"]) > 0 ? max($json_rtr["search"]) : "-" ?></td> <td> <?php if ($maxSearch >= 0) { if ($maxSearch - 1 > 0) { echo ($maxSearch - 1) . ":00 - " . $maxSearch . ":00"; } else { echo "0:00"; } } else { echo "-"; } ?> </td> </tr> <tr> <td>关注</td> <td><?php echo count($json_rtr["follow"]) > 0 ? max($json_rtr["follow"]) : "-" ?></td> <td> <?php if ($maxFollow >= 0) { if ($maxFollow - 1 > 0) { echo ($maxFollow - 1) . ":00 - " . $maxFollow . ":00"; } else { echo "0:00"; } } else { echo "-"; } ?> </td> </tr> </table> <p>A股今日最热股情况</p> <hr> <table class="table table-condensed"> <tr> <td>查看最热股</td> <td><a href="stocks.php?stock=<?php echo $stock_v[0]["code"] ?>" class="<?php echo UtilityTools::getPriceColor($stock_v[0]["mark_z_d"]) ?>" target="_blank"><?php echo $stock_v[0]["name"] . "(" . $stock_v[0]["code"] . ")" ?></a></td> </tr> <tr> <td>搜索最热股</td> <td><a href="stocks.php?stock=<?php echo $stock_s[0]["code"] ?>" class="<?php echo UtilityTools::getPriceColor($stock_s[0]["mark_z_d"]) ?>" target="_blank"><?php echo $stock_s[0]["name"] . "(" . $stock_s[0]["code"] . ")" ?></a></td> </tr> <tr> <td>关注最热股</td> <td><a href="stocks.php?stock=<?php echo $stock_f[0]["code"] ?>" class="<?php echo UtilityTools::getPriceColor($stock_f[0]["mark_z_d"]) ?>" target="_blank"><?php echo $stock_f[0]["name"] . "(" . $stock_f[0]["code"] . ")" ?></a></td> </tr> </table> </div> </section> <section class="wk-all-hot"> <div class="wk-con-stock"> <p class="wk-hot-title">A股市场股票热度情况</p> <div class="wk-con-box"> <ul class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"> <a href="#stock-view" aria-controls="stock-view" role="tab" data-toggle="tab">查看热度</a> </li> <li role="presentation"> <a href="#stock-search" aria-controls="stock-search" role="tab" data-toggle="tab">搜索热度</a> </li> <li role="presentation"> <a href="#stock-follow" aria-controls="stock-follow" role="tab" data-toggle="tab">关注热度</a> </li> </ul> <span class="wk-hot-time"> 更新时间:<?php echo date("Y-m-d H:"); echo UtilityTools::getNowMinute() ?> </span> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="stock-view"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">查看热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>股票名称</td> <td>查看热度</td> <td>热度增量</td> <td>价格</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($stock_v); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="stocks.php?stock=<?php echo $stock_v[$i]["code"] ?>" target="_blank"><?php echo $stock_v[$i]["name"] ?></a></td> <td><?php echo $stock_v[$i]["value"] ?></td> <td> <?php if ((float)$stock_v[$i]["increment"] > 0) { echo $stock_v[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$stock_v[$i]["increment"] < 0) { echo $stock_v[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $stock_v[$i]["increment"]; } ?> </td> <?php if ((float)$stock_v[$i]["price"] == 0) { echo "<td class=\"wk-gray\">未交易</td>"; } else { echo "<td class=\"" . UtilityTools::getPriceColor((float)$stock_v[$i]["mark_z_d"]) . "\">" . $stock_v[$i]["price"] . "</td>"; } ?> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">查看热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-stock-view-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> <div role="tabpanel" class="tab-pane fade" id="stock-search"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">搜素热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>股票名称</td> <td>搜索热度</td> <td>热度增量</td> <td>价格</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($stock_s); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="stocks.php?stock=<?php echo $stock_s[$i]["code"] ?>" target="_blank"><?php echo $stock_s[$i]["name"] ?></a></td> <td><?php echo $stock_s[$i]["value"] ?></td> <td> <?php if ((float)$stock_s[$i]["increment"] > 0) { echo $stock_s[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$stock_s[$i]["increment"] < 0) { echo $stock_s[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $stock_s[$i]["increment"]; } ?> </td> <?php if ((float)$stock_s[$i]["price"] == 0) { echo "<td class=\"wk-gray\">未交易</td>"; } else { echo "<td class=\"" . UtilityTools::getPriceColor((float)$stock_s[$i]["mark_z_d"]) . "\">" . $stock_s[$i]["price"] . "</td>"; } ?> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">搜索热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-stock-search-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> <div role="tabpanel" class="tab-pane fade" id="stock-follow"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">关注热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>股票名称</td> <td>关注热度</td> <td>热度增量</td> <td>价格</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($stock_f); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="stocks.php?stock=<?php echo $stock_f[$i]["code"] ?>" target="_blank"><?php echo $stock_f[$i]["name"] ?></a></td> <td><?php echo $stock_f[$i]["value"] ?></td> <td> <?php if ((float)$stock_f[$i]["increment"] > 0) { echo $stock_f[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$stock_f[$i]["increment"] < 0) { echo $stock_f[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $stock_f[$i]["increment"]; } ?> </td> <?php if ((float)$stock_f[$i]["price"] == 0) { echo "<td class=\"wk-gray\">未交易</td>"; } else { echo "<td class=\"" . UtilityTools::getPriceColor((float)$stock_f[$i]["mark_z_d"]) . "\">" . $stock_f[$i]["price"] . "</td>"; } ?> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">关注热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-stock-follow-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> </div> </div> </div> <div class="wk-con-industry"> <p class="wk-hot-title">A股市场行业热度情况</p> <div class="wk-con-box"> <ul class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"> <a href="#industry-view" aria-controls="industry-view" role="tab" data-toggle="tab">查看热度</a> </li> <li role="presentation"> <a href="#industry-search" aria-controls="industry-search" role="tab" data-toggle="tab">搜索热度</a> </li> <li role="presentation"> <a href="#industry-follow" aria-controls="industry-follow" role="tab" data-toggle="tab">关注热度</a> </li> </ul> <span class="wk-hot-time">更新时间:<?php echo date("Y-m-d H:"); echo UtilityTools::getNowMinute() ?></span> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="industry-view"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">查看热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>行业名称</td> <td>查看热度</td> <td>热度增量</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($industry_v); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="industry.php?name=<?php echo $industry_v[$i]["name"] ?>" target="_blank"><?php echo $industry_v[$i]["name"] ?></a></td> <td><?php echo $industry_v[$i]["value"] ?></td> <td> <?php if ((float)$industry_v[$i]["increment"] > 0) { echo $industry_v[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$industry_v[$i]["increment"] < 0) { echo $industry_v[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $industry_v[$i]["increment"]; } ?> </td> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">查看热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-industry-view-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> <div role="tabpanel" class="tab-pane fade" id="industry-search"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">搜索热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>行业名称</td> <td>搜索热度</td> <td>热度增量</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($industry_s); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="industry.php?name=<?php echo $industry_s[$i]["name"] ?>" target="_blank"><?php echo $industry_s[$i]["name"] ?></a></td> <td><?php echo $industry_s[$i]["value"] ?></td> <td> <?php if ((float)$industry_s[$i]["increment"] > 0) { echo $industry_s[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$industry_s[$i]["increment"] < 0) { echo $industry_s[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $industry_s[$i]["increment"]; } ?> </td> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">搜索热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-industry-search-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> <div role="tabpanel" class="tab-pane fade" id="industry-follow"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">关注热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>行业名称</td> <td>关注热度</td> <td>热度增量</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($industry_f); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="industry.php?name=<?php echo $industry_f[$i]["name"] ?>" target="_blank"><?php echo $industry_f[$i]["name"] ?></a></td> <td><?php echo $industry_f[$i]["value"] ?></td> <td> <?php if ((float)$industry_f[$i]["increment"] > 0) { echo $industry_f[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$industry_f[$i]["increment"] < 0) { echo $industry_f[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $industry_f[$i]["increment"]; } ?> </td> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">关注热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-industry-follow-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> </div> </div> </div> <div class="wk-con-concept"> <p class="wk-hot-title">A股市场概念热度情况</p> <div class="wk-con-box"> <ul class="nav nav-tabs" role="tablist"> <li role="presentation" class="active"> <a href="#concept-view" aria-controls="stock-view" role="tab" data-toggle="tab">查看热度</a> </li> <li role="presentation"> <a href="#concept-search" aria-controls="concept-search" role="tab" data-toggle="tab">搜索热度</a> </li> <li role="presentation"> <a href="#concept-follow" aria-controls="concept-follow" role="tab" data-toggle="tab">关注热度</a> </li> </ul> <span class="wk-hot-time">更新时间:<?php echo date("Y-m-d H:"); echo UtilityTools::getNowMinute() ?></span> <div class="tab-content"> <div role="tabpanel" class="tab-pane active" id="concept-view"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">查看热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>概念名称</td> <td>查看热度</td> <td>热度增量</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($concept_v); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="concept.php?name=<?php echo $concept_v[$i]["name"] ?>" target="_blank"><?php echo $concept_v[$i]["name"] ?></a></td> <td><?php echo $concept_v[$i]["value"] ?></td> <td> <?php if ((float)$concept_v[$i]["increment"] > 0) { echo $concept_v[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$concept_v[$i]["increment"] < 0) { echo $concept_v[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $concept_v[$i]["increment"]; } ?> </td> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">查看热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-concept-view-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> <div role="tabpanel" class="tab-pane fade" id="concept-search"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">搜索热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>概念名称</td> <td>搜索热度</td> <td>热度增量</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($concept_s); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="concept.php?name=<?php echo $concept_s[$i]["name"] ?>" target="_blank"><?php echo $concept_s[$i]["name"] ?></a></td> <td><?php echo $concept_s[$i]["value"] ?></td> <td> <?php if ((float)$concept_s[$i]["increment"] > 0) { echo $concept_s[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$concept_s[$i]["increment"] < 0) { echo $concept_s[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $concept_s[$i]["increment"]; } ?> </td> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">搜索热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-concept-search-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> <div role="tabpanel" class="tab-pane fade" id="concept-follow"> <div class="col-md-5 left"> <p class="wk-hot-sub-title">关注热度排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="截至当前产生的总热度量的排行"></i> </p> <table class="table table-hover table-condensed table-striped wk-hot-table"> <thead> <tr> <td>序号</td> <td>概念名称</td> <td>关注热度</td> <td>热度增量</td> </tr> </thead> <tbody> <?php for ($i = 0; $i < count($concept_f); $i++) { ?> <tr> <td><?php echo $i + 1 ?></td> <td><a href="concept.php?name=<?php echo $concept_f[$i]["name"] ?>" target="_blank"><?php echo $concept_f[$i]["name"] ?></a></td> <td><?php echo $concept_f[$i]["value"] ?></td> <td> <?php if ((float)$concept_f[$i]["increment"] > 0) { echo $concept_f[$i]["increment"] . "<span class='wk-red'>↑</span>"; } elseif ((float)$concept_f[$i]["increment"] < 0) { echo $concept_f[$i]["increment"] . "<span class='wk-green'>↓</span>"; } else { echo $concept_f[$i]["increment"]; } ?> </td> </tr> <?php } ?> </tbody> </table> </div> <div class="col-md-7 right"> <p class="wk-hot-sub-title">关注热度涨跌幅排行&nbsp; <i class="fa fa-question-circle-o" data-toggle="popover" data-content="当前最新与前一个小时的热度指标相比较产生的数值"></i> </p> <div class="charts" id="wk-concept-follow-treemap"></div> <p class="wk-hot-sub-tips"><label>●</label>方块大小表示成交量，越大的板块成交量越大</p> <p class="wk-hot-sub-tips"><label>●</label>方块颜色表示热度涨跌幅，涨跌越大，颜色越深，上涨红色，下跌绿色</p> </div> </div> </div> </div> </div> </section></div><script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script><script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script><script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script><script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script><script src="staticplugins/typeahead/jquery.typeahead.min.js"></script><script src="static/js/Utility.min.js"></script><script src="static/js/all.min.js"></script><script> $(function(){$("i[data-toggle='popover']").popover({container:"body",trigger:"hover"});initLineChart();initTreemap();$('a[data-toggle="tab"]').on('shown.bs.tab',function(){initTreemap();});});var wk_treemap_data=<?php $jsonData="[";$jsonData.="{\"key\":\"wk-stock-view-treemap\",\"value\":".json_encode($stock_map_v)."},";$jsonData.="{\"key\":\"wk-stock-search-treemap\",\"value\":".json_encode($stock_map_s)."},";$jsonData.="{\"key\":\"wk-stock-follow-treemap\",\"value\":".json_encode($stock_map_f)."},";$jsonData.="{\"key\":\"wk-industry-view-treemap\",\"value\":".json_encode($industry_map_v)."},";$jsonData.="{\"key\":\"wk-industry-search-treemap\",\"value\":".json_encode($industry_map_s)."},";$jsonData.="{\"key\":\"wk-industry-follow-treemap\",\"value\":".json_encode($industry_map_f)."},";$jsonData.="{\"key\":\"wk-concept-view-treemap\",\"value\":".json_encode($concept_map_v)."},";$jsonData.="{\"key\":\"wk-concept-search-treemap\",\"value\":".json_encode($concept_map_s)."},";$jsonData.="{\"key\":\"wk-concept-follow-treemap\",\"value\":".json_encode($concept_map_f)."}]";echo $jsonData;?>;var viewData=[<?php echo $viewdata?>];var searchData=[<?php echo $searchdata?>];var followdata=[<?php echo $followdata?>];function initTreemap(){for(var x in wk_treemap_data){if(Utility.timeRange("09:15","09:25")){$("#"+wk_treemap_data[x].key).html("<div class=\"wk-hotmap-no\"><img src=\"staticimgs/i/nonews.png\"><span>自由竞价时间,暂无数据</span></div>");}else{var myChart=echarts.init(document.getElementById(""+wk_treemap_data[x].key+""));var cdata=[];for(var y in wk_treemap_data[x].value){if(wk_treemap_data[x].key.indexOf("wk-stock")==0){var tname=wk_treemap_data[x].value[y].name;var tcode=wk_treemap_data[x].value[y].code;var tvalue=(parseFloat(wk_treemap_data[x].value[y].value)*100).toFixed(2);var tpricelevel=wk_treemap_data[x].value[y].price_level;var tstop=wk_treemap_data[x].value[y].stop;if(tstop==1){cdata.push("{name:\""+tname+"\\n("+tcode+")\\n"+(tvalue>0?"+":"")+tvalue+"%\"");}else{cdata.push("{name:\""+tname+"\\n("+tcode+")\\n"+(tvalue>0?"+":"")+tvalue+"%\"");} cdata.push("value:"+wk_treemap_data[x].value[y].count);cdata.push("itemStyle:{normal:{color:'"+Utility.getTreeMapColor(tpricelevel)+"'}}");if(tpricelevel==-1){cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}");}else if(tpricelevel==1){cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}");}else{cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}");}}else{var tsvalue=(parseFloat(wk_treemap_data[x].value[y].value)*100).toFixed(2);cdata.push('{name:"'+wk_treemap_data[x].value[y].name+"\\n"+(tsvalue>0?"+":"")+tsvalue+'%"');cdata.push("value:"+wk_treemap_data[x].value[y].count);cdata.push("itemStyle:{normal:{color:'"+Utility.getTreeMapColor(wk_treemap_data[x].value[y].price_level)+"'}}");if(wk_treemap_data[x].value[y].price_level==-1){cdata.push("label:{normal:{textStyle:{color:'#23a64c'}}}}")}else{if(wk_treemap_data[x].value[y].price_level==1){cdata.push("label:{normal:{textStyle:{color:'#f54545'}}}}")}else{cdata.push("label:{normal:{textStyle:{color:'#fff'}}}}")}}}} myChart.setOption({tooltip:{formatter:"{b}"},series:[{type:"treemap",breadcrumb:{show:false},roam:false,nodeClick:false,width:"100%",height:"100%",itemStyle:{normal:{borderWidth:1}},data:eval("["+cdata.join(",")+"]")}]});window.onresize=myChart.resize;}}} function initLineChart(){var myChart=echarts.init(document.getElementById("left-chart"));myChart.setOption({color:["rgb(243, 104, 97)","rgb(76, 93, 186)","rgb(118, 172, 245)"],tooltip:{trigger:"axis",formatter:function(params){var showLabel="";showLabel+=params[0].name+"<br>";for(p in params){if(params[p].value!=0){showLabel+="<label style='color: "+params[p].color+";font-size: 18px;'>●</label>&nbsp;&nbsp;"+params[p].seriesName+":"+params[p].value+"<br>";}} return showLabel;}},grid:{top:"12%",left:"2%",right:"5%",bottom:"0",containLabel:true},legend:{left:"left",data:["查看","搜索","关注"],padding:[0,0,0,15]},xAxis:{type:"category",boundaryGap:false,data:["0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24：00"]},yAxis:{type:"value",position:"right",scale:true,min:1},series:[{name:"查看",type:"line",smooth:true,symbolSize:function(value){return value==0?0:4;},data:viewData},{name:"搜索",type:"line",smooth:true,symbolSize:function(value){return value==0?0:4;},data:searchData},{name:"关注",type:"line",smooth:true,symbolSize:function(value){return value==0?0:4;},data:followdata}]});window.onresize=myChart.resize}</script><div style="display: none;"> <script src="http://s95.cnzz.com/z_stat.php?id=1259413901&web_id=1259413901" language="JavaScript"></script></div></body></html>
<?php
ob_end_flush();
?>