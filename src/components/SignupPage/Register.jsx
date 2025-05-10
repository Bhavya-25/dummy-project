'use client';

import { useState } from 'react';

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState('Phone');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    setLoading(true);
    setMessage('');

    const payload =
      activeTab === 'Phone'
        ? { mobile, password: 'password123' }
        : { email, password: 'password123' };

    try {
      const response = await fetch('http://localhost:9000/api/v1/learner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Registered successfully!');
        alert('User:', data.user);
      } else {
        setMessage(`❌ ${data.message || 'Registration failed'}`);
      }
    } catch (err) {
      setMessage('❌ Network error');
      alert("❌ Network error")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-10">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-2xl">{'←'}</span>
      </div>

      <h1 className="text-2xl font-semibold text-center mt-4">Sign up</h1>

      <div className="flex justify-center space-x-10 mt-8 text-lg font-medium">
        <button
          className={`pb-2 ${activeTab === 'Phone' ? 'border-b-4 border-teal-600 text-black' : 'text-gray-400'}`}
          onClick={() => setActiveTab('Phone')}
        >
          Phone
        </button>
        <button
          className={`pb-2 ${activeTab === 'Email' ? 'border-b-4 border-teal-600 text-black' : 'text-gray-400'}`}
          onClick={() => setActiveTab('Email')}
        >
          Email
        </button>
      </div>

      {activeTab === 'Phone' ? (
        <div className="flex items-center mt-6 border border-gray-300 rounded-full px-4 py-2">
          <select className="outline-none bg-transparent text-sm mr-2">
            <option value="+91">IN +91</option>
            <option value="+1">US +1</option>
          </select>
          <input
            type="tel"
            placeholder="Phone number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm"
          />
        </div>
      ) : (
        <div className="mt-6 border border-gray-300 rounded-full px-4 py-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />
        </div>
      )}

      <p className="text-gray-500 text-xs mt-4 text-center leading-relaxed">
        By signing up, you confirm that you agree to our Terms of Use and have read and understood our Privacy Policy.
        You will receive an SMS or email to confirm your identity. Message or data fees may apply.
      </p>

      <button
        onClick={handleRegister}
        disabled={loading}
        className="bg-teal-600 text-white text-sm font-semibold rounded-full px-6 py-3 mt-6 mx-auto w-full disabled:opacity-50"
      >
        {loading
          ? 'Registering...'
          : activeTab === 'Phone'
          ? 'Enter Your Number'
          : 'Enter Your Email'}
      </button>

      {message && (
        <p className="text-center mt-4 text-sm font-medium text-red-500">{message}</p>
      )}
    </div>
  );
}
