<?php
header("Access-Control-Allow-Origin: *");

include "./db.php";

$db_form = $_REQUEST["type"] === "folder" ? "files_system" : "sites_construction";
$myDB = new DB($db_form);
switch ($_REQUEST["action"]) {
    case 'add':
        echo "test1";
        addData();
        break;
    case 'update':
        echo "test2";
        updateData();
        break;
    case 'delete':
        echo "test3";
        deleteData();
        break;
    default:
        echo "test4";
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
error();
// $result = $myDB->add("SELECT * FROM $db_form");

echo json_encode($response["error"]);
