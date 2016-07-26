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
    <title>公司简介</title>
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
<div class="container wk-container wk-company">
    <section class="wk-top-title">
        <label class="wk-topshow-icon"></label>
        <label class="wk-toshow-name"></label>
            <div class="btn-group" role="group">
                <i class="fa fa-list-ul" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <ul class="dropdown-menu">
                    <li data="1"><a href="#">公司概况</a></li>
                    <li data="2"><a href="#">公司高管</a></li>
                    <li data="3"><a href="#">股本结构</a></li>
                    <li data="4"><a href="#">主要股东</a></li>
                </ul>
            </div>
        <label class="wk-topshow-price"></label>
        <label class="wk-topshow-price-per"></label>
        <div class="wk-topshow-right">
            <span class="wk-topshow-dp">沪深：<span class="wk-up wk-topshow-status"></span><span>
            <div class="btn-group" style="float: right;">
                <button type="button" class="btn dropdown-toggle wk-btn-follow" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">+ 关注</button>
                <ul class="dropdown-menu">
                    <li class="wk-follow-stock" data-follow-name="我的自选股"><a href="#">我的自选股</a></li>
                    <li class="wk-follow-stock" data-follow-name="组合A"><a href="#">组合A</a></li></ul>
            </div>
        </div>
    </section>

    <section class="wk-all-hot profile">
        <table class="table-condensed">
            <tr>
                <th width="32%">公司名称</th>
                <td width="68%">国投电力有限公司</td>
            </tr>
            <tr>
                <th>公司名英文称</th>
                <td>guotou</td>
            </tr>
            <tr>
                <th>曾用名</th>
                <td>湖北兴化->国投电力</td>
            </tr>
            <tr>
                <th>A股代码</th>
                <td>600886</td>
            </tr>
            <tr>
                <th>A股简称</th>
                <td>国投电力</td>
            </tr>
            <tr>
                <th>B股代码</th>
                <td>--</td>
            </tr>
            <tr">
                <th>B股简称</th>
                <td>国投电力</td>
            </tr>
            <tr>
                <th>H股代码</th>
                <td>--</td>
            </tr>
            <tr>
                <th>H股简称</th>
                <td>--</td>
            </tr>
            <tr>
                <th>证券类别</th>
                <td>上交所主板A股</td>
            </tr>
            <tr>
                <th>所属行业</th>
                <td>电力行业</td>
            </tr>
            <tr>
                <th>总经理</th>
                <td>黄昭沪</td>
            </tr>
            <tr>
                <th>法人代表</th>
                <td>胡刚</td>
            </tr>
            <tr>
                <th>董秘</th>
                <td>杨林</td>
            </tr>
            <tr>
                <th>董事长</th>
                <td>胡刚</td>
            </tr>
            <tr>
                <th>证券事务代表</th>
                <td>王方</td>
            </tr>
            <tr>
                <th>独立董事</th>
                <td>黄慧罄，邵吕威，曾鸣</td>
            </tr>
            <tr>
                <th>联系电话</th>
                <td>010-88006378</td>
            </tr>
            <tr>
                <th>电子信箱</th>
                <td>gtdl@sdipower.com</td>
            </tr>
            <tr>
                <th>传真</th>
                <td>010-88006368</td>
            </tr>
            <tr>
                <th>公司网址</th>
                <td>www.sdicpower.com</td>
            </tr>
            <tr>
                <th>办公地址</th>
                <td>北京市西城区西直门南小街147号楼</td>
            </tr>
            <tr>
                <th>注册地址</th>
                <td>北京市西城区西直门南小街147号楼11层1108</td>
            </tr>
            <tr>
                <th>区域</th>
                <td>北京</td>
            </tr>
            <tr>
                <th>邮政编码</th>
                <td>518083</td>
            </tr>
            <tr>
                <th>注册资本(元)</th>
                <td>67.9亿</td>
            </tr>
            <tr>
                <th>工商登记</th>
                <td>620000000006064</td>
            </tr>
            <tr>
                <th>雇员人数</th>
                <td>7909</td>
            </tr>
            <tr>
                <th>管理人员人数</th>
                <td>14</td>
            </tr>
            <tr>
                <th>律师事务所</th>
                <td>北京市时代九和律师事务所</td>
            </tr>
            <tr>
                <th>会计师事务所</th>
                <td>立信会计师事务所(特殊普通合伙人)</td>
            </tr>
            <tr>
                <th>公司简介</th>
                <td>国投电力控股股份有限公司是由...</td>
            </tr>
            <tr>
                <th>经营范围</th>
                <td>投资建设、经营管理...</td>
            </tr>
        </table>
    </section>
</div>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/echarts/3.1.10/echarts.min.js"></script>
<script src="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="../static/js/all.min.js"></script>
<script src="../static/js/common.min.js"></script>
<script src="../static/js/Utility.min.js"></script>
<script  src="../static/js/page/company.min.js"></script>

</body>
</html>