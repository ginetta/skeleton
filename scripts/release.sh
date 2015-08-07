#!/bin/bash
echo "Releasing"
npm version minor --no-git-tag-version
VERSION=$(node -e 'console.log(require("./package.json").version)')
zip -r build-$VERSION.zip build

curl https://api.github.com/repos/ORGANISATION/REPO/releases?access_token=$GITHUB_ACCESS_TOKEN \
  --data "{\"tag_name\": \"v$VERSION\",\"target_commitish\": \"master\", \"name\": \"v$VERSION\", \"body\": \"Release of version $VERSION\",\"draft\": false,\"prerelease\": false}" 

