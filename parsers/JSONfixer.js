const fs = require('fs');
function JSONfixer(jsonText,fileName){
    let parsedJson = JSON.parse(jsonText);
    let oldCopies = parsedJson.copies[0].split('\n');
    let newCopies;
    //deleting div and blockquote from copies property
    if(oldCopies.length === 7) {
        newCopies = [oldCopies[1],'\n\n',oldCopies[5]];
    } else {
        newCopies = oldCopies;
    }
    parsedJson.copies = [newCopies.join()];
    //end

    fs.writeFile(
        "../parsedApib/" + fileName,
        JSON.stringify(parsedJson,null,4),
        'utf8',
        function (err) {
        if (err) return console.log(err);
    });
}

module.exports = JSONfixer;
