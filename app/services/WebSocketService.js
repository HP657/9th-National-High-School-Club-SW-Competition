import { w3cwebsocket as W3CWebSocket } from 'websocket';

class WebSocketService {
    static instance = null;
    socketRef = null;

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    connect(chatRoomId) {
        this.socketRef = new W3CWebSocket(`ws://localhost:8080/ws?chatRoomId=${chatRoomId}`);
        this.socketRef.onopen = () => {
            console.log('WebSocket connection established');
        };

        this.socketRef.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.socketRef.onmessage = (message) => {
            this.onMessageCallback(message);
        };
    }

    disconnect() {
        if (this.socketRef) {
            this.socketRef.close();
        }
    }

    sendMessage(message) {
        console.log(message)
        this.socketRef.send(`http://localhost:8080/app/chat.send/${message.chatRoomId}`, {}, JSON.stringify(message));
    }

    addCallbacks(onMessage) {
        this.onMessageCallback = onMessage;
    }
}

const WebSocketInstance = WebSocketService.getInstance();
export default WebSocketInstance;
