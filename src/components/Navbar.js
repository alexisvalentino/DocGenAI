import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: 'rgba(26, 26, 26, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 107, 53, 0.1)',
  boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'all 0.3s ease-in-out',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 0',
});

const Logo = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  fontSize: '1.5rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <HideOnScroll>
      <StyledAppBar position="fixed" scrolled={scrolled}>
        <Container maxWidth="lg">
          <StyledToolbar>
            <Logo
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none' }}
            >
              ReportGen AI
            </Logo>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                component={RouterLink}
                to="/"
                variant="text"
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: '#FF6B35',
                    background: 'transparent',
                  },
                }}
              >
                Back to Home
              </Button>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </HideOnScroll>
  );
}

export default Navbar; 