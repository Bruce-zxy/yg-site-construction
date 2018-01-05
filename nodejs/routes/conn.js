var DB_MYSQL = require('../lib/db-mysql');
var DB_PG = require('../lib/db-pg');
var pg = require('pg');
// var spawn = require('child_process').spawn;


// free = spawn("cd", ['D:\\']);
// // 捕获标准输出并将其打印到控制台 
// free.stdout.on('data', function(data) {
//     console.log('standard output:\n' + data);
// });

// // 捕获标准错误输出并将其打印到控制台 
// free.stderr.on('data', function(data) {
//     console.log('standard error output:\n' + data);
// });

// // 注册子进程关闭事件 
// free.on('exit', function(code, signal) {
//     console.log('child process eixt ,exit:' + code);
// });


/* POST conn listing. */
exports.db = function(req, res){
    // var db1 = new DB_MYSQL("test", "files_system");
    // db1.insert({name: 'create by node3', type: 'folder', parent_folder: 0, create_time: 1512097338243, classify: 'color-1,icon-facetime-video'}, res);

    const startUsage = process.cpuUsage();
    // 数据库配置
    var config = {
        user: "postgres",
        database: "test2",
        password: "19950224",
        port: 5432,

        // 扩展属性
        max: 1, // 连接池最大连接数
        idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
    }

    // 创建连接池
    var pool = new pg.Pool(config);

    var SQL = `CREATE DATABASE test2;

    CREATE TABLE db_users (
        id              SERIAL PRIMARY KEY,
        name            text,
        user_id         int,
        asset           money[],
        secret          bit(6),
        user_info       JSON,
        UNIQUE (user_id, id)
    );

    INSERT INTO db_users (name, user_id, asset, secret, user_info) VALUES
        ('朱晓毅', 2017001, '{16615}', B'000111', '{"body":[170,63.7], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
        ('王浩', 20170019, '{19811}', B'000111', '{"body":[171,61.2], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
        ('沈杰', 20170013, '{14981}', B'000111', '{"body":[172,64.5], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
        ('徐国庆', 20170014, '{19198}', B'000111', '{"body":[173,58.9], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
        ('隗云志', 20170015, '{19819}', B'000111', '{"body":[175,59.3], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
        ('沈鹏飞', 20170016, '{19611}', B'000111', '{"body":[175,63.6], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' ),
        ('祁曼莉', 20170017, '{19564}', B'000111', '{"body":[175,61.8], "color": ["black", "white"], "memory": ["4G", "8G", "16G"]}' );
    
    CREATE OR REPLACE FUNCTION totalRecords ()
    RETURNS integer AS $total$
    declare
        total integer;
    BEGIN
       SELECT count(*) into total FROM db_users;
       RETURN total;
    END;
    $total$ LANGUAGE plpgsql;

    select totalRecords();

    CREATE OR REPLACE FUNCTION db_users_children(id int DEFAULT 0)
    RETURNS SETOF db_users
    AS
    $$
    SELECT * FROM db_users WHERE 2017001 > 10000;
    $$
    LANGUAGE SQL IMMUTABLE STRICT;
`

    // pool.connect(function(err, client, done) {
    //     if (err) {
    //         return console.error('数据库连接出错', err);
    //     }
    //     // 简单输出
    //     const query = {
    //         // give the query a unique name
    //         name: 'fetch-user',
    //         text: 'SELECT * FROM user WHERE id = $1',
    //         values: [1]
    //     }
        pool.query('SELECT * from db_users_children()', function(err, result) {
            // done(); // 释放连接（将其返回给连接池）
            if (err) {
                return console.error('查询出错', err);
            }
            result = new Object(result);
            console.log(result.rows);
            res.send(result.rows);
        });
    // });

};
