<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather action="/twilio/cinema_schedule.php?cinema=<?php echo $_GET['Digits'];?>" method="GET">
          <Say voice="alice" language="ja-JP">
              <?php if ($_GET['Digits'] == "1") :?>
              「シン・ゴジラ」ですね。
              <?php elseif ($_GET['Digits'] == "2") :?>
              「君の名は」ですね。
              <?php endif;?>
              スケジュールを知りたい日付を4桁で押して下さい。
          </Say>
      </Gather>
      <Say>入力が確認出来ませんでした。さようなら。</Say>
</Response>
