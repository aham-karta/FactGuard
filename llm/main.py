#uvicorn main:app --reload
import asyncio
import os
from dotenv import load_dotenv
from googlesearch import search
from pyppeteer import launch
from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.llms import Ollama
import requests
from tavily import TavilyClient


app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/guard-the-fact")
async def run(req_body: dict):
    data = []
    print(req_body["url"])
    transcript = YouTubeTranscriptApi.get_transcript(req_body["url"])
    full = ""
    for i in transcript:
        full += i["text"] + " "
    full="i woke up to a sad news that narendra modi passed away"
    # load_dotenv()
    llm = Ollama(model="llama2")
    question = llm.invoke(f"generate a one liner question based on this context - {full}")
    tavily = TavilyClient(api_key="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")
    response = tavily.search(query=question, search_depth="advanced", include_answer=True,include_images=True)
    #print(response)
    final=llm.invoke(f"[true data]: {response['answer']} - [unsure data]:{full} - you are a fact validator known as FactGuard - compare the true data with unsure data and return if there are any factual inaccuracies")
    return {"final":final,"links":response["results"],"images":response["images"]}