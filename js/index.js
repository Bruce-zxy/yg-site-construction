!window.btoa ? window.btoa = $.base64.btoa : null
!window.atob ? window.atob = $.base64.atob : null
$.base64.utf8encode = true;
$.base64.utf8decode = true;

var host = "117.169.87.75";
var port = ":8010"
var address = "http://" + host + port + "/edit";
var addressImg = "http://" + host + port + "/imgList";

var addrAddPage = "http://117.169.87.75:8010/api/FilesSystem/Add"
var addrAddContent = "http://117.169.87.75:8010/api/SitesConstruction/Add";
var addrGetContent = "http://117.169.87.75:8010/api/SitesConstruction/GetDetailParent_Folder";
var addrUpdateContent = "http://117.169.87.75:8010/api/SitesConstruction/Update";
var addrGetImg = "http://117.169.87.75:8010/api/File/GetFileList";



var url = location.search;
var Request = new Object();
var currentDocument = null;
var timerSave = 1000;
var stopsave = 0;
var startdrag = 0;
var demoHtml = $(".demo").html();
var currenteditor = null;
var layoutName = null;
var layoutId = "";
var parentFolder = "";
var pageId = ""
var imgList = [];


(function () {
    if (url.indexOf("?") != -1) {　　
        var str = url.substr(1)　 //去掉?号
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++)　　 {
            Request[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);　　
        }
    }
    if(Request["id"]) {
        layoutId = Request["id"];
        getContent(layoutId);
    }
    if(Request["parent_folder"]) {
        parentFolder = Request["parent_folder"];
    }
})();
function getContent(pageName) {
    $.ajax({
        type: "post",
        url: addrGetContent,
        headers: { "Token": "4d22a809-4cbc-4dba-883f-89fad80318fa" },
        data: { Id: layoutId },
        success: function(data) {
            if(typeof(data) !== 'object') {
                alert('服务器返回参数错误！')
            } else {
                console.log('打开页面获取的内容：');
                console.log(data);
                $(".demo").html($.base64.atob(data.Data.Content_Origin));
                initContainer();
                imgClick();
            }
        },
        error: function(a, b) {
            alert('向服务器请求数据失败！');
        }
    });
}

function handleSaveLayout() {
    var e = $(".demo").html();
    if (!stopsave && e != window.demoHtml) {
        stopsave++;
        // 在window对象中存储当前编辑页面
        window.demoHtml = e;
        saveLayout();
        stopsave--;
    }
}

// 检验是否支持本地存储
function supportstorage() {
    if (typeof window.localStorage == 'object')
        return true;
    else
        return false;
}

// 重新读取Layout数据
function restoreData() {
    if (supportstorage()) {
        layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
        if (!layouthistory) return false;
        window.demoHtml = layouthistory.list[layouthistory.count - 1];
        if (window.demoHtml) $(".demo").html(window.demoHtml);
    }
}

// 界面初始化
function initContainer() {
    $(".demo, .demo .column").sortable({
        connectWith: ".column",
        opacity: .35,
        handle: ".drag",
        start: function(e, t) {
            if (!startdrag) stopsave++;
            startdrag = 1;
        },
        stop: function(e, t) {
            if (stopsave > 0) stopsave--;
            startdrag = 0;
        }
    });
    $(".demo .column").sortable({
        opacity: .35,
        connectWith: ".column",
        start: function(e, t) {
            if (!startdrag) stopsave++;
            startdrag = 1;
        },
        stop: function(e, t) {
            if (stopsave > 0) stopsave--;
            startdrag = 0;
        }
    });
    
    configurationElm();
}

