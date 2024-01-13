import React from 'react';
import Button from '@mui/material/Button';
import './IconButtonPrimary.scss'

type IconButtonPrimaryProps = {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
};

const IconButtonPrimary: React.FC<IconButtonPrimaryProps> = ({ onClick, icon }) => {
  return (
    <div className="component-wrapper">
    <Button className="iconButtonPrimary" variant="contained" onClick={onClick}>
        {icon}
    </Button>
    </div>
  );
};

export default IconButtonPrimary;
