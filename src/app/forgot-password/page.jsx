'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('email'); // 'phone' or 'email'
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [timer, setTimer] = useState(60); // Timer for resend OTP
  const router = useRouter();

  // API call to request forgot password OTP
  const handleForgotPasswordOtp = async () => {
    if (method === 'email' && !email) {
      alert('Please enter your email');
      return;
    }
    if (method === 'phone' && !mobile) {
      alert('Please enter your mobile number');
      return;
    }

    const payload = method === 'email' ? { email, mobile: '' } : { email: '', mobile };
    try {
      const response = await fetch('http://localhost:9000/api/v1/learner/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to send OTP');
      }
      console.log('OTP sent:', data);
      setStep(3); // Proceed to OTP verification and password reset
      setTimer(60); // Reset timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert(error.message || 'Failed to send OTP. Please try again.');
    }
  };

  // API call to resend OTP
  const handleResendOtp = async () => {
    if (timer > 0) return;

    if (method === 'email' && !email) {
      alert('Please enter your email');
      return;
    }
    if (method === 'phone' && !mobile) {
      alert('Please enter your mobile number');
      return;
    }

    const payload = method === 'email' ? { email, mobile: '' } : { email: '', mobile };
    try {
      const response = await fetch('http://localhost:9000/api/v1/learner/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to resend OTP');
      }
      console.log('OTP resent:', data);
      setTimer(60); // Reset timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert(error.message || 'Failed to resend OTP. Please try again.');
    }
  };

  // API call to reset password
  const handleResetPassword = async () => {
    const otpValue = parseInt(otp.join('')); // Convert the joined string to a number
    if (isNaN(otpValue) || otpValue.toString().length !== 4) {
      alert('Please enter a valid 4-digit OTP');
      return;
    }
    if (!newPassword) {
      alert('Please enter a new password');
      return;
    }

    const payload = method === 'email' 
      ? { email, mobile: '', otp: otpValue, newPassword } 
      : { email: '', mobile, otp: otpValue, newPassword };
    try {
      const response = await fetch('http://localhost:9000/api/v1/learner/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to reset password');
      }
      console.log('Password reset:', data);
      alert('Password reset successfully! Please login with your new password.');
      // Redirect to the login page
      router.push('/login'); // Adjust this to your login route
    } catch (error) {
      console.error('Error resetting password:', error);
      alert(error.message || 'Failed to reset password. Please try again.');
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {step === 1 && (
          <div>
            <button onClick={() => setStep(1)} className="text-teal-500 mb-4">←</button>
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setMethod('phone')}
                className={`flex-1 py-2 rounded-full border ${
                  method === 'phone' ? 'bg-teal-500 text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                Phone
              </button>
              <button
                onClick={() => setMethod('email')}
                className={`flex-1 py-2 rounded-full border ${
                  method === 'email' ? 'bg-teal-500 text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                Email
              </button>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-teal-500 text-white rounded-full"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-teal-500 mb-4">←</button>
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setMethod('phone')}
                className={`flex-1 py-2 rounded-full border ${
                  method === 'phone' ? 'bg-teal-500 text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                Phone
              </button>
              <button
                onClick={() => setMethod('email')}
                className={`flex-1 py-2 rounded-full border ${
                  method === 'email' ? 'bg-teal-500 text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                Email
              </button>
            </div>
            {method === 'email' ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xyz123@gmail.com"
                className="w-full py-2 px-4 border rounded-lg mb-4"
              />
            ) : (
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="1234567890"
                className="w-full py-2 px-4 border rounded-lg mb-4"
              />
            )}
            <button
              onClick={handleForgotPasswordOtp}
              className="w-full py-3 bg-teal-500 text-white rounded-full"
            >
              Get OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} className="text-teal-500 mb-4">←</button>
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-sm text-gray-500 mb-4">
              We have sent you a 4-digit code to {method === 'email' ? email : mobile}
            </p>
            <div className="flex space-x-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 border rounded-lg text-center text-lg"
                />
              ))}
            </div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full py-2 px-4 border rounded-lg mb-4"
            />
            <p className="text-sm text-gray-500 mb-4">
              Resend Code in 00:{timer < 10 ? `0${timer}` : timer} sec
            </p>
            <button
              onClick={handleResendOtp}
              disabled={timer > 0}
              className={`text-teal-500 mb-4 ${timer > 0 ? 'opacity-50' : ''}`}
            >
              Resend Code
            </button>
            <button
              onClick={handleResetPassword}
              className="w-full py-3 bg-teal-500 text-white rounded-full"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
}