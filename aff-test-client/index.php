<?php

$afId = $_GET["afid"] ? $_GET["afid"] : "";
$oId = $_GET["oid"] ? $_GET["oid"] : "";
if (empty($afId)) die("error: no id added.");

$url = "http://www.preaf.jp:40080/r.php?afid=".$afId;

if (!empty($oid)) {
    $url .= "&oid=" . $oid;
}

$content = file_get_contents($url);
$r = fopen(dirname(__FILE__) . "/logs/".$afId.".log","w");
fwrite($r,$content);
fclose($r);

echo $afId." is accepted.";
 ?>
