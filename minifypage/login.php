<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width, initial-scale=1"><title>悟空登录</title><link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"><link rel="stylesheet" href="http://cdn.bootcss.com/select2/4.0.2/css/select2.min.css"><link rel="stylesheet" href="http://cdn.bootcss.com/messenger/1.5.0/css/messenger.min.css"><link rel="stylesheet" href="http://cdn.bootcss.com/messenger/1.5.0/css/messenger-spinner.min.css"><link rel="stylesheet" href="http://cdn.bootcss.com/messenger/1.5.0/css/messenger-theme-air.min.css"><link rel="stylesheet" href="staticcss/wookong/login.min.css"></head><body><div class="container wk-login-box"><div class="col-md-5 wk-login-left"></div><div class="col-md-7 wk-login-right"><div class="wk-login-input"><div class="wk-login-input-title"><span>用户登录</span></div><div class="wk-login-input-body"><div class="form-group"><select data-tags="true" id="platformlist" style="width: 100%;"><option>选择营业部</option></select></div><div class="form-group"><input type="text" class="form-control" id="uname" autocomplete="off" placeholder="请输入用户名"></div><div class="form-group"><input type="password" class="form-control" id="upwd" autocomplete="off" placeholder="请输入密码"></div><div class="checkbox"><label><input type="checkbox" id="autologin"> 10天免登录 </label></div><div class="form-group text-right"><button type="button" class="btn btn-primary" id="login">登&nbsp;&nbsp;录</button></div></div></div></div></div></body><script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script><script src="http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script><script src="http://cdn.bootcss.com/select2/4.0.2/js/select2.min.js"></script><script src="http://cdn.bootcss.com/messenger/1.5.0/js/messenger.min.js"></script><script src="http://cdn.bootcss.com/messenger/1.5.0/js/messenger-theme-future.min.js"></script><script src="static/js/common.min.js"></script><script src="static/js/all.min.js"></script><script>$(function(){var bodyBgs=[];bodyBgs[0]="staticimgs/i/login_bg_01.jpg";bodyBgs[1]="staticimgs/i/login_bg_02.jpg";bodyBgs[2]="staticimgs/i/login_bg_03.jpg";bodyBgs[3]="staticimgs/i/login_bg_04.jpg";bodyBgs[4]="staticimgs/i/login_bg_05.jpg";var randomBgIndex=Math.floor(Math.random()*5);$("body").css("background","url('"+bodyBgs[randomBgIndex]+"') no-repeat 50% 0");$("#platformlist").select2({minimumResultsForSearch:-1});$._messengerDefaults={extraClasses:'messenger-fixed messenger-theme-air messenger-on-top',singleton:true,hideAfter:3};common.getPlatformList(null,function(resultData){if(resultData.status===1){if(resultData.platform_info&&resultData.platform_info.length>0){var html=[];html.push("<option value=\"0\">选择营业部</option>");var platformList=resultData.platform_info;for(var i=0;i<platformList.length;i++){html.push("<option value='"+platformList[i].platform_id+"'>"+platformList[i].platform_name+"</option>");}
        $("#platformlist").html(html.join(''));}}})})</script></html>