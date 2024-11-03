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

  return (
    <div className="App">
      <h1>Biblioteca mea</h1>

      <input
        type="text"
        placeholder="Caută în bibliotecă..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.ID} className="book">
            <img src={`/images/${book.IMG}`} alt={book.Title} />
            <div className="book-info">
              <h2>{book.Title}</h2>
              <p>
                <strong>Autor:</strong> {book.Author}
              </p>
              <p>
                <strong>Cod Bibliotecă:</strong> {book.LibraryID}
              </p>
              <p>
                <strong>Pagini:</strong> {book.Pages}
              </p>
              <p>
                <strong>Citite:</strong> {book.Read}
              </p>
              <p>
                <strong>Recitite:</strong> {book.Reread}
              </p>
              <p>
                <strong>Detalii:</strong> {book.Details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
