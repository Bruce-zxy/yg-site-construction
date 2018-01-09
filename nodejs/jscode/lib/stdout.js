const util = require('util');

console.log("main thread +");
console.time("main thread");

console.log("timer 3000 +");
setInterval(() => {
    console.log("timer 3000 -");
}, 1000);

console.timeEnd("main thread");
console.log("main thread -");

var i = 0
while(1) {
    process.stdout.write("# " + util.format(process.uptime()) + "\r");
};
