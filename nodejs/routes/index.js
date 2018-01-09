var DB_PG = require('../lib/db-pg');

/* POST listing */
exports.getAll = function(req, res){
    new DB_PG('cms', req.body.DB).connect().select({ PARENT_FOLDER: req.body.PARENT_FOLDER } , res);
};

/* POST listing */
exports.createFolder = function(req, res) {
	var table = req.body.TYPE === "folder" ? "files_system" : "sites_construction";
	var db = new DB_PG('cms', table);
	var action = req.body.ACTION;
	delete req.body.ACTION;
	function add(err, result) {
		var get = db.connect().get("SELECT ID FROM " + table + " WHERE CREATE_TIME='" + req.body.CREATE_TIME + "'");
		get.then(function (result) {
			res.send(result.rows);
		})
	}
	switch(action) {
		case 'add':
			res.func = add;
			db.connect().insert(req.body, res);
			break;
		case 'delete':
			db.connect().delete({ NAME: req.body.NAME, CREATE_TIME: req.body.CREATE_TIME}, res)
			break;
	}
}