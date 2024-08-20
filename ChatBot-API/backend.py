from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/send-message', methods=['POST'])
def send_message():
    message_data = {
        'userId': 2,  
        'message': 'Hello from Flask!', 
        'chatRoomId': 1  
    }
    
    try:
        response = requests.post('http://localhost:8080/api/chatroom/send', json=message_data)
        if response.status_code == 200:
            return jsonify({'success': True, 'data': response.json()}), 200
        else:
            return jsonify({'success': False, 'error': response.text}), response.status_code

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug =True)
