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
    <title>公司高管</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/css/index.min.css">
<body>
<?php include(dirname(__FILE__) . "/../share/_header.php") ?>
<div class="container wk-container wk-company " data-html-type="executives">
    <section class="wk-top-title">
        <label class="wk-topshow-icon"></label>
        <label class="wk-toshow-name">
            <i class="fa fa-circle-o-notch fa-spin"></i>
        </label>
        <div class="btn-group" role="group">
            <i class="fa fa-list-ul" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
            <ul class="dropdown-menu">
                <li><a href="profile.php">公司概况</a></li>
                <li class="company_active"><a href="executives.php">公司高管</a></li>
                <li><a href="capital_structure.php">股本结构</a></li>
                <li><a href="stockholder.php">主要股东</a></li>
            </ul>
        </div>
        <label class="wk-topshow-price"></label>
        <label class="wk-topshow-price-per"></label>
        <div class="wk-topshow-right">
            <label class="wk-topshow-dp">
                沪深：
                <label>
                    <i class="fa fa-circle-o-notch fa-spin"></i>
                </label>
            </label>
        </div>
    </section>

    <section class="wk-all-hot executives">
        <div class="row1">
            <table class="table-condensed">
                <thead>
                    <tr class="tr_title">
                        <th>序号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>学历</th>
                        <th>职务</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="text-align: center">
                        <td colspan="6">加载中...</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <br/>

        <div class="row2">
            <table class="table-condensed">
               <thead>
                    <tr class="tr_title">
                        <th colspan="3">管理层简介</th>
                    </tr>
               </thead>
                <tbody>
                    <tr style="text-align: center">
                        <td colspan="3">加载中...</td>
                    </tr>
                </tbody>
            </table>
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
<script  src="../static/js/page/company.min.js"></script>
</body>
</html>