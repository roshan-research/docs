const fs = require('fs');
var aglio = require('aglio');
function apib_to_html(templateHtml,apibFile,fileName) {

    const folderName = '../html';
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }

    var agliooptions = {
        //theme: 'ONLICAR',
     //   theme: 'otto',
        //theme: 'custom',

        theme: 'slate',

      // // // themeVariables:"triple",

        themeTemplate:"triple",

        // themeVariables:"cyborg",

     //  themeTemplate: './template.jade'
     //   themeStyle:"./mystyle.less",
    };
    let extensionFileName = fileName.split(".").pop();
    fileName = fileName.substring(0,fileName.indexOf("." + extensionFileName));

    aglio.render(apibFile,agliooptions, function (err, html, warnings) {
        if (err) return console.log(err);
        if (warnings) console.log(warnings);

        fs.writeFile("../html/" + fileName + ".html", html, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}
module.exports = apib_to_html;