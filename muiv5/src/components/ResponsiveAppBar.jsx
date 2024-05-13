import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { useSetRecoilState } from "recoil";
import { auth } from "../Redux/AuthProvider";

const StyledButton = styled(Button)({
  marginRight: "8px",
  color: "white",
  textDecoration: "none",
});

const ResponsiveAppBar = ({ allowedRoles }) => {
  const setAuth = useSetRecoilState(auth);
  const navigate = useNavigate();
  const logout = async () => {
    setAuth({});
    localStorage.removeItem('jwt');
    navigate('/login');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
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
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
