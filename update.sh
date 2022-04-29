set -e

echo 'RUN THE SCRIPT AS SUPER USER'

cd ./parsers

node parser.js make-jsons
echo 'made JSON files from apib files';
# node ./parsers/parser.js fix-jsons
# echo 'fixed the flaws in created JSON files';
node parser.js make-markdowns
echo 'made markdown files from JSON files'
cd ..
cp ./parsedApib/*.md ./slate_project/source
echo 'copied all markdown files to the slate_project folder'

cd ./slate_project

rm ./source/index.html.md
mv ./source/alefba.json.md ./source/index.html.md
bundle exec middleman build
rm -r ../docs/alefba/*
cp -r ./build/* ../docs/alefba
echo 'alebfa documentations are updated'


rm ./source/index.html.md
mv ./source/kashf.json.md ./source/index.html.md
bundle exec middleman build
rm -r ../docs/kashf/*
cp -r ./build/* ../docs/kashf
echo 'kashf documentations are updated'

rm ./source/index.html.md
mv ./source/baaz.json.md ./source/index.html.md
bundle exec middleman build
rm -r ../docs/baaz/*
cp -r ./build/* ../docs/baaz
echo 'baaz documentations are updated'


rm ./source/index.html.md
mv ./source/golrokh.json.md ./source/index.html.md
bundle exec middleman build
rm -r ../docs/golrokh/*
cp -r ./build/* ../docs/golrokh
echo 'golrokh documentations are updated'


rm ./source/index.html.md
mv ./source/harf.json.md ./source/index.html.md
bundle exec middleman build
rm -r ../docs/harf/*
cp -r ./build/* ../docs/harf
echo 'harf documentations are updated'

# rm ./source/index.html.md
# mv ./source/naghsh.json.md ./source/index.html.md
# bundle exec middleman build
# rm -r ../docs/naghsh/*
# cp -r ./build/* ../docs/naghsh
# echo 'naghsh documentations are updated'

rm ./source/index.html.md
mv ./source/parde.json.md ./source/index.html.md
bundle exec middleman build
rm -r ../docs/parde/*
cp -r ./build/* ../docs/parde
echo 'parde documentations are updated'

cd ..
node JsAppender.js

echo 'parsing and building docs finished successfully!'
