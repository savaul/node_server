var exec = require("child_process").exec;
var server=require("./server");
var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; '+
'charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" method="post">'+
'<textarea name="text" rows="20" cols="60"></textarea>'+
'<input type="submit" value="Submit text" />'+
'</form>'+
'</body>'+
    '</html>';
function start () {
    console.log("a fost activat 'start'");
    server.chtext(body);


}

function upload (postData) {
    console.log("a fost activat 'upload'");

    server.chtext("xxx" + postData);
}
function e404() {
    console.log("a fost activata eroarea 404");
    server.chtext("pagina nu exista");
}
exports.start=start;
exports.upload=upload;
exports.e404=e404;