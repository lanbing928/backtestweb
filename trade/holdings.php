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
    <link rel="stylesheet" href="<?php echo UtilityTools::AutoVersion('/static/css/trade-sys/holdings.css') ?>">
</head>
<body>
<?php include(dirname(__FILE__) . "/../trade/header.php") ?>
<div class="container wk-container wk-content">
    <!-- 左边菜单 -->
    <div class=" wk-nav-tabs left">
        <div class="wk-nav-hushen"><img src="../static/imgs/trade/hushen.png">&nbsp;&nbsp;我的沪深</div>
        <ul class="nav">
            <li><a href="index.php">我的关注</a></li>
            <li class="active"><a href="holdings.php">我的账户</a></li>
            <li><a href="trade.php">模拟交易</a></li>
            <li><a href="analysis.php">收益分析</a></li>
        </ul>
    </div>
    <!-- 右边内容 -->
    <div class="tab-content wk-nav-content left">
        <!-- 我的账户 -->
        <section id="holdings">
            <div class="container-fluid index-container">
                <!--                上证指数-->
                <div class="row index-items"></div>
            </div>

            <!--            环形收益分析-->
            <div class="container-fluid index-container index-main">
                <div class="row encharts">
                    <div class="encharts_left col-md-4 col-sm-6">
                        <div id="profit" class="pull-left">
                        </div>
                        <div class=" profit-amount ">
                            <p class="redColor">--</p>
                            <p><span>--</span>&nbsp;笔盈利交易</p>
                        </div>
                    </div>

                    <div class='encharts_right col-md-6 col-sm-6'>
                        <div id="loss" class="pull-left">

                        </div>
                        <div class="loss-amount">
                            <p class="greenColor">--</p>
                            <p><span>--</span>&nbsp;笔亏损交易</p>
                        </div>
                    </div>
                </div>
                <!--用户资产信息-->
                <div class="container-fluid fund-data ">
                    <div class="user_account"></div>
                </div>
                <div class="dashed-line">
                </div>
                <!--点击我的账户，渲染环形收益分析，账户信息，交易记录-->
                <div class="attention">
                    <ul class="btn-groupList">

                    </ul>
                    <div class="dashed-line">
                    </div>
                </div>
                <div class="index-tabs clickLi">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs index-tabs-items" role="tablist">
                        <li role="presentation" class="active" data-type="1"><a href="#index1" role="tab" data-toggle="tab">当前持仓</a></li>
                        <li role="presentation"  data-type="2"><a href="#index2" role="tab" data-toggle="tab">当日委托</a></li>
                        <li role="presentation"  data-type="3"><a href="#index3" role="tab" data-toggle="tab">当日成交</a></li>
                        <li role="presentation"  data-type="4"><a href="#index4" role="tab" data-toggle="tab">历史成交</a></li>
                        <li role="presentation"  data-type="5"><a href="#index5" role="tab" data-toggle="tab">对账单</a></li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="index1">
                            <div class="table-responsive holdingStock">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称（代码）</td>
                                        <td>当前持仓</td>
                                        <td>可用股数</td>
                                        <td>持仓成本</td>
                                        <td>最新价</td>
                                        <td>持股市值</td>
                                        <td>浮动盈亏</td>
                                        <td>盈亏比例</td>
                                        <td>仓位</td>
                                        <td>操作
<!--                                            (<a href="#"><img src="../static/imgs/trade/op_buy.png" alt="">&nbsp<img src="../static/imgs/trade/op_sale.png" alt=""></a>)-->
                                        </td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="index2">
                            <div class="toggle-responsive orderStock">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称(代码)</td>
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
                        </div>
                        <div role="tabpanel" class="tab-pane" id="index3">
                            <div class="table-responsive finishedOrder">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称(代码)</td>
                                        <td>买入/卖出</td>
                                        <td>成交价格</td>
                                        <td>成交数量</td>
                                        <td>成交金额</td>
                                        <td>成交时间</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="index4">
                            <div class="table-responsive HistoryOrder">
                                <div class="query">
                                    <span>从</span><input type="text" placeholder="请输入查询日期" class="sQuery1" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})"><span>到</span><input
                                        type="text"  class="eQuery1" placeholder="请输入查询日期"   onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})">
                                    <span class="h-query">查询</span>
                                </div>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <td>序号</td>
                                        <td>股票名称(代码)</td>
                                        <td>买入/卖出</td>
                                        <td>成交价格</td>
                                        <td>成交数量</td>
                                        <td>成交金额</td>
                                        <td>成交时间</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="index5">
                            <div class="table-responsive statement">
                                <div class="query">
                                    <span class="">从</span><input type="text" class="sQuery2" placeholder="请输入查询日期" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})"><span>到</span><input
                                        type="text" class="eQuery2" placeholder="请输入查询日期" onFocus="WdatePicker({lang:'zh-cn',maxDate:new Date()})">
                                    <span class="s-query">查询</span>
                                </div>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <td>股票名称(代码)</td>
                                        <td>成交时间</td>
                                        <td>类型</td>
                                        <td>成交价格</td>
                                        <td>成交数量</td>
                                        <td>佣金</td>
                                        <td>印花税</td>
                                        <td>过户费</td>
                                        <td>发生金额</td>
                                        <td>可用资金</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </div>
    <div class="clear"></div>
</div>
</body>
<script src="<?php echo UtilityTools::AutoVersion('/static/js/trade-sys/holdings.js') ?>"></script>
<script src="../static/plugins/template-native.js" ></script>
<script type="text/html" id="tpl">
    <%for(var i = 0;i
    <index_info.length;i++ ){%>
    <div class="col-md-4  index-item">

        <%if(index_info[i].up_price>0){%>
        <% var imgurl="../static/imgs/trade/arrow_up.png" %>
        <div class='index redStyle'>
            <%}else{%>
            <% var imgurl="../static/imgs/trade/arrow_down.png" %>
            <div class='index greenStyle'>
                <%}%>

                <p class='index-title'><%==index_info[i].name%></p>
                <div class="index-box ">
                    <div class='index-box-left pull-left'>
                        <p><img src=<%==imgurl%> alt="">
                            <%var percent=(index_info[i].price).toFixed(2)%>
                            <span><%==percent%></span>
                            <!--                            <span><%==index_info[i].price%></span>-->
                        </p>
                    </div>
                    <div class='index-box-right pull-right'>
                        <p><%==index_info[i].up_price%></p>
                        <%var percent=(index_info[i].up_percent*100).toFixed(2)%>
                        <p><%==percent%>%</p>
                    </div>
                </div>
            </div>
        </div>
        <%}%>
</script>
</html>

