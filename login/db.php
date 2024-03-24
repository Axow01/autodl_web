
<?php

$username = "edrya";
$host = "localhost";
$password = "Loplop0998!";
$dbName = "edrya_autodl";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$c = new mysqli($host, $username, $password, $dbName);
if ($c->connect_error) {
  die("Connection failed: " . $c->connect_error);
}

?>