// 控件Configuration事件
function configurationElm(e, t) {
    $(".demo").delegate(".configuration > a", "click", function(e) {
        e.preventDefault();
        var t = $(this).parent().next().next().children();
        $(this).toggleClass("active");
        t.toggleClass($(this).attr("rel"))
    });
    $(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
        e.preventDefault();
        var t = $(this).parent().parent();
        var n = t.parent().parent().next().next().children();
        t.find("li").removeClass("active");
        $(this).parent().addClass("active");
        var r = "";
        t.find("a").each(function() {
            r += $(this).attr("rel") + " "
        });
        t.parent().removeClass("open");
        n.removeClass(r);
        n.addClass($(this).attr("rel"))
    })
}

// 控件移除
function removeElm() {
    $(".demo").delegate(".remove", "click", function(e) {
        e.preventDefault();
        $(this).parent().remove();
        if (!$(".demo .lyrow").length > 0) {
            clearDemo()
        }
    })
}

// 预览部分生成栅格布局
function gridSystemGenerator() {
    $(".lyrow .preview input").bind("keyup", function() {
        var e = 0;
        var t = "";
        var n = $(this).val().split(" ", 12);
        $.each(n, function(n, r) {
            e = e + parseInt(r);
            t += '<div class="span' + r + ' column"></div>'
        });
        if (e == 12) {
            $(this).parent().next().children().html(t);
            $(this).parent().prev().show()
        } else {
            $(this).parent().prev().hide()
        }
    })
}

// 保存布局
function saveLayout() {
    var data = layouthistory;
    if (!data) {
        data = {};
        data.count = 0;
        data.list = [];
    }
    if (data.list.length > data.count) {
        for (i = data.count; i < data.list.length; i++)
            data.list[i] = null;
    }
    data.list[data.count] = window.demoHtml;
    data.count++;
    if (supportstorage()) {
        localStorage.setItem("layoutdata", JSON.stringify(data));
    }
    layouthistory = data;
}

function handleJsIds() {
    handleModalIds();
    handleAccordionIds();
    handleCarouselIds();
    handleTabsIds()
}
function handleModalIds() {
    var e = $(".demo #myModalLink");
    var t = randomNumber();
    var n = "modal-container-" + t;
    var r = "modal-" + t;
    e.attr("id", r);
    e.attr("href", "#" + n);
    e.next().attr("id", n)
}
function handleAccordionIds() {
    var e = $(".demo #myAccordion");
    var t = randomNumber();
    var n = "accordion-" + t;
    var r;
    e.attr("id", n);
    e.find(".accordion-group").each(function(e, t) {
        r = "accordion-element-" + randomNumber();
        $(t).find(".accordion-toggle").each(function(e, t) {
            $(t).attr("data-parent", "#" + n);
            $(t).attr("href", "#" + r)
        });
        $(t).find(".accordion-body").each(function(e, t) {
            $(t).attr("id", r)
        })
    })
}
function handleCarouselIds() {
    var e = $(".demo #myCarousel");
    var t = randomNumber();
    var n = "carousel-" + t;
    e.attr("id", n);
    e.find(".carousel-indicators li").each(function(e, t) {
        $(t).attr("data-target", "#" + n)
    });
    e.find(".left").attr("href", "#" + n);
    e.find(".right").attr("href", "#" + n)
}
function handleTabsIds() {
    var e = $(".demo #myTabs");
    var t = randomNumber();
    var n = "tabs-" + t;
    e.attr("id", n);
    e.find(".tab-pane").each(function(e, t) {
        var n = $(t).attr("id");
        var r = "panel-" + randomNumber();
        $(t).attr("id", r);
        $(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
    })
}

function randomNumber() {
    return randomFromInterval(1, 1e6)
}

function randomFromInterval(e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e)
}

function clearDemo() {
    $(".demo").empty();
    layouthistory = null;
    if (supportstorage())
        localStorage.removeItem("layoutdata");
}

function removeMenuClasses() {
    $("#menu-layoutit li button").removeClass("active")
}

function changeStructure(e, t) {
    $("#download-layout ." + e).removeClass(e).addClass(t)
}

