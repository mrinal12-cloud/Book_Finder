import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) {
      setError("Please enter a book title!");
      setBooks([]);
      return;
    }

    setError("");
    setLoading(true);
    setBooks([]);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await response.json();

      if (data.docs.length === 0) {
        setError("No books found!");
      } else {
        // Limiting to first 10 results
        setBooks(data.docs.slice(0, 10));
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>📚 Book Finder </h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
        <button
          onClick={() => {
            setQuery("");
            setBooks([]);
            setError("");
          }}
        >
          Clear
        </button>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Searching books...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x200?text=No+Cover"
              }
              alt={book.title}
            />

            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong>{" "}
              {book.author_name ? book.author_name.join(", ") : "Unknown"}
            </p>
            <p>
              <strong>First Published:</strong>{" "}
              {book.first_publish_year || "N/A"}
            </p>
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="book-link"
            >
              View Book📖
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
