<?php echo '<?xml version="1.0" encoding="UTF-8"?>'?>
<?php
$log = "./reject.log";
error_log(date("Y-m-d H:i:s") . "\n", 3, $log);
error_log(print_r($_POST, true), 3, $log);
?>
<Response>
    <Reject reason="busy" />
</Response>
