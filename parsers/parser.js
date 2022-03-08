const fs = require('fs');
var http = require('http');
const apib_to_json= require('./apib_to_json');
const JSONfixer = require('./JSONfixer');
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

const fixJSONproblems = () => {
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
                    JSONfixer(data,file);
                });
            }
        })
    });
}

let command = process.argv[2];

if (command === "make-jsons"){
    CreateApibToJSON();
    console.log('made json files');
} else if (command === "make-markdowns"){
    TurnParsedApibToSlateMarkdown();
    console.log('made markdowns');
} else if (command === "fix-jsons") {
    fixJSONproblems();
    console.log('fixed json files');
}


// http.createServer(function (req, res) {
//     if (req.url === "/CreateApibToJson"){
//         CreateApibToJSON();
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('Created Json Files');
//     }
//     else if (req.url === "/TurnParsedApibToSlateMarkdown"){
//         TurnParsedApibToSlateMarkdown();
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('Made new slate markdown files.');
//     } else if (req.url === "/FixJson") {
//         fixJSONproblems();
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('Fixed Json Files');
//     }

// }).listen(8080);