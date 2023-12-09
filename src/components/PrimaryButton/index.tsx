import React from 'react';
import Button from '@mui/material/Button';
import './PrimaryButton.scss'

type PrimaryButtonProps = {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, icon }) => {
  return (
    <div className="component-wrapper">
    <Button className="primaryButton" variant="contained" startIcon={icon} onClick={onClick}>
      {text}
    </Button>
    </div>
  );
};

export default PrimaryButton;
