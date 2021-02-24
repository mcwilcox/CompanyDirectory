<?php
	$executionStartTime = microtime(true);
	include("config.php");
	include("zfunctions.php");
	header("Content-Type: application/json; charset=UTF-8");

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		$output["status"]["code"] = "300";
		$output["status"]["name"] = "failure";
		$output["status"]["description"] = "database unavailable";
		$output["status"]["returnedIn"] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output["data"] = [];

		mysqli_close($conn);
		echo json_encode($output);
		exit;
	}

	$firstName = $_POST['$firstName'];
	$lastName = $_POST['$lastName'];
	$email = $_POST['$email'];
	$jobTitle = $_POST['$jobTitle'];
	$departmentID = $_POST['$departmentID'];

	//Check for existing employee entry
	$stmt = $conn->prepare("SELECT firstName, lastName, email, jobTitle, departmentID FROM personnel WHERE firstName = ? AND lastName = ? AND email = ? AND jobTitle = ? AND departmentID = ?");
	$stmt->bind_param("sssss", $firstName, $lastName, $email, $jobTitle, $departmentID);
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

	//Create employee entry if none exists
	if(count($existingEntry) == 0) {
		$stmt = $conn->prepare("INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss", $firstName, $lastName, $jobTitle, $email, $departmentID);
		$stmt->execute();
	}

	$output["status"]["code"] = "200";
	$output["status"]["name"] = "ok";
	$output["status"]["description"] = "success";
	$output["status"]["returnedIn"] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output["data"] = ["TEST", $firstName, $lastName, $email, $jobTitle, $departmentID];
	mysqli_close($conn);
	echo json_encode($output); 
?>