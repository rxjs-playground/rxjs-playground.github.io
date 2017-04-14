#!/bin/bash
read -p "Commit description: " desc
npm run build
git add . && \
git add -u && \
git commit -m "$desc" && \
git push origin master
