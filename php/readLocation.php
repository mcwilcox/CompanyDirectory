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

	$sortBy1 != "na" ? $orderBy = $orderBy . $sortBy1 : $orderBy = " ORDER BY name";
	$sortBy2 != "na" ? $orderBy = $orderBy . ", " . $sortBy2 : "";

	if($filterID != "na") {
		$where = "WHERE id = " . $filterID;
	}

	$query = "SELECT id, name, abbreviation AS locationAbbreviation FROM location " .	$where . $orderBy;

	$stmt = $conn->prepare($query);
	if($where != "") {$stmt->bind_param("ss", $filterDataType, $filterDataID);}
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