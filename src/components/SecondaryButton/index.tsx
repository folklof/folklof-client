import React from 'react';
import Button from '@mui/material/Button';
import './SecondaryButton.scss'

type SecondaryButtonProps = {
  text: string;
  onClick: () => void;
};

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, onClick }) => {
  return (
    <div className="component-wrapper">
    <Button className="secondaryButton" variant="contained"  onClick={onClick}>
      {text}
    </Button>
    </div>
  );
};

export default SecondaryButton;
