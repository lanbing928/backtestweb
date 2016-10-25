<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>回测登录</title>
    <!--插件cdn-->
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" >
    <link href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <link rel="stylesheet" href="static/css/login.min.css">
    <style>
        .container{padding: 0;}
        .login-box{background: url("static/imgs/backtest/bac.jpg") no-repeat center;background-size:100% 100%;height: 955px;width: 100%;text-align: center}
        .login-right{width:890px;height: 570px;background: url("static/imgs/backtest/textbox.png") no-repeat center;background-size:100% 100%;margin: 110px auto;position: relative}
        .login-left-box{width:445px;float: left;padding: 156px 0px 0px 105px;color:#fff;font:20px '微软雅黑';line-height:105px}
        .login-left-box span{font-size:30px;font-weight:600}
        .login-right-box{width:445px;float:left;padding: 120px 85px 0px 50px;}
        .login-text{color:#fff;font:20px '微软雅黑';position: absolute;right:65px;top:40px}
        .account-box input{width: 100%;border-radius: 5px;height: 45px;border: 1px solid #cccccc;padding-left: 12px;font-size: 14px;}
        .account-box input:nth-child(2) {margin: 40px 0;}
        .autologin-box input{margin: 0;width: 20px;height: 20px;border-radius: 5px;border: 1px solid red;}
        .autologin-box span{font-size: 14px;color: #666666;vertical-align: super;margin-left: 10px;}
        .login-right-box button{margin-top: 45px;width: 100%;background-color: #6C82BC;border: 1px solid #6C82BC;height: 45px;color: #FFFFFF;font-size: 22px;border-radius: 5px;;}
        .result-tips{color: red;font-size: 12px;margin:5px 0;padding: 0;text-align: center;}
    </style>
</head>
<body>
<div class="login-box">
    <div class="container">
        <div class="login-right">
            <div class="login-text">用户登录 User Login</div>
            <div class="login-left-box">最新检索热词推荐更<span>智能</span><br>全网股票数据筛选更<span>精准</span><br>报表一键导出贴心更<span>便捷</span>
            </div>
            <div class="login-right-box">
                <p class="result-tips" id="result-tips">&nbsp;</p>
                <div class="account-box">
                    <input type="text" id="platformid" placeholder="机构ID">
                    <input type="text" id="uname" placeholder="用户名">
                    <input type="password" id="upwd" placeholder="密码">
                </div>
                <button id="login">登&nbsp;&nbsp;录</button>
            </div>
        </div>
    </div>
</div>
</body>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="static/js/common.min.js"></script>

<script>
    var account=getCookie('Uj8$!mhy');
    //获取cookie
    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }




    $("#addcollect").click(function() {
        var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL';
        if (document.all) {
            window.external.addFavorite('http://stock.iwookong.com', '坤雁悟空')
        } else if (window.sidebar) {
            window.sidebar.addPanel('坤雁悟空', 'http://stock.iwookong.com', "")
        } else {
            alert('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹')
        }
    });
    $("#wechat").click(function(){
        swal({title: "",text: "",imageUrl: "static/imgs/i/qrcode.jpg" });
        $(".sa-custom").css({"width":"258px","height":"258px"});
        $(".showSweetAlert").css({"margin-top":"-230px"});
        //staticimgs/i/qrcode.jpg
    });
    $(function(){
        $(this).keydown(function (e){
            if(e.which == "13"){
                login();
            }
        });
    });
    $("#login").click(function () {
        login();
    });
    function login(){
        var platform = $("#platformid").val();
        var uname = $("#uname").val();
        var upwd = $("#upwd").val();
        var autologin = $("#autologin").is(":checked");
        if (platform == "") {
            $("#result-tips").html("机构ID不能为空");
            setTimeout(function(){
                $("#result-tips").html("&nbsp;");
            },2000);
            return;
        }
        if (uname === "" || upwd === "") {
            $("#result-tips").html("用户名和密码不能为空");
            setTimeout(function(){
                $("#result-tips").html("&nbsp;");
            },2000);
            return;
        }
        var arrData = {
            platform_id: platform,
            user_name: uname,
            password:  upwd,
            autologin: autologin
        };
        common.login(arrData, null, function (resultData) {
            if (resultData.status != 0) {
                window.location.href = "/";
            } else {
                $("#result-tips").html(resultData.result);
                setTimeout(function(){
                    $("#result-tips").html("&nbsp;");
                },2000);
            }
        });
    }
</script>
</html>