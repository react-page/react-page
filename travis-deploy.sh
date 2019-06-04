#!/usr/bin/env bash

set -euo pipefail

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

cat ./packages/meta/package.json | sed s/0.0.0/$(git describe --tag)/g  > ./packages/meta/package.json
git checkout -b release-$(git describe --tag)
cd ./packages/meta
npm cache clean --force
cd ../../
lerna publish --no-git-tag-version --no-push --yes --force-publish=* $(git describe --tag)
