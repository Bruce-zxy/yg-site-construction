var mysql = require("mysql");



/**
 * [connDB description]
 * @Author   bruce_zxy
 * @DateTime 2018-01-02T11:04:26+0800
 * @param    {String}                 db     数据库名
 * @param    {String}                 table  数据表名
 * @param    {String}                 type   操作类型
 * @param    {Object}                 datas  （可选）包含find,where,data等
 * @param    {Object}                 others （可选）包含host,user,password,port,sql等
 * @return   {Object}                        返回获取的数据结果
 */
function connDB(db, table, type, datas, others, res) {
	var _DATABASE = db;
	var _TABLE = table;
	var others = others || {};
	var SQL;
	var res = res;

	function selectSQL(table, datas) {
		var find = datas.find || "*";
		var where = " WHERE " + datas.where || "";
		return "SELECT " + find + " FROM " + table + where;
	}

	//创建连接
	var client = mysql.createConnection({
	    host: others.host || "localhost",
	    user: others.user || "root",
	    password: others.password || "19950224",
	    database: _DATABASE,
	    port: others.port || 3306
	});

	switch(type) {
		case "insert":
			SQL = "insert into " + _TABLE + " set ";
			break;
		case "select":
			SQL = selectSQL(_TABLE, datas);
			break;
		case "delete":
			SQL = "insert into " + _TABLE + " set ";
			break;
		case "update":
			SQL = "insert into " + _TABLE + " set ";
			break;
		default:
			SQL = others.sql;
	};

	client.connect();
	client.query(
	    SQL,
	    function selectCb(err, results, fields) {
	        if (err) {
	            throw err;
	        }
	        if (results) {
	            res.send(results);
	        }
	        client.end();
	    }
	);
}

function connDB() {
	this.selectSQL = function (table, datas) {
		var find = datas.find || "*";
		var where = " WHERE " + datas.where || "";
		return "SELECT " + find + " FROM " + table + where;
	}
}

/* GET users listing. */
exports.list = function(req, res){
	connDB("test", "files_system", "select", {
	}, {}, res);
};
