<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

include "./db.php";

$db_form = $_REQUEST["DB"];
$parent_folder = $_REQUEST["PARENT_FOLDER"];

$myDB = new DB("sites_construction");
$result = $myDB->select("SELECT * FROM $db_form WHERE PARENT_FOLDER='$parent_folder'");

echo json_encode($result);
