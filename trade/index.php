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
    <title>模拟交易</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/trade-sys/attention.css') ?>">
</head>
<body>
<?php include(dirname(__FILE__) . "/../trade/header.php") ?>
<div class="container wk-container wk-content">
    <!-- 左边菜单 -->
    <div class=" wk-nav-tabs left">
        <div class="wk-nav-hushen"><img src="../static/imgs/trade/hushen.png">&nbsp;&nbsp;我的沪深</div>
        <ul class="nav">
            <li class="active"><a href="index.php">我的关注</a></li>
            <li><a href="holdings.php">我的账户</a></li>
            <li><a href="trade.php">模拟交易</a></li>
            <li><a href="analysis.php">收益分析</a></li>
        </ul>
    </div>
    <!-- 右边内容 -->
    <div class="tab-content wk-nav-content left">
        <!-- 我的关注 -->
        <section id="attention">
            <ul class="group-name-list">
<!--                                <li class="left gp-active" data-gid="1">-->
<!--                                    <span>创业</span>&nbsp;-->
<!--                                    <span class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-chevron-down"></i></span>-->
<!--                                    <ul class="dropdown-menu">-->
<!--                                        <li class="change-name"><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>-->
<!--                                        <li class="del-group"><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>-->
<!--                                    </ul>-->
<!--                                </li>-->
<!--                                <li class="left" data-gid="2">-->
<!--                                    <span>概念</span>&nbsp;-->
<!--                                    <span class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-chevron-down"></i></span>-->
<!--                                    <ul class="dropdown-menu">-->
<!--                                        <li class="change-name"><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>-->
<!--                                        <li class="del-group"><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>-->
<!--                                    </ul>-->
<!--                                </li>-->
<!--                                <li class="left" data-gid="3">-->
<!--                                    <span>金融</span>&nbsp;-->
<!--                                    <span class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-chevron-down"></i></span>-->
<!--                                    <ul class="dropdown-menu" >-->
<!--                                        <li class="change-name"><a href="#"><i class="fa fa-pencil fa-fw"></i>更改名称</a></li>-->
<!--                                        <li class="del-group"><a href="#"><i class="fa fa-trash-o fa-fw"></i>删除组合</a></li>-->
<!--                                    </ul>-->
<!--                                </li>-->
<!--                                <li class="left add-group trade-add-group" data-gid="-1">自定义<i class="fa fa-plus"></i></li>-->
<!--                                <div class="clear"></div>-->
            </ul>
            <hr>
            <div class="input-group">
                <div class="typeahead__container">
                    <div class="typeahead__field">
                <span class="typeahead__query">
                    <span class="typeahead__cancel-button"></span>
                    <input class="wk-attention-search" type="search" placeholder="请输入股票代码" autocomplete="off">
                </span>
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div></div>

            <!--账户股票列表-->
            <div class="group-stock-list table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <td>序号</td>
                        <td><input type="checkbox" class="left checkedAll"><span class="left">股票代码</span></td>
                        <td>股票名称</td>
                        <td>查看热度<img src="/static/imgs/trade/arrow_down.png" data-hot-sort="visit_heat" data-sort-type="desc" class="sort_img"></td>
                        <td>最新价<img src="/static/imgs/trade/arrow_down.png" data-hot-sort="price" data-sort-type="desc" class="sort_img"></td>
                        <td>涨跌幅<img src="/static/imgs/trade/arrow_down.png" data-hot-sort="change" data-sort-type="desc" class="sort_img"></td>
                        <td>成交量(万手)<img src="/static/imgs/trade/arrow_down.png" data-hot-sort="volume" data-sort-type="desc" class="sort_img"></td>
                        <td>行业</td>
                        <td class="bulk-trade-op" data-capital="0">
                            操作
<!--                            (<img src="../static/imgs/trade/op_buy.png"  data-toggle="modal" data-target="#bulk-trade-buy">-->
<!--                            <img src="../static/imgs/trade/op_sale.png" data-toggle="modal" data-target="#bulk-trade-sale"> )-->

                        </td>
                        <td width="27px" class="bulk-del"><i class="fa fa-minus-circle text-danger btn-del-stock"></i></td>
                    </tr>
                    </thead>
                    <tbody>
<!--                                            <tr>-->
<!--                                                <td>1</td>-->
<!--                                                <td><input type="checkbox" class="left"><span class="left">000002</span></td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td>10</td>-->
<!--                                                <td>22</td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td><img src="../static/imgs/trade/op_buy.png" class="one-stock-trade" data-trade-type="1" href="#trade" data-toggle="tab"><img src="../static/imgs/trade/op_sale.png" class="one-stock-trade" data-trade-type="2" href="#trade" data-toggle="tab"></td>-->
<!--                                                <td><i class="fa fa-minus-circle text-danger btn-del-stock" data-stock-code="000002" data-stock-gid="1"></i></td>-->
<!--                                            </tr>-->
<!--                                            <tr>-->
<!--                                                <td>2</td>-->
<!--                                                <td><input type="checkbox" class="left"><span class="left">000003</span></td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td>30</td>-->
<!--                                                <td>33</td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td>jjdjj</td>-->
<!--                                                <td><img src="../static/imgs/trade/op_buy.png" class="one-stock-trade" data-trade-type="1" href="#trade" data-toggle="tab"><img src="../static/imgs/trade/op_sale.png" class="one-stock-trade" data-trade-type="2" href="#trade" data-toggle="tab"></td>-->
<!--                                                <td><i class="fa fa-minus-circle text-danger btn-del-stock" data-stock-code="000002" data-stock-gid="1"></i></td>-->
<!--                                            </tr>-->
                    </tbody>
                </table>
            </div>
            <!--批量买-->
            <div class="modal fade" id="bulk-trade-buy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="bulk-trade-error">委托的总金额超出总资产</div>
                            <div>
                                委托价格：
                                <select>
                                    <option value="1">当前价格</option>
                                </select>
                            </div>
                            <div class="modal-trade-num">
                                委托数量：
                                <input type="text" onkeyup="value=value.replace(/[^0-9]*/g,'');" >手
                            </div>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary bulk-trade-btn" data-dismiss="modal" data-trade-type="0">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--批量卖-->
            <div class="modal fade" id="bulk-trade-sale" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="bulk-trade-error">委托的总金额超出总资产</div>
                            <div>
                                委托价格：
                                <select>
                                    <option value="1">当前价格</option>
                                </select>
                            </div>
                            <div class="modal-trade-num">
                                委托数量：
                                <input type="text" onkeyup="value=value.replace(/[^0-9]*/g,'');" >手
                            </div>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary bulk-trade-btn" data-dismiss="modal" data-trade-type="1">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="clear"></div>
</div>
</body>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/trade-sys/attention.js') ?>"></script>
</html>

