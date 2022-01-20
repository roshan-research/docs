var http = require('http');
const fs = require('fs');
const apib_to_json= require('./apib_to_json');
const turnParsedApibToSlateMarkdown = require('./turnParsedApibToSlateMarkdown');
function CreateApibToJSON(){
    fs.readdir("../apib", function (err,files){
        if (err){
            return;
        }
        files.forEach((file) => {
            fs.readFile("../apib/" + file, 'utf8', function (err,data) {
                if (err) {
                    return console.log(err);
                }
                apib_to_json(data,file);
            });
        })
    });
}
// function CreateApibToJSON2(){
//     fs.readdir("../apib", function (err,files){
//         if (err){
//             return;
//         }
//         files.forEach((file) => {
//             if (file === "alefba.apib"){
//                 fs.readFile("../apib/" + file, 'utf8', function (err,data) {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 apib_to_json(data,file);
//                 });
//             }
//         })
//     });
// }
function TurnParsedApibToSlateMarkdown(){
    fs.readdir("../parsedApib", function (err,files){
        if (err){
            return;
        }
        files.forEach((file) => {
            let extensionFile = file.split(".").pop();
            if (extensionFile === "json"){
                fs.readFile("../parsedApib/" + file, 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    turnParsedApibToSlateMarkdown(data,file);
                });
            }
        })
    });

}
// function TurnParsedApibToSlateMarkdown2(){
//     fs.readFile("./newParsed.json", 'utf8', function (err,data) {
//         if (err) {
//             return console.log(err);
//         }
//         turnParsedApibToSlateMarkdown(data,"newParsed.json");
//     });
// }

http.createServer(function (req, res) {
   console.log(req.url);
    if (req.url === "/CreateApibToJson"){
        CreateApibToJSON();
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Create Json Files ');
    }
    else if (req.url === "/TurnParsedApibToSlateMarkdown"){
        TurnParsedApibToSlateMarkdown();
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Made new slate markdown files.');
    }

}).listen(8080);
