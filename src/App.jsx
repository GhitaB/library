/*
 TODO: Plan indexare cărți:
 Un raft nu primește culoarea următoare decât după ce sunt bifate toDateString();
 subpunctele de la nivelul anterior.
 1. RED
    Culoarea default pentru un raft pe care nu l-am aranjat.
    1.1. Aranjez cărțile pe raft.
 2. ORANGE
    2.1. Numerotez (ID)
    2.2. Introduc în Excel (ID, titlu, autor, pagini, citite, recitite)
 3. YELLOW
    3.1. Export .csv import în .json.
 4. BLUE
    4.1. Imagine cu coperta
    4.2. Titlul în original
    4.3. Tags
    4.4. Citeste online link
    4.5. Stars rating
    4.6. Detalii carte (scurtă descriere)
 5. GREEN
    5.1. Link review pe blog TODO implement feature
    5.2. Link cumpără cartea TODO implement feature
    5.3. Latest TODO optiune de sortare - cele mai recent citite primele

  TODO: implement sorting: alfabetic
  TODO:Anul publicării - ar putea fi util pentru o sortare viitoare

===============================================================================
      STATUS: 1    2         3    4                             5
===============================================================================
              1.1  2.1  2.2  3.1  4.1  4.2  4.3  4.4  4.5  4.6  5.1  5.2  5.3
04.11 A1 #######################################################
04.11 A2 #####?
04.11 A3 #####?
04.11 A4 #####?
04.11 A5 #####?
04.11 A6 #####?
-------------------------------------------------------------------------------
04.11 B1 #####?
04.11 B2 #####?
04.11 B3 #####?
04.11 B4 ##?
04.11 B5 ##?
04.11 B6 ##?
-------------------------------------------------------------------------------
04.11 C1 ##?
04.11 C2 ##?
04.11 C3 ##?
04.11 C4 ##?
04.11 C5 ##?
04.11 C6 ##?
04.11 C7 ##?
-------------------------------------------------------------------------------
04.11 D1 #####?
04.11 D2 ##?
04.11 D3 ##?
04.11 D4 ##?
04.11 D5 ##?
04.11 D6 ##?
-------------------------------------------------------------------------------
04.11 E1 #####?
04.11 E2 #####?
04.11 E3 ##?
04.11 E4 #####?
04.11 E5 #####?
04.11 E6 #####?
===============================================================================
 ^ Last update
*/
import { useState, useEffect } from "react";
import "./App.css";

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

