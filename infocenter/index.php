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
    <title>悟空</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="../static/plugins/typeahead/jquery.typeahead.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="../static/css/common.min.css">
    <link rel="stylesheet" href="../static/css/index.min.css">
</head>
<body>
<?php include(dirname(__FILE__) . "/../share/_header.php") ?>
<div class="container wk-container">
    <section class="wk-user-center">
        <div class="wk-user-datas"></div>
        <div class="wk-user-mychoose">
            <div class="wk-user-choose-title">
                <div class="active" data-group-name="我的自选股">
                    <div class="wk-btn-mygroup">
                        <span>我的自选股</span>
                    </div>
                </div>
            </div>
            <a class="btn btn-default btn-sm wk-add-zh">
                <i class="fa fa-plus"></i> 添加组合
            </a>
        </div>
        <div class="wk-user-mychoose-table-box">
            <div class="wk-user-sub-search text-right">
                <!--历史回测-->
                <div class="col-md-8 person-backtest">
                    <span class="compare_select"><img src="/static/imgs/i/person_backtest1.png">对比数据选择</span>&nbsp;&nbsp;
                    <ul class="compare_data">
                        <li class="yield"><input type="checkbox" value="1"> <span>收益率&nbsp;&nbsp;&nbsp;</span></li>
                        <li class="hot_degree"><input type="checkbox" value="2"> <span>热度</span></li>
                        <li style="clear: both;"></li>
                    </ul>

                    <span class="position_ratio"><img src="/static/imgs/i/person_backtest3.png">持仓比</span>&nbsp;&nbsp;
                    <ul class="progress_bar">
                        <li>剩余调仓比:
                            <div class="scale_panel">
                                <div class="scale" id="surplus_bar">
                                    <div id="surplus_scale"></div>  <!--拖拽的距离-->
                                </div>
                                <span id="surplus_title">0</span>
                            </div>
                        </li>
