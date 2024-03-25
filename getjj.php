<?php
session_start();
require('login/db.php');

$jsonData = file_get_contents("php://input");

$data = json_decode($jsonData, true);

$_SESSION['selectedElement'] = $data;

if (isset($_SESSION['selectedElement'])) {
	$data = $_SESSION['selectedElement'];
	$uniqueId = $data[0]['uniqueID'];
	$sql = "INSERT INTO download_requests (user_id, unique_id) VALUES (" . $_SESSION['userId'] . ", '$uniqueId')";
	$c->query($sql);
	$requestId = $c->query("SELECT id FROM download_requests WHERE unique_id='$uniqueId'");
	$requestId = $requestId->fetch_assoc()['id'];
	for ($i = 0, $size = count($data); $i < $size; $i++) {
		$name = $data[$i]['name'];
		$magnet = $data[$i]['magnet'];
		$type = $data[$i]['type'];
		$stmt = $c->prepare("INSERT INTO download_elements (request_id, name, magnet, type, unique_id) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param('issis', $requestId, $name, $magnet, $type, sha1($uniqueId . $name));
		$stmt->execute();
	}
	unset($_SESSION['selectedElement']);
}

?>
