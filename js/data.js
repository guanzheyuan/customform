var formEditorid = '';
$(document).ready(function () {
    loadContent();
    $(".saveFrom").click(function(){
        var inParam = {
            customerformId: GetQueryString('id'),
            useContent:'',
            content: '',
            objList: []
        }
        var formType = GetQueryString('formType');
        if('UED' == formType){
            if('' != formEditorid){
                var allHtml = "";
                var htmlContent = UE.getEditor(formEditorid).getAllHtml();
                var font = htmlContent.substr(0, 12);
                var end = htmlContent.substr(12, htmlContent.length);
                var outFormSubmit = '<script src="/customer/frm/fish-desktop/js/jquery.min.js"></script><script src="/customer/modules/design/views/excute.js"></script>';
                allHtml = font + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' + end + outFormSubmit;
                inParam.useContent = allHtml;
                var content = UE.getEditor(formEditorid).getContent();
                if (content == '') {
                    alert("请编辑表单");
                    return;
                }
                inParam.content = content;
                var nameList = [];
                for (var i = 0; i < content.length; i++) {
                    if (content[i] == 'f' && content[i + 1] == 'i' && content[i + 2] == 'e' && content[i + 3] == 'l' && content[i + 4] == 'd' && content[i + 5] == 'n' && content[i + 6] == 'a' && content[i + 7] == 'm' && content[i + 8] == 'e') {
                        var index = content.indexOf('"', i + 11)
                        nameList.push(content.substring(i + 11, index))
                    }
                }
                var $content = strimgTurnDom(content);
                var inputDom = $content.querySelectorAll('input[type=text]');
                this.componentsList = [];
                if(inputDom.length > 0){
                    for(var i  = 0;i<inputDom.length;i++){
                        var textComponent = {
                            fieldname: inputDom[i].getAttribute("fieldname"),
                            type: inputDom[i].getAttribute("type"),
                            title: inputDom[i].getAttribute("title"),
                            value: inputDom[i].getAttribute("value"),
                            orgalign: inputDom[i].getAttribute("orgalign"),
                            orgheight: inputDom[i].getAttribute("orgheight"),
                            orgwidth: inputDom[i].getAttribute("orgwidth"),
                            orgfontsize: inputDom[i].getAttribute("orgfontsize"),
                            orgtype: inputDom[i].getAttribute("orgtype"),
                            regex: inputDom[i].getAttribute("regex"),
                            isRequired: inputDom[i].getAttribute("isRequired"),
                            //排序-换行
                            seq: inputDom[i].getAttribute("seq"),
                            columns: inputDom[i].getAttribute("columns"),
                            ifReturn: inputDom[i].getAttribute("ifReturn")
                        }
                        this.componentsList.push(textComponent);
                    }
                }
                var selectDom = $content.querySelectorAll('select');
                if(selectDom.length > 0){
                    
                }
                var textareaDom = $content.querySelectorAll('textarea');
                if(textareaDom.length > 0){
                    for (var i = 0; i < textareaDom.length; i++) {
                        var textareaComponent = {
                            fieldname: textareaDom[i].getAttribute("fieldname"),
                            type: textareaDom[i].getAttribute("type"),
                            title: textareaDom[i].getAttribute("title"),
                            orgheight: textareaDom[i].getAttribute("orgheight"),
                            orgwidth: textareaDom[i].getAttribute("orgwidth"),
                            orgfontsize: textareaDom[i].getAttribute("orgfontsize"),
                            isRequired: textareaDom[i].getAttribute("isRequired"),
                            //排序-换行
                            seq: textareaDom[i].getAttribute("seq"),
                            columns: textareaDom[i].getAttribute("columns"),
                            ifReturn: textareaDom[i].getAttribute("ifReturn")
                        }
                        this.componentsList.push(textareaComponent);
                    }
                }
                inParam.objList = this.componentsList;
                // $.ajax({
                //     type: 'POST',
                //     dataType:'json',
                //     contentType: "application/json;charset=UTF-8",
                //     url: configJson.loadZWURL.saveCustomer,
                //     data: JSON.stringify(inParam),
                //     success:function(data){
                //         console.log('data',data);
                //         if(data){
                //             if('A' == data.state.code){
                //                 alert('保存成功');
                //             }
                //         }else{
                //             alert('保存失败！');
                //         }
                //     },
                // 　complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                // 　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
                // 　　　　　  alert("超时!");
                // 　　　　}
                // 　　}
                // });
            }else{
                alert("请选择编辑表单");
                return;
            }
        }else if('UEG' == formType){
            var UEG = GetQueryString('UEG');
            var content  = $(".demo").html();
            downloadLayoutSrc();
            loadJson();
            var formId  = UEG.split('&')[0];
            var dirId = UEG.split('&')[1];
            inParam.useContent = layoutHtml;
            inParam.content = content;
            var Json = window.toJson;
            if(Json.length == 0){
                alert('解析JSON失败！');
                return;
            }
            Json.formId = formId;
            $.ajax({
                type: 'POST',
                dataType:'JSON',
                contentType: "application/json;charset=UTF-8",
                url: configJson.loadJJURl.updateForm,
                data: JSON.stringify(Json),
                success:function(data){
                    console.log('data',data);
                },
                beforeSend: function(xhr) {
                    xhr.seth
                },
            　  complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
            　　　　　  alert("超时!");
            　　　　}
            　　}
            });
        }
        $.ajax({
            type: 'POST',
            dataType:'json',
            contentType: "application/json;charset=UTF-8",
            url: configJson.loadZWURL.saveCustomer,
            data: JSON.stringify(inParam),
            success:function(data){
                console.log('data',data);
                if(data){
                    if('A' == data.state.code){
                        alert('保存成功');
                    }
                }else{
                    alert('保存失败！');
                }
            },
        　complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
        　　　　　  alert("超时!");
        　　　　}
        　　}
        });
    });
});
function loadContent(){
    var formType = GetQueryString('formType');
    if('UED' == formType){
        $(".grid-layout").css("display","none");
        $(".table-drag").css("display","none");
        $.ajax({
            type: 'GET',
            dataType:'json',
            contentType: "application/json;charset=UTF-8",
            async:true,
            url: configJson.loadZWURL.customer+GetQueryString('id'),
            success:function(data){
                if(data){
                    var ueditorId = formEditor+"_"+Math.floor(Math.random()*1000);;
                    var ueditorHtml = '<div class="lyrow ui-draggable"><div class="preview">表格布局</div><div class="view"><div class="row clearfix"><div class="col-md-12" style="padding:10px;"> <textarea id="'+ueditorId+'" type="text/plain"></textarea></div></div></div> </div>'
                    loadUEditor(ueditorId);
                    UEditorAddListener(ueditorId);
                    window.UEditorId = ueditorId;
                    $(".demo").html(ueditorHtml);
                    formEditorid = ueditorId;
                    if( '' != data.content){
                        setTimeout(function(){
                            UE.getEditor(ueditorId).setContent(data.content, undefined);
                        },100)
                    }
                }else{
                    $(".table-drag").css("display","block");
                }
            },
        　  complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
        　　　　　  alert("超时!");
        　　　　}
        　　}
        });
    }else if('UEG' == formType){
        $(".table-layout").css("display","none");
        $.ajax({
            type: 'GET',
            dataType:'json',
            contentType: "application/json;charset=UTF-8",
            async:true,
            url: configJson.loadZWURL.customer+GetQueryString('id'),
            success:function(data){
                if(data){
                    console.log(data);
                    if( '' != data.content){
                        $(".demo").html(data.content);
                    }
                }else{
                    $(".table-drag").css("display","block");
                }
            },
        　  complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        　　　　if(status=='timeout'){//超时,status还有success,error等值的情况
        　　　　　  alert("超时!");
        　　　　}
        　　}
        });
    }
    var $demo = $(".demo");
    var labelArr = [];
    $demo.find('label').each(function(e){
        if(undefined != $(this).attr('id') && undefined != $(this).attr('title')){
            optionMap = {value:'',text:''};
            optionHtml +='<option value="'+$(this).attr('id')+'" >'+$(this).attr('title')+'</option>';
            optionMap.value = $(this).attr('id');
            optionMap.text = $(this).attr('title');
            labelArr.push(optionMap);
        }
    });
    window.labelArr = labelArr;
}

function GetQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
