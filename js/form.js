var addrGet = "http://localhost/yg-site-construction/getAll.php";
var addrSend = "http://localhost/yg-site-construction/createFolder.php";
var _createForm = $(".create_form");
var _createFolder = $('.create_folder');
var _createLabel = $(".tips .name label");
var _document = $(document);
var _create = $(".create");
var _colors = $(".color span");
var _icons = $(".icons span");
var _tip = $(".tips");
var _classNum = $(".class_num");
var _formFolder = $(".form_folder a");
var _nav = $(".navbar");
var editColor = _colors.parent().find(".icon-ok")[0].className.split(" ")[0];
var editIcon = $(".icons ."+editColor)[0].className.split(" ")[0];
var presentFolder = sessionStorage.getItem("presentFolder");
var presentPath = sessionStorage.getItem("presentPath");
var parentFolder = 0;
var pageSum = 0;
var folderSum = 0;
var firstLayerSort = [];
/**
 * [folderSystem description]
 * @Author   bruce_zxy
 * @DateTime 2017-11-29T10:09:18+0800
 * @version  1.0
 * @param    {string}                 editColor 颜色
 * @param    {string}                 editIcon  图标
 * @param    {string}                 name      文件夹/表单名
 * @param    {boolean}                kind      是否是文件夹
 * @return   {object}                 docfrag	DOM树画布          
 */
var folderSystem = function (editColor, editIcon, name, kind, id) {
	var classify = kind ? "folder" : "page";
	var content = kind ? "表单" : "数据";
	var link = kind ? "javascript:;" : "./edit.html?name=" + name;
	editColor = editColor.length > 7 ? editColor.slice(3) : editColor;
	var docfrag = document.createDocumentFragment();
	var DIV1 = document.createElement('div');
	DIV1.className = "form_"+classify+" " + editColor;
	var DIV2 = document.createElement('div');
	DIV2.className = classify;
	var DIV3 = document.createElement('div');
	DIV3.className = "center_icon";
	var A = document.createElement('a');
	A.href = link;
	A.className = "animate ui-state-default";
	A.setAttribute("draggable", !kind);
	A.setAttribute("data-folder", id)
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
	return docfrag;
}
// 点击创建文件夹改变图标颜色
var colorsChange = function () {
	editColor = this.className.split(" ")[0];
	_colors.removeClass("icon-ok");
	$(this).addClass("icon-ok");
	iconsBG.call($('.icons span[class*="bg-color-"]'));
}
// 点击创建文件夹选择图标
var iconsBG = function () {
	for (i in _icons) !isNaN(i*1) && _icons[i].className.split(" ")[1] ? _icons[i].className = _icons[i].className.split(" ")[0] : null
	$(this).addClass(editColor);
	editIcon = $(this)[0].className.split(" ")[0];
}
// 创建新页面
var createForm = function () {
	window.location.href = "./edit.html";
}
// 创建文件夹
var createFolder = function () {
	var folderName = _tip.find(".name input").val() || "未命名文件夹";
	editColor = editColor.length > 7 ? editColor.slice(3) : editColor;
	var datas = {
		NAME: folderName,
		CLASSIFY: editColor + "," + editIcon,
		CREATE_TIME: new Date().getTime(),
		TYPE: "folder",
		PARENT_FOLDER: presentFolder,
		ACTION: "add",
	};
	$(".form_part").prepend(folderSystem(editColor, editIcon, folderName, true));
	$.ajax({
	    type: "post",
	    url: addrSend,
	    data: datas,
	    success: function(data) {
	    	console.log(data);
	        data = JSON.parse(data);
	        if(typeof(data) === 'object'){
	        	console.log(data);
	        	
	        } else {
	        	alert('服务器返回参数错误！');
	        }
	    },
	    error: function(a, b) {
	        alert('向服务器请求数据失败！');
	    }
	});
	folderSum++;
	updateClass();
}
// 储存某一页的表单
// 统计某一页表单数量
/**
 * [getNum description]
 * @Author   bruce_zxy
 * @DateTime 2017-12-01T10:55:41+0800
 * @version  [version]
 * @param    {Object}                 data     异步返回的数据数组
 * @param    {String}                 classify 文件夹还是页面
 * @return   {Number}                          返回对应的数量
 */
