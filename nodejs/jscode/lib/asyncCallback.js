const util = require('util');

console.log("main thread +");
console.time("main thread");

console.log("timer 5000 +");
setTimeout(() => {
    console.log("5000-");
}, 5000);

console.log("Interval 1000");
setInterval(() => {
    process.stdout.write("# " + util.format(process.uptime()) + "\r");
}, 1000);

console.timeEnd("main thread");
console.log("main thread -");
