#!/bin/bash

if [ -z $1 ]; then
    echo "Please specify the new repo's remote url, example: git@github.com:charlpcronje/dev.docs.devserv.me.git";
    break;
    exit;
else
	REPO="$1"
fi



echo "This scripts does a GIP...";

echo "G - GIT Init";
echo "git init" && git init;
echo "git add ." && git add .;

echo "I - GIT Commit and Remote";
echo "git commit -m \"first commit\"" && git commit -m "first commit";

echo "Setting repo to the main branch"
echo "git branch -M main" && git branch -M main;

echo "Setting the origin of th repo"
cmd="git remote add origin $REPO"

echo "$cmd" && eval "$cmd"
echo "GIT Push - git push -u origin main";

echo "git push -u origin main" && git push -u origin main
