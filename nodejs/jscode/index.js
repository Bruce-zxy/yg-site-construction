var test2     = require('./test').test;
var testDB    = require('./db').test;
var dbConnect = require('./db').dbConnect;
var testMD    = require('./maindata').test;
var getMain   = require('./maindata').getMaindata;
var getMeta   = require('./maindata').getMetadata;

var menus = require('./menus');
var Menu = menus.Menu;

function test1() {
  menus.push(new Menu(
    [
      {shortcut: 't', prompt: 'test module demo', func: test2 },
      {shortcut: 'm', prompt: 'meta & main', func: () => {
        var m = getMeta('sysApps');      console.log(`Sys Apps: ${m}`);
        m = getMeta('partnerCategory');  console.log(`Pt Categ: ${m}`);
        m = getMeta('accountType');      console.log(`AccountT: ${m}`);
        m = getMeta('maindataCategory'); console.log(`md Categ: ${m}`);
        m = getMeta('authGroup');        console.log(`authGroup: ${m}`);
        for (let i in m) { console.log(i); console.log(m[i]); }
        m = getMeta('authorities');      console.log(`authorities: ${m}`);
        for (let i in m) { console.log(i); console.log(m[i]); }
        m = getMeta('salesChannels');    console.log('saleschannels: ', m);
        m = getMain('ROLES'); console.log('roles: ', m);
        m = getMain('MD-BL'); console.log('BL: ', m);
        m = getMain('MD-PC'); console.log('PC: ', m);
        m = getMain('MD-AC'); console.log('AC: ', m);
      }},
      {shortcut: 'q', prompt: 'Exit', func: () => {
        menus.pop();
        menus.showMenu();
      }}
    ]
  ));

  menus.show();
}

function getPartners() {
  dbConnect((err, client, done) => {
    if (err) {
        console.log(err);
    }
    else {
      console.time("Query");
      client.query(
        'SELECT * FROM dbt_partners',
        function(err, result) {
          console.timeEnd("Query");

          done();

          if (err) {
              return console.error('query error', err);
          }
          console.log("result.rows: ", result.rows);
        }
      );
    }
  });
}

function main() {
  console.log("main() +");

  menus.push(new Menu(
    [
      {shortcut: 'a', prompt: 'a menu item demo',   func: () => {
        console.log("menu item: 'a'");
      }},
      {shortcut: 'p', prompt: 'get partners',       func: getPartners },
      {shortcut: 't', prompt: 'test menu demo',     func: test1 },
      {shortcut: 'd', prompt: 'DB module',          func: testDB },
      {shortcut: 'm', prompt: 'MD module',          func: testMD },
      {shortcut: 'q', prompt: 'QUIT',               func: () => {
        process.stdin.emit('end');
      }}
    ]
  ));

  menus.show();

  console.log("main() -");


  // setTimeout(() => {    // async call back
  //   console.log("nice to see you after 3000ms");
  // }, 3000);

  // while(1) {            // sys events and async call back will get stuck by this infinite loop 
  //   process.stdout.write(`${process.uptime()}\r`);
  // }
}

main();
