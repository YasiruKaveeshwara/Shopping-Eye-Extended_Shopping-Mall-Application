import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';

const SignupForm = () => {
  const [form, setForm] = useState({
    shopName: '',
    ownerName: '',
    location: '',
    phone: '',
    shopLogo: null, // Add state for shop logo
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onUpdateField = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      if (phoneValue.length <= 10) {
        setForm({ ...form, phone: phoneValue });
      }
    } else {
      setForm({
        ...form,
        [name]: files ? files[0] : value // Handle file input
      });
    }
  };

  const onSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!form.shopName || !form.ownerName || !form.location || !form.phone || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('shopName', form.shopName);
      formData.append('ownerName', form.ownerName);
      formData.append('location', form.location);
      formData.append('phone', form.phone);
      if (form.shopLogo) formData.append('shopLogo', form.shopLogo); // Append file if present
      formData.append('email', form.email);
      formData.append('password', form.password);

      // Debugging FormData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await fetch('http://localhost:3050/api/auth/signup', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store JWT token in local storage
        localStorage.setItem('userEmail', form.email); // Store user email
        localStorage.setItem('shopName', form.shopName); // Store shop name
        localStorage.setItem('ownerName', form.ownerName); // Store owner's name
        localStorage.setItem('location', form.location); // Store location
        localStorage.setItem('phone', form.phone); // Store phone number
        if (form.shopLogo) {
          const shopLogoUrl = URL.createObjectURL(form.shopLogo);
          localStorage.setItem('shopLogo', shopLogoUrl); // Store logo URL
        }

        console.log('Signup successful');
        navigate('/'); // Redirect after successful signup
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during signup.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSignup}>
        <h2 className={styles.heading}>Shop Registration</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Shop Name</label>
          <input
            className={styles.formField}
            type="text"
            name="shopName"
            value={form.shopName}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Owner Name</label>
          <input
            className={styles.formField}
            type="text"
            name="ownerName"
            value={form.ownerName}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Location</label>
          <input
            className={styles.formField}
            type="text"
            name="location"
            value={form.location}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Phone</label>
          <input
            className={styles.formField}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onUpdateField}
            pattern="\d{10}" // Enforces 10 digits
            maxLength="10" // Limits input to 10 characters
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Shop Logo (optional)</label>
          <input
            className={styles.formField}
            type="file"
            name="shopLogo"
            onChange={onUpdateField}
          />
        </div>

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

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Confirm Password</label>
          <input
            className={styles.formField}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onUpdateField}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formActions}>
          <button type="submit" className={styles.formSubmitBtn}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;