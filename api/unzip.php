<?php
ini_Set('display_errors', 1);
$zip = zip_open("/home/costrategix/Downloads/router.zip");
zip_read($zip);

// some code

zip_close($zip);
?>