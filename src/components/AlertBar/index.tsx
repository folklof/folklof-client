import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { SlideProps } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface State extends SnackbarOrigin {
  open: boolean;
}

interface AlertBarProps {
  newState: SnackbarOrigin;
  message: string;
  transition?: React.ComponentType<SlideProps>;
  severity?: AlertProps['severity'];
}

const AlertBar: React.FC<AlertBarProps> = ({ newState, message, transition, severity }) => {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...newState,
      open: true,
    }));
  }, [newState]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={transition ? transition.name + vertical + horizontal : undefined}
        TransitionComponent={transition}
      >
        <MuiAlert
        elevation={6}
        variant="filled"
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AlertBar;
