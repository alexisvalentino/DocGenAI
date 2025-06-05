import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaCheckCircle } from 'react-icons/fa';
import DescriptionIcon from '@mui/icons-material/Description';

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(26, 26, 26, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 107, 53, 0.1)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2em',
    color: '#FF6B35',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: theme.spacing(0, 1),
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
    transition: 'all 0.3s ease-in-out',
    transform: 'translateX(-50%)',
  },
  '&:hover': {
    color: '#FF6B35',
    background: 'transparent',
    '&::after': {
      width: '80%',
    },
  },
}));

const LaunchButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
  color: 'white',
  marginLeft: theme.spacing(2),
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 24px',
  borderRadius: '30px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF9F1C 30%, #FF6B35 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(255, 107, 53, 0.3)',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(4),
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  width: '100%',
}));

const HeroBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
  zIndex: 1,
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
}));

const FloatingShape = styled(motion.div)({
  position: 'absolute',
  width: '400px',
  height: '400px',
  background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
  borderRadius: '50%',
  filter: 'blur(80px)',
  opacity: 0.15,
});

const FeatureList = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const GlobeContainer = styled(Box)({
  width: '100%',
  height: '500px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Globe = styled(Box)({
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.2) 50%, transparent 55%)',
    animation: 'rotate 20s linear infinite',
  },
});

const WorkflowSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
  color: 'white',
}));

const WorkflowStep = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const features = [
  'AI-powered document generation',
  'Multiple document formats support',
  'Customizable templates',
  'Real-time collaboration',
  'Secure and private',
];

const workflowSteps = [
  {
    title: 'Template First',
    description: 'Upload your template document (DOCX or PDF) that serves as the blueprint for your final document.',
    icon: '📄',
    details: [
      'Template serves as the structure blueprint',
      'Supports DOCX and PDF formats',
      'Maintains your desired document layout'
    ]
  },
  {
    title: 'Data Input',
    description: 'Provide your data that will be formatted according to the template structure.',
    icon: '📝',
    details: [
      'Enter your content and data',
      'Support for text, numbers, and more',
      'Easy data input interface'
    ]
  },
  {
    title: 'AI Generation',
    description: 'Our AI analyzes and combines your template with data while maintaining perfect formatting.',
    icon: '🤖',
    details: [
      'Intelligent template analysis',
      'Perfect formatting preservation',
      'Smart data placement'
    ]
  },
  {
    title: 'Final Output',
    description: 'Get a professional document that matches your template exactly, now filled with your data.',
    icon: '✨',
    details: [
      'Identical to template structure',
      'Professional formatting',
      'Ready to use immediately'
    ]
  }
];

const benefits = [
  {
    title: 'Save Time',
    description: 'Generate professional documents in minutes instead of hours',
    icon: '⚡',
  },
  {
    title: 'Ensure Consistency',
    description: 'Maintain consistent formatting and style across all documents',
    icon: '✨',
  },
  {
    title: 'Reduce Errors',
    description: 'AI-powered validation ensures accuracy in your documents',
    icon: '🎯',
  },
  {
    title: 'Scale Efficiently',
    description: 'Handle large volumes of documents with ease',
    icon: '📈',
  },
];

const useCases = [
  {
    icon: '📊',
    title: 'Business Reports',
    description: 'Generate professional business reports, financial statements, and executive summaries with AI-powered insights.',
    examples: ['Quarterly financial reports', 'Executive summaries', 'Market analysis reports'],
  },
  {
    icon: '⚖️',
    title: 'Legal Documents',
    description: 'Create contracts, agreements, and legal documents with precise formatting and professional language.',
    examples: ['Employment contracts', 'NDAs', 'Service agreements'],
  },
  {
    icon: '📢',
    title: 'Marketing Materials',
    description: 'Design compelling marketing copy, brochures, and promotional materials that engage your audience.',
    examples: ['Product brochures', 'Marketing proposals', 'Campaign reports'],
  },
  {
    icon: '🎓',
    title: 'Academic Papers',
    description: 'Format research papers, theses, and academic documents with proper citations and academic style.',
    examples: ['Research papers', 'Thesis documents', 'Academic reports'],
  },
  {
    icon: '💻',
    title: 'Technical Documentation',
    description: 'Generate clear and concise technical documentation, user guides, and API references.',
    examples: ['API documentation', 'User manuals', 'Technical specifications'],
  },
];

