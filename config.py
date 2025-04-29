import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# OpenAI API Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Assessment Questions by Category
ASSESSMENT_CATEGORIES = {
    "skills_and_experience": {
        "title": "Skills & Experience",
        "questions": [
            {
                "question": "What is your level of technical/professional expertise?",
                "options": {
                    "1": "Beginner - Basic understanding of core concepts",
                    "2": "Intermediate - Can apply knowledge in practical situations",
                    "3": "Advanced - Can handle complex tasks and solve difficult problems"
                }
            },
            {
                "question": "How would you rate your problem-solving abilities?",
                "options": {
                    "1": "Basic - Can solve simple problems with guidance",
                    "2": "Intermediate - Can solve complex problems independently",
                    "3": "Advanced - Can solve complex problems and optimize solutions"
                }
            },
            {
                "question": "What is your experience with professional tools and software?",
                "options": {
                    "1": "Basic - Familiar with essential tools",
                    "2": "Moderate - Proficient with industry-standard tools",
                    "3": "Advanced - Expert in specialized tools and software"
                }
            }
        ]
    },
    "work_style": {
        "title": "Work Style & Preferences",
        "questions": [
            {
                "question": "How do you prefer to work?",
                "options": {
                    "1": "Independently - I work best on my own",
                    "2": "In small teams - I like collaboration but prefer small groups",
                    "3": "In large teams - I thrive in collaborative environments"
                }
            },
            {
                "question": "How do you handle deadlines and pressure?",
                "options": {
                    "1": "I prefer clear deadlines and structured work",
                    "2": "I can handle some pressure and adapt to changes",
                    "3": "I thrive under pressure and can manage multiple deadlines"
                }
            },
            {
                "question": "What is your preferred learning style?",
                "options": {
                    "1": "Structured learning - I prefer formal courses and documentation",
                    "2": "Hands-on learning - I learn best by doing and experimenting",
                    "3": "Mixed approach - I combine different learning methods"
                }
            }
            {
                "question": "Would you prefer to start a new skill or grow an existing skill?",
                "options": {
                    "1": "New Skill - I want to learn something new",
                    "2": "Grow an Existing Skill - I want to improve my existing skills"
                }
            },
        ]
    },
    "career_goals": {
        "title": "Career Goals & Interests",
        "questions": [
            {
                "question": "What type of work environment interests you most?",
                "options": {
                    "1": "Corporate - I prefer structured, established organizations",
                    "2": "Startup - I enjoy dynamic, fast-paced environments",
                    "3": "Entrepreneurial - I want to create my own path"
                }
            },
            {
                "question": "What role do you see yourself in?",
                "options": {
                    "1": "Individual contributor - I want to focus on specialized work",
                    "2": "Team lead - I want to guide and mentor others",
                    "3": "Manager - I want to manage projects and teams"
                }
            },
            {
                "question": "What is your primary career goal?",
                "options": {
                    "1": "Expertise - I want to become a specialist in my field",
                    "2": "Leadership - I want to lead teams and projects",
                    "3": "Innovation - I want to create new solutions and products"
                }
            }
        ]
    }
}

# Output Configuration
OUTPUT_FORMAT = {
    "profile_summary": "",
    "strengths": [],
    "areas_for_development": [],
    "recommended_paths": [
        {
            "title": "",
            "description": "",
            "required_skills": [],
            "learning_resources": [],
            "next_steps": []
        }
    ]
}

# Career Paths and Recommendations
CAREER_PATHS = {
    "software_development": {
        "title": "Software Development",
        "description": "Focus on building and maintaining software applications",
        "skills": ["Programming", "Problem Solving", "System Design"]
    },
    "data_science": {
        "title": "Data Science",
        "description": "Analyze and interpret complex data sets",
        "skills": ["Statistics", "Machine Learning", "Data Analysis"]
    },
    "product_management": {
        "title": "Product Management",
        "description": "Lead product development and strategy",
        "skills": ["Communication", "Strategic Thinking", "User Research"]
    },
    "cybersecurity": {
        "title": "Cybersecurity",
        "description": "Protect systems and data from threats",
        "skills": ["Security", "Networking", "Risk Assessment"]
    }
} 