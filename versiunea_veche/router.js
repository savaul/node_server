var requestHandlers = require("./requestHandlers");


function route(pathname) {
    console.log(pathname + " de routat");
    if (pathname==="/start"){
	requestHandlers.start();
    } else if (pathname==="/upload") {
	requestHandlers.upload()
	    }else {
	requestHandlers.e404();
    }

}
exports.route=route;