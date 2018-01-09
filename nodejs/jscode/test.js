var menus = require('./menus');
var Menu = menus.Menu;

function test() {
  menus.push(new Menu(
    [
      {shortcut: 'x', prompt: 'menu x', func: () => {
        console.log("menu item x");
      }},
      {shortcut: 'y', prompt: 'menu y', func: () => {
        console.log("menu item y");
      }},
      {shortcut: 'z', prompt: 'menu z', func: () => {
        console.log("menu item z");
      }},
      {shortcut: 'q', prompt: 'EXIT', func: () => {
        menus.pop();
        menus.showMenu();
      }}
    ]
  ));

  menus.show();
}

exports.test = test;
