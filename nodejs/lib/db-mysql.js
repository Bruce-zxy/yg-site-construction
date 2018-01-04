var mysql = require("mysql");

/**
 * MySQL数据库连接类
 * @Author   bruce_zxy
 * @DateTime 2018-01-04T11:41:36+0800
 * @version  v.1.0
 * @param    {String}                 db     [数据库名称]
 * @param    {String}                 table  [需要操作的数据表名称]
 * @param    {Object}                 others [域名host,用户名user,密码password,端口port]
 */
function DB_MYSQL(db, table, others) {

    this._DATABASE = db;
    this._TABLE = table;
    this._OTHERS = others || {};
    this.connect = function() {
        return mysql.createConnection({
            host: this._OTHERS.host || "localhost",
            user: this._OTHERS.user || "root",
            password: this._OTHERS.password || "19950224",
            database: this._DATABASE,
            port: this._OTHERS.port || 3306
        });
    };
    this.query = function(SQL, res) {
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

    this.insert = function(datas, res) {
        this.query("INSERT INTO " + this._TABLE + " SET " + this.getVal(datas), res);
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
                    SQL += "SELECT * FROM " + this._TABLE + " WHERE " + arg[0];
                }
                this.query(SQL, arg[1]);
                break;
            case 3:
                SQL += "SELECT " + arg[0] + " FROM " + this._TABLE + " WHERE " + arg[1];
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
            SQL += " WHERE " + where;
            this.query(SQL, arg[1])
        }
    };
    this.update = function(datas, where, res) {
        var SQL = "UPDATE " + this._TABLE + " SET " + this.getVal(datas) + " WHERE " + where;
        this.query(SQL, res);
    };
};


module.exports = DB_MYSQL;