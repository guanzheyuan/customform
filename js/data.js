$(document).ready(function () {
    loadContent();
});
function loadContent(){
    $.ajax({
        type: 'GET',
        dataType:'json',
        contentType: "application/json;charset=UTF-8",
        url: configJson.loadZWURL.customer+GetQueryString('id'),
        success:function(data){
            if(data){
                var ueditorId = formEditor+"_"+Math.floor(Math.random()*1000);;
                var ueditorHtml = '<div class="lyrow ui-draggable"> <a href="javascript:void(0);" class="remove label label-danger"><i class="glyphicon-remove glyphicon"></i>删除</a><span class="drag label label-default"><i class="glyphicon glyphicon-move"></i> 拖动 </span><div class="preview">表格布局</div><div class="view"><div class="row clearfix"><div class="col-md-12" style="padding:10px;"> <textarea id="'+ueditorId+'" type="text/plain"></textarea></div></div></div> </div>'
                loadUEditor(ueditorId);
                $(".demo").html(ueditorHtml);
                if( '' != data.content){
                    setTimeout(function(){
                        UE.getEditor(ueditorId).setContent(data.content, undefined);
                    },100)
                }
            }
        }
    });
}
function saveCustfrom(){
        var allHtml = "";
        var htmlContent = UE.getEditor('formEditor').getAllHtml();
        var font = htmlContent.substr(0, 12);
        var end = htmlContent.substr(12, htmlContent.length);
        var outFormSubmit = '<script src="/customer/frm/fish-desktop/js/jquery.min.js"></script><script src="/customer/modules/design/views/excute.js"></script>';
        allHtml = font + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' + end + outFormSubmit;
        var content = UE.getEditor('formEditor').getContent();
        if (content == '') {
            fish.info("请编辑表单");
            return;
        }
        var nameList = [];
        for (var i = 0; i < content.length; i++) {
            if (content[i] == 'f' && content[i + 1] == 'i' && content[i + 2] == 'e' && content[i + 3] == 'l' && content[i + 4] == 'd' && content[i + 5] == 'n' && content[i + 6] == 'a' && content[i + 7] == 'm' && content[i + 8] == 'e') {
                var index = content.indexOf('"', i + 11)
                nameList.push(content.substring(i + 11, index))
            }
        }
        /*
        *  表单二：获取各个组件
        */
        //获取ueditor编辑区dom
        var iframDOM = document.getElementById("ueditor_" + fish.iframIndex).contentWindow.document;
        var inputDOM = iframDOM.getElementsByTagName("input");
        this.componentsList = [];
        for (var i = 0; i < inputDOM.length; i++) {
            if (inputDOM[i].type == "text") {
                var textComponent = {
                    fieldname: inputDOM[i].getAttribute("fieldname"),
                    type: inputDOM[i].getAttribute("type"),
                    title: inputDOM[i].getAttribute("title"),
                    value: inputDOM[i].getAttribute("value"),
                    orgalign: inputDOM[i].getAttribute("orgalign"),
                    orgheight: inputDOM[i].getAttribute("orgheight"),
                    orgwidth: inputDOM[i].getAttribute("orgwidth"),
                    orgfontsize: inputDOM[i].getAttribute("orgfontsize"),
                    orgtype: inputDOM[i].getAttribute("orgtype"),
                    regex: inputDOM[i].getAttribute("regex"),
                    isRequired: inputDOM[i].getAttribute("isRequired"),
                    //排序-换行
                    seq: inputDOM[i].getAttribute("seq"),
                    columns: inputDOM[i].getAttribute("columns"),
                    ifReturn: inputDOM[i].getAttribute("ifReturn")
                }
                this.componentsList.push(textComponent);
            } else if (inputDOM[i].type == "radio") {
                for (var j = 0; j < this.componentsList.length; j++) {
                    if (inputDOM[i].getAttribute("name") == this.componentsList[j].fieldname) {
                        this.isHave = true;
                    }
                }
                if (this.isHave) {
                    var valueObj = {
                        checked: inputDOM[i].getAttribute("checked"),
                        radioName: inputDOM[i].getAttribute("radioName"),
                        value: inputDOM[i].getAttribute("value")
                    };
                    this.componentsList[j - 1].valueList.push(valueObj);
                    this.isHave = false;
                } else {
                    var radioComponent = {
                        fieldname: inputDOM[i].getAttribute("name"),
                        type: inputDOM[i].getAttribute("type"),
                        title: inputDOM[i].getAttribute("orgname"),
                        valueList: [{
                            checked: inputDOM[i].getAttribute("checked"),
                            radioName: inputDOM[i].getAttribute("radioName"),
                            value: inputDOM[i].getAttribute("value")
                        }],
                        //排序-换行
                        seq: inputDOM[i].getAttribute("seq"),
                        columns: inputDOM[i].getAttribute("columns"),
                        ifReturn: inputDOM[i].getAttribute("ifReturn")
                    }
                    this.componentsList.push(radioComponent);
                }
            } else if (inputDOM[i].type == "checkbox") {
                for (var j = 0; j < this.componentsList.length; j++) {
                    if (inputDOM[i].getAttribute("name") == this.componentsList[j].fieldname) {
                        this.isHave = true;
                    }
                }
                if (this.isHave) {
                    var valueObj = {
                        checked: inputDOM[i].getAttribute("checked"),
                        checkboxName: inputDOM[i].getAttribute("checkboxName"),
                        value: inputDOM[i].getAttribute("value")
                    };
                    this.componentsList[j - 1].valueList.push(valueObj);
                    this.isHave = false;
                } else {
                    var checkboxNameComponent = {
                        fieldname: inputDOM[i].getAttribute("name"),
                        type: inputDOM[i].getAttribute("type"),
                        title: inputDOM[i].getAttribute("orgname"),
                        valueList: [{
                            checked: inputDOM[i].getAttribute("checked"),
                            checkboxName: inputDOM[i].getAttribute("checkboxName"),
                            value: inputDOM[i].getAttribute("value")
                        }],
                        //排序-换行
                        seq: inputDOM[i].getAttribute("seq"),
                        columns: inputDOM[i].getAttribute("columns"),
                        ifReturn: inputDOM[i].getAttribute("ifReturn")
                    }
                    this.componentsList.push(checkboxNameComponent);
                }
            } else if (inputDOM[i].type == "date" || inputDOM[i].type == "time" || inputDOM[i].type == "datetime-local" || inputDOM[i].type == "month" || inputDOM[i].type == "week") {
                var dateComponent = {
                    fieldname: inputDOM[i].getAttribute("fieldname"),
                    type: inputDOM[i].getAttribute("type"),
                    title: inputDOM[i].getAttribute("orgname"),
                    value: inputDOM[i].getAttribute("value"),
                    //排序-换行
                    seq: inputDOM[i].getAttribute("seq"),
                    columns: inputDOM[i].getAttribute("columns"),
                    ifReturn: inputDOM[i].getAttribute("ifReturn")
                }
                this.componentsList.push(dateComponent);
            }
        }
        var textareaDOM = iframDOM.getElementsByTagName("textarea");
        for (var i = 0; i < textareaDOM.length; i++) {
            var textareaComponent = {
                fieldname: textareaDOM[i].getAttribute("fieldname"),
                type: textareaDOM[i].getAttribute("type"),
                title: textareaDOM[i].getAttribute("title"),
                orgheight: textareaDOM[i].getAttribute("orgheight"),
                orgwidth: textareaDOM[i].getAttribute("orgwidth"),
                orgfontsize: textareaDOM[i].getAttribute("orgfontsize"),
                isRequired: textareaDOM[i].getAttribute("isRequired"),
                //排序-换行
                seq: textareaDOM[i].getAttribute("seq"),
                columns: textareaDOM[i].getAttribute("columns"),
                ifReturn: textareaDOM[i].getAttribute("ifReturn")
            }
            this.componentsList.push(textareaComponent);
        }
        var selectDOM = iframDOM.getElementsByTagName("select");
        for (var i = 0; i < selectDOM.length; i++) {
            this.selectList = [];
            for (var j = 0; j < selectDOM[i].childNodes.length; j++) {
                var seleceObj = {
                    selectName: selectDOM[i].childNodes[j].text,
                    value: selectDOM[i].childNodes[j].value
                }
                this.selectList.push(seleceObj)
            }
            var selectDOMComponent = {
                fieldname: selectDOM[i].getAttribute("fieldname"),
                type: selectDOM[i].getAttribute("type"),
                title: selectDOM[i].getAttribute("title"),
                orgheight: selectDOM[i].getAttribute("orgheight"),
                orgwidth: selectDOM[i].getAttribute("orgwidth"),
                selectList: this.selectList,
                //排序-换行
                seq: selectDOM[i].getAttribute("seq"),
                columns: selectDOM[i].getAttribute("columns"),
                ifReturn: selectDOM[i].getAttribute("ifReturn")
            }
            this.componentsList.push(selectDOMComponent);
        }
        // console.log('componentsList:', this.componentsList)
        var inParam = {
            customerformId: fish.rowdata.id,
            useContent: allHtml,
            content: content,
            objList: this.componentsList
        }
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
