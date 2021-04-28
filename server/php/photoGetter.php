<?php
		// Print all of the user's files
		$json = file_get_contents('php://input');
		$data = json_decode($json);
		$userId = $data->{'userId'};
		$path = "./photos/user$userId";
		$filing = array_diff(scandir($path), array('..','.'));
		$pp = array();
		foreach($filing as $i => $filename) {
			array_push($pp, $filename);
		}	
        echo json_encode($pp);
	?>
