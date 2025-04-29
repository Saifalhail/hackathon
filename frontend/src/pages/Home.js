import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Stack,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

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
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <Stack spacing={4}>
            {/* Header */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                Career Assessment
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
              >
                Take our comprehensive assessment to get personalized career recommendations
                and discover your ideal career path.
              </Typography>
            </Box>

            {/* Features */}
            <Box sx={{ bgcolor: theme.palette.background.default, p: 3, borderRadius: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}
              >
                What You'll Get
              </Typography>
              <Stack spacing={2}>
                {[
                  'Personalized career recommendations based on your skills and preferences',
                  'Detailed analysis of your strengths and areas for development',
                  'Actionable steps to help you achieve your career goals',
                  'Learning resources tailored to your needs'
                ].map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${theme.palette.primary.main}20`,
                        color: theme.palette.primary.main,
                      }}
                    >
                      ✓
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Action Button */}
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/assessment')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Start Assessment
            </Button>

            {/* Time Estimate */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Estimated time: 5-10 minutes
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Home; 