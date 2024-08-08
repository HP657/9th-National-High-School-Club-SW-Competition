import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Button } from 'react-native';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatRoom = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    fetchUserInfoAndMessages();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const fetchUserInfoAndMessages = async () => {
    try {
      const userInfoResponse = await fetch('http://10.0.2.2:8080/api/user/info', {
        credentials: 'include'
      });
      if (!userInfoResponse.ok) throw new Error('Failed to fetch user info');
      const userInfoResult = await userInfoResponse.json();
      setUserInfo(userInfoResult.data);

      const chatRoomId = userInfoResult.data.userId;
      const socket = new SockJS('http://10.0.2.2:8080/ws');
      const client = Stomp.over(socket);

      client.connect({}, () => {
        setStompClient(client);

        client.subscribe('/topic/public', (message) => {
          const parsedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
          scrollToBottom();
        });
      });

      const messagesResponse = await fetch('http://10.0.2.2:8080/api/chatroom/1/messages');
      if (!messagesResponse.ok) throw new Error('Failed to fetch messages');
      const messagesResult = await messagesResponse.json();
      setMessages(messagesResult);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching user info and messages:', error);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSend = async () => {
    if (inputText.trim() && userInfo) {
      const newMessage = {
        userId: userInfo.userId,
        message: inputText,
        chatRoomId: 1,
      };

      if (stompClient) {
        stompClient.send('/app/chat.send', {}, JSON.stringify(newMessage));
        setInputText('');
      }

      try {
        const response = await fetch(`http://10.0.2.2:8080/api/chatroom/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });

        if (!response.ok) throw new Error('Failed to send message');
        const result = await response.json();
        setMessages((prevMessages) => [...prevMessages, result]);
        scrollToBottom();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const renderItem = ({ item }) => {
    const isOwnMessage = item.userId.userId === userInfo.userId;
    return (
      <View style={[styles.messageContainer, isOwnMessage ? styles.ownMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.userId.username}: {item.content}</Text>
      </View>
    );
  };

  if (!userInfo) {
    return <Text>Loading user info...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>Logged in as: {userInfo.email}</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.messageId.toString()}
        style={styles.messageList}
        inverted={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter your message"
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userInfo: {
    marginBottom: 10,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatRoom;
