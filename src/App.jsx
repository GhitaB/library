/*
 HOW TO:
 Convert all jpegs to png:
    $ mogrify -format png *.jpeg
 Resize width 200 px for all pngs in this folder:
    $ mogrify -resize 200x *.png
 Cleanup
    $ rm *.jpeg

 TODO: Plan indexare cărți:
 Un raft nu primește culoarea următoare decât după ce sunt bifate
 subpunctele de la nivelul anterior.
 1. RED
    Culoarea default pentru un raft pe care nu l-am aranjat.
    1.1. Aranjez cărțile pe raft.
 2. ORANGE
    2.1. Numerotez (ID)
    2.2. Introduc în Excel (ID, titlu, autor, pagini, citite, recitite)
 3. YELLOW
    3.1. Export .csv import în .json.
    3.2. Setez Updated cu ziua curentă ca să mi le afișeze primele în listă.
 4. BLUE
    4.1. Imagine cu coperta
    4.2. Titlul în original
    4.3. Tags
    4.4. Citeste online link
    4.5. Stars rating
    4.6. Detalii carte (scurtă descriere)
 5. GREEN
    5.1. Link review pe blog

===============================================================================
      STATUS: 1    2         3        4                             5
===============================================================================
YY.MM         1.1  2.1  2.2  3.1  3.2 4.1  4.2  4.3  4.4  4.5  4.6  5.1
25.12 A1 ######################################################################
25.12 A2 ######################################################################
25.12 A3 ######################################################################
25.12 A4 ######################################################################
25.12 A5 ######################################################################
25.12 A6 ######################################################################
-------------------------------------------------------------------------------
----- B1
----- B2
----- B3
----- B4
----- B5
----- B6
-------------------------------------------------------------------------------
----- C1
----- C2
----- C3
----- C4
----- C5
----- C6
----- C7
-------------------------------------------------------------------------------
----- D1
----- D2
----- D3
----- D4
----- D5
----- D6
-------------------------------------------------------------------------------
----- E1
----- E2
----- E3
----- E4
----- E5
----- E6
===============================================================================
              1.1  2.1  2.2  3.1  3.2 4.1  4.2  4.3  4.4  4.5  4.6  5.1
 ^ Last update
*/
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import Accordion from "./Accordion";
import { useSearchParams } from "react-router-dom";

const Stats = (props) => {
  /* eslint-disable react/prop-types */
  const { books } = props;
  return (
    <div className="stats">
      <p>
        <strong>{books.length} cărți</strong> indexate, totalizând{" "}
        {books.reduce((acc, book) => acc + book.Pages, 0)} pagini. Din ele am
        citit{" "}
        <strong>
          {books.filter((book) => book.Read === book.Pages).length} cărți
        </strong>
        {", "}
        {books.reduce((acc, book) => acc + book.Read + book.Reread, 0)} pagini
        (incluzând paginile recitite). Cărți recitite:{" "}
        {books.filter((book) => book.Reread === book.Pages).length}. Cărți
        neatinse: {books.filter((book) => book.Read === 0).length}. Cărți
        începute:{" "}
        {books.filter((book) => book.Read > 0 && book.Read < book.Pages).length}
        .
      </p>
    </div>
  );
};

