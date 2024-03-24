<?php
session_start();
// require("../db.php");
require('db.php');
// include("db.php");

$error = "";

if (isset($_SESSION['username'])) {
	header("Location: ../");
}

if (isset($_POST['submitLogin'])) {
	$username = $_POST['username'];
	$password = sha1($username . ";" . $_POST['password']);

	$results = $c->query("SELECT * FROM users WHERE username='$username'");
	$row = $results->fetch_assoc();
	if ($results->num_rows > 0 && $row['password'] == $password) {
		$_SESSION['username'] = $row['username'];
		$_SESSION['userId'] = $row['id'];
		$_SESSION['userEmail'] = $row['email'];
		$_SESSION['userLicense'] = $row['license'];
		$res = $c->prepare('SELECT * FROM licenses WHERE key_str=?');
		$res->bind_param('s', $_SESSION['userLicense']);
		$res->execute();
		$res = $res->get_result()->fetch_assoc();
		if ($res == NULL || $res['key_str'] != $_SESSION['userLicense']) {
			session_destroy();
			$error = "Error: you account is not autorized yet, please contact an admin.";
		}
		header("Refresh: 0");
	} else {
		echo "Error: Credencial are wrong, or your account may be not autorized yet!";
	}
}

if (isset($_POST['submitSignup'])) {
	$username = $_POST['username'];
	$password = sha1($username . ";" . $_POST['password']);
	$email = $_POST['email'];
	$license = $_POST['license'];

	$sql = "INSERT INTO users (username, password, email, license) VALUES ('$username','$password','$email','$license')";
	$c->query($sql);
	header("Refresh: 0");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<div class="loginForm">
		<h1>Login</h1>
		<p><?php echo $error; ?></p>
		<form method="post">
			<input type="text" name="username" placeholder="Username">
			<input type="password" name="password" placeholder="Password">
			<input type="submit" name="submitLogin" value="Login">
		</form>
	</div>
	<div class="signupForm">
		<h1>signup</h1>
		<form method="post">
			<input type="text" name="username" placeholder="Username">
			<input type="text" name="email" placeholder="Email">
			<input type="password" name="password" placeholder="Password">
			<input type="text" name="license" placeholder="License (optional)">
			<input type="submit" name="submitSignup" value="Sign Up">
		</form>
	</div>
</body>
</html>
