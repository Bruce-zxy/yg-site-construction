var fs = require('fs');

/* POST listing */
var imgUpload = (req, res) => {
	var file = req.files.file;
	var upload = (file) => {
		// var words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		// var now = new Date();
		// var time = [now.getFullYear(), checkZero(now.getMonth() + 1), checkZero(now.getDate()), checkZero(now.getHours()), checkZero(now.getMinutes()), checkZero(now.getSeconds())].join('');
		// var extReg = new RegExp(/\s?[.]\w+[^\W]/, 'ig');
		// var ext = file.name.match(extReg).join('');
		// var name = 'CMS-' + time + words[i];
	    var tmpPath = file.path;
	    var targetPath = '../album/' + file.name;
        fs.rename(tmpPath, targetPath, (err) => {
        	checkErr(err);
    		fs.access(targetPath, fs.constants.R_OK | fs.constants.W_OK, checkErr);
    	})
	}
	var checkErr = (err) => {
		var result = {};
		result.result = err ? false : true;
		result.err = err;
		res.send(result);
		if(err) throw err;
	}
	// var checkZero = (val) => (val + '').length === 1 ? '0' + val : val;
	if (!file) {
	    var err = {
	        result: false,
	        err: {
	            reason: '未接收到文件'
	        }
	    }
		res.send(err);
		return err;
	}
	upload(file);
};

exports.imgUpload = imgUpload;

