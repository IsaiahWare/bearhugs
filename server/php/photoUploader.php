<?php    
    // Get the filename and make sure it is valid
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: bearhugs.love");
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
