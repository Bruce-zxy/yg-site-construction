<?php
header("Access-Control-Allow-Origin: *");

include "./db.php";

@$name = $_REQUEST['name'];
@$content = $_REQUEST['content'];
$_REQUEST['key_name'] = md5($_REQUEST['name']);

$mydb = new DB("sites_construction");

function findContent($mydb, $name)
{
    return $mydb->find("SELECT content,content_origin FROM sites_construction WHERE name='$name'");
}
// function error($result, $msg)
// {
//     $result['content'] = null;
//     $result['error'] = $msg;
//     return $result;
// }

// if (empty($_REQUEST['name'])) {
//     $result = error($result, "您未输入页面名！");
// } else {
$result = findContent($mydb, $name);
//     if (!empty($result['content'])) {
//         if ($result['content'] === $content) {
//             $result = error($result, "您未做任何修改！");
//         } else {
//             $updateResult = $mydb->update($_REQUEST, "name='$name'");
//             $result = $updateResult ? findContent($mydb, $name) : error($result, '页面更新出错！');
//         }
//     } else {
//         $addResult = $mydb->add($_REQUEST);
//         $result = $addResult ? findContent($mydb, $name) : error($result, '页面保存出错！');
//     }
// }

// $head = '<!DOCTYPE html>
// <html lang="en">
// <!------分------割------线------>
// <head>

//     <meta charset="UTF-8">
//     <meta name="Author" content="Bruce Zhu">
//     <meta name="contact" content="bruce_zxy@163.com">
//     <meta http-equiv="content-type" content="text/html; charset=UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="renderer" content="webkit">
//     <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
//     <title>yg-site-construction</title>
//     <link rel="stylesheet" href="./css/bootstrap-combined.min.css">
//     <!-- <link rel="stylesheet" href="./css/layoutit.css"> -->
//     <!-- <link rel="stylesheet" href="./css/index.css"> -->
//     <script type="text/javascript" src="./js/jquery.min.js"></script>
//     <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
//     <!--[if lt IE 9]>
//         <script type="text/javascript" src="./js/html5shiv.js"></script>
//         <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
//     <![endif]-->
//     <script type="text/javascript" src="./js/bootstrap.min.js"></script>
//     <script type="text/javascript" src="./js/jquery-ui.js">{</script>
//     <script type="text/javascript" src="./js/jquery.base64.js"></script>
//     <!-- <script type="text/javascript" src="./js/jquery.htmlClean.js"></script> -->
//     <!-- <script type="text/javascript" src="ckeditor/ckeditor.js"></script> -->
//     <!-- <script type="text/javascript" src="ckeditor/config.js"></script> -->
//     <!-- <script type="text/javascript" src="./js/index.js"></script> -->
//     <style>
//         .container-fluid,.container { max-width: 1200px; margin: 0 auto; }
//     </style>
// </head>
// <!------分------割------线------>

// <body>

// ';
// $foot = '

// </body>
// <!------分------割------线------>
// </html>';

// $myfile = fopen($name . ".html", "w+") or die("Unable to open file!");
// $txt = "Bill Gates\n";
// fwrite($myfile, $head);
// fwrite($myfile, base64_decode($result['content']));
// fwrite($myfile, $foot);
// file_get_contents($name . ".html");
// fclose($myfile);

echo json_encode($result);
