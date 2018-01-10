var fs = require('fs');

/* POST listing */
var imgList = (req, res) => {
	var path = '../album';
	var publicPath = '/album';
	var imgList = fs.readdirSync(path);
	imgList && res.send(imgList.map((item) => stats = { name: item, size: fs.statSync(path + "/" + item).size, path: publicPath + "/" + item }));
};

exports.imgList = imgList;