class SocketService {
  constructor(socketUrl) {
    this.socketUrl = socketUrl;
    this.websocket = null;
  }

  connectWebSocket(path, onMessage) {
    console.log(`Attempting Connection: ${this.socketUrl}${path}`);

    this.websocket = new WebSocket(`${this.socketUrl}${path}`);

    this.websocket.onopen = () => {
      console.log(`Connected: ${this.socketUrl}${path}`);
    };

    this.websocket.onmessage = onMessage;
  }

  sendWebSocketMessage(message) {
    if (this.websocket) {
      this.websocket.send(message);
    }
  }

  closeWebSocket() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}

export default SocketService;
