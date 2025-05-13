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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const Dropzone = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: 'rgba(37, 99, 235, 0.04)',
  '&:hover': {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
  },
}));

function Dashboard() {
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
    },
  });

  const handleGenerateReport = async () => {
    if (!template || !data) return;
    
    setLoading(true);
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setLoading(false);
      // Handle the generated report
    }, 2000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Create Your Report
      </Typography>
      
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Step 1: Upload Template
        </Typography>
        <Dropzone {...getRootProps()}>
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography>
            {isDragActive
              ? 'Drop the template here'
              : 'Drag and drop your template here, or click to select'}
          </Typography>
          {template && (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DescriptionIcon sx={{ mr: 1 }} />
              <Typography>{template.name}</Typography>
            </Box>
          )}
        </Dropzone>
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Step 2: Input Data
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          placeholder="Enter your data here..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </StyledPaper>

      <Box sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleGenerateReport}
          disabled={!template || !data || loading}
          sx={{ minWidth: 200 }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
              Generating...
            </>
          ) : (
            'Generate Report'
          )}
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard; 