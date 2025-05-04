// client/src/pages/Home.jsx

import React from 'react';
import FeaturedBooks from '../components/FeaturedBooks';
import ChatBot from '../components/ChatBot';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#4a90e2',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
        borderRadius: '0 0 30px 30px',
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚 Welcome to LedgerLit!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your ultimate destination for buying and discovering books.
        </p>
        <Link to="/books">
          <button style={{
            background: 'white',
            color: '#4a90e2',
            padding: '0.8rem 1.5rem',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}>
            Explore Books
          </button>
        </Link>
      </section>

      {/* Featured Books Section */}
      <section style={{ padding: '3rem 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>🔥 Featured Books</h2>
        <FeaturedBooks />
      </section>

      {/* ChatBot Section */}
      <section style={{ padding: '3rem 2rem', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>🤖 Need Help Finding Books?</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ChatBot />
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#4a90e2',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        marginTop: '2rem',
        borderRadius: '30px 30px 0 0',
      }}>
        <p>© {new Date().getFullYear()} LedgerLit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
