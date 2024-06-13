import { useState } from 'react';
import { useAuth } from '../context/useAuth'; // Adjust the import path as necessary

export default function PasswordReset(){
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { reauthenticate, updatePasswordHandler } = useAuth();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await reauthenticate(currentPassword);
      await updatePasswordHandler(newPassword);
      setSuccess("Password updated successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
