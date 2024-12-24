#!/bin/bash

if [ $# -lt 3 ]; then
  echo "Usage: $0 /path/to/folder PREFIX COUNTER_START"
  exit 1
fi

target_folder="$1"
prefix="$2"
counter="$3"

if [ ! -d "$target_folder" ]; then
  echo "Folder not found: $target_folder"
  exit 1
fi

cd "$target_folder" || exit 1

counter_length=${#counter}

for file in *; do
  if [ -f "$file" ]; then
    echo "Processing: $file"
    extension="${file##*.}"
    new_name=$(printf "%s%0*d.%s" "$prefix" "$counter_length" "$counter" "$extension")
    mv "$file" "$new_name"
    counter=$((10#$counter + 1))
  fi
done

echo "Files renamed in $target_folder with prefix '$prefix' starting from $3"

