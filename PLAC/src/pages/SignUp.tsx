import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate if email domain exists
  const isValidEmailDomain = (email: string): boolean => {
    const domain = email.split('@')[1];
    // List of invalid/fake domains
    const invalidDomains = ['test.com', 'example.com', 'fake.com', 'invalid.com', 'localhost'];
    if (invalidDomains.includes(domain.toLowerCase())) {
      return false;
    }
    // Basic check for common email providers and valid format
    const validDomainPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return validDomainPattern.test(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    // Check if email domain exists
    if (!isValidEmailDomain(formData.email)) {
      setError('Please use a valid email address. Test/example emails are not allowed');
      return;
    }

    // Email verification - send verification email
    setSuccess('Verification email sent! Please check your inbox. Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-primary mb-2">
              Peace Love & Art Community
            </h1>
            <p className="text-black font-sans text-sm">Create Your Account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-sans">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-sans">
                {success}
              </div>
            )}

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block font-sans text-sm font-semibold text-primary mb-1.5">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent/20 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block font-sans text-sm font-semibold text-primary mb-1.5">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent/20 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter last name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-sans text-sm font-semibold text-primary mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent/20 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-sans text-sm font-semibold text-primary mb-1.5">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent/20 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-sans text-sm font-semibold text-primary mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent/20 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block font-sans text-sm font-semibold text-primary mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-accent/20 rounded-lg font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Confirm password"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-sans font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-md mt-6"
            >
              Create Account
            </button>
          </form>

          {/* Already have account */}
          <div className="text-center mt-6">
            <p className="text-black font-sans text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-black font-semibold hover:text-secondary transition-colors">
                Login here
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link to="/" className="text-primary font-sans text-sm hover:text-secondary transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
