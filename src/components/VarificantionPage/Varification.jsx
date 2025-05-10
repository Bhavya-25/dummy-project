// 'use client';

// import { useEffect, useState } from 'react';

// export default function Varification() {
//   const [resendTimer, setResendTimer] = useState(59);
//   const [code, setCode] = useState('');

//   useEffect(() => {
//     if (resendTimer > 0) {
//       const interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [resendTimer]);

//   return (
//     <div className="min-h-screen bg-white px-6 pt-10 flex flex-col">
//       {/* Back Arrow */}
//       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
//         <span className="text-2xl">{'←'}</span>
//       </div>

//       {/* Title */}
//       <h1 className="text-2xl font-semibold text-center mt-4">Verification</h1>

//       {/* Subheading */}
//       <div className="text-center mt-6">
//         <h2 className="text-lg font-semibold">We have sent you a 4-digit code</h2>
//         <p className="text-sm text-gray-500 mt-1">
//           Enter the 4-digit code we sent to +91-89650 02350
//         </p>
//       </div>

//       {/* Input with Timer */}
//       <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-3 mt-6">
//         <input
//           type="number"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           className="text-xl font-semibold w-2/3 outline-none bg-transparent"
//           maxLength={4}
//         />
//         <span className="text-gray-500 text-sm">
//           {60 - resendTimer} sec
//         </span>
//       </div>

//       {/* Resend Timer */}
//       <p className="text-sm text-black font-medium mt-4">
//         Resend Code IN 0:{resendTimer < 10 ? `0${resendTimer}` : resendTimer} sec
//       </p>

//       {/* Terms */}
//       <p className="text-gray-500 text-xs mt-4 leading-relaxed">
//         By signing up, you confirm that you agree to our Terms of Use and have read and understood our Privacy Policy. You will receive an SMS to confirm your phone number. SMS fee may apply.
//       </p>

//       {/* Verify Button */}
//       <button className="bg-teal-600 text-white text-sm font-semibold rounded-full px-6 py-3 mt-6 w-full">
//         Verify
//       </button>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // For navigation after success

export default function Verification() {
  const [resendTimer, setResendTimer] = useState(59);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Hardcoded mobile number (in practice, get this from props, context, or localStorage)
  const mobile = '+918965002350'; // Adjust based on your app's flow

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleVerify = async () => {
    if (code.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:9000/api/v1/learner/verify-otp', {
        mobile, // or email if used in registration
        otp: code,
      });

      if (response.data.status === 'success') {
        // Store token (e.g., in localStorage or context) and redirect
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        alert('OTP Verified Successfully!');
        router.push('/dashboard'); // Redirect to dashboard or next page
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return; // Prevent resend until timer expires

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:9000/api/v1/learner/resend-otp', {
        mobile, // or email
      });

      if (response.data.status === 'success') {
        setResendTimer(59); // Reset timer
        alert('OTP Resent Successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-10 flex flex-col">
      {/* Back Arrow */}
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-2xl">{'←'}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center mt-4">Verification</h1>

      {/* Subheading */}
      <div className="text-center mt-6">
        <h2 className="text-lg font-semibold">We have sent you a 4-digit code</h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter the 4-digit code we sent to {mobile}
        </p>
      </div>

      {/* Input with Timer */}
      <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-3 mt-6">
        <input
          type="number"
          value={code}
          onChange={(e) => setCode(e.target.value.slice(0, 4))} // Limit to 4 digits
          className="text-xl font-semibold w-2/3 outline-none bg-transparent"
          maxLength={4}
          disabled={loading}
        />
        <span className="text-gray-500 text-sm">
          {60 - resendTimer} sec
        </span>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Resend Timer */}
      <p className="text-sm text-black font-medium mt-4">
        Resend Code IN 0:{resendTimer < 10 ? `0${resendTimer}` : resendTimer} sec
      </p>
      {resendTimer === 0 && (
        <button
          onClick={handleResend}
          className="text-teal-600 text-sm font-semibold mt-2"
          disabled={loading}
        >
          Resend OTP
        </button>
      )}

      {/* Terms */}
      <p className="text-gray-500 text-xs mt-4 leading-relaxed">
        By signing up, you confirm that you agree to our Terms of Use and have read and understood our Privacy Policy. You will receive an SMS to confirm your phone number. SMS fee may apply.
      </p>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className={`bg-teal-600 text-white text-sm font-semibold rounded-full px-6 py-3 mt-6 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
    </div>
  );
}