function LandingPage() {
  const isMobile = useMediaQuery('(max-width:900px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    setSnackbar({
      open: true,
      message: 'Thank you for joining our waitlist!',
    });
    setEmail('');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', position: 'relative' }}>
      <StyledAppBar>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Logo variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
            <DescriptionIcon />
            Dokumento AI
          </Logo>
          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ color: 'white' }}
            >
              <FaBars />
            </IconButton>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              gap: 2
            }}>
              <ScrollLink to="features" smooth={true} duration={500}>
                <NavButton>Features</NavButton>
              </ScrollLink>
              <ScrollLink to="workflow" smooth={true} duration={500}>
                <NavButton>How It Works</NavButton>
              </ScrollLink>
              <ScrollLink to="use-cases" smooth={true} duration={500}>
                <NavButton>Use Cases</NavButton>
              </ScrollLink>
              <ScrollLink to="benefits" smooth={true} duration={500}>
                <NavButton>Benefits</NavButton>
              </ScrollLink>
            </Box>
          )}
          {!isMobile && (
            <LaunchButton
              component={RouterLink}
              to="/dashboard"
              variant="contained"
            >
              Get Started
            </LaunchButton>
          )}
        </Toolbar>
        {isMobile && mobileMenuOpen && (
          <Box
            sx={{
              background: 'rgba(26, 26, 26, 0.98)',
              backdropFilter: 'blur(10px)',
              p: 2,
              borderTop: '1px solid rgba(255, 107, 53, 0.1)',
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <ScrollLink to="features" smooth={true} duration={500}>
                  <NavButton fullWidth>Features</NavButton>
                </ScrollLink>
              </Grid>
              <Grid item>
                <ScrollLink to="workflow" smooth={true} duration={500}>
                  <NavButton fullWidth>How It Works</NavButton>
                </ScrollLink>
              </Grid>
              <Grid item>
                <ScrollLink to="use-cases" smooth={true} duration={500}>
                  <NavButton fullWidth>Use Cases</NavButton>
                </ScrollLink>
              </Grid>
              <Grid item>
                <ScrollLink to="benefits" smooth={true} duration={500}>
                  <NavButton fullWidth>Benefits</NavButton>
                </ScrollLink>
              </Grid>
              <Grid item>
                <LaunchButton
                  component={RouterLink}
                  to="/dashboard"
                  variant="contained"
                  fullWidth
                >
                  Get Started
                </LaunchButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </StyledAppBar>

      <Box sx={{ pt: { xs: 7, sm: 8 } }}>
        <HeroSection>
          <HeroBackground />
          <FloatingShape
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ top: '20%', left: '10%', zIndex: 2 }}
          />
          <FloatingShape
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ bottom: '20%', right: '10%', zIndex: 2 }}
          />
          
          <Container maxWidth="lg">
            <HeroContent>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <GradientText 
                      variant="h1" 
                      gutterBottom
                      sx={{
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      Transform Your Documents with AI
                    </GradientText>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 4, 
                        opacity: 0.9,
                        fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      Experience the future of document generation with Dokumento AI. Upload your template, provide your data, and let our AI create professional documents in seconds.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {features.map((feature, index) => (
                        <FeatureList key={index}>
                          <FaCheckCircle color="#FF6B35" />
                          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                            {feature}
                          </Typography>
                        </FeatureList>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <GlobeContainer>
                      <Globe />
                    </GlobeContainer>
                  </motion.div>
                </Grid>
              </Grid>
            </HeroContent>
          </Container>
        </HeroSection>

        <WorkflowSection id="workflow">
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              textAlign="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              How It <GradientText component="span">Works</GradientText>
            </Typography>
            
            <Grid container spacing={4}>
              {workflowSteps.map((step, index) => (
                <Grid item xs={12} md={6} lg={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <WorkflowStep>
                      <Typography variant="h1" sx={{ mb: 2, fontSize: '2.5rem' }}>
                        {step.icon}
                      </Typography>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                        {step.description}
                      </Typography>
                      <Box component="ul" sx={{ pl: 2 }}>
                        {step.details.map((detail, idx) => (
                          <Typography
                            component="li"
                            key={idx}
                            variant="body2"
                            sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {detail}
                          </Typography>
                        ))}
                      </Box>
                    </WorkflowStep>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </WorkflowSection>

        {/* Features Section */}
        <Box id="features" sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ color: 'white', mb: 6 }}
            >
              Key Features
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <FaCheckCircle color="#FF6B35" size={24} />
                        <Typography variant="h6" sx={{ ml: 2, color: 'white' }}>
                          {feature}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Use Cases Section */}
        <Box id="use-cases" sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ color: 'white', mb: 6 }}
            >
              Perfect for Every Document Type
            </Typography>
            <Grid container spacing={4}>
              {useCases.map((useCase, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Typography variant="h1" sx={{ mb: 2, color: '#FF6B35' }}>
                        {useCase.icon}
                      </Typography>
                      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                        {useCase.title}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                        {useCase.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {useCase.examples.map((example, idx) => (
                          <Typography
                            key={idx}
                            sx={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '0.9rem',
                              mb: 0.5,
                            }}
                          >
                            • {example}
                          </Typography>
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Benefits Section */}
        <Box id="benefits" sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{ color: 'white', mb: 6 }}
            >
              Why Choose Dokumento AI?
            </Typography>
            <Grid container spacing={4}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <Typography variant="h1" sx={{ mb: 2, color: '#FF6B35' }}>
                        {benefit.icon}
                      </Typography>
                      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                        {benefit.title}
                      </Typography>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {benefit.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Waitlist Section */}
        <Box id="waitlist" sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="md">
            <Paper
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h4" gutterBottom align="center" sx={{ color: 'white' }}>
                Join Dokumento AI Waitlist
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}>
                Be the first to know when we launch and get early access to our AI-powered document generation platform.
              </Typography>
              <form onSubmit={handleWaitlistSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#FF6B35',
                          },
                          '&:hover fieldset': {
                            borderColor: '#FF9F1C',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF9F1C 30%, #FF6B35 90%)',
                        },
                      }}
                    >
                      Join Waitlist
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LandingPage; 