<?php
session_start();

if (!isset($_SESSION["username"])) {
	header("Location: login/");
	print("test");
}

if (isset($_GET['destroy'])) {
	session_destroy();
	header("Refresh: 0");
}

function generateUID() {
	return (uniqid());
}

?>
<!DOCTYPE html>
<html>

<head>
	<title>Bigoula: AutoDL</title>
	<script type="text/javascript" src="button.js"></script>
	<link rel="stylesheet" type="text/css" href="main.css">
</head>

<body>
	<script>
		function unn() {
			return "<?php echo generateUID(); ?>";
		}
	</script>
	<div class="_header">
		<br>
		<h1>Auto Downloader</h1>
		<div class="_formSearch">
			<form>
				<Label>TV Show</Label>
				<input type="checkbox" name="_tvshow" value="Tv Show">
				<Label>Auto Mode</Label>
				<input type="checkbox" name="_automode" value="Auto Mode">
				<br>
				<input type="text" placeholder="Search..." name="_search" />
				<button onclick="sendRequest(event)">Search</button>
			</form>
			<button id="confirmClick" onclick="downloadAll(unn())">Confirm Download</button>
		</div>
	</div>
	<div class="loading-logo">
		<div class="loading-circle"></div>
		<br>
		<h1>Loading...</h1>
	</div>
</body>

</html>
