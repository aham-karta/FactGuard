from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from tavily import TavilyClient
from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
tavily_api_key = os.getenv("TAVILY_API_KEY")
client = Groq(api_key=groq_api_key)
tavily_client = TavilyClient(api_key=tavily_api_key)

app = Flask(__name__)

configure_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
