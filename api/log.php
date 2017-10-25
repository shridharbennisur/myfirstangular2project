<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
ini_Set('display_errors', 1);
$log = json_decode(file_get_contents('php://input'));

$data = date("Y-m-d h:i:sa").' => '.$log->data."\r\n";
$myfile = fopen("log.txt", "a+") or die("Unable to open file!");
fputs($myfile, $data);
fclose($myfile);

?>