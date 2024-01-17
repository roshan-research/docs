const fs = require('fs');

let folderNames = ['alefba','baaz','golrokh','harf','kashf','naghsh','parde',"replai"];

let scrollingCode = fs.readFileSync("scrolling.js",'utf8',() => {});

folderNames.forEach((folderName) => {
    fs.appendFileSync(`docs/${folderName}/index.html`,scrollingCode);
})