import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, useMediaQuery, Box, Typography } from "@mui/material";
import theme from "./theme/theme";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width:324px)");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}></PersistGate>
          <ThemeProvider theme={theme}>
            {isLargeScreen ? (
              <AppRoutes />
            ) : (
              <Box sx={{ textAlign: "center", marginTop: "50%" }}>
                <Typography sx={{ color: "white" }} variant="h5">
                  {" "}
                  Website is currently only available on larger screens.
                </Typography>
                <Typography sx={{ color: "white", margin: 2 }} variant="body1">
                  Please access the website from a device with a wider screen.
                </Typography>
              </Box>
            )}
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
