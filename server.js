var url=require("url");
var http = require("http");

function start(route, handle) {

    function onRequest(request, response) {

	var pathname=url.parse(request.url).pathname;
	console.log("am primit o cerere   " + pathname);
	route (handle, pathname, response, request);

    }


http.createServer(onRequest).listen(8885);
console.log("serverul merge");
}
exports.start=start;
