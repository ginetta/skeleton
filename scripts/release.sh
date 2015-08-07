#!/bin/bash
command -v github-release >/dev/null 2>&1 || { echo >&2 "This requires github-release from https://github.com/aktau/github-release - please install and try again"; exit 1; }

echo "What sort of release? (major|minor|patch)"
while true; do
  read TYPE
  case $TYPE in
    "major" ) break;;
    "minor" ) break;;
    "patch" ) break;;
    * ) echo "Please answer major, minor or patch";;
  esac
done

read -p "Release Title:" TITLE
read -p "Release Description:" DESCRIPTION
echo "\n Release $TITLE ($TYPE): $DESCRIPTION"

npm version $(TYPE)
VERSION=$(node -e 'console.log(require("./package.json").version)')
REPO=$(node -e 'console.log(require("./package.json").name)')
zip -r build-$VERSION.zip build

github-release release \
    --user "ginetta" \
    --repo $REPO \
    --tag v$VERSION \
    --name $TITLE \
    --description $DESCRIPTION \
    --file build-$VERSION.zip \


