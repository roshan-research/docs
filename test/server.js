var http = require('http');
const fs = require('fs');
const apib_to_html = require('./apib_to_html');
const apib_to_html2 = require('./apib_to_html2');
function CreateApibToHtmls(){
    let templateHtml = fs.readFileSync("../templates/custom_template.html" ,{encoding:'utf-8'});
   // let oneApib = fs.readFileSync("./alefba.apib" ,{encoding:'utf-8'});

    fs.readdir("../apib", function (err,files){
        if (err){
            return;
        }
        files.forEach((file) => {
            fs.readFile("../apib/" + file, 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                //apib_to_html(templateHtml,data,file);
                apib_to_html2(templateHtml,data,file);
            });
        })
    });



}
http.createServer(function (req, res) {
   // console.log(req.url);
    if (req.url === "/CreateApibToHtmls"){
        CreateApibToHtmls();
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello World!');
    }

}).listen(8080);