import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // Styling you already have

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await registerUser({ email, password });
      localStorage.setItem('token', data.token);
      toast.success('Registration successful!', {
        position: 'top-center',
        autoClose: 3000,
      });
      setTimeout(() => navigate('/profile'), 3500); // Navigate after 3.5s
    } catch (err) {
      console.error('Registration error:', err);
      toast.error('Registration failed. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer /> {/* Always include once inside component */}
      <h1>Create Account</h1>
      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
