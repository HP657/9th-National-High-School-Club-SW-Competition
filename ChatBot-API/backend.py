from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

SPRING_BOOT_URL = "http://localhost:8080/api/chatroom"

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    chat_room_id = data.get('chatRoomId')
    url = f"{SPRING_BOOT_URL}/{chat_room_id}/send"
    
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({"error": "Failed to send message"}), response.status_code

if __name__ == '__main__':
    app.run(port=5000)