// client/src/components/FeaturedBooks.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/books/featured`);
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch featured books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading featured books...</p>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '2rem',
      padding: '1rem 0'
    }}>
      {books.map((book) => (
        <div key={book._id} style={{
          border: '1px solid #ddd',
          padding: '1rem',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          background: '#fff',
          textAlign: 'center',
          transition: 'transform 0.3s',
        }}>
          <Link to={`/books/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src={book.coverImage}
              alt={book.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <h3 style={{ marginTop: '1rem', fontSize: '1.2rem' }}>{book.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{book.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default FeaturedBooks;
