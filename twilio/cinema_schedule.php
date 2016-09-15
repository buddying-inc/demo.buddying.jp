<?php echo '<?xml version="1.0" encoding="UTF-8"?>'?>
<Response>
      <?php $error = false;?>
      <?php $length = strlen($_GET['Digits']);?>
      <?php if ($length == 4 && is_numeric($_GET['Digits'])) : ?>
          <?php
              $month = substr($_GET['Digits'],0,2);
              $day = substr($_GET['Digits'],2,2);
              $date = intval($month) . "月" . intval($day) . "日";
          ?>
      <?php else:?>
      <?php $error = true;?>
      <?php endif;?>
      <?php if (!$error) :?>
      <Say voice="alice" language="ja-JP">
          <?php if ($_GET['cinema'] == "1") :?>
          「シン・ゴジラ」
          <?php elseif ($_GET['cinema'] == "2") :?>
          「君の名は」
          <?php endif;?>
          の
          <?php echo $date;?>の上映スケジュールはこちらです。
          15:00、19:00
      </Say>
      <?php else :?>
      <Gather action="/twilio/cinema_schedule.php?cinema=<?php echo $_GET['cinema'];?>" method="GET">
            <Say voice="alice" language="ja-JP">
                日付が正しく認識されませんでした。
                スケジュールを知りたい日付を4桁で押して、最後にシャープを押して下さい。
            </Say>
        </Gather>
      <?php endif;?>
</Response>
