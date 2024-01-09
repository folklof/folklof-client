import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Typography } from '@mui/material';


const QuizBackdrop = ()=> {
  const [open] = React.useState(true);  

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'absolute',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '22px',
        backdropFilter: 'blur(2px)',
        transition: 'background 3s, backdrop-filter 3s',
      }}
      open={open}
    >
      <Typography variant='body1'
        sx={{
          background: "#505050",
          padding: 1,
          paddingLeft: 2,
          paddingRight: 2,
          borderRadius: 2
          }}
        >
        You have already completed quiz for this book.
      </Typography>
    </Backdrop>
  );
}

export default QuizBackdrop