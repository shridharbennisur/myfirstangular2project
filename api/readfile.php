<?php
$file = fopen("log.txt","r");

while(! feof($file))
  {
      $fileContent = fgets($file);
      echo strlen($fileContent)." = ".$fileContent."<br />";
  }

fclose($file);
?>