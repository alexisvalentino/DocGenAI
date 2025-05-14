import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Help as HelpIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const Dropzone = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: 'rgba(255, 107, 53, 0.04)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255, 107, 53, 0.08)',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ProcessCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(255, 107, 53, 0.2)',
  },
}));

const steps = ['Upload Template', 'Input Data', 'Generate Report'];

const processSteps = [
  {
    title: 'Upload Template',
    description: 'Start by uploading your document template in DOCX or PDF format.',
    icon: <CloudUploadIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: '#FF6B35' }} />,
  },
  {
    title: 'Input Data',
    description: 'Provide your data in a structured format or let our AI extract it from your input.',
    icon: <EditIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: '#FF6B35' }} />,
  },
  {
    title: 'AI Processing',
    description: 'Our AI analyzes your template and data to generate a professional document.',
    icon: <DescriptionIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: '#FF6B35' }} />,
  },
  {
    title: 'Download Report',
    description: 'Get your professionally formatted document ready for use.',
    icon: <CheckCircleIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: '#FF6B35' }} />,
  },
];

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const [template, setTemplate] = useState(null);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setTemplate(acceptedFiles[0]);
      setActiveStep(1);
    },
  });

  const handleGenerateReport = async () => {
    if (!template || !data) return;
    
    setLoading(true);
    setActiveStep(2);
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setLoading(false);
      // Handle the generated report
    }, 2000);
  };

  const handleRemoveTemplate = () => {
    setTemplate(null);
    setActiveStep(0);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      pt: { xs: 6, sm: 8, md: 10 },
      pb: { xs: 4, sm: 6, md: 8 },
      position: 'relative',
    }}>
      {/* Back to Home Button */}
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              color: 'white',
              mb: { xs: 4, sm: 6 },
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Create Your Document
          </Typography>

          {/* Process Overview */}
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProcessCard>
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      p: { xs: 2, sm: 3 },
                    }}>
                      {step.icon}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mt: { xs: 1, sm: 2 }, 
                          mb: { xs: 0.5, sm: 1 }, 
                          color: 'white',
                          fontSize: { xs: '1rem', sm: '1.25rem' },
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                        }}
                      >
                        {step.description}
                      </Typography>
                    </CardContent>
                  </ProcessCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Stepper */}
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel={!isMobile}
            orientation={isMobile ? "vertical" : "horizontal"}
            sx={{ 
              mb: { xs: 4, sm: 6 },
              '& .MuiStepLabel-label': {
                color: 'white',
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
              '& .MuiStepIcon-root': {
                color: 'rgba(255, 255, 255, 0.2)',
                '&.Mui-active': {
                  color: '#FF6B35',
                },
                '&.Mui-completed': {
                  color: '#FF6B35',
                },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Main Content */}
          <StyledPaper>
            {activeStep === 0 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'white',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    Upload Your Template
                  </Typography>
                  <Tooltip title="Supported formats: DOCX, PDF">
                    <IconButton 
                      size="small" 
                      sx={{ 
                        ml: 1, 
                        color: 'rgba(255, 255, 255, 0.7)',
                        '& svg': {
                          fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        },
                      }}
                    >
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Dropzone {...getRootProps()}>
                  <input {...getInputProps()} />
                  <CloudUploadIcon sx={{ 
                    fontSize: { xs: 36, sm: 48 }, 
                    color: '#FF6B35', 
                    mb: { xs: 1, sm: 2 } 
                  }} />
                  <Typography sx={{ 
                    color: 'white',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}>
                    {isDragActive
                      ? 'Drop the template here'
                      : 'Drag and drop your template here, or click to select'}
                  </Typography>
                  {template && (
                    <Box sx={{ 
                      mt: { xs: 1, sm: 2 }, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}>
                      <DescriptionIcon sx={{ color: '#FF6B35' }} />
                      <Typography sx={{ 
                        color: 'white',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      }}>
                        {template.name}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTemplate();
                        }}
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          '& svg': {
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Dropzone>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white', 
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  }}
                >
                  Input Your Data
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={isMobile ? 4 : 6}
                  variant="outlined"
                  placeholder="Enter your data here... You can use JSON format or plain text. Our AI will understand and structure it appropriately."
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#FF6B35',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#FF6B35',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                  }}
                />
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
                <CircularProgress sx={{ 
                  color: '#FF6B35', 
                  mb: { xs: 1, sm: 2 },
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  }}
                >
                  Generating your document...
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)', 
                    mt: 1,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  This may take a few moments
                </Typography>
              </Box>
            )}
          </StyledPaper>

          <Box sx={{ 
            mt: { xs: 3, sm: 4 }, 
            mb: { xs: 4, sm: 8 }, 
            textAlign: 'center' 
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleGenerateReport}
              disabled={!template || !data || loading}
              sx={{
                minWidth: { xs: 160, sm: 200 },
                background: 'linear-gradient(45deg, #FF6B35 30%, #FF9F1C 90%)',
                color: 'white',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                padding: { xs: '8px 16px', sm: '12px 24px' },
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF9F1C 30%, #FF6B35 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(255, 107, 53, 0.3)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {loading ? (
                <>
                  <CircularProgress 
                    size={20} 
                    sx={{ 
                      mr: 1,
                      width: { xs: 16, sm: 20 },
                      height: { xs: 16, sm: 20 },
                    }} 
                    color="inherit" 
                  />
                  Generating...
                </>
              ) : (
                'Generate Document'
              )}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Dashboard; 