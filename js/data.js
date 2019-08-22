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
            console.log(data);
        }
    });
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
