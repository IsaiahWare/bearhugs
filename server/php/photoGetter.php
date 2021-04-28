<?php
		// Print all of the user's files
		header('Content-Type: application/json');
		$json = file_get_contents('php://input');
		$data = json_decode($json);
		$userId = $data->{'userId'};
		$path = "./photos/user$userId";
		$filing = array_diff(scandir($path), array('..','.'));
		$photos = array();
		foreach( $filing as $i => $filename ) {
			array_push($photos, "../../../php/photos/user$userId/$filename");
		}
		echo json_encode($photos);
	?>
