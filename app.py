
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template, request, jsonify, make_response

app = Flask(__name__)


# Routes for loading the template of the main page and for posting queries and getting results

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=["GET", "POST"])
def submit():
    if request.method == "POST":
        query = request.form.get('query')
        response = make_response(jsonify(query), 200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        response = make_response(jsonify("Bad Request"), 400)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
