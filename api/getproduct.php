<?php 
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
ini_Set('display_errors', 1);
include '/home/costrategix/angular2app/api/configuration.php';


$sql = "SELECT * FROM product";
$result = mysqli_query($conn, $sql);
$response = array();
if (mysqli_num_rows($result) > 0) {
    // output data of each row

    while($row = mysqli_fetch_assoc($result)) {
        $response[] = array(
        'id' => $row["id"],
        'name' =>  $row["name"],
        'price' =>  $row["price"],
        'quantity' =>  $row["quantity"],
    );     
    }
    echo json_encode($response);
} else {
     $response[0] = array(
        'status' => 0,
        'response' => '0 products'
    );
    echo json_encode($response);
}

mysqli_close($conn);

?>