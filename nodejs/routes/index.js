var DB_PG = require('../lib/db-pg');

/* POST listing */
exports.getAll = function(req, res){
    new DB_PG('cms', req.body.db).connect().select({ parent_folder: req.body.parent_folder } , res);
};

/* POST listing */
exports.createFolder = function(req, res) {
	var table = req.body.type === "folder" ? "files_system" : "sites_construction";
	var db = new DB_PG('cms', table);
	var action = req.body.action;
	delete req.body.action;
	function add(err, result) {
		var get = db.connect().get("SELECT ID FROM " + table + " WHERE create_time='" + req.body.create_time + "'")
		get.then(function (result) {
			res.send(result.rows[0]);
		})
	}
	switch(action) {
		case 'add':
			res.func = add;
			db.connect().insert(req.body, res);
			break;
		case 'delete':
			db.connect().delete({ name: req.body.name, create_time: req.body.create_time}, res)
			break;
	}
}

/* POST listing */
exports.edit = function(req, res){
    new DB_PG('cms', req.body.db).connect().select({ parent_folder: req.body.parent_folder } , res);
};

