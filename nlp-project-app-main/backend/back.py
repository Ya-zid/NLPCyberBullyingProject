from flask import Flask, request as flask_request, jsonify
from flask_cors import CORS
from googleapiclient.discovery import build
import torch
import pandas as pd
import torch
from transformers import AutoTokenizer
from torch.nn.functional import softmax
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from torch import nn
from cyberclass import CyberbullyingClassifier


app = Flask(__name__)
CORS(app) 

API_KEY = "AIzaSyB8TTLoUy-sNN3l2ztQc66CwbR7X48x6vw"
youtube = build('youtube', 'v3', developerKey=API_KEY)


the_model = torch.load("complete_model.pth", map_location=torch.device('cpu'))
the_model.eval()
print("Model loaded successfully.")
the_tokenizer = AutoTokenizer.from_pretrained("tokenizer/")
print("Tokenizer loaded successfully.")

def normalize_text(text):
    """Normalize the input text by lowercasing and removing unnecessary characters."""
    return text.strip().lower()



def predict(sentence):
    """
    Predicts the label of a given sentence using the pre-trained model and tokenizer.

    Args:
        sentence (str): The input sentence to classify.

    Returns:
        str: The predicted label
    """
    sentence = normalize_text(sentence)

    bad_words_count = 0

    inputs = the_tokenizer(
        sentence,
        padding=True,
        truncation=True,
        return_tensors="pt"
    ).to('cpu')

    inputs['bad_words_count'] = torch.tensor([bad_words_count]).to('cpu')

    with torch.no_grad():
        outputs = the_model(**inputs)

        if isinstance(outputs, torch.Tensor):
            logits = outputs
        else:
            logits = outputs.logits

        prediction = torch.argmax(softmax(logits, dim=-1), dim=-1)

    label_map = {0: "not cyberbullying", 1: "cyberbullying", 2: 'context based'}
    return label_map[prediction.item()]

@app.route('/scrape_comments', methods=['POST'])
def scrape_comments():
    data = flask_request.json  
    video_url = data.get('url').split('&')[0]
    if not video_url:
        return jsonify({"error": "No URL provided"}), 400

    video_id = video_url.split('v=')[-1]

    comments = []
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=100 
    )
    response = request.execute()
    for item in response.get("items", []):
        comment = item["snippet"]["topLevelComment"]["snippet"]["textOriginal"]
        comments.append(comment)

    return jsonify({"comments": comments})

@app.route('/detect_cyberbullying', methods=['POST'])
def detect_cyberbullying():
    data = flask_request.json  
    comments = data.get('comments', [])
    if not comments:
        return jsonify({"error": "No comments provided"}), 400

    # Predict with your model
    results = []
    for comment in comments:
        prediction = predict(comment)
        print(f"-----------------------------------------------------      {comment} : {prediction}")
        if prediction == "cyberbullying":
            results.append(comment)

    return jsonify({"cyberbullying_comments": results})

if __name__ == '__main__':
    app.run(debug=True)
