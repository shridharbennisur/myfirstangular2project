<?php 
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
ini_Set('display_errors', 1);
include '/home/costrategix/angular2app/api/configuration.php';

$product = json_decode(file_get_contents('php://input'));

$productName = $product->name;
$productPrice = (int)$product->price;
$productQuantity = (int)$product->quantity;
$response = array();
$sql = "INSERT INTO product (name, price, quantity)
VALUES ('$productName', '$productPrice', '$productQuantity')";

if (mysqli_query($conn, $sql)) {
    $response[0] = array(
        'status' => 1,
        'response' => 'successfully saved!'
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