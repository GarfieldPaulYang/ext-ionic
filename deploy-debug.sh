#!/bin/sh

#rm *.metadata.json
#rm *.d.ts
#rm *.js
#rm *.js.map
#find ./src -name '*.metadata.json' -type f -print -exec rm -rf {} \;
#find ./src -name '*.d.ts' -type f -print -exec rm -rf {} \;
#find ./src -name '*.js' -type f -print -exec rm -rf {} \;
#find ./src -name '*.js.map' -type f -print -exec rm -rf {} \;

npm run build
rm -R aot
rm -Rf ../ionic2-demo/node_modules/ext-ionic/*
rsync -a --exclude-from=deploy-debug-ignore  ../ext-ionic/  ../ionic2-demo/node_modules/ext-ionic

