var data;

// 展示栏拖拽效果
function saveOrder() {
	data = [];
	console.log($('.preview_list').children().map(function(i, item, arr) {
		data.push($(item).clone());
	}));

};
// $("#preview .preview_list").dragsort({
// 	dragSelector: "div",
// 	dragBetween: false,
// 	dragEnd: saveOrder,
// 	placeHolderTemplate: '<li id="mod"><div class="frame"></div></li>'
// });

// 编辑栏增加DOM元素
$('.mod_add').click(function () {
	$('.preview_list').append($(this).parent().clone().append('<span class="delete"></span><span class="edit"></span>'));
	$('.preview_list .mod_add').remove();
	$('.preview_list .delete').click(function () {
		$(this).parent().remove()
		saveOrder();
	})
	$('.preview_list .edit').click(function () {
		$(this).prev().prev().attr("contenteditable", "true");
		saveOrder();
	})
	saveOrder();
})

$('#preview #mod').click(function() {
	console.log($('body'));
})

// 后台发送保存数据
$('.test').click(function() {
	console.log(data);
	var address = "http://localhost/test.php";
	var datas = {
		name: 'mod01',
		content: data
	}
	$('.output').html(data);
	// $.ajax({
	// 	type: "post",
	// 	url: address,
	// 	data: datas,
	// 	success: function(json){
	// 		console.log(JSON.stringify(json));
	// 		$('.output').html(JSON.stringify(json))
	// 	},
	// 	error: function(){
	// 		alert('fail');
	// 	}
	// });
})



