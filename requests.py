import requests

def get_fingerprint():
    url = 'https://api.webauth.io/endpoint' 
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'  # If required
    }

    response = requests.post(url, headers=headers)

    if response.status_code == 200:
        return response.json()  # Process the JSON response
    else:
        print(f"Error: {response.status_code}")
        return None

fingerprint_data = get_fingerprint()
if fingerprint_data:
    print(fingerprint_data)