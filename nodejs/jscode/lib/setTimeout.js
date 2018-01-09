console.log("main thread +");
console.time("main thread");

console.log("timer 3000 +");
console.time("timer3000");
setTimeout(() => {
    console.timeEnd("timer3000");
    console.log("timer 3000 -");
}, 3000);

console.timeEnd("main thread");
console.log("main thread -");
