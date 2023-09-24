from flask import Flask, request, jsonify
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from flask_cors import CORS

app = Flask(__name__)

# Initialize CORS with default options (allow all origins)
CORS(app)

# Download VADER lexicon (only needed once)
nltk.download("vader_lexicon")

# Initialize the VADER sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_text():
    if 'text' not in request.json:
        print('No "text" key in JSON request data')  # Add this log statement
        return jsonify({'error': 'Text not provided'}), 400

    text = request.json['text']

    # Log the received text for debugging purposes
    print('Received text:', text)

    # Perform sentiment analysis
    sentiment_scores = analyzer.polarity_scores(text)

    # Interpret the sentiment scores
    compound_score = sentiment_scores["compound"]

    if compound_score >= 0.05:
        sentiment = "Positive"
    elif compound_score <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    result = {
        "text": text,
        "sentiment": sentiment,
        "compound_score": compound_score,
        "positive_score": sentiment_scores['pos'],
        "negative_score": sentiment_scores['neg'],
        "neutral_score": sentiment_scores['neu']
    }

    return jsonify(result)

@app.route('/check', methods=['GET'])
def check_server():
    return "Flask server is running."



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
