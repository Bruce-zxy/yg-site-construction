<?php
header("Access-Control-Allow-Origin: *");

include "./db.php";

$myDB = new DB("sites_construction");
$result = $myDB->select("SELECT * FROM sites_construction");

echo json_encode($result);
