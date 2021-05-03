<?php    
    // Get the filename and make sure it is valid
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:3001");
    header("Access-Control-Allow-Origin: ec2-100-24-237-42.compute-1.amazonaws.com");
    $filename = (string) basename($_FILES['filename']['name']);
    $userId = $_POST['userId'];
    $path = "./photos/user$userId";
    if (!file_exists($path)) {
        mkdir($path);
    }
    $full_path = sprintf($path . "/%s", $filename);
    if( move_uploaded_file($_FILES['filename']['tmp_name'], $full_path) ){
        echo json_encode(array("results" => "true", "error" => array()));
    }else{
        echo json_encode(array("results" => array(), "error" => array("message" => "photo upload failure")));
    }
    exit;
?>
