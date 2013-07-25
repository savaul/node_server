#!/bin/bash
rm -rf html.txt
while read line
do 
line_no_sp=$(echo $line | sed -e 's/ /%20/g')
echo  "<p> <a href='show?query=$line_no_sp'> "$line" </a></p>"|cat>>html.txt
done<listing.txt 
