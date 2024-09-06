import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onUpdateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in both fields.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3050/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store all necessary details in local storage
        localStorage.setItem('token', data.token); // Store JWT token in local storage
        localStorage.setItem('userEmail', form.email); // Store user email in local storage
        localStorage.setItem('shopName', data.shopName); // Store shop name
        localStorage.setItem('ownerName', data.ownerName); // Store owner's name
        localStorage.setItem('location', data.location); // Store location
        localStorage.setItem('phone', data.phone); // Store phone number
        // localStorage.setItem('shopLogo', data.shopLogo); // Store shop logo if available
  
        console.log('Login successful');
        navigate('/home');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login.');
    }
  };
  const onSignup = () => {
    navigate('/signup');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onLogin}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email</label>
          <input
            className={styles.formField}
            type="email"
            name="email"
            value={form.email}
            onChange={onUpdateField}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password</label>
          <input
            className={styles.formField}
            type="password"
            name="password"
            value={form.password}
            onChange={onUpdateField}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formActions}>
          <button type="submit" className={styles.formSubmitBtn}>Login</button>
          <button type="button" onClick={onSignup} className={styles.formSubmitBtn}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
