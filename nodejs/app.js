var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mutipart= require('connect-multiparty');
var mutipartMiddeware = mutipart();

var routes = require('./routes');
var conn = require('./routes/conn');
var imgUpload = require('./routes/imgUpload');
var imgList = require('./routes/imgList');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
// JSON解析
app.use(bodyParser.json());
// URL解码
app.use(bodyParser.urlencoded({ extended: true }));
// 上传文件解析
app.use(mutipart({ uploadDir: "../albumTemp" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/conn', conn.db);
app.post('/edit', routes.edit);
app.post('/save', routes.save);
app.post('/delete', routes.del);
app.post('/getAll', routes.getAll);
app.post('/createFolder', routes.createFolder);
app.post('/imgUpload', mutipartMiddeware, imgUpload.imgUpload);
app.post('/imgList', imgList.imgList);



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
