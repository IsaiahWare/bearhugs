<?php
		// Print all of the user's files
		$userId = $$_POST['userId'];
		$path = "/server/php/photos/user$userId";
		$filing = array_diff(scandir($path), array('..','.'));
		
		// Iterates through the list of all the user's files
        $photoPaths = array();
		foreach ($filing as $i => $filename) { 
            array_push($photoPaths, $path . "/$filename");
		}
        return json_encode(array("photos" => $photoPaths));
	?>