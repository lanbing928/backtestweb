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
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/trade-sys/trade.css') ?>">
</head>
<body>
<?php include(dirname(__FILE__) . "/../trade/header.php") ?>
<div class="container wk-container wk-content">
    <!-- 左边菜单 -->
    <div class=" wk-nav-tabs left">
        <div class="wk-nav-hushen"><img src="../static/imgs/trade/hushen.png">&nbsp;&nbsp;我的沪深</div>
        <ul class="nav">
            <li><a href="index.php">我的关注</a></li>
            <li><a href="holdings.php">我的账户</a></li>
            <li class="active"><a href="trade.php">模拟交易</a></li>
            <li><a href="analysis.php">收益分析</a></li>
        </ul>
    </div>
    <!-- 右边内容 -->
    <div class="tab-content wk-nav-content left">
        <!-- 交易 -->
        <section id="trade">
            <ul class="nav" role="tablist">
                <li class="active left"><a href="#buy" role="tab" data-toggle="tab">买入</a></li>
                <li class="left"><a href="#sale" role="tab" data-toggle="tab">卖出</a></li>
                <div class="clear"></div>
            </ul>

            <div class="tab-content">
                <!--买入-->
                <div class="row tab-pane active" id="buy">
                    <!--买入下单 -->
                    <div class="col-md-6">
                        <!--                        <div class="buy-tip">购买单只股票仓位不能超过总资产的40%</div>-->
                        <ul class="trade-info">
                            <li>
                                <lable>股票账户：&nbsp;&nbsp;</lable>
                                <select class="user-group">
                                    <option value="-1">请选择</option>
                                </select>
                            </li>
                            <li>
                                <lable class="left">买入股票：&nbsp;&nbsp;</lable>
                                <div class="typeahead__container left">
                                    <div class="typeahead__field">
                                        <span class="typeahead__query">
                                            <input class="wk-trade-search" type="search" placeholder="请输入股票名称/代码/拼音" autocomplete="off">
                                        </span>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </li>
                            <li><lable>股票名称：&nbsp;&nbsp;</lable><span class="stock-name"></span></li>
                            <li><lable>当前价格：&nbsp;&nbsp;</lable><span class="now-price"></span></li>
                            <li class="price">
                                <lable>买入价格：&nbsp;&nbsp;</lable>
                                <input type="text" class="buy-price" onkeypress="return event.keyCode>=48&&event.keyCode<=57 || event.keyCode==46" readonly>
                                <div class="buy-wrong" data-wrong-type="-1">请输入正确买入价格(大于跌停价小于涨停价,最多两个小数位)</div>
                            </li>
                            <!--                            <li class="stop-price">-->
                            <!--                                <lable>止损价格：&nbsp;&nbsp;</lable>-->
                            <!--                                <input type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57 || event.keyCode==46" placeholder="选填">-->
                            <!--                            </li>-->
                            <li><lable>当前可买：&nbsp;&nbsp;</lable><span class="now-num"></span></li>
                            <li class="num">
                                <lable>买入数量：&nbsp;&nbsp;</lable>
                                <input type="text" class="buy-num" onkeypress="return event.keyCode>=48&&event.keyCode<=57" readonly>
                                <div class="num-scale">
                                    <input type="radio" name="scale" data-scale="1" disabled="true">全部&nbsp;&nbsp;
                                    <input type="radio" name="scale" data-scale="0.5" disabled="true">1/2&nbsp;
                                    <input type="radio" name="scale" data-scale="0.33" disabled="true">1/3&nbsp;
                                    <input type="radio" name="scale" data-scale="0.25" disabled="true">1/4&nbsp;
                                    <input type="radio" name="scale" data-scale="0.2" disabled="true">1/5&nbsp;
                                </div>
                                <div class="buy-wrong" data-wrong-type="-1">请输入正确数量(100的倍数且不超过当前可买数量)</div>
                            </li>
                            <li><lable>可用资金：&nbsp;&nbsp;</lable><span class="available-capital"></span></li>
                            <li><lable>买入金额：&nbsp;&nbsp;</lable><span class="buy-total"></span></li>
                        </ul>
                        <div class="stock-code"></div>
                        <button class="trade-btn btn" data-type="0" data-buy-gid="0">买入下单</button><button class="trade-reset btn">重置</button>
                    </div>

                    <!--股票信息-->
                    <div class="col-md-6 right-infos">
                        <table class="table table1 left">
                            <tr><td>现 &nbsp;&nbsp;价：<span>--</span></td></tr>
                            <tr><td>今 &nbsp;&nbsp;开：<span>--</span></td></tr>
                            <tr><td>昨 &nbsp;&nbsp;收：<span>--</span></td></tr>
                            <tr><td>最 &nbsp;&nbsp;高：<span>--</span></td></tr>
                            <tr><td>最 &nbsp;&nbsp;低：<span>--</span></td></tr>
                            <tr><td>涨停价：<span>--</span></td></tr>
                            <tr><td>跌停价：<span>--</span></td></tr>
                            <tr><td>换手率：<span>--</span></td></tr>
                            <tr><td>成交量：<span>--</span></td></tr>
                        </table>
                        <table class="table table2 left">
                            <tr><td>卖5</td><td>--</td><td>--</td></tr>
                            <tr><td>卖4</td><td>--</td><td>--</td></tr>
                            <tr><td>卖3</td><td>--</td><td>--</td></tr>
                            <tr><td>卖2</td><td>--</td><td>--</td></tr>
                            <tr><td>卖1</td><td>--</td><td>--</td></tr>
                            <tr class="info-now-price"><td colspan="2">当前价</td><td>--</td></tr>
                            <tr><td>买1</td><td>--</td><td>--</td></tr>
                            <tr><td>买2</td><td>--</td><td>--</td></tr>
                            <tr><td>买3</td><td>--</td><td>--</td></tr>
                            <tr><td>买4</td><td>--</td><td>--</td></tr>
                            <tr><td>买5</td><td>--</td><td>--</td></tr>
                        </table>
                        <div class="clear"></div>
                    </div>
                </div>
                <!--卖出-->
                <div class="tab-pane row" id="sale">
                    <!--卖出下单-->
                    <div class="col-md-6">
                        <ul class="trade-info">
                            <li>
                                <lable>股票账户：&nbsp;&nbsp;</lable>
                                <select class="user-group sale-stock-group">
                                    <option value="-1">请选择</option>
                                </select>
                            </li>
                            <li>
                                <lable>卖出股票：&nbsp;&nbsp;</lable>
                                <select class="sale-stock">
                                    <option value="-1">请选择</option>
                                </select>
                            </li>
                            <li><lable>股票名称：&nbsp;&nbsp;</lable><span class="stock-name"></span></li>
                            <li><lable>当前价格：&nbsp;&nbsp;</lable><span class="now-price"></span></li>
                            <li class="price">
                                <lable>卖出价格：&nbsp;&nbsp;</lable>
                                <input type="text" class="buy-price" onkeypress="return event.keyCode>=48&&event.keyCode<=57 || event.keyCode==46" readonly>
                                <div class="buy-wrong" data-wrong-type="-1">请输入正确卖出价格!(大于跌停价小于涨停价,最多两个小数位)</div>
                            </li>
                            <li><lable>最大可卖：&nbsp;&nbsp;</lable><span class="now-num"></span></li>
                            <li class="num">
                                <lable>卖出数量：&nbsp;&nbsp;</lable>
                                <input type="text" class="buy-num" onkeypress="return event.keyCode>=48&&event.keyCode<=57" readonly>
                                <div class="num-scale">
                                    <input type="radio" name="scale" data-scale="1" disabled="true">全部&nbsp;&nbsp;
                                    <input type="radio" name="scale" data-scale="0.5" disabled="true">1/2&nbsp;
                                    <input type="radio" name="scale" data-scale="0.33" disabled="true">1/3&nbsp;
                                    <input type="radio" name="scale" data-scale="0.25" disabled="true">1/4&nbsp;
                                    <input type="radio" name="scale" data-scale="0.2" disabled="true">1/5&nbsp;
                                </div>
                                <div class="buy-wrong" data-wrong-type="-1">请输入正确数量(100的倍数且不超过最大可卖)</div>
                            </li>
                            <li><lable>卖出金额：&nbsp;&nbsp;</lable><span class="buy-total"></span></li>
                        </ul>
                        <div class="stock-code"></div>
                        <button class="trade-btn btn" data-type="1">卖出下单</button><button class="trade-reset btn">重置</button>
                    </div>

                    <!--股票信息-->
                    <div class="col-md-6 right-infos">
                        <table class="table table1 left">
                            <tr><td>现 &nbsp;&nbsp;价：<span>--</span></td></tr>
                            <tr><td>今 &nbsp;&nbsp;开：<span>--</span></td></tr>
                            <tr><td>昨 &nbsp;&nbsp;收：<span>--</span></td></tr>
                            <tr><td>最 &nbsp;&nbsp;高：<span>--</span></td></tr>
                            <tr><td>最 &nbsp;&nbsp;低：<span>--</span></td></tr>
                            <tr><td>涨停价：<span>--</span></td></tr>
                            <tr><td>跌停价：<span>--</span></td></tr>
                            <tr><td>换手率：<span>--</span></td></tr>
                            <tr><td>成交量：<span>--</span></td></tr>
                        </table>
                        <table class="table table2 left">
                            <tr><td>卖5</td><td>--</td><td>--</td></tr>
                            <tr><td>卖4</td><td>--</td><td>--</td></tr>
                            <tr><td>卖3</td><td>--</td><td>--</td></tr>
                            <tr><td>卖2</td><td>--</td><td>--</td></tr>
                            <tr><td>卖1</td><td>--</td><td>--</td></tr>
                            <tr class="info-now-price"><td colspan="2">当前价</td><td>--</td></tr>
                            <tr><td>买1</td><td>--</td><td>--</td></tr>
                            <tr><td>买2</td><td>--</td><td>--</td></tr>
                            <tr><td>买3</td><td>--</td><td>--</td></tr>
                            <tr><td>买4</td><td>--</td><td>--</td></tr>
                            <tr><td>买5</td><td>--</td><td>--</td></tr>
                        </table>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>

            <!--当日委托-->
            <div class="day_orders table-responsive">
                <div class="title"><h3><span>当日委托</span></h3></div>
                <table class="table">
                    <thead>
                    <tr>
                        <td>序号</td>
                        <td>账户名称</td>
                        <td>证券名称(代码)</td>
                        <td>买入/卖出</td>
                        <td>委托价格</td>
                        <td>委托数量</td>
                        <td>委托时间</td>
                        <td>成交状态</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>

        </section>
    </div>
    <div class="clear"></div>
</div>
</body>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/trade-sys/trade.js') ?>"></script>
</html>

