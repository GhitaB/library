import { useState, useEffect } from "react";
import "./App.css";

const Stats = (props) => {
  /* eslint-disable react/prop-types */
  const { books } = props;
  return (
    <div className="stats">
      <p>
        Indexed: {books.length} books,{" "}
        {books.reduce((acc, book) => acc + book.Pages, 0)} pages.
      </p>
      <p>
        I have read: {books.filter((book) => book.Read === book.Pages).length}{" "}
        books, {books.reduce((acc, book) => acc + book.Read + book.Reread, 0)}{" "}
        pages.
      </p>
    </div>
  );
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchIn = `${book.ID} ${book.LibraryID} ${book.Title} ${book.OriginalTitle} ${book.Author} ${book.Pages} ${book.Read} ${book.Reread} ${book.Details}`;
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
      <h1>Ghiță B.&#39;s Library</h1>
      <p>Work in progress... (600/1000)</p>

      <input
        type="text"
        placeholder="Search by any detail (author, title, id, etc)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="book-list">
        <Stats books={filteredBooks} />
        {filteredBooks.map((book) => (
          <div
            key={book.ID}
            className={`book ${bookStatusClass(book.Read, book.Pages)}`}
          >
            <img src={`/library/images/${book.IMG}`} alt={book.Title} />
            <div className="book-info">
              <h2>{book.Title}</h2>
              {book.OriginalTitle && (
                <p className="original-title">
                  <em>({book.OriginalTitle})</em>
                </p>
              )}
              <p>
                <strong>Author:</strong> {book.Author}
              </p>
              <p>
                <strong>ID:</strong> {book.ID}
              </p>
              <p>
                <strong>LibraryID:</strong> {book.LibraryID}
              </p>
              <p>
                <strong>Pages:</strong> {book.Pages}
              </p>
              <p>
                <strong>Read:</strong> {book.Read}
              </p>
              <p>
                <strong>Reread:</strong> {book.Reread}
              </p>
              <p>
                <strong>Details:</strong> {book.Details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
