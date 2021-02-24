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
	
	$filterID = $_POST['$filterID'];
	$filterType = $_POST['$filterPHP'];
	$where = "";
	$sortBy1 = $_POST['$sortByPHP1'];
	$sortBy2 = $_POST['$sortByPHP2'];
	$orderBy = " ORDER BY ";

	$sortBy1 != "na" ? $orderBy = $orderBy . $sortBy1 : $orderBy = " ORDER BY p.lastName, p.firstName, d.name, l.name";
	$sortBy2 != "na" ? $orderBy = $orderBy . ", " . $sortBy2 : "";

	if($filterID != "na" && $filterType != "na") {
		if		($filterType == "Personnel" || $filterType == "na") {$filterType = "p";}
		else if ($filterType == "Department") 						{$filterType = "d";}
		else if ($filterType == "Location") 						{$filterType = "l";}
		$where = "WHERE " . $filterType . ".id = " . $filterID;
	}

	$query1 = "SELECT p.id, p.lastName, p.firstName, p.jobTitle, p.email, d.id AS departmentID, d.name AS department, l.id AS locationID, l.name AS location FROM personnel";
	$query2 = "p LEFT JOIN department d ON (d.id = p.departmentID) LEFT JOIN location l ON (l.id = d.locationID)" . $where . $orderBy;
	$query  = $query1 . " " . $query2;	

	$stmt = $conn->prepare($query);
	$stmt->execute();
	$result = $stmt->store_result();
	
	if (!$result) {
		$output["status"]["code"] = "400";
		$output["status"]["name"] = "executed";
		$output["status"]["description"] = "query failed";	
		$output["data"] = [];
		mysqli_close($conn);
		echo json_encode($output); 
		exit;
	}

	$data = [];

	while ($row = fetchAssocStatement($stmt)) {
		array_push($data, $row);
	}

	$output["status"]["code"] = "200";
	$output["status"]["name"] = "ok";
	$output["status"]["description"] = "success";
	$output["status"]["returnedIn"] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output["data"] = $data;
	mysqli_close($conn);
	echo json_encode($output); 
?>