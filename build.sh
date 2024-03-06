#!/usr/bin/env sh

[ -f package-lock.json ] || npm i
npx pug index.pug
npx rapydscript api.pyj -o api.js
sed -i 's/ || typeof e.source === "object" && ρσ_equals(e.source, widgetWindow)//g' api.js
sed -i 's/ || typeof e.source === "object" && ρσ_equals(e.source, window.parent)//g' api.js
