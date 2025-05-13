import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
});

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(37, 99, 235, 0.04)',
  },
}));

function Navbar() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
          }}
        >
          ReportGen AI
        </Typography>
        <Box>
          <NavButton component={RouterLink} to="/dashboard">
            Get Started
          </NavButton>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Navbar; 