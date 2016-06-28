<?php
require_once(dirname(__FILE__) . "/common/iwookongConfig.class.php");
require_once(dirname(__FILE__) . "/common/Cookies.class.php");
session_destroy();
$cooikes=new Cookies();
$cooikes->clear(iwookongConfig::$usercookie);
header("Location:login.php ");
exit();