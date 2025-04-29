# Career Assessment System

This project provides a career assessment system that analyzes a person's skills and interests to suggest suitable career paths and learning resources. It uses ChatGPT to generate personalized recommendations based on the user's responses to a set of assessment questions.

## Features

- Interactive questionnaire to assess skills and interests
- AI-powered analysis using ChatGPT
- Detailed career path recommendations
- Learning resource suggestions
- Beautiful console-based interface

## Setup

1. Clone this repository
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the project root with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

1. Run the main script:
   ```bash
   python main.py
   ```
2. Answer the assessment questions when prompted
3. Review the generated career assessment report

## Project Structure

- `main.py`: Core application logic
- `config.py`: Configuration settings and assessment questions
- `requirements.txt`: Project dependencies
- `.env`: Environment variables (create this file with your API key)

## Customization

You can customize the assessment questions and career paths by modifying the `config.py` file. The system is designed to be flexible and can be adapted to different types of career assessments.

## Requirements

- Python 3.7+
- OpenAI API key
- Internet connection for API calls 