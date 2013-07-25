var url = require("url");
var qs = require("querystring");
fs = require ("fs");
formidable = require("formidable");
mime = require("mime");
var exec = require("child_process").exec;
var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" '+
'content="text/html; charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" enctype="multipart/form-data" '+
'method="post">'+
'<input type="file" name="upload">'+
'<input type="submit" value="Upload file" />'+
'</form>'+
'</body>'+
    '</html>';


function start(response, request) {
    console.log("Request handler 'start' was called.");

	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write(body);
	    response.end();
}


function upload (response, request) {
    console.log("a fost activat 'upload'");
    var form = new formidable.IncomingForm();
    console.log("uploading");
    form.parse(request, function(error, fields, files) {
	    console.log ("parsed");

	    if (error) {
		response.writeHead (500, {"Content-Type": "text/plain"});
		response.end ("eroororr" + error+"/n");
		return;
	    }

	                fs.renameSync( files.upload.path, "depozit/" + files.upload.name ); // Update the streamed filename with it's original filename                   

	    //            image = ("depozit/"+files.upload.name);

	   exec("ls -1 depozit>~/node_savaul/listing.txt", function (error, stdout, stdin) {
		   exec ("bash toHtml.sh", function (error, stdout, stdin) { 
			   content = fs.readFileSync('html.txt', 'utf8');
		     
		   response.writeHead( 200, { "Content-Type" : "text/html" } );

		    response.write(   '<html>'+
                              '<head>'+
                              '<meta http-equiv="Content-Type" '+
                              'content="text/html; charset=UTF-8" />'+
                              '</head>'+
                              '<body>'+
                              '<p>'+'received image'+ '</p>'+
			      content+                            
			      '<form method="link" action="/start">'+
                              '<input type="submit" value="Load another?">'+
                              '</form>'+
                              '</body>'+
                              '</html>'
				      );
		    response.end();
		   console.log(content);
		       });
		    
	       });

	});
};


function show (response, request) {
    console.log("a fost activat 'muje'");
   imagine= qs.parse(url.parse(request.url).query).query
    console.log(imagine);

   delete_all_='<!DOCTYPE html PUBLIC>'+
       '<head>'+
       '<body>'+
       '<form id = "form1" action= "sterge" method="post" name="form1">'+
       '<input id="delete_all" type="submit" value="Delete_all" name="delete_all"></input>'+
       '</form>'+
       '</body>'+
       '</html>';



    //    var image = qs.parse( url.parse( request.url ).query ).i; // Parse out the query string variable
   image = ("depozit/"+imagine);
    if( !image ) { // Make sure we have a value
        response.writeHead( 500, { "Content-Type" : "text/plain" } );
        response.end( " No Image in QueryString ");
        return;
    }

    fs.readFile( image, "binary", function( error, file ) {
	    var type = "";

	    if( error ){
		response.writeHead( 500, { "Content-Type" : "text/plain" } );
		response.end( error + "\n" );
		return;
	    }
                
	    //	    page ='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
	    //'<html xmlns="http://www.w3.org/1999/xhtml">'+
	    //'<head>'+
	    //'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
	    //'<title>Untitled Document</title>'+
	    //'</head>'+

	    //'<body>'+
	    //'<p>Show</p>'+
	    //'<p><img src="'+'198.89.116.100:8885/node_savaul/depozit/01-04t.jpg'+' " alt="" name="placeholder" id="placeholder" style="background-color: #0066CC" /></p>'+
	    //'<p> <image, "binary") </p>'+
	    //'<form id="form1" name="form1" method="post" action="">'+
	    //'  <INPUT Type="button" VALUE="Back" onClick="history.go(-1);return true;"/>'+
	    //'  <input type="button" name="delete_all" id="delete_all" value="Delete_all" />'+
	    //'</form>'+
	    //'<form id="form2" name="form2" method="post" action="">'+
	    //'</form>'+
	    //'</body>'+
	    //		'</html>';

	    type = mime.lookup( file );
	    console.log (type);
	    response.writeHead( 200, { "Content-Type" :"text/html" } );
	    response.write (delete_all_);
	    response.end();

	});

};

function sterge(response, request) {
    exec ('rm depozit/*');
    response.writeHead( 200, { "Content-Type" : "text/html" } );

    response.write(   '<html>'+
                              '<head>'+
                              '<meta http-equiv="Content-Type" '+
                              'content="text/html; charset=UTF-8" />'+
                              '</head>'+
                              '<body>'+
                              '<p>'+'toate fisierele au fost sterse'+ '</p>'+
                              '<form method="link" action="/start">'+
                              '<input type="submit" value="Load another?">'+
                              '</form>'+
                              '</body>'+
                              '</html>'
		      );
    response.end();



};


exports.start=start;
exports.upload=upload;
exports.show=show;
exports.sterge=sterge;