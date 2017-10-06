<?php 

header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
ini_Set('display_errors', 1);
include '/home/costrategix/angular2app/api/configuration.php';

$product = json_decode(file_get_contents('php://input'));

$productId = $product->id;
$productName = $product->name;
$productPrice = $product->price;
$productQuantity = $product->quantity;

$sql = "UPDATE product SET name='$productName', price='$productPrice', quantity= '$productQuantity' WHERE id='$productId'";
$response = array();

if (mysqli_query($conn, $sql)) {
   $response[0] = array(
        'status' => 1,
        'response' => 'updated successfully!'
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

