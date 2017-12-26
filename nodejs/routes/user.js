var mysql = require('mysql');


var response;
var SQL;

function insertSQL() {
	SQL = 'insert into ' + _TABLE + ' set ';
}
function selectSQL() {
	// body...
}
function deleteSQL() {
	// body...
}
function updateSQL() {
	// body...
}

function main(req, res) {
	var _DATABASE = 'test';
	var _TABLE = 'sites_construction';

	

	//创建连接  
	var client = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: '19950224',
	    database: _DATABASE,
	    port: 3306
	});



	switch('type') {
		case 'insert':
			insertSQL();
			break;
		case 'select':
			selectSQL();
			break;
		case 'delete':
			deleteSQL();
			break;
		case 'update':
			updateSQL()
			break;
	}

	var insertSQL = 'insert into t_user(name) values("conan"),("fens.me")';
	var selectSQL = 'select * from t_user limit 10';
	var deleteSQL = 'delete from t_user';
	var updateSQL = 'update t_user set name="conan update"  where name="conan"';

	client.connect();
	client.query(
	    'SELECT content,content_origin FROM ' + _TABLE,
	    function selectCb(err, results, fields) {
	        if (err) {
	            throw err;
	        }

	        if (results) {
	            response = results;
	        }
	        client.end();
	    }
	);
}

main();

/* GET users listing. */
exports.list = function(req, res){
	res.send(req.body);
};
