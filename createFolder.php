<?php
header("Access-Control-Allow-Origin: *");

include "./db.php";

$param = $_REQUEST;
$db_form = $_REQUEST["TYPE"] === "folder" ? "files_system" : "sites_construction";
$myDB = new DB($db_form);
$response = array();

unset($param["ACTION"]);

function addData($myDB)
{
    global $response, $result, $param;
    $result = $myDB->add($param);
    if ($result) {
        $response["content"] = "success";
    } else {
        $response["error"] = "未添加进数据库！";
    }
}
function updateData($myDB)
{
    # code...
}
function deleteData($myDB)
{
    # code...
}
function error($myDB)
{
    global $response;
    $response["error"] = "请求动作未定义！";
}

switch ($_REQUEST["ACTION"]) {
    case 'add':
        addData($myDB);
        break;
    case 'update':
        updateData($myDB);
        break;
    case 'delete':
        deleteData($myDB);
        break;
    default:
        error($myDB);
        break;
}

echo json_encode($response);
