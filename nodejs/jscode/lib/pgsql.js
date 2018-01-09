var pg = require("pg");

var config = {
    user: "cto",
    database: "chrisdb",
    password: "123456",
    port: 5432,

    max: 1,
    idleTimeoutMillis: 3000,
}

var pool = new pg.Pool(config);

console.log("connecting...");
console.time("Connect");
pool.connect(function(err, client, done) {
    if (err) {
        return console.error('connection fail!', err);
    }
    client.query(
        'SELECT * FROM dbt_products',
        // 'SELECT * FROM dbf_maindata_children(0)',
        function(err, result) {
            done();

            if (err) {
                return console.error('query error', err);
            }
            console.log("result.rows: ", result.rows);
            var test = new Object(result.rows[0]);
            console.log(test);
            var test = new Object(result.rows[1]);
            console.log(test);

            console.log("product spec", result.rows[0].product_spec);
        }
    );
});
console.timeEnd("Connect");
console.log("All done!");

