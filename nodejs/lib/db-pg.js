var pg = require('pg');

/**
 * PostgreSQL数据库连接类
 * @Author   bruce_zxy
 * @DateTime 2018-01-06T19:41:36+0800
 * @version  v.1.0
 * @param    {String}                 db     [（可选）数据库名称]
 * @param    {String}                 table  [（可选）需要操作的数据表名称]
 * @param    {Object}                 others [（可选）域名host,用户名user,密码password,端口port]
 * @example
 *  ① declare：  var db = new DB_PG('test', 'dbt_maindata');
 *  ② select：   db.connect().select('path', { id: 1000001 }, res);
 *  ③ update：   db.connect().update({ cpath: "业务线.零售.景区.个体户" }, { id: 1000003 }, res);
 *  ④ delete：   db.connect().delete({ id: 1000001 }, res);
 *  ⑤ insert：   db.connect().insert({ "category": "MD-BL", "id":1000002, "path": "BizLine.Retail.Resort", cpath: "业务线.零售.景区.个体户" }, res);
 *  ⑥ get：      db.connect().get("SELECT * FROM func()").then(function(result) { // some code });
 */
function DB_PG(db, table, others) {
	this._DATABASE = db;
	this._TABLE = table;
	this._OTHERS = others || {};
    this._POOL;
	this._CONFIG = {
		host: this._OTHERS.host || "localhost",
	    user: this._OTHERS.user || "postgres",
	    database: this._DATABASE || "test2",
	    password: this._OTHERS.password || "19950224",
	    port: this._OTHERS.port || 5432,
	    // 扩展属性
	    max: 20, // 连接池最大连接数
	    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
	}
    this.connect = function() {
        this._POOL = new pg.Pool(this._CONFIG);
        return this;
    }
    this.query = function(SQL, res) {
        this._POOL.query(SQL, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.func ? res.func(err, result.rows) : res.send(result.rows);
            }
        });
    }
    this.get = function(SQL) {
        return this._POOL.query(SQL);
    }
    this.getVal = function(datas) {
        var temp = "";
        for (i in datas) temp += i + "='" + datas[i] + "',";
        return temp.slice(0, -1);
    }
    this.getInsertVal = function(datas, type) {
        var temp = " (";
        switch(type) {
            case 'key':
                for (i in datas) temp += i + ", ";
                break;
            case 'val':
                for (i in datas) temp += "'" + datas[i] + "', ";
                break;
        }
        return temp.slice(0, -2) + ")";
    }
    this.getWhereVal = function(datas) {
        var temp = "";
        for (i in datas) temp += i + "='" + datas[i] + "' AND ";
        return temp.slice(0, -5);
    }
    this.insert = function(datas, res) {
        var SQL = "INSERT INTO " + this._TABLE + this.getInsertVal(datas, 'key') + " VALUES " + this.getInsertVal(datas, 'val');
        this.query(SQL, res);
    };
    this.select = function(find, where, res) {
        var SQL = "";
        var arg = arguments;
        switch (arg.length) {
            case 1:
                SQL += "SELECT * FROM " + this._TABLE;
                this.query(SQL, arg[0]);
                break;
            case 2:
                if (typeof arg[0] === 'string') {
                    SQL += "SELECT " + arg[0] + " FROM " + this._TABLE;
                } else {
                    SQL += "SELECT * FROM " + this._TABLE + " WHERE " + this.getWhereVal(arg[0]);
                }
                this.query(SQL, arg[1]);
                break;
            case 3:
                SQL += "SELECT " + arg[0] + " FROM " + this._TABLE + " WHERE " + this.getWhereVal(arg[1]);
                this.query(SQL, arg[2]);
                break;
            default:
                SQL += "SELECT * FROM " + this._TABLE;
                this.query(SQL, arg[0]);
                break;
        }
    };
    this.delete = function(where, res) {
        var SQL = "DELETE FROM " + this._TABLE;
        var arg = arguments;
        if (arg.length === 1) {
            this.query(SQL, arg[0])
        } else if (arg.length === 2) {
            SQL += " WHERE " + this.getWhereVal(where);
            this.query(SQL, arg[1]);
        }
    };
    this.update = function(datas, where, res) {
        var SQL = "UPDATE " + this._TABLE + " SET " + this.getVal(datas) + " WHERE " + this.getWhereVal(where);
        this.query(SQL, res);
    };
}

module.exports = DB_PG;