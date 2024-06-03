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

@app.route("/api/guard-the-fact", methods=["POST"])
def run():
    try:
        req_body = request.json
        if "url" not in req_body:
            return jsonify({"error": "URL not provided"}), 400

        final_data = []
        links = []
        images = []

        try:
            transcript = YouTubeTranscriptApi.get_transcript(req_body["url"])
            full_text = " ".join([i["text"] for i in transcript])
        except Exception as e:
            return jsonify({"error": f"Error fetching transcript: {str(e)}"}), 500

        try:
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
                max_tokens=8192,
                top_p=1,
                stream=True,
                stop=None,
            )
            text = ""
            for chunk in completion:
                text += chunk.choices[0].delta.content or ""
            question_list = text.split("@@@")
        except Exception as e:
            return jsonify({"error": f"Error generating questions: {str(e)}"}), 500

        for question in question_list:
            if question:
                try:
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
                    text2 = ""
                    for chunk in completion:
                        text2 += chunk.choices[0].delta.content or ""
                    if text2 == "no":
                        try:
                            tavily = TavilyClient(api_key=tavily_api_key)
                            response = tavily.search(query=question, search_depth="advanced", include_answer=True, include_images=True, max_results=1)
                            answer = response["answer"]
                            images.append(response["images"][0])
                            links.append(response["results"][0]["url"])
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
                            text4 = ""
                            for chunk in completion:
                                text4 += chunk.choices[0].delta.content or ""
                            final_data.append(text4)
                        except Exception as e:
                            return jsonify({"error": f"Error verifying with tavily API: {str(e)}"}), 500
                except Exception as e:
                            return jsonify({"error": f"Error verifying with tavily API: {str(e)}"}), 500
        try:
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
                max_tokens=4096,
                top_p=1,
                stream=True,
                stop=None,
            )
            text3 = ""
            for chunk in completion:
                text3 += chunk.choices[0].delta.content or ""
            final_data.append(text3)
        except Exception as e:
            return jsonify({"error": f"Error verifying with llama3 API: {str(e)}"}), 500

        final_response = ""
        for data in final_data:
            final_response += data

        try:
            completion = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {
                        "role": "system",
                        "content": "eliminate the points that repeat more than once and return the answer without bold and asterisks"
                    },
                    {
                        "role": "user",
                        "content": final_response
                    }
                ],
                temperature=0.1,
                max_tokens=4096,
                top_p=1,
                stream=True,
                stop=None,
            )
            text3 = ""
            for chunk in completion:
                text3 += chunk.choices[0].delta.content or ""
        except Exception as e:
            return jsonify({"error": f"Error eliminating repeated points: {str(e)}"}), 500

        return jsonify({
            "score": 100,
            "text": text3,
            "links": links,
            "images": images
        }), 200

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
