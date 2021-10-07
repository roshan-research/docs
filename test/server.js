var http = require('http');
const fs = require('fs');
const apib_to_html = require('./apib_to_html');
function CreateApibToHtmls(){
    let templateHtml = fs.readFileSync("../templates/custom_template.html" ,{encoding:'utf-8'});
    let oneApib = fs.readFileSync("./alefba.apib" ,{encoding:'utf-8'});
    apib_to_html(templateHtml,oneApib);
}
http.createServer(function (req, res) {
   // console.log(req.url);
    if (req.url === "/CreateApibToHtmls"){
        CreateApibToHtmls();
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello World!');
    }

}).listen(8080);