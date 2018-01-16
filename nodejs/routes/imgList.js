var fs = require('fs');

/* POST listing */
var imgList = (req, res) => {
	var path = '../album';
	var publicPath = 'http://localhost/yg-site-construction/album';
	var imgList = fs.readdirSync(path);
	imgList && res.json(imgList.map((item) => stats = { name: item, size: fs.statSync(path + "/" + item).size, path: publicPath + "/" + item }));
};

exports.imgList = imgList;