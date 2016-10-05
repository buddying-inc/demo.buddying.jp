<?php

$afId = $_GET["afid"] ? $_GET["afid"] : "";
if (empty($afId)) die("error: no id added.");

$content = file_get_contents("http://www.preaf.jp:40080/r.php?afid=".$afId);
$r = fopen(dirname(__FILE__) . "/logs/".$afId.".log","w");
fwrite($r,$content);
fclose($r);

echo $afId." is accepted.";
 ?>