const Stars = (props) => {
  /* eslint-disable react/prop-types */
  const { stars } = props;
  return (
    <div className="stars">
      <p>{"★".repeat(stars)}</p>
    </div>
  );
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsTitle, setResultsTitle] = useState("Toate cărțile");

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
    };
    if (Object.prototype.hasOwnProperty.call(dictionary, term)) {
      return dictionary[term];
    }
    return `Rezultatele căutării: ${term}`;
  };

  const searchFor = (term) => {
    setSearchTerm(term);
    setResultsTitle(humanReadableTitle(term));
  };

  useEffect(() => {
    fetch("books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchIn = `${book.ID} ${book.LibraryID} ${book.Title} ${book.OriginalTitle || ""} ${book.Author} ${book.Pages} ${book.Read} ${book.Reread} ${book.Details} ${(book.Tags || []).join(" ")}`;
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

  return (
    <div className="App">
      <h1 onClick={() => searchFor("")}>Ghiță B. - Biblioteca personală</h1>
      <p className="small">
        În lucru... (cărți indexate: aproximativ 600/1000)
      </p>

      <div className="library-table-container">
        <table className="library-table" border="1">
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
              <button className="pr-3" onClick={() => searchFor("A2_")}>
                Raftul A2
              </button>
              <button className="pr-3" onClick={() => searchFor("A3_")}>
                Raftul A3
              </button>
              <button className="pr-3" onClick={() => searchFor("A4_")}>
                Raftul A4
              </button>
              <button className="pr-3" onClick={() => searchFor("A5_")}>
                Raftul A5
              </button>
              <button className="pr-3" onClick={() => searchFor("A6_")}>
                Raftul A6
              </button>
            </td>
            <td>
              <button className="pr-3" onClick={() => searchFor("B1_")}>
                Raftul B1
              </button>
              <button className="pr-3" onClick={() => searchFor("B2_")}>
                Raftul B2
              </button>
              <button className="pr-3" onClick={() => searchFor("B3_")}>
                Raftul B3
              </button>
              <button className="pr-1" onClick={() => searchFor("B4_")}>
                Raftul B4
              </button>
              <button className="pr-1" onClick={() => searchFor("B5_")}>
                Raftul B5
              </button>
              <button className="pr-1" onClick={() => searchFor("B6_")}>
                Raftul B6
              </button>
            </td>
            <td>
              <button className="pr-1" onClick={() => searchFor("C1_")}>
                Raftul C1
              </button>
              <button className="pr-1" onClick={() => searchFor("C2_")}>
                Raftul C2
              </button>
              <button className="pr-1" onClick={() => searchFor("C3_")}>
                Raftul C3
              </button>
              <button className="pr-1" onClick={() => searchFor("C4_")}>
                Raftul C4
              </button>
              <button className="pr-1" onClick={() => searchFor("C5_")}>
                Raftul C5
              </button>
              <button className="pr-1" onClick={() => searchFor("C6_")}>
                Raftul C6
              </button>
              <button className="pr-1" onClick={() => searchFor("C7_")}>
                Raftul C7
              </button>
            </td>
            <td>
              <button className="pr-3" onClick={() => searchFor("D1_")}>
                Raftul D1
              </button>
              <button className="pr-1" onClick={() => searchFor("D2_")}>
                Raftul D2
              </button>
              <button className="pr-1" onClick={() => searchFor("D3_")}>
                Raftul D3
              </button>
              <button className="pr-1" onClick={() => searchFor("D4_")}>
                Raftul D4
              </button>
              <button className="pr-1" onClick={() => searchFor("D5_")}>
                Raftul D5
              </button>
              <button className="pr-1" onClick={() => searchFor("D6_")}>
                Raftul D6
              </button>
            </td>
            <td>
              <button className="pr-3" onClick={() => searchFor("E1_")}>
                Raftul E1
              </button>
              <button className="pr-3" onClick={() => searchFor("E2_")}>
                Raftul E2
              </button>
              <button className="pr-1" onClick={() => searchFor("E3_")}>
                Raftul E3
              </button>
              <button className="pr-3" onClick={() => searchFor("E4_")}>
                Raftul E4
              </button>
              <button className="pr-3" onClick={() => searchFor("E5_")}>
                Raftul E5
              </button>
              <button className="pr-3" onClick={() => searchFor("E6_")}>
                Raftul E6
              </button>
            </td>
          </tr>
        </table>
      </div>

      <input
        type="text"
        placeholder="Caută cărți (după autor, titlu, ID, detalii)..."
        value={searchTerm}
        onChange={(e) => searchFor(e.target.value)}
      />

      <h2>{resultsTitle}</h2>
      <div className="book-list">
        <Stats books={filteredBooks} />
        {filteredBooks.map((book) => (
          <div
            key={book.ID}
            className={`book ${bookStatusClass(book.Read, book.Pages)}`}
          >
            <img src={`/library/images/${book.IMG}`} alt={book.Title} />
            <div className="book-info">
              <p className="small">
                {book.ID} / {book.LibraryID}
              </p>
              <h2>{book.Title}</h2>
              {book.OriginalTitle && (
                <p className="original-title">
                  <em>({book.OriginalTitle})</em>
                </p>
              )}
              <p className="author" onClick={() => searchFor(book.Author)}>
                {book.Author}
              </p>
              <p className="small details">{book.Details}</p>
              {book.ReadOnline?.url && (
                <p className="small align-right">
                  ►
                  <a href={book.ReadOnline.url} target="_blank">
                    {book.ReadOnline.text}
                  </a>
                </p>
              )}
              {book.Tags && (
                <p className="small tags">
                  {book.Tags.map((tag, index) => (
                    <span onClick={() => searchFor(tag)} key={index}>
                      {tag}
                    </span>
                  ))}
                </p>
              )}
              <p className="small book-stats">
                Citit: {book.Read} / {book.Pages} pagini. Recitit: {book.Reread}{" "}
                pagini.
              </p>
            </div>
            {book.Stars && <Stars stars={book.Stars}></Stars>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
