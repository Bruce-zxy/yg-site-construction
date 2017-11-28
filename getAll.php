<?php
header("Access-Control-Allow-Origin: *");

include "./db.php";

$db_form = $_REQUEST["db"];

$myDB = new DB("sites_construction");
$result = $myDB->select("SELECT * FROM $db_form");

echo json_encode($result);
