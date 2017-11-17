<?php
header("Access-Control-Allow-Origin: *");

include "./db.php";

@$name = $_REQUEST['name'];
@$content = $_REQUEST['content'];

$mydb = new DB("sites_construction");

function findContent($mydb, $name)
{
    return $mydb->find("SELECT content FROM sites_construction WHERE name='$name'");
}
function error($result, $msg)
{
    $result['content'] = null;
    $result['error'] = $msg;
    return $result;
}

$result = findContent($mydb, $name);

if ($result) {
    if ($result['content'] === $content) {
        $result = error($result, "您未做任何修改！");
    } else {
        $updateResult = $mydb->update($_REQUEST, "name='$name'");
        $result = $updateResult ? findContent($mydb, $name) : error($result, '页面更新出错！');
    }
} else {
    $addResult = $mydb->add($_REQUEST);
    $result = $addResult ? findContent($mydb, $name) : error($result, '页面保存出错！');
}

echo json_encode($result);
