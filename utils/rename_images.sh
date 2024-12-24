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

# 1. Replace spaces with '_'
for file in *; do
  if [ -f "$file" ]; then
    new_name="${file// /_}"
    if [ "$file" != "$new_name" ]; then
      mv "$file" "$new_name"
      echo "Renamed: $file -> $new_name"
    fi
  fi
done

# 2. Rename files in natural order
counter_length=${#counter}

# Use ls -v for natural sort
ls -v | while IFS= read -r file; do
  if [ -f "$file" ]; then
    extension="${file##*.}"
    new_name=$(printf "%s%0*d.%s" "$prefix" "$counter_length" "$counter" "$extension")

    # Check to avoid overwriting
    if [ "$file" != "$new_name" ]; then
      mv "$file" "$new_name"
      echo "Renamed: $file -> $new_name"
    fi

    counter=$((10#$counter + 1))
  fi
done

echo "All files processed in $target_folder"

