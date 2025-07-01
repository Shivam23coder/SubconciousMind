from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/embed', methods=['POST'])
def embed():
    data = request.get_json()
    text = data['text']
    # Dummy embedding — replace with actual model logic
    embedding = [ord(c) % 10 / 10 for c in text][:10]
    return jsonify({'embedding': embedding})

import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
