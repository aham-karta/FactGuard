from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtube_transcript_api import YouTubeTranscriptApi
from openai import OpenAI
from tavily import TavilyClient
from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")
tavily_api_key = os.getenv("TAVILY_API_KEY")
client = Groq(api_key="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")
tavily_client = TavilyClient(api_key=tavily_api_key)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/guard-the-fact", response_model=dict)
async def run(req_body: dict):
    print("started")
    final_data=[]
    links=[]
    images=[]
    transcript = YouTubeTranscriptApi.get_transcript(req_body["url"])
    full_text = " ".join([i["text"] for i in transcript])

    
    completion = client.chat.completions.create(
    model="llama3-70b-8192",
    messages=[
        {
            "role": "system",
            "content": "You are a part of video factual verification system your job is to extract the crucial information/ facts from the given transcript and return them as headlines. as we are trying to verify the facts told in the video it might be that there may be few or more factual inaccuracies throughout the transcript but that is not your job to look into those, your job is to just return the crucial information/facts that are given in the prompt as headlines. list out all such crucial information/facts from the transcript. Make sure that you return only the crucial information/facts which is essential to be verified for the good of the general public all the other things in the transcript can be ignored. each fact/information should have the complete context so don't use pronoun and use respective nouns always.list them in a squence seperated by @@@ no numbering or new lines"
        },
        {
            "role": "user",
            "content": full_text
        }
    ],
    temperature=0.1,
    max_tokens=256,
    top_p=1,
    stream=True,
    stop=None,
    )
    text=""
    for chunk in completion:
        text+=chunk.choices[0].delta.content or ""
    question_list = text.split("@@@")
    counter=0
    score=0
    for question in question_list:
        if question!="":
            print(question)
            counter+=1
            completion = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
            {
                "role": "system",
                "content": "say 'yes' (lowercase) if the question is based on incident that happend on or before 2022, else say 'no' (lowercase)"
            },
            {
                "role": "user",
                "content": question
            }
            ],
            temperature=0.1,
            max_tokens=3,
            top_p=1,
            stream=True,
            stop=None,
            )
            text2=""
            for chunk in completion:
                text2+=chunk.choices[0].delta.content or ""
            print(text2)
            if(text2=="no"):
                print("verifying with tavily api ...")
                tavily = TavilyClient(api_key=tavily_api_key)
                response = tavily.search(query=question, search_depth="advanced", include_answer=True, include_images=True)
                answer = response["answer"]
                completion = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                {
                    "role": "system",
                    "content": f"check for factual inaccuracies from the [verified data]:[] and find inaccuracies from [unverified data]:[]"
                },
                {
                    "role": "user",
                    "content": f"[verifed data]:{answer} - [unverified data]:{question}"
                }
                ],
                temperature=0,
                max_tokens=100,
                top_p=1,
                stream=True,
                stop=None,
                )
                text4=""
                for chunk in completion:
                    text4+=chunk.choices[0].delta.content or ""
                final_data.append(text4)
    print("verifying with llama3 ...")
    completion = client.chat.completions.create(
    model="llama3-70b-8192",
    messages=[
                {
                    "role": "system",
                    "content": "is this data right or not ? if there are any factual inaccuracies, specify them with corrected data (keep the corrections short)"
                },
                {
                    "role": "user",
                    "content": full_text
                }
                ],
                temperature=0.1,
                max_tokens=256,
                top_p=1,
                stream=True,
                stop=None,
                )
    text3=""
    for chunk in completion:
        text3+=chunk.choices[0].delta.content or ""
    final_data.append(text3)
    print()
    print()
    #print(final_data)
    final_response=""
    for data in final_data:
        final_response+=data
    return {
        "score": 100,
        "text": final_response,
        "links":links,
        "images":images
    }
