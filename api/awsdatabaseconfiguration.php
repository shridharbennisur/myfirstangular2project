<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
$servername = "ec2-54-89-33-39.compute-1.amazonaws.com";
$port = "3306";
$username = "myawsdatabase";
$password = "shridharm773";
 $dbname = "mydatabaseforaws";

// Create connection
$conn = mysqli_connect($servername,$port, $username, $password) ;

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} 

echo $conn;

?>