from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Answer(BaseModel):
    question: str
    answer: str

class AssessmentRequest(BaseModel):
    answers: List[Answer]

@app.get("/")
async def read_root():
    return {"message": "Career Assessment API"}

@app.post("/api/analyze")
async def analyze_answers(request: AssessmentRequest):
    try:
        # Format answers for ChatGPT
        formatted_answers = "\n".join([
            f"Q: {answer.question}\nA: {answer.answer}\n"
            for answer in request.answers
        ])

        # Prepare the prompt for ChatGPT
        prompt = f"""As a career counselor, analyze the following assessment answers from a fresh graduate and provide detailed career guidance in JSON format.

Assessment Answers:
{formatted_answers}

Please provide a comprehensive analysis in the following JSON structure:
{{
    "profile_summary": "A detailed summary of the person's profile, including their skills, work style, and career aspirations. Focus on their strengths and potential areas for growth.",
    "strengths": [
        "List of key strengths identified from their answers, with specific examples from their responses",
        "Include both technical and soft skills",
        "Highlight unique combinations of skills that make them stand out"
    ],
    "areas_for_development": [
        "List of areas that need improvement based on their responses",
        "Include specific suggestions for development",
        "Focus on both technical and soft skills"
    ],
    "recommended_paths": [
        {{
            "title": "Career path title",
            "description": "Detailed description of why this path is suitable, based on their answers",
            "required_skills": [
                "List of specific skills needed for this path",
                "Include both technical and soft skills",
                "Prioritize skills based on their current level"
            ],
            "learning_resources": [
                "List of specific learning resources (courses, books, platforms)",
                "Include both free and paid options",
                "Prioritize resources based on their learning style"
            ],
            "next_steps": [
                "List of immediate actionable steps to pursue this path",
                "Include both short-term and long-term goals",
                "Make steps specific and measurable"
            ]
        }}
    ]
}}

Guidelines for the analysis:
1. Focus on actionable insights and specific recommendations
2. Consider their learning style and work preferences
3. Suggest realistic career paths based on their current skill level
4. Provide specific resources and next steps
5. Highlight unique combinations of skills that could lead to niche opportunities
6. Consider both technical and soft skills in the recommendations
7. Explore various industries and roles that match their profile
8. Consider their preferred work environment and career goals
9. Suggest both traditional and emerging career paths
10. Include opportunities for growth and advancement

Ensure the response is valid JSON and follows this exact structure. Provide detailed and specific recommendations based on the person's answers.
"""

        # Get response from ChatGPT
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a career counselor specializing in helping fresh graduates find their ideal career path. Provide detailed, specific, and actionable recommendations in valid JSON format. Consider all possible career paths and industries."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=2000,
            response_format={"type": "json_object"}
        )

        # Parse the response
        analysis = json.loads(response.choices[0].message.content)
        return analysis

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 