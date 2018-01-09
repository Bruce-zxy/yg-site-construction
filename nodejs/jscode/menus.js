// --- Initial ---

process.stdin.setEncoding('utf8');

var menus = new Array();

function stdinRead() {
    // console.log("stdinRead() +");

    var chunk = process.stdin.read();
    // console.log("typeof: ", typeof chunk);
    // console.log(chunk);
    if (typeof chunk === 'string') {
        chunk = chunk.slice(0, -2);
        // console.log(`stringLength:${chunk.length}\n`);
    } else {
        console.error("Cannot deal with chunk!!!");
        console.log("stdinRead() -");
        return;
    }

    if (chunk !== null) {
        // console.log(`data: ${chunk}\n`);

        for (var i = 0, len = menus[menus.length - 1].items.length; i < len; i++) {
            console.log(`${chunk} ?= ${menus[menus.length-1].items[i].shortcut} ${menus[menus.length-1].items[i].prompt}`);
            if (chunk == menus[menus.length - 1].items[i].shortcut) {
                console.log(menus[menus.length - 1].items[i].prompt);
                menus[menus.length - 1].items[i].func();
                break;
            }
        }
    }
    // console.log("stdinRead() -");
};

process.stdin.on('readable', stdinRead);
console.log("listeners number of read: ", process.stdin.listeners('readable').length);
console.log("listeners number of end: ", process.stdin.listeners('end').length);

// --- Dependence ---

function showMenu() {
    return menus[menus.length - 1].show();
}

// --- Export Functions ---

function push(menu) {
    console.log("Menus.push() +");
    menus.push(menu);
    console.log("Menus.push() -");
}

function pop() {
    console.log("Menus.pop() +");
    menus.pop();
    console.log("Menus.pop() -");
}

function show() {
    console.log("Menus.show() +");

    console.log("GLOBAL MENU: ", menus);
    console.log("menu number: ", menus.length);
    console.log("menu number: ", showMenu());

    console.log("Menus.show() -");
}

function Menu(menuItems) {
    console.log("Menu +");

    this.items = menuItems;

    this.show = function() {
        console.log("Menu.show() +");

        for (var i = 0, len = this.items.length; i < len; i++) {
            // process.stdout.write(`#${i} - '${this.items[i].shortcut}': ${this.items[i].prompt} \r\n`);
            console.log(`#${i} - '${this.items[i].shortcut}': ${this.items[i].prompt}`);
        }

        console.log("Menu.show() -");

        return "return of Menu.show()";
    }

    console.log("Menu -");
}

// --- Exports ---

exports.Menu = Menu;
exports.push = push;
exports.pop = pop;
exports.show = show;
exports.showMenu = showMenu;