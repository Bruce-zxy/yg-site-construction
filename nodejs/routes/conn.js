var DB_MYSQL = require('../lib/db-mysql');
var DB_PG = require('../lib/db-pg');
var spawn = require('child_process').spawn;



/* POST conn listing. */
exports.db = function(req, res){

    // free = spawn("cd", ['D:\\']);
    // // 捕获标准输出并将其打印到控制台 
    // free.stdout.on('data', function(data) {
    //     console.log('\x1B[36m%s\x1B[0m', 'standard output:\n' + data);
    // });

    // // 捕获标准错误输出并将其打印到控制台 
    // free.stderr.on('data', function(data) {
    //     console.log('\x1B[36m%s\x1B[0m', 'standard error output:\n' + data);
    // });

    // // 注册子进程关闭事件 
    // free.on('exit', function(code, signal) {
    //     console.log('\x1B[36m%s\x1B[0m', 'child process eixt ,exit:' + code);
    // });

    function logTime(str) {
        this.count = 1;
        this.label;
        this.start = function () {
            this.label = str || 'Process-' + this.count + '共耗时';
            console.time(this.label);
        }
        this.end = function () {
            console.log('\x1B[42m\x1B[1m %s \x1B[0m', '-------Process-' + this.count + '--------');
            console.timeEnd(this.label);
            console.log('\x1B[36m\x1B[1m %s \x1B[0m', '--------------------------');
            this.count++;
        }
    }

    function log() {
        this.success = function (arg) {
            if (typeof arg !== 'string') {
                console.log('\x1B[42m\x1B[1m %s \x1B[0m', '[key]\t-->\t[value]');
                for (i in arg) {
                    if (arg.hasOwnProperty(i)) {
                        console.log('\x1B[42m\x1B[1m %s \x1B[0m', i + '\t-->\t' + arg[i]);
                    }
                }
            } else {
                console.log('\x1B[42m\x1B[1m %s \x1B[0m', arg);
            }
        }
    }
    
    process.on('exit', function() {
        // 设置一个延迟执行
        setTimeout(function() {
            console.log('\x1B[36m%s\x1B[0m', '主事件循环已停止，所以不会执行');
        }, 0);
        console.log('do it before exit');
        
    });

    process.on('SIGINT', function() {
        console.log('收到 SIGINT 信号。');
    });

    console.log('试着按下 ctrl + C');
    setTimeout(function() {
        console.log('end');
    }, 50000);

    process.on('uncaughtException', function() {
        console.log('捕获到一个异常');
    });

    res.send(req.body);
    
};
