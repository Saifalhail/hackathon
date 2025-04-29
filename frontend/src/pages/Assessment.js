import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';
import ChatBot from '../components/ChatBot';

// Questions for the assessment
const questions = [
  {
    id: 1,
    question: "What is your level of technical/professional expertise?",
    options: [
      "Beginner - Basic understanding of core concepts",
      "Intermediate - Can apply knowledge in practical situations",
      "Advanced - Can handle complex tasks and solve difficult problems"
    ]
  },
  {
    id: 2,
    question: "How do you prefer to work?",
    options: [
      "Independently - I work best on my own",
      "In small teams - I like collaboration but prefer small groups",
      "In large teams - I thrive in collaborative environments"
    ]
  },
  {
    id: 3,
    question: "What type of work environment interests you most?",
    options: [
      "Corporate - I prefer structured, established organizations",
      "Startup - I enjoy dynamic, fast-paced environments",
      "Entrepreneurial - I want to create my own path"
    ]
  }
];

function Assessment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleComplete = async (chatAnswers) => {
    try {
      setLoading(true);
      setError(null);

      // Format answers for API
      const formattedAnswers = Object.entries(chatAnswers).map(([question, answer]) => ({
        question,
        answer
      }));

      // Send to backend
      const response = await axios.post('http://localhost:8000/api/analyze', {
        answers: formattedAnswers
      });

      // Store results in localStorage
      localStorage.setItem('assessmentResults', JSON.stringify(response.data));
      
      // Navigate to results
      navigate('/results');
    } catch (err) {
      setError('Failed to analyze answers. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: '24px',
          overflow: 'visible',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
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
              Career Assessment
            </Typography>
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Chat Bot Interface */}
          <ChatBot 
            questions={questions.slice(0, 2)} // Only use first two questions
            onComplete={handleComplete}
          />

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Assessment; 