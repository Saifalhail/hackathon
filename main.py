import os
import json
from openai import OpenAI
from rich.console import Console
from rich.panel import Panel
from rich.markdown import Markdown
import config

console = Console()

class CareerAssessment:
    def __init__(self):
        # Initialize OpenAI client with minimal configuration
        self.client = OpenAI(api_key=config.OPENAI_API_KEY)
        self.answers = {}

    def collect_answers(self):
        console.print(Panel.fit("Career Assessment Questionnaire", style="bold blue"))
        console.print("Please answer the following questions to help us understand your profile.\n")
        
        for category, data in config.ASSESSMENT_CATEGORIES.items():
            console.print(Panel.fit(f"[bold]{data['title']}[/bold]", style="bold green"))
            for i, question_data in enumerate(data['questions'], 1):
                console.print(f"\n[bold]{i}. {question_data['question']}[/bold]")
                for option_num, option_text in question_data['options'].items():
                    console.print(f"   {option_num}. {option_text}")
                
                while True:
                    answer = input("\nYour choice (1-3): ")
                    if answer in ['1', '2', '3']:
                        self.answers[question_data['question']] = question_data['options'][answer]
                        break
                    else:
                        console.print("[red]Please enter a valid choice (1-3)[/red]")
                
                console.print()
            console.print("\n" + "="*50 + "\n")

    def generate_analysis(self):
        # Prepare the prompt for ChatGPT
        prompt = f"""As a career counselor, analyze the following assessment answers from a fresh graduate and provide detailed career guidance in JSON format.

Assessment Answers:
{self._format_answers()}

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

        # Display the prompt that will be sent to ChatGPT
        console.print("\n[bold yellow]Prompt being sent to ChatGPT:[/bold yellow]")
        console.print(Panel(prompt, title="ChatGPT Prompt", style="yellow"))

        try:
            # Create a chat completion with the latest API practices
            response = self.client.chat.completions.create(
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
            
            # Get the content from the response
            content = response.choices[0].message.content
            
            # Parse the JSON response
            try:
                analysis_json = json.loads(content)
                return analysis_json
            except json.JSONDecodeError as e:
                console.print(f"[red]Error parsing JSON response: {str(e)}[/red]")
                console.print("[yellow]Raw response:[/yellow]")
                console.print(content)
                return None
                
        except Exception as e:
            console.print(f"[red]Error generating analysis: {str(e)}[/red]")
            return None

    def _format_answers(self):
        formatted = ""
        for category, data in config.ASSESSMENT_CATEGORIES.items():
            formatted += f"\n{data['title']}\n"
            formatted += "=" * len(data['title']) + "\n\n"
            for question_data in data['questions']:
                formatted += f"Q: {question_data['question']}\nA: {self.answers[question_data['question']]}\n\n"
        return formatted

    def display_report(self, analysis):
        if analysis:
            console.print("\n[bold green]Career Assessment Report[/bold green]")
            
            # Display Profile Summary
            console.print(Panel(analysis["profile_summary"], title="Profile Summary"))
            
            # Display Strengths
            console.print("\n[bold]Key Strengths:[/bold]")
            for strength in analysis["strengths"]:
                console.print(f"• {strength}")
            
            # Display Areas for Development
            console.print("\n[bold]Areas for Development:[/bold]")
            for area in analysis["areas_for_development"]:
                console.print(f"• {area}")
            
            # Display Recommended Paths
            console.print("\n[bold]Recommended Career Paths:[/bold]")
            for path in analysis["recommended_paths"]:
                console.print(Panel(
                    f"[bold]{path['title']}[/bold]\n"
                    f"{path['description']}\n\n"
                    f"[bold]Required Skills:[/bold]\n" + "\n".join(f"• {skill}" for skill in path['required_skills']) + "\n\n"
                    f"[bold]Learning Resources:[/bold]\n" + "\n".join(f"• {resource}" for resource in path['learning_resources']) + "\n\n"
                    f"[bold]Next Steps:[/bold]\n" + "\n".join(f"• {step}" for step in path['next_steps']),
                    title=f"Career Path: {path['title']}"
                ))
            
            # Save the analysis to a JSON file
            try:
                with open('career_analysis.json', 'w', encoding='utf-8') as f:
                    json.dump(analysis, f, indent=4, ensure_ascii=False)
                console.print("\n[green]Analysis saved to career_analysis.json[/green]")
            except Exception as e:
                console.print(f"[red]Error saving analysis to file: {str(e)}[/red]")
        else:
            console.print("[red]Failed to generate analysis report.[/red]")

def main():
    if not config.OPENAI_API_KEY:
        console.print("[red]Error: OPENAI_API_KEY not found in environment variables.[/red]")
        console.print("Please create a .env file with your OpenAI API key.")
        return

    assessment = CareerAssessment()
    assessment.collect_answers()
    analysis = assessment.generate_analysis()
    assessment.display_report(analysis)

if __name__ == "__main__":
    main()
