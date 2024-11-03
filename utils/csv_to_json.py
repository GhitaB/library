import csv
import json


def csv_to_json(csv_file_path, json_file_path):
    books = []

    with open(csv_file_path, mode="r", encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            if len(row) == 7:
                book = {
                    "ID": row[0].strip(),
                    "LibraryID": row[1].strip(),
                    "Author": row[2].strip(),
                    "Title": row[3].strip(),
                    "Read": int(row[4].strip()),
                    "Pages": int(row[5].strip()),
                    "Reread": int(row[6].strip()),
                    "IMG": "IMG_0000.png",  # default
                    "Details": "",
                }
                books.append(book)

    with open(json_file_path, mode="w", encoding="utf-8") as json_file:
        json.dump(books, json_file, ensure_ascii=False, indent=4)


csv_file_path = "books.csv"
json_file_path = "books.json"

csv_to_json(csv_file_path, json_file_path)

print(f"Done: '{json_file_path}'.")
