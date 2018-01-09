// encoding utf-8

var EventEmitter=require('events').EventEmitter
var life = new EventEmitter();

//comfort  求安慰，函数名；
//fondness 求溺爱，函数名； 
//官方建议，事件监听的最大数量不要超过10个，太多的话可能会导致内存的泄漏，当然这个值是可以修改的，通过setMaxListeners()方法修改；

life.setMaxListeners(3);

function meal(who){
  console.log('给'+who+'做饭');
};
function water(who){
  console.log('给'+who+'倒水');
};
life.on('comfort',meal);
life.on('comfort',water);

life.on('fondness', (who) => { 
  console.log('给'+who+'买衣服');
});
life.on('fondness', (who) => {
    console.log('请'+who+'吃饭');
});
life.on('fondness', (who) => {
  console.log('陪'+who+'逛街');
});
life.on('fondness', (who) => {
  console.log('给'+who+'交工资');
});

console.log('给老公做的事情：'+life.listeners('comfort').length);
console.log('给老婆做的事情：'+life.listeners('fondness').length);
console.log(life.emit('comfort','老公'));
console.log(life.emit('fondness','老婆'));

setTimeout(() => {
  life.removeListener('comfort',meal); 
  life.removeListener('comfort',water); 
  console.log('给老公做的事情：'+life.listeners('comfort').length);
  console.log('给老婆做的事情：'+life.listeners('fondness').length);
  console.log(life.emit('comfort','老公'));
  console.log(life.emit('fondness','老婆'));
}, 3000);
