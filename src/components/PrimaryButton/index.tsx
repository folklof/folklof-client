import React from 'react';
import Button from '@mui/material/Button';
import './PrimaryButton.scss'

type PrimaryButtonProps = {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, icon, disabled, type }) => {
  return (
    <div className="component-wrapper">
    <Button className="primaryButton" variant="contained" type={type} startIcon={icon} onClick={onClick} disabled={disabled}>
      {text}
    </Button>
    </div>
  );
};

export default PrimaryButton;
