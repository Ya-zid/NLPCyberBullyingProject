# import torch
# import pandas as pd
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from googleapiclient.discovery import build
# from torch import nn
# from transformers import AutoTokenizer, AutoModel
# from torch.nn.functional import softmax

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Replace with your YouTube Data API key
# API_KEY = "AIzaSyB8TTLoUy-sNN3l2ztQc66CwbR7X48x6vw"
# youtube = build('youtube', 'v3', developerKey=API_KEY)

# # Load Model and Tokenizer
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# tokenizer = AutoTokenizer.from_pretrained("tokenizer/")
# model = torch.load("complete_model.pth", map_location=device)
# model.eval()
# model.to(device)

# class CyberbullyingClassifier(nn.Module):
#     def __init__(self, base_model, num_classes):
#         super(CyberbullyingClassifier, self).__init__()
#         self.base_model = base_model
#         self.classifier = nn.Sequential(
#             nn.Linear(base_model.config.hidden_size + 1, 128),
#             nn.ReLU(),
#             nn.Dropout(0.2),
#             nn.Linear(128, num_classes)
#         )

#     def forward(self, input_ids=None, attention_mask=None, bad_words_count=None, **kwargs):
#         outputs = self.base_model(input_ids=input_ids, attention_mask=attention_mask, **kwargs)
#         cls_token_embedding = outputs.last_hidden_state[:, 0, :]
#         augmented_features = torch.cat([cls_token_embedding, bad_words_count.unsqueeze(1)], dim=1)
#         logits = self.classifier(augmented_features)
#         return logits

# def normalize_text(text):
#     return text.strip().lower()

# def predict(sentence):
#     sentence = normalize_text(sentence)
#     bad_words_count = torch.tensor([0]).to(device)
#     inputs = tokenizer(sentence, padding=True, truncation=True, return_tensors="pt").to(device)
#     inputs['bad_words_count'] = bad_words_count
#     with torch.no_grad():
#         logits = model(**inputs)
#         prediction = torch.argmax(softmax(logits, dim=-1), dim=-1)
#     label_map = {0: "not cyberbullying", 1: "cyberbullying", 2: "context based"}
#     return label_map[prediction.item()]

# @app.route('/scrape_comments', methods=['POST'])
# def scrape_comments():
#     data = request.json
#     video_url = data.get('url').split('&')[0]
#     if not video_url:
#         return jsonify({"error": "No URL provided"}), 400
#     video_id = video_url.split('v=')[-1]
#     comments = []
#     request = youtube.commentThreads().list(part="snippet", videoId=video_id, maxResults=100)
#     response = request.execute()
#     for item in response.get("items", []):
#         comment = item["snippet"]["topLevelComment"]["snippet"]["textOriginal"]
#         comments.append(comment)
#     return jsonify({"comments": comments})

# @app.route('/detect_cyberbullying', methods=['POST'])
# def detect_cyberbullying():
#     data = request.json
#     comments = data.get('comments', [])
#     if not comments:
#         return jsonify({"error": "No comments provided"}), 400
#     results = [comment for comment in comments if predict(comment) == "cyberbullying"]
#     return jsonify({"cyberbullying_comments": results})

# if __name__ == '__main__':
#     app.run(debug=True)
