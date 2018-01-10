var DB_PG = require('../lib/db-pg');
var fs = require('fs');

/* POST listing */
var getAll = (req, res) => {
    new DB_PG('cms', req.body.db).connect().select({ parent_folder: req.body.parent_folder } , res);
};

/* POST listing */
var createFolder = (req, res) => {
	var table = req.body.type === "folder" ? "files_system" : "sites_construction";
	var db = new DB_PG('cms', table);
	var action = req.body.action;
	delete req.body.action;
	var add = (err, result) => {
		var get = db.connect().get("SELECT ID FROM " + table + " WHERE create_time='" + req.body.create_time + "'")
		get.then((result) => res.send(result.rows[0]))
	}
	switch(action) {
		case 'add':
			res.func = add;
			db.connect().insert(req.body, res);
			break;
		case 'delete':
			db.connect().delete({ name: req.body.name, create_time: req.body.create_time}, res)
			break;
	}
}

/* POST listing */
var edit = (req, res) => {
    var name = req.body.name;
    var table = 'sites_construction';
    var db = new DB_PG('cms', table);
    var SQL = "SELECT content,content_origin FROM " + table + " WHERE name='" + name + "'";
    var findContent = (name) => db.connect().get(SQL);
	var error = (msg) => res.send({ result: false, err: msg });
    var handle = (result) => {
    	res.func = (err, rows) => {
    		// 清除res的func方法，否则会陷入回调黑洞
    		delete res.func;
    		err ? error('页面保存出错！') : db.connect().select({ name: name }, res);
    	}
    	if (result.rowCount) {
    	    result.rows[0].content === req.body.content ? error("您未做任何修改！") : db.connect().update(req.body, { name: name }, res);
    	} else {
    	    addResult = db.connect().insert(req.body, res);
    	}
    }
    name ? findContent(name).then(handle) : error("您未输入页面名！");
};

var del = (req, res) => {
	var name = req.body.name;
	var parent_folder = req.body.parent_folder;
	var table = req.body.db || 'sites_construction';
	var error = (msg) => res.send({ result: false, err: msg });
	res.func = (err, rows) => err ? error('无法删除！') : res.send({ result: true, err: null });
	new DB_PG('cms', table).connect().delete({name: name, parent_folder: parent_folder}, res);
}

var save = (req, res) => {
	var head = `<!DOCTYPE html>
	<html lang="en">
	<!------分------割------线------>
	<head>
	    <meta charset="UTF-8">
	    <meta name="Author" content="Bruce Zhu">
	    <meta name="contact" content="bruce_zxy@163.com">
	    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta name="renderer" content="webkit">
	    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
	    <title>yg-site-construction</title>
	    <link rel="stylesheet" href="./css/bootstrap-combined.min.css">
	    <!-- <link rel="stylesheet" href="./css/layoutit.css"> -->
	    <!-- <link rel="stylesheet" href="./css/index.css"> -->
	    <script type="text/javascript" src="./js/jquery.min.js"></script>
	    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	    <!--[if lt IE 9]>
	        <script type="text/javascript" src="./js/html5shiv.js"></script>
	        <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	    <![endif]-->
	    <script type="text/javascript" src="./js/bootstrap.min.js"></script>
	    <script type="text/javascript" src="./js/jquery-ui.js">{</script>
	    <script type="text/javascript" src="./js/jquery.base64.js"></script>
	    <!-- <script type="text/javascript" src="./js/jquery.htmlClean.js"></script> -->
	    <!-- <script type="text/javascript" src="ckeditor/ckeditor.js"></script> -->
	    <!-- <script type="text/javascript" src="ckeditor/config.js"></script> -->
	    <!-- <script type="text/javascript" src="./js/index.js"></script> -->
	    <style>
	        .container-fluid,.container { max-width: 1200px; margin: 0 auto; }
	    </style>
	</head>
	<!------分------割------线------>
	<body>
	`;
	var foot = `
	</body>
	<!------分------割------线------>
	</html>`;
	var table = 'sites_construction';
	var SQL = "SELECT content,content_origin FROM " + table + " WHERE name='" + req.body.name + "'";
	var error = (msg) => res.send({ result: false, err: msg });
	var writeFile = (result) => fs.writeFile("../public/" + req.body.name + ".html", head + new Buffer(result.rows[0].content, 'base64').toString() + foot, (err) => err ? error(err) : res.send({ result: true, err: null }))	
	new DB_PG('cms', table).connect().get(SQL).then(writeFile);
}

exports.getAll = getAll;
exports.createFolder = createFolder;
exports.edit = edit;
exports.del = del;
exports.save = save;


