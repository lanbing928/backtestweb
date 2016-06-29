<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>悟空登录</title>
    <!--插件cdn-->
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css" >
    <link href="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet">
    <link rel="stylesheet" href="static/css/login.min.css">
    <style>
        .container{padding: 0;}
        .navbar{height: 130px;margin-bottom:0;background-color: #FFFFFF;}
        .navbar .container{margin-top: 25px;}
        .navbar-brand{height: 10%;padding: 0;}
        .navbar-brand img{float: left;}
        .navbar-brand label{float: right;margin-top: 27px;margin-left: 24px;font-size: 26px;color: #545454;font-weight: 400;}
        .navbar-right{margin-top: 30px;}
        .navbar-right li{height: 20px;padding: 0 20px;}
        .navbar-right li a{font-size: 18px;color: #545454;line-height: 18px;padding: 0;cursor: pointer;}
        .navbar-right li:nth-child(1){border-right: 1px solid #545454;}
        .login-box{background: url("static/imgs/i/login_bg.png") no-repeat center;height: 668px;width: 100%;}
        .login-left{background: url("static/imgs/i/login_left.png") no-repeat left;height: 392px;margin-top: 130px;float: left;width:335px;max-width: 335px;}
        .login-right{width: 442px;height: 450px;background-color: #FFFFFF;float: right;margin-top: 106px;border-radius: 5px;box-shadow: 2px 2px 5px;}
        .login-right-box{padding: 21px 42px 48px;}
        .account-box input{width: 100%;border-radius: 5px;height: 50px;border: 1px solid #cccccc;padding-left: 12px;font-size: 14px;}
        .account-box input:nth-child(2) {margin: 40px 0;}
        .autologin-box input{margin: 0;width: 20px;height: 20px;border-radius: 5px;border: 1px solid red;}
        .autologin-box span{font-size: 14px;color: #666666;vertical-align: super;margin-left: 10px;}
        .login-right-box button{margin-top: 50px;width: 100%;background-color: #1858a6;border: 1px solid #1858a6;height: 50px;color: #FFFFFF;font-size: 22px;border-radius: 5px; text-shadow: 1.5px 2.598px 0px rgb( 0, 46, 162 );}
        .copyright{width: 430px;font-size: 12px;color: #999999;margin: 60px auto 0;}
        .result-tips{color: red;font-size: 12px;margin:5px 0;padding: 0;text-align: center;}
    </style>
</head>
<body>
<nav class="navbar navbar-default navbar-static-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
                <img src="static/imgs/i/login_logo.png">
                <label>坤雁悟空</label>
            </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a id="addcollect">收藏本页</a></li>
                <li><a id="wechat">微信关注</a></li>
            </ul>
        </div>
    </div>
</nav>
<div class="login-box">
    <div class="container">
        <div class="login-left"></div>
        <div class="login-right">
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
<div class="copyright">
    Copyright @ 2015 上海坤雁数据服务有限公司 版权所有 京ICP备 12027411号
</div>
</body>
<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="http://cdn.bootcss.com/sweetalert/1.1.3/sweetalert.min.js"></script>
<script src="static/js/common.min.js"></script>
<script>
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
        swal({title: "",text: "",imageUrl: "staticimgs/i/qrcode.jpg" });
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
                window.location.href = "index.php";
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