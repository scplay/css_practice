#!/bin/bash

now_dir="./";

for entry in `ls $now_dir`; do
	if [ -d $entry ]
	then 
    	echo $entry
	fi
done