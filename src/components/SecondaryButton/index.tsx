import React from 'react';
import Button from '@mui/material/Button';
import './SecondaryButton.scss'

type SecondaryButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick, icon }) => {
  return (
    <div className="component-wrapper">
    <Button className="secondaryButton" variant="contained" startIcon={icon}  onClick={onClick}>
      {text}
    </Button>
    </div>
  );
};

export default SecondaryButton;
