import { useState, useTransition } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { sendPasswordReset } = useAuth();
  const [isPending, startTransition] = useTransition();

  const handlePasswordReset = async () => {
    try {
      await sendPasswordReset(email);
      startTransition(() => {
        setMessage("Password reset email sent successfully.");
      });
      navigate('/login');
    } catch (error) {
      const errorMessage = error.message.match(/auth\/([^)]+)/);
      startTransition(() => {
        setError(errorMessage[1]);
      });
    }
  };

  const handleBackToLogin = () => {
    startTransition(() => {
      navigate('/login');
    });
  };

  return (
    <div className="flex flex-col justify-center shadow-md rounded-md m-auto p-4 w-full max-w-md h-full md:h-auto mt-[5%]">
      <h3 className="font-bold mb-4 text-xl mt-2">Reset Password</h3>
      <div className="flex items-start flex-col p-3">
        <label className="text-lg mb-1">Email</label>
        <input
          type="email"
          placeholder="email"
          required=""
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col justify-center items-end w-full">
          <button
            onClick={handlePasswordReset}
            className="inline-flex mt-4 w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send Password Reset Email'}
          </button>
          <button
            onClick={handleBackToLogin}
            className="justify-end mt-2 text-blue-500 font-light text-md"
          >
            Back to login
          </button>
        </div>
        {error && (
          <div className="absolute top-0 right-0 bg-red-400 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
            {error}
          </div>
        )}
        {message && (
          <div className="absolute top-0 right-0 bg-green-400 text-white px-8 lg:px-10 py-1 flex justify-center items-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
