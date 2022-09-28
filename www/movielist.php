<?php
    header("Access-Control-Allow-Origin: *");

    $arr = null;

    $conn = new mysqli("localhost", "hybrid_160420016", "ubaya", "hybrid_160420016");

    if ($conn->connect_error) {
        $arr = ["result" => "error", "message" => "unable to connect to server"];
    }

    if (isset($_POST['cari'])) {
        $cari = $_POST['cari'];
        $sql = "SELECT * FROM movie WHERE title like '%$cari%'";
    } else {
        $sql = "SELECT * FROM movie";
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt -> get_result();

    $data = [];
    if ($result->num_rows > 0) {
        while ($row = $result -> fetch_assoc()) {
            array_push($data, $row);
        }

        $arr = ["result" => "success", "data" => $data];
    } else {
        $arr = ["result" => "error", "message" => "sql error: $sql"];    
    }

    echo json_encode($arr);
    $stmt -> close();
    $conn -> close();
?>
