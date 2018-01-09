
// --- Initial ---

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

// --- Export Functions ---

function dbConnect(callback) {
    pool.connect(callback); // err, client, done
}

// --- Testing ---

function testQ() {
    dbConnect((err, client, done) => {
        if (err) {
            console.log(err);
        }
        else {
            console.time("Query");
            client.query(
                'SELECT * FROM dbt_products',
                function(err, result) {
                    console.timeEnd("Query");
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
        }
    });
}

var menus = require('./menus');
var Menu = menus.Menu;

function test() {
  menus.push(new Menu(
    [
        {shortcut: 'p', prompt: 'Products', func: testQ },
        {shortcut: 'q', prompt: 'EXIT', func: () => {
            menus.pop();
            menus.showMenu();
        }}
    ]
  ));

  menus.show();
}

// --- Exports ---

exports.dbConnect = dbConnect;
exports.test = test;

// exports.connection = connection;  // cannot get the connection from outside this module
