
// --- Initial ---

var dbConnect = require('./db').dbConnect;

var menus = require('./menus');
var Menu = menus.Menu;

function iterateTable(tableName, callback) {
  dbConnect((err, client, done) => {
    if (err) {
        console.log(err);
    }
    else {
      console.time("Query");
      client.query(
        'SELECT * FROM ' + tableName,
        function(err, result) {
          console.timeEnd("Query");

          done();

          if (err) {
            return console.error('query error', err);
          }
          console.log("result.rows: ", result.rows);

          result.rows.forEach(callback);
        }
      );
    }
  });
}

var sysApps             = new Array();
var partnerCategory     = new Array();
var accountType         = new Array();
var mdCategory          = new Array();
var authGroup           = new Object();
var authorities         = new Object();
var salesChannels       = new Object();

var roles               = new Object();
var businessLine        = new Array();
var productCatalog      = new Array();
var areaCode            = new Array();

var maindata = new Object();
maindata['MD-BL'] = businessLine;
maindata['MD-PC'] = productCatalog;
maindata['MD-AC'] = areaCode;
maindata['ROLES'] = roles;

function initMaindata() {
    console.log("initMaindata() +");

    iterateTable('dbt_sys_app',             (item, idx) => {
        sysApps[item.id] = item['name'];
    });
    iterateTable('dbt_partner_category',    (item, idx) => {
        partnerCategory[item.id] = item['category'];
    });
    iterateTable('dbt_account_type',        (item, idx) => {
        accountType[item.id] = item['type'];
    });
    iterateTable('dbt_maindata_category',   (item, idx) => {
        mdCategory[item.id] = item['category'];
    });
    iterateTable('dbt_authgroups',   (item, idx) => {
        if (authGroup[item.sysapp] == undefined) {
            authGroup[item.sysapp] = new Array();
        }
        authGroup[item.sysapp][item.groupid] = item['groupname'];
    });
    iterateTable('dbt_authorities',   (item, idx) => {
        if (authorities[item.sysapp] == undefined) {
            authorities[item.sysapp] = new Array();
        }
        if (authorities[item.sysapp][item.groupid] == undefined) {
            authorities[item.sysapp][item.groupid] = new Object();
        }
        authorities[item.sysapp][item.groupid][item.name] = item.authority;
    });
    iterateTable('dbt_saleschannels',   (item, idx) => {
        salesChannels[item.name] = item.saleschannel;
    });
    iterateTable('dbt_roles',           (item, idx) => {
        if (roles[item.sysapp] == undefined) {
            roles[item.sysapp] = new Object();
        }
        roles[item.sysapp][item.name] = item.authorities;
    });
    iterateTable('dbv_maindata',        (item, idx) => {
        maindata[item.category].push(new Object({
            id:     item.id,
            code:   item.code,
            path:   item.path,
            epath:  item.epath,
            name:   item.name,
            ename:  item.ename,
            level:  item.lvl,
            code:   item.code
        }));
    });

    console.log("initMaindata() -");
}

initMaindata();

// --- Dependence ---

var metadata = new Object();
metadata['sysApps']             = sysApps;
metadata['partnerCategory']     = partnerCategory;
metadata['accountType']         = accountType;
metadata['maindataCategory']    = mdCategory;
metadata['authGroup']           = authGroup;
metadata['authorities']         = authorities;
metadata['salesChannels']       = salesChannels;

// --- Export Functions ---

function getMetadata(name) {
    return metadata[name];
}

function getMaindata(name) {
    return maindata[name];
}

// --- Testing ---

function test() {
  menus.push(new Menu(
    [
      {shortcut: 'a', prompt: 'show sys apps', func: () => {
        console.log(`Sys Apps: ${sysApps}`);
        console.log(`Pt Categ: ${partnerCategory}`);
        console.log(`AccountT: ${accountType}`);
        console.log(`md Categ: ${mdCategory}`);
        console.log(`authGroup: ${authGroup}`);
        for (let i in authGroup) {
            console.log(i);
            console.log(authGroup[i]);
        }
        // for (let i of authGroup) { // authGroup is not iterable, so here is a bug
        //     console.log(i);
        // }
        console.log(`authorities: ${authorities}`);
        for (let i in authorities) {
            console.log(i);
            console.log(authorities[i]);
        }
        console.log('saleschannels: ', salesChannels);
        console.log('roles: ', roles);
        console.log('BL: ', businessLine);
        console.log('PC: ', productCatalog);
        console.log('AC: ', areaCode);
      }},
      {shortcut: 'm', prompt: 'init Maindata', func: initMaindata },
      {shortcut: 'q', prompt: 'EXIT', func: () => {
        menus.pop();
        menus.showMenu();
      }}
    ]
  ));

  menus.show();
}

// --- Exports ---

exports.getMetadata = getMetadata;
exports.getMaindata = getMaindata;
exports.test        = test;
