import boto3
import os
from botocore.exceptions import BotoCoreError, ClientError
from contextlib import closing
import os
import sys
import subprocess
from tempfile import gettempdir
from base64 import b64encode

class TTSService:
    def __init__(self):
        self.polly = boto3.client('polly',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION', 'us-west-2')
        )
        
    async def synthesize_speech(self, text, voice_id="Joanna"):
        """
        Converts text to speech using Amazon Polly and returns the audio as a base64 string.
        
        Args:
            text (str): The text to convert to speech
            voice_id (str): The voice ID to use (default: Joanna)
            
        Returns:
            dict: Contains the audio data as base64 and the content type
        """
        try:
            # Request speech synthesis
            response = self.polly.synthesize_speech(
                Text=text,
                OutputFormat='mp3',
                VoiceId=voice_id,
                Engine='neural'
            )
            
            # Access the audio stream from the response
            if "AudioStream" in response:
                with closing(response["AudioStream"]) as stream:
                    # Read the audio data
                    audio_data = stream.read()
                    # Convert to base64
                    audio_base64 = b64encode(audio_data).decode('utf-8')
                    
                    return {
                        "audio": audio_base64,
                        "content_type": "audio/mpeg"
                    }
                    
        except (BotoCoreError, ClientError) as error:
            print(error)
            raise Exception("Failed to synthesize speech")
            
    def get_available_voices(self):
        """
        Returns a list of available voices from Amazon Polly.
        """
        try:
            response = self.polly.describe_voices()
            return response['Voices']
        except (BotoCoreError, ClientError) as error:
            print(error)
            raise Exception("Failed to get available voices") 