import { styled, Typography } from "@mui/material";

export const Widget = styled("div")(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: "100%",
    maxWidth: "100%",
    margin: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0,0,0,0.6)"
        : "rgba(242,242,242, 0.0)",
    backdropFilter: "blur(40px)",
}));

export const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});