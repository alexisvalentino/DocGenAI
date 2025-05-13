import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DescriptionIcon from '@mui/icons-material/Description';
import SpeedIcon from '@mui/icons-material/Speed';

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
  color: 'white',
  textAlign: 'center',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

function LandingPage() {
  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Transform Your Data into Professional Reports
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Upload your template, provide your data, and let AI create stunning reports in seconds
          </Typography>
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Get Started
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={2}>
              <FeatureIcon>
                <AutoAwesomeIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography variant="h5" gutterBottom>
                AI-Powered
              </Typography>
              <Typography color="text.secondary">
                Our advanced AI analyzes your data and creates professional reports automatically
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={2}>
              <FeatureIcon>
                <DescriptionIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography variant="h5" gutterBottom>
                Custom Templates
              </Typography>
              <Typography color="text.secondary">
                Upload your own templates or use our pre-designed professional templates
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={2}>
              <FeatureIcon>
                <SpeedIcon fontSize="inherit" />
              </FeatureIcon>
              <Typography variant="h5" gutterBottom>
                Fast & Efficient
              </Typography>
              <Typography color="text.secondary">
                Generate reports in seconds, saving you hours of manual work
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LandingPage; 