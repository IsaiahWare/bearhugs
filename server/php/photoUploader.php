<?php    
    // Get the filename and make sure it is valid
    $filename = (string) basename($_FILES['filename']['name']);
    
    $userId = 30;
    $path = "./photos/user$userId";
    if (!file_exists($path)) {
        mkdir($path);
    }
    $full_path = sprintf($path . "/%s", $filename);
    if( move_uploaded_file($_FILES['filename']['tmp_name'], $full_path) ){
        echo "TRUE";
    }else{
        echo "FALSE";
    }
    exit;

?>
