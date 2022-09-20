#!/bin/bash
if [ ! -d "./public" ] 
then 
    echo "Directory './public' does not exist";
    echo "Creating Directory: './public'";
fi
  
echo "Running Build";
retype build
cd public
find . -name "*.html" -exec sed -i 's/m = localStorage.getItem("doc_theme")/m = "dark"/g' {} \;
cd ..
