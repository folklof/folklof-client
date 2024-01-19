import React from 'react';
import Button from '@mui/material/Button';
import './IconButtonSecondary.scss'

type IconButtonSecondaryProps = {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  style: string;
};

const IconButtonSecondary: React.FC<IconButtonSecondaryProps> = ({ onClick, icon, style }) => {
  return (
    <div className="component-wrapper">
    <Button className={style} variant="contained" onClick={onClick} >
        {icon}
    </Button>
    </div>
  );
};

export default IconButtonSecondary;
