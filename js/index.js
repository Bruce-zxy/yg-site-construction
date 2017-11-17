!window.btoa ? window.btoa = $.base64.btoa : null
!window.atob ? window.atob = $.base64.atob : null
$.base64.utf8encode = true;
$.base64.utf8decode = true;

$('.dropdown-toggle').next().find('a').click(function () {
    var select = $(this).parent().parent().parent().find('.dropdown-toggle');
    select.html(select.html().replace(select.text(), this.innerText))
    $(this).parent().siblings().removeClass("active");
    $(this).parent().addClass("active");
});

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
$('.mod_add').click(function() {
    $('.preview_list').append($(this).parent().clone().append('<span class="delete"></span><span class="edit"></span>'));
    $('.preview_list .mod_add').remove();
    $('.preview_list .delete').click(function() {
        $(this).parent().remove()
    })
    $('.preview_list .edit').click(function() {
        $(this).prev().prev().attr("contenteditable", "true");
    })
})

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
    var address = "http://localhost/yg-site-construction/test.php";
    var datas = {
        name: 'mod01',
        content: $.base64.btoa(formatSrc)
    }
    $.ajax({
        type: "post",
        url: address,
        data: datas,
        success: function(data) {
            data = JSON.parse(data);
            if(typeof(data) !== 'object') {
                alert('服务器返回参数错误！')
            } else {
                data.content ? $('.output').html($.base64.atob(data.content)) : alert(data.error);
            }
        },
        error: function(a, b) {
            alert('向服务器请求数据失败！');
        }
    });
})


