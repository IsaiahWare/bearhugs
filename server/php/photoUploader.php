<?php    
    echo "photoUploader works"
    exit;
    // Get the filename and make sure it is valid
    $filename = (string) basename($_FILES['filename']['name']);
    
    $userId = str_val($_POST['userId']);
    $path = "./photos/";
    $userPath = "user" . $userId ."/";
    $full = $path . $userPath;

    if (!file_exists($full)) {
        mkdir($full, 0777);
    }
    
    $full_path = sprintf($full . "%s", $filename);
    
    if( move_uploaded_file($_FILES['filename']['tmp_name'], $full_path) ){
        // header("Location: login.php");
        echo "**Photo Upload Successful**";
        exit;
    }else{
        // header("Location: login.php");
        echo "**Photo Upload Successful**";
        exit;
    }

?>
