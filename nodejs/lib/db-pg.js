var pg = require('pg');


function DB_PG(db, table, others) {
	this._DATABASE = db;
	this._TABLE = table;
	this._OTHERS = others || {};
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
    this._POOL;
    this.connect = function () {
        this._POOL = new pg.Pool(this._CONFIG);
        return this.query(this._POOL);
    }
    this.query = function (pool) {
        return function (SQL, func, res) {
            pool.query(SQL, function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result.rows);
                    func(err, result);
                }
            });
        }
    }
}

module.exports = DB_PG;