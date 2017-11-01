// HTML编码
function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}
// HTML解码
function HTMLDecode(text) { 
    var temp = document.createElement("div"); 
    temp.innerHTML = text; 
    var output = temp.innerText || temp.textContent; 
    temp = null; 
    return output; 
}

// 编辑栏增加DOM元素
$('.mod_add').click(function () {
	$('.preview_list').append($(this).parent().clone().append('<span class="delete"></span><span class="edit"></span>'));
	$('.preview_list .mod_add').remove();
	$('.preview_list .delete').click(function () {
		$(this).parent().remove()
	})
	$('.preview_list .edit').click(function () {
		$(this).prev().prev().attr("contenteditable", "true");
	})
})

// 点击mod进行编辑
// $('#preview #mod').click(function() {
// 	console.log($('body'));
// })

// 后台发送保存数据
$('.test').click(function() {
	var content = $("#preview").clone();
	content.find('.edit').remove();
	content.find('.delete').remove();
    var formatSrc = $.htmlClean(content.html(), {
        format: true,
        allowedAttributes: [
            ["id"],
            ["class"],
            ["src"],
            ["alt"]
        ]
    });
    console.log(formatSrc);
	var address = "http://localhost/test.php";
	var datas = {
		name: 'mod01',
		content: formatSrc
	}
	$.ajax({
		type: "post",
		url: address,
		data: datas,
		success: function(data){
			$('.output').html(data);
		},
		error: function(){
			alert('异步请求失败！');
		}
	});
})





