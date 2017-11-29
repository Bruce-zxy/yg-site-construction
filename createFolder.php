<?php
header("Access-Control-Allow-Origin: *");

include "./db.php";

$db_form = $_REQUEST["type"] === "folder" ? "files_system" : "sites_construction";
$myDB = new DB($db_form);
$response = array();
switch ($_REQUEST["action"]) {
    case 'add':
        addData();
        break;
    case 'update':
        updateData();
        break;
    case 'delete':
        deleteData();
        break;
    default:
        error();
        break;
}
function addData()
{
    # code...
}
function updateData()
{
    # code...
}
function deleteData()
{
    # code...
}
function error()
{
    $response["error"] = "请求动作未定义";
}
// $result = $myDB->add("SELECT * FROM $db_form");

echo json_encode($response);
