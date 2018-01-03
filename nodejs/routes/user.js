var mysql = require("mysql");
var pg = require("pg");



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
// function connDB(db, table, type, datas, others, res, ress) {
// 	var _DATABASE = db;
// 	var _TABLE = table;
// 	var others = others || {};
// 	var SQL;
// 	var res = res;

// 	function selectSQL(table, datas) {
// 		var find = datas.find || "*";
// 		var where = "";
// 		return "SELECT " + find + " FROM " + table + where;
// 	}

// 	//创建连接
// 	var client = mysql.createConnection({
// 	    host: others.host || "localhost",
// 	    user: others.user || "root",
// 	    password: others.password || "19950224",
// 	    database: _DATABASE,
// 	    port: others.port || 3306
// 	});

// 	switch(type) {
// 		case "insert":
// 			SQL = "insert into " + _TABLE + " set ";
// 			break;
// 		case "select":
// 			SQL = selectSQL(_TABLE, datas);
// 			break;
// 		case "delete":
// 			SQL = "insert into " + _TABLE + " set ";
// 			break;
// 		case "update":
// 			SQL = "insert into " + _TABLE + " set ";
// 			break;
// 		default:
// 			SQL = others.sql;
// 	};

// 	client.connect();
// 	client.query(
// 	    SQL,
// 	    function selectCb(err, results, fields) {
// 	        if (err) {
// 	            throw err;
// 	        }
// 	        if (results) {
// 	        	console.log(typeof res === 'function');
// 	            res.send(results);
// 	        }
// 	        client.end();
// 	    }
// 	);
// }

function DB(db, table, others) {

	this._DATABASE = db;
	this._TABLE = table;
	this._OTHERS = others || {};

	this.connect = function () {
		return mysql.createConnection({
		    host: this._OTHERS.host || "localhost",
		    user: this._OTHERS.user || "root",
		    password: this._OTHERS.password || "19950224",
		    database: this._DATABASE,
		    port: this._OTHERS.port || 3306
		});
	};
	this.query = function (SQL, res) {
		var client = this.connect();
		client.connect();
		client.query(
		    SQL,
		    function selectCb(err, results, fields) {
		        if (err) {
		            throw err;
		        }
		        if (results) {
		        	typeof res === 'function' ? res(results) : res.send(results);
		        }
		        client.end();
		    }
		);
	};
	this.getVal = function(datas) {
		var temp = "";
		for (i in datas) {
			temp += i + "='" + datas[i] + "',";
		}
		return temp.slice(0, -1);
	}

	this.insert = function (datas, res) {
		this.query("INSERT INTO " + this._TABLE + " SET " + this.getVal(datas), res);
	};
	this.select = function (find, where, res) {
		var SQL = "";
		var arg = arguments;
		switch(arg.length) {
			case 1:
				SQL += "SELECT * FROM " + this._DATABASE;
				break;
			case 2:
				if (typeof arg[0] === 'string') {
					SQL += "SELECT " + arg[0] + " FROM " + this._DATABASE;
				} else {
					SQL += "SELECT * FROM " + this._DATABASE + " WHERE " + this.getVal(arg[0]);
				}
				break;
			case 3:
				SQL += "SELECT " + arg[0] + " FROM " + this._DATABASE + " WHERE " + this.getVal(arg[1]);
				break;
			default:
				SQL += "SELECT * FROM " + this._DATABASE;
				break;
		}
		this.query(SQL, res);
	};
	this.delete = function (datas, res) {
		var find = datas.find || "*";
		var where = " WHERE " + datas.where || "";
		this.query(SQL, res);
	};
	this.update = function (datas, res) {
		var find = datas.find || "*";
		var where = " WHERE " + datas.where || "";
		this.query(SQL, res);
	};
};



/* GET users listing. */
exports.list = function(req, res){
	var db1 = new DB("test", "files_system");
	db1.insert({name: 'name1', age: 'age2'}, res);
	// // 数据库配置
 //    var config = {
 //        user: "postgres",
 //        database: "test",
 //        password: "19950224",
 //        port: 5432,

 //        // 扩展属性
 //        max: 1, // 连接池最大连接数
 //        idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
 //    }

 //    // 创建连接池
 //    var pool = new pg.Pool(config);

 //    pool.connect(function(err, client, done) {
 //        if (err) {
 //            return console.error('数据库连接出错', err);
 //        }
 //        // 简单输出
 //        const query = {
 //            // give the query a unique name
 //            name: 'fetch-user',
 //            text: 'SELECT * FROM user WHERE id = $1',
 //            values: [1]
 //        }
 //        client.query('SELECT * FROM dbt_maindata', function(err, result) {
 //            done(); // 释放连接（将其返回给连接池）
 //            if (err) {
 //                return console.error('查询出错', err);
 //            }
 //            console.log(result.rows); //output: Hello World
 //            res.send(result.rows);
 //        });
 //    });
};
