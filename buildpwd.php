<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>悟空</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
</head>
<body>
<div class="container">
    <form method="post">
        <div class="form-group">
            <label for="pwd">输入要加密的密码：</label>
            <input type="text" class="form-control" name="pwd" id="pwd" placeholder="输入密码">
        </div>
        <button type="submit" class="btn btn-success">提交</button>
    </form>
</div>
</body>
<?php
$pwd = isset($_POST['pwd']) ? $_POST['pwd'] : "";
if (!empty($pwd)) {
    echo "<div class=\"container\">" . md5(crypt($pwd, substr($pwd, 0, 2))) . "</div>";
} else {
    echo "";
}