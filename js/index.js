console.log($("#widget").blur(function () {
	console.log($("#widget"));
	$("#preview div").html($("#widget").text());
}));