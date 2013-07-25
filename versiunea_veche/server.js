var url=require("url");
var http = require("http");
var requestHandlers =  require("./requestHandlers");
var text1="";

var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; '+
'charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" method="post">'+
'<textarea name="text" rows="20" cols="60"></textarea>'+
'<input type="submit" value="Vâră textul" />'+
'</form>'+
'</body>'+
    '</html>';

function chtext(text) {
    text1=text;
    console.log(text1);
}

function start(route) {

    function onRequest(request, response) {
	console.log("am primit o cerere");
	var pathname=url.parse(request.url).pathname;
	console.log(request.method);

	var postData = "";                                               
	request.setEncoding("utf8");                                     
	request.addListener("data", function(postDataChunk) {            
		postData += postDataChunk;                               
		console.log("received data chunk" + postDataChunk);      
	    });                                                          
	request.addListener("end", function () {                         
	        requestHandlers.upload(postData);
		route(pathname);
	    });   

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(text1);
	response.end();
    }


http.createServer(onRequest).listen(8885);
console.log("serverul merge");
}
exports.start=start;
exports.chtext=chtext;