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
	var data = $("preview_list li").map(function() {
		return $(this).children().html();
	}).get();
	$("input[name=list1SortOrder]").val(data.join("|"));
};