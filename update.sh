# In the windows, follow these steps to run the script:
# 1. Install wsl (https://learn.microsoft.com/en-us/windows/wsl/install)
# 2. Reopen this project with the wsl in the vscode
# 3. Run the script again.

echo "Installing dependencies if needed..."


# Ubuntu
if [ "$(. /etc/os-release; echo $NAME)" = "Ubuntu" ]; then
  sudo apt install ruby ruby-dev build-essential libffi-dev zlib1g-dev liblzma-dev nodejs patch
  sudo apt-get update -y
  sudo apt-get install -y bundler
fi

# Mac
if [ "$(uname)" == "Darwin" ]; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    xcode-select --install
    sudo xcodebuild -license
    brew install node
    gem update --system
    gem install bundler
fi

echo "Start building project..."

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
    rm -rf ../docs/$1/*
    mkdir -p "../docs/$1"
    cp -r ./build/* "../docs/$1"
    echo "$1 documentations are updated"
}

build_all(){
    for Item in alefba harf kashf baaz parde golrokh targar replai fahm barid;
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
