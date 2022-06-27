set -e

echo 'RUN THE SCRIPT AS SUPER USER'

cd slate_project
bundle install --quiet
cd ..
npm list drafter || npm install drafter

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

build_one(){    
    rm ./source/index.html.md
    mv ./source/$1.json.md ./source/index.html.md
    cp ../logos/$1/logo.svg ./source/images/
    bundle exec middleman build
    rm -r ../docs/$1/*
    cp -r ./build/* ../docs/$1
    echo "$1 documentations are updated"
}

build_all(){
    for Item in alefba harf kashf baaz parde golrokh ;
  do
    build_one $Item
  done  
}

cd ./slate_project

if [ $# -eq 0 ] 
then build_all
else build_one $1
fi

cd ..
node JsAppender.js
echo 'parsing and building docs finished successfully!'
