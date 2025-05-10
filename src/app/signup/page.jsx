'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [signUpMethod, setSignUpMethod] = useState('otp'); // 'otp' or 'password'
  const [method, setMethod] = useState('email'); // 'phone' or 'email'
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60); // Timer for resend OTP
  const router = useRouter();

  // API call to register user with password
  const handleRegisterWithPassword = async () => {
    if (method === 'email' && !email) {
      alert('Please enter your email');
      return;
    }
    if (method === 'phone' && !mobile) {
      alert('Please enter your mobile number');
      return;
    }
    if (!password) {
      alert('Please enter your password');
      return;
    }

    const payload = method === 'email' ? { email, password } : { mobile, password };
    try {
      const response = await fetch('http://localhost:9000/api/v1/learner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to register user');
      }
      console.log('User registered:', data);
      // After successful registration, request OTP
      setStep(signUpMethod === 'otp' ? 3 : 4); // Step 3 for OTP flow, Step 4 for password flow
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
      console.error('Error registering user:', error);
      alert(error.message || 'Failed to register user. Please try again.');
    }
  };

  // API call to register OTP
  const handleSendOtp = async () => {
    if (method === 'email' && !email) {
      alert('Please enter your email');
      return;
    }
    if (method === 'phone' && !mobile) {
      alert('Please enter your mobile number');
      return;
    }

    const payload = method === 'email' ? { email } : { mobile };
    try {
      const response = await fetch('http://localhost:9000/api/v1/learner/register-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to send OTP');
      }
      console.log('OTP sent:', data);
      setStep(signUpMethod === 'otp' ? 3 : 4); // Step 3 for OTP flow, Step 4 for password flow
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
    console.log(payload,"==================");
    console.log(method,"==================");
    
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

  // API call to verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = parseInt(otp.join('')); // Convert the joined string to a number
    if (isNaN(otpValue) || otpValue.toString().length !== 4) {
      alert('Please enter a valid 4-digit OTP');
      return;
    }

    const payload = method === 'email' ? { email, mobile: '', otp: otpValue } : { email: '', mobile, otp: otpValue };
    try {
      const response = await fetch('http://localhost:9000/api/v1/learner/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') {
        throw new Error(data.message || 'Failed to verify OTP');
      }
      console.log('OTP verified:', data);
      // Store the token for future authenticated requests (e.g., in localStorage)
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      // Redirect to the homepage
      router.push('/'); // Adjust this to the next route in your app
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert(error.message || 'Invalid OTP. Please try again.');
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
            <h1 className="text-2xl font-bold mb-4">Sign up</h1>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSignUpMethod('password')}
                className={`flex-1 py-2 rounded-full border ${
                  signUpMethod === 'password' ? 'bg-teal-500 text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                Phone/Email & Password
              </button>
              <button
                onClick={() => setSignUpMethod('otp')}
                className={`flex-1 py-2 rounded-full border ${
                  signUpMethod === 'otp' ? 'bg-teal-500 text-white' : 'border-gray-300 text-gray-700'
                }`}
              >
                Phone/Email & OTP
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              By signing up, you agree to our Terms of Use and Privacy Policy. You may
              receive SMS notifications from us and can opt out anytime.
            </p>
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
            <h1 className="text-2xl font-bold mb-4">Sign up</h1>
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
            {signUpMethod === 'password' && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full py-2 px-4 border rounded-lg mb-4"
              />
            )}
            <p className="text-sm text-gray-500 mb-4">
              By signing up, you agree to our Terms of Use and Privacy Policy. You may
              receive SMS notifications from us and can opt out anytime.
            </p>
            <button
              onClick={signUpMethod === 'otp' ? handleSendOtp : handleRegisterWithPassword}
              className="w-full py-3 bg-teal-500 text-white rounded-full"
            >
              {signUpMethod === 'otp' ? 'Get OTP' : 'Register'}
            </button>
          </div>
        )}

        {(step === 3 || step === 4) && (
          <div>
            <button onClick={() => setStep(2)} className="text-teal-500 mb-4">←</button>
            <h1 className="text-2xl font-bold mb-2">Verification</h1>
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
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-teal-500 text-white rounded-full"
            >
              Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
}