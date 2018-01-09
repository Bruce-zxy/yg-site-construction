
// Demo 1
// https://nodejs.org/api/process.html#process_process_stdin

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });

// Demo 2
// http://blog.csdn.net/zjwengyidong/article/details/53789549

process.stdin.setEncoding('utf8'); // without this line, chunk will be an object instead of string

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();

  console.log("typeof: ", typeof chunk);
  console.log(chunk);
  
  if(typeof chunk === 'string'){
    chunk = chunk.slice(0,-2);
    process.stdout.write(`stringLength:${chunk.length}\n`);
  }
  if(chunk === ''){
    process.stdin.emit('end');
    return
  }
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}\n`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
