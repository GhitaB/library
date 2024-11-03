import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchIn = `${book.ID} ${book.LibraryID} ${book.Title} ${book.Author} ${book.Pages} ${book.Read} ${book.Reread} ${book.Details}`;
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
      <h1>Ghiță B.'s Library</h1>
      <p>Work in progress... (600/1000)</p>

      <input
        type="text"
        placeholder="Search by any detail (author, title, id, etc)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="book-list">
        {filteredBooks.map((book) => (
          <div
            key={book.ID}
            className={`book ${bookStatusClass(book.Read, book.Pages)}`}
          >
            <img src={`/images/${book.IMG}`} alt={book.Title} />
            <div className="book-info">
              <h2>{book.Title}</h2>
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
