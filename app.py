
# Model imports
import joblib
import numpy as np
from tensorflow import keras
from keras.preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
from keras.models import Sequential, load_model
from keras.layers import Embedding, GlobalAveragePooling1D, Dense, LSTM, Bidirectional
# Flask imports
from flask import Flask, render_template, request, jsonify, make_response

app = Flask(__name__)

# Loading the models and tokensizers for intensity and category, along with max_length for padding, along with model labels

classification_labels = ["Arts","Athletics","Business","Culture","Government","Professional","Religion","Service","Social","STEM"]
intensity_labels = ["1", "2", "3"]

max_length = 35
intensity_tokenizer = joblib.load('/home/gjburke33/involvement-bot/models/tokenizer_2500.joblib')
intensity_model = keras.models.load_model("/home/gjburke33/involvement-bot/models/intensity_model.keras")
category_tokenizer = joblib.load('/home/gjburke33/involvement-bot/models/tokenizer_10000.joblib')
category_model = keras.models.load_model("/home/gjburke33/involvement-bot/models/category_model.keras")

# Routes for loading the template of the main page and for posting queries and getting results

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=["GET", "POST"])
def submit():
    if request.method == "POST":
        # get query
        query = request.form.get('query')
        # intensity: tokensize and pad query
        query_seq = intensity_tokenizer.texts_to_sequences([query])
        query_padded = pad_sequences(query_seq, maxlen=max_length, padding='post')
        # intensity: get prediction
        intensity_prediction = intensity_model.predict(query_padded)
        # category: tokensize and pad query
        query_seq = category_tokenizer.texts_to_sequences([query])
        query_padded = pad_sequences(query_seq, maxlen=max_length, padding='post')
        # cateogry: get prediction
        category_prediction = category_model.predict(query_padded)
        # Send back data
        response = make_response(jsonify(classification_labels[np.argmax(category_prediction)] + " " + intensity_labels[np.argmax(intensity_prediction)]), 200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        response = make_response(jsonify("Bad Request"), 400)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
