from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import cv2
import numpy as np
import hashlib
import base64
import os
import logging

app = Flask(__name__)
CORS(app)

IMAGE_FOLDER = 'saved_images'

# Create the image folder if it doesn't exist
os.makedirs(IMAGE_FOLDER, exist_ok=True)

logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def serve_index():
    try:
        return send_from_directory('.', 'index.html')
    except Exception as e:
        print(f"Error serving index: {e}")
        return jsonify({'error': 'Failed to serve index page'}), 500

@app.route('/upload', methods=['POST'])
def upload():
    try:
        # Get JSON data from the request
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        image_data = data['image']

        # Ensure the image data is valid base64
        try:
            header, encoded = image_data.split(',', 1)  # Split the header from the data
            img = base64.b64decode(encoded)
        except Exception as e:
            print(f"Error decoding image data: {e}")
            return jsonify({'error': 'Invalid image data format'}), 400

        # Create a unique hash for the image
        image_hash = hashlib.sha256(img).hexdigest()
        logging.info(f"Image hash: {image_hash}")
        image_filename = os.path.join(IMAGE_FOLDER, f"{image_hash}.jpg")

        # Save the image to the server
        try:
            with open(image_filename, 'wb') as f:
                f.write(img)
        except IOError as e:
            print(f"Error saving image: {e}")
            return jsonify({'error': 'Failed to save image'}), 500

        print(f"Saved image to {image_filename}")
        return jsonify({'message': 'Image saved successfully', 'filename': image_filename})

    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    print("Starting Flask app...")
    try:
        app.run(debug=True)
    except Exception as e:
        print(f"Error starting the Flask app: {e}")