<!--                        <li>腾达建设:-->
<!--                            <div class="scale_panel">-->
<!--                                <div class="scale" id="bar2">-->
<!--                                    <div></div>-->
<!--                                    <span id="btn2"</span>-->
<!--                                </div>-->
<!--                                <span id="title2">0</span>-->
<!--                            </div>-->
<!--                        </li>-->
<!--                        <li>国泰君安:-->
<!--                            <div class="scale_panel">-->
<!--                                <div class="scale" id="bar3">-->
<!--                                    <div></div>-->
<!--                                    <span id="btn3"></span>-->
<!--                                </div>-->
<!--                                <span id="title3">0</span>-->
<!--                            </div>-->
<!--                        </li>-->
                    </ul>

                    <input type="date" class="testfrom" value="<?php echo date('Y-m-d',time()) ?>"> -
                    <input type="date" class="testto" value="<?php echo date('Y-m-d',time()) ?>">&nbsp;&nbsp;
                    <button data-toggle="modal" data-target=".modal-chart">回测</button>
                </div>

                <div class="col-md-4">
                    <div class="input-group">
                        <div class="typeahead__container">
                            <div class="typeahead__field">
                                <span class="typeahead__query">
                                    <input class="form-control wk-user-stock-search" type="search" placeholder="请输入股票代码" autocomplete="off">
                                </span>
                                <span class="input-group-addon"><i class="fa fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wk-user-mychoose-table table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <td>股票代码</td>
                        <td>股票名称</td>
                        <td>最新价</td>
                        <td>涨跌幅</td>
                        <td>成交量(万手)</td>
                        <td>换手率</td>
                        <td>市盈率</td>
                        <td>查看热度</td>
                        <td>搜索热度</td>
                        <td>关注热度</td>
                        <td><i class="fa fa-refresh wk-sub-refresh" data-refresh="我的自选股"></i></td>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <div class="wk-user-mynews" data-stock="00000x|" data-query-type="1" data-info-type="0">
            <div class="btn-group active" data-target="wk-user-news-list">
                <div class="wk-user-news-slider">
                    <span>新闻</span>
                    <i class="fa fa-chevron-down" data-expand="false"></i>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-vpoint-list">
                <div class="wk-user-vpoint-slider">
                    <span>达人观点</span>
                    <i class="fa fa-chevron-down" data-expand="false"></i>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-fastnews-list">
                <div class="wk-user-fastnews-slider">
                    <span>快讯</span>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-notice-list">
                <div class="wk-user-notice-slider">
                    <span>公告</span>
                </div>
            </div>
            <div class="btn-group" data-target="wk-user-report-list">
                <div class="wk-user-report-slider">
                    <span>研报</span>
                </div>
            </div>
        </div>
        <div class="wk-user-news-tabcon">
            <div class="wk-user-news-list" id="wk-user-news-list">
                <div class="wk-user-news-ctrl">
                    <div class="wk-user-news-ctrl-head">
                        <div class="user-default active"><label>默认</label></div>
                        <div class="user-define"><span>自定义</span>&nbsp;<i class="fa fa-caret-down" data-expand="false"></i></div>
                    </div>
                    <div class="wk-user-news-ctrl-con"></div>
                </div>
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-vpoint-list" id="wk-user-vpoint-list" style="display: none;">
                <div class="wk-user-vpoint-ctrl">
                    <div class="wk-user-news-ctrl-head">
                        <div class="user-default active"><label>默认</label></div>
                        <div class="user-define"><span>自定义</span>&nbsp;<i class="fa fa-caret-down" data-expand="false"></i></div>
                    </div>
                    <div class="wk-user-news-ctrl-con"></div>
                </div>
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-fastnews-list" id="wk-user-fastnews-list" style="display: none;">
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-notice-list" id="wk-user-notice-list" style="display: none;">
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
            <div class="wk-user-report-list" id="wk-user-report-list" style="display: none;">
                <div class="wk-con"></div>
                <div class='wk-user-news-loading'><i class='fa fa-refresh fa-spin'></i>&nbsp;正在加载...</div>
            </div>
        </div>
    </section>
    <!--历史回测模态框-->
    <div class="modal fade modal-chart backtest-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body">
                    <div id="modal-chart"></div>
                </div>
            </div>
        </div>
    </div>
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
<script src="../static/js/page/infocenter.min.js"></script>
<script>
    var scale_count=$('.person-backtest .progress_bar li').length;//持仓比进度条数量
    var yield; //数据对比 收益率复选框
    var hot_degree; //数据对比 热度复选框
    $('.person-backtest .progress_bar').mouseleave(function(){
        $('.person-backtest .progress_bar').hide();//持仓比进度条下拉框 鼠标离开不显示
    });

    $('.compare_select').click(function(){
        $('.person-backtest .compare_data').show();//对比数据选择 点击下拉框显示
    });

    $('.person-backtest .compare_data').mouseleave(function(){//对比数据选择 鼠标离开
        yield=$('.yield input:checked').val();
        hot_degree=$('.hot_degree input:checked').val();
        $('.person-backtest .compare_data').hide();
        if(yield || hot_degree){   //如果收益率或热度选中 则持仓比下拉框点击可显示
            $('.position_ratio').click(function(){
                $('.person-backtest .progress_bar').show();
            })
            $('.position_ratio').css('color','#475586').find('img').attr('src','/static/imgs/i/person_backtest2.png');
        }else{
            $('.position_ratio').css('color','#BEBEBE').find('img').attr('src','/static/imgs/i/person_backtest3.png');
        }
    });

    /**
     * 拖拽持仓进度条
     * */
    scale=function (btn,bar,title){
        this.btn=document.getElementById(btn);//拖拽按钮
        this.bar=document.getElementById(bar);//进度条
        this.title=document.getElementById(title);//显示拖拽的百分百
        this.step=this.bar.getElementsByTagName("DIV")[0];//拖拽长度
        this.init();
    };
    scale.prototype={
        init:function (){
            var f=this,g=document,b=window,m=Math;
            f.btn.onmousedown=function (e){
                var x=(e||b.event).clientX;
                var l=this.offsetLeft;
                var max=f.bar.offsetWidth-this.offsetWidth;
                g.onmousemove=function (e){
                    var thisX=(e||b.event).clientX;
                    var to=m.min(max,m.max(-2,l+(thisX-x)));
                    f.btn.style.left=to+'px';
                    f.ondrag(m.round(m.max(0,to/max)*100),to);
                    b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
                };
                g.onmouseup=new Function('this.onmousemove=null');
            };

        },
        ondrag:function (pos,x){
            this.step.style.width=Math.max(0,x)+'px';
            this.title.innerHTML=pos+'%';
            var sheng=100-Math.max(0,x);
            var surplus_scale=document.getElementById('surplus_scale');
            var surplus_title=document.getElementById('surplus_title');
            surplus_scale.style.width=sheng+'px';
            surplus_title.innerHTML=(100-pos)+'%';        }
    }

//    $('body').on('click','.position_ratio',function(){
//
//    })

    /**
     * 点击进行回测
     * */
    $('body').on('click','.person-backtest button',function(){
        var bar_scale=[];//持仓百分比数值 key从1开始
        var backtest_timefrom=$('.testfrom').val();//回测时间
        var test_timeto=$('.testto').val();
        for(var i=1; i<scale_count+1; i++) {//获取持仓比每只股票百分百数值
            bar_scale[i]=$("#title"+i).html().split('%');
            bar_scale[i]=parseInt(bar_scale[i]);
        }
    })

    /**
     * 画回测折线图
     * */

</script>
</body>
</html>