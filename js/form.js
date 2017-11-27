var addr = "http://localhost/yg-site-construction/getAll.php";
var _createFolder = $('.create_folder');
var _createLabel = $(".tips .name label");
var _colors = $(".color span");
var _icons = $(".icons span");
var _tip = $(".tips");
var editColor = _colors.parent().find(".icon-ok")[0].classList[0];
var editIcon = $(".icons ."+editColor)[0].classList[0];
var folderSystem = function (editColor, editIcon, name, kind) {
	var classify = kind ? "folder" : "page";
	var content = kind ? "表单" : "数据";
	editColor.length > 7 ? editColor.slice(3) : null;
	var docfrag = document.createDocumentFragment();
	var DIV1 = document.createElement('div');
	DIV1.className = "form_"+classify+" animate " + editColor;
	var DIV2 = document.createElement('div');
	DIV2.className = classify;
	var DIV3 = document.createElement('div');
	DIV3.className = "center_icon";
	var A = document.createElement('a');
	A.href = "javascript:;";
	var P1 = document.createElement('p');
	P1.textContent = name;
	var P2 = document.createElement('p');
	P2.textContent = content;
	var SPAN1 = document.createElement('span');
	SPAN1.textContent = "0";
	var SPAN2 = document.createElement('span');
	SPAN2.className = editIcon;
	SPAN2.setAttribute("size", 40);
	SPAN2.textContent = "";
	P2.appendChild(SPAN1);
	DIV3.appendChild(SPAN2);
	DIV2.appendChild(P1);
	DIV2.appendChild(P2);
	A.appendChild(DIV2);
	A.appendChild(DIV3);
	DIV1.appendChild(A);
	docfrag.appendChild(DIV1);
	setTimeout(function () {
		$(".form_"+classify+".animate").removeClass("animate");
	}, 250);
	return docfrag;
}
var colorsChange = function () {
	editColor = this.classList[0];
	_colors.removeClass("icon-ok");
	this.classList.add("icon-ok");
	iconsBG.call($('.icons span[class*="bg-color-"]'));
}
var iconsBG = function () {
	for (i in _icons) !isNaN(i*1) && _icons[i].classList[1] ? _icons[i].className = _icons[i].classList[0] : null
	$(this).addClass(editColor);
	editIcon = $(this)[0].classList[0];
}
var createFolder = function () {
	var folderName = _tip.find(".name input").val() || "未命名文件夹";
	$(".form_part").prepend(folderSystem(editColor, editIcon, folderName, true));
}
$(document).click(function(event){
	if(!_createFolder.is(event.target) && _tip.has(event.target).length === 0 || _createLabel.is(event.target)){ // Mark 1
		_tip.hide(250);
	} else {
		_tip.show(250);
	}
});
_colors.click(colorsChange)
_icons.click(iconsBG);
_createLabel.click(createFolder);

$.ajax({
    type: "post",
    url: addr,
    success: function(data) {
        data = JSON.parse(data);
        if(typeof(data) !== 'object') {
            alert('服务器返回参数错误！')
        } else {
            console.log(data);
            var __color, __icon, __name;
            for (i in data) {
            	__color = data[i].classify.split(",")[0];
            	__icon = data[i].classify.split(",")[1];
            	__name = data[i].name;
            	$(".form_part").prepend(folderSystem(__color, __icon, __name, false));
            }
            $(".class_num")[0].innerHTML = data.length;
        }
    },
    error: function(a, b) {
        alert('向服务器请求数据失败！');
    }
});

$(".create").hover(function () {
	$(".create_form").show();
	$(".create_folder").show();
})