const App = () => {
  const resultsTitleRef = useRef(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsTitle, setResultsTitle] = useState("Toate cărțile");
  const [tagCounts, setTagCounts] = useState({});
  const [authorCounts, setAuthorCounts] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const TEMPOperation = (data) => {
    // console.log(data);
    // // Use it for custom operations with json books
    // if (data === undefined) {
    //   console.log("AAA");
    //   return;
    // }
    //
    // console.log(data);
    // // Fix image url using library ID for each item
    // const processedData = data
    //   .filter((item) => item.LibraryID.startsWith("C3_"))
    //   .map((item) => {
    //     const newIMG = `C3/IMG_${item.ID}.png`;
    //     const newUpdated = "2025_01_01";
    //     return { ...item, IMG: newIMG, Updated: newUpdated };
    //   });
    // console.log(processedData);
  };

  useEffect(() => {
    const tagMap = {};
    books.forEach((book) => {
      book.Tags?.forEach((tag) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });
    setTagCounts(tagMap);
  }, [books]);

  useEffect(() => {
    const tagMap = {};
    books.forEach((book) => {
      const authors = book.Author.split(",").map((author) => author.trim());
      authors.forEach((author) => {
        tagMap[author] = (tagMap[author] || 0) + 1;
      });
    });
    setAuthorCounts(tagMap);
  }, [books]);

  const humanReadableTitle = (term) => {
    const dictionary = {
      "": "Toate cărțile",
      A1_: "Cărțile de pe raftul A1",
      A2_: "Cărțile de pe raftul A2",
      A3_: "Cărțile de pe raftul A3",
      A4_: "Cărțile de pe raftul A4",
      A5_: "Cărțile de pe raftul A5",
      A6_: "Cărțile de pe raftul A6",
      B1_: "Cărțile de pe raftul B1",
      B2_: "Cărțile de pe raftul B2",
      B3_: "Cărțile de pe raftul B3",
      B4_: "Cărțile de pe raftul B4",
      B5_: "Cărțile de pe raftul B5",
      B6_: "Cărțile de pe raftul B6",
      C1_: "Cărțile de pe raftul C1",
      C2_: "Cărțile de pe raftul C2",
      C3_: "Cărțile de pe raftul C3",
      C4_: "Cărțile de pe raftul C4",
      C5_: "Cărțile de pe raftul C5",
      C6_: "Cărțile de pe raftul C6",
      C7_: "Cărțile de pe raftul C7",
      D1_: "Cărțile de pe raftul D1",
      D2_: "Cărțile de pe raftul D2",
      D3_: "Cărțile de pe raftul D3",
      D4_: "Cărțile de pe raftul D4",
      D5_: "Cărțile de pe raftul D5",
      D6_: "Cărțile de pe raftul D6",
      E1_: "Cărțile de pe raftul E1",
      E2_: "Cărțile de pe raftul E2",
      E3_: "Cărțile de pe raftul E3",
      E4_: "Cărțile de pe raftul E4",
      E5_: "Cărțile de pe raftul E5",
      E6_: "Cărțile de pe raftul E6",
      "Conflict of the Ages": "Cărțile din seria Conflictul Veacurilor",
      stars_1: "Cărți de 1 steluță",
      stars_2: "Cărți de 2 steluțe",
      stars_3: "Cărți de 3 steluțe",
      stars_4: "Cărți de 4 steluțe",
      stars_5: "Cărți de 5 steluțe",
    };
    if (Object.prototype.hasOwnProperty.call(dictionary, term)) {
      return dictionary[term];
    }
    return `Rezultatele căutării: ${term}`;
  };

  const scrollToResultsTitle = () => {
    if (resultsTitleRef.current) {
      resultsTitleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const searchFor = useCallback(
    (term, searchType = undefined) => {
      console.log(`Searching for: ${term}, type: ${searchType}`);
      let finalTerm = term;
      if (searchType === "ONLY_TAGS") {
        finalTerm = "tagged:" + term;
      }
      if (searchType === "ONLY_AUTHOR") {
        finalTerm = "author:" + term;
      }
      if (searchType === "ONLY_BOOK") {
        finalTerm = "book:" + term;
      }
      setSearchTerm(finalTerm);
      setSearchParams({ q: finalTerm });
      setResultsTitle(humanReadableTitle(term));
      scrollToResultsTitle();
    },
    [setSearchParams],
  );

  useEffect(() => {
    fetch("books.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        TEMPOperation(data);
      });
  }, []);

  const textStars = (stars) => {
    if (stars) {
      return `stars_${stars}`;
    }
    return "";
  };

  const filteredBooks = books.filter((book) => {
    let searchIn = "";
    // Default search - chech all fields
    searchIn = `${textStars(book.Stars)} ${book.ID} ${book.LibraryID} ${book.Title} ${book.OriginalTitle || ""} ${book.Author} ${book.Pages} ${book.Read} ${book.Reread} ${book.Details} ${(book.Tags || []).join(" ")}`;

    // ONLY_TAGS
    if (searchTerm.includes("tagged:")) {
      searchIn = `${(book.Tags || []).join(" ")}`;
      let term = searchTerm.split("tagged:")[1];
      if (term) {
        return searchIn.toLowerCase().includes(term.toLowerCase());
      }
    }

    // ONLY_AUTHOR
    if (searchTerm.includes("author:")) {
      searchIn = `${book.Author}`;
      let term = searchTerm.split("author:")[1];
      if (term) {
        return searchIn.toLowerCase().includes(term.toLowerCase());
      }
    }

    // ONLY_BOOK
    if (searchTerm.includes("book:")) {
      searchIn = `${book.ID}`;
      let term = searchTerm.split("book:")[1];
      if (term) {
        return searchIn.toLowerCase().includes(term.toLowerCase());
      }
    }
    return searchIn.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const bookStatusClass = (read, pages) => {
    if (read === pages) {
      return "read";
    }
    if (read > 0) {
      return "inprogress";
    }
    if (read === 0) {
      return "notread";
    }
  };

  const sortOptions = [
    { value: "library_id", label: "Ordinea implicită" },
    { value: "last_updated", label: "Actualizate recent" },
    { value: "pages_asc", label: "Pagini (crescător)" },
    { value: "pages_desc", label: "Pagini (descrescător)" },
    { value: "rating", label: "Cele mai bune" },
    { value: "to_read", label: "Cu ce să încep?" },
  ];

  const [selectedSort, setSelectedSort] = useState("library_id");

  const handleChangeSort = (event) => {
    const value = event.target.value;
    setSelectedSort(value);
  };

  const getSortedBooks = (books, sort) => {
    if (sort === "library_id") {
      const booksDefaultOrder = [...books].sort((a, b) => {
        const extractParts = (id) => {
          const match = id.match(/^([A-Za-z0-9_]+)([-+]*$)/);
          return {
            base: match[1], // ex. A3_005
            suffix: match[2] || "", // "++" "---"
          };
        };

        const { base: baseA, suffix: suffixA } = extractParts(a.LibraryID);
        const { base: baseB, suffix: suffixB } = extractParts(b.LibraryID);

        if (baseA > baseB) return 1;
        if (baseA < baseB) return -1;

        if (suffixA === suffixB) return 0;
        if (suffixA === "" && suffixB.startsWith("-")) return 1;
        if (suffixB === "" && suffixA.startsWith("-")) return -1;

        const countMinusA = suffixA.split("-").length - 1;
        const countMinusB = suffixB.split("-").length - 1;
        const countPlusA = suffixA.split("+").length - 1;
        const countPlusB = suffixB.split("+").length - 1;

        if (countMinusA !== countMinusB) return countMinusA - countMinusB;
        if (countPlusA !== countPlusB) return countPlusA - countPlusB;

        return 0;
      });
      return booksDefaultOrder;
    }

    if (sort === "last_updated") {
      const booksLatestUpdated = [...books].sort((a, b) => {
        if (a.Updated < b.Updated) return 1;
        if (a.Updated > b.Updated) return -1;
        return 0;
      });
      return booksLatestUpdated;
    }
    if (sort === "pages_asc") {
      const booksPagesAsc = [...books].sort((a, b) => {
        if (a.Pages > b.Pages) return 1;
        if (a.Pages < b.Pages) return -1;
        return 0;
      });
      return booksPagesAsc;
    }
    if (sort === "pages_desc") {
      const booksPagesDesc = [...books].sort((a, b) => {
        if (a.Pages < b.Pages) return 1;
        if (a.Pages > b.Pages) return -1;
        return 0;
      });
      return booksPagesDesc;
    }
    if (sort === "rating") {
      const booksRating = [...books].sort((a, b) => {
        if (a.Stars === undefined && b.Stars === undefined) return 0;
        if (a.Stars === undefined) return 1;
        if (b.Stars === undefined) return -1;
        if (a.Stars < b.Stars) return 1;
        if (a.Stars > b.Stars) return -1;
        return 0;
      });
      return booksRating;
    }
    if (sort === "to_read") {
      const booksToRead = [...books].sort((a, b) => {
        let a_remaining = a.Pages - a.Read;
        let b_remaining = b.Pages - b.Read;

        if (a_remaining === 0 && b_remaining === 0) return 0;
        if (a_remaining === 0) return 1;
        if (b_remaining === 0) return -1;

        if (a_remaining < b_remaining) return -1;
        if (a_remaining > b_remaining) return 1;

        return 0;
      });
      return booksToRead;
    }
    return [];
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      let type = undefined;

      if (query.startsWith("tagged:")) {
        type = "ONLY_TAGS";
      } else if (query.startsWith("author:")) {
        type = "ONLY_AUTHOR";
      } else if (query.startsWith("book:")) {
        type = "ONLY_BOOK";
      }

      const actualTerm = type ? query.split(":")[1] : query;

      setSearchTerm(actualTerm);
      searchFor(actualTerm, type);
    }
  }, [searchFor, searchParams]);

  return (
    <div className="App">
      <h1 onClick={() => searchFor("")}>Ghiță B. - Biblioteca personală</h1>
      <p className="news">
        Cu libertate, cărți, flori și lună, cine n-ar fi fericit?
      </p>

      <Accordion title="Rafturi" isOpenDefault={true}>
        <div className="library-table-container">
          <table className="library-table" border="1">
            <tbody>
              <tr>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
              </tr>
              <tr>
                <td>
                  <button className="pr-5" onClick={() => searchFor("A1_")}>
                    Raftul A1
                  </button>
                  <button className="pr-5" onClick={() => searchFor("A2_")}>
                    Raftul A2
                  </button>
                  <button className="pr-5" onClick={() => searchFor("A3_")}>
                    Raftul A3
                  </button>
                  <button className="pr-5" onClick={() => searchFor("A4_")}>
                    Raftul A4
                  </button>
                  <button className="pr-5" onClick={() => searchFor("A5_")}>
                    Raftul A5
                  </button>
                  <button className="pr-5" onClick={() => searchFor("A6_")}>
                    Raftul A6
                  </button>
                </td>
                <td>
                  <button className="pr-5" onClick={() => searchFor("B1_")}>
                    Raftul B1
                  </button>
                  <button className="pr-5" onClick={() => searchFor("B2_")}>
                    Raftul B2
                  </button>
                  <button className="pr-4" onClick={() => searchFor("B3_")}>
                    Raftul B3
                  </button>
                  <button className="pr-4" onClick={() => searchFor("B4_")}>
                    Raftul B4
                  </button>
                  <button className="pr-4" onClick={() => searchFor("B5_")}>
                    Raftul B5
                  </button>
                  <button className="pr-4" onClick={() => searchFor("B6_")}>
                    Raftul B6
                  </button>
                </td>
                <td>
                  <button className="pr-4" onClick={() => searchFor("C1_")}>
                    Raftul C1
                  </button>
                  <button className="pr-4" onClick={() => searchFor("C2_")}>
                    Raftul C2
                  </button>
                  <button className="pr-4" onClick={() => searchFor("C3_")}>
                    Raftul C3
                  </button>
                  <button className="pr-0" onClick={() => searchFor("C4_")}>
                    C4 empty
                  </button>
                  <button className="pr-0" onClick={() => searchFor("C5_")}>
                    C5 empty
                  </button>
                  <button className="pr-0" onClick={() => searchFor("C6_")}>
                    C6 empty
                  </button>
                  <button className="pr-0" onClick={() => searchFor("C7_")}>
                    C7 empty
                  </button>
                </td>
                <td>
                  <button className="pr-4" onClick={() => searchFor("D1_")}>
                    Raftul D1
                  </button>
                  <button className="pr-4" onClick={() => searchFor("D2_")}>
                    Raftul D2
                  </button>
                  <button className="pr-4" onClick={() => searchFor("D3_")}>
                    Raftul D3
                  </button>
                  <button className="pr-4" onClick={() => searchFor("D4_")}>
                    Raftul D4
                  </button>
                  <button className="pr-4" onClick={() => searchFor("D5_")}>
                    Raftul D5
                  </button>
                  <button className="pr-4" onClick={() => searchFor("D6_")}>
                    Raftul D6
                  </button>
                </td>
                <td>
                  <button className="pr-4" onClick={() => searchFor("E1_")}>
                    Raftul E1
                  </button>
                  <button className="pr-4" onClick={() => searchFor("E2_")}>
                    Raftul E2
                  </button>
                  <button className="pr-4" onClick={() => searchFor("E3_")}>
                    Raftul E3
                  </button>
                  <button className="pr-4" onClick={() => searchFor("E4_")}>
                    Raftul E4
                  </button>
                  <button className="pr-4" onClick={() => searchFor("E5_")}>
                    Raftul E5
                  </button>
                  <button className="pr-4" onClick={() => searchFor("E6_")}>
                    Raftul E6
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Accordion>
      <div className="tags-container">
        <Accordion title="Subiecte" isOpenDefault={false}>
          <p className="tags small">
            {Object.entries(tagCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([tag, count]) => {
                const fontSize = Math.min(16, Math.max(10, 10 + count));
                return (
                  <span
                    key={tag}
                    onClick={() => searchFor(tag, "ONLY_TAGS")}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {tag} ({count})
                  </span>
                );
              })}
          </p>
        </Accordion>
        <Accordion title="Autori" isOpenDefault={false}>
          <p className="tags small">
            {Object.entries(authorCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([author, count]) => {
                const fontSize = Math.min(16, Math.max(10, 10 + count));
                return (
                  <span
                    key={author}
                    onClick={() => searchFor(author, "ONLY_AUTHOR")}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {author} ({count})
                  </span>
                );
              })}
          </p>
        </Accordion>
      </div>
      <h2 ref={resultsTitleRef}>{resultsTitle}</h2>
      <input
        type="text"
        placeholder="🔎︎ Caută cărți (după autor, titlu, ID, detalii)..."
        value={searchTerm}
        onChange={(e) => searchFor(e.target.value)}
      />

      <select id="sort-select" value={selectedSort} onChange={handleChangeSort}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="book-list">
        <Stats books={filteredBooks} />

        {getSortedBooks(filteredBooks, selectedSort).map((book) => (
          <div
            key={book.ID}
            className={`book ${bookStatusClass(book.Read, book.Pages)}`}
          >
            <img src={`/library/images/${book.IMG}`} alt={book.Title} />
            <div className="book-info">
              <p className="small light">
                <span
                  className="clickable"
                  title="Selectează cartea"
                  onClick={() => searchFor(book.ID, "ONLY_BOOK")}
                >
                  {book.ID}
                </span>{" "}
                /{" "}
                <span
                  className="clickable"
                  title="Cărțile de pe acest raft"
                  onClick={() => searchFor(book.LibraryID.split("_")[0] + "_")}
                >
                  {book.LibraryID}
                </span>
              </p>
              <h2>{book.Title}</h2>
              {book.OriginalTitle && (
                <p className="original-title small">
                  <em>({book.OriginalTitle})</em>
                </p>
              )}
              <p className="author">
                {book.Author.split(",").map((author, index) => (
                  <span
                    key={index}
                    onClick={() => searchFor(author.trim(), "ONLY_AUTHOR")}
                  >
                    {author.trim()}
                    {index < book.Author.split(",").length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="small details">{book.Details}</p>
              {book.ReadOnline?.url && (
                <p className="small align-right">
                  ►
                  <a
                    href={book.ReadOnline.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.ReadOnline.text}
                  </a>
                </p>
              )}
              {book.Review?.url && (
                <p className="small align-right">
                  ►
                  <a
                    href={book.Review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {book.Review.text}
                  </a>
                </p>
              )}
              {book.Tags && (
                <p className="small tags">
                  {book.Tags.map((tag, index) => (
                    <span
                      onClick={() => searchFor(tag, "ONLY_TAGS")}
                      key={index}
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              )}
              <p className="small light book-stats">
                Citit: {book.Read} / {book.Pages} pagini.{" "}
                {book.Reread > 0 && (
                  <span>Recitit: {book.Reread} pagini. </span>
                )}
              </p>
            </div>
            {book.Stars && (
              <div
                className="stars"
                onClick={() => searchFor(`stars_${book.Stars}`)}
              >
                <p>{"★".repeat(book.Stars)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
