<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://note.com/hix_pharmacist/rss.xml');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HEADER, 0);

curl_exec($ch);

curl_close($ch);
