var pg = require('pg');

// 数据库配置
var config = {
    user: "postgres",
    database: "test",
    password: "19950224",
    port: 5432,

    // 扩展属性
    max: 1, // 连接池最大连接数
    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
}

// 创建连接池
var pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
    if (err) {
        return console.error('数据库连接出错', err);
    }
    // 简单输出
    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: 'SELECT * FROM user WHERE id = $1',
        values: [1]
    }
    client.query('SELECT * FROM dbt_maindata', function(err, result) {
        done(); // 释放连接（将其返回给连接池）
        if (err) {
            return console.error('查询出错', err);
        }
        // console.log(result.rows); //output: Hello World
        // res.send(result.rows);
    });
});

function DB_PG(db, table, others) {
	this._DATABASE = db;
	this._TABLE = table;
	this._OTHERS = others || {};
	this._CONFIG = {
		host: this._OTHERS.host || "localhost",
	    user: this._OTHERS.user || "postgres",
	    database: this._DATABASE || "test",
	    password: this._OTHERS.password || "19950224",
	    port: this._OTHERS.port || 5432,
	    // 扩展属性
	    max: 1, // 连接池最大连接数
	    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
	}
}

module.exports = DB_PG;