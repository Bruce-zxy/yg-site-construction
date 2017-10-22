// 展示栏拖拽效果
console.log($("#widget").blur(function () {
	console.log($("#widget"));
	$("#preview div").html($("#widget").text());
}));

$("#preview .preview_list").dragsort({
	dragSelector: "div",
	dragBetween: false,
	dragEnd: saveOrder,
	placeHolderTemplate: "<li class='placeHolder'><div></div></li>" 
});

function saveOrder() {
	var data = $(".preview_list li").map(function() {
		return $(this).children().html();
	}).get();
	$("input[name=list1SortOrder]").val(data.join("|"));
	console.log(data);
};

// 编辑栏增加DOM元素
$('.mod_add').click(function () {
	$('.preview_list').append($(this).parent().clone());
	$('.preview_list .mod_add').remove();
})



