import React from "react";

export default function BookCard({ book }) {
  // cover_id sometimes available as cover_i
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null;

  const authors = book.author_name ? book.author_name.join(", ") : "Unknown";
  const year = book.first_publish_year || "N/A";
  const title = book.title || "No title";

  return (
    <div className="book-card">
      {coverUrl ? (
        <img src={coverUrl} alt={title} />
      ) : (
        <div className="no-cover">No Image</div>
      )}
      <div className="card-body">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{authors}</p>
        <p className="book-year">📅 {year}</p>
      </div>
    </div>
  );
}
