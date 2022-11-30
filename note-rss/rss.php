<?php

$allowOrigins = array(
    'http://localhost:63342',
    'http://demo.buddying.jp'
);

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;
if ($origin !== null && ! in_array($origin, $allowOrigins, true)) {
    return;
}

header('Content-Type: application/xml; charset=utf-8');
header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://note.com/hix_pharmacist/rss.xml');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HEADER, 0);

curl_exec($ch);

curl_close($ch);
