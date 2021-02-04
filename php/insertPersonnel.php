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
	$email = $_POST['$jobTitle'];
	$jobTitle = $_POST['$email'];
	$departmentID = $_POST['$departmentID'];
	$department;
	$locationID = $_POST['$locationID'];
	$location;

	$stmt = $conn->prepare("SELECT * FROM department WHERE id = ? AND locationID = ?");
	$stmt->bind_param("ss", $departmentID, $locationID);
	$stmt->execute();
	$getDepartment = $stmt->store_result();

	$foundDepartment = [];
	while ($row = fetchAssocStatement($stmt)) {
		array_push($foundDepartment, $row);
	}

	if(count($foundDepartment) == 0) {
		$stmt = $conn->prepare("SELECT name, abbreviation FROM department WHERE id = ?");
		$stmt->bind_param("s", $departmentID);
		$stmt->execute();
		$getDepartment = $stmt->store_result();

		$foundDepartmentName = [];
		while ($row = fetchAssocStatement($stmt)) {
			array_push($foundDepartment, $row);
		}
	
		$department = $foundDepartment[0]['name'];
		$abbreviation = $foundDepartment[0]['abbreviation'];

		$stmt = $conn->prepare("INSERT INTO department (name, abbreviation, locationID) VALUES (?, ?, ?)");
		$stmt->bind_param("sss", $department, $abbreviation, $locationID);
		$stmt->execute();

		$stmt = $conn->prepare("SELECT id FROM department WHERE name = ? AND locationID = ?");
		$stmt->bind_param("ss", $department, $locationID);
		$stmt->execute();
		$getDepartmentID = $stmt->store_result();

		$foundDepartmentID = [];
	
		while ($row = fetchAssocStatement($stmt)) {
			array_push($foundDepartmentID, $row);
		}

		$departmentID = $foundDepartmentID[0]['id'];
	}

	$stmt = $conn->prepare("SELECT firstName, lastName, email, jobTitle, departmentID FROM personnel WHERE firstName = ? AND lastName = ? AND email = ? AND jobTitle = ? AND departmentID = ?");
	$stmt->bind_param("sssss", $firstName, $lastName, $email, $jobTitle, $departmentID);
	$stmt->execute();
	$checkExistingEntry = $stmt->store_result();

	if (!$checkExistingEntry) {
		$output["status"]["code"] = "400";
		$output["status"]["name"] = "executed";
		$output["status"]["description"] = "query failed";	
		$output["data"] = ["2"];
		mysqli_close($conn);
		echo json_encode($output); 
		exit;
	}
	
	$existingEntry = [];

	while ($row = fetchAssocStatement($stmt)) {
		array_push($existingEntry, $row);
	}

	if(count($existingEntry) == 0) {
		$stmt = $conn->prepare("INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss", $firstName, $lastName, $jobTitle, $email, $departmentID);
		$stmt->execute();
	}

	$output["status"]["code"] = "200";
	$output["status"]["name"] = "ok";
	$output["status"]["description"] = "success";
	$output["status"]["returnedIn"] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output["data"] = [];
	mysqli_close($conn);
	echo json_encode($output); 
?>