<?xml version="1.0" encoding="UTF-8"?>
<Response>
      <Say voice="alice" language="ja-JP">
          <?php if ($_GET['cinema'] == "1") :?>
          「シン・ゴジラ」
          <?php elseif ($_GET['cinema'] == "2") :?>
          「君の名は」
          <?php endif;?>
          の
          <?php echo $_GET['Digits'];?>の上映スケジュールはこちらです。
          15:00 19:00
      </Say>
</Response>
