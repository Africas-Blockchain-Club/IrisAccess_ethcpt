from flask import Flask, request, jsonify, render_template, send_from_directory
import cv2
import numpy as np
import hashlib
import base64


app = Flask(__name__)

@app.route('/')
def serve_index():
    # return "Welcome to the Iris Scanner!"
    return send_from_directory('.','index.html')

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    image_data = data['image']
    header, encoded = image_data.split(',', 1)
    img = base64.b64decode(encoded)

    # Convert the image to a NumPy array
    nparr = np.frombuffer(img, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    image_hash = hashlib.sha256(gray).hexdigest()

    return jsonify({'hash': image_hash})

if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)
