import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Stack,
  Avatar,
  Fade,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Lottie from 'react-lottie-player';

const AI_CONVERSATION_STARTERS = [
  "Based on your expertise level as {expertise} and preference for {workstyle}, let's explore some career paths that would suit you.",
  "I see you're {expertise} and prefer {workstyle}. Let's discuss some opportunities that match your profile.",
  "With your {expertise} expertise and interest in {workstyle}, there are several interesting paths we could explore."
];

// Using a popular robot animation from LottieFiles
const ROBOT_ANIMATION_URL = 'https://assets2.lottiefiles.com/private_files/lf30_WdTEui.json';

function ChatMessage({ message, isBot }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
      }}
    >
      {isBot && (
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 32,
            height: 32,
          }}
        >
          🤖
        </Avatar>
      )}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          bgcolor: isBot ? 'grey.100' : 'primary.main',
          color: isBot ? 'text.primary' : 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
      {!isBot && (
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            width: 32,
            height: 32,
          }}
        >
          👤
        </Avatar>
      )}
    </Stack>
  );
}

function QuestionCard({ question, onAnswer, currentAnswer }) {
  return (
    <Card elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {question.question}
        </Typography>
        <Stack spacing={2}>
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={currentAnswer === option ? "contained" : "outlined"}
              color="primary"
              onClick={() => onAnswer(option)}
              fullWidth
              sx={{ 
                borderRadius: 2,
                justifyContent: 'flex-start',
                px: 3,
                py: 1.5,
                textAlign: 'left',
                whiteSpace: 'normal',
                height: 'auto'
              }}
            >
              {option}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function ChatBot({ questions, onComplete }) {
  const [phase, setPhase] = useState('initial');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const chatEndRef = useRef(null);
  const speechSynthesis = window.speechSynthesis;
  const recognition = useRef(null);
  const lottieRef = useRef(null);
  const [micPermission, setMicPermission] = useState('prompt'); // 'prompt', 'granted', or 'denied'

  const speak = useCallback((text) => {
    if (!isSpeaking || phase === 'initial') return;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    // Get available voices and select a good English voice
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.includes('en') && (voice.name.includes('Female') || voice.name.includes('Google'))
    ) || voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    };

    utterance.onend = () => {
      if (lottieRef.current) {
        lottieRef.current.stop();
      }
    };

    speechSynthesis.speak(utterance);
  }, [isSpeaking, phase]);

  const addBotMessage = useCallback((text) => {
    setMessages(prev => [...prev, { text, isBot: true }]);
    // Small delay to ensure speech synthesis is ready
    setTimeout(() => speak(text), 100);
  }, [speak]);

  const addUserMessage = useCallback((text) => {
    setMessages(prev => [...prev, { text, isBot: false }]);
    
    // In conversation phase, simulate bot response
    setTimeout(() => {
      const responses = [
        "I understand. Could you tell me more about that?",
        "That's interesting! How did you come to that conclusion?",
        "I see. And how do you feel that relates to your career goals?",
        "Could you elaborate on that point?",
        "That's helpful to know. What specific aspects interest you most?"
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      addBotMessage(response);
    }, 1000);
  }, [addBotMessage]);

  const handleSend = useCallback((text = currentInput.trim()) => {
    if (text) {
      addUserMessage(text);
      setCurrentInput('');
    }
  }, [currentInput, addUserMessage]);

  // Initialize speech synthesis voices
  useEffect(() => {
    const initVoices = () => {
      // Load voices and set initial speaking state
      speechSynthesis.getVoices();
    };

    initVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = initVoices;
    }

    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    try {
      if (!('webkitSpeechRecognition' in window)) {
        console.error('Speech recognition is not supported in this browser');
        return;
      }

      // Clean up any existing recognition instance
      if (recognition.current) {
        recognition.current.abort();
      }

      recognition.current = new window.webkitSpeechRecognition();
      
      if (!recognition.current) {
        console.error('Failed to initialize speech recognition');
        return;
      }

      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onstart = () => {
        setIsListening(true);
      };

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        handleSend(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        // Handle specific error cases
        switch (event.error) {
          case 'not-allowed':
            alert('Please allow microphone access to use speech recognition.');
            break;
          case 'no-speech':
            alert('No speech was detected. Please try speaking again.');
            break;
          case 'audio-capture':
            alert('No microphone was found. Please ensure your microphone is properly connected.');
            break;
          case 'network':
            alert('Network error occurred. Please check your internet connection.');
            break;
          default:
            alert('An error occurred with speech recognition. Please try again.');
        }
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      alert('Failed to initialize speech recognition. Please try refreshing the page.');
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, [handleSend]);

  const startConversationPhase = useCallback(() => {
    setPhase('conversation');
    setIsSpeaking(true); // Enable speech by default when conversation starts
    
    const expertise = userResponses[questions[0].question] || 'experienced professional';
    const workstyle = userResponses[questions[1].question] || 'flexible work environment';
    
    const starter = AI_CONVERSATION_STARTERS[Math.floor(Math.random() * AI_CONVERSATION_STARTERS.length)]
      .replace('{expertise}', expertise.toLowerCase().split(' - ')[0])
      .replace('{workstyle}', workstyle.toLowerCase().split(' - ')[0]);
    
    setMessages([
      { text: "Now, let's have a more detailed conversation about your career interests.", isBot: true },
      { text: starter, isBot: true }
    ]);
    
    // Ensure both messages are spoken
    setTimeout(() => {
      speak("Now, let's have a more detailed conversation about your career interests.");
      setTimeout(() => {
        speak(starter);
      }, 2500);
    }, 500);
  }, [questions, userResponses, speak]);

  const requestMicrophonePermission = async () => {
    try {
      // First try to get the current permission status
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
      setMicPermission(permissionStatus.state);

      if (permissionStatus.state === 'denied') {
        alert('Microphone access is denied. Please enable it in your browser settings and refresh the page.');
        return false;
      }

      // Try to get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after testing
      setMicPermission('granted');
      return true;
    } catch (error) {
      console.error('Microphone permission error:', error);
      if (error.name === 'NotAllowedError') {
        setMicPermission('denied');
        alert('Microphone access was denied. Please enable it in your browser settings and refresh the page.');
      } else {
        alert('Error accessing microphone. Please ensure your microphone is properly connected and try again.');
      }
      return false;
    }
  };

  const toggleListening = useCallback(async () => {
    if (!recognition.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.current.stop();
    } else {
      // Request microphone permission before starting
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }

      try {
        recognition.current.start();
      } catch (error) {
        console.error('Speech recognition error:', error);
        // If there's an error, try stopping and starting again
        recognition.current.stop();
        setTimeout(() => recognition.current.start(), 100);
      }
    }
  }, [isListening]);

  const toggleSpeaking = useCallback(() => {
    setIsSpeaking(prev => !prev);
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    // Fetch the Lottie animation data
    fetch(ROBOT_ANIMATION_URL)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));

    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add this near your other useEffect hooks
  useEffect(() => {
    // Check initial microphone permission status
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'microphone' })
        .then(permissionStatus => {
          setMicPermission(permissionStatus.state);
          permissionStatus.onchange = () => {
            setMicPermission(permissionStatus.state);
          };
        })
        .catch(error => {
          console.error('Error checking microphone permission:', error);
        });
    }
  }, []);

  const handleAnswer = (answer) => {
    setUserResponses(prev => ({
      ...prev,
      [questions[currentQuestion].question]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      startConversationPhase();
    }
  };

  const handleSubmit = () => {
    addBotMessage("Thank you for sharing! I'll now generate a comprehensive career report based on our conversation.");
    setTimeout(() => {
      onComplete?.(userResponses);
    }, 2000);
  };

  const handleBack = () => {
    if (phase === 'conversation') {
      setPhase('initial');
      setMessages([]);
      setIsSpeaking(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (phase === 'initial') {
    return (
      <Container maxWidth="md">
        <Stepper activeStep={currentQuestion} sx={{ mb: 4 }}>
          {questions.map((q, index) => (
            <Step key={index}>
              <StepLabel>{q.question.split('?')[0]}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          currentAnswer={userResponses[questions[currentQuestion].question]}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {currentQuestion > 0 && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              Back
            </Button>
          )}
          <Box sx={{ flex: 1 }} />
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNextQuestion}
            disabled={!userResponses[questions[currentQuestion].question]}
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
          >
            {currentQuestion + 1 < questions.length ? 'Next Question' : 'Start Conversation'}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          height: '80vh', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 4,
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <IconButton onClick={handleBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 200, height: 200 }}>
            {animationData && (
              <Lottie
                ref={lottieRef}
                loop={isSpeaking}
                animationData={animationData}
                play={isSpeaking}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </Box>
        </Box>

        <Box 
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            mb: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          {messages.map((message, index) => (
            <Fade in={true} key={index}>
              <div>
                <ChatMessage message={message.text} isBot={message.isBot} />
              </div>
            </Fade>
          ))}
          <div ref={chatEndRef} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            color={isListening ? 'error' : micPermission === 'granted' ? 'primary' : 'default'}
            onClick={toggleListening}
            title={micPermission === 'denied' ? 'Microphone access denied' : 'Click to start/stop listening'}
          >
            <MicIcon />
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            size="small"
          />
          <IconButton color="primary" onClick={() => handleSend()}>
            <SendIcon />
          </IconButton>
          <IconButton onClick={toggleSpeaking}>
            {isSpeaking ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Generate Career Report
        </Button>
      </Paper>
    </Container>
  );
}

export default ChatBot;