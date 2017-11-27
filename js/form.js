var _createFolder = $('.create_folder');   // 设置目标区域
var _tip = $(".tips");
var _createLabel = $(".tips .name label");
$(document).click(function(event){
	if(!_createFolder.is(event.target) && _tip.has(event.target).length === 0 || _createLabel.is(event.target)){ // Mark 1
		_tip.hide(250);          //淡出消失
	} else {
		_tip.show(250);
	}
});

var _colors = $(".color span");
var _icons = $(".icons span");
var editColor = _colors.parent().find(".icon-ok")[0].classList[0];
var editIcon = $(".icons ."+editColor)[0].classList[0];
console.log(editIcon);
function colorsChange() {
	editColor = this.classList[0];
	console.log(_colors[0].attributes);
	_colors.removeClass("icon-ok");
	this.classList.add("icon-ok");
	iconsBG.call($('.icons span[class*="bg-color-"]'));
}
function iconsBG() {
	for (i in _icons) {
		!isNaN(i*1) && _icons[i].classList[1] ? _icons[i].className = _icons[i].classList[0] : null
	}
	$(this).addClass(editColor);
	editIcon = $(this)[0].classList[0];
}
function createFolder() {
	event.preventDefault();
	var folderName = _tip.find(".name input").val() || "未命名文件夹";
	var docfrag = document.createDocumentFragment();
	var DIV1 = document.createElement('div');
	DIV1.className = "form_folder " + editColor.slice(3);
	var DIV2 = document.createElement('div');
	DIV2.className = "folder";
	var DIV3 = document.createElement('div');
	DIV3.className = "center_icon";
	var A = document.createElement('a');
	A.href = "javascript:;";
	var P1 = document.createElement('p');
	P1.textContent = folderName;
	var P2 = document.createElement('p');
	P2.textContent = "表单";
	var SPAN1 = document.createElement('span');
	SPAN1.textContent = "0";
	var SPAN2 = document.createElement('span');
	SPAN2.className = editIcon;
	console.log(SPAN2.attributes);
	SPAN2.setAttribute("size", 40);
	console.log(SPAN2.attributes);
	SPAN2.textContent = "";
	P2.appendChild(SPAN1);
	DIV3.appendChild(SPAN2);
	DIV2.appendChild(P1);
	DIV2.appendChild(P2);
	A.appendChild(DIV2);
	A.appendChild(DIV3);
	DIV1.appendChild(A);
	docfrag.appendChild(DIV1);
	$(".form_part").prepend(docfrag);
}
_colors.click(colorsChange)
_icons.click(iconsBG);
_createLabel.click(createFolder);
