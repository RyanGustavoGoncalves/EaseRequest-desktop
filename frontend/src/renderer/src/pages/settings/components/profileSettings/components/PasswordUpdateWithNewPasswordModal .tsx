import React from 'react';
import InputField from '../../../../home/components/inputField/InputField';
import { handleInputBlur, handleInputFocus } from '../../../../home/components/utils/handleInput/HandleInput';

interface PasswordUpdateWithNewPasswordModalProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const PasswordUpdateWithNewPasswordModal: React.FC<PasswordUpdateWithNewPasswordModalProps> = ({ label, value, onChange, onClick }) => (
  <div className="password-update-modal">
    <h5>Update Password</h5>
    <p>{label}</p>

    <InputField
      id="password"
      label="New password"
      value={value}
      onChange={onChange}
      onMouseEnter={() => handleInputFocus('passwordLabel')}
      onMouseLeave={() => handleInputBlur('passwordLabel')}
    />

    <div className="btnSave">
      <button onClick={onClick}>to check!</button>
    </div>
  </div>
);

export default PasswordUpdateWithNewPasswordModal;
