import React, { useEffect, useState } from 'react';
import { getUserPurchases } from '../api/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Profile = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const { data } = await getUserPurchases();
        setPurchases(data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch purchases:', err);
        setError('Failed to fetch your purchases. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Your Profile</h1>
      <h2>Purchased Books</h2>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold', color: '#4b0082' }}>
            LedgerLit Loading...
          </p>
        </div>
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!error && purchases.length === 0 && (
            <p>You have not purchased any books yet.</p>
          )}

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {purchases.map((book) => (
              <li
                key={book._id}
                style={{
                  marginBottom: '15px',
                  padding: '15px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <h3>{book.title}</h3>
                <a
                  href={`${API_URL}${book.file}`}
                  download
                  style={{
                    display: 'inline-block',
                    marginTop: '10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                  }}
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Profile;
