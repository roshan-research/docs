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

    //fixes for copies on resources as well
    let resources = parsedJson.resources;
    for (let i = 0; i < resources.length; i++) {
        if (resources[i].copies.length !== 0) {
            let splited1 = resources[i].copies[0].split('\n');
            if (splited1.length === 3) {
                parsedJson.resources[i].copies = [splited1[1]];
            }
            let transitions = resources[i].transitions;
            for (let j = 0; j < transitions.length; j++) {
                if (transitions[j].copies.length !== 0) {
                    let splited2 = transitions[j].copies[0].split('\n');
                    console.log(splited2);
                }
            }
        }
    }
    //end

    //writing the new changes to file
    fs.writeFile(
        "../parsedApib/" + fileName,
        JSON.stringify(parsedJson,null,4),
        'utf8',
        function (err) {
        if (err) return console.log(err);
    });
}

module.exports = JSONfixer;
