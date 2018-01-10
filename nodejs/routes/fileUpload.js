var fs = require('fs');

var checkZero = (val) => val.length === 1 ? '0' + val : val;

/* POST listing */
exports.imgUpload = function (req, res) {
	var now = new Date();
	var time = [now.getFullYear(), checkZero(now.getMonth() + 1), checkZero(now.getDate()), checkZero(now.getHours()), checkZero(now.getMinutes()), checkZero(now.getSeconds())].join('');
	var reg = new RegExp(/\s?[.]\w+[^\W]/, 'ig');
	var ext = req.files.file.name.match(reg).join('');
	var name = req.body.name ? req.body.name + ext : req.files.file.name;
    var tmpPath = req.files.file.path;
    var targetPath = '../img/' + name;
    fs.rename(tmpPath, targetPath , function(err) {
		if(err) throw err;
		//删除临时文件
		fs.unlink(tmpPath, function(){
			if(err) throw err;
		})
	})
	
    res.send(time);
};