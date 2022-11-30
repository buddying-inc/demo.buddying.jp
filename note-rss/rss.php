<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://note.com/hix_pharmacist/');
$rss = curl_exec($ch);
curl_close($ch);

echo $rss;
