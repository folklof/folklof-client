import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const TopNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", width: "100%", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{ color: "#CFCFCF", fontWeight: "bold", cursor: 'pointer' }}
            onClick={handleLogoClick}
          >
            FOLKLOF
          </Typography>

          <Button
            sx={{ color: "#FFFFFF", fontWeight: "bold", textTransform: "none" }}
            onClick={handleSignInClick}
          >
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNavbar;
