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
$info_id = isset($_GET['infoid']) ? $_GET['infoid'] : "";
if (!empty($info_id)) {
    $detail_result = RequestUtil::get(iwookongConfig::$requireUrl . "information/1/detail_info.fcgi",
        array(
            "user_id" => $_SESSION['user_id'],
            "token" => $_SESSION["token"],
            "info_id" => $info_id
        ));
    $json_detail = json_decode($detail_result, true);
    if ($json_detail["status"] != "1") {
        return;
    }
} else {
    header("Location:error.php ");
    exit();
}
?>
    <!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title><?php echo $json_detail["info_detail"]["title"] ?></title><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"><link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css"><link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css"><link rel="stylesheet" href="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css"><link rel="stylesheet" href="staticplugins/typeahead/jquery.typeahead.min.css"><link rel="stylesheet" href="staticcss/common.min.css"><link rel="stylesheet" href="staticcss/wookong/index.min.css"></head><body><?php include("share/_header.php") ?><div class="container wk-container"><section class="wk-news-detail"><p class="wk-detail-title"><?php echo $json_detail["info_detail"]["title"] ?></p><span class="wk-detail-from">来源：<?php echo(empty($json_detail["info_detail"]["from"]) ? "未知" : $json_detail["info_detail"]["from"]) ?></span><span class="wk-detail-time"><?php echo date('Y-m-d H:i:s', $json_detail["info_detail"]["timestamp"] / 1000) ?></span><div class="wk-detail-content"><?php $arrContent = explode("\n", $json_detail["info_detail"]["summary"]); for ($i = 0; $i < count($arrContent); $i++) { echo "<p>" . preg_replace('/\s| /', '', $arrContent[$i]); if ($i + 1 == count($arrContent)) { echo "<a href=\"" . $json_detail["info_detail"]["url"] . "\" target=\"_blank\">……阅读原文</a>"; } echo "</p>"; } ?></div><div class="wk-detail-related"><p class="wk-detail-stock">股票： <?php if (count($json_detail["info_detail"]["relate_stock"])> 0) { foreach ($json_detail["info_detail"]["relate_stock"] as $rlstock) { ?><span><a href="stocks.php?stock=<?php echo $rlstock["stock_code"] ?>&name=<?php echo $rlstock["stock_name"] ?>" target="_blank"><?php echo $rlstock["stock_name"] ?></a></span><?php } } else { echo "无"; } ?></p><p class="wk-detail-industry">行业： <?php if (count($json_detail["info_detail"]["relate_indus"])> 0) { foreach ($json_detail["info_detail"]["relate_indus"] as $rlindustry) { ?><span><a href="industry.php?name=<?php echo $rlindustry["industry"] ?>" target="_blank"><?php echo $rlindustry["industry"] ?></a></span><?php } } else { echo "无"; } ?></p><p class="wk-detail-concept">概念： <?php if (count($json_detail["info_detail"]["relate_sect"])> 0) { foreach ($json_detail["info_detail"]["relate_sect"] as $rlconcept) { ?><span><a href="concept.php?name=<?php echo $rlconcept["section"] ?>" target="_blank"><?php echo $rlconcept["section"] ?></a></span><?php } } else { echo "无"; } ?></p></div></section></div><script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script><script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script><script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script><script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script><script src="staticplugins/typeahead/jquery.typeahead.min.js"></script><script src="static/js/Utility.min.js"></script><script src="static/js/all.min.js"></script></body></html>
<?php
ob_end_flush();
?>