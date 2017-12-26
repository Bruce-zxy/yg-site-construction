var mysql = require('mysql');

var TEST_DATABASE = 'test';
var TEST_TABLE = 'sites_construction';

var response;

//创建连接  
var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '19950224',
    database: TEST_DATABASE,
    port: 3306
});

client.connect();
// client.query("use " + TEST_DATABASE);

client.query(
    'SELECT * FROM ' + TEST_TABLE,
    function selectCb(err, results, fields) {
        if (err) {
            throw err;
        }

        if (results) {
            response = results;
            for (var i = 0; i < results.length; i++) {
                console.log("%d\t%s\t%s\t%s", results[i].ID, results[i].NAME, results[i].CLASSIFY, results[i].PARENT_FOLDER);
            }
        }
        client.end();
    }
);

