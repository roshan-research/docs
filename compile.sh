node ./parsers/parser.js make-jsons
echo 'made JSON files from apib files';
node ./parsers/parser.js fix-jsons
echo 'fixed the flaws in created JSON files';
node ./parsers/parser.js make-markdowns
echo 'made markdown files from JSON files'
cp ./parsedApib/*.md ./slate_project/source
echo 'copied all markdown files to the slate_project folder'