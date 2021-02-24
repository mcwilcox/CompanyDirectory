<?php
	$executionStartTime = microtime(true);
	include("config.php");
	include("zfunctions.php");
	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);
		echo json_encode($output);
		exit;
	}	

	$id = $_POST['$locationID'];
	$name = $_POST['$locationName'];

	$stmt = $conn->prepare("SELECT * FROM location WHERE name = ?");
	$stmt->bind_param("s", $name);
	$stmt->execute();
	$checkExistingEntry = $stmt->store_result();

	if (!$checkExistingEntry) {
		$output["status"]["code"] = "400";
		$output["status"]["name"] = "executed";
		$output["status"]["description"] = "query failed";	
		$output["data"] = [];
		mysqli_close($conn);
		echo json_encode($output); 
		exit;
	}
	
	$existingEntry = [];

	while ($row = fetchAssocStatement($stmt)) {
		array_push($existingEntry, $row);
	}

	if(count($existingEntry) == 0) {
		$stmt = $conn->prepare("UPDATE location SET name = ? WHERE id = ?");
		$stmt->bind_param("ss", $name, $id);
		$stmt->execute();
	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($conn);
	echo json_encode($output); 
?>