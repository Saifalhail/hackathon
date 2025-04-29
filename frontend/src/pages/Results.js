import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  IconButton,
  useTheme,
  CircularProgress,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Results() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem('assessmentResults');
      if (storedResults) {
        setResults(JSON.parse(storedResults));
      } else {
        setError('No assessment results found. Please take the assessment first.');
      }
    } catch (err) {
      setError('Error loading results. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{ 
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress size={40} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: '24px',
            overflow: 'visible',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                onClick={() => navigate('/')}
                sx={{ mr: 2 }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Assessment Results
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="error" variant="subtitle1" gutterBottom>
                {error}
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/assessment')}
                startIcon={<RestartAltIcon />}
                sx={{ mt: 2 }}
              >
                Take Assessment
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (!results) return null;

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: '24px',
          overflow: 'visible',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Your Career Assessment Report
            </Typography>
          </Box>

          {/* Profile Summary */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Profile Summary
              </Typography>
            </Box>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: `${theme.palette.primary.main}08`,
                borderRadius: 3,
                border: '1px solid',
                borderColor: `${theme.palette.primary.main}20`,
              }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ whiteSpace: 'pre-line' }}
              >
                {results.profile_summary}
              </Typography>
            </Paper>
          </Box>

          {/* Main Results */}
          <Stack spacing={4}>
            {/* Strengths */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Key Strengths
                </Typography>
              </Box>
              <List>
                {results.strengths?.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText primary={strength} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider />

            {/* Areas for Development */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Areas for Development
                </Typography>
              </Box>
              <List>
                {results.areas_for_development?.map((area, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ArrowForwardIcon sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText primary={area} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider />

            {/* Recommended Career Paths */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recommended Career Paths
                </Typography>
              </Box>
              <Stack spacing={3}>
                {results.recommended_paths?.map((path, index) => (
                  <Card
                    key={index}
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {path.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {path.description}
                      </Typography>

                      {/* Required Skills */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.primary.main }}>
                          Required Skills
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                          {path.required_skills.map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={skill}
                              size="small"
                              sx={{
                                backgroundColor: `${theme.palette.primary.main}10`,
                                color: theme.palette.primary.main,
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>

                      {/* Learning Resources */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.primary.main }}>
                          Learning Resources
                        </Typography>
                        <List dense>
                          {path.learning_resources.map((resource, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon>
                                <MenuBookIcon sx={{ color: theme.palette.primary.main }} />
                              </ListItemIcon>
                              <ListItemText primary={resource} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      {/* Next Steps */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.primary.main }}>
                          Next Steps
                        </Typography>
                        <List dense>
                          {path.next_steps.map((step, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon>
                                <ArrowForwardIcon sx={{ color: theme.palette.primary.main }} />
                              </ListItemIcon>
                              <ListItemText primary={step} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* Action Buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 4,
              pt: 4,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={() => navigate('/assessment')}
              sx={{ flex: 1 }}
            >
              Retake Assessment
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{ flex: 1 }}
            >
              Back to Home
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Results; 