#telegram bot

import requests
from flask import Flask, request
from telegram.ext import Updater, CommandHandler
import json

app = Flask(__name__)

def start(update, context):
    chat_id = update.effective_chat.id
    context.bot.send_message(chat_id=chat_id, text="Hi!")

def check(update, context):
    args = context.args
    if not args:
        context.bot.send_message(chat_id=update.effective_chat.id, text="Please provide a string to check.")
        return
    query_string = ' '.join(args)
    context.bot.send_message(chat_id=update.effective_chat.id, text="Please wait while your request is being processed ...")
    url = "http://localhost:8000/api/guard-the-fact"  
    headers = {'Content-Type': 'application/json'}
    index=query_string.index("=")
    data = {"url": query_string[index+1:]}
    response = requests.post(url, headers=headers, data=json.dumps(data))
    if response.status_code == 200:
        context.bot.send_message(chat_id=update.effective_chat.id, text=response.json()["text"])
    else:
        context.bot.send_message(chat_id=update.effective_chat.id, text="Failed")

@app.route('/')
def index():
    return 'Hello, World!'

def main():
    token = "7020874441:AAHNglUq-GnPv1MM-Mmosgk7EX5vrxWRCME"
    updater = Updater(token, use_context=True)
    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler('start', start))
    dispatcher.add_handler(CommandHandler('check', check)) 
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()