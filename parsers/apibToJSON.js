var drafter = require('drafter.js')

const fileSystem = require('fs')

let alefbaAPIblueprint = fileSystem.readFileSync('../apib/alefba.apib', 'utf8');

console.log(alefbaAPIblueprint);

var res = drafter.parse(alefbaAPIblueprint, {generateSourceMap: true}, function (err, res) {
    if (err) {
        console.log(err)
    }
    console.log(res);
});