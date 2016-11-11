<script type="text/javascript">
//    平台、设备和操作系统
//    var system ={
//        win : false,
//        mac : false,
//        xll : false
//    };
//    //检测平台
//    var p = navigator.platform;
//        alert(p);
//
//    /**var sUserAgent = navigator.userAgent.toLowerCase();
//     alert(sUserAgent);*/
//
//    system.win = p.indexOf("Win") == 0;
//    system.mac = p.indexOf("Mac") == 0;
//    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//    //跳转语句
//    if(system.win||system.mac||system.xll){//转向后台登陆页面
//        window.location.href="http://taov.qq.com";
//    }else{
//        window.location.href="http://t.qq.com";
//    }

        try{
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                window.location.href = "http://t.qq.com";
            } else {
                window.location.href = "login.php";
            }
        }catch(e){}
</script>