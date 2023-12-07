import React from 'react';
import Button from '@mui/material/Button';
import './PrimaryButton.scss'

type PrimaryButtonProps = {
  text: string;
  onClick: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick }) => {
  return (
    <div className="component-wrapper">
    <Button className="primaryButton" variant="contained"  onClick={onClick}>
      {text}
    </Button>
    </div>
  );
};

export default PrimaryButton;
