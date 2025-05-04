import React, { useEffect, useState } from 'react';
import { getBooks, purchaseBook } from '../api/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await getBooks();
        setBooks(data);
        setError('');
      } catch (err) {
        console.error('Fetch books error:', err);
        setError('Failed to load books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handlePurchase = async (bookId) => {
    try {
      setPurchasing(true);
      await purchaseBook(bookId);
      setSuccess('Book purchased successfully!');
      setError('');
    } catch (err) {
      console.error('Purchase book error:', err);
      setError('Failed to purchase book');
      setSuccess('');
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Book List</h1>

      {loading && <p>Loading books...</p>}

      {!loading && (
        <>
          {success && <p style={{ color: 'green' }}>{success}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {books.map((book) => (
              <li
                key={book._id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px',
                }}
              >
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <button
                  onClick={() => handlePurchase(book._id)}
                  disabled={purchasing}
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {purchasing ? 'Processing...' : 'Purchase'}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default BookList;
