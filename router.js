
function route(handle, pathname, response, postData) {
    console.log(pathname + " de routat");

    if (typeof handle[pathname] === 'function') {
	return handle[pathname](response, postData);
    }
    //    else {
    //	console.log ("nu exista linkul "+ pathname);
    //	response.writeHead(404, {"Content-Type": "text/plain"});
    //	response.write("404 Not found");
    //	response.end();
    //    }

}
exports.route=route;