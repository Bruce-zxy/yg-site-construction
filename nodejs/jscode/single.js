var foo = new Object();

foo['id'] = true;
foo['age'] = 30;
foo['name'] = 'Chris';
foo['json'] = new Object();
foo['json']['wife'] = 'Clare';
foo['json']['daughter'] = 'Jolin';

console.log(foo);

var too = new Object({
    id: foo.id,
    age: foo.age,
    name: foo.name,
    json: foo.json
});

foo['id'] = false;
foo['age'] = 20;
foo['name'] = 'X';
foo['json']['wife'] = 'Y';
foo['json']['daughter'] = 'z';

console.log(foo);
console.log(too);

