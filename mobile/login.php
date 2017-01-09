<!DOCTYPE html>
<html class="ui-page-login">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <title>回测登录</title>
    <link href="css/mui.min.css" rel="stylesheet"/>
    <style>
        html, body {width: 100%; height: 100%; margin: 0px; padding: 0px; }
        body {width: 100%; height: 100%; background: url('img/login_bac.png') no-repeat; background-size:100% 100%; font-family: '微软雅黑';}
        .fl {float: left }
        .clear {clear: both}
        .header {width: 100%; text-align: center;position: absolute;top: 18%;}
        .content {position: absolute; top: 33%; left: 11.5%; width: 77%; height: 235px; background-color: #fff; border-radius: 6px; padding: 20px 10px 20px; text-align: center;}
        .result-tips {color: #ff6565; font-size: 10px; padding: 0; text-align: center;  margin: 0; }
        .account-box {height: 135px; padding: 0; margin: 0;}
        .account-box li {width: 100%; height: 30px; border: 0px; border-bottom: 1px solid #E3E3E3; padding: 5px 10px; margin-bottom: 20px; color: #484848; list-style: none}
        .account-box li:nth-child(3), .account-box li:nth-child(3) input {margin-bottom: 0px;}
        .account-box li input { width: 80%; height: 100%; border: 0; font: 14px '微软雅黑';padding:0px 10px;}
        .account-box li img { margin-top: 4px;}
        .content button {padding: 5px; background-color: #5878CB; border-radius: 2em; font: 14px '微软雅黑'; margin-top: 5px;}
    </style>
</head>
<body>
<div class="header"><img src="img/login_icon1.png" width="25%"></div>
<div class="content">
    <ul class="account-box">
        <li>
            <img src="img/login_icon2.png" class="fl" height="70%">
            <input type="text" id="platformid" class="fl" placeholder="机构ID">
            <div class="clear"></div>
        </li>
        <li>
            <img src="img/login_icon3.png" class="fl" height="70%">
            <input type="text" id="uname" class="fl" placeholder="用户名">
            <div class="clear"></div>
        </li>
        <li>
            <img src="img/login_icon4.png" class="fl" height="70%">
            <input type="password" id="upwd" class="fl" placeholder="密码">
            <div class="clear"></div>
        </li>
    </ul>
    <div class="clear"></div>
    <p class="result-tips" id="result-tips">&nbsp;</p>
    <button type="button" id="login" class="mui-btn mui-btn-primary mui-btn-block">登&nbsp;&nbsp;录</button>
</div>

<script src="js/mui.min.js"></script>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="/static/js/common.min.js"></script>
<script>
    $(function () {
        $(this).keydown(function (e) {
            if (e.which == "13") {
                login();
            }
        });
    });
    $("#login").click(function () {
        login();
    });
    function login() {
        var platform = $("#platformid").val();
        var uname = $("#uname").val();
        var upwd = $("#upwd").val();
        var autologin = $("#autologin").is(":checked");
        if (platform == "") {
            $("#result-tips").html("机构ID不能为空");
            setTimeout(function () {
                $("#result-tips").html("&nbsp;");
            }, 2000);
            return;
        }
        if (uname === "" || upwd === "") {
            $("#result-tips").html("用户名和密码不能为空");
            setTimeout(function () {
                $("#result-tips").html("&nbsp;");
            }, 2000);
            return;
        }
        var arrData = {
            platform_id: platform,
            user_name: uname,
            password: upwd,
            autologin: autologin
        };
        common.login(arrData, null, function (resultData) {
            if (resultData.status != 0) {
                window.location.href = "/";
            } else {
                $("#result-tips").html(resultData.result);
                setTimeout(function () {
                    $("#result-tips").html("&nbsp;");
                }, 2000);
            }
        });
    }
</script>
</body>

</html>