function cleanHtml(e) {
    $(e).parent().append($(e).children().html())
}

function downloadLayoutSrc() {
    var e = "";
    $("#download-layout").children().html($(".demo").html());
    var t = $("#download-layout").children();
    var tHTML = $(".demo").html();
    t.find(".preview, .configuration, .drag, .remove").remove();
    t.find(".lyrow").addClass("removeClean");
    t.find(".box-element").addClass("removeClean");
    t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function() {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .lyrow .removeClean").each(function() {
        cleanHtml(this)
    });
    t.find(".lyrow .lyrow .removeClean").each(function() {
        cleanHtml(this)
    });
    t.find(".lyrow .removeClean").each(function() {
        cleanHtml(this)
    });
    t.find(".removeClean").each(function() {
        cleanHtml(this)
    });
    t.find(".removeClean").remove();
    $("#download-layout .column").removeClass("ui-sortable");
    $("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
    if ($("#download-layout .container").length > 0) {
        changeStructure("row-fluid", "row")
    }
    formatSrc = $.htmlClean($("#download-layout").html(), {
        format: true,
        allowedAttributes: [
            ["id"],
            ["class"],
            ["data-toggle"],
            ["data-target"],
            ["data-parent"],
            ["role"],
            ["data-dismiss"],
            ["aria-labelledby"],
            ["aria-hidden"],
            ["data-slide-to"],
            ["data-slide"]
        ]
    });
    $("#download-layout").html(formatSrc);
    $("#downloadModal textarea").empty();
    $("#downloadModal textarea").val(formatSrc);
    return [formatSrc, tHTML];
}

function undoLayout() {
    var data = layouthistory;
    //console.log(data);
    if (data) {
        if (data.count < 2) return false;
        window.demoHtml = data.list[data.count - 2];
        data.count--;
        $('.demo').html(window.demoHtml);
        if (supportstorage()) {
            localStorage.setItem("layoutdata", JSON.stringify(data));
        }
        return true;
    }
    return false;
    /*$.ajax({  
        type: "POST",  
        url: "/build/getPreviousLayout",  
        data: { },  
        success: function(data) {
            undoOperation(data);
        }
    });*/
}

function redoLayout() {
    var data = layouthistory;
    if (data) {
        if (data.list[data.count]) {
            window.demoHtml = data.list[data.count];
            data.count++;
            $('.demo').html(window.demoHtml);
            if (supportstorage()) {
                localStorage.setItem("layoutdata", JSON.stringify(data));
            }
            return true;
        }
    }
    return false;
    /*
    $.ajax({  
        type: "POST",  
        url: "/build/getPreviousLayout",  
        data: { },  
        success: function(data) {
            redoOperation(data);
        }
    });*/
}

(function () {
    $.ajax({
        type: "post",
        url: addrGetImg,
        headers: { "Token": "4d22a809-4cbc-4dba-883f-89fad80318fa" },
        dataType:"json",
        success: function(data) {
            imgs = data.Data;
            console.log(imgs);
            var docfrag = document.createDocumentFragment();
            for (i in imgs) {
                var LI1 = document.createElement('li');
                LI1.className = "";
                var A1 = document.createElement('a');
                A1.href = "#";
                A1.rel = imgs[i];
                A1.textContent = imgs[i].split("/")[5];
                LI1.appendChild(A1);
                docfrag.appendChild(LI1);
                $('ul[data-rol=img_click]').append(docfrag);
                imgList.push(imgs[i].name);
            }
            imgClick();
        },
        error: function(a, b) {
            alert('向服务器请求数据失败！');
        }
    });
})();

function imgClick() {
    $('ul[data-rol=img_click] li a').click(function () {
        $(this).parent().parent().parent().parent().parent().find('img').attr('src', this.getAttribute("rel"));
    });
}

