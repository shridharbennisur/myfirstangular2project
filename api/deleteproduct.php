<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
ini_Set('display_errors', 1);
include '/home/costrategix/angular2app/api/configuration.php';

$productId = $_GET['id'];

// sql to delete a record
$sql = "DELETE FROM product WHERE id= '$productId'";

if (mysqli_query($conn, $sql)) {
     $response[0] = array(
        'status' => 1,
        'response' => 'deleted successfully!'
    );
    echo json_encode($response);
} else {
    $response[0] = array(
        'status' => 0,
        'response' => mysqli_error($conn)
    );
    echo json_encode($response);
}

mysqli_close($conn);



?>