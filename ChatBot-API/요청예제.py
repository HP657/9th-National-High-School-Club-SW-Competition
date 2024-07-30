import requests

url = "http://localhost:5000/send_message"
data = {
    "userId": 1,
    "message": "Flask에서 보낸 메시지입니다.",
    "chatRoomId": 1
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print("Message sent successfully:", response.json())
else:
    print("Failed to send message:", response.status_code)