$(document).ready(function() {
    CKEDITOR.disableAutoInline = true;
    restoreData();
    var contenthandle = CKEDITOR.replace('contenteditor', {
        language: 'zh-cn',
        contentsCss: ['css/bootstrap-combined.min.css'],
        allowedContent: true
    });
    layoutId ? $(".mask").css("display", "none") : null;
    $(".saveLayoutName").click(function () {
        layoutName = $(this).prev().val();
        var date = new Date().getTime();
        var datas = {
            Name: layoutName,
            Type: "page",
            Parent_Folder: parentFolder,
            CreatorTime: date,
            Classify: 'color-'+Math.floor(Math.random()*6)+',icon-user'
        }
        $.ajax({
            type: "POST",
            headers: { "Token": "4d22a809-4cbc-4dba-883f-89fad80318fa", "Content-Type": "application/json" },
            url: addrAddContent,
            data: JSON.stringify(datas),
            success: function(data) {
                if(typeof(data) !== 'object') {
                    alert('服务器返回参数错误！')
                } else {
                    layoutId = data.Data;
                    $.ajax({
                        type: "POST",
                        headers: { "Token": "4d22a809-4cbc-4dba-883f-89fad80318fa", "Content-Type": "application/json" },
                        url: addrAddPage,
                        data: JSON.stringify({
                            Name: layoutName,
                            Type: "page",
                            id: layoutId,
                            Parent_Folder: parentFolder,
                            CreatorTime: date,
                            Classify: 'color-'+Math.floor(Math.random()*6)+',icon-user'
                        }),
                        success: function(data) {
                            if(typeof(data) !== 'object') {
                                alert('服务器返回参数错误！')
                            } else {
                                layoutId = data.Data;
                                console.log(data);
                            }
                        },
                        error: function(a, b) {
                            alert('向服务器请求数据失败！');
                        }
                    });
                }
            },
            error: function(a, b) {
                alert('向服务器请求数据失败！');
            }
        });
        $(".mask").css("display", "none");
    })
    $("body").css("min-height", $(window).height() - 90);
    $(".demo").css("min-height", $(window).height() - 160);
    $(".sidebar-nav .lyrow").draggable({
        connectToSortable: ".demo",
        helper: "clone",
        handle: ".drag",
        start: function(e, t) {
            if (!startdrag) stopsave++;
            startdrag = 1;
        },
        drag: function(e, t) {
            t.helper.width(400)
        },
        stop: function(e, t) {
            $(".demo .column").sortable({
                opacity: .35,
                connectWith: ".column",
                start: function(e, t) {
                    if (!startdrag) stopsave++;
                    startdrag = 1;
                },
                stop: function(e, t) {
                    if (stopsave > 0) stopsave--;
                    startdrag = 0;
                }
            });
            if (stopsave > 0) stopsave--;
            startdrag = 0;
        }
    });
    $(".sidebar-nav .box").draggable({
        connectToSortable: ".column",
        helper: "clone",
        handle: ".drag",
        start: function(e, t) {
            if (!startdrag) stopsave++;
            startdrag = 1;
        },
        drag: function(e, t) {
            t.helper.width(400)
        },
        stop: function() {
            handleJsIds();
            if (stopsave > 0) stopsave--;
            startdrag = 0;
            console.log(this);
            imgClick();
        }
    });
    initContainer();
    imgClick();
    $('body.edit .demo').on("click", "[data-target=#editorModal]", function(e) {
        e.preventDefault();
        currenteditor = $(this).parent().parent().find('.view');
        var eText = currenteditor.html();
        contenthandle.setData(eText);
    });
    $("#savecontent").click(function(e) {
        e.preventDefault();
        currenteditor.html(contenthandle.getData());
    });
    $("[data-target=#downloadModal]").click(function(e) {
        e.preventDefault();
        downloadLayoutSrc();
    });
    $("[data-target=#shareModal]").click(function(e) {
        e.preventDefault();
        console.log(layoutName);
        var date = new Date().getTime();
        var datas = {
            Name: layoutName,
            Content: $.base64.btoa(downloadLayoutSrc()[0]),
            Content_Origin: $.base64.btoa(downloadLayoutSrc()[1]),
            Id: layoutId,
            Parent_Folder: parentFolder,
            CreatorTime: date,
            Classify: 'color-'+Math.floor(Math.random()*6)+',icon-user'
        }
        console.log(datas);
        $.ajax({
            type: "post",
            url: addrUpdateContent,
            data: datas,
            headers: { "Token": "4d22a809-4cbc-4dba-883f-89fad80318fa" },            
            success: function(data) {
                if(typeof(data) !== 'object') {
                    alert('服务器返回参数错误！')
                } else {
                    // data.content ? $('.output').html($.base64.atob(data.content)) : alert(data.error);
                    // console.log(data.content ? data.content : data.error);
                    console.log('保存页面获取的内容：');
                    console.log(data);
                }
            },
            error: function(a, b) {
                alert('向服务器请求数据失败！');
            }
        });
        handleSaveLayout();
    });
    $("[data-target=#layoutModal]").click(function(e) {
        e.preventDefault();
        handleSaveLayout();
        var date = new Date().getTime();
        var datas = {
            Name: layoutName,
            Id: layoutId,
            Content: $.base64.btoa(downloadLayoutSrc()[0]),
            Content_Origin: $.base64.btoa(downloadLayoutSrc()[1]),
            Parent_Folder: parentFolder,
            CreatorTime: date,
            Classify: 'color-'+Math.floor(Math.random()*5 + 1)+',icon-user'
        }
        $.ajax({
            type: "post",
            headers: { "Token": "4d22a809-4cbc-4dba-883f-89fad80318fa", "Content-Type": "application/json" },            url: addrUpdateContent,
            data: JSON.stringify(datas),
            success: function(data) {
                if(typeof(data) !== 'object') {
                    alert('服务器返回参数错误！')
                } else {
                    window.location.href = "./test.html?name="+layoutName;
                }
            },
            error: function(a, b) {
                alert('向服务器请求数据失败！');
            }
        });
    });
    $("#download").click(function() {
        downloadLayout();
        return false
    });
    $("#downloadhtml").click(function() {
        downloadHtmlLayout();
        return false
    });
    $("#edit").click(function() {
        $("body").removeClass("devpreview sourcepreview");
        $("body").addClass("edit");
        removeMenuClasses();
        $(this).addClass("active");
        return false
    });
    $("#clear").click(function(e) {
        e.preventDefault();
        clearDemo()
    });
    $("#devpreview").click(function() {
        $("body").removeClass("edit sourcepreview");
        $("body").addClass("devpreview");
        removeMenuClasses();
        $(this).addClass("active");
        return false
    });
    $("#sourcepreview").click(function() {
        $("body").removeClass("edit");
        $("body").addClass("devpreview sourcepreview");
        removeMenuClasses();
        $(this).addClass("active");
        return false
    });
    $("#fluidPage").click(function(e) {
        e.preventDefault();
        changeStructure("container", "container-fluid");
        $("#fixedPage").removeClass("active");
        $(this).addClass("active");
        downloadLayoutSrc()
    });
    $("#fixedPage").click(function(e) {
        e.preventDefault();
        changeStructure("container-fluid", "container");
        $("#fluidPage").removeClass("active");
        $(this).addClass("active");
        downloadLayoutSrc()
    });
    $(".nav-header").click(function() {
        $(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
        $(this).next().slideDown()
    });
    $('#undo').click(function() {
        stopsave++;
        if (undoLayout()) initContainer();
        stopsave--;
    });
    $('#redo').click(function() {
        stopsave++;
        if (redoLayout()) initContainer();
        stopsave--;
    });
    removeElm();
    gridSystemGenerator();
    setInterval(function() {
        handleSaveLayout()
    }, timerSave)
})

