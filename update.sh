node ./parsers/parser.js make-jsons
node ./parsers/parser.js fix-jsons
node ./parsers/parser.js make-markdowns
cp ./parsedApib/*.md ./slate_project/source


cd slate_project

rm ./source/index.html.md
mv ./source/alefba.json.md ./source/index.html.md
bundle exec middleman build
cp -r * ../docs/alefba


rm ./source/index.html.md
mv ./source/kashf.json.md ./source/index.html.md
bundle exec middleman build
cp -r * ../docs/kashf


rm ./source/index.html.md
mv ./source/baaz.json.md ./source/index.html.md
bundle exec middleman build
cp -r * ../docs/baaz


rm ./source/index.html.md
mv ./source/golrokh.json.md ./source/index.html.md
bundle exec middleman build
cp -r * ../docs/golrokh


rm ./source/index.html.md
mv ./source/harf.json.md ./source/index.html.md
bundle exec middleman build
cp -r * ../docs/harf


rm ./source/index.html.md
mv ./source/naghsh.json.md ./source/index.html.md
bundle exec middleman build
cp -r * ../docs/naghsh


rm ./source/index.html.md
mv ./source/parde.json.md ./source/index.html.md
bundle exec middleman build
cp -r * ../docs/parde

