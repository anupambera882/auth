import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
} from "@mui/material";

const StyledButton = styled(Button)({
  marginRight: "8px",
  color: "white",
  textDecoration: "none",
});

const ResponsiveAppBar = ({ allowedRoles }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit',flexGrow: 1 }}>
          My Website
        </Typography>
        <div>
          <StyledButton component={Link} to="/" color="inherit">
            Home
          </StyledButton>
          {allowedRoles.includes("Admin") && (
            <StyledButton component={Link} to="/user" color="inherit">
              User
            </StyledButton>
          )}
          <StyledButton component={Link} to="/contact" color="inherit">
            Contact
          </StyledButton>
          <StyledButton component={Link} to="/faq" color="inherit">
            FAQ
          </StyledButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
