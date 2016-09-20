<?php echo '<?xml version="1.0" encoding="UTF-8"?>'?>
<?php
$log = "./reject.log";
error_log(date("Y-m-d H:i:s") . "\n", 3, $log);
error_log(print_r($_POST, true), 3, $log);
$rejectNumbers = array(
    "+7378742833",//制限されている番号
    "+2562533",//ブロックされている番号
    "+8656696",//不明
    "+266696687",//匿名

);
?>
<?php if ($_POST['From'] == '' || in_array($_POST['From'], $rejectNumbers)) :?>
<Response>
    <Say voice="alice" language="ja-JP">
        イイクニ のご利用 誠に ありがとうございます。
        申し訳ございませんが、発信者番号 を通知 しておかけ直し 下さい。
        なお、お問い合わせ にはお電話 ではお答え 出来ません。
        お手数ですが、サイト記載の メールアドレス へメール頂けますよう お願い申し上げます。
    </Say>
</Response>
<?php else:?>
    <Say voice="alice" language="ja-JP">
        イイクニ のご利用 誠に ありがとうございます。
        お問い合わせ にはお電話 ではお答え 出来ません。
        お手数ですが、サイト記載の メールアドレス へメール頂けますよう お願い申し上げます。
    </Say>
<?php endif;?>