var getNum = function (data, classify) {
    traversingData(data.sort(byTime("CREATE_TIME")));
    return data.length;
}
// 遍历返回数组
var traversingData = function (data) {
	console.log(firstLayerSort);
    for (var i = 0; i < data.length; i++) 
    	firstLayerSort.push(data[i]);
}
// 数据按创建时间排序(小 -> 大)
var byTime = function(name) {
    return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) return 0;
            if (typeof a === typeof b) return a < b ? -1 : 1;
            return typeof a < typeof b ? -1 : 1;
        } else {
            throw("error");
        }
    }
}
// 最终渲染开始
var render = function (firstLayerSort) {
	var __COLOR, __ICON, __NAME, __CLASSIFY, __I, __LEN, __T, __STATE,__ID;
	__I = 0;
    __LEN = firstLayerSort.length - 1;
    __T = setInterval(function () {
    	__COLOR = firstLayerSort[__I].CLASSIFY.split(",")[0];
    	__ICON = firstLayerSort[__I].CLASSIFY.split(",")[1];
    	__CLASSIFY = firstLayerSort[__I].TYPE && firstLayerSort[__I].TYPE === "folder" ? true : false;
    	__NAME = firstLayerSort[__I].NAME;
    	__ID = firstLayerSort[__I++].ID
    	__STATE = __I > __LEN;
    	__STATE ? window.clearInterval(__T) : null;
    	$(".form_part").prepend(folderSystem(__COLOR, __ICON, __NAME, __CLASSIFY, __ID));
    	renderOver(__STATE);
    }, 25)
}
// 最终渲染结束
var renderOver = function (state) {
	firstLayerSort = [];
	state ? doSomething() : null;
}
// 获取数据
var fetch = function (url, data, func) {
	var getFolder = data.parentFolder;
	$.ajax({
	    type: "post",
	    url: url,
	    data: data,
	    success: function(data) {
	    	console.log(data);
	        data = JSON.parse(data);
	        console.log(data);
	        typeof(data) === 'object' ? func ? func(data, data.length === 0, getFolder) : console.log(data) : alert('服务器返回参数错误或未找到数据！');
	    },
	    error: function(a, b) {
	        alert('向服务器请求数据失败！');
	    }
	});
}
var getFirstPages = function (data, dataNull, getFolder) {
	pageSum = dataNull ? 0 : getNum(data, "page");
	fetch(addrGet, { DB: "files_system", PARENT_FOLDER: getFolder }, getFirstFolders);
}
var getFirstFolders = function (data, dataNull) {
	folderSum = dataNull ? 0 : getNum(data, "folder");
	console.log(firstLayerSort.length);
	console.log(firstLayerSort);
	$(".form_part").html("");
	firstLayerSort.length ? render(firstLayerSort) : null;
}
// 更新右侧类别数据
var updateClass = function () {
	_classNum[0].innerHTML = pageSum + folderSum;
	_classNum[1].innerHTML = folderSum;
}
// 点击文件夹进入下级文件夹
var deepFolder = function () {
	var deepName = $(this).find(".folder p:first-child")[0].innerText;
	parentFolder = this.getAttribute("data-folder");
	sessionStorage.setItem("presentFolder", parentFolder);
	_nav.append('<span>><a href="javascript:;" data-folder="'+parentFolder+'">'+deepName+'</a></span>')
	navLink();
	sessionStorage.setItem("presentPath", _nav.html());
	fetch(addrGet, { DB: "sites_construction", PARENT_FOLDER: parentFolder }, getFirstPages);
}
// 导航栏添加点击事件
var navLink = function () {
	_nav.find('a').map(function () {
		this.onclick = function () {
			$(this).parent().nextAll().remove();
			fetch(addrGet, { DB: "sites_construction", PARENT_FOLDER: this.getAttribute("data-folder") }, getFirstPages);
		}
	});
}
// 每次页面重新请求并加载完毕后的js操作
var doSomething = function () {

	console.log("do something!");
	// do some thing after render!
	updateClass();
	_formFolder = $(".form_folder a");
	_formFolder.click(deepFolder);



	console.log("render over!");
	console.timeEnd('testForEach');
}

parentFolder = presentFolder || parentFolder;
presentPath ? _nav.html(presentPath) : null;
navLink();
fetch(addrGet, { DB: "sites_construction", PARENT_FOLDER: parentFolder }, getFirstPages);
_colors.click(colorsChange)
_icons.click(iconsBG);
_createForm.click(createForm);
_createLabel.click(createFolder);
_create.hover(function () {
	$(".create_form").show();
	$(".create_folder").show();
});
_document.click(function(event){
	if(!_createFolder.is(event.target) && _tip.has(event.target).length === 0 || _createLabel.is(event.target)){
		_tip.hide(250);
	} else {
		_tip.show(250);
	}
